**HISTORICAL IDEA BACKLOG.** Retained for ideas such as keeping potential speed-based points/confidence separate from base difficulty. The Topic-rating model, adaptive-difficulty rules, DEV write policy and priorities below are historical proposals, not current architecture or adopted requirements. See the [documentation index](README.md), [architecture](ARCHITECTURE.md) and [current curriculum roadmap](GRADE8_CURRICULUM_ROADMAP.md).

---

# 🚀 Atomic Math – Learning Engine Roadmap

## 🎯 Vision

Atomic Math is not just a question runner.
It is designed to evolve into an adaptive micro-learning engine that:

- Measures difficulty per question
- Estimates player skill per topic
- Adapts session difficulty dynamically (harder after correct, easier after incorrect)
- Supports multiple learning modes
- Enables future teacher and classroom integration

**Current priority:** strengthen the **core learning engine** before building infrastructure (users, backend, admin, etc.).

---

# 🧱 Product Layers Overview

## 🔵 Layer A – Core Learning Engine (Highest Priority)

These features directly affect learning quality and adaptive behavior.

---

## 1️⃣ Question Difficulty Model

Each question should maintain a difficulty score.
**Short-term recommendation:** base initial difficulty primarily on **success rate**, and track time separately.

### Inputs (initial version)

- Attempts count
- Correct count
- (Optional, tracked but not used for difficulty initially) average time / rolling average

### Conceptual Model (initial)

```ts
difficultyScore = 1 - successRate;
```

> Time can later influence **points gained** or **confidence**, but should not be mixed into the difficulty score in the first iteration.

---

## 2️⃣ Player Skill Rating (Per Topic)

Each player has a skill rating per topic.

```ts
playerSkill[topicId]: number
```

### Updated After

- Each rated session (v1)
- Each rated question (future enhancement)

### Enables

- Adaptive sessions
- Progress tracking
- Weakness detection

---

## 3️⃣ Adaptive Difficulty Mechanism

Core adaptive rule:

- ✅ If the player answers correctly → next question should be harder
- ❌ If the player answers incorrectly → next question should be easier

### Conceptual Logic

```ts
if (correct) increase targetDifficulty
if (incorrect) decrease targetDifficulty
```

Implementation notes:

- Compare `questionDifficulty` to `playerSkill`
- Adjust `targetDifficulty` dynamically within session

---

## 4️⃣ Rated vs Unrated Sessions

Sessions may be:

- **Rated** → affects player skill and question statistics
- **Unrated** → practice only, no rating impact

### Use Cases

- Exploration mode
- Warmups
- Teacher assignments (future)

---

## 5️⃣ Session Builder (Replace Hardcoded Selection)

Replace:

```ts
selectQuestions(topicId);
```

With:

```ts
buildSession({
  topicId,
  length,
  targetDifficulty,
  rated,
});
```

### Session Builder Responsibilities

- Topic selection
- Difficulty targeting
- Question filtering
- Avoid recently seen questions
- Future: spaced repetition prioritization

---

## 6️⃣ Time Tracking System

Track per question:

- Start timestamp
- Submission timestamp
- Response duration
- Avg time per topic

### Future Uses

- Speed-based modes
- Analytics
- Skill confidence estimation
- **Points gained** adjustments (e.g., faster-than-usual correct answers)

> **Important:** tracking time is valuable immediately, but time should affect **points/confidence** rather than the base difficulty score in v1.

---

## 7️⃣ Persistence Rule: “No Difficulty Updates in Development”

The question bank content is always **read-only at runtime**.

- **Question bank (content):** stored in repo (TS/JSON) and updated via commits/tools (not by the running app).
- **Runtime stats (difficulty/skill/time):** stored separately (local storage now; DB later).

**Rule for development (short-term):**

- In **DEV mode**, runtime stat writes should be **disabled by default** (to avoid polluting ratings).
- Allow an explicit feature flag to enable writes for testing.

Example concept:

- Default: `DEV => NoopStatsRepo` (no writes)
- Optional: `VITE_ENABLE_STATS_WRITE=true` to enable

---

# 🟢 Layer B – Personalization & Game Modes (Later)

Implemented after core engine stabilizes.

- Timed mode
- Survival mode
- Difficulty ladder
- Weakness focus mode
- Daily challenge
- Spaced repetition
- Weakness radar

---

# 🟡 Layer C – Infrastructure & Scaling (Later)

Only after engine stabilizes:

- User accounts
- Teacher/class roles
- Back office
- External question sources / APIs

---

# 🧩 Architectural Guiding Principle

Do not build infrastructure before stabilizing:

- difficulty model
- skill model
- session builder

The learning engine is the foundation. Everything else depends on it.
