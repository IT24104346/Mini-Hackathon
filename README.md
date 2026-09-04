# 🌊 Flood-Safe-LK — Community Flood Alert & Management System

> **SE3090 Software Engineering Frameworks — Assignment 2 Mini Hackathon**  
> *A Sri Lankan Community Early-Warning, Situational Awareness, and Disaster Management Network*

---

## 1. Project Title
**Flood-Safe-LK: Community Flood Alert & Disaster Management System**

---

## 2. Problem Statement
Sri Lanka faces recurring, devastating flood catastrophes during both the South-West and North-East monsoon cycles. Low-lying urban sectors, rural farming communities, and transport corridors along major river basins frequently become inundated within hours. 

During these crises:
- Ground-level information regarding road access, water depth, and stranded residents becomes heavily fragmented.
- Official centralized alerts lack hyper-local, real-time street observation.
- Emergency responders, community rescue boats, and humanitarian volunteers struggle to prioritize urgent aid locations.

---

## 3. Sri Lankan Context
Sri Lanka's 103 river basins and highland topography channel torrential rains down steep slopes into coastal flatlands. High-risk zones include:
- **Kelani Ganga Basin**: Colombo and Gampaha districts (Wellampitiya, Sedawatta, Biyagama, Kelaniya).
- **Kalu Ganga Basin**: Ratnapura and Kalutara districts (Ratnapura town, Kiriella, Putupaula, Bulathsinhala).
- **Gin Ganga & Nilwala Ganga Basins**: Galle and Matara districts (Baddegama, Nagoda, Thihagoda, Akuressa).
- **Mahaweli Basin & Urban Centres**: Kandy, Pettah/Town Hall Colombo drainage overflow.

*Flood-Safe-LK bridges this critical gap by empowering Sri Lankan citizens and Grama Niladhari divisions to log live flood situations, water depths, and evacuation needs.*

---

## 4. Proposed Solution
**Flood-Safe-LK** is a full-stack, responsive community web platform that enables:
1. **Instant Community Flood Reporting**: Citizens log localized water levels, affected family numbers, road hazards, and GPS coordinates.
2. **Live Situation Dashboard**: Real-time filtering by all 25 Sri Lankan districts, severity levels (Low, Moderate, High, Critical), flood categories, and status lifecycles (Active → Monitoring → Resolved).
3. **Full Lifecycle Flood Management (CRUD)**: Update changing water depths, edit descriptions, or remove outdated/resolved reports with safe confirmation dialogs.
4. **Interactive Sri Lanka Disaster Map**: Geospatial visualization powered by Leaflet and OpenStreetMap.
5. **AI Flood Severity & Category Assessor**: Intelligent assistant that assesses citizen descriptions to recommend urgency tags and flood categories.

---

## 5. System Architecture
The application employs a clean decoupled REST architecture:

```
┌────────────────────────────────────────────────────────┐
│                   React Frontend                       │
│    (TypeScript + Vite + Tailwind CSS + Leaflet Maps)   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / JSON REST Requests
┌───────────────────────────▼────────────────────────────┐
│               Node.js + Express Backend                │
│    (TypeScript + CORS + Validation & Error Handler)    │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼────────────────────────────┐
│                     MongoDB Atlas                      │
│             (Online Cloud Database Cluster)            │
└────────────────────────────────────────────────────────┘
```

---

## 6. Technologies Used

### Frontend
- **React 18** (Functional components, hooks)
- **TypeScript** (Strict type safety)
- **Vite** (Next-gen frontend build tool)
- **Tailwind CSS** (Modern responsive design system)
- **React Router DOM v7** (SPA client routing)
- **Leaflet & React-Leaflet** (Interactive mapping)
- **Lucide React** (Modern iconography)

### Backend
- **Node.js** (Runtime environment)
- **Express.js** (REST API framework)
- **TypeScript** (Type safety and build compilation)
- **Mongoose** (Object Data Modeling for MongoDB)
- **CORS & Dotenv** (Cross-origin configuration & environment management)

### Database & Deployment
- **MongoDB Atlas** (Cloud-hosted NoSQL database)
- **Render** (Backend API hosting)
- **Vercel** (Frontend static hosting)

---

## 7. AI Tools Used
- **Antigravity AI / Google DeepMind Agentic IDE**: Full-stack scaffolding, component architecture, type definitions, and test verification.
- **Rule-based & NLP Keyword Assessor**: Client-side AI assistant engine for real-time flood severity recommendations.

---

## 8. Team Members & Functional Ownership

| Member | Student ID | Git Branch | Module Ownership | Major Code Deliverables |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1** | **IT24104346** | `feature/flood-reporting` / `IT24104346` | **Flood Reporting Module** | `ReportPage.tsx`, form validation, GPS coordinate autofill, `aiAssistant.ts`, `POST /api/floods` endpoint, backend input validation middleware. |
| **Member 2** | **IT24100435** | `feature/live-dashboard` / `IT24100435` | **Live Dashboard & Analytics** | `DashboardPage.tsx`, `StatCard.tsx`, multi-criteria filters, full-text search, live polling toggle, `GET /api/floods/stats` controller. |
| **Member 3** | **IT24102180** | `feature/flood-management` / `IT24102180` | **Flood Management / CRUD** | `FloodDetailModal.tsx`, `EditFloodModal.tsx`, `DeleteConfirmModal.tsx`, `PUT /api/floods/:id` & `DELETE /api/floods/:id` endpoints. |
| **Member 4** | **IT24610820** | `feature/ui-map-deployment` / `IT24610820` | **UI/UX, Map & Deployment** | `HomePage.tsx`, `SriLankaMap.tsx` (Leaflet), `Navbar.tsx`, `Footer.tsx`, `AboutPage.tsx`, seed dataset engine, responsive theming, production configs. |

---

## 9. Branch Strategy
- `main`: Production-ready integrated application code.
- `feature/flood-reporting` (`IT24104346`): Reporting forms, validation, and POST endpoints.
- `feature/live-dashboard` (`IT24100435`): Live alerts dashboard, search, filters, and dynamic metrics.
- `feature/flood-management` (`IT24102180`): Detail view, update modal, delete confirmation, PUT/DELETE APIs.
- `feature/ui-map-deployment` (`IT24610820`): Landing page, Leaflet map, navigation, responsive design, deployment.

---

## 10. REST API Endpoints

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/floods` | Fetch all flood reports | `?district=Colombo&severity=Critical&status=Active&search=Wellampitiya&sortBy=newest` |
| `GET` | `/api/floods/stats` | Dynamic aggregated disaster statistics | None |
| `GET` | `/api/floods/:id` | Retrieve single flood report by ID | Path parameter `:id` |
| `POST` | `/api/floods` | Create new community flood report | JSON Body with validation |
| `PUT` | `/api/floods/:id` | Update flood status, depth, or details | JSON Body |
| `DELETE` | `/api/floods/:id` | Delete outdated or resolved report | Path parameter `:id` |
| `POST` | `/api/floods/seed` | Reset & seed realistic Sri Lanka records | None |
| `GET` | `/api/health` | Backend service health check | None |

---

## 11. MongoDB Data Model Schema (`FloodReport`)

```json
{
  "_id": "ObjectId",
  "location": "Wellampitiya - Kotikawatta Lowlands",
  "district": "Colombo",
  "description": "Kelani River has exceeded minor flood levels near Nagalagam Street gauge...",
  "floodType": "River Overflow",
  "severity": "Critical",
  "waterLevel": 4.5,
  "affectedPeople": 240,
  "status": "Active",
  "latitude": 6.9482,
  "longitude": 79.8961,
  "reporterName": "Sunil Wickramasinghe",
  "contactNumber": "+94 77 123 4567",
  "reportedAt": "2026-09-04T08:30:00.000Z",
  "updatedAt": "2026-09-04T09:15:00.000Z"
}
```

---

## 12. Local Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local instance or MongoDB Atlas Connection URI

### Step 1: Clone Repository
```bash
git clone https://github.com/IT24104346/Mini-Hackathon.git
cd Mini-Hackathon
```

### Step 2: Configure Environment Variables

#### Backend (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/floodwatch-lk?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

#### Frontend (`client/.env`):
```env
VITE_API_BASE_URL=/api
```

### Step 3: Run Backend Server
```bash
cd server
npm install
npm run dev
```
*Backend API starts at: `http://localhost:5000`*

### Step 4: Run Frontend Client
```bash
cd ../client
npm install
npm run dev
```
*Frontend Application opens at: `http://localhost:5173`*

---

## 13. Production Deployment Guide

### Backend (Render / Railway)
1. Link your GitHub repository.
2. Root Directory: `server`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Environment Variables: Set `MONGODB_URI`, `NODE_ENV=production`, `PORT=10000`.

### Frontend (Vercel / Netlify)
1. Link your GitHub repository.
2. Root Directory: `client`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variables: Set `VITE_API_BASE_URL=https://<your-render-backend-url>/api`.

---

## 14. Live Deployment & Video Demonstration Links

- **Live Application URL**: `https://flood-safe-lk.vercel.app` *(Placeholder / Active Deployment)*
- **Backend API URL**: `https://flood-safe-lk-api.onrender.com/api/health`
- **2-Minute Video Demonstration**: `https://youtu.be/flood-safe-lk-demo` *(Placeholder)*

---

## 15. Two-Minute Demonstration Script

| Timestamp | Screen / Flow | Action & Narration |
| :--- | :--- | :--- |
| **0:00 - 0:20** | **Landing Page (`/`)** | Introduce **Flood-Safe-LK**. Highlight the Sri Lankan monsoon & river basin challenge. Point out live island impact stats and emergency hotlines (117, 1990). |
| **0:20 - 0:45** | **Live Dashboard (`/dashboard`)** | Demonstrate dynamic statistics. Filter by "Critical" severity and "Colombo" district. Search for "Wellampitiya". Open a card to inspect full details in modal. |
| **0:45 - 1:15** | **Submit Flood Report (`/report`)** | Enter a new flood incident (e.g., Gampaha - Biyagama access road). Run **AI Severity Assessor** to analyze description. Submit form and verify instant appearance on dashboard. |
| **1:15 - 1:35** | **Update & Delete (CRUD)** | Edit report to mark status as "Resolved" and adjust water level. Demonstrate deletion with confirmation dialog. |
| **1:35 - 1:50** | **Interactive Map (`/map`)** | Inspect colored severity markers across Sri Lanka. Show popup and filter synchronization. |
| **1:50 - 2:00** | **Conclusion & Sri Lankan Impact** | Summarize how crowdsourced verification empowers local communities and relief teams. |

---

## 16. Satisfaction of All 10 Assignment Requirements

| # | Minimum Requirement | Visible Implementation in Flood-Safe-LK |
| :--- | :--- | :--- |
| **1** | Clear landing page/main UI | Modern hero banner, live status counters, navigation, emergency hotlines bar. |
| **2** | Explanation of Sri Lankan flood problem | In-depth breakdown of Kelani, Kalu, Gin, Nilwala river basins and monsoon cycles on Home and About pages. |
| **3** | At least two functional features | 1. Live Multi-criteria Search & Filtering Dashboard.<br>2. Interactive Leaflet Disaster Map.<br>3. AI Severity Assessor. |
| **4** | At least one working user-input form | Comprehensive 10-field community flood report submission form (`/report`). |
| **5** | Input validation with friendly errors | Client-side check + backend validation middleware with helpful guidance messages. |
| **6** | Ability to display, search, filter, calculate, update, or process information | Dynamic metrics calculations (`/api/floods/stats`), full-text search, multi-filter pills, inline editing, and deletion. |
| **7** | Responsive desktop & mobile interface | Fully responsive Tailwind CSS layout with mobile drawer navigation, stacked cards, and adaptive tables. |
| **8** | Navigation between main sections | Single Page Application navigation (Home, Live Alerts, Map, Report, About) with React Router. |
| **9** | Relevant sample data | 9+ realistic Sri Lankan flood records across Colombo, Gampaha, Ratnapura, Galle, Matara, Kandy, Kalutara, Puttalam. |
| **10** | Clear demonstration of value to Sri Lanka | Directly addresses local disaster management challenges, supporting citizens, Grama Niladharis, and emergency services. |

---

## 17. Limitations & Future Enhancements
- **SMS / USSD Gateway Integration**: Integration with Sri Lankan telcos (Dialog, Mobitel) for non-smartphone reporting.
- **Drone Imagery Uploads**: Allowing verified volunteers to upload geo-tagged aerial flood imagery.
- **Automated DMC River Gauge API**: Direct telemetry sync with Department of Irrigation water level sensors.

---

## 18. AI Usage Declaration
This project was developed with the assistance of **Antigravity AI (Google DeepMind Agentic IDE)**. All architectural decisions, data models, validation constraints, and Sri Lankan domain-specific mappings were carefully designed, tested, and understood by the team in compliance with the academic integrity policy. Detailed prompts and verifications are recorded in `AI_PROMPT_LOG.md`.