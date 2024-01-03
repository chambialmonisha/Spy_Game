let stage = 0; // Stage 0: Introduction, Stage 1: Hidden Objects
let knife, bloodstain, money;
let crimeSceneImage;
//'https://th.bing.com/th/id/R.d54cafeedaf8d85651fddaa310558093?rik=RaMCt6GHwZqUeQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-FTIRTNrN8nY%2fUgP0Yu8l3PI%2fAAAAAAAAD-0%2fAhHGcN_A3jk%2fs1600%2fCriminal-Case-Crime-Scene-Living-Room.jpg&ehk=dppbbZQpy1JbYbAMS5cyJFsZV4qkZCINdtKzRyKrNDM%3d&risl=&pid=ImgRaw&r=0'
function preload() {
    crimeSceneImage = loadImage(sc.jpg);
    knife = loadImage('knief.png');
    bloodstain = loadImage('blood-strain.png');
    money = loadImage('money.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    document.getElementById('start-button').addEventListener('click', startGame);
    
    knifeSprite = createSprite(50, 400);
    knifeSprite.addImage(knife);
    knifeSprite.scale=0.01
    
    bloodstainSprite = createSprite(400, 500);
    bloodstainSprite.addImage(bloodstain);
    bloodstainSprite.scale=0.1
    
    moneySprite = createSprite(width / 2 + 50, height / 2);
    moneySprite.addImage(money);
    moneySprite.scale=0.1
}

function draw() {
    background(220);
    if (stage === 0) {
        // Stage 0: Introduction
        fill(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Welcome Spy! You are at the scene of the crime.", width / 2, height / 2 - 40);
        text("Click 'Start' to investigate the crime scene.", width / 2, height / 2 + 40);
    } else if (stage === 1) {
        // Stage 1: Hidden Objects
        document.getElementById('image-container').style.display = 'cover'; // Show the image
        image(crimeSceneImage, 0, 0, width, height,);
        
        // Check if the user has clicked on all three objects
        checkObjectsFound();
        drawSprites();
        
    }
}

function startGame() {
    stage = 1; // Move to the hidden object stage
    redraw();
}

function checkObjectsFound() {
    if (mouseIsPressed) {
        if (knifeSprite.overlapPixel(mouseX, mouseY)) {
            // User found the knife
            fill(0);
            textSize(24);
            textAlign(CENTER, CENTER);
            text("You found the knife!", width / 2, height - 50);
        } else if (bloodstainSprite.overlapPixel(mouseX, mouseY)) {
            // User found the bloodstain
            fill(0);
            textSize(24);
            textAlign(CENTER, CENTER);
            text("You found the bloodstain!", width / 2, height - 50);
        } else if (moneySprite.overlapPixel(mouseX, mouseY)) {
            // User found the money
            fill(0);
            textSize(24);
            textAlign(CENTER, CENTER);
            text("You found the money!", width / 2, height - 50);
        }
    }
}
