const canvas: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing: boolean = false;
ctx.lineWidth = 0.4;
ctx.globalCompositeOperation = 'lighten';

class Root {

    x: number
    y: number;
    speedX: number;
    speedY:number;
    maxSize: number;
    size: number;
    vs: number;
    vax: number;
    vay: number;
    angleX: number;
    angleY: number;
    lightness: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 20; //MaxSize enhanced for the psychidelic draw style (5->20). Velocity of size increased by 10x to accomodate
        this.size = Math.random() * 1 + 2
        this.angleX = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.angleY = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.vs = Math.random() * 0.2 + 0.5 //velocity of size
        this.vax = Math.random() * 0.6 -0.3 //velocity of the x angle
        this.vay = Math.random() * 0.6 -0.3 //velocity of the y angle
        this.lightness = 10;
    }

    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if (this.lightness < 80) this.lightness += 0.25
        if (this.size < this.maxSize){
            ctx.fillStyle = '#FFF5DE'
            ctx.fillRect(this.x, this.y, this.size, this.size);
            requestAnimationFrame(this.update.bind(this));
        }
    }
}

window.addEventListener('mousemove', function(e:MouseEvent){
    if(drawing){
    const root = new Root(e.x, e.y);
        root.update();
    }
})
window.addEventListener('mousedown', function(){
    drawing = true;
})
window.addEventListener('mouseup', function(){
    drawing = false;
})