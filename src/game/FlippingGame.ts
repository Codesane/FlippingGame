import PieceMap from "./PieceMap"

import { Config } from "./types"

export default class FlippingGame {
    private readonly ctx: CanvasRenderingContext2D
    private readonly pieces: PieceMap

    constructor(readonly config: Config) {
        this.ctx = config.canvas.getContext("2d")!
        this.pieces = new PieceMap(config.n)
    }

    draw() {
        this.drawBoard()
        this.drawPieces()
    }

    private drawBoard() {
        this.ctx.strokeStyle = this.config.colors.board

        const cellSize = this.config.sizes.cell
        const width = this.config.n * cellSize
        const height = this.config.n * cellSize

        // Draw the frame
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(width, 0)
        this.ctx.lineTo(width, height)
        this.ctx.lineTo(0, height)
        this.ctx.lineTo(0, 0)
        this.ctx.closePath()
        this.ctx.stroke()

        // Draw the vertical lines along the x-axis
        for (let vx = 0; vx < this.config.n; vx++) {
            this.ctx.beginPath()
            this.ctx.moveTo(vx * cellSize, 0)
            this.ctx.lineTo(vx * cellSize, height)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        // Draw the horizontal lines along the y-axis
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
        const pieceRadius = this.config.sizes.pieceRadius

        this.ctx.fillStyle = this.config.colors.pieces.default

        // Draw the pieces for all cells
        for (let y = 0; y < this.config.n; y++) {
            for (let x = 0; x < this.config.n; x++) {
                this.ctx.beginPath()
                this.ctx.arc(
                    x * cellSize + cellSize / 2,
                    y * cellSize + cellSize / 2,
                    pieceRadius / 2,
                    0,
                    2 * Math.PI
                )
                this.ctx.fill()
            }
        }
    }
}
