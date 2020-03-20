import VM_ENUM from "../enum/VMEnum.js";
const VM_AJAX_INFORMATION = VM_ENUM.VM_AJAX_INFORMATION;

class Controller {
    constructor(productListView, productSelectionView, walletView, productModel, cashModel) {
        this._view = [];
        this._view.push(productListView, productSelectionView, walletView);

        this._productModel = productModel;
        this._cashModel = cashModel;

        this._view.forEach(element => {
            const buttonClickHandler = this._handleButtonClick.bind(this);

            element.appendHandler({
                buttonClickHandler: this._handleButtonClick.bind(this)
            });
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

    _handleButtonClick(eventInformation) {
        switch (eventInformation.type) {
            case "productButtonClicked": {
                this._handleProductButtonClick(eventInformation.data)
                break;
            }
            case "okButtonClick": {
                this._handleOKButtonClick();
                break;
            }
            case "cancelButtonClick": {
                this._handleCancelButtonClick();
                break;
            }
            case "numberButtonClick": {
                this._handleNumberButtonClick(eventInformation.data);
                break;
            }
            case "moneyButtonClick": {
                this._handleMoneyButtonClick(eventInformation.data);
                break;
            }
        }
    }

    _handleNumberButtonClick(clickedNumber) {
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