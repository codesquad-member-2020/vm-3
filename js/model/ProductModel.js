import Model from './Model.js'

class ProductModel extends Model {
    constructor(...views) {
        super(...views);

        this._productList = null;
    }

    setProductList(productList) {
        const changedProductList = JSON.stringify(productList) === JSON.stringify(this._productList);
        if (changedProductList) return;

        this._productList = productList;
        this._view.forEach(view => view.onNotifyProductListChanged(productList));
    }

    getProductList() {
        return this._productList;
    }
}

export default ProductModel;