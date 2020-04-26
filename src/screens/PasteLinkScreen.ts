import IScreen from "./IScreen"

export type OnPasteLink = (link: string) => void

export default class PasteLinkScreen implements IScreen {
    private readonly templateId: string = "paste-link-screen-template"

    private onPasteLinkCallback: OnPasteLink | null = null

    private submitCodeButtonElement!: HTMLButtonElement

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        this.submitCodeButtonElement = document.getElementById("new-game") as HTMLButtonElement
        this.submitCodeButtonElement.addEventListener("click", this.onClickJoinGameDelegate)
    }

    onPasteLink(callback: OnPasteLink) {
        this.onPasteLinkCallback = callback
    }

    destroy(): void {
        this.submitCodeButtonElement.removeEventListener("click", this.onClickJoinGameDelegate)
    }

    private onClickJoinGameDelegate = () => {
        const link = "the link"
        this.onPasteLinkCallback && this.onPasteLinkCallback(link)
    }
}
