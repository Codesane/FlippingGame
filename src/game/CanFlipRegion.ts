import { Cell, RectangularRegion } from "./types"

import PieceMap from "./PieceMap"

import * as Utils from "./utils"

export enum RuleBreaks {
    TopRightPieceMustNotBeFlipped = "TopRightPieceMustNotBeFlipped",
    WidthMustBeSquare             = "WidthMustBeSquare",
    HeightMustBeTriangular        = "HeightMustBeTriangular",
}

export interface ICanFlipRegion {
    check(): RuleBreaks[]
}

/**
 * These are the rules
 * 1. The top-right piece in the region must NOT be flipped.
 * 2. The region width must be perfectly square (1, 4, 9, 16, ...)
 * 3. The region height must be a triangular number (1, 3, 6, 10, ...)
 * */
export default class CanFlipRegion implements ICanFlipRegion {

    constructor(
        private readonly pieces: PieceMap,
        private readonly region: RectangularRegion
    ) {
    }

    check(): RuleBreaks[] {
        const brokenRules: RuleBreaks[] = []

        if (this.isTopRightPieceFlipped()) {
            brokenRules.push(RuleBreaks.TopRightPieceMustNotBeFlipped)
        }

        if (!this.isWidthPerfectSquare()) {
            brokenRules.push(RuleBreaks.WidthMustBeSquare)
        }

        if (!this.isHeightTriangular()) {
            brokenRules.push(RuleBreaks.HeightMustBeTriangular)
        }

        return brokenRules
    }

    private isTopRightPieceFlipped() {
        const topRightCell: Cell = {
            x: this.region.bottomRight.x,
            y: this.region.topLeft.y
        }

        return this.pieces.getPiece(topRightCell).flipped
    }

    private isWidthPerfectSquare() {
        let width = Utils.getRegionWidth(this.region)
        return width != 2 && Number.isInteger(Math.sqrt(width))
    }

    private isHeightTriangular() {
        const height = Utils.getRegionHeight(this.region)
        return Number.isInteger(Math.sqrt(8 * height + 1))
    }
}
