class PlacementTile {
    constructor ({position = {x:0,y:0}}){
        this.position = position;
        this.size = 64;
        this.color = 'rgba(255,255,255,0.07)'
        this.occupied = false;
        this.building = null;
    }
    draw(){// creates the placement tiles on the screen
        canvasCtx.fillStyle = this.color
        canvasCtx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
    setBuilding(buildingObject){// sets the building that occupies the tiles
        this.building = buildingObject; 
    }
    update(mouse){
        this.draw();
         if(this.position.x < mouse.x && mouse.x < this.position.x + this.size && 
         this.position.y< mouse.y && mouse.y <this.position.y+this.size){// checks if mouse is on placement tiles
                this.color = 'rgba(255,255,255,0.25)'// light up if mouse is on tile
         }else{
                this.color = 'rgba(255,255,255,0.07)'// normal color if mouse is not on tile
         }
    }
}