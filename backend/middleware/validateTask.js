function validateTaskData(data) {
  const validStatuses = ['pending', 'in-progress', 'completed'];
  const validPriorities = ['low', 'medium', 'high'];

  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    return { success: false, message: 'Title is required' };
  }
  if (data.title.length > 100) {
    return { success: false, message: 'Title must be 100 characters or less' };
  }

  if (data.description && data.description.length > 500) {
    return { success: false, message: 'Description must be 500 characters or less' };
  }

  if (!validStatuses.includes(data.status)) {
    return { success: false, message: 'Status must be pending, in-progress, or completed' };
  }

  if (!validPriorities.includes(data.priority)) {
    return { success: false, message: 'Priority must be low, medium, or high' };
  }

  return { success: true };
}

module.exports = { validateTaskData };
