console.lor('Starting draw.js');

// From the MDN Docs
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#making_combinations
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

function drawStartButton(x, y, recWidth, recHeight) {
    const xPos = (width / 2) - (recWidth / 2);
    // const yPos = (y / 2) - (recHeight / 2);
    
    // Draws the outer frame of the button
    roundedRect(ctx, midX, percentY * 70, 220, 60, 20);

    // Need to have the text centered inside the rectangle, so we need to find
    // the width of the text and base the position on that
    const startText = 'Start';
    const textWidth = ctx.measureText(startText);
    console.log(textWidth)
}