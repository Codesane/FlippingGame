import IScreen from "./IScreen"

export default class ShareLinkScreen implements IScreen {
    private readonly templateId: string = "share-link-screen-template"

    render(container: HTMLElement): void {
        const templateContents = document.getElementById(this.templateId)!.innerHTML

        container.innerHTML = templateContents
    }

    destroy(): void {

    }
}
