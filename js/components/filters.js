export default class Filters {
    constructor() {
        this.form= document.getElementById('filters');
        this.btn= document.getElementById('search');
    }



    onClick(callback) {
        this.btn.onclick= (e) => {
            /**We prevent the default event. */
            e.preventDefault();

            /**We get the data of the filter form we imported. */
            const data= new FormData(this.form);

            callback({
                type: data.get('type'),
                words: data.get('words'),
            });
        }
    }



}