import BaseScreen from "./BaseScreen"


export default class ScreenController {
    private currentScreen: BaseScreen | null = null

    constructor(private readonly container: HTMLElement) {

    }

    showScreen(screen: BaseScreen) {
        this.currentScreen?.destroy()
        this.currentScreen = screen
        this.currentScreen.render(this.container)
    }
}
