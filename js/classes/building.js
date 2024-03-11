class Building {
    constructor(position, upgradeCost, radius, projectileSpeed){
        console.log(position)
        this.position = position;
        this.width = 128;
        this.height = 64;
        this.level = 1;
        this.center = {
            x:this.position.x+this.width/2,
            y:this.position.y+this.height/2
        }
        this.projectiles = [
        ]
        this.target;
        this.radius = radius;
        this.upgradeCost = upgradeCost;
        this.frames = 0;
        this.projectileSpeed = projectileSpeed;
    }

    getPosition(){
        // console.log(this.position)
        return this.position
    }

    displayFact(fact, displayContainer){
        displayContainer.textContent = fact;
    }

    upgrade(){
        this.level +=1;
    }

    drawLevel(xOffset){
        let levelText = document.createElement('p');
        let costText = document.createElement('p');
        console.log(levelText)
        levelText.textContent = 'level '+this.level;
        costText.textContent = 'upgrade cost: '+this.upgradeCost+' coins';
        levelText.style.position = 'absolute';
        costText.style.position = 'absolute';
        levelText.style.left = this.position.x+xOffset+'px';
        costText.style.left = this.position.x+xOffset+'px';
        levelText.style.top = this.position.y-60+'px';
        costText.style.top = this.position.y-35+'px';
        costText.style.backgroundColor = 'white';
        levelText.style.backgroundColor='white'
        costText.style.padding = '3px';
        levelText.style.padding='3px'
        costText.style.borderRadius = '2px';
        levelText.style.borderRadius='2px'
        document.body.append(costText);
        document.body.append(levelText);
    }

    update(){
        //every 100 frames, create projectile
        if(this.frames%(20) ===0&&
            this.target){
            this.projectiles.push(new Projectile({
                position:{
                    x:this.center.x,
                    y:this.center.y
                },
                enemy:this.target,
                speed: this.projectileSpeed
            }))
        }
        this.frames++
    }
}


