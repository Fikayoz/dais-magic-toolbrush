const canvas: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Root {

    x: number
    y: number;
    speedX: number;
    speedY:number;
    maxSize: number;
    size: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += 0.1;
        if (this.size < this.maxSize){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%, 50%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update);
        }
    }
}

window.addEventListener('mousemove', function(e:MouseEvent){
    const root = new Root(e.x, e.y);
    root.update();
})