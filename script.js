"use strict";
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawing = false;
class Root {
    x;
    y;
    speedX;
    speedY;
    maxSize;
    size;
    vs;
    vax;
    vay;
    angleX;
    angleY;
    lightness;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.angleX = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.angleY = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.vs = Math.random() * 0.2 + 0.05; //velocity of size
        this.vax = Math.random() * 0.6 - 0.3; //velocity of the x angle
        this.vay = Math.random() * 0.6 - 0.3; //velocity of the y angle
        this.lightness = 40;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if (this.lightness < 95)
            this.lightness += 0.75;
        if (this.size < this.maxSize) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%,' + this.lightness + '%)';
            // ctx.fillStyle = 'hsl(140, 100%, 50%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        }
    }
}
window.addEventListener('mousemove', function (e) {
    if (drawing) {
        const root = new Root(e.x, e.y);
        root.update();
    }
});
window.addEventListener('mousedown', function () {
    drawing = true;
});
window.addEventListener('mouseup', function () {
    drawing = false;
});
