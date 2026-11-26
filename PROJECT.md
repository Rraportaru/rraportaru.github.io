# Project description

- **Name:** AI Governance Practice
- **Description:** A phone-friendly browser app with 20 randomized 10-question tests plus 80 starred sample-paper practice questions, instant workbook-grounded feedback, nickname-based progress, and an overall average grade.
- **Purpose:** Help the learner check understanding and learn from each answer using only the supplied learner workbook.
- **Status:** 20 test versions (200 original questions) and 80 starred sample-paper questions are published at `https://rraportaru.github.io/`; phone testing is pending.
- **Main location:** `~/Desktop/Projects/AI-Governance-Practice/`
- **Created:** 2026-11-26
- **Last updated:** 2026-11-26


## Current state

The source folder contains `ITIL_AI-Governance_Learner_Workbook_EN_v5.0.pdf` and `quiz document.pdf`. The browser app contains 20 versions of 10 original questions each plus 80 adapted questions from Sample Papers 1 and 2 (PDF pages 102–151), randomized question and option order, immediate explanations with workbook references, nickname storage, per-attempt pass/fail, and an arithmetic average of completed grades. It is published at the GitHub Pages user-site root; the PDFs are not in the public repository.

## Important decisions

- Use 10 questions per version, for 200 total, following the learner’s latest count.
- Mark each test out of 10 and pass at 8/10 or higher.
- Store the nickname and attempt history in local browser storage; do not send learner data to a server.
- Show feedback immediately after each answer, including the correct answer and an explanation for both correct and incorrect responses.
- Mark questions adapted from the sample papers with a yellow star beside the question; explain the marker only on the landing page.
- Hide the large landing-page introduction during a quiz to keep the phone question screen focused.
- Keep the test data separate from app behavior so future versions can be added on request.

## Next steps

1. Have the learner open the published site on iPhone Safari and try both document papers and the combined set.
2. Address any corrections the learner reports.
3. Add cross-device progress sync only if requested later.

## Open questions

- Nickname and grades remain local to the browser and do not sync between devices.
