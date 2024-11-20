import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

const TaskForm = ({ onSubmit, onCancel, existingTask }) => {

  // const tasks = useSelector((state) => state.tasks);

  const [task, setTask] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('In Progress');

 
 
  useEffect(() => {
    if (existingTask) {
      setTask(existingTask.task);
      setDueDate(existingTask.due_date);
      setStatus(existingTask.status);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task,
      due_date,
      status,
      ...(existingTask ? { id: existingTask.id } : {})
    };
    onSubmit(newTask); 
    setTask('');
    setDueDate('');
    setStatus('In Progress');
  };

  return (
    <div className="py-4">
      <h1 className="text-xl font-bold mb-4">{existingTask ? 'Edit Task' : 'Add New Task'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {existingTask ? 'Save Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
