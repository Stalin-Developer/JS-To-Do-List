/**In model we save the data. */
/**To import, first we have to export. */
export default class Model{
    constructor() {
        /**We don't have a view, they have to give us. */
        this.view= null;

        /**From a string give me the object. */
        this.todos= JSON.parse(localStorage.getItem('todos'));
        /**If in the local storage there is a empty list, there isn't todos */
        if(!this.todos || this.todos.length<1) {
            /**In that case we create a todo by default. */
            this.todos=[
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS Tutorials',
                    completed: false,
                }
            ]

            this.currentId= 1;


        } else{
            /**For the currenId we obtain the number of the last id and we add 1. */
            this.currentId= this.todos[this.todos.length -1].id + 1;
        }

    }

    /**We recieve and use the view. */
    setView(view) {
        this.view= view;
    }

    /**Save todo in local Storage. */
    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    /**We send a copy of todos. */
    getTodos() {
        return this.todos.map((todo) => ({...todo}));
    }



    /**Find the index of the row. */
    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }



    /**Activity completed. */
    toggleCompleted(id) {
        const index= this.findTodo(id);

        /**We record the change in the object. */
        const todo= this.todos[index];
        todo.completed= !todo.completed;

        /**We save the changes in the view into the array. */
        this.save();
    }


    /**The changes will reflect in the array. */
    editTodo(id, values) {
        const index= this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }





    /**We recieve the data and create an object. */
    addTodo(title, description) {
        const todo= {
            id: this.currentId++,

            /**If the atribute and its value are the same, we can just put the atibute. */
            title,
            description,

            completed: false
        }


        /**We send the row. */
        this.todos.push(todo);

        /**We print the array of todo in the console. */
        console.log(this.todos);

        /**We save the todo in the local storage. */
        this.save();

        /**We clone the object todo to avoid errors relative to its name. */
        return {...todo};
    }



    /**We remove a row from the data base. */
    removeTodo(id) {
        /**We have the id, so we have to search into the array. 
         * findIndex recieve an object. If the parameter of the current object is -->
         * equal to our id. We found it.
        */
        const index= this.findTodo(id);

        /**We delete the row from the array. 
         * With splice we remove an element given an index and the quantity of -->
         * elements that we want to remove.
        */
        this.todos.splice(index, 1);

        /**We register the change in the local storage. */
        this.save();
    }









}