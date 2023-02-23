# Description: Database of to-do lists, written with NodeJs with Express.

## Usages:

### A. Create a table using "POST".

   > http://localhost:3000/createlist/:listname
   
   To make a table, do the following:
   
   1.  Open Postman and set the HTTP method to "POST"
   
   2.  In the URL textbox, enter "http://localhost:3000/createlist/:listname"
   
   3. Click on the "Params" tab above the text box
   
   4. In the "Value" column of listname, type the desired name of your to-do list.
   
### B. Get all to-do lists using "GET".

   > http://localhost:3000/lists
   
   To get all to-do list names, do the following:
   
   1. Set the HTTP method to "GET"
   
   2. In the URL textbox, enter "http://localhost:3000/lists"
   
### C. Create a task using "POST".

   > http://localhost:3000/add_task/:listname/:newtask
   
   To create a task, do the following:
   
   1. Set the HTTP method to "POST"
   
   2. In the URL textbox, enter "http://localhost:3000/add_task/:listname/:newtask"
   
   3. Under the "Params" tab, add desired list name and task.
   
### D. Get all the to-do items in a to-do list using "GET".

   > http://localhost:3000/getitem/:listname
   
   To get all tasks in a list, do the following:
   
   1. Set the HTTP method to "GET"
   
   2. In the URL textbox, enter "http://localhost:3000/getitem/:listname"
   
   3. Under the "Params" tab, add desired list name.

### E. Update a todo task and mark it as complete, using "PUT".

   > http://localhost:3000/markdone/:listname/:id
   
   To mark a task as complete, do the following:
   
   1. Set the HTTP method to "PUT"
   
   2. In the URL textbox, enter "http://localhost:3000/markdone/:listname/:id"
   
   3. Under the "Params" tab, add desired list name and the task's designated ID.
   
      - You can find the ID under task_id by performing instruction (4).
      
### F. Delete a to-do item using "DELETE".

   > http://localhost:3000/deletetask/:listname/:id
   
   To delete a task, do the following:
   
   1. Set the HTTP method to "DELETE"
   
   2. In the URL textbox, enter "http://localhost:3000/deletetask/:listname/:id"
   
   3. Under the "Params" tab, add desired list name and the task's designated ID.
   
      - You can find the ID under task_id by performing instruction (4).
      
### G. Delete a to-do list using "DELETE".

   > http://localhost:3000/deletelist/:listname
   
   To delete a task, do the following:
   
   1. Set the HTTP method to "DELETE"
   
   2. In the URL textbox, enter "http://localhost:3000/deletelist/:listname"
   
   3. Under the "Params" tab, add desired list name.
   
      - You can check all list names by performing instruction (2).
