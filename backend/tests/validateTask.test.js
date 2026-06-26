const { validateTaskData } = require('../middleware/validateTask');

describe('Task validation', () => {
  test('Valid title passes', () => {
    const result = validateTaskData({
      title: 'Complete assignment',
      description: 'Do the backend and frontend',
      status: 'pending',
      priority: 'medium'
    });

    expect(result.success).toBe(true);
  });

  test('Empty title fails', () => {
    const result = validateTaskData({
      title: '',
      description: 'A simple task',
      status: 'pending',
      priority: 'low'
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Title is required');
  });

  test('Title >100 chars fails', () => {
    const longTitle = 'a'.repeat(101);
    const result = validateTaskData({
      title: longTitle,
      description: 'Too long title',
      status: 'pending',
      priority: 'low'
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Title must be 100 characters or less');
  });
});
