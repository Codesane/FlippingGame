import FlippingGame from "./game/FlippingGame"
import CanFlipRegion, {CanFlipRegionResult} from "./game/CanFlipRegion";


function initGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement

    const game = new FlippingGame({
        canvas,
        n: 10,
        colors: {
            board: {
                background: "#08f26e",
                validSelection: "rgba(255, 255, 255, .5)",
                invalidSelection: "rgba(218, 18, 18, .3)"
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

    game.onChangeSelectedRegion((region) => {
        const result = new CanFlipRegion().check(game.getPieces(), region)

        const ruleTopRightPieceMustNotBeFlippedElement = document.getElementById("rule-TopRightPieceMustNotBeFlipped")!
        const ruleWidthMustBeSquare = document.getElementById("rule-WidthMustBeSquare")!
        const ruleHeightMustBeTriangular = document.getElementById("rule-HeightMustBeTriangular")!

        ruleTopRightPieceMustNotBeFlippedElement.style.color = "#000"
        ruleWidthMustBeSquare.style.color = "#000"
        ruleHeightMustBeTriangular.style.color = "#000"

        switch (result) {
            case CanFlipRegionResult.No_TopRightPieceMustNotBeFlipped:
                ruleTopRightPieceMustNotBeFlippedElement.style.color = "red"
                break
            case CanFlipRegionResult.No_WidthMustBeSquare:
                ruleWidthMustBeSquare.style.color = "red"
                break
            case CanFlipRegionResult.No_HeightMustBeTriangular:
                ruleHeightMustBeTriangular.style.color = "red"
                break
        }
    })
}

window.onload = function() {
    initGame()
}


