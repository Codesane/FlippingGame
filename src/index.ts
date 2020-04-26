import ScreenController from "./ScreenController"

import WelcomeScreen from "./screens/WelcomeScreen"
import ShareLinkScreen from "./screens/ShareLinkScreen"
import GameScreen from "./screens/GameScreen"

import "./styles.css"

window.onload = function() {
    const screenContainer = document.getElementById("main")!

    const shareLinkScreen = new ShareLinkScreen()
    const gameScreen = new GameScreen()

    const controller = new ScreenController(screenContainer)

    function showWelcomeScreen() {
        const welcomeScreen = new WelcomeScreen()
        controller.showScreen(welcomeScreen)

        welcomeScreen.onCreateNewGame(showShareLinkScreen)
    }

    function showShareLinkScreen() {
        controller.showScreen(shareLinkScreen)
        
    }

    showWelcomeScreen()
}


