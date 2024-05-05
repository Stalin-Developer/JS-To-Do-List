import Alert from './alert.js';


export default class Modal{
    constructor() {
        this.title= document.getElementById('modal-title');
        this.description= document.getElementById('modal-description');
        this.btn= document.getElementById('modal-btn');
        this.completed= document.getElementById('modal-completed');
        this.alert = new Alert('modal-alert');

        this.todo= null;
    }


    /**We put the values of the row in the modal window. */
    setValues(todo) {
        /**We do this because we need to capture the id for later. */
        this.todo= todo;

        this.title.value= todo.title;
        this.description.value= todo.description;
        this.completed.checked= todo.completed;
    }





    onClick(callback) {
        this.btn.onclick= () => {
            if(!this.title.value || !this.description.value) {
                this.alert.show('Title and description are required');
                return;
            }


            /**If the modal alert is show. We hide it. */
            this.alert.hide();


            /**This is for hide the window modal. */
            $('#modal').modal('toggle');


            /**We send this to the view to reflect the changes in the view as well. */
            /**We send an object like values. */
            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });


        }
    }
}