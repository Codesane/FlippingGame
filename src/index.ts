import FlippingGame from "./game/FlippingGame"


function initGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement

    const game = new FlippingGame({
        canvas,
        n: 10,
        colors: {
            board: {
                background: "#08f26e",
                selection: "rgba(255, 255, 255, .5)"
            },
            pieces: {
                default: "#ffffff",
                selected: "#cccccc",
                flipped: "#000000"
            }
        },
        sizes: {
            cell: 100,
            pieceDiameter: 90,
            border: 2
        }
    })

    const flipSelectedRegionBtn = document.getElementById("select-region-btn") as HTMLButtonElement

    flipSelectedRegionBtn.onclick = () => {
        game.flipPieces(game.getCurrentSelectedRegion()!)
    }

}

window.onload = function() {
    initGame()
}


