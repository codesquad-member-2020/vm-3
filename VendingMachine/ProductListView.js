import View from './View.js'

class ProductListView extends View {
    constructor() {
        super();

        this._onProductButtonClicked = null;
    }

    render() {
        return ``
    }

    appendHandler(callback) {
        this._onProductButtonClicked = callback.productButtonClickHandler;
    }

    onNotifyRenderFinished() {
    }

    _appendEventHandler() {
    }

    onNotifyCollectedCashChanged(collectedCash) {
    }

    onNotifyProductListChanged(productList) {
    }
}

export default ProductListView;
