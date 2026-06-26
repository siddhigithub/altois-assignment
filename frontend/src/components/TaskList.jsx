import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <div className="empty-state">No tasks found.</div>;
  }

  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="cell-title">{task.title}</td>
              <td className="cell-description">{task.description || '-'}</td>
              <td className="cell-status">
                <span className={`status-tag ${task.status}`}>{task.status.replace('-', ' ')}</span>
              </td>
              <td className="cell-priority">
                <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
              </td>
              <td className="cell-actions">
                <button 
                  type="button" 
                  className="button secondary-button" 
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="button danger-button" 
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
