const canvas: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing: boolean = false;

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
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2
        this.angleX = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.angleY = Math.random() * 6.2; //360 degrees is APPROXIMATELY 6.2 radians
        this.vs = Math.random() * 0.2 + 0.05 //velocity of size
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
        if (this.lightness < 95) this.lightness += 0.50
        if (this.size < this.maxSize){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%,' + this.lightness + '%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        }
        else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }
    }
}

class Flower {

    x:number;
    y:number;
    size:number;
    maxFlowerSize:number;
    image: HTMLImageElement;
    frameSize:number;
    frameX:number;
    frameY: number;
    angle:number;
    va: number;

    constructor(x:number, y:number, size:number){
        this.x = x;
        this.y = y;
        this.size = size;
        this.maxFlowerSize = this.size + Math.random() * 50;
        this.image = new Image();
        this.image.src = 'flowers.png';
        this.frameSize = 100;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.angle = 0;
        this.va = Math.random() * 0.05 - 0.025 ; //va = velocity of angle
    }

    grow(){
        if(this.size < this.maxFlowerSize){
            this.size += 0.3;
            this.angle += this.va;


            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, (this.frameX * this.frameSize), (this.frameY * this.frameSize), this.frameSize, this.frameSize, (0 - this.size/2), (0 - this.size/2), this.size, this.size)
            ctx.restore();

            requestAnimationFrame(this.grow.bind(this));
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