import Model from './model.js';
import View from './view.js';


document.addEventListener('DOMContentLoaded', function () {
    /**We instantiate the classes we import. */
    const model= new Model();
    const view= new View();

    /**We assign the components that don't have those classes. */
    model.setView(view);
    view.setModel(model);

    /**For each row of the model, it will create a row in the view. */
    view.render();
});