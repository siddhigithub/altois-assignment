import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

const STATUS_OPTIONS = ['all', 'pending', 'in-progress', 'completed'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async (status) => {
    setLoading(true);
    setError('');
    try {
      const tasksData = await getTasks(status);
      setTasks(tasksData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filterStatus === 'all' ? '' : filterStatus);
  }, [filterStatus]);

  const handleCreate = async (taskData) => {
    setLoading(true);
    setError('');
    try {
      await createTask(taskData);
      await loadTasks(filterStatus === 'all' ? '' : filterStatus);
      setSelectedTask(null);
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (taskData) => {
    setLoading(true);
    setError('');
    try {
      await updateTask(taskData.id, taskData);
      await loadTasks(filterStatus === 'all' ? '' : filterStatus);
      setSelectedTask(null);
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      await deleteTask(id);
      await loadTasks(filterStatus === 'all' ? '' : filterStatus);
      if (selectedTask?.id === id) {
        setSelectedTask(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <label htmlFor="filter">Filter:</label>
            <select
              id="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option value={option} key={option}>
                  {option.replace('-', ' ').replace('all', 'All')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="content-grid">
          <TaskForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            selectedTask={selectedTask}
            onCancel={() => setSelectedTask(null)}
          />

          <div className="task-list-panel">
            {loading && <div className="status-banner">Loading...</div>}
            {error && <div className="error-banner">{error}</div>}
            <TaskList
              tasks={tasks}
              onEdit={setSelectedTask}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
