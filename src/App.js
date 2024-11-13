import React from "react";
// import TaskManager from "./components/TaskManager";
import { TaskProvider } from "./context/TaskContext";
import { SocketProvider } from "./context/SocketContext";
import TaskList from "./components/TaskList";
import "./App.css";
function App() {
  return (
    <TaskProvider>
      <SocketProvider>
        <div className="App">
          <TaskList />
        </div>
      </SocketProvider>
    </TaskProvider>
  );
}

export default App;
