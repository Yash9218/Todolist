import { useState } from "react";

function TaskItem({ task, taskName, deleteTask, completeTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(taskName);

  return (
    <tr>
      <td>{task.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="form-control"
          />
        ) : (
          taskName
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => {
                updateTask(task, editedName);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => deleteTask(task)}
            >
              Delete
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => completeTask(task)}
            >
              Complete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default TaskItem;
