import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or Edit a task
  const addOrEditTask = () => {
    if (newTask.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((task, i) =>
          i === editIndex ? { ...task, text: newTask } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null); // Reset edit state
      } else {
        setTasks([...tasks, { text: newTask, completed: false }]);
      }
      setNewTask("");
    }
  };

  // Mark a task as completed
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  // Clear completed tasks
  const clearCompleted = () => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    setTasks(incompleteTasks);
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addOrEditTask} className="btn-add">
          {editIndex !== null ? "Edit Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-card ${task.completed ? "completed" : ""}`}>
            <span className="task-text" onClick={() => toggleComplete(index)}>
              {task.text}
            </span>
            <div className="task-actions">
              <button className="btn-edit" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={clearCompleted} className="btn-clear">
        Clear Completed
      </button>
    </div>
  );
}

export default App;
