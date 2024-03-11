class Courthouse extends Building{
    constructor({position = {x:0, y:0}}){
        console.log(position)
        super(position, 10, 250, 2);//upgrade cost of 10, radius of 250, projectile speed of 2
        this.image = new Image()
        this.image.src = 'assets/images/courthouse.jpg'
        this.level = 1;
        this.facts = ['The Johnson County courthouse as seen today was finished in 1882 after a fire caused destruction to the previous in 1874', 
        'The courthouse is architecturally significant and admired for its unique pyramid structure and its symmetry.',
        'The courthouse was built by George W. Bunting and its inspiration from both Italian and classical design elements makes it one of the best looking courthouses in Indiana.']
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
