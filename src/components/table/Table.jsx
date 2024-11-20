import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Button from '../button/Button';
import Modal from '../modal/Modal'; 
import TaskForm from '../form/Form';

const Table = ({ tasks, handleDelete, handleAddTask, handleUpdateTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  const handleAddNewTask = () => {
    setEditingTask(null); 
    setIsModalOpen(true); 
  };

  const handleEditTask = (task) => {
    setEditingTask(task); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setEditingTask(null); 
  };

  const handleFormSubmit = (newTask) => {
    if (editingTask) {
      handleUpdateTask(newTask); 
    } else {
      handleAddTask(newTask); 
    }
    handleCloseModal(); 
  };

  return (
    <div className="mx-4 md:mx-10">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-bold">Todo List</h1>
        <Button bgColor="bg-blue-500 hover:bg-blue-700" text="Add New Task" onClick={handleAddNewTask} />
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Task</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Due</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className={`py-4 px-6 border-b border-gray-200 ${task.status === 'Completed' ? 'line-through' : ''}`}>
                    {task.task}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 truncate">{task.due_date}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <span
                      className={`py-1 px-2 rounded-full text-xs text-white ${
                        task.status === 'In Progress'
                          ? 'bg-blue-500'
                          : task.status === 'Completed'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <div className="flex space-x-4">
                      {/* <button className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button> */}
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEditTask(task)} 
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
          existingTask={editingTask} 
        />
      </Modal>
    </div>
  );
};

export default Table;
