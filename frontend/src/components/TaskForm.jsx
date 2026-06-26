import { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'low'
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

function TaskForm({ onCreate, onUpdate, selectedTask, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description || '',
        status: selectedTask.status,
        priority: selectedTask.priority,
        id: selectedTask.id
      });
      setErrors({});
    } else {
      setFormData(initialForm);
      setErrors({});
    }
  }, [selectedTask]);

  const validate = () => {
    const validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = 'Title is required.';
    } else if (formData.title.length > 100) {
      validationErrors.title = 'Title must be 100 characters or less.';
    }

    if (formData.description.length > 500) {
      validationErrors.description = 'Description must be 500 characters or less.';
    }

    if (!['pending', 'in-progress', 'completed'].includes(formData.status)) {
      validationErrors.status = 'Select a valid status.';
    }

    if (!['low', 'medium', 'high'].includes(formData.priority)) {
      validationErrors.priority = 'Select a valid priority.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    if (formData.id) {
      onUpdate(formData);
      return;
    }

    onCreate(formData);
    setFormData(initialForm);
  };

  return (
    <div className="task-form">
      <h2>{formData.id ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(event) => setFormData({ ...formData, status: event.target.value })}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(event) => setFormData({ ...formData, priority: event.target.value })}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.priority && <p className="error-text">{errors.priority}</p>}
          </div>
        </div>

        <div className="button-row">
          <button type="submit" className="button primary-button">
            {formData.id ? 'Update Task' : 'Add Task'}
          </button>
          {formData.id && (
            <button type="button" className="button secondary-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
