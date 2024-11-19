import { Circle } from './Circle.js';

export class CircleNormalized extends Circle {
    draw(ctx) {
        const x = this.x * ctx.canvas.width;
        const y = this.y * ctx.canvas.height;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}