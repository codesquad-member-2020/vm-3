import Controller from './js/controller/Controller.js'
import ProductModel from './js/model/ProductModel.js'
import CashModel from './js/model/CashModel.js'
import ProductListView from './js/view/ProductListView.js'
import ProductSelectionView from './js/view/ProductSelectionView.js'
import WalletView from './js/view/WalletView.js'


window.addEventListener('DOMContentLoaded', () => {
    const _productListView = new ProductListView();
    const _productSelectionView = new ProductSelectionView();
    const _walletView = new WalletView();

    const _productModel = new ProductModel(_productListView);
    const _cashModel = new CashModel(_productListView, _productSelectionView, _walletView);

    const _controller = new Controller(_productListView, _productSelectionView, _walletView, _productModel, _cashModel);
});