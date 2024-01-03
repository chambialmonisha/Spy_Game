let stage = 0; // Stage 0: Introduction, Stage 1: Hidden Objects
let knifeSprite, bloodstainSprite, moneySprite;
let crimeSceneImage;
let score = 0;
let turns = 4; // Number of turns allowed

function preload() {
    crimeSceneImage = loadImage("scene.jpg");
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
    knifeSprite.scale = 0.01;
    knifeSprite.debug = true;

    bloodstainSprite = createSprite(400, 500);
    bloodstainSprite.addImage(bloodstain);
    bloodstainSprite.scale = 0.1;

    moneySprite = createSprite(width / 2 + 50, height / 2);
    moneySprite.addImage(money);
    moneySprite.scale = 0.1;
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
        image(crimeSceneImage, 0, 0, width, height);

        // Check if the user has clicked on all three objects
        checkObjectsFound();
        drawSprites();

        // Display score and turns
        fill(0);
        textSize(18);
        textAlign(LEFT, TOP);
        text(`Score: ${score}`, 10, 10);
        text(`Turns left: ${turns}`, 10, 30);

        // Display message if the score reaches a certain point
        if (score === 3) {
            fill(0, 255, 0); // Green color
            text("Awesome!", width / 2, height - 50);
        }

        // End the game if turns run out
        if (turns === 0) {
            endGame();
        }
    }
}

function startGame() {
    stage = 1; // Move to the hidden object stage
    redraw();

}




function mousePressed() {
    if (stage === 1) {
        displayMessage("");
        // Check if the mouse is over the bloodstainSprite
        if (bloodstainSprite.overlapPoint(mouseX, mouseY) && !bloodstainSprite.clicked) {
            // User found the bloodstain
            displayMessage("You found the bloodstain!");
            increaseScore();
            bloodstainSprite.clicked = true;
            bloodstainSprite.visible=false;
        }
    }
}
function increaseScore() {
    score++;
}
function mousePressed() {
    if (stage === 1) {
    displayMessage("");
        // Check if the mouse is over the bloodstainSprite
        if (knifeSprite.overlapPoint(mouseX, mouseY) && !knifeSprite.clicked) {
            // User found the bloodstain
            score=score+1;
            knifeSprite.clicked = true;
            knifeSprite.visible=false;
            displayMessage("You found the Knief!");
            
        }
    }
}
function checkObjectsFound() {
    if (mouseIsPressed) {
        if (knifeSprite.overlapPixel(mouseX, mouseY) && !knifeSprite.clicked) {
            // User found the knife
            displayMessage("You found the knife!");
            increaseScore();
            knifeSprite.clicked = true;
        } else if (bloodstainSprite.overlapPixel(mouseX, mouseY) && !bloodstainSprite.clicked) {
            // User found the bloodstain
            displayMessage("You found the bloodstain!");
            increaseScore();
            bloodstainSprite.clicked = true;
        } else if (moneySprite.overlapPixel(mouseX, mouseY) && !moneySprite.clicked) {
            // User found the money
            displayMessage("You found the money!");
            increaseScore();
            moneySprite.clicked = true;
        }
    }
}

function displayMessage(message) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(message, width / 2, height - 50);
}



function endGame() {
    fill(255, 0, 0); // Red color
    textSize(36);
    textAlign(CENTER, CENTER);
    text("End Game", width / 2, height / 2);
}
