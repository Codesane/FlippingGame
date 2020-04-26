import PieceMap from "./PieceMap"

import { RectangularRegion } from "./types"

import CanFlipRegion, { RuleBreaks } from "./CanFlipRegion"

const makeRegion = (x: number, y: number, width: number, height: number): RectangularRegion => ({
    topLeft: {
        x,
        y
    },
    bottomRight: {
        x: x + width - 1,
        y: y + height - 1
    }
})

describe("CanFlipRegion", () => {

    describe("when checking if a region is flippable", () => {
        let pieces: PieceMap

        beforeEach(() => {
            pieces = new PieceMap(5)
        })

        describe("and the region is 1x1", () => {
            let region: RectangularRegion
            beforeEach(() => {
                region = makeRegion(0, 0, 1, 1)
            })

            it("should return Yes_CanFlip when the piece is not flipped", () => {
                expect(new CanFlipRegion(pieces, region).check()).toHaveLength(0)
            })

            it("should return No_TopRightPieceMustNotBeFlipped when piece is flipped", () => {
                pieces.flipPiece({ x: 0, y: 0 })

                expect(new CanFlipRegion(pieces, region).check()).toContain(RuleBreaks.TopRightPieceMustNotBeFlipped)
            })
        })

        describe("and the region is valid", () => {
            let region: RectangularRegion
            beforeEach(() => {
                region = makeRegion(0, 0, 4, 3)
            })

            it("should return Yes_CanFlip when the top-right piece is not flipped", () => {
                expect(new CanFlipRegion(pieces, region).check()).toHaveLength(0)
            })

            it("should return No_TopRightPieceMustNotBeFlipped when the top-right piece is flipped", () => {
                pieces.flipPiece({ x: 3, y: 0 })

                expect(new CanFlipRegion(pieces, region).check()).toContain(RuleBreaks.TopRightPieceMustNotBeFlipped)
            })
        })

        describe("and the region width is not a perfect square", () => {

            it("should return No_WidthMustBeSquare v1", () => {
                const region = makeRegion(0, 0, 2, 1)
                expect(new CanFlipRegion(pieces, region).check()).toContain(RuleBreaks.WidthMustBeSquare)
            })

            it("should return No_WidthMustBeSquare v2", () => {
                const region = makeRegion(0, 0, 5, 1)
                expect(new CanFlipRegion(pieces, region).check()).toContain(RuleBreaks.WidthMustBeSquare)
            })
        })

        describe("and the region height is not triangular", () => {
            let region: RectangularRegion
            beforeEach(() => {
                region = makeRegion(0, 0, 4, 2)
            })

            it("should return No_HeightMustBeTriangular", () => {
                expect(new CanFlipRegion(pieces, region).check()).toContain(RuleBreaks.HeightMustBeTriangular)
            })
        })
    })
})
