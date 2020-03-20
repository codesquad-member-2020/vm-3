import Model from "./Model.js";

class CashModel extends Model {
  constructor(...views) {
    super(...views);

    this._collectedCash = null;
    this._walletCash = null;
    this._walletCashArray = null;
  }

  setCollectedCash(collectedCash) {
    if (this._collectedCash === collectedCash) return;

    this.collectedCash = collectedCash;
    this._view.forEach(view => view.onNotifyCollectedCashChanged(collectedCash));
  }

  getCollectedCash() {
    return this._collectedCash;
  }

  setWalletCash(walletCash) {
    if (this._walletCash === walletCash) return;

    this._walletCash = walletCash;
    this._view.forEach(view => view.onNotifyWalletCashChanged(walletCash));
  }

  getWalletCash() {
    return this._walletCash;
  }

  setWalletCashArray(walletCashArray) {
    const changedWalletCashArray =
      JSON.stringify(this._walletCashArray) === JSON.stringify(walletCashArray);
    if (changedWalletCashArray) return;

    this._walletCashArray = walletCashArray;
    this._view.forEach(view => view.onNotifyWalletCashArrayChanged(walletCashArray));
  }

  getWalletCashArray() {
    return this._walletCashArray;
  }
}

export default CashModel;
