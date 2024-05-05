export default class Alert{
    constructor(alertId) {
        this.alert= document.getElementById(alertId);
    }


    /**We show the alert. */
    show(message) {
        this.alert.classList.remove('d-none');
        this.alert.innerText= message;
    }


    /**We hide the alert. */
    hide() {
        this.alert.classList.add('d-none');
    }



}