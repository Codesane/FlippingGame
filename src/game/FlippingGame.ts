import PieceMap from "./PieceMap"

import { Cell, Config, RectangularRegion } from "./types"

import * as Utils from "./utils"

export default class FlippingGame {
    private readonly ctx: CanvasRenderingContext2D
    private readonly pieces: PieceMap

    private selectedRegion: RectangularRegion | null = null

    private dragSelectionStart: Cell | null = null

    constructor(readonly config: Config) {
        this.ctx = config.canvas.getContext("2d")!
        this.pieces = new PieceMap(config.n)

        config.canvas.onmousedown = this.onMouseDown.bind(this)
        config.canvas.onmouseup = this.onMouseUp.bind(this)
        config.canvas.onmousemove = this.onMouseMove.bind(this)

        this.draw()
    }

    flipPieces(region: RectangularRegion) {
        this.pieces.flipRegion(region)

        this.draw()
    }

    selectRegion(region: RectangularRegion) {
        this.selectedRegion = region
        this.draw()
    }

    getCurrentSelectedRegion(): RectangularRegion | null {
        return this.selectedRegion
    }

    private draw() {
        this.drawBoard()
        this.drawPieces()
        this.drawCurrentSelection()
    }

    private drawBoard() {
        this.ctx.strokeStyle = this.config.colors.board.background

        const cellSize = this.config.sizes.cell
        const width = this.config.n * cellSize
        const height = this.config.n * cellSize

        this.ctx.fillStyle = this.config.colors.board.background
        this.ctx.fillRect(0, 0, width, height)

        // Draw the grid
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(width, 0)
        this.ctx.lineTo(width, height)
        this.ctx.lineTo(0, height)
        this.ctx.lineTo(0, 0)
        this.ctx.closePath()
        this.ctx.stroke()

        // Draw the vertical lines perpendicular to the x-axis
        for (let vx = 0; vx < this.config.n; vx++) {
            this.ctx.beginPath()
            this.ctx.moveTo(vx * cellSize, 0)
            this.ctx.lineTo(vx * cellSize, height)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        // Draw the horizontal lines perpendicular to the y-axis
        for (let hy = 0; hy < this.config.n; hy++) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, hy * cellSize)
            this.ctx.lineTo(width, hy * cellSize)
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }

    private drawPieces() {
        const cellSize = this.config.sizes.cell
        const pieceDiameter = this.config.sizes.pieceDiameter

        // Draw the pieces for all cells
        for (let y = 0; y < this.config.n; y++) {
            for (let x = 0; x < this.config.n; x++) {
                const piece = this.pieces.getPiece({ x, y })

                this.ctx.beginPath()
                this.ctx.arc(
                    x * cellSize + cellSize / 2,
                    y * cellSize + cellSize / 2,
                    pieceDiameter / 2,
                    0,
                    2 * Math.PI
                )

                this.ctx.fillStyle = piece.flipped ?
                    this.config.colors.pieces.flipped :
                    this.config.colors.pieces.default

                this.ctx.fill()
            }
        }
    }

    private drawCurrentSelection() {
        if (!this.selectedRegion) return

        const cellSize = this.config.sizes.cell
        const region = this.selectedRegion

        this.ctx.fillStyle = this.config.colors.board.selection
        this.ctx.fillRect(
            region.topLeft.x * cellSize,
            region.topLeft.y * cellSize,
            Utils.getRegionWidth(region) * cellSize,
            Utils.getRegionHeight(region) * cellSize
        )
    }

    private onMouseDown(e: MouseEvent) {
        const canvasX = e.offsetX
        const canvasY = e.offsetY

        this.dragSelectionStart = Utils.cellAtCoordinates(this.config.sizes.cell, canvasX, canvasY)
        this.draw()
    }

    private onMouseMove(e: MouseEvent) {
        this.updateSelection(e)
        this.draw()
    }

    private onMouseUp(e: MouseEvent) {
        this.updateSelection(e)

        this.dragSelectionStart = null
        this.draw()
    }

    private updateSelection(e: MouseEvent) {
        const canvasX = e.offsetX
        const canvasY = e.offsetY

        if (this.dragSelectionStart) {
            const dragSelectionEnd = Utils.cellAtCoordinates(this.config.sizes.cell, canvasX, canvasY)
            this.selectedRegion = Utils.getRegionBetweenCells(this.dragSelectionStart!, dragSelectionEnd)
        }
    }
}
