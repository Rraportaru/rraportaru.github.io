# Project description

- **Name:** AI Governance Practice
- **Description:** A phone-friendly ITIL AI Governance quiz with 200 regular questions and 80 sample-paper questions with their answer rationales. Each 10-question attempt automatically mixes five regular and five starred questions and shuffles question and answer order.
- **Purpose:** Help the learner check understanding using the supplied learner workbook and exact sample-paper questions and rationales.
- **Status:** The app with 200 regular questions and 80 PDF-sourced starred questions grouped internally into 16 sets of five is published at `https://rraportaru.github.io/`. Its filter exposes one automatic random mixed test. Phone testing is pending.
- **Main location:** `~/Desktop/Projects/AI-Governance-Practice/`
- **Created:** 2026-11-26
- **Last updated:** 2026-11-27


## Current state

The browser app contains 200 regular questions plus 80 sample-paper questions with PDF wording, answer choices, answer keys, and rationales. Those questions are grouped internally into 16 groups of five. Each attempt automatically selects five questions from each pool and shuffles them and their answer choices. Nickname storage, per-attempt pass/fail, and the arithmetic average of completed grades remain local to the browser. Source PDFs are not in the public repository.

## Important decisions

- Keep the 200 regular questions. Keep the 80 starred sample-paper questions grouped as 16 internal groups of five, without showing group numbers in the filter.
- Automatically mix five regular and five starred questions in every 10-question attempt.
- Mark each test out of 10 and pass at 8/10 or higher.
- Store the nickname and attempt history in local browser storage; do not send learner data to a server.
- Show feedback immediately after each answer, including the correct answer and an explanation for both correct and incorrect responses.
- Mark sample-paper questions with a yellow star beside the question; explain the marker only on the landing page.
- Hide the large landing-page introduction during a quiz to keep the phone question screen focused.
- Keep the test data separate from app behavior so future versions can be added on request.

## Next steps

1. Have the learner open the random mixed test on iPhone Safari.
2. Address any corrections the learner reports.

## Open questions

- Nickname and grades remain local to the browser and do not sync between devices.
