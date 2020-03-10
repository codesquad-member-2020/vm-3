import VM_ENUM from "./VMEnum.js";
const VM_AJAX_INFORMATION = VM_ENUM.VM_AJAX_INFORMATION;

class Controller {
    constructor(productListView, productSelectionView, walletView, productModel, cashModel) {
        this._view = [];
        this._view.push(productListView, productSelectionView, walletView);

        this._productModel = productModel;
        this._cashModel = cashModel;

        productListView.appendHandler({
            productButtonClickHandler: this._handleProductButtonClick.bind(this)
        });

        productSelectionView.appendHandler({
            numberButtonClickHandler: this._handleNumberButtonClick.bind(this),
            okButtonClickHandler: this._handleOKButtonClick.bind(this),
            cancelButtonClickHandler: this._handleCancelButtonClick.bind(this)
        });

        walletView.appendHandler({
            moneyButtonClickHandler: this._handleMoneyButtonClick.bind(this)
        });

        this._initialize();
    }

    _initialize() {
        this._view.forEach(element => {
            //render() method will be called after eature_HC_002~004 are finished.
            //element.render();
            element.onNotifyRenderFinished();
        });
    }

    _handleNumberButtonClick(clickedNumber) {
        console.log("_handleNumberButtonClick called. clickedNumber: ", clickedNumber);
    }

    _handleOKButtonClick() {
        console.log("_handleOKButtonClick called.");
    }

    _handleCancelButtonClick() {
        console.log("_handleCancelButtonClick called.");
    }

    _handleProductButtonClick(index) {
        console.log("_handleNumberButtonClick called. index: ", index);
    }

    _handleMoneyButtonClick(price) {
        console.log("_handleMoneyButtonClick called. price: ", price);
    }
}

export default Controller;
