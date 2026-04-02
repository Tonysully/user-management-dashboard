# User Management Dashboard

##  Overview
This is a **User Management dashboard** extracted from a larger fintech admin portal.

It demonstrates how to build scalable, interactive admin interfaces using modern frontend technologies, with mock data simulating real API behavior.

---

## Features

###  User & Bank Management
- View **Banks**, **Bank Admins**, and **ISW Admins**
- Tab-based navigation between user types

### Search (with Debounce)
- Real-time search across users and banks
- Debounced input for performance optimization

### Pagination
- Dynamic pagination for both users and banks
- Handles filtered results correctly

###  Summary Cards
- Displays:
  - Total Banks
  - Bank Admin Users
  - ISW Admin Users

###  Create User Modal
- Form validation
- Simulated API request (mock)
- Modal workflow

###  Loading States
- Skeleton loaders for tables and summary cards
- Simulated API delays for realistic UX

---

##  Tech Stack

- **React**
- **TypeScript**
- **Chakra UI**
- **Vite**

---

##  Key Concepts Demonstrated

- Component-based architecture
- State management with React hooks
- Conditional rendering
- Debounced search implementation
- Pagination logic
- Reusable UI components
- Mock API simulation using `setTimeout`

---

##  Project Structure
src/
  ├── App.tsx
  ├── Main.tsx
  ├── UserManagement.tsx
  ├── Components/
  │   ├── AddUserModal.tsx
  │   ├── AdminUserRow.tsx
  │   ├── StatusBadge.tsx
  │   ├── SummaryCard.tsx
  │   ├── TabButton.tsx
  │   ├── TableHeader.tsx
  │   └── ViewLink.tsx
  ├── MockData/
  │   └── mockData.ts
  └── Types/
      └── usermanagementTypes.ts

      
---

## Running Locally

```bash
npm install
npm run dev

Then open:
http://localhost:5173

Notes
This project uses mock data instead of a real backend.
It is designed to demonstrate frontend engineering skills in a real-world dashboard scenario.
<img width="1868" height="826" alt="image" src="https://github.com/user-attachments/assets/8310e4b5-c24d-45d4-b504-10cb0a92971f" />
<img width="1871" height="881" alt="image" src="https://github.com/user-attachments/assets/bb77332e-2a4f-4cd2-8ab6-9d4b118b641c" />
<img width="1902" height="879" alt="image" src="https://github.com/user-attachments/assets/e81665fd-7ec2-47ec-8fba-0fca7ce8c53a" />
<img width="1903" height="881" alt="image" src="https://github.com/user-attachments/assets/76eb6c40-9dd1-4116-9210-0c470c00f2f2" />
<img width="1848" height="869" alt="image" src="https://github.com/user-attachments/assets/4a6b4ffc-1df2-485f-bb23-677d8205cea0" />
<img width="1865" height="869" alt="image" src="https://github.com/user-attachments/assets/086c59e2-8146-4f8e-8912-57d4a3ac2492" />
