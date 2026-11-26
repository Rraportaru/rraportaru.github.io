# Project description

- **Name:** AI Governance Practice
- **Description:** A phone-friendly browser app with 20 randomized 10-question tests, instant workbook-grounded feedback, nickname-based progress, and an overall average grade.
- **Purpose:** Help the learner check understanding and learn from each answer using only the supplied learner workbook.
- **Status:** 20 test versions (200 questions) are implemented; responsive and installable for Safari/GitHub Pages. Publishing to `https://rraportaru.github.io/` is in progress.
- **Main location:** `~/Desktop/Projects/AI-Governance-Practice/`
- **Created:** 2026-11-26
- **Last updated:** 2026-11-26

## Current state

The source folder contains `ITIL_AI-Governance_Learner_Workbook_EN_v5.0.pdf` and `quiz document.pdf`. The browser app contains 20 versions of 10 original questions each, randomized question and option order, immediate explanations with module references, nickname storage, per-attempt pass/fail, and an arithmetic average of completed grades. It is prepared for GitHub Pages and iPhone Safari at the user-site root.

## Important decisions

- Use 10 questions per version, for 200 total, following the learner’s latest count.
- Mark each test out of 10 and pass at 8/10 or higher.
- Store the nickname and attempt history in local browser storage; do not send learner data to a server.
- Show feedback immediately after each answer, including the correct answer and an explanation for both correct and incorrect responses.
- Keep the test data separate from app behavior so future versions can be added on request.

## Next steps

1. Have the learner try the 20 versions on desktop and iPhone Safari and report any corrections.
2. Publish after the user supplies or confirms the GitHub repository for `rraportaru`.

## Open questions

- No GitHub repository URL or remote is configured, so publishing is not complete.
- Nickname and grades remain local to the browser and do not sync between devices.
