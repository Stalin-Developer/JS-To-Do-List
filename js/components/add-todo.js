import Alert  from './alert.js';

export default class AddTodo {
    constructor() {
        this.btn= document.getElementById('add');
        this.title= document.getElementById('title');
        this.description= document.getElementById('description');

        /**We instantiate the alert class with an id. */
        this.alert= new Alert('alert');
    }


    /**Click on the button add. */
    onClick(callback) {
        const handleClick= () => {
            if(title.value=== '' || description.value=== '') {
                this.alert.show('Title and description are requiered');
            } else {
                this.alert.hide();

                callback(this.title.value, this.description.value);

                /**Once we save the data in both the title and the description.
                 * We clean the boxes.
                 */
                this.title.value= '';
                this.description.value= '';
            }
        }
    
    
    
        this.btn.addEventListener('click', handleClick);

         

        /**The key Enter only will execute its function if the focus is on input title or input description. */
        title.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                handleClick();
            }
        });

        description.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                handleClick();
            }
        });
    
    
    
    }

}