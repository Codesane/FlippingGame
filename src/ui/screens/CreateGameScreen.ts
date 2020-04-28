import BaseScreen from "../framework/BaseScreen"


export type OnSubmitFriendCode = (code: string) => void

export default class CreateGameScreen extends BaseScreen {
    private _onSubmitFriendCodeCallback: OnSubmitFriendCode | null = null

    constructor(readonly ownerGameCode: string) {
        super("create-game-screen-template")
    }

    render(container: HTMLElement): void {
        super.render(container)

        this.getById<HTMLInputElement>("my-code-input").value = this.ownerGameCode
        this.onEvent("submit-code", "click", this.onClickSubmitFriendCodeDelegate)
    }

    onSubmitFriendCode(callback: OnSubmitFriendCode) {
        this._onSubmitFriendCodeCallback = callback
    }

    private onClickSubmitFriendCodeDelegate = () => {
        const friendCode = this.getById<HTMLInputElement>("friend-code-input").value

        this._onSubmitFriendCodeCallback?.call(this, friendCode)
    }
}
