import View from './View.js'

class ProductListView extends View {
    constructor() {
        super();

        this._onProductButtonClicked = null;
        this._productListArea = null;
        this._buttons = null;
    }

    render() {
        return `
            <div class="productListArea"></div>
        `;
    }

    appendHandler(callback) {
        this._onProductButtonClicked = callback.productButtonClickHandler;
    }

    onNotifyRenderFinished() {
        this._productListArea = document.querySelector(".productListArea");
    }

    _appendEventHandler() {
        this._buttons = this._productListArea.querySelectorAll("button");

        this._buttons.forEach(element => {
            const productIndex = element.querySelector(".index").innerHTML;
            element.addEventListener('click', event => this._onProductButtonClicked(productIndex));
        });
    }

    onNotifyCollectedCashChanged(collectedCash) {
        this._buttons.forEach(element => {
            const priceString = element.querySelector(".price").innerHTML;
            const priceValue = parseInt(priceString);

            if (collectedCash >= priceValue) {
                element.className = "focus"
            }
            else {
                element.className = "";
            }
        });
    }

    onNotifyProductListChanged(productList) {
        let item = "";

        productList.forEach(element => {
            item +=
            `
            <button class="product">
                <p class="index">${element.index}</p>
                <p class="name">${element.name}</p>
                <p class="price">${element.price} 웝</p>
            </button>
            `
        });

        this._productListArea.insertAdjacentHTML('beforeend', item);
        this._appendEventHandler();
    }
}

export default ProductListView;