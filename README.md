# 🖥️ Real-Time Task Manager Desktop App

A modern Windows desktop app for managing tasks, built with Electron, React, Tailwind CSS, and MongoDB. Enjoy real-time sync, beautiful UI, and native Windows experience.

---

## 🚀 Features

- **Create, Read, Update, Delete (CRUD) tasks**
- **Sync tasks locally and with MongoDB**
- **Responsive UI with Tailwind CSS**
- **Hover effects and subtle animations**
- **Light/Dark mode toggle**
- **Sort and filter tasks by priority, status, and due date**
- **Native Windows app via Electron**

---

## 🛠️ Tech Stack

- **Electron.js** – Native Windows desktop support
- **React.js** – Front-end structure
- **Tailwind CSS** – UI styling
- **MongoDB + Mongoose** – Cloud sync
- **Node.js + Express.js** – Backend/server logic

---

## 📁 Folder Structure

```
task-manager-app/
├── public/
│   ├── index.html
│   └── icon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── models/
│   │   └── Task.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   ├── index.js
│   └── main.js (Electron entry)
├── server/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── server.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚡ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Start MongoDB**
Make sure you have MongoDB running locally (default: `mongodb://localhost:27017/taskmanager`).

### 4. **Run the app**
```bash
# For development (with hot reload)
npm run dev

# For production build
npm run build
```

### 5. **(Optional) Start Express Backend**
```bash
cd server
node server.js
```

---

## 🌟 Usage
- **Create a new task:** Click "New Task" and fill in the form.
- **Edit or update:** Use the pencil icon or click on a task.
- **Delete:** Use the trash icon (with confirmation).
- **Sort/filter:** Use the dropdowns and column headers.
- **Toggle theme:** Use the sun/moon icon in the navbar.

---

## ☁️ Cloud Sync
- Tasks are saved to MongoDB for real-time sync.
- If MongoDB is unavailable, tasks can fallback to localStorage (future enhancement).

---

## 🎨 UI/UX
- Built with Tailwind CSS for a clean, modern look.
- Responsive and works on all screen sizes.
- Subtle hover and fade animations for better UX.

---

## 📦 Packaging for Windows
To build a Windows installer:
```bash
npm run build
```
The installer will be in the `dist/` folder.

---

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue first to discuss changes.

---

## 📄 License
MIT 