import FlippingGame from "./game/FlippingGame"

function initGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement

    const game = new FlippingGame({
        canvas,
        n: 10,
        colors: {
            board: "#08f26e",
            pieces: {
                default: "#ffffff",
                flipped: "#000000"
            }
        },
        sizes: {
            cell: 100,
            pieceRadius: 90,
            border: 2
        }
    })
    game.draw()
}

window.onload = function() {
    initGame()
}


