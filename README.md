# Employee Management System API

A RESTful API for managing employees, departments, positions, and attendance, built with Node.js, Express, TypeScript, and Firebase Firestore.

## Features

- Employee CRUD operations
- Department CRUD operations
- Position CRUD operations
- Attendance tracking
- Firebase Firestore as the database

## Project Structure

```
src/
  config/
    firebase.ts           # Firebase configuration and initialization
  controllers/
    attendanceController.ts
    departmentController.ts
    employeeController.ts
    positionController.ts
  routes/
    attendanceRoutes.ts
    departmentRoutes.ts
    employeeRoutes.ts
    positionRoutes.ts
  model.ts                # Data models and types
  server.ts               # Express server entry point
http/
  ...                     # HTTP request samples for testing endpoints
package.json
tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/<your-username>/Take-Home-Examination-Employee-Management-System-API.git
   cd Take-Home-Examination-Employee-Management-System-API
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure Firebase:**
   - Update `src/config/firebase.ts` with your Firebase project credentials.

4. **Run the server:**
   ```powershell
   npm run dev
   ```
   The server will start on the port specified in your environment or default to 3000.

## API Endpoints

- **Employees:** `/api/employees`
- **Departments:** `/api/departments`
- **Positions:** `/api/positions`
- **Attendance:** `/api/attendance`

Each resource supports standard CRUD operations. See the `http/` folder for sample HTTP requests.

## Development

- Written in TypeScript
- Uses Express for routing
- Firestore for persistent storage

## License

MIT

---

*Created by jacobferreras*
