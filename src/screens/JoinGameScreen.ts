import IScreen from "./IScreen"


export type OnSubmitFriendCode = (code: string) => void

export default class JoinGameScreen implements IScreen {
    private readonly templateId: string = "join-game-screen-template"

    private onSubmitFriendCodeCallback: OnSubmitFriendCode | null = null

    private friendCodeInputElement!: HTMLInputElement
    private submitFriendCodeInputElement!: HTMLButtonElement

    private myCodeInputContainerElement!: HTMLElement
    private myCodeInputElement!: HTMLInputElement

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        this.friendCodeInputElement = document.getElementById("join-game-friend-code-input") as HTMLInputElement
        this.submitFriendCodeInputElement = document.getElementById("submit-friend-code-button") as HTMLButtonElement

        this.myCodeInputContainerElement = document.getElementById("my-code-input-container") as HTMLElement
        this.myCodeInputElement = document.getElementById("my-code-input") as HTMLInputElement

        this.submitFriendCodeInputElement.addEventListener("click", this.onClickSubmitFriendCodeDelegate)
    }

    onSubmitFriendCode(callback: OnSubmitFriendCode) {
        this.onSubmitFriendCodeCallback = callback
    }

    displayMyGameCode(myGameCode: string) {
        this.myCodeInputContainerElement.style.display = "block"

        this.myCodeInputElement.value = myGameCode
    }

    destroy(): void {

    }

    private onClickSubmitFriendCodeDelegate = () => {
        const friendCode = this.friendCodeInputElement.value

        this.onSubmitFriendCodeCallback && this.onSubmitFriendCodeCallback(friendCode)
    }
}
