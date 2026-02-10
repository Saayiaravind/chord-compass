# Chord Compass — Full Project Handover

## What Is This Project?

Chord Compass is a **production web application for an online music academy** teaching **Piano, Music Theory, Carnatic Keyboard, and Carnatic Vocals**. It started as a learning project following the roadmap in `ROADMAP.md` (18 tasks across 5 phases: backend basics → advanced backend → frontend → cloud/devops → AI features). The frontend was recently redesigned from scratch to be production-ready.

**Live stack:** Java 17 + Spring Boot 3.4.12 + PostgreSQL backend, React 19 + Vite 7 + Tailwind CSS v4 frontend.

---

## How To Run

**Backend (Terminal 1):**
```
cd c:\Users\Admin\Desktop\cc\chord-compass
.\mvnw.cmd spring-boot:run
```
Runs on **http://localhost:8082**. Requires PostgreSQL on port 5433, database `chord_compass`, user/pass `postgres/postgres`.

**Frontend (Terminal 2):**
```
cd c:\Users\Admin\Desktop\cc\chord-compass\frontend
npm run dev
```
Runs on **http://localhost:5173**. API base URL configured in `frontend/.env` → `VITE_API_BASE_URL=http://localhost:8082`.

**Demo credentials:**
- Admin: `admin@chordcompass.com` / `admin123`
- Student: `student@chordcompass.com` / `student123`

---

## Tech Stack Details

### Backend
- **Framework:** Spring Boot 3.4.12, Java 17, Maven
- **Database:** PostgreSQL (port 5433, DDL auto-update via Hibernate)
- **Auth:** Spring Security + JWT (HS256, 24hr expiry, BCrypt passwords)
- **Roles:** ADMIN, INSTRUCTOR, STUDENT (role stored in JWT claims)
- **API patterns:** `/students`, `/courses` (no prefix), `/api/enrollments`, `/api/schedules` (note the inconsistent `/api/` prefix — this is how the backend currently works)
- **DTOs:** `EnrollmentResponse.java` and `ScheduleResponse.java` flatten bidirectional JPA relationships (entities still have `@JsonIgnore` to prevent infinite recursion; DTOs extract nested student/course names into flat fields)
- **Schema file:** `database-schema.sql` (5 tables: users, students, courses, student_enrollments, schedules + sample data)

### Frontend
- **Framework:** React 19.2.4, Vite 7.3.1, React Router 7.13
- **Styling:** Tailwind CSS v4 (CSS-based `@theme` config in `index.css`, NOT `tailwind.config.js`)
- **Icons:** lucide-react
- **HTTP:** axios with interceptors (auto JWT attachment, 401 → redirect to /login)
- **Notifications:** react-hot-toast
- **Fonts:** Outfit (headings) + Space Grotesk (body) via Google Fonts
- **Build output:** ~42 kB CSS + ~357 kB JS (gzip: 7 kB + 111 kB)

---

## Design System

**Vibe:** Bold & Creative — vibrant colors, dynamic layouts, energetic and artistic.

**Color palette (defined in `frontend/src/index.css` @theme):**
| Token | Hex | Usage |
|---|---|---|
| primary-500 | #8b3dff | Electric Violet — main brand, buttons, active states |
| secondary-500 | #ff3366 | Hot Coral — accents, gradients, student layout |
| accent-400 | #ffd60a | Electric Gold — highlights, CTA, star ratings |
| neutral-50 to 900 | warm-tinted grays | Backgrounds, text, borders |
| success/warning/error/info | standard semantic | Badges, alerts |

**Typography:**
- `font-heading` → Outfit (bold, used for all headings, buttons, nav)
- `font-body` → Space Grotesk (used for body text, inputs)

**Components:** All in `frontend/src/components/ui/`:
- Button (6 variants: primary/secondary/outline/ghost/danger/accent, 3 sizes, loading state, hover:scale-105)
- Input, TextArea, Select (border-2 style, focus rings, password eye toggle)
- Card (optional hover lift, optional gradient border)
- Badge (color-mapped to schedule statuses, enrollment statuses, payment plans)
- Table (rounded, primary-50 header, alternating rows, horizontal scroll)
- Modal (backdrop blur, escape-to-close, body scroll lock, scale-in animation, ARIA dialog)
- LoadingSpinner, EmptyState, StatCard, PageHeader

**CSS Animations (in `index.css`):** fadeInUp, fadeIn, scaleIn, slideInLeft, slideDown + smooth scroll.

---

## Frontend Architecture

```
frontend/src/
├── App.jsx                    # Root: AuthProvider → BrowserRouter → Routes
├── index.css                  # Tailwind @theme (design tokens)
├── context/
│   └── AuthContext.jsx        # JWT auth state (localStorage persistence, expiry check)
├── hooks/
│   └── useApiQuery.js         # Generic data fetching hook (loading/error/refetch)
├── services/
│   ├── api.js                 # Axios instance with JWT interceptors
│   ├── authService.js         # login(), register()
│   ├── studentService.js      # CRUD /students
│   ├── courseService.js        # CRUD /courses
│   ├── enrollmentService.js   # CRUD /api/enrollments
│   └── scheduleService.js     # CRUD /api/schedules
├── utils/
│   └── jwtUtils.js            # decodeToken(), getUserRole(), getUserEmail() (pre-existing)
├── components/
│   ├── ui/                    # 10 reusable UI components (see above)
│   └── common/
│       ├── ProtectedRoute.jsx # Auth guard (redirects to /login or /unauthorized)
│       └── RoleRouter.jsx     # Post-login redirect based on role
├── layouts/
│   ├── PublicLayout.jsx       # Landing page layout (sticky nav, footer, mobile hamburger)
│   ├── AdminLayout.jsx        # Sidebar layout (fixed left sidebar, mobile slide-in)
│   └── StudentLayout.jsx      # Top navbar layout (gradient, mobile hamburger)
└── pages/
    ├── NotFound.jsx           # 404 page
    ├── Unauthorized.jsx       # 403 page
    ├── public/
    │   └── LandingPage.jsx    # Hero, courses grid, about, testimonials, contact form
    ├── auth/
    │   ├── LoginPage.jsx      # Split-screen login, demo credentials section
    │   └── RegisterPage.jsx   # Split-screen register, role select
    ├── admin/
    │   ├── AdminDashboard.jsx # Stat cards, upcoming classes table, recent enrollments
    │   ├── StudentManagement.jsx    # Table CRUD with search, modals
    │   ├── CourseManagement.jsx     # Card grid CRUD with modals
    │   ├── EnrollmentManagement.jsx # Table CRUD, conditional fields per payment plan
    │   └── ScheduleManagement.jsx   # Table CRUD, status filter pills, notes/attendance
    └── student/
        ├── StudentDashboard.jsx     # Next class card, courses summary, recent notes
        ├── MySchedule.jsx           # Upcoming (with Join button) + past (expandable notes)
        ├── MyCourses.jsx            # Course cards with icon and duration
        └── PracticeNotes.jsx        # Chronological practice notes, expandable class notes
```

### Routing Structure (from App.jsx)
- `/` → PublicLayout → LandingPage
- `/login` → LoginPage (standalone)
- `/register` → RegisterPage (standalone)
- `/dashboard` → ProtectedRoute → RoleRouter (redirects admin→/admin/dashboard, student→/student/dashboard)
- `/admin/*` → ProtectedRoute(ADMIN, INSTRUCTOR) → AdminLayout → 5 child routes
- `/student/*` → ProtectedRoute(STUDENT) → StudentLayout → 4 child routes
- `/unauthorized` → Unauthorized
- `*` → NotFound

---

## Backend Architecture

```
src/main/java/com/chordcompass/chordcompass/
├── ChordCompassApplication.java     # Main entry point
├── config/
│   └── CorsConfig.java             # CORS allows localhost:5173
├── User.java                        # Entity: id, email, password(BCrypt), role, createdAt
├── Student.java                     # Entity: id, name, email, phone, user(FK), createdAt
├── Course.java                      # Entity: id, title, description, sessionDurationMinutes
├── StudentEnrollment.java           # Entity: student(FK,@JsonIgnore), course(FK,@JsonIgnore), paymentPlan, priceAmount, sessionsRemaining, validity dates, isActive
├── Schedule.java                    # Entity: enrollment(FK,@JsonIgnore), date, time, duration, meetLink, status, attended, classNotes, practiceNotes
├── PaymentPlan.java                 # Enum: FIXED_MONTHLY, CLUSTER, PAY_PER_SESSION
├── ScheduleStatus.java              # Enum: SCHEDULED, NOTES_PENDING, COMPLETED, CANCELLED, NO_SHOW
├── dto/
│   ├── EnrollmentResponse.java      # Flat DTO with fromEntity() — exposes studentName, courseTitle
│   └── ScheduleResponse.java        # Flat DTO with fromEntity() — exposes studentName, courseTitle
├── *Repository.java                 # JPA repositories (6 files)
├── *Service.java                    # Business logic (6 files)
├── *Controller.java                 # REST controllers (5 files)
├── JwtUtil.java                     # JWT generation/validation (HS256, 24hr)
├── JwtAuthenticationFilter.java     # OncePerRequestFilter for JWT
└── SecurityConfig.java              # SecurityFilterChain config
```

### API Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /auth/login | Public | Returns JWT token |
| POST | /auth/register | Public | Creates user account |
| GET/POST/PUT/DELETE | /students, /students/{id} | JWT | Student CRUD |
| GET/POST/PUT/DELETE | /courses, /courses/{id} | JWT | Course CRUD |
| GET/POST/PUT/DELETE | /api/enrollments, /api/enrollments/{id} | JWT | Enrollment CRUD (GET returns DTOs) |
| GET/POST/PUT/DELETE | /api/schedules, /api/schedules/{id} | JWT | Schedule CRUD (GET returns DTOs) |

---

## Database Schema (5 Tables)

- **users** — auth accounts (email, BCrypt password, role enum)
- **students** — profiles (name, email, phone, FK→users)
- **courses** — offerings (title, description, session_duration_minutes default 45)
- **student_enrollments** — links student↔course with payment_plan, price, sessions_remaining, validity dates, is_active
- **schedules** — class sessions (FK→enrollment, date, time, duration, meet_link, status workflow, attended, class_notes, practice_notes)

Payment plans: FIXED_MONTHLY (recurring), CLUSTER (prepaid pack), PAY_PER_SESSION (pay after month).
Schedule status workflow: SCHEDULED → (class happens) → NOTES_PENDING → COMPLETED. Or CANCELLED / NO_SHOW.

---

## What Was Completed (Full UI Redesign)

The entire frontend was rewritten from a basic inline-styled prototype (5 simple components) to a production-grade app:

1. **Foundation:** Tailwind CSS v4 setup, design tokens, Google Fonts, axios interceptors, .env config
2. **Core architecture:** AuthContext (localStorage JWT persistence), useApiQuery hook, 10 UI components, 3 layouts, route guards
3. **App.jsx:** Complete rewrite with role-based routing
4. **Auth pages:** Split-screen Login (with demo credentials) and Register
5. **Landing page:** Hero with gradient, 4-course grid, about section, 3 testimonials, contact form
6. **Admin dashboard:** 4 stat cards + 2 data tables
7. **Admin CRUD pages:** Students (table + search), Courses (card grid), Enrollments (table + badges), Schedule (table + filter pills)
8. **Student portal:** Dashboard (next class card), Schedule (upcoming/past with expandable notes), Courses (cards), Practice Notes (chronological)
9. **Backend DTOs:** EnrollmentResponse and ScheduleResponse to solve @JsonIgnore hiding student/course names
10. **Responsive polish:** Mobile hamburger menus on all layouts, sidebar slide animation, modal scale-in animation, page fade-in, horizontal scroll for filter pills
11. **Accessibility:** aria-labels on all icon buttons, focus-visible rings, ARIA dialog on modals, semantic nav landmarks, keyboard escape-to-close
12. **Cleanup:** Removed 5 old unused component files

---

## Known Limitations & Gotchas

1. **No student-specific backend endpoints.** The student portal calls the same GET /api/schedules and GET /courses as admin. It shows ALL data, not filtered by logged-in student. The backend needs student-scoped endpoints (e.g., GET /api/students/me/schedules).

2. **Contact form is frontend-only.** The landing page contact form shows a toast but doesn't actually send data anywhere. Needs a backend endpoint or email service integration.

3. **Inconsistent API prefixes.** Students/courses use `/students`, `/courses` while enrollments/schedules use `/api/enrollments`, `/api/schedules`. Consider standardizing.

4. **No email verification or password reset.** Auth is basic email+password with no verification flow.

5. **No file uploads.** Teacher photo on landing page is a placeholder icon. No profile image support.

6. **@JsonIgnore on entities stays.** The JPA entities (StudentEnrollment, Schedule) keep @JsonIgnore on their bidirectional relationships to prevent infinite recursion. The DTO approach works around this for GET responses, but POST/PUT still accept raw entity JSON with nested `{student: {id: X}, course: {id: Y}}`.

7. **No pagination.** All list endpoints return everything. Will need pagination for scale.

8. **No tests.** No frontend or backend tests exist currently.

9. **Changes not committed yet.** All frontend redesign work is uncommitted. Run `git status` to see the full list. The last commit is `1c16b7f Advanced UI with role-based navigation`.

---

## Git State

**Branch:** main (up to date with origin/main)
**Last commit:** `1c16b7f Advanced UI with role-based navigation`
**Uncommitted changes:** All the frontend redesign (modified: index.html, App.css, App.jsx, index.css, vite.config.js, 2 backend controllers; deleted: 5 old components; new: 30+ frontend files + 2 DTO files)

---

## Learning Roadmap Status (from ROADMAP.md)

| Phase | Status |
|---|---|
| Phase 1: Backend Basics (Spring Boot, PostgreSQL, REST) | Done |
| Phase 2: Backend Advanced (Service layer, validation, Security, JWT, JPA relationships) | Done |
| Phase 3: Frontend (React, UI components, integration) | Done (fully redesigned) |
| Phase 4: Cloud & DevOps (Docker, Kubernetes, Cloud + Google APIs) | Not started |
| Phase 5: Advanced Features (Agentic AI, final polish) | Not started |

---

## How To Use This Prompt

Copy everything above into a new Claude Code chat. Then ask for whatever you need. Examples:

**Adding features:**
> "Add a free resources section where I can post blog articles and YouTube video links for students. It should be accessible from the landing page and student portal."

**Changing design:**
> "Change the design vibe from Bold & Creative to Minimal & Clean. Use a monochrome palette with one accent color."

**Google API integrations:**
> "Integrate Google Calendar API so that when I create a schedule entry, it automatically creates a Google Calendar event and sends an invite to the student's email. Also integrate Google Meet to auto-generate meet links."

**Docker/Cloud:**
> "Dockerize this application with a multi-stage Dockerfile for the Spring Boot backend and a separate one for the Vite frontend. Add a docker-compose.yml that runs both + PostgreSQL."

**AI features:**
> "Add an AI-powered practice schedule generator that takes a student's course, skill level, and available practice hours, then generates a weekly practice plan using Claude API."

**Backend improvements:**
> "Add student-scoped endpoints so the student portal only shows data for the logged-in student. Add GET /api/students/me/schedules and GET /api/students/me/enrollments that filter by the authenticated user's email."

**Testing:**
> "Add unit tests for the backend service layer and integration tests for the REST controllers using JUnit 5 and MockMvc."
