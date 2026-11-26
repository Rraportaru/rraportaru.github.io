# AI Governance Practice

A phone-friendly static web app for practicing ITIL AI Governance. It contains **20 versions with 10 questions each (200 original questions)**. Each test is marked out of 10; a grade of **8/10 or higher passes**.

## Start locally

Open `index.html` in a browser. No packages or server are required for a basic local preview. The offline install feature becomes available when served over HTTPS, such as through GitHub Pages.

## Use the quiz

1. Enter a nickname. Do not enter a password, email, or other private details.
2. Choose a random test or select a version.
3. Questions and answer choices are shuffled each time.
4. After each response, see the correct answer and its workbook-based explanation.
5. At the end, see pass/fail, the test grade, and the global arithmetic average across completed attempts.

The global average includes every completed attempt, including retries. The pass threshold is 8/10.

## iPhone and Safari

The layout supports narrow touch screens, large tap targets, safe-area insets, and standalone web-app metadata. On iPhone, open the published HTTPS page in Safari, use **Share → Add to Home Screen**, then open it from the Home Screen. The service worker caches the app files for later offline loading after the first visit.

The nickname and results are saved in browser storage on that device. They do not sync between devices and are not sent to GitHub. Clearing Safari website data clears the saved progress.

## Publish with GitHub Pages

The app uses relative file paths and is being prepared for the user Pages address `https://rraportaru.github.io/`.

1. Use the user-site repository `Rraportaru.github.io` under `rraportaru`.
2. Publish the app files from the repository root on the `main` branch.
3. Configure GitHub Pages to deploy from branch `main`, folder `/ (root)`.
4. Open `https://rraportaru.github.io/` in iPhone Safari. Use **Share → Add to Home Screen** to add it as a web app.

The PDFs remain in their original Desktop folder and are not part of the web app. Nickname and grade history stay on each device.

## Files

- `questions.js` — 20 test versions and their explanations
- `app.js` — nickname, randomization, grading, history, and quiz behavior
- `styles.css` — responsive layout and touch-friendly controls
- `manifest.webmanifest`, `app-icon.svg`, PNG icons, `sw.js` — install and offline support
