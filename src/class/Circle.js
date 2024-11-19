export class Circle {
  constructor({ x, y, r, color }) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
  }

  draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
  }
}