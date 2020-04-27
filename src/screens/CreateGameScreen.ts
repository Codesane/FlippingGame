import IScreen from "./IScreen"


export type OnSubmitFriendCode = (code: string) => void

export default class CreateGameScreen implements IScreen {
    private readonly templateId: string = "create-game-screen-template"

    private onSubmitFriendCodeCallback: OnSubmitFriendCode | null = null

    private friendCodeInputElement!: HTMLInputElement

    constructor(readonly ownerGameCode: string) {
    }

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        this.friendCodeInputElement = document.getElementById("friend-code-input") as HTMLInputElement

        (document.getElementById("my-code-input") as HTMLInputElement).value = this.ownerGameCode

        document.getElementById("submit-code")!.addEventListener("click", this.onClickSubmitFriendCodeDelegate)
    }

    onSubmitFriendCode(callback: OnSubmitFriendCode) {
        this.onSubmitFriendCodeCallback = callback
    }

    destroy(): void {

    }

    private onClickSubmitFriendCodeDelegate = () => {
        const friendCode = this.friendCodeInputElement.value

        this.onSubmitFriendCodeCallback && this.onSubmitFriendCodeCallback(friendCode)
    }
}
