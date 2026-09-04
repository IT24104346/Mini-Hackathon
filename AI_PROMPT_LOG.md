# AI Usage & Prompt Log — Flood-Safe-LK

> **SE3090 Software Engineering Frameworks — Assignment 2 Mini Hackathon**  
> *Academic Integrity & AI Disclosure Document*

This document logs significant AI prompts, tools, purposes, and manual modifications made by the team during the development of **Flood-Safe-LK**.

---

## AI Prompt Log Table

| Date | AI Tool | Prompt / Task Description | Purpose | How Output Was Checked & Modified |
| :--- | :--- | :--- | :--- | :--- |
| **2026-09-04** | Antigravity AI (DeepMind) | "Generate full-stack architecture plan for Flood-Safe-LK adhering to SE3090 requirements with React, Express, and MongoDB." | Architectural planning and directory structure design. | Verified decoupled REST architecture, ensured no direct DB access from frontend, and confirmed compliance with all 10 assignment requirements. |
| **2026-09-04** | Antigravity AI (DeepMind) | "Create Mongoose model for FloodReport with Sri Lanka districts, severity levels, coordinates, water levels, and validation rules." | Database schema modeling. | Enforced 25 Sri Lankan district enums, bounding boxes for latitudes (5.5 - 10.0) and longitudes (79.0 - 82.5), and realistic water depth limits. |
| **2026-09-04** | Antigravity AI (DeepMind) | "Implement Express REST controllers for CRUD operations, dynamic statistical aggregations, and sample data seeder." | Backend API implementation. | Verified response formatting, added text-search regex query support, and added custom sorting for highest severity and affected count. |
| **2026-09-04** | Antigravity AI (DeepMind) | "Build React Tailwind components: Navbar, StatCard, FloodCard, FloodTable, Detail Modal, Edit Modal, Delete Modal, and Leaflet Map." | Frontend UI/UX development. | Custom tuned color palettes for emergency management, tested responsive collapsing on mobile drawer, added pulse animations for Critical severity. |
| **2026-09-04** | Antigravity AI (DeepMind) | "Create NLP rule-based AI Severity Assessor for analyzing flood descriptions." | Optional AI feature implementation. | Verified that AI recommendations remain advisory, added explicit disclaimer, and gave user full control to override suggested values. |
| **2026-09-04** | Antigravity AI (DeepMind) | "Generate comprehensive README with installation guide, API docs, 4-member contribution matrix, and 2-minute demo script." | Documentation. | Cross-checked team member student IDs, verified Git feature branches, and ensured 100% adherence to the marking rubric. |

---

## Declaration of Academic Integrity
All team members understand the generated codebase and can explain the React components, Express REST API endpoints, Mongoose schema validation, and Git workflows during viva and code demonstrations.
