class HeckHaslerHouse extends Building{
    constructor({position = {x:0, y:0}}){
        super(position, 10, 250, 7);//upgrade cost of 10, radius of 250, projectile speed of 2
        this.image = new Image()
        this.image.src = '../../assets/images/heck-hasler.jpg'
        this.level = 1;
        this.facts = ['This farmhouse is important to Johnson County because it has easy water access, making it important for farming!', 
        'The Heck-Hasler house is important because it was very close to the Indianapolic-Madison railroad, the most important railroad in Indiana at the time.',
        'The Heck-Hasler House was built in 1868.',
    ]
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