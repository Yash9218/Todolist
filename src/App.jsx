import { useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [myTasks, setMyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from random API
  function fetchTasks() {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter((t) => !t.completed);
        const completed = data.filter((t) => t.completed);

        setMyTasks(pending.map((t) => ({ id: t.id, name: t.title })));
        setCompletedTasks(completed.map((t) => ({ id: t.id, name: t.title })));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  // Handle input
  function handleInput(e) {
    setNewTask(e.target.value);
  }

  // Add new task
  function addTask() {
    if (newTask.trim() === "") return;
    const task = { id: Date.now(), name: newTask };
    setMyTasks([...myTasks, task]);
    setNewTask("");
  }

  // Delete task
  function deleteTask(task) {
    setMyTasks(myTasks.filter((t) => t.id !== task.id));
    setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
  }

  // Complete task
  function completeTask(task) {
    setMyTasks(myTasks.filter((t) => t.id !== task.id));
    setCompletedTasks([...completedTasks, task]);
  }

  // Update task
  function updateTask(task, newName) {
    if (!newName || newName.trim() === "") return;
    const updatedTask = { ...task, name: newName };
    setMyTasks(myTasks.map((t) => (t.id === task.id ? updatedTask : t)));
    setCompletedTasks(
      completedTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
  }

  return (
    <div className="main-body d-flex justify-content-center align-items-start">
      <div className="todo-list-mainDiv">
        <h1 className="text-center">My To Do List</h1>

        {/* Input Section */}
        <div className="todo-task-input-div">
          <div className="form-floating w-75">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Todo task"
              onChange={handleInput}
              value={newTask}
            />
            <label htmlFor="floatingInput">Todo task</label>
          </div>
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
          <button className="btn btn-secondary ms-2" onClick={fetchTasks}>
            {loading ? "Loading..." : "Load Tasks"}
          </button>
        </div>

        {/* Pending Tasks */}
        <h3 className="text-center mt-4">To be Completed</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>
                  <div className="task-buttons">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        updateTask(task, prompt("Edit task:", task.name))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => completeTask(task)}
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Completed Tasks */}
        <h3 className="text-center mt-4">Completed Tasks</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>
                  <div className="task-buttons">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        updateTask(task, prompt("Edit task:", task.name))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task)}
                    >
                      Delete
                    </button>
                    {/* ✅ Hiding Complete button for already completed tasks */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
