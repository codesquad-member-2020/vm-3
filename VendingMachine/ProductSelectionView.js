import View from "./View.js";

class ProductSelectionView extends View {
  constructor() {
    super();

    this._onNumberButtonClicked = null;
    this._onOKButtonClicked = null;
    this._onCancelButtonClicked = null;
  }

  render() {
    return ``;
  }

  appendHandler(callback) {
    this._onNumberButtonClicked = callback.numberButtonClickHandler;
    this._onOKButtonClicked = callback.okButtonClickHandler;
    this._onCancelButtonClicked = callback.cancelButtonClickHandler;
  }

  onNotifyRenderFinished() {
    this.inputAmount = document.querySelector(".inputAmount span");
    this.selectBtns = document.querySelector(".selectBtns");
    this.messageArea = document.querySelector(".messageArea");
  }

  _appendEventHandler() {
    this.selectBtns.addEventListener("click", event => {
      if (event.target.textContent === "OK") this._onOKButtonClicked(event);
      else if (event.target.textContent === "Cancel")
        this._onCancelButtonClicked(event);
      else this._onNumberButtonClicked(event);
    });
  }

  onNotifyCollectedCashChanged(collectedCash) {
    this.inputAmount.innerHTML = collectedCash;
  }

  onNotifyMessageOccured(message) {
    this.messageArea.innerHTML += `${message}</br>`;
  }
}

export default ProductSelectionView;
