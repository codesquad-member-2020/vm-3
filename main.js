import Controller from './VendingMachine/Controller.js'
import ProductModel from './VendingMachine/ProductModel.js'
import CashModel from './VendingMachine/CashModel.js'
import ProductListView from './VendingMachine/ProductListView.js'
import ProductSelectionView from './VendingMachine/ProductSelectionView.js'
import WalletView from './VendingMachine/WalletView.js'


window.addEventListener('DOMContentLoaded', () => {
    const _productListView = new ProductListView();
    const _productSelectionView = new ProductSelectionView();
    const _walletView = new WalletView();

    const _productModel = new ProductModel(_productListView);
    const _cashModel = new CashModel(_productListView, _productSelectionView, _walletView);

    const _controller = new Controller(_productListView, _productSelectionView, _walletView, _productModel, _cashModel);
});