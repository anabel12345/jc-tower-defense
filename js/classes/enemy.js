class Enemy {

    constructor ({position = {x:0,y:0}},level) {
        this.position = position
        this.width = 100
        this.height = 100
        this.radius = 40
        this.waypointIndex = 0;
        this.center = {
            x:this.position.x+this.width/2,
            y:this.position.y+this.height/2
       }
       this.image = new Image()
       this.image.src = 'assets/images/orc.png'
       this.velocity = 2+(0.4*level);
       this.health = 100;
       this.frames = 0;//total number of frames that has passed
       this.orc = 0;//which orc is shown
    }


    drawEnemy(){
    //represents where we want to crop on the sprite
    
    const cropWidth = this.image.width/7;
    const crop = {
        position:{
            x:cropWidth * this.orc,
            y:0
        },
        width:cropWidth,
        height:this.image.height
    }

     canvasCtx.drawImage(this.image, crop.position.x, crop.position.y, crop.width, crop.height,this.position.x, this.position.y,crop.width, crop.height)


    this.frames++;
    if(this.frames%3===0){
        this.orc+=1;
    }
    if(this.orc>=6){
        this.orc =0;
    }
     

     //health bar
     canvasCtx.fillStyle = 'red'
     canvasCtx.fillRect(this.position.x-20, this.position.y-35, this.width, 10)
    
    //green ehalth bar
     canvasCtx.fillStyle = 'green'
     canvasCtx.fillRect(this.position.x-20, this.position.y-35, this.width*(this.health/100), 10)
    
    }
    update(){
        this.drawEnemy()
        

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
      
        const angle = Math.atan2(yDistance, xDistance) // get angle
    

        this.position.x+=Math.cos(angle)*this.velocity;
        this.position.y+=Math.sin(angle)*this.velocity;
        this.center = {
            x:this.position.x+this.radius/2,
            y:this.position.y+this.radius/2
       }
        if(Math.abs(Math.round(this.center.x) - Math.round(waypoint.x))<=Math.abs(this.velocity) && 
        Math.abs(Math.round(this.center.y) -Math.round(waypoint.y))<=Math.abs(this.velocity)&& 
        (this.waypointIndex < waypoints.length - 1)) {
            this.waypointIndex++
        }
    }
    

}
