import { Cell, RectangularRegion } from "./types"

import PieceMap from "./PieceMap"

import * as Utils from "./utils"

export enum RuleBreaks {
    TopRightPieceMustNotBeFlipped = "TopRightPieceMustNotBeFlipped",
    WidthMustBeSquare = "WidthMustBeSquare",
    HeightMustBeTriangular = "HeightMustBeTriangular",
}

export interface ICanFlipRegion {
    check(pieces: PieceMap, region: RectangularRegion): RuleBreaks[]
}

/**
 * These are the rules
 * 1. The top-right piece in the region must NOT be flipped.
 * 2. The region width must be perfectly square (1, 4, 9, 16, ...)
 * 3. The region height must be a triangular number (1, 3, 6, 10, ...)
 * */
export default class CanFlipRegion implements ICanFlipRegion {
    check(pieces: PieceMap, region: RectangularRegion): RuleBreaks[] {
        const brokenRules: RuleBreaks[] = []

        if (CanFlipRegion.isTopRightPieceFlipped(pieces, region)) {
            brokenRules.push(RuleBreaks.TopRightPieceMustNotBeFlipped)
        }

        if (!CanFlipRegion.isWidthPerfectSquare(region)) {
            brokenRules.push(RuleBreaks.WidthMustBeSquare)
        }

        if (!CanFlipRegion.isHeightTriangular(region)) {
            brokenRules.push(RuleBreaks.HeightMustBeTriangular)
        }

        return brokenRules
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
