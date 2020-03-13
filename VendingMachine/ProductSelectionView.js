import View from "./View.js";

class ProductSelectionView extends View {
  constructor() {
    super();

    this._onNumberButtonClicked = null;
    this._onOKButtonClicked = null;
    this._onCancelButtonClicked = null;
  }

  render() {
    return `  
    <div class="productSelectionArea">
    <div class="inputAmount"><span></span> 웝</div>
    <ol class="selectBtns">
      <li><button>1</button></li>
      <li><button>2</button></li>
      <li><button>3</button></li>
      <li><button>4</button></li>
      <li><button>5</button></li>
      <li><button>6</button></li>
      <li><button>7</button></li>
      <li><button>8</button></li>
      <li><button>9</button></li>
      <li><button>OK</button></li>
      <li><button>0</button></li>
      <li><button>Cancel</button></li>
    </ol>
    <div class="messageArea"></div>
  </div>`;
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

    this._appendEventHandler();
  }

  _appendEventHandler() {
    this.selectBtns.addEventListener("click", ({ target }) => {
      if (target.textContent === "OK") this._onOKButtonClicked();
      else if (target.textContent === "Cancel") this._onCancelButtonClicked();
      else this._onNumberButtonClicked(parseInt(target.textContent));
    });
  }

  onNotifyCollectedCashChanged(collectedCash) {
    this.inputAmount.innerHTML = collectedCash;
  }

  onNotifyMessageOccured(message) {
    this.messageArea.innerHTML += `${message}</br>`;
    this.messageArea.scrollTop = 20000;
  }
}

export default ProductSelectionView;
