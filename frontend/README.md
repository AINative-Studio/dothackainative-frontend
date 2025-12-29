# DotHack - Hackathon Management Platform

A complete hackathon management platform built with Next.js, TypeScript, and shadcn/ui. Manage participants, teams, projects, submissions, judging, and leaderboards all in one place.

## Features

### Marketing Site
- **Landing Page**: Hero section with feature highlights and "how it works"
- **Features Page**: Detailed breakdown of all platform capabilities
- **Pricing Page**: Three-tier pricing structure (demo only)
- **Documentation**: Complete user guide and route structure
- **Contact Page**: Contact form with demo submission

### Hackathon Management App
- **Setup**: Create hackathons, define tracks, build rubrics, manage event status
- **Participants**: Add participants and assign roles (Builder, Judge, Mentor, Organizer)
- **Teams**: Form teams, assign members, designate team leads
- **Projects**: Track projects from idea to submission
- **Submissions**: Submit work with narrative and artifacts, search functionality
- **Judging**: Score submissions based on custom rubrics with feedback
- **Leaderboard**: Real-time rankings with track filtering and CSV export

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Context (in-memory only)

## Architecture

### Route Structure

```
app/
  (marketing)/          # Public marketing site
    layout.tsx
    page.tsx           # Landing page
    features/
    pricing/
    docs/
    contact/
  (app)/               # Internal hackathon app
    layout.tsx
    hackathons/
      page.tsx                              # List all hackathons
      [hackathonId]/
        page.tsx                            # Overview
        setup/page.tsx                      # Configuration
        participants/page.tsx               # Participant management
        teams/page.tsx                      # Team management
        projects/page.tsx                   # Project tracking
        submissions/page.tsx                # Submission portal
        judging/page.tsx                    # Judging interface
        leaderboard/page.tsx               # Rankings & results
```

### Data Model

All data is stored in client-side memory using React Context. State includes:

- **Hackathons**: Event metadata with status (DRAFT, LIVE, CLOSED)
- **Tracks**: Project categories/themes
- **Participants**: User information with roles
- **Teams**: Team composition with optional track assignment
- **Projects**: Team projects with status tracking
- **Submissions**: Project submissions with artifacts
- **Rubrics**: Custom judging criteria
- **Scores**: Judge evaluations with feedback

### Key Features

#### Append-Only Status Management
Hackathon status changes are append-only. Each status change creates a new entry with the same `hackathon_id` but updated `status` and `created_at` timestamp. The current status is always the most recent entry.

#### Role-Based UI
The app includes a role switcher that simulates different user perspectives:
- **Organizer**: Full access to all features
- **Builder**: Access to teams, projects, submissions, leaderboard
- **Judge**: Access to submissions, judging, leaderboard

#### Smart Submission Control
When a hackathon status changes to CLOSED, the submission form is automatically disabled to enforce deadlines.

#### Leaderboard Aggregation
Scores are automatically aggregated per project/team. Rankings are calculated based on average total scores across all judges. Filter by track and export results as CSV.

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Build for production:
```bash
npm run build
npm start
```

## Usage

### Creating a Hackathon

1. Navigate to `/hackathons`
2. Click "Create Hackathon"
3. Fill in name, description, start/end dates
4. Hackathon starts in DRAFT status

### Setup Configuration

1. Go to Setup page
2. Add tracks for project categorization
3. Create judging rubrics with JSON criteria
4. Change status to LIVE when ready to begin

### Managing Participants

1. Go to Participants page
2. Add participants with name, email, organization
3. Assign roles: BUILDER, JUDGE, MENTOR, or ORGANIZER

### Forming Teams

1. Go to Teams page
2. Create teams with optional track assignment
3. Add members from registered participants
4. Designate team leads

### Project Workflow

1. Teams create projects on Projects page
2. Add title, description, repo/demo links
3. Update status: IDEA → BUILDING → SUBMITTED
4. Submit work on Submissions page

### Judging Process

1. Judges navigate to Judging page
2. View submissions and rubric criteria
3. Score each criterion
4. Add optional feedback
5. Submit scores

### Viewing Results

1. Navigate to Leaderboard page
2. View rankings sorted by average score
3. Filter by track (optional)
4. Export results as CSV

## Important Limitations

This is a **frontend-only demonstration**:

- **No Persistence**: All data lives in browser memory only
- **No Backend**: No API routes or server-side logic
- **No Authentication**: Role switching is UI simulation only
- **No External Services**: No database, no network calls
- **Refresh Resets**: Page refresh clears all data

This is intentional for demo purposes. In production, you would add:
- Database integration (e.g., Supabase)
- Authentication system
- API routes for data operations
- File upload for artifacts
- Email notifications
- Real-time collaboration features

## Project Structure

```
├── app/
│   ├── (marketing)/      # Marketing site pages
│   ├── (app)/           # Hackathon app pages
│   ├── layout.tsx       # Root layout with StoreProvider
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── types.ts         # TypeScript type definitions
│   ├── store.tsx        # React Context store
│   └── utils.ts         # Utility functions
└── README.md
```

## Design Principles

- **Clean & Modern**: Professional design using shadcn/ui components
- **Responsive**: Works on mobile, tablet, and desktop
- **Role-Based**: Different views for different user types
- **Production-Ready UI**: All features fully functional in the demo
- **Type-Safe**: Full TypeScript coverage
- **Accessible**: Built on Radix UI primitives

## Contributing

This is a demonstration project. To extend it:

1. Add persistence layer (database)
2. Implement authentication
3. Add API routes for server operations
4. Implement file uploads
5. Add real-time features
6. Integrate email notifications

## License

MIT
