# frontend-prd.md — AI-Native Hackathon Platform (Internal)

## 1. Purpose of This Document

This document defines **what the frontend must support**, from a **product perspective only**.

It specifies:
- Screens/pages
- Who uses them
- What actions are possible
- What data is shown or collected
- Which backend APIs are involved (high-level)

It **does NOT** define:
- Components
- State management
- Routing frameworks
- Styling
- Error handling strategies
- Testing plans

Those belong to implementation docs.

---

## 2. User Roles (Frontend Perspective)

### Organizer
- Creates and manages hackathons
- Oversees participants, teams, submissions, judging
- Views leaderboards and summaries

### Builder
- Joins hackathon
- Forms or joins a team
- Creates a project
- Submits final work

### Judge
- Reviews submissions
- Scores projects using rubric
- Leaves feedback

> Note: Role enforcement is **UI-level only** in MVP.

---

## 3. Screen Inventory (Authoritative)

### 3.1 Hackathon List
**Primary user:** Organizer

**Purpose**
- View all hackathons
- Create a new hackathon
- Open an existing hackathon

**Key Actions**
- Create hackathon
- Open hackathon

**Data Shown**
- Hackathon name
- Status
- Start / end dates

**Backend APIs (high-level)**
- List hackathons (tables → rows)
- Create hackathon (tables → insert row)

---

### 3.2 Hackathon Overview
**Primary user:** Organizer

**Purpose**
- Central control panel for a single hackathon

**Key Actions**
- Navigate to setup, participants, teams, submissions, judging, leaderboard
- View high-level counts

**Data Shown**
- Hackathon metadata
- Counts: participants, teams, projects, submissions

**Backend APIs**
- Read from multiple tables
- (Optional) semantic search over submissions

---

### 3.3 Hackathon Setup
**Primary user:** Organizer

**Purpose**
- Configure tracks, rubric, and lifecycle state

**Key Actions**
- Add tracks
- Define judging rubric
- Move hackathon between DRAFT / LIVE / CLOSED

**Data Collected**
- Track name + description
- Rubric criteria (stored as JSON text)

**Backend APIs**
- Insert track rows
- Insert rubric row
- Hackathon status persisted as table data

---

### 3.4 Participants
**Primary user:** Organizer

**Purpose**
- Register people and assign roles in the hackathon

**Key Actions**
- Add participant
- Assign participant to hackathon with role

**Data Collected**
- Name
- Email
- Role (Builder / Judge / Mentor / Organizer)

**Backend APIs**
- Insert participant row
- Insert hackathon_participant row

---

### 3.5 Teams
**Primary user:** Builder / Organizer

**Purpose**
- Form teams within a hackathon

**Key Actions**
- Create team
- Assign track to team
- Add team members

**Data Collected**
- Team name
- Track
- Team members

**Backend APIs**
- Insert team row
- Insert team_member rows

---

### 3.6 Projects
**Primary user:** Builder

**Purpose**
- Define what the team is building

**Key Actions**
- Create project
- Attach repository and demo links

**Data Collected**
- Project title
- One-liner
- Repo URL
- Demo URL

**Backend APIs**
- Insert project row

---

### 3.7 Submissions
**Primary users:** Builder (submit), Organizer/Judge (review)

**Purpose**
- Capture final hackathon output
- Make submissions searchable

**Key Actions**
- Submit project
- View all submissions
- Search submissions semantically

**Data Collected**
- Submission narrative text
- Artifact links (JSON text)

**Backend APIs**
- Insert submission row
- Embed-and-store submission document
- Semantic search over submissions namespace

---

### 3.8 Judging
**Primary user:** Judge

**Purpose**
- Score and review submissions

**Key Actions**
- View submission details
- Enter rubric scores
- Leave feedback

**Data Collected**
- Per-criteria scores
- Feedback text
- Total score

**Backend APIs**
- Insert score row
- Read rubric + submissions

---

### 3.9 Leaderboard
**Primary user:** Organizer

**Purpose**
- Rank projects and determine winners

**Key Actions**
- View ranked list
- Filter by track
- Export results

**Data Shown**
- Project
- Team
- Average score
- Number of judges

**Backend APIs**
- Read scores, submissions, projects, teams
- Aggregation performed client-side (MVP)

---

## 4. Navigation Rules

- Hackathon context is always explicit (hackathon_id)
- All hackathon-related screens live under a single hackathon
- Navigation is linear but non-blocking:
  - Setup → Participants → Teams → Projects → Submissions → Judging → Leaderboard

---

## 5. Data Boundaries (Frontend Responsibility)

Frontend **must**:
- Send correct table payloads (`row_data`)
- Use correct namespaces for embeddings
- Prevent unsupported actions in UI (e.g. submitting after CLOSED)

Frontend **must not**:
- Invent backend behavior
- Assume row updates exist
- Perform business logic beyond simple aggregation

---

## 6. Out of Scope (Explicit)

- Styling / visual design
- Component hierarchy
- State management strategy
- Authentication implementation
- Real-time updates
- Notifications
- File uploads

---

## 7. Acceptance Criteria (Frontend PRD)

This frontend PRD is complete if:
- Every screen maps to a clear user intent
- Every action maps to an existing backend capability
- No implementation assumptions are embedded
- A frontend engineer can ask **“what do I build?”** and find the answer here

---
