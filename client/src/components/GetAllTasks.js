import React, {Fragment, useEffect, useState} from "react";

const GetAllTasks = () =>{

    const [tasks, set_tasks] = useState([]);
    const [lists, set_lists] = useState([]);
    const [complete, set_complete] = useState(false);

    // delete todo function

    const delete_task = async(id) =>{
      try{
        const delete_task = await fetch(`http://localhost:5000/deletetask/${id}`, {
          method: "DELETE"
      });

      set_tasks(tasks.filter(task => task.id !== id));
      console.log(delete_task);
    }
      catch(err){
        console.error(err.message);
      }
    }

    // complete task function
    const complete_task = async(id) =>{
      const complete_task = await fetch(`http://localhost:5000/markdone/${id}`,{
        method: "PUT"
      });
    }

    const get_tasks = async() => {
        try{
            const response = await fetch("http://localhost:5000/getalltasks");
            const json_data = await response.json();
            console.log(json_data);
            set_tasks(json_data);
            return (<button className ={"btn btn-success btn-sm"}>Complete</button>);
        }
        catch(err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        get_tasks();
    }, []);
    
    return <Fragment>           
      <div class = "list">
      <table className="table table-hover mt-5 center" >
        <thead>
          <tr>
            <th>Table ID</th>
            <th>Table Name</th>
            <th>Task</th>
            <th>Complete</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task=>(
            <tr key={task.id}>
              <td>{task.list_id}</td>
              <td>{task.list_name}</td>
              <td>{task.task}</td>
              <td><button className ="btn btn-warning btn-sm" onClick={() => complete_task(task.id)}>Complete</button>
                </td>
              <td><button className = "btn btn-danger btn-sm" onClick={() => delete_task(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Fragment>;
};

export default GetAllTasks