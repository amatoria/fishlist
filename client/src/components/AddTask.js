import React, {Fragment, useState} from "react";

const AddTask = () =>{
    const [table, set_table] = useState("");
    const [task, set_task] = useState("");


    const onSubmitForm = async e =>{
        e.preventDefault();
        try{
            //const body = {listname};
            const response = await fetch(`http://localhost:5000/add_task/${table}/${task}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify(table)
        });
        window.location = "/";

        }
        catch (err){
            console.error(err.message);
        }
    }
    return(
    <Fragment>
        <h1 className = "mt-5 text-center"> Add a task </h1>
            <form className="mt-5" onSubmit={onSubmitForm} align="center">
                <div class="group">
                    <label for="list">List ID:</label> 
                    <input type = "text" className="form-control form-control-sm" 
                        onChange={e => set_table(e.target.value)}/>
                </div>
                <div class="group">
                    <label for="list">Task:</label> 
                    <input type = "text" className="form-control form-control-sm" 
                        onChange={e => set_task(e.target.value)}/>
                </div>
                <div class = "group">
                    <button className = "btn btn-success w-100"> Add </button>
                </div>
            </form>
    </Fragment>
    );
};

export default AddTask;