import IScreen from "./IScreen"
import FlippingGame from "../game/FlippingGame"
import CanFlipRegion, { RuleBreaks } from "../game/CanFlipRegion"

import { Config, RectangularRegion } from "../game/types"

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

export type OnRegionSelected = (region: RectangularRegion) => void
export type OnFlipPieces = (region: RectangularRegion) => void

export default class GameScreen implements IScreen {
    private readonly _templateId: string = "game-screen-template"

    private _onRegionSelectedCallback: OnRegionSelected | null = null
    private _onFlipRegionCallback: OnFlipPieces | null = null

    private _game!: FlippingGame

    render(container: HTMLElement): void {
        container.innerHTML = document.getElementById(this._templateId)!.innerHTML

        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        this._game = new FlippingGame(
            canvas,
            config
        )

        document.getElementById("flip-region-btn")!.addEventListener("click", this.onClickFlipRegionButton)

        this._game.onChangeSelectedRegion(this.onChangeSelectedRegion)
    }

    onRegionSelected(callback: OnRegionSelected) {
        this._onRegionSelectedCallback = callback
    }

    setSelectedRegion(region: RectangularRegion) {
        this._game.selectRegion(region)
    }

    onFlipPieces(callback: OnFlipPieces) {
        this._onFlipRegionCallback = callback
    }

    flipPieces(region: RectangularRegion) {
        this._game.flipPieces(region)
    }

    setControlsEnabled(enable: boolean) {
        this._game.controlsEnabled = enable
    }

    private onChangeSelectedRegion = (region: RectangularRegion) => {
        const ruleBreaks = new CanFlipRegion(this._game.pieces, region).check()

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

        if (ruleBreaks.length === 0) {
            this._onRegionSelectedCallback && this._onRegionSelectedCallback(region)
        }
    }

    private onClickFlipRegionButton = () => {
        const currentRegion = this._game.currentSelectedRegion!

        try {
            this._game.flipPieces(currentRegion)
            this._onFlipRegionCallback && this._onFlipRegionCallback(currentRegion)
        } catch (e) {
            // It's likely that the opponent is up to no good
            console.error(e)
        }
    }

    destroy(): void {

    }
}
