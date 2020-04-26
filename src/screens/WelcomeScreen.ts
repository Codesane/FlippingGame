import IScreen from "./IScreen"

export type OnCreateNewGame = () => void
export type OnJoinGame = () => void

export default class WelcomeScreen implements IScreen {
    private readonly templateId: string = "welcome-screen-template"

    private onCreateNewGameCallback: OnCreateNewGame | null = null
    private onJoinGameCallback: OnCreateNewGame | null = null

    private newGameButtonElement!: HTMLButtonElement
    private joinGameButtonElement!: HTMLButtonElement

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        this.newGameButtonElement = document.getElementById("new-game") as HTMLButtonElement
        this.newGameButtonElement.addEventListener("click", this.onClickCreateNewGameDelegate)

        this.joinGameButtonElement = document.getElementById("join-game") as HTMLButtonElement
        this.joinGameButtonElement.addEventListener("click", this.onClickJoinGameDelegate)
    }

    onCreateNewGame(callback: OnCreateNewGame) {
        this.onCreateNewGameCallback = callback
    }

    onJoinGame(callback: OnJoinGame) {
        this.onJoinGameCallback = callback
    }

    destroy(): void {
        this.newGameButtonElement.removeEventListener("click", this.onClickCreateNewGameDelegate)
        this.joinGameButtonElement.removeEventListener("click", this.onClickJoinGameDelegate)
    }

    private onClickCreateNewGameDelegate = () => {
        this.onCreateNewGameCallback && this.onCreateNewGameCallback()
    }

    private onClickJoinGameDelegate = () => {
        this.onJoinGameCallback && this.onJoinGameCallback()
    }
}
