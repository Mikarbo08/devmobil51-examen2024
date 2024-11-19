import { Box } from '../class/Box.js';
import { BoxNormalized } from '../class/BoxNormalized.js';
import { CircleNormalized } from '../class/CircleNormalized.js';

const canvas = document.getElementById('adminCanvas');
const ctx = canvas.getContext('2d');

let boxes = [];
let circles = [];
let currentBox = null;

const ws = new WebSocket('ws://localhost:8887');

ws.onmessage = (event) => {
    const { x, y } = JSON.parse(event.data);
    const circle = new CircleNormalized({ x, y, r: 15, color: 'rgba(0, 255, 0, 0.5)' });
    circles.push(circle);
    draw();
};

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentBox = new Box(x, y, x, y, 'rgba(0, 0, 255, 0.5)');
});

canvas.addEventListener('mousemove', (e) => {
    if (currentBox) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentBox.x2 = x;
        currentBox.y2 = y;
        draw();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (currentBox) {
        currentBox.color = 'rgba(0, 0, 255, 1)';
        boxes.push(currentBox);
        currentBox = null;
        draw();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentBox) {
        currentBox = null;
        draw();
    } else if (e.key === 'H') {
        // Clear heatmap
        circles = [];
        draw();
    } else if (e.key === 'D') {
        // Clear boxes and heatmap
        boxes = [];
        circles = [];
        draw();
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(box => box.draw(ctx));
    circles.forEach(circle => circle.draw(ctx));
    if (currentBox) {
        currentBox.draw(ctx);
    }
}