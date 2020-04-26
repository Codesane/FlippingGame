
interface Colors {
    board: {
        background: string
        selection: string
    },
    pieces: {
        default: string
        selected: string
        flipped: string
    }
}

interface Sizes {
    cell: number
    pieceDiameter: number
    border: number
}

export interface Config {
    colors: Colors
    sizes: Sizes
    canvas: HTMLCanvasElement
    n: number
}

export interface Cell {
    x: number
    y: number
}

export interface RectangularRegion {
    topLeft: Cell
    bottomRight: Cell
}

export interface Piece {
    cell: Cell
    flipped: boolean
}
