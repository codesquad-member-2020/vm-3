import VM_ENUM from "../enum/VMEnum.js";
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
        let result = "";

        this._view.forEach(element => {
            result += element.render();
        });

        const wrap = document.querySelector(".wrap");
        wrap.innerHTML = 
        `
            <div class="vendingMachine">
                ${result}
            </div>
        `;

        this._view.forEach(element => {
            //render() method will be called after eature_HC_002~004 are finished.
            element.render();
            element.onNotifyRenderFinished();
        });

        fetch("https://dev-angelo.dlinkddns.com:8090/get/initial-data")
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleNumberButtonClick(clickedNumber) {
        console.log("_handleNumberButtonClick called. clickedNumber: ", clickedNumber);

        const data = {};
        data.number = clickedNumber;

        fetch("https://dev-angelo.dlinkddns.com:8090/patch/number-button-click", {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleOKButtonClick() {
        console.log("_handleOKButtonClick called.");

        fetch("https://dev-angelo.dlinkddns.com:8090/patch/ok-button-click", {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleCancelButtonClick() {
        console.log("_handleCancelButtonClick called.");

        fetch("https://dev-angelo.dlinkddns.com:8090/patch/cancel-button-click", {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleProductButtonClick(index) {
        console.log("_handleNumberButtonClick called. index: ", index);
        const data = {};
        data.index = index;

        fetch("https://dev-angelo.dlinkddns.com:8090/patch/product-button-click", {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleMoneyButtonClick(index) {
        console.log("_handleMoneyButtonClick called. index: ", index);

        const data = {};
        data.index = index;

        fetch("https://dev-angelo.dlinkddns.com:8090/patch/money-button-click", {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                this._handleResponseData(responseData);
            });
    }

    _handleResponseData(responseData) {
        if (responseData.message !== undefined) {
            console.log(responseData.message);
            this._view.forEach(element => {
                element.onNotifyMessageOccured(responseData.message)
            });
        }

        if (responseData.productList !== undefined)
            this._productModel.setProductList(responseData.productList);

        if (responseData.walletCash !== undefined)
            this._cashModel.setWalletCash(responseData.walletCash);

        if (responseData.walletCashArray !== undefined)
            this._cashModel.setWalletCashArray(responseData.walletCashArray);

        if (responseData.collectedCash !== undefined)
            this._cashModel.setCollectedCash(responseData.collectedCash);
    }
}

export default Controller;