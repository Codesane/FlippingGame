import { Cell, RectangularRegion } from "./types"

export function isInsideRegion(cell: Cell, region: RectangularRegion) {
    const isWithinHorizontalBounds = cell.x >= region.topLeft.x && cell.x <= region.bottomRight.x
    const isWithinVerticalBounds = cell.y >= region.topLeft.y && cell.y <= region.bottomRight.y

    return isWithinHorizontalBounds && isWithinVerticalBounds
}

export function getRegionBetweenCells(first: Cell, second: Cell): RectangularRegion {
    return {
        topLeft: {
            x: Math.min(first.x, second.x),
            y: Math.min(first.y, second.y)
        },
        bottomRight: {
            x: Math.max(first.x, second.x),
            y: Math.max(first.y, second.y)
        }
    }
}

export function cellAtCoordinates(cellSize: number, x: number, y: number): Cell {
    return {
        x: Math.floor(x / cellSize),
        y: Math.floor(y / cellSize)
    }
}

export function getRegionWidth(region: RectangularRegion): number {
    return region.bottomRight.x - region.topLeft.x + 1
}

export function getRegionHeight(region: RectangularRegion): number {
    return region.bottomRight.y - region.topLeft.y + 1
}
