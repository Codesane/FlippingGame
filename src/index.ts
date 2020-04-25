
const variables = {
    colors: {
        board: "#08f26e"
    },
    sizes: {
        cell: 100,
        border: 2
    }
}

function drawBoard(ctx: CanvasRenderingContext2D, n: number) {
    ctx.strokeStyle = variables.colors.board

    const width = n * variables.sizes.cell
    const height = n * variables.sizes.cell

    // Draw the frame
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.stroke()

    const cellSize = variables.sizes.cell

    // Draw the vertical lines along the x-axis
    for (let vx = 0; vx < n; vx++) {
        ctx.beginPath()
        ctx.moveTo(vx * cellSize, 0)
        ctx.lineTo(vx * cellSize, height)
        ctx.closePath()
        ctx.stroke()
    }

    // Draw the horizontal lines along the y-axis
    for (let hy = 0; hy < n; hy++) {
        ctx.beginPath()
        ctx.moveTo(0, hy * cellSize)
        ctx.lineTo(width, hy * cellSize)
        ctx.closePath()
        ctx.stroke()
    }
}

function initGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")!

    drawBoard(ctx, 10)
}

window.onload = function() {
    initGame()
}


