class franklinCollege extends Building{
    constructor({position = {x:0, y:0}}){
        console.log(position)
        super(position, 10, 250, 3);//upgrade cost of 10, radius of 250, projectile speed of 2
        this.image = new Image()
        this.image.src = 'assets/images/franklin-college.jpg'
        this.level = 1;
        this.facts = ['Franklin College was originally known as the Indiana Baptist Labor Institute. The name was changed to Franklin College in 1844.', 
        'Franklin college only serverd 40 students at its start, offering mostly arts degrees. Now, it serves around 1000 students!',
        'Franklin College has Gothic-Victorian architecture.']
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
