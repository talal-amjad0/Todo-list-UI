import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './components/table/Table';
import { addTask, deleteTask, updateTask, fetchTasks, setStatus } from './redux/slices/tasksSlice';
import { useEffect } from 'react';

export default function App () {
  
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);  
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  console.log("Status : ", status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks()); 
    }
  }, [ status, dispatch]);
  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  // console.log("Tasks", tasks);


  const handleDelete = (id) => {
      dispatch(deleteTask(id));  
      // dispatch(setStatus('idle')); 
  
  };

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));  
    dispatch(setStatus('idle'));
  };

  const handleUpdateTask = async (updatedTask) => {
    dispatch(updateTask(updatedTask));
    // dispatch(fetchTasks());   
  };


  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table tasks={tasks} handleDelete={handleDelete} handleAddTask={handleAddTask} handleUpdateTask={handleUpdateTask} />} />
      </Routes>
    </BrowserRouter>
  );
}
