function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="task-item">
      <div className="task-item-main">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <div className="task-tags">
          <span className={`status-tag ${task.status}`}>{task.status.replace('-', ' ')}</span>
          <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
        </div>
      </div>
      <div className="task-actions">
        <button type="button" className="button secondary-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="button danger-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
