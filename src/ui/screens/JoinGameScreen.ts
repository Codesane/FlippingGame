import BaseScreen from "../framework/BaseScreen"


export type OnSubmitFriendCode = (code: string) => void

export default class JoinGameScreen extends BaseScreen {
    private _onSubmitFriendCodeCallback: OnSubmitFriendCode | null = null

    constructor() {
        super("join-game-screen-template")
    }

    render(container: HTMLElement): void {
        super.render(container)

        this.onEvent("submit-friend-code-button", "click", this.onClickSubmitFriendCodeDelegate)
        this.onEvent("my-code-input", "click", this.onClickSubmitFriendCodeDelegate)
    }

    onSubmitFriendCode(callback: OnSubmitFriendCode) {
        this._onSubmitFriendCodeCallback = callback
    }

    displayMyGameCode(myGameCode: string) {
        this.getById<HTMLElement>("my-code-input-container").style.display = "block"
        this.getById<HTMLInputElement>("my-code-input").value = myGameCode
    }

    private onClickSubmitFriendCodeDelegate = () => {
        const friendCode = this.getById<HTMLInputElement>("join-game-friend-code-input").value

        this._onSubmitFriendCodeCallback?.call(this, friendCode)
    }
}
