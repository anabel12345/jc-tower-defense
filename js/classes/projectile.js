class Projectile {
    constructor({position={x:0, y:0}, enemy, speed}){
        this.position = position;
        this.velocity = {
            x:10,y:10
        }
        this.enemy = enemy
        this.radius = 10
        this.speed=speed;
    }
    draw(){
        canvasCtx.beginPath()
        canvasCtx.fillStyle = 'red'
        canvasCtx.arc(this.position.x, this.position.y, this.radius, 0,2*Math.PI )
     
        canvasCtx.fill()
    }

    update(){
        this.draw()
        const angle = Math.atan2(this.enemy.center.y-this.position.y, this.enemy.center.x - this.position.x)
        this.velocity.x = Math.cos(angle)*this.speed
        this.velocity.y = Math.sin(angle)*this.speed

        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
    }
}