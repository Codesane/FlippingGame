const variables = {
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
}

interface Cell {
    x: number
    y: number
}

interface Region {
    topLeft: Cell
    topRight: Cell
}

interface Piece {
    cell: Cell
    flipped: boolean
}

class PieceMap {
    private readonly pieces: Piece[][]

    constructor(readonly n: number) {
        const pieces: Piece[][] = []
        for (let y = 0; y < n; y++) {
            const row: Piece[] = []
            for (let x = 0; x < n; x++) {
                row.push({
                    cell: { x, y },
                    flipped: false
                })
            }
            pieces.push(row)
        }
        this.pieces = pieces
    }

    getPiece(cell: Cell): Piece {
        this.assertIsWithinBounds(cell)
        return this.pieces[cell.y][cell.x]
    }

    flipPiece(cell: Cell) {
        this.assertIsWithinBounds(cell)
        this.pieces[cell.y][cell.x].flipped = !this.getPiece(cell).flipped
    }

    private assertIsWithinBounds(cell: Cell) {
        if (!(cell.x >= 0 && cell.x < this.n)) throw new Error(`Out of bounds, expected cell.x >= 0 && cell.x < ${this.n} but cell.x was '${cell.x}'.`)
        if (!(cell.y >= 0 && cell.y < this.n)) throw new Error(`Out of bounds, expected cell.y >= 0 && cell.y < ${this.n} but cell.y was '${cell.y}'.`)
    }
}

export default class FlippingGame {
    private readonly ctx: CanvasRenderingContext2D
    private readonly pieces: PieceMap

    constructor(readonly canvas: HTMLCanvasElement, readonly n: number) {
        this.ctx = canvas.getContext("2d")!
        this.pieces = new PieceMap(n)
    }

    draw() {
        this.drawBoard()
        this.drawPieces()
    }

    private drawBoard() {
        this.ctx.strokeStyle = variables.colors.board

        const cellSize = variables.sizes.cell
        const width = this.n * cellSize
        const height = this.n * cellSize

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
        for (let vx = 0; vx < this.n; vx++) {
            this.ctx.beginPath()
            this.ctx.moveTo(vx * cellSize, 0)
            this.ctx.lineTo(vx * cellSize, height)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        // Draw the horizontal lines along the y-axis
        for (let hy = 0; hy < this.n; hy++) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, hy * cellSize)
            this.ctx.lineTo(width, hy * cellSize)
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }

    private drawPieces() {
        const cellSize = variables.sizes.cell
        const pieceRadius = variables.sizes.pieceRadius

        this.ctx.fillStyle = variables.colors.pieces.default

        // Draw all the pieces on all spots
        for (let y = 0; y < this.n; y++) {
            for (let x = 0; x < this.n; x++) {
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
