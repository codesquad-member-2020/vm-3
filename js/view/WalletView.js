import View from './View.js'

class WalletView extends View {
    constructor() {
        super();

        this._onMoneyButtonClicked = null;
        this._walletArea = null;
        this._totalPriceArea = null;
        this._priceCountElements = null;
    }

    render() {
        return `
        <div class="walletArea">
            <div class="buttonArea">
                <div class="cashValueArea">
                    <ul class="cashCountList">
                        <li><button>10원</button></li>
                        <li><button>50원</button></li>
                        <li><button>100원</button></li>
                        <li><button>500원</button></li>
                        <li><button>1000원</button></li>
                        <li><button>5000원</button></li>
                        <li><button>10000원</button></li>
                    </ul>
                </div>
                <div class="cashCountArea">
                    <ul class="cashCountList">
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                    </ul>
                </div>
            </div>
            <p class="totalPrice"></p>
        </div>
    `;
    }

    appendHandler(callback) {
        this._onMoneyButtonClicked = callback.moneyButtonClickHandler;
    }

    onNotifyRenderFinished() {
        this._walletArea = document.querySelector(".walletArea");
        this._totalPriceArea = this._walletArea.querySelector(".totalPrice");

        const cashCountArea = this._walletArea.querySelector(".cashCountArea");
        const cashCountElements = cashCountArea.querySelector(".cashCountList");
        this._priceCountElements = cashCountElements.querySelectorAll("p");

        this._appendEventHandler();
    }    

    _appendEventHandler() {
        const buttons = this._walletArea.querySelectorAll("button");

        buttons.forEach((element, index) => {
            element.addEventListener('click', event => this._onMoneyButtonClicked(index + 1));
        });
    }

    onNotifyWalletCashChanged(walletCash) {
        this._totalPriceArea.innerHTML = walletCash + "원";
    }

    onNotifyWalletCashArrayChanged(walletCashArray) {
        this._priceCountElements.forEach((element, index) => {
            element.innerHTML = walletCashArray[index] + "개";
        });
    }
}

export default WalletView;