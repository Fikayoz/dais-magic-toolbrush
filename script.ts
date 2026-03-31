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
    vs: number;
    vax: number;
    vay: number;
    angleX: number;
    angleY: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2
        this.angleX = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.angleY = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.vs = Math.random() * 0.2 + 0.05 //velocity of size
        this.vax = Math.random() //velocity of the x angle
        this.vay = Math.random() //velocity of the y angle
    }

    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if (this.size < this.maxSize){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%, 50%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        }
    }
}

let throttle: number = 0;

window.addEventListener('mousemove', function(e:MouseEvent){
    const root = new Root(e.x, e.y);
    throttle += 1;
    if(throttle >= 7){
        root.update();
        throttle = 0;
    }
    
})