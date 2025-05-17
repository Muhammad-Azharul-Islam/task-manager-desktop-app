import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await ipcRenderer.invoke('get-tasks');
      if (response.success) {
        setTasks(response.tasks);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await ipcRenderer.invoke('create-task', taskData);
      if (response.success) {
        setTasks([response.task, ...tasks]);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await ipcRenderer.invoke('update-task', { id, updates });
      if (response.success) {
        setTasks(tasks.map(task => 
          task._id === id ? response.task : task
        ));
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await ipcRenderer.invoke('delete-task', id);
      if (response.success) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
              <button 
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setError(null)}
              >
                <span className="sr-only">Dismiss</span>
                ×
              </button>
            </div>
          )}
          
          <Routes>
            <Route 
              path="/" 
              element={
                <TaskList 
                  tasks={tasks}
                  isLoading={isLoading}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              } 
            />
            <Route 
              path="/new" 
              element={
                <TaskForm 
                  onSubmit={handleCreateTask}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 