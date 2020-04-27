import { Cell, Config, RectangularRegion } from "./types"
import CanFlipRegion from "./CanFlipRegion"
import PieceMap from "./PieceMap"

import * as Utils from "./utils"
import {areRegionsEqual} from "./utils";

export type OnChangeSelectedRegion = (region: RectangularRegion) => void

export default class FlippingGame {
    private readonly _ctx: CanvasRenderingContext2D
    private readonly _pieces: PieceMap

    private _currentSelectedRegion: RectangularRegion | null = null
    private _onChangeSelectedRegionCb: OnChangeSelectedRegion | null = null

    private _dragSelectionStart: Cell | null = null

    private _controlsEnabled: boolean = true

    constructor(readonly canvas: HTMLCanvasElement, readonly config: Config) {
        this._ctx = canvas.getContext("2d")!
        this._pieces = new PieceMap(config.n)

        canvas.onmousedown = this.onMouseDown.bind(this)
        canvas.onmouseup = this.onMouseUp.bind(this)
        canvas.onmousemove = this.onMouseMove.bind(this)

        this.draw()
    }

    flipPieces(region: RectangularRegion) {
        const ruleBreaks = new CanFlipRegion(this._pieces, region).check()
        if (ruleBreaks.length !== 0) {
            throw new Error(`Can't flip region because it breaks the following rules: '${ruleBreaks.join(", ")}'`)
        }

        this._pieces.flipRegion(region)
        this.removeCurrentSelection()

        this.draw()
    }

    set controlsEnabled(enable: boolean) {
        this._controlsEnabled = enable
    }

    selectRegion(region: RectangularRegion) {
        this._currentSelectedRegion = region
        this.draw()
    }

    onChangeSelectedRegion(callback: OnChangeSelectedRegion) {
        this._onChangeSelectedRegionCb = callback
    }

    get currentSelectedRegion(): RectangularRegion | null {
        return this._currentSelectedRegion
    }

    get pieces(): PieceMap {
        return this._pieces
    }

    private draw() {
        this.drawBoard()
        this.drawPieces()
        this.drawCurrentSelection()
    }

    private drawBoard() {
        this._ctx.strokeStyle = this.config.colors.board.background

        const cellSize = this.config.sizes.cell
        const width = this.config.n * cellSize
        const height = this.config.n * cellSize

        this._ctx.fillStyle = this.config.colors.board.background
        this._ctx.fillRect(0, 0, width, height)

        // Draw the vertical lines perpendicular to the x-axis
        for (let vx = 0; vx < this.config.n; vx++) {
            this._ctx.beginPath()
            this._ctx.moveTo(vx * cellSize, 0)
            this._ctx.lineTo(vx * cellSize, height)
            this._ctx.closePath()
            this._ctx.stroke()
        }

        // Draw the horizontal lines perpendicular to the y-axis
        for (let hy = 0; hy < this.config.n; hy++) {
            this._ctx.beginPath()
            this._ctx.moveTo(0, hy * cellSize)
            this._ctx.lineTo(width, hy * cellSize)
            this._ctx.closePath()
            this._ctx.stroke()
        }
    }

    private drawPieces() {
        const cellSize = this.config.sizes.cell
        const pieceDiameter = this.config.sizes.pieceDiameter

        // Draw the pieces for all cells
        for (let y = 0; y < this.config.n; y++) {
            for (let x = 0; x < this.config.n; x++) {
                const piece = this._pieces.getPiece({ x, y })

                this._ctx.beginPath()
                this._ctx.arc(
                    x * cellSize + cellSize / 2,
                    y * cellSize + cellSize / 2,
                    pieceDiameter / 2,
                    0,
                    2 * Math.PI
                )

                this._ctx.fillStyle = piece.flipped ?
                    this.config.colors.pieces.flipped :
                    this.config.colors.pieces.default

                this._ctx.fill()
            }
        }
    }

    private drawCurrentSelection() {
        if (!this._currentSelectedRegion) return

        const cellSize = this.config.sizes.cell
        const region = this._currentSelectedRegion

        const {
            validSelection: validSelectionColor,
            invalidSelection: invalidSelectionColor
        } = this.config.colors.board

        const isSelectionValid = new CanFlipRegion(this._pieces, region).check().length === 0

        this._ctx.fillStyle = isSelectionValid ? validSelectionColor : invalidSelectionColor

        this._ctx.fillRect(
            region.topLeft.x * cellSize,
            region.topLeft.y * cellSize,
            Utils.getRegionWidth(region) * cellSize,
            Utils.getRegionHeight(region) * cellSize
        )
    }

    private onMouseDown(e: MouseEvent) {
        if (!this._controlsEnabled) return

        const canvasX = e.offsetX
        const canvasY = e.offsetY

        this._dragSelectionStart = Utils.cellAtCoordinates(this.config.sizes.cell, canvasX, canvasY)
        this.draw()
    }

    private onMouseMove(e: MouseEvent) {
        if (!this._controlsEnabled) return

        this.updateSelection(e)
        this.draw()
    }

    private onMouseUp(e: MouseEvent) {
        if (!this._controlsEnabled) return

        this.updateSelection(e)

        this._dragSelectionStart = null
        this.draw()
    }

    private removeCurrentSelection() {
        this._currentSelectedRegion = null
    }

    private updateSelection(e: MouseEvent) {
        const canvasX = e.offsetX
        const canvasY = e.offsetY

        if (this._dragSelectionStart) {
            const dragSelectionEnd = Utils.cellAtCoordinates(this.config.sizes.cell, canvasX, canvasY)
            const newSelectedRegion = Utils.getRegionBetweenCells(this._dragSelectionStart!, dragSelectionEnd)

            // Only invoke the callback when the region has changed.
            if (!this._currentSelectedRegion || !areRegionsEqual(this._currentSelectedRegion, newSelectedRegion)) {
                this._onChangeSelectedRegionCb && this._onChangeSelectedRegionCb(newSelectedRegion)
            }

            this._currentSelectedRegion = newSelectedRegion
        }
    }
}
