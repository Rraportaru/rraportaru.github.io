(() => {
  const app = document.querySelector('#app');
  const NAME_KEY = 'ai-governance-practice.nickname.v1';
  const HISTORY_KEY = 'ai-governance-practice.attempts.v1';
  const PASS_GRADE = 8;
  const versions = window.quizVersions || [];
  const documentSets = window.documentQuestionSets || [];
  let nickname = readStorage(NAME_KEY, '');
  let attempts = readStorage(HISTORY_KEY, []);
  if (!Array.isArray(attempts)) attempts = [];
  let current = null;
  let questionIndex = 0;
  let selected = null;
  let locked = false;
  let reviewVisible = false;

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function shuffle(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function render() {
    if (!nickname) renderWelcome();
    else renderDashboard();
  }

  function renderWelcome() {
    app.innerHTML = `
      <div class="welcome-layout">
        <div class="welcome-copy">
          <p class="eyebrow">YOUR PRACTICE SPACE</p>
          <h2>What should we call you?</h2>
        <p class="body-copy">Choose a nickname to start. Your nickname and grades are saved only in this browser on this device.</p>
        <p class="star-note"><span aria-hidden="true">★</span> A yellow star marks each question adapted from the quiz document’s Sample Papers 1 and 2 (PDF pages 102–151).</p>
        </div>
        <form id="nickname-form" class="nickname-form">
          <label for="nickname">Nickname</label>
          <input id="nickname" name="nickname" type="text" maxlength="24" autocomplete="nickname" required placeholder="Choose a nickname">
          <p class="field-hint">A nickname is enough. Don’t enter a password, email, or other private details.</p>
          <button class="primary-button full-button" type="submit">Continue</button>
        </form>
      </div>`;
    app.querySelector('#nickname-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const field = app.querySelector('#nickname');
      nickname = field.value.trim().slice(0, 24);
      if (!nickname) {
        field.focus();
        return;
      }
      writeStorage(NAME_KEY, nickname);
      renderDashboard();
    });
    app.querySelector('#nickname').focus();
  }

  function averageGrade() {
    if (!attempts.length) return null;
    return attempts.reduce((sum, item) => sum + Number(item.grade || 0), 0) / attempts.length;
  }

  function renderDashboard() {
    const average = averageGrade();
    const passed = attempts.filter((item) => item.passed).length;
    const recent = attempts.slice(-6).reverse();
    const versionOptions = versions.map((item, index) => `<option value="version-${index}">${escapeHtml(item.title)}</option>`).join('');
    const documentOptions = documentSets.map((item) => `<option value="${item.id}">${escapeHtml(item.title)}</option>`).join('');
    app.innerHTML = `
      <div class="dashboard-head">
        <div>
          <p class="eyebrow">WELCOME BACK</p>
          <h2 class="dashboard-title">${escapeHtml(nickname)}</h2>
          <p class="body-copy">Random and numbered tests have 10 questions. Document practice has 40 or 80. Every grade is out of 10; <strong>8/10 or higher passes.</strong></p>
        </div>
        <span class="pass-pill">PASS ≥ 8</span>
      </div>
      <div class="stats-grid" aria-label="Your results">
        <article class="stat-card stat-primary"><span>Global average</span><strong>${average === null ? '—' : average.toFixed(1)}<small>/10</small></strong><em>${attempts.length ? 'Arithmetic mean of all completed attempts' : 'Complete a test to start your average'}</em></article>
        <article class="stat-card"><span>Tests completed</span><strong>${attempts.length}</strong><em>Saved on this device</em></article>
        <article class="stat-card"><span>Passed</span><strong>${passed}</strong><em>Grade of 8/10 or higher</em></article>
      </div>
      <div class="start-panel">
        <div class="start-copy"><h3>Ready for a practice test?</h3><p>Questions and answer choices are shuffled each time. <span class="star-inline">★</span> marks questions adapted from the quiz document.</p></div>
        <div class="start-controls">
          <label class="sr-only" for="version-select">Choose a version or randomize</label>
          <select id="version-select" aria-label="Choose a version">
            <option value="random">Random version · 10 questions</option>${versionOptions}${documentOptions}
          </select>
          <button class="primary-button" id="start-button" type="button">Start test</button>
        </div>
      </div>
      <details class="nickname-edit">
        <summary>Change nickname</summary>
        <form id="edit-nickname-form" class="edit-form">
          <label class="sr-only" for="edit-nickname">New nickname</label>
          <input id="edit-nickname" type="text" maxlength="24" autocomplete="nickname" value="${escapeHtml(nickname)}" required>
          <button class="secondary-button" type="submit">Save nickname</button>
        </form>
      </details>
      <section class="history-section">
        <div class="section-heading"><h3>Recent results</h3><span>${attempts.length} total</span></div>
        ${recent.length ? `<ul class="history-list">${recent.map(historyRow).join('')}</ul>` : '<p class="empty-history">Your results will appear here after your first test.</p>'}
      </section>
      <p class="privacy-note">This version stores your nickname and grades in this browser only. They do not sync to GitHub or another device.</p>`;

    app.querySelector('#start-button').addEventListener('click', () => {
      const choice = app.querySelector('#version-select').value;
      startTest(choice);
    });
    app.querySelector('#edit-nickname-form').addEventListener('submit', (event) => {
      event.preventDefault();
      nickname = app.querySelector('#edit-nickname').value.trim().slice(0, 24);
      if (!nickname) return;
      writeStorage(NAME_KEY, nickname);
      renderDashboard();
    });
  }

  function historyRow(item) {
    const date = new Date(item.completedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    return `<li class="history-row">
      <span class="history-version">${escapeHtml(item.version)}</span>
      <span class="history-date">${escapeHtml(date)}</span>
      <strong class="history-grade">${Number(item.grade).toFixed(1)}/10</strong>
      <span class="result-badge ${item.passed ? 'result-pass' : 'result-fail'}">${item.passed ? 'Passed' : 'Failed'}</span>
    </li>`;
  }

  function startTest(choice) {
    if (choice.startsWith('version-')) {
      const chosenIndex = Number(choice.slice('version-'.length));
      startQuestionSet(versions[chosenIndex].title, versions[chosenIndex].questions, chosenIndex);
      return;
    }
    const documentSet = documentSets.find((item) => item.id === choice);
    if (documentSet) {
      startQuestionSet(documentSet.title.replace(/^⭐\s*/, ''), documentSet.questions, choice);
      return;
    }
    let chosenIndex = null;
    if (choice === 'random') {
      const previous = attempts[attempts.length - 1]?.versionIndex;
      const choices = versions.map((_, index) => index).filter((index) => versions.length < 2 || index !== previous);
      chosenIndex = choices[Math.floor(Math.random() * choices.length)];
    }
    const sourceVersion = versions[chosenIndex];
    startQuestionSet(sourceVersion.title, sourceVersion.questions, chosenIndex);
  }

  function startQuestionSet(title, questionList, versionIndex) {
    const shuffledQuestions = shuffle(questionList).map((item) => {
      const shuffledOptions = shuffle(item.options.map((text, index) => ({ text, correct: index === item.answer })));
      return {
        ...item,
        options: shuffledOptions.map((option) => option.text),
        answer: shuffledOptions.findIndex((option) => option.correct)
      };
    });
    current = { version: title, versionIndex, questions: shuffledQuestions, responses: [] };
    questionIndex = 0;
    selected = null;
    locked = false;
    reviewVisible = false;
    renderQuestion();
  }

  function renderQuestion() {
    const item = current.questions[questionIndex];
    const completeBefore = questionIndex;
    const percent = Math.round((completeBefore / current.questions.length) * 100);
    app.innerHTML = `
      <div class="quiz-head">
        <span class="question-number">${escapeHtml(current.version)}</span>
        <span class="progress-count">Question ${questionIndex + 1} of ${current.questions.length}</span>
      </div>
      ${item.isDocument ? `<p class="document-badge" aria-label="Question adapted from the quiz document"><span aria-hidden="true">★</span> From quiz document · ${escapeHtml(item.documentLabel)}</p>` : ''}
      <div class="progress-track" role="progressbar" aria-label="Test progress" aria-valuemin="0" aria-valuemax="${current.questions.length}" aria-valuenow="${completeBefore}">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <h2 class="question" id="question-title" tabindex="-1">${escapeHtml(item.question)}</h2>
      <fieldset class="answers" aria-labelledby="question-title">
        <legend class="sr-only">Choose one answer</legend>
        ${item.options.map((option, i) => {
          const state = locked ? (i === item.answer ? 'is-correct' : i === selected ? 'is-wrong' : 'is-muted') : '';
          return `<label class="answer ${state}">
            <input type="radio" name="answer" value="${i}" ${selected === i ? 'checked' : ''} ${locked ? 'disabled' : ''}>
            <span class="answer-letter">${String.fromCharCode(65 + i)}.</span>
            <span>${escapeHtml(option)}</span>
          </label>`;
        }).join('')}
      </fieldset>
      ${locked ? feedbackMarkup(item) : ''}
      <div class="actions">
        <span class="helper-text">${locked ? 'Read the reason, then continue.' : 'Choose one answer, then check it.'}</span>
        <button class="primary-button" id="action-button" ${!locked && selected === null ? 'disabled' : ''}>
          ${locked ? (questionIndex === current.questions.length - 1 ? 'See my grade' : 'Next question') : 'Check answer'}
        </button>
      </div>`;

    app.querySelectorAll('input[name="answer"]').forEach((radio) => {
      radio.addEventListener('change', (event) => {
        selected = Number(event.target.value);
        app.querySelector('#action-button').disabled = false;
      });
    });
    app.querySelector('#action-button').addEventListener('click', onQuestionAction);
  }

  function feedbackMarkup(item) {
    const correct = selected === item.answer;
    return `<section class="feedback ${correct ? 'correct' : 'incorrect'}" aria-live="assertive">
      <div class="feedback-title"><span aria-hidden="true">${correct ? '✓' : '↗'}</span>${correct ? 'Correct' : 'Not quite — the correct answer is ' + String.fromCharCode(65 + item.answer)}</div>
      ${correct ? '' : `<p><strong>${escapeHtml(item.options[item.answer])}</strong></p>`}
      <p>${escapeHtml(item.explanation)}</p>
      <span class="source-label">Explanation based on ${escapeHtml(item.source)}${item.documentLabel ? ` · ${escapeHtml(item.documentLabel)}` : ''}</span>
    </section>`;
  }

  function onQuestionAction() {
    if (!locked) {
      if (selected === null) return;
      locked = true;
      current.responses[questionIndex] = selected;
      renderQuestion();
      app.querySelector('#action-button').focus();
      return;
    }
    if (questionIndex === current.questions.length - 1) {
      finishTest();
      return;
    }
    questionIndex += 1;
    selected = null;
    locked = false;
    renderQuestion();
    app.querySelector('#question-title').focus();
  }

  function finishTest() {
    const correct = current.questions.reduce((sum, item, index) => sum + (current.responses[index] === item.answer ? 1 : 0), 0);
    const grade = (correct / current.questions.length) * 10;
    const attempt = {
      nickname,
      version: current.version,
      versionIndex: current.versionIndex,
      correct,
      total: current.questions.length,
      grade,
      passed: grade >= PASS_GRADE,
      completedAt: new Date().toISOString()
    };
    attempts.push(attempt);
    writeStorage(HISTORY_KEY, attempts);
    reviewVisible = false;
    renderFinish(attempt);
  }

  function renderFinish(attempt) {
    const average = averageGrade();
    const status = attempt.passed ? 'PASSED' : 'NOT PASSED';
    const review = reviewVisible ? `<section class="review" aria-label="Answer review">
      <h3>Review this test</h3>
      ${current.questions.map((item, index) => {
        const correct = current.responses[index] === item.answer;
        return `<article class="review-item">
          <p class="review-q">${item.isDocument ? '<span class="review-star" aria-label="From quiz document">★</span>' : ''}${index + 1}. ${escapeHtml(item.question)}</p>
          <p class="review-meta"><strong>Your answer:</strong> ${escapeHtml(item.options[current.responses[index]])}${correct ? ' · Correct' : ' · Correct answer: ' + escapeHtml(item.options[item.answer])}<br>${escapeHtml(item.explanation)}<br><strong>Source:</strong> ${escapeHtml(item.source)}</p>
        </article>`;
      }).join('')}
    </section>` : '';
    app.innerHTML = `<div class="finish">
      <div class="finish-icon ${attempt.passed ? 'finish-pass' : 'finish-fail'}" aria-hidden="true">${attempt.passed ? '✓' : '↻'}</div>
      <p class="eyebrow">${escapeHtml(current.version)} COMPLETE</p>
      <h2>${status}</h2>
      <p class="finish-copy">${attempt.passed ? 'You reached the passing grade of 8/10.' : 'You need at least 8/10 to pass. Review the explanations and try another shuffled version.'}</p>
      <div class="finish-scores">
        <div class="score"><strong>${attempt.grade.toFixed(1)}</strong><small>Your grade / 10<br>${attempt.correct} of ${attempt.total} correct</small></div>
        <div class="score score-average"><strong>${average.toFixed(1)}</strong><small>Global average / 10<br>Across ${attempts.length} completed ${attempts.length === 1 ? 'test' : 'tests'}</small></div>
      </div>
      <div class="finish-actions">
        <button class="secondary-button" id="review-button">${reviewVisible ? 'Hide answers' : 'Review answers'}</button>
        <button class="primary-button" id="dashboard-button">Back to results</button>
      </div>
      ${review}
    </div>`;
    app.querySelector('#review-button').addEventListener('click', () => {
      reviewVisible = !reviewVisible;
      renderFinish(attempt);
    });
    app.querySelector('#dashboard-button').addEventListener('click', renderDashboard);
  }

  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
