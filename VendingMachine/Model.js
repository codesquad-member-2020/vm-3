import View from './View.js'

class Model {
    constructor(...views) {
        this._view = [];

        views.forEach(element => {
            if ( false === element instanceof View )
                throw new Error(element, "is not instance of View");

            this.registerView(element);
        });
    }

    registerView(view) {
        this._view.push(view);
    }
}

export default Model;