import BaseScreen from "../framework/BaseScreen"

export type OnCreateNewGame = () => void
export type OnCreateOnlineGame = () => void

export default class WelcomeScreen extends BaseScreen {
    private _onCreateNewGameCallback: OnCreateNewGame | null = null
    private _onClickCreateOnlineGameCallback: OnCreateOnlineGame | null = null

    constructor() {
        super("welcome-screen-template")
    }

    render(container: HTMLElement): void {
        super.render(container)

        // TODO: Use RxJava for callbacks, it's quite clean :)
        this.onEvent("new-game", "click", this.onClickCreateNewGameDelegate)
        this.onEvent("new-online-game", "click", this.onClickCreateOnlineGame)
    }

    onCreateNewGame(callback: OnCreateNewGame) {
        this._onCreateNewGameCallback = callback
    }

    onCreateOnlineGame(callback: OnCreateOnlineGame) {
        this._onClickCreateOnlineGameCallback = callback
    }

    private onClickCreateNewGameDelegate = () => {
        this._onCreateNewGameCallback?.call(this)
    }

    private onClickCreateOnlineGame = () => {
        this._onClickCreateOnlineGameCallback?.call(this)
    }
}
