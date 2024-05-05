import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";



/**In this main view, we are going to manage the table. */
/**To import, first we have to export. */
export default class View {
    constructor() {
        /**We don't have a model. We recieve it. */
        this.model = null;
        this.table = document.getElementById('table');

        this.modal= new Modal();
        this.filters= new Filters();

        /**We instantiate the class we just imported. 
         * The name is different to avoid errors.
        */
        this.addTodoForm = new AddTodo();

        /**We send the function to the class add-todo. 
         * We use an arrow function to avoid an error regarding to the name.
        */
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

        /**We reflect the changes in the row. */
        this.modal.onClick((id, values) => this.editTodo(id, values));

        /**We send the filters changes in the view, to the components. */
        this.filters.onClick((filters) => this.filter(filters));

    }

    /**We recieve and use the model. */
    setModel(model) {
        this.model = model;
    }


    /**The get the rows in the model to show them in the view. */
    render() {
        const todos= this.model.getTodos();

        /**Functional programming. */
        /*It will create a row in the view for each row in the model. */
        todos.forEach((todo) => this.createRow(todo));
    }

    /**the filters in the view. */
    filter(filters) {
        /**In this line, we get these attributes of filters. */
        const {type, words}= filters;

        /**We access to the rows of the table. */
        /**We destructuring, with [, we are saying that we don't want the first -->
         * element.
         */
        const [, ...rows]= this.table.getElementsByTagName('tr');

        for (const row of rows) {
            /**We will keep with these three elements and we are going to assign
             * them to a variable.
             */
            const [title, description, completed]= row.children;

            /**This variable will help us to hide the rows that not match with
             * the filter.
             */
            let shouldHide= false;

            /**Filter with words. */
            if (words) {
                /**shouldHide will be true if the words don't appear in the title
                 * nor description.
                 */
                shouldHide= !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            /**Filter for the completes. */
            /**When completed is checked. */
            const shouldBeComplete= type ==='completed';

            /**When in the row is completed. */
            const isCompleted= completed.children[0].checked;

            /**Regarding with shouldBeComplete and isCompleted these have to be
             * equal for appear. Otherwise it won't appear.
             */
            if(type !== 'all' && shouldBeComplete !== isCompleted) {
                shouldHide= true;
            }

            
            /**We show the rows that fit the conditions. */
            if(shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }

        }
    }


    addTodo(title, description) {
        /**We send the data to the model. */
        const todo = this.model.addTodo(title, description);

        /**We create the row in the view. */
        this.createRow(todo);
    }



    /**We send the change to the model. */
    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }



    /**Edit the row with the new changes. */
    editTodo(id, values) {
        /**We edit the array. */
        this.model.editTodo(id, values);

        /**We edit the table. */
        const row= document.getElementById(id);
        row.children[0].innerText= values.title;
        row.children[1].innerText= values.description;
        row.children[2].children[0].checked= values.completed;
    }






    /**We remove a row. */
    removeTodo(id) {
        /**We remove from the server. */
        this.model.removeTodo(id);

        /**We remove from the view. */
        document.getElementById(id).remove();
    }

















    /**We create a new row in the table. */
    createRow(todo) {
        /**insertRow is for to insert a row into the table. */
        const row = table.insertRow();

        /**We assign an id to the row. */
        row.setAttribute('id', todo.id);

        /**We use the back ticks to concatenate the columns.*/
        /**With ${} we extract the value. */
        row.innerHTML = `
             <td>${todo.title}</td>
             <td>${todo.description}</td>
             <td class="text-center">
                
             </td>
             <td class="text-right">
                 
             </td>
         
        `;




        /**We create the checkbox manually to give it functionality. */
        const checkbox= document.createElement('input');
        checkbox.type= 'checkbox';

        /**We obtain the value from the object. */
        checkbox.checked= todo.completed;

        /**The function toggleCompleted calls a function in the model. */
        checkbox.onclick= () => this.toggleCompleted(todo.id);

        /**We add the checkbox to the row from javascript. */
        row.children[2].appendChild(checkbox);







        /**We create the button edit manually to give it functionality. */
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class= "fa fa-pencil"></i>';

        /**After do click we show the window modal. */
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');


        /**We give a funtionality to the edit button. */
        /**We send to the modal window the data of the table. */
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });


        /**We add the edit button to the row from javascript. */
        row.children[3].appendChild(editBtn);













        /**We create the button delete manually to give it functionality. */
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class= "fa fa-trash"></i>';

        /**We give a funtionality to the remove button. */
        removeBtn.onclick = () => this.removeTodo(todo.id);


        /**We add the remove button to the row from javascript. */
        row.children[3].appendChild(removeBtn);
    }
}