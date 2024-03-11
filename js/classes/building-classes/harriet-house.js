class HerriotHouse extends Building{
    constructor({position = {x:0, y:0}}){
        super(position, 10, 250, 2);//upgrade cost of 10, radius of 250, projectile speed of 2
        this.image = new Image()
        this.image.src = '../../assets/images/herriot.jpg'
        this.level = 1;
        this.facts = ['The Herriot House, is also known as the Brown-Ritchey House.', 
        'The Herriot House is located in Franklin, Indiana.',
        'The original owner, Samuel Herriot, came to Franklin in in 1820 and helped establish the town. His brother, John Herriot, joined him in 1827 and became county treasurer',
        'The Herriot House was built in the 1860s.',
        'Certain parts of the Herriot House have been upgraded, but most of it remains the same as it was in the 1860s.']
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