// set up canvas/background
const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext ('2d')
canvas.width = 1280
canvas.height=768
let canvasStyle = window.getComputedStyle(canvas)
console.log('margin '+ canvasStyle.marginLeft)
const gameMap = new Image()
gameMap.src = '../assets/images/jo-co.png'
gameMap.onload = ()=>canvasCtx.drawImage(gameMap, 0,0)


let canPlaceBuilding = false;
let coins = 80;
let enemyNumber = 5;
let level = 0;
let hearts = 10;
const enemies = [];
const buildings = [];
const noMoneyDialog = document.querySelector('#no-money')
const factDialog = document.querySelector('#fact-display')
const healthDisplay = document.querySelector(".health")


let coinsDisplay = document.querySelector(".coins");
const startDialog = document.querySelector('#start-instructions-dialog');
const startInstructions = document.querySelector("#start-instructions") ;
const continueBtn = document.querySelector("#continue");
window.onload = ()=>{
    startDialog.showModal()
    coinsDisplay.textContent = "coins: "+coins
}

let startSlidesIndex = 1;
document.querySelector('#continue').addEventListener('click',()=>{
    if(startSlidesIndex ==1){
        startInstructions.textContent = "Only you can save our homes from destruction!"
    }else if(startSlidesIndex ==2){
        let btn = document.createElement('button');
        btn.textContent = "Add Building"
        btn.classList.add('demo-btn')
        startInstructions.textContent = 'Click "Add Building" to build towers to attack the zombies.'
        startInstructions.appendChild(btn)
    }else if(startSlidesIndex ==3){
        startInstructions.textContent = 'Place a building on the map by clicking on any highlighted tile.'}
    else if(startSlidesIndex ==4){
            let img = document.createElement('img');
            img.setAttribute('src','../assets/images/building-click.jpg')
            startInstructions.textContent = 'Click on a tile to upgrade its tower.'
            img.style.display = 'block'
            img.style.margin = 'auto'
            startInstructions.appendChild(img)
    }else if(startSlidesIndex == 5){
        let btn = document.createElement('button');
        btn.textContent = "Send Wave"
        btn.classList.add('demo-btn')
        startInstructions.textContent = 'Click send wave to send zombies.'
        startInstructions.appendChild(btn)
    }else if(startSlidesIndex ==6){
        startInstructions.textContent = 'Kill zombies to earn coins for the county!'
    }else if(startSlidesIndex ==7){
        startInstructions.textContent = 'Pass as many rounds as you can!'
        const startBtn = document.createElement('button')
        startBtn.classList.add('start')
        startBtn.textContent = "Start"
        console.log(startBtn)
        startBtn.addEventListener('click',()=>{
            startDialog.close()
        })
        startDialog.appendChild(startBtn)
        continueBtn.remove()
    }
console.log(startSlidesIndex)
    startSlidesIndex+=1;
})

//create a 2D array of placement tiles
const placementTilesData2D = [];
for(let i = 0; i<placementTilesData.length;i+=20){
    placementTilesData2D.push(placementTilesData.slice(i,i+20))
}

const mouse = {x:undefined, y:undefined}//mouse object
const placementTiles = []//array of tiles



//get cursor position on canvas
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    mouse.x = x
    mouse.y =y
}

//get cursor position on mousemove and store in mouse object
window.addEventListener('mousemove',(e)=>{
    getCursorPosition(canvas,e)
  
})





//check if building can be placed (not blocked by debris), if it can, create a placement tile object
placementTilesData2D.forEach((row, y) =>{
    row.forEach((space, x) =>{
        if(space === 31){
            placementTiles.push(new PlacementTile({position: {x:x*64, y:y*64}}))
        }
    })
})



//add enemies to enemies array based on enemy number
function spawnEnemies(){
    for(let i = 1; i<enemyNumber+1; i++){
        enemies.push(new Enemy({position: {x:waypoints[0].x-i*150,y:waypoints[0].y}}, level))// send position and game level
    }
    if(level<5){
        enemyNumber+=2;
    }else{
        enemyNumber+=3
    }
    
}







function animate(){
    const animationId = requestAnimationFrame(animate)// animation function, recursive function
    canvasCtx.drawImage(gameMap, 0,0)// draw game map
    

    //update color of placement tiles based on mouse position
    placementTiles.forEach((placementTile,i)=>{
        placementTile.update(mouse);
    })
    //update enemies, check if enemy left screen, decrease health, check if health = 0
    for(let i = 0; i<enemies.length;i++){
        enemies[i].update();
        if(enemies[i].position.x>canvas.width){
            enemies.splice(i,1)
            hearts--;
            
            //check if the user lost all health
            if(hearts ===0){
                cancelAnimationFrame(animationId)
                document.querySelector('#game-over').showModal()
            }
        }
    }
 

//update buildings and projectiles
    buildings.forEach((building)=>{
        
        building.update()
        building.target = null;

        //check if enemy is within radius, store all enemies within range in validEnemies array
        const validEnemies = enemies.filter((enemy)=>{
            let xDiff = enemy.center.x-building.center.x
            let yDiff = enemy.center.y-building.center.y
            const distance= Math.hypot(xDiff, yDiff);
            return distance<enemy.radius + building.radius
        })
        building.target = validEnemies[0]
       

        //update projectiles
   for(let i = 0; i<building.projectiles.length;i++){


    
        building.projectiles[i].update()
        //takes x different and y difference
      let xDiff =  building.projectiles[i].enemy.center.x-building.projectiles[i].position.x
      let yDiff =  building.projectiles[i].enemy.center.y-building.projectiles[i].position.y
      const distance= Math.hypot(xDiff, yDiff);
       
       if(distance <=  building.projectiles[i].enemy.radius +  building.projectiles[i].radius+5){  //check if projectile hit enemy
       
        
           if(building.projectiles[i].enemy){
               building.projectiles[i].enemy.health -=10;
                      if( building.projectiles[i].enemy.health<=0){
                           const enemyIndex = enemies.findIndex((enemy)=>{
                               return  building.projectiles[i].enemy===enemy
                           })
                          
                            if (enemyIndex>-1){
                               enemies.splice(enemyIndex,1)
                               coins +=5;
                            } 
                           
                           coinsDisplay.textContent = "coins: "+coins
                       }
           }
   building.projectiles.splice(i,1)
   
    }
     
    }



    })
    healthDisplay.textContent = 'health: '+ hearts;

}

    

animate()











const sendWaveButton = document.querySelector('#send-wave');
sendWaveButton.addEventListener('click',()=>{// when send wave button clicked, spawn enemies
    spawnEnemies()
    level++;
    document.querySelector('.level').textContent = "wave: "+level;
})

const addBuildingButton = document.querySelector('#add-building');
addBuildingButton.addEventListener('click',()=>{//when add building button clicked, show dialog with buidling options
    document.querySelector('#choose-building').showModal()
})




//when button with a building option clicked, store the selected building
const buildingButtons = document.querySelectorAll('.building-button')
let selectedBuilding = ''
for(let i = 0; i<buildingButtons.length;i++){
    buildingButtons[i].addEventListener('click',()=>{
        if(buildingButtons[i].dataset.cost<=coins){
            selectedBuilding = buildingButtons[i].id
            canPlaceBuilding = true;
            coins -=buildingButtons[i].dataset.cost
            coinsDisplay.textContent = "coins: "+coins
        }else{
            noMoneyDialog.showModal()
            canPlaceBuilding = false
        }
        document.querySelector("#choose-building").close();
    })
}



// check what tile the user is hovering over
let activeTile = undefined;
window.addEventListener('mousemove',(e)=>{
    getCursorPosition(canvas,e)
    for(let i = 0; i<placementTiles.length; i++){
        const tile = placementTiles[i]
        if(tile.position.x < mouse.x && mouse.x < tile.position.x + tile.size && 
            tile.position.y< mouse.y && mouse.y <tile.position.y+tile.size){
                activeTile = tile;
                break
            }
  
    }
    
})



// when tile clicked, add or upgrade building
canvas.addEventListener('click',(e)=>{
    
    if(!activeTile.occupied){
      if(canPlaceBuilding){
        activeTile.occupied = true
        canPlaceBuilding = false
        let newBuilding;
        console.log('selected Building'+ selectedBuilding)
        if(selectedBuilding =='franklin-college'){
             newBuilding = new franklinCollege({
                position:{
                    x:activeTile.position.x,
                    y:activeTile.position.y
                }
            })
            
        }else if(selectedBuilding =='furnas-bridge'){
            newBuilding = new FurnasMillBridge({
                position:{
                    x:activeTile.position.x,
                    y:activeTile.position.y
                }
            })
        }else if(selectedBuilding=='courthouse'){
            newBuilding = new Courthouse({
                position:{
                    x:activeTile.position.x,
                    y:activeTile.position.y
                }
            })
        }else if(selectedBuilding =='herriot-house'){
            newBuilding = new HerriotHouse({
                position:{
                    x:activeTile.position.x,
                    y:activeTile.position.y
                }
            })
        }else if (selectedBuilding=='heck-hasler-house'){
            newBuilding = new HeckHaslerHouse({
                position:{
                    x:activeTile.position.x,
                    y:activeTile.position.y
                }
            })
        }
        buildings.push(newBuilding)
        activeTile.setBuilding(newBuilding)
        newBuilding.displayFact(factDialog)
        factDialog.showModal()
     }
    }

    else{
    //         //if there's a building on the tile, upgrade the building
           
           if(activeTile.building.upgradeCost<=coins){
            coins-=activeTile.building.upgradeCost;
            coinsDisplay.textContent = "coins: "+coins
            activeTile.building.upgrade();
            activeTile.building.displayFact(factDialog);
            factDialog.showModal()
           }else{
            noMoneyDialog.showModal()
           }
   }
   console.log(canvas.offsetWidth)
   if(canvas.offsetWidth<=window.innerWidth){
    activeTile.building.drawLevel(parseInt(canvasStyle.marginLeft))
   }else{
    console.log('nope')
    activeTile.building.drawLevel(0-(canvas.offsetWidth/2-window.innerWidth/2))
   }
   
})




factDialog.addEventListener('click',()=>{
    factDialog.close();
})

noMoneyDialog.addEventListener('click',()=>{
    noMoneyDialog.close();
})



document.querySelector('#restart').addEventListener('click',()=>{
    location.reload()
}
)