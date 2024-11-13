// import React, { useState, useEffect, useContext } from "react";
// import { TaskContext } from "../context/TaskContext";

// const TaskForm = () => {
//   const { addTask, updateTask, taskToEdit } = useContext(TaskContext);
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     if (taskToEdit) {
//       setTitle(taskToEdit.title);
//     }
//   }, [taskToEdit]);

//   const handleSubmit = () => {
//     if (taskToEdit) {
//       updateTask({ ...taskToEdit, title });
//     } else {
//       addTask({ id: Date.now(), title, completed: false });
//     }
//     setTitle("");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Task title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button onClick={handleSubmit}>
//         {taskToEdit ? "Update Task" : "Add Task"}
//       </button>
//     </div>
//   );
// };

// export default TaskForm;
