import React, {Fragment, useState, useEffect} from "react";

const CreateList = () =>{

    const [listnames, set_listnames] = useState([]);
    const [list, set_list] = useState("");

    const delete_list = async(id) =>{
        try{
          const delete_task = await fetch(`http://localhost:5000/deletelist/${id}`, {
            method: "DELETE"
        });
  
        set_listnames(listnames.filter(list => list.id !== id));
        console.log(delete_list);
      }
        catch(err){
          console.error(err.message);
        }
      }
    const onSubmitForm = async e =>{
        e.preventDefault();
        try{
            const body = {listnames};
            const response = await fetch(`http://localhost:5000/createlist/${list}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
        });
        window.location = "/";

        }
        catch (err){
            console.error(err.message);
        }
    }

    const get_lists = async() => {
        try{
          const response = await fetch("http://localhost:5000/lists");
          const json_data = await response.json();
          set_listnames(json_data);
        }
        catch(err){
          console.error(err.message);
        }
      }

    useEffect(() => {
        get_lists();
    }, []);

    return( <Fragment>
            <h1 className="text-center mt-5">Create Todo List</h1>
            <form className="mt-5" onSubmit={onSubmitForm} align="center" onChange={e => set_list(e.target.value)}>
            <div class = "group">
            <input type="text" className="form-control"/>
            </div>
        <div class = "group">
            <button className = "btn btn-success w-100"> Add </button> 
        </div> 
        </form>
        <div class = "list">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>List ID</th>
                <th>List Name</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {listnames.map(list=>(
                <tr>
                    <td>{list.id}</td>
                    <td>{list.list_name}</td>
                    <td><button id = "complete_button" className = "btn btn-danger btn-sm" onClick={() => delete_list(list.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>


        </Fragment>
)};

export default CreateList;