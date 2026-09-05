# Optional Learning Content

Optional learning content is attached to a Chapter through `optionalNodes`. It is shown on a side branch and never participates in required Stage progression, stars, or atomic Skill Mastery.

## Current MVP

- **Riddles:** a compact `riddle` side node with a title, Hebrew prompt, and required thinking difficulty (`easy`, `medium`, or `hard`).
- **Open-response submission:** every riddle collects a written solution. Each submit creates a separate offline-first artifact with `submitted` status, preserving practical resubmission history without requiring a reviewer.
- **Optional final-answer checking:** a riddle may declare a small list of accepted final answers. This check is stored alongside the response but never marks the written solution reviewed or affects Mastery.
- **Riddle difficulty:** shown as one to three dots plus the Hebrew labels קל, בינוני, and קשה. It describes thinking demand rather than curriculum or school grade.
- **Image/media support:** reusable responsive image media supports an asset reference, alt text, instructional/decorative semantics, and an optional caption. The same component is available to questions, riddles, and later resources.
- **Video/link/tool resources:** small external resource definitions carry a type, title, optional description/source/duration/media, a safe URL, and explicit external-opening behavior. Opening a resource does not complete it or award stars.
- **Optional side-node UX:** riddles and resources use a shared purple side-branch family with distinct type icons. The required center path stays visually dominant and no horizontal navigation is needed.

Riddle submissions are separate from normal mathematical `Attempt` records. They sync through their own append-only backend collection and are not inputs to current scoring, progression, or Mastery.

## Future roadmap — DO NOT IMPLEMENT NOW

### Open-response evaluation

1. Teacher review.
2. AI-assisted feedback.
3. Peer review after learner eligibility and quality rules.

The current status field leaves room for `reviewed`, `accepted`, and `needs-revision`, but the MVP creates only `submitted` records and exposes no unavailable review controls.

### Internal Atomic articles

- Short concept explanation.
- Worked example.
- Optional media.
- Return-to-path action.

The `article` icon/type is reserved in the resource vocabulary. A rich internal article system is not part of the MVP.

### Graph renderer

A future lightweight responsive SVG component may support:

- axes;
- grid;
- points;
- line segments;
- functions;
- labels;
- configurable ranges.

It should remain a focused learning renderer rather than a CAS or Desmos replacement.

### Geometry renderer

A future lightweight SVG model may support:

- points;
- segments;
- polygons;
- triangles;
- angle marks;
- equality marks;
- labels;
- lengths.

Use a static SVG or image first whenever it is sufficient.

### Rich media

Possible later additions include multiple images, interactive diagrams, and embedded simulations. The MVP intentionally accepts one safe image description and never arbitrary HTML.

### AI riddle feedback

AI should initially provide formative feedback rather than authoritative grading. A machine-checkable final answer is not evidence that an explanation has been reviewed.

### Peer review

Peer review remains future work. It requires:

- eligibility rules;
- confirmation that the learner already solved or reviewed the riddle;
- moderation and safety controls;
- quality controls;
- teacher override.
