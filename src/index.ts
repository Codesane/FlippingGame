import ScreenController from "./ui/framework/ScreenController"

import WelcomeScreen from "./ui/screens/WelcomeScreen"
import CreateGameScreen from "./ui/screens/CreateGameScreen"
import GameScreen from "./ui/screens/GameScreen"

import OnlineGameSession from "./OnlineGameSession"

import SimplePeer from "simple-peer"

import "./styles.css"

window.onload = function() {
    const screenContainer = document.getElementById("main")!
    const controller = new ScreenController(screenContainer)

    function showWelcomeScreen() {
        const welcomeScreen = new WelcomeScreen()
        controller.showScreen(welcomeScreen)

        welcomeScreen.onCreateNewGame(showCreateGameScreen)
        welcomeScreen.onCreateOnlineGame(() => {
            alert("TODO")
        })
    }

    async function showCreateGameScreen() {
        const peer = new SimplePeer({ initiator: true, trickle: false })

        const signal = await getEncodedSignal(peer)
        const createGameScreen = new CreateGameScreen(signal)
        controller.showScreen(createGameScreen)

        createGameScreen.onSubmitFriendCode((friendCode) => {
            applyEncodedSignal(peer, friendCode)
        })

        peer.on("connect", () => {
            // noinspection JSIgnoredPromiseFromCall
            showGameScreen(new OnlineGameSession(peer, true))
        })
    }

    async function showGameScreen(session: OnlineGameSession) {
        const gameScreen = new GameScreen()
        controller.showScreen(gameScreen)

        // Host moves first
        gameScreen.setControlsEnabled(session.isHost)

        gameScreen.onRegionSelected(region => {
            session.sendRegionSelectedEvent(region)
        })

        gameScreen.onFlipPieces(region => {
            session.sendPiecesFlippedEvent(region)
            gameScreen.setControlsEnabled(false)
        })

        session.onPlayerChangeSelectedRegion(region => {
            gameScreen.setSelectedRegion(region)
        })

        session.onPlayerFlipPieces(region => {
            gameScreen.flipPieces(region)
            gameScreen.setControlsEnabled(true)
        })

    }

    showWelcomeScreen()
}

export async function getEncodedSignal(peer: SimplePeer.Instance): Promise<string> {
    return new Promise((resolve, _) => {
        peer.on("signal", data => {
            resolve(btoa(JSON.stringify(data)))
        })
    })
}

export function applyEncodedSignal(peer: SimplePeer.Instance, encodedSignal: string) {
    peer.signal(JSON.parse(atob(encodedSignal)))
}
