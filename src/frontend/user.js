import { CircleNormalized } from '../class/CircleNormalized.js';

const canvas = document.getElementById('userCanvas');
const ctx = canvas.getContext('2d');
const ws = new WebSocket('ws://localhost:8887');

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    ws.send(JSON.stringify({ x, y }));
});

ws.onmessage = (event) => {
    const { x, y } = JSON.parse(event.data);
    const denormalizedX = x * canvas.width;
    const denormalizedY = y * canvas.height;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(denormalizedX, denormalizedY, 5, 0, 2 * Math.PI);
    ctx.fill();
};