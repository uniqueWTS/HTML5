var CanvasUtil = {
	getContext: getContext,
	drawRect: drawRect,
	drawArc: drawArc,
	drawLine: drawLine,
	drawImage: drawImage,
	drawText: drawText,
	drawLinerGradientRect: drawLinerGradientRect,
	drawRadialGradientRect: drawRadialGradientRect
}

function getContext(canvasId) {
	return document.getElementById(canvasId).getContext('2d');
}

/* fillStyle默认值是#000或黑色 */
function drawRect(canvasId, x, y, length, width, fillStyle) {
	var ctx = getContext(canvasId);
	ctx.fillStyle = typeof fillStyle == "undefined" ? "#000" : fillStyle;
	ctx.fillRect(x, y, length, width);
}

function drawArc(canvasId, x, y, d, begin, end) {
	var ctx = getContext(canvasId);
	ctx.beginPath();
	ctx.arc(x,y,d,begin,end);
	ctx.stroke();
}

function drawLine(canvasId, x1, y1, x2, y2) {
	var ctx = getContext(canvasId);
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function drawText(canvasId, text, x, y, font, fillStyle) {
	var ctx = getContext(canvasId);
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	ctx.fillText(text, x, y);
}

function drawImage(canvasId, imageId, x, y) {
	var ctx = getContext(canvasId);
	var img = document.getElementById(imageId);
	img.onload = function () {
		ctx.drawImage(img, x, y);
	}
}

function addColorStop(gradient, color1, color2) {
	gradient.addColorStop(0, color1);
	gradient.addColorStop(1, color2);
	return gradient;
}


/*LeftToRightGradient*/
function drawLinerGradientRect(canvasId, x1, y1, color1, x2, y2, color2) {
	var ctx = getContext(canvasId);
	var grd = ctx.createLinearGradient(x1,y1,x2,y2);
	addColorStop(grd,color1,color2);
	ctx.fillStyle = grd;
	ctx.fillRect(x1,y1, x2-x1, y2-y1);
}

/* CenterRadialGradient */
function drawRadialGradientRect(canvasId, x1, y1, r1, color1, x2, y2, r2, color2) {
	var ctx = getContext(canvasId);
	var x = 0.5 * (x1+x2), y = 0.5 * (y1 + y2);
	var grd = ctx.createRadialGradient(x,y,r1,x,y,r2);
	addColorStop(grd, color1, color2);
	ctx.fillStyle = grd;
	ctx.fillRect(x1,y1,x2,y2);
}