import ScreenController from "./ScreenController"

import WelcomeScreen from "./screens/WelcomeScreen"
import CreateGameScreen from "./screens/CreateGameScreen"
import JoinGameScreen from "./screens/JoinGameScreen"
import GameScreen from "./screens/GameScreen"

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
        welcomeScreen.onJoinGame(showJoinGameScreen)
    }

    async function showCreateGameScreen() {
        const peer = new SimplePeer({ initiator: true, trickle: false })

        const code = await getEncodedSignal(peer)
        const createGameScreen = new CreateGameScreen(code)
        controller.showScreen(createGameScreen)

        createGameScreen.onSubmitFriendCode((friendCode) => {
            applyEncodedSignal(peer, friendCode)
        })

        peer.on("connect", () => {
            // noinspection JSIgnoredPromiseFromCall
            showGameScreen(new OnlineGameSession(peer, true))
        })
    }

    function showJoinGameScreen() {
        const joinGameScreen = new JoinGameScreen()
        controller.showScreen(joinGameScreen)

        const peer = new SimplePeer()

        joinGameScreen.onSubmitFriendCode(async (friendCode) => {
            applyEncodedSignal(peer, friendCode)

            const signal = await getEncodedSignal(peer)
            joinGameScreen.displayMyGameCode(signal)
        })

        peer.on("connect", () => {
            // noinspection JSIgnoredPromiseFromCall
            showGameScreen(new OnlineGameSession(peer, false))
        })
    }

    async function showGameScreen(session: OnlineGameSession) {
        const gameScreen = new GameScreen()
        controller.showScreen(gameScreen)

        gameScreen.setControlsEnabled(session.isHost)

        gameScreen.onRegionSelected(region => {
            session.sendRegionSelectedEvent(region)
        })

        session.onPlayerChangeSelectedRegion(region => {
            gameScreen.setSelectedRegion(region)
        })

    }

    showWelcomeScreen()
}

export async function getEncodedSignal(peer: SimplePeer.Instance): Promise<string> {
    return new Promise((resolve, reject) => {
        peer.on("signal", data => {
            resolve(btoa(JSON.stringify(data)))
        })
    })
}

export function applyEncodedSignal(peer: SimplePeer.Instance, encodedSignal: string) {
    peer.signal(JSON.parse(atob(encodedSignal)))
}
