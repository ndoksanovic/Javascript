function Particle(x, y, xSpeed, ySpeed, size, color)
{
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.color = color;
    this.age = 0;
    
    this.drawParticle = function()
    {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }
    
    this.updateParticle = function()
    {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.age++;
    }
}

function Emitter(x, y, xSpeed, ySpeed, size, color)
{
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.color = color;
    
    this.startParticles = 0;
    this.lifetime = 0;
    
    this.particles = [];
    
    this.addParticle = function()
    {
        var p = new Particle(random(this.x - 10, this.x + 10),
                             random(this.y -10, this.y + 10),
                             random(this.xSpeed - 1, this.xSpeed + 1),
                             random(this.ySpeed - 1, this.ySpeed + 1),
                             random(this.size - 4, this.size +4),
                             this.color);
        return p;
    }
    
    this.startEmitter = function(startParticles, lifetime)
    {
        this.startParticles = startParticles;
        this.lifetime = lifetime;
        
        //start emitter with initial particles
        for(var i =0; i < startParticles; i++)
        {

            this.particles.push(this.addParticle());
        }  
    }
    
    this.updateParticles = function()
    {
        //iterate through particles and draw to the screen
        
        var deadParticles = 0;
        
        for(var i = this.particles.length - 1; i >= 0; i--)
        {
            this.particles[i].drawParticle();
            this.particles[i].updateParticle();
            if(this.particles[i].age > random(0,this.lifetime))
            {
                this.particles.splice(i, 1);
                deadParticles++;
            }
        }
        
        if(deadParticles > 0)
        {
            for(var i = 0; i < deadParticles; i++)
            {
                this.particles.push(this.addParticle());
            }
        }
    }
}

var emit;

function setup()
{
	createCanvas(800, 600);
    emit = new Emitter(width/2, height-200, 0, -1, random(5,20), color(random(0,255),random(0,255),random(0,255),100));
    emit.startEmitter(400, 300);
}

function draw()
{
    background(10);
    emit.updateParticles();

}