import React, {Fragment} from "react";
import './App.css';

/**************
 * Components *
 **************/

import CreateList from "./components/CreateList";
import GetAllTasks from "./components/GetAllTasks";
import AddTask from "./components/AddTask";

function App() {
  return (
    <Fragment>
      <div className = "container">
      <CreateList />   
      <AddTask />
      <GetAllTasks />   
      </div>
    </Fragment>
  );
}

export default App;
