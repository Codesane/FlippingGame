
interface Colors {
    board: string,
    pieces: {
        default: "#ffffff",
        flipped: "#000000"
    }
}

interface Sizes {
    cell: 100,
    pieceRadius: 90,
    border: 2
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

export interface Region {
    topLeft: Cell
    topRight: Cell
}

export interface Piece {
    cell: Cell
    flipped: boolean
}
