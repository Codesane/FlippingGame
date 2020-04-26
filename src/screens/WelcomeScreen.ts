import IScreen from "./IScreen"

export type OnCreateNewGame = () => void

export default class WelcomeScreen implements IScreen {

    private readonly templateId: string = "welcome-screen-template"

    private onCreateNewGameCallback: OnCreateNewGame | null = null
    private newGameButtonElement!: HTMLButtonElement

    render(container: HTMLElement): void {
        container.innerHTML = (document.getElementById(this.templateId)!.innerHTML)
        this.newGameButtonElement = document.getElementById("new-game") as HTMLButtonElement

        this.newGameButtonElement.addEventListener("click", this.onClickCreateNewGameDelegate)
    }

    onCreateNewGame(callback: OnCreateNewGame) {
        this.onCreateNewGameCallback = callback
    }

    destroy(): void {
        this.newGameButtonElement.removeEventListener("click", this.onClickCreateNewGameDelegate)
    }

    private onClickCreateNewGameDelegate = () => {
        this.onCreateNewGameCallback && this.onCreateNewGameCallback()
    }
}
