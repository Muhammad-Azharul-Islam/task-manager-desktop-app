const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express server
const server = express();
const PORT = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, '../public/icon.ico')
  });

  // In development, load from React dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers for task operations
ipcMain.handle('create-task', async (event, task) => {
  try {
    const Task = require('./models/Task');
    const newTask = new Task(task);
    await newTask.save();
    return { success: true, task: newTask };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-tasks', async () => {
  try {
    const Task = require('./models/Task');
    const tasks = await Task.find().sort({ createdAt: -1 });
    return { success: true, tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-task', async (event, { id, updates }) => {
  try {
    const Task = require('./models/Task');
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    return { success: true, task };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-task', async (event, id) => {
  try {
    const Task = require('./models/Task');
    await Task.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}); 