import IScreen from "./screens/IScreen"


export default class ScreenController {
    private currentScreen: IScreen | null = null

    constructor(private readonly container: HTMLElement) {
    }

    showScreen(screen: IScreen) {
        this.currentScreen && this.currentScreen.destroy()
        this.currentScreen = screen
        this.currentScreen.render(this.container)
    }
}
