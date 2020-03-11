import View from './View.js'

class WalletView extends View {
    constructor() {
        super();

        this._onMoneyButtonClicked = null;
    }

    render() {
        return ``
    }

    appendHandler(callback) {
        this._onMoneyButtonClicked = callback.moneyButtonClickHandler;
    }

    onNotifyRenderFinished() {
    }    

    _appendEventHandler() {
    }

    onNotifyWalletCashChanged(walletCash) {
    }

    onNotifyWalletCashArrayChanged(walletCashArray) {
    }
}

export default WalletView;