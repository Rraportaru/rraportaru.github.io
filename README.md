# AI Governance Practice

A phone-friendly static web app for practicing ITIL AI Governance. It contains **200 regular questions** and **80 starred questions copied from the supplied Sample Papers 1 and 2**, including their answer choices, answer key, and rationales. The 80 starred questions are divided into 16 internal groups of five. Each attempt automatically selects five regular and five starred questions, shuffles their order and answer choices, and is marked out of 10; **8/10 or higher passes**.

## Start locally

Open `index.html` in a browser. No packages or server are required for a basic local preview. The offline install feature becomes available when served over HTTPS, such as through GitHub Pages.

## Use the quiz

1. Enter a nickname. Do not enter a password, email, or other private details.
2. Start the random mixed test. The filter has no numbered versions.
3. The app automatically selects five regular and five starred questions, then shuffles question and answer order.
4. After each response, see the correct answer and the four rationales from the sample-paper answer section.
5. At the end, see pass/fail, the test grade, and the global arithmetic average across completed attempts.

Questions with a yellow star come from the quiz document. The landing page explains the star; during a quiz it appears beside the question. The source PDFs are not published with the app.

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
- `document-questions.js` — 80 starred sample-paper questions and rationales, grouped internally into 16 sets
- `app.js` — nickname, randomization, grading, history, and quiz behavior
- `styles.css` — responsive layout and touch-friendly controls
- `manifest.webmanifest`, `app-icon.svg`, PNG icons, `sw.js` — install and offline support
