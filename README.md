# Shop Space Management System

## Overview
The Shop Space Management System is a web-based application designed to help users manage spaces efficiently. It provides features to add, edit, and delete spaces, ensuring seamless space management through a responsive and user-friendly interface.

---

## Features

### 1. Space Management
- View a list of available spaces.
- Add new spaces with details such as name, type, capacity, occupancy status, and price per unit.
- Edit existing space details.
- Delete spaces as needed.

### 2. Responsive Design
- Fully responsive layout for optimal viewing on desktop and mobile devices.

### 3. Frontend-Backend Integration
- Seamless communication between the frontend and backend using RESTful APIs.

---

## Project Structure

### Root Folder
```
Shop Space Management/
|-- frontend/
|-- backend/
|-- .gitignore
|-- README.md
```

### Frontend
- **Tech Stack:** React.js, Material-UI
- **Folder Structure:**
  ```
  frontend/
  |-- src/
      |-- components/
      |-- hooks/
      |-- api/
      |-- App.jsx
      |-- main.jsx
  |-- public/
  |-- package.json
  ```
- **Key Features:**
  - `App.jsx`: Manages the main UI and application logic.
  - `components/`: Contains reusable React components such as `SpaceList` and forms.
  - `hooks/`: Custom hooks for managing state (e.g., `useSpaces`).
  - `api/axios.js`: Centralized API configuration.

### Backend
- **Tech Stack:** Node.js, Express, SQLite
- **Folder Structure:**
  ```
  backend/
  |-- routes/
  |-- db/
  |-- server.js
  |-- package.json
  ```
- **Key Features:**
  - RESTful APIs to manage spaces.
  - SQLite for data persistence.

---

## Installation and Setup

### Prerequisites
- Node.js and npm
- SQLite
- Git

### Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Shop Space Management
```

#### 2. Setup Backend
```bash
cd backend
npm install
node server.js
```
The backend will run on [http://localhost:5000](http://localhost:5000).

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Base URL
`http://localhost:5000`

### Endpoints

#### 1. Get All Spaces
- **Method:** `GET`
- **Endpoint:** `/spaces`
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Space A",
        "type": "Office",
        "capacity": 50,
        "occupied": false,
        "price_per_unit": 100
      }
    ]
  }
  ```

#### 2. Add a Space
- **Method:** `POST`
- **Endpoint:** `/spaces`
- **Request Body:**
  ```json
  {
    "name": "Space A",
    "type": "Office",
    "capacity": 50,
    "occupied": false,
    "price_per_unit": 100
  }
  ```

#### 3. Edit a Space
- **Method:** `PUT`
- **Endpoint:** `/spaces/:id`
- **Request Body:**
  ```json
  {
    "name": "Updated Space A",
    "capacity": 60
  }
  ```

#### 4. Delete a Space
- **Method:** `DELETE`
- **Endpoint:** `/spaces/:id`

---

## Usage Guide

### Adding a Space
1. Open the application.
2. Click the **Add New Space** button.
3. Fill out the form and submit.

### Editing a Space
1. Locate the space in the grid.
2. Click the **Edit** button.
3. Update the details and save.

### Deleting a Space
1. Locate the space in the grid.
2. Click the **Delete** button.
3. Confirm the action.

---

## Troubleshooting

### `.gitignore` Issues
If unnecessary files are being tracked:
1. Update the `.gitignore` file.
2. Remove cached files:
   ```bash
   git rm -r --cached .
   git add .
   git commit -m "Fix .gitignore"
   ```

### Frontend-Backend Communication
Ensure the backend server is running on port 5000 and the frontend is configured to use the correct API base URL.


