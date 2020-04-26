import ScreenController from "./ScreenController"

import WelcomeScreen from "./screens/WelcomeScreen"
import ShareLinkScreen from "./screens/ShareLinkScreen"
import PasteLinkScreen from "./screens/PasteLinkScreen"
import GameScreen from "./screens/GameScreen"

import "./styles.css"


window.onload = function() {
    const screenContainer = document.getElementById("main")!
    const gameScreen = new GameScreen()

    const controller = new ScreenController(screenContainer)

    function showWelcomeScreen() {
        const welcomeScreen = new WelcomeScreen()
        controller.showScreen(welcomeScreen)

        welcomeScreen.onCreateNewGame(showShareLinkScreen)
        welcomeScreen.onJoinGame(showPasteLinkScreen)
    }

    function showShareLinkScreen() {
        const shareLinkScreen = new ShareLinkScreen("awesome-link")
        controller.showScreen(shareLinkScreen)
    }

    function showPasteLinkScreen() {
        const pasteLinkScreen = new PasteLinkScreen()
        controller.showScreen(pasteLinkScreen)

        pasteLinkScreen.onPasteLink((link) => {
            // Try connect to the other
        })
    }

    showWelcomeScreen()
}


