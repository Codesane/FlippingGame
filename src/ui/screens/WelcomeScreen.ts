import BaseScreen from "../framework/BaseScreen"

export type OnCreateNewGame = () => void
export type OnJoinGame = () => void

export default class WelcomeScreen extends BaseScreen {
    private _onCreateNewGameCallback: OnCreateNewGame | null = null
    private _onJoinGameCallback: OnCreateNewGame | null = null

    constructor() {
        super("welcome-screen-template")
    }

    render(container: HTMLElement): void {
        super.render(container)

        this.onEvent("new-game", "click", this.onClickCreateNewGameDelegate)
        this.onEvent("join-game", "click", this.onClickJoinGameDelegate)
    }

    onCreateNewGame(callback: OnCreateNewGame) {
        this._onCreateNewGameCallback = callback
    }

    onJoinGame(callback: OnJoinGame) {
        this._onJoinGameCallback = callback
    }

    private onClickCreateNewGameDelegate = () => {
        this._onCreateNewGameCallback && this._onCreateNewGameCallback()
    }

    private onClickJoinGameDelegate = () => {
        this._onJoinGameCallback && this._onJoinGameCallback()
    }
}
