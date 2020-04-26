import IScreen from "./IScreen"
import FlippingGame from "../game/FlippingGame";
import CanFlipRegion, {RuleBreaks} from "../game/CanFlipRegion";

export default class GameScreen implements IScreen {
    private readonly templateId: string = "game-screen-template"

    render(container: HTMLElement): void {
        const templateContents = document.getElementById(this.templateId)!.innerHTML

        container.innerHTML = templateContents

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
            game.flipPieces(game.currentSelectedRegion!)
        }

        game.onChangeSelectedRegion((region) => {
            const ruleBreaks = new CanFlipRegion(game.pieces, region).check()

            const ruleTopRightPieceMustNotBeFlippedElement = document.getElementById("rule-TopRightPieceMustNotBeFlipped")!
            const ruleWidthMustBeSquare = document.getElementById("rule-WidthMustBeSquare")!
            const ruleHeightMustBeTriangular = document.getElementById("rule-HeightMustBeTriangular")!

            ruleTopRightPieceMustNotBeFlippedElement.style.color = "#000"
            ruleWidthMustBeSquare.style.color = "#000"
            ruleHeightMustBeTriangular.style.color = "#000"

            if (ruleBreaks.includes(RuleBreaks.TopRightPieceMustNotBeFlipped)) {
                ruleTopRightPieceMustNotBeFlippedElement.style.color = "red"
            }

            if (ruleBreaks.includes(RuleBreaks.WidthMustBeSquare)) {
                ruleWidthMustBeSquare.style.color = "red"
            }

            if (ruleBreaks.includes(RuleBreaks.HeightMustBeTriangular)) {
                ruleHeightMustBeTriangular.style.color = "red"
            }
        })
    }

    destroy(): void {

    }
}
