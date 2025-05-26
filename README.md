# agent-controller
just a basic backend code for a agent data management and controller which stores data for the agent details in mongoDB and user based authentication to add details of agent and there client details accordingly and thus distribute work evenly amongst them



Here's a **detailed and beginner-friendly `README.md` file** for your MERN stack project. It's structured for clarity and simplicity, helping even non-technical users understand, install, and run the application smoothly.

---

```markdown
# 🛠 MERN Stack Task Distribution App

This is a simple **Task Distribution Web App** built using the **MERN stack** (MongoDB, Express, React, Node.js).

The app allows an **admin** to:
- Login securely
- Add/manage agents
- Upload CSV/XLSX files containing task records
- Automatically distribute those tasks equally among the agents
- View assigned records for each agent

---

## 📌 Project Objective

This application is designed to help admins **distribute tasks or contacts** from a file upload to a team of agents quickly and efficiently.

### Example:
If you upload a CSV with 25 contacts and you have 5 agents, each agent will automatically be assigned 5 records.

---

## 🔍 Features

✅ Admin Login (JWT-secured)  
✅ Add Agents (Name, Email, Mobile, Password)  
✅ Upload CSV, XLSX, or XLS files  
✅ Auto-Distribution of records among agents  
✅ View all agents and their assigned records  
✅ Clean frontend using React.js

---

## 🧾 Technologies Used

- **Frontend**: React.js, Axios, React Router  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JWT (JSON Web Token)  
- **File Handling**: Multer, csv-parser, xlsx  

---

## 📂 Folder Structure

```

project-root/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   └── src/
│       ├── pages/
│       ├── utils/
│       └── App.js

````

---

## 🚀 Getting Started

This guide will help you run the project locally on your machine.

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

---

## ⚙️ 1. Clone the Project

```bash
git clone https://github.com/your-username/mern-task-distribution.git
cd mern-task-distribution
````

---

## 🧪 2. Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file in `/backend` with the following:

```
MONGO_URI=mongodb://localhost:27017/mern_test
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Start the backend server

```bash
npm run dev
```

If `dev` is not configured, just run:

```bash
node server.js
```

---

## 💻 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### Start the frontend development server

```bash
npm start
```

> The React app should now open in your browser at `http://localhost:3000`

---

## 🔐 Admin Login Info

By default, you'll need to create a user in MongoDB manually (or enhance the backend to support registration). You can insert one using MongoDB Compass or the CLI:

```js
// MongoDB CLI Example (Node.js REPL or MongoDB shell)
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10$ABCDEF..." // bcrypt hash of your password
})
```

> You can use tools like [https://bcrypt-generator.com](https://bcrypt-generator.com) to create a password hash.

---

## 🧾 Upload File Format

You can upload either:

* `.csv`
* `.xlsx` or `.xls`

### Supported Columns:

* **FirstName** (text)
* **Phone** (number)
* **Notes** (text)

### Example (CSV):

```csv
FirstName,Phone,Notes
John,1234567890,Call later
Jane,9876543210,Confirmed
```

---

## 👤 Add Agent

Go to `/add-agent` and fill in:

* Name
* Email
* Mobile Number (+91 or with country code)
* Password

---

## 📤 Upload and Distribute

* Navigate to `/dashboard`
* Upload a CSV/XLSX file
* Tasks will be equally divided among the agents
* You can view the list of all agents and see that they have been assigned tasks

---

## 🔐 Authentication

All protected routes (like Add Agent, Upload, Get Agents) require a valid JWT token which is stored in `localStorage` on successful login.

---

## 💬 Common Issues

1. **CORS Errors**: Make sure the backend is running before starting frontend.
2. **MongoDB Not Connecting**: Ensure MongoDB is installed and running locally.
3. **File Format Errors**: Only CSV, XLSX, and XLS formats are allowed.

---

## 📚 Optional Enhancements

* Agent Login & View their assigned tasks
* Delete/Reassign tasks
* Export assigned tasks as CSV
* Admin Dashboard with statistics

---

## 🧼 Cleanup

To remove uploaded temp files, delete everything in:

```bash
/backend/uploads/
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Need Help?

If you face any issues or have questions, feel free to open an issue or contact the maintainer.

---

```

Would you like this README saved as a file or added to the codebase directly?
```
