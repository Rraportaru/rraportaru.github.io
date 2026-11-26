# AI Governance Practice

A phone-friendly static web app for practicing ITIL AI Governance. It contains **20 versions with 10 original questions each (200 total)** and **80 starred, paraphrased questions from Sample Papers 1 and 2 in quiz document PDF pages 102–151**. Each attempt is marked out of 10; a grade of **8/10 or higher passes**.

## Start locally

Open `index.html` in a browser. No packages or server are required for a basic local preview. The offline install feature becomes available when served over HTTPS, such as through GitHub Pages.

## Use the quiz

1. Enter a nickname. Do not enter a password, email, or other private details.
2. Choose a random test, one of the 20 versions, a 40-question sample paper, or all 80 document questions.
3. Questions and answer choices are shuffled each time.
4. After each response, see the correct answer and its workbook-based explanation.
5. At the end, see pass/fail, the test grade, and the global arithmetic average across completed attempts. Longer document tests are scaled to a grade out of 10.

Questions with a yellow star are adapted from the quiz document. The landing page explains the star; during a quiz it appears by itself beside the question. Explanations are based on the learner workbook and show workbook topics; the source PDFs are not published with the app.

The global average includes every completed attempt, including retries. The pass threshold is 8/10.

## iPhone and Safari

The layout supports narrow touch screens, large tap targets, safe-area insets, and standalone web-app metadata. On iPhone, open the published HTTPS page in Safari, use **Share → Add to Home Screen**, then open it from the Home Screen. The service worker caches the app files for later offline loading after the first visit.

The nickname and results are saved in browser storage on that device. They do not sync between devices and are not sent to GitHub. Clearing Safari website data clears the saved progress.

## Published site

Open the app at **https://rraportaru.github.io/**. It is published from the root of the public `Rraportaru/rraportaru.github.io` repository on the `main` branch.

On iPhone, open the link in Safari and use **Share → Add to Home Screen** to add it as a web app.

The PDFs remain in their original Desktop folder and are not part of the web app. Nickname and grade history stay on each device.

## Files

- `questions.js` — 20 test versions and their explanations
- `document-questions.js` — 80 starred practice questions adapted from the two sample papers
- `app.js` — nickname, randomization, grading, history, and quiz behavior
- `styles.css` — responsive layout and touch-friendly controls
- `manifest.webmanifest`, `app-icon.svg`, PNG icons, `sw.js` — install and offline support
