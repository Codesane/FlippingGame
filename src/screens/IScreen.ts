export default interface IScreen {
    render(container: HTMLElement): void
    destroy(): void
}
