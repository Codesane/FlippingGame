import IScreen from "./IScreen"


export default class ShareLinkScreen implements IScreen {
    private readonly templateId: string = "share-link-screen-template"

    constructor(readonly shareLink: string) {

    }

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        const shareLinkElement = document.getElementById("share-link")!
        shareLinkElement.innerText = this.shareLink
    }

    destroy(): void {

    }
}
