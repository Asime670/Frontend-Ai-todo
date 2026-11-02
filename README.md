# Minimalist AI To-Do List Frontend

A human-designed, calm, and production-minded frontend for an AI-assisted To-Do List application built with Next.js App Router, Tailwind CSS, and Lucide React.

Designed with an editorial aesthetic: restrained borders, deliberate spacing, #FAFAFA canvas, and subtle sage green accents (#52796F). Strictly avoids noisy gradients, glassmorphism, and fabricated statistics.

---

## 1. Color System

| Token | Hex Value | Application |
|---|---|---|
| **Main Background** | `#FAFAFA` | Page canvas, secondary backgrounds |
| **Main Text** | `#1F2937` | Core body typography |
| **Primary Charcoal** | `#1E1E1E` | Headings, titles, high-emphasis text |
| **Secondary Text** | `#6B7280` | Subtitles, labels, secondary metadata |
| **Muted Text** | `#9CA3AF` | Completed items, timestamps, disabled controls |
| **Borders & Dividers** | `#E2E8F0` | Structural cards, dividers, input borders |
| **Subtle Surface** | `#F3F4F2` | Tabs, segmented controls, badge backgrounds |
| **Primary Accent (Sage)** | `#52796F` | Primary actions, checkboxes, active states |
| **Accent Hover** | `#42665D` | Hover state for buttons and links |
| **Sage Light** | `#EBF1EE` | Active navigation highlights, completed badges |
| **White Surface** | `#FFFFFF` | Cards, modals, form panels |

---

## 2. Directory Structure

```text
Ai Todo site/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.jsx               # Root layout with AuthProvider & metadata
│   │   ├── globals.css              # Custom tokens, reduced-motion rules
│   │   ├── page.jsx                 # Public landing page
│   │   ├── loading.jsx              # Global loading boundary
│   │   ├── not-found.jsx            # 404 handler
│   │   │
│   │   ├── (auth)/                  # Public auth route group
│   │   │   ├── layout.jsx
│   │   │   ├── login/page.jsx       # Login with validation & error alert
│   │   │   └── signup/page.jsx      # Signup with validation
│   │   │
│   │   └── (workspace)/             # Protected workspace route group
│   │       ├── layout.jsx           # Sidebar, MobileNav & Header
│   │       ├── dashboard/page.jsx   # Daily focus, summary, today & upcoming
│   │       ├── tasks/page.jsx       # Full CRUD, search, filter, sort
│   │       ├── calendar/page.jsx    # Month & Week views, date scheduling
│   │       ├── streaks/page.jsx     # Activity calendar & verified streaks
│   │       └── settings/page.jsx    # Profile, regional & security settings
│   │
│   ├── components/
│   │   ├── ui/                      # Button, Input, Select, Checkbox, Modal, etc.
│   │   ├── layout/                  # Sidebar, Header, MobileNav, PageContainer, UserMenu
│   │   ├── landing/                 # Hero, Features, HowItWorks, Footer
│   │   ├── tasks/                   # TaskItem, TaskList, TaskForm, TaskFilters, TaskSearch, TaskDetails, DeleteTaskDialog
│   │   ├── dashboard/               # WelcomeSection, TaskSummary, CompletionProgress, TodayTasks, UpcomingTasks
│   │   ├── calendar/                # CalendarToolbar, MonthView, WeekView, DayTasks
│   │   ├── streaks/                 # StreakSummary, ActivityCalendar
│   │   └── settings/                # ProfileSettings, AppearanceSettings, NotificationSettings
│   │
│   ├── constants/
│   │   ├── navigation.js            # Workspace nav items
│   │   └── task-options.js          # Priorities, statuses, sort options
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # User session & credentials state
│   │
│   ├── hooks/
│   │   ├── useAuth.js               # Auth context hook
│   │   ├── useTasks.js              # Comprehensive task data hook with optimistic updates
│   │   └── useDebounce.js           # Debounce utility
│   │
│   ├── lib/
│   │   ├── api.js                   # Centralized API fetcher with error normalization
│   │   ├── auth.js                  # Token & cookie session storage
│   │   ├── date-utils.js            # Timezone-safe date computations
│   │   ├── dev-tasks.js             # Isolated development demonstration data
│   │   └── utils.js                 # Tailwind class merger (cn)
│   │
│   └── services/
│       ├── authService.js           # /auth/login, /auth/signup, /auth/me, /auth/logout
│       ├── taskService.js           # GET /tasks, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id
│       ├── userService.js           # /user/profile, /user/preferences
│       ├── calendarService.js       # /calendar (with graceful taskService fallback)
│       └── streakService.js         # /streaks (with graceful offline isolation)
│
├── .env.example
├── .env.local
├── .gitignore
├── jsconfig.json
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

---

## 3. Backend API Integration Layer

The frontend is connected to backend endpoints via the centralized client in `src/lib/api.js` and dedicated services in `src/services/`:

### Authentication (`src/services/authService.js`)
- `POST /auth/login` (fallback to `/login`) — Logs in user, receives `{ token, user }` or `{ access_token }`.
- `POST /auth/signup` (fallback to `/auth/register`) — Registers new user.
- `GET /auth/me` (fallback to `/user/profile`) — Retrieves active user session.
- `POST /auth/logout` — Ends session and cleans up storage.

### Tasks (`src/services/taskService.js`)
- `GET /tasks` — Supports query params `?status=...&priority=...&search=...&page=...`
- `POST /tasks` — Creates a task with `{ title, description, due_date, due_time, priority, status, category }`.
- `PATCH /tasks/:id` (fallback to `PUT`) — Updates fields.
- `POST /tasks/:id/toggle` — Toggles completion.
- `DELETE /tasks/:id` — Deletes task.

### User Profile & Settings (`src/services/userService.js`)
- `GET /user/profile` — Retrieves profile.
- `PATCH /user/profile` — Updates display name or profile details.
- `POST /auth/change-password` — Updates password credentials.

### Calendar & Streaks (`src/services/calendarService.js`, `src/services/streakService.js`)
- `GET /calendar?start=...&end=...` — Retrieves calendar items; cleanly derives from task list if unconfigured.
- `GET /streaks` — Retrieves `{ currentStreak, longestStreak, completedToday, activityHistory }`. Does not fabricate fake streaks if backend is disconnected.

---

## 4. Environment Variables

Create `.env.local` based on `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 5. Getting Started

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
