import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Load saved tasks from Local Storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Complete or undo task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete single task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Delete all completed tasks
  const clearCompletedTasks = () => {
    setTasks(tasks.filter((item) => !item.completed));
  };

  // Edit task
  const editTask = (id) => {
    const currentTask = tasks.find((item) => item.id === id);

    const updatedText = window.prompt(
      "Edit your task:",
      currentTask.text
    );

    if (updatedText !== null && updatedText.trim() !== "") {
      setTasks(
        tasks.map((item) =>
          item.id === id
            ? { ...item, text: updatedText.trim() }
            : item
        )
      );
    }
  };

  // Task statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const activeTasks = totalTasks - completedTasks;

  // Filter and search tasks
  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "active") {
      return !item.completed && matchesSearch;
    }

    if (filter === "completed") {
      return item.completed && matchesSearch;
    }

    return matchesSearch;
  });

  return (
    <div className="app-container">
      <div className="todo-card">

        {/* Header */}
        <div className="todo-header">
          <h1>TaskFlow CI/CD</h1>
          <p>Stay organized. Get things done.</p>
        </div>

        {/* Task Statistics */}
        <div className="task-stats">
          <div>
            <strong>{totalTasks}</strong>
            <span>Total</span>
          </div>

          <div>
            <strong>{activeTasks}</strong>
            <span>Active</span>
          </div>

          <div>
            <strong>{completedTasks}</strong>
            <span>Completed</span>
          </div>
        </div>

        {/* Add Task */}
        <div className="task-input-container">
          <input
            className="task-input"
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button
            className="add-button"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "filter-active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "filter-active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={
              filter === "completed" ? "filter-active" : ""
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">
              No tasks yet. Add your first task!
            </p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-message">
              No matching tasks found.
            </p>
          ) : (
            filteredTasks.map((item) => (
              <div
                className="task-item"
                key={item.id}
              >
                <span
                  className={
                    item.completed
                      ? "task-text completed-task"
                      : "task-text"
                  }
                >
                  {item.text}
                </span>

                <button
                  className="complete-button"
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "Undo" : "Complete"}
                </button>

                <button
                  className="edit-button"
                  onClick={() => editTask(item.id)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Tasks */}
        {completedTasks > 0 && (
          <button
            className="clear-completed-button"
            onClick={clearCompletedTasks}
          >
            Clear Completed
          </button>
        )}

      </div>
    </div>
  );
}

export default App;