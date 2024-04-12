class FurnasMillBridge extends Building{
    constructor({position = {x:0, y:0}}){
        super(position, 10, 250, 2);//upgrade cost of 10, radius of 250, projectile speed of 2
        this.image = new Image()
        this.image.src = 'assets/images/furnas_mill_bridge.jpg'
        this.level = 1;
        this.facts = ['The Furnas Mill Bridge was built in 1880', 
        'The Furnas Mill Bridge was built by the King Bridge Company of Cleveland, Ohio',
        'The Furnas Mill Bridge is located in the Atterbury Fish and Wildlife area']
    }

    upgrade(){
        super.upgrade()
        this.projectileSpeed +=1;
        this.upgradeCost+=10;
    }

    displayFact(displayContainer){
        let ranNum = Math.floor(Math.random()*this.facts.length)
        super.displayFact(this.facts[ranNum], displayContainer)
      
    
    }

    draw(){
        // console.log(super.getPosition().x)
       
        canvasCtx.drawImage(this.image, super.getPosition().x, super.getPosition().y)
    }

    update(){
        this.draw()
        super.update()
    }
}
