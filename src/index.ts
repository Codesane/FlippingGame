import FlippingGame from "./FlippingGame"


function initGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement

    const numCells = 10

    const game = new FlippingGame(canvas, numCells)
    game.draw()
}

window.onload = function() {
    initGame()
}


