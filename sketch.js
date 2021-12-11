var floresta, clique;
var cenário, cenárioImg;
var animação, animaçãoImg, resetar, resetarImg;
var gato, gatoDeitado, gatoAndando, gatoSentado;
var rato, ratoParado, ratoProvocando, ratoOlhando;

function preload(){

  animaçãoImg = loadImage("Imagens/animação.png");
  cenárioImg = loadImage("Imagens/cenário.jpeg");
  resetarImg = loadImage("Imagens/resetar.png");

  gatoAndando = loadAnimation("Imagens/gatoAndando1.png", "Imagens/gatoAndando2.png");
  gatoDeitado = loadImage("Imagens/gatoDeitado.png");
  gatoSentado = loadImage("Imagens/gatoSentado.png");

  ratoProvocando = loadAnimation("Imagens/ratoProvocando1.png", "Imagens/ratoProvocando2.png");
  ratoOlhando = loadImage("Imagens/ratoOlhando.png");
  ratoParado = loadImage("Imagens/ratoParado.png");

  floresta = loadSound("Sons/floresta.mp3");
  clique = loadSound("Sons/clique.mp3");
}

function setup(){

  createCanvas(windowWidth, windowHeight);

  cenário = createSprite(width/2, height/2);
  cenário.addImage(cenárioImg);
  cenário.scale = 2;

  animação = createSprite(width/2, height/2-230);
  animação.setCollider("rectangle", 0, -16, 925, 160);
  animação.addImage(animaçãoImg);
  animação.scale = 0.3;

  resetar = createSprite(width/2, height/2-240);
  resetar.setCollider("circle", 0, -5, 82);
  resetar.addImage(resetarImg);
  resetar.visible = false;
  resetar.scale = 0.5;

  gato = createSprite(width-150, height/2+150);
  gato.addImage(gatoSentado);
  gato.scale = 0.3;

  rato = createSprite(width-width+150, height/2+150);
  rato.addImage(ratoParado);
  rato.scale = 0.3;

  floresta.setVolume(0.2);
  floresta.loop();
}

function draw(){

  background(0);

  iniciar();
  drawSprites();

  if(gato.x - rato.x < ((rato.width - gato.width)/2)+270){

    rato.addAnimation("rato1", ratoOlhando);
    gato.addAnimation("gato1", gatoSentado);
    gato.changeAnimation("gato1");
    rato.changeAnimation("rato1");
    resetar.y = height/2-240;    
    resetar.visible = true;
    gato.x = rato.x + 140;
    gato.velocityX = 0;    

    if(mouseIsOver(resetar)){

      resetar.scale = 0.6;

      stroke(0);
      textSize(35);
      fill("#6986d1");
      strokeWeight(5);
      textFont("Times New Roman");
      text("DE NOVO", width/2-76, height/2-150);

    }else{
      resetar.scale = 0.5;
    }

    if(mousePressedOver(resetar)){
      resetar.visible = false;
      gato.x = width-150;
      clique.play();
    }
  }
}

function iniciar(){

  if(mouseIsOver(animação)){
    animação.scale = 0.33;
  }else{
    animação.scale = 0.3;
  }

  if(mousePressedOver(animação) || mousePressedOver(resetar)){

    gato.setCollider("rectangle", 0, -20, 1250, 750);
    rato.setCollider("rectangle", 0, 25, 750, 960);
    rato.addAnimation("rato", ratoProvocando);
    gato.addAnimation("gato", gatoAndando);
    gato.changeAnimation("gato");
    rato.changeAnimation("rato");
    rato.frameDelay = 20;
    gato.velocityX = -5;
    animação.y = width;
    resetar.y = width;
    clique.play();
  }
}