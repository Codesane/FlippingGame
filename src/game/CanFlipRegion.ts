import { Cell, RectangularRegion } from "./types"

import PieceMap from "./PieceMap"

import * as Utils from "./utils"

export enum CanFlipRegionResult {
    Yes_CanFlip = "Yes_CanFlip",
    No_TopRightPieceMustNotBeFlipped = "No_TopRightPieceMustNotBeFlipped",
    No_WidthMustBeSquare = "No_WidthMustBeSquare",
    No_HeightMustBeTriangular = "No_HeightMustBeTriangular",
}

export interface ICanFlipRegion {
    canFlipRegion(pieces: PieceMap, region: RectangularRegion): CanFlipRegionResult
}

/**
 * These are the rules
 * 1. The top-right piece in the region must NOT be flipped.
 * 2. The region width must be square (1, 4, 9, 16, ...)
 * 3. The region height must be a triangular number (1, 3, 6, 10, ...)
 * */
export default class CanFlipRegion implements ICanFlipRegion {
    canFlipRegion(pieces: PieceMap, region: RectangularRegion): CanFlipRegionResult {
        if (CanFlipRegion.isTopRightPieceFlipped(pieces, region)) {
            return CanFlipRegionResult.No_TopRightPieceMustNotBeFlipped
        }

        if (!CanFlipRegion.isWidthPerfectSquare(region)) {
            return CanFlipRegionResult.No_WidthMustBeSquare
        }

        if (!CanFlipRegion.isHeightTriangular(region)) {
            return CanFlipRegionResult.No_HeightMustBeTriangular
        }

        return CanFlipRegionResult.Yes_CanFlip
    }

    private static isTopRightPieceFlipped(pieces: PieceMap, region: RectangularRegion) {
        const topRightCell: Cell = {
            x: region.bottomRight.x,
            y: region.topLeft.y
        }

        return pieces.getPiece(topRightCell).flipped
    }

    private static isWidthPerfectSquare(region: RectangularRegion) {
        return Utils.getRegionWidth(region) != 2 && Number.isInteger(Math.sqrt(Utils.getRegionWidth(region)))
    }

    private static isHeightTriangular(region: RectangularRegion) {
        const height = Utils.getRegionHeight(region)

        return Number.isInteger(Math.sqrt(8 * height + 1))
    }
}
