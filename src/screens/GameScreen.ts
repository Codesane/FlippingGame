import IScreen from "./IScreen"
import FlippingGame from "../game/FlippingGame"
import CanFlipRegion, { RuleBreaks } from "../game/CanFlipRegion"

import OnlineGameSession from "../OnlineGameSession"

import { Config } from "../game/types"

const config: Config = {
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
}

export default class GameScreen implements IScreen {
    private readonly templateId: string = "game-screen-template"

    private game!: FlippingGame

    constructor(readonly session: OnlineGameSession) {
    }

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this.templateId)!.innerHTML

        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        this.game = new FlippingGame(
            canvas,
            config
        )

        document.getElementById("flip-region-btn")!.addEventListener("click", this.onClickFlipRegionButton)

        this.game.onChangeSelectedRegion((region) => {
            const ruleBreaks = new CanFlipRegion(this.game.pieces, region).check()

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

    private onClickFlipRegionButton = () => {
        this.game.flipPieces(this.game.currentSelectedRegion!)
    }

    destroy(): void {

    }
}
