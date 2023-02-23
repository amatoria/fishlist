const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

/**
 * General TODO:
 * - check for invalid input
 */

/**
 * 1) Creates a table using "POST".
 *    http://localhost:5000/createlist/:listname
 */

app.post("/createlist/:listname", async(req, res) => {
    try{
        // user input. maybe refine style later?
        const { listname } = req.params;
        if (listname == ":listname"){
            res.send("Please enter a list name.");
        }
        const add_table = await pool.query(`INSERT INTO todo_lists (list_name) VALUES ('${listname}')`);
        // would be cool to just use (2) but it's fine for now
        const show_all = await pool.query("SELECT * FROM todo_lists");
        res.send(show_all.rows);
    }
    catch (error){
        console.error(error.message);
    }
});

/**
 * 2) Gets all to-do lists using "GET".
 * The GET address is http://localhost:5000/lists
 * This returns a JSON output with all public table names within the database.
 */

app.get("/lists", async(req, res) => {
    try{
        const show_all = await pool.query("SELECT * FROM todo_lists");
        res.json(show_all.rows);
    }
    catch (error){
        console.error(error.message);
    }
});

/**
 * 3) Creates a todo using "POST".
 * The POST address is http://localhost:5000/add_task/:listid/:newtask
 */
app.post("/add_task/:listid/:newtask", async(req, res) => {
    try{
        // table name as user input
        const { listid } = req.params;
        const { newtask } = req.params;
        // add new task to table using SQL
        if (listid == ":listid" || newtask == ":newtask"){
            return res.send("Please enter params in listname and newtask.");
        }
        // find the list id
        const add_to_list = await pool.query(`INSERT INTO todo_items (list_id, list_name, task, completed) VALUES (${listid}, (SELECT list_name FROM todo_lists WHERE id=${listid}), $1, 'false')`, [newtask]);
        // clean up 200 message
        res.json("Added new task: " + newtask);
    }
    catch (error){
        console.error(error.message);
    }
});

/**
* 4) Get all the to-do list items in a to-do list using "GET".
* The GET address is http://localhost:5000/getitems/:listid
*/
app.get("/getitems/:listid", async(req, res) =>{
    try{
        const { listid } = req.params;
        if (listid == ":listid"){
            res.send("List ID undefined.");
            throw new Error("List ID undefined.");
        }
        //const { listid } = await pool.query(`SELECT id FROM todo_lists WHERE list_name='${listname}'`);
        const get_task = await pool.query(`SELECT * FROM todo_items WHERE list_id=${listid} ORDER BY id asc` );
        res.json(get_task.rows);
    }
    catch (error){
        console.error(error.message);
    }
});

/**
* 4a) Get all the to-do list items from all to-do lists using "GET".
* The GET address is http://localhost:5000/getalltasks
*/
app.get("/getalltasks", async(req, res) =>{
    try{
        const get_task = await pool.query("SELECT * FROM todo_items ORDER BY id asc");
        res.send(get_task.rows);
    }
    catch (error){
        console.error(error.message);
    }
});

/**
 * 5) Update a todo task and mark it as complete, using "PUT".
 * The PUT address is http://localhost:5000/markdone/:id
 */
app.put("/markdone/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        if (!id || id == ":id"){
            res.send("Enter task ID.")
            throw new Error("Enter task ID.");
        }
        const todo_items_complete = await pool.query(`UPDATE todo_items SET completed=true WHERE id=${id}`);

        res.json("Marked " + id + " as complete.");
    }
    catch (error){
        console.error(error.message);
    }
});

/**
 * 6) Deletes a todo item using "DELETE".
 * http://localhost:5000/deletetask/:id
 */
app.delete("/deletetask/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        if (!id || id == ":id"){
            res.send("Enter task ID.")
            throw new Error("Enter task ID.");
        }
        const delete_task = await pool.query(`DELETE FROM todo_items WHERE id=${id}`);
        res.json("Deleted task " + id + ".");       
    }
    catch(error){
        console.error(error.message);
    }
});

/**
 * 7) Deletes a table using "DELETE".
 * http://localhost:5000/deletelist/:listid
 */
app.delete("/deletelist/:listid", async(req, res) =>{  
    try{
        const { listid } = req.params;
        if (!listid || listid == ":listid"){
            res.send ("Enter list ID.");
            throw new Error("Enter list ID.");
        }
        const del = await pool.query(`DELETE FROM todo_items WHERE list_id=${listid}`);
        const del_list = await pool.query(`DELETE FROM todo_lists WHERE id=${listid}`);
        res.json("Deleted list " + listid + ".");
    }
    catch (error){
        console.error(error.message);
    }
});

const server = app.listen(5000, () => {
    console.log("Server is listening on port 5000.");
});

server.on('error', (err) => {
    console.error('Server error:', err);
});