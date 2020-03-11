import View from './View.js'

class ProductSelectionView extends View {
    constructor() {
        super();

        this._onNumberButtonClicked = null;
        this._onOKButtonClicked = null;
        this._onCancelButtonClicked = null;
    }

    render() {
        return ``
    }

    appendHandler(callback) {
        this._onNumberButtonClicked = callback.numberButtonClickHandler;
        this._onOKButtonClicked = callback.okButtonClickHandler;
        this._onCancelButtonClicked = callback.cancelButtonClickHandler;
    }

    onNotifyRenderFinished() {
    }

    _appendEventHandler() {
    }

    onNotifyCollectedCashChanged(collectedCash) {
    }

    onNotifyMessageOccured(message) {
    }
}

export default ProductSelectionView;