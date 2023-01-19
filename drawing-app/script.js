const canvas = document.querySelector("#canvas");
const increase = document.querySelector("#increase");
const decrease = document.querySelector("#decrease");
const fontSize = document.querySelector("#size");
const colorEl = document.querySelector("#color");
const clear = document.querySelector("#clear");

const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

let size = 10;
fontSize.innerHTML = size;
colorEl.value = "#555287";
let color = colorEl.value;
let x;
let y;
let isDrawing = false;

// event listeners:

canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;

	x = e.offsetX;
	y = e.offsetY;

	drawCircle(x, y);
});

canvas.addEventListener("mousemove", (e) => {
	if (isDrawing) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;

		drawCircle(x2, y2);
		drawLine(ctx, x, y, x2, y2);
		x = x2;
		y = y2;
	}
});

canvas.addEventListener("mouseup", (e) => {
	if (isDrawing) {
		// drawLine(ctx, x, y, e.offsetX, e.offsetY);
		x = 0;
		y = 0;
		isDrawing = false;
	}
});

// helper functions:

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(ctx, x, y, x2, y2) {
	ctx.strokeStyle = color;
	ctx.lineWidth = size * 2;
	ctx.lineCap = "round";

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

function updateSizeInput() {
	fontSize.innerText = size;
}

// increase lineWidth:

increase.addEventListener("click", () => {
	size += 5;

	if (size >= 60) {
		size = 60;
	}
	updateSizeInput();
});

// decrease lineWidth:

decrease.addEventListener("click", () => {
	size -= 5;

	if (size <= 5) {
		size = 5;
	}
	updateSizeInput();
});

// reset the canvas:

clear.addEventListener("click", () => {
	ctx.reset();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	size = 10;
	updateSizeInput();
	color = "#555287";
	colorEl.value = "#555287";
});

//set the color:

colorEl.addEventListener("change", (e) => {
	color = e.target.value;
});
