import { Box } from './Box.js';

export class BoxNormalized extends Box {
    draw(ctx) {
        const x1 = this.x1 * ctx.canvas.width;
        const y1 = this.y1 * ctx.canvas.height;
        const x2 = this.x2 * ctx.canvas.width;
        const y2 = this.y2 * ctx.canvas.height;
        ctx.fillStyle = this.color;
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    }
}