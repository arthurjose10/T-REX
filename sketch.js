var trex, trexCorrendo, chao, imagemChao, subchao, nuvem, imagemNuvem,
cacto, imagemCacto1, imagemCacto2, imagemCacto3, imagemCacto4,
 imagemCacto5, imagemCacto6,escolherCacto, tempoJogo, imagemFim, imagemReiniciar, somPulo, somMorrendo, somCheckPoint;
const jogar = 1;
const encerrar = 0;
var estadoJogo = jogar;
function preload(){
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
trexColidiu = loadAnimation("trex_collided.png")
imagemChao = loadImage("ground2.png")
imagemNuvem = loadImage("cloud.png")
imagemCacto1 = loadImage("obstacle1.png")
imagemCacto2 = loadImage("obstacle2.png")
imagemCacto3 = loadImage("obstacle3.png")
imagemCacto4 = loadImage("obstacle4.png")
imagemCacto5 = loadImage("obstacle5.png")
imagemCacto6 = loadImage("obstacle6.png")
//criando o subchao e deixando ele invisivel
imagemFim = loadImage("gameOver.png")  
imagemReiniciar = loadImage("restart.png")  
somPulo = loadSound("jump.mp3")
somMorrendo = loadSound("die.mp3")
somCheckPoint = loadSound("checkPoint.mp3")
}

function setup() {
createCanvas (600, 200) 
// criando o sprite do trex - colocando a animação
trex = createSprite(50,100,20,40)
trex.addAnimation("correndo",trexCorrendo)
trex.addAnimation("colidiu" ,trexColidiu)
trex.scale = 0.5
//criando a sprite do chao e colocando a imagem
chao = createSprite(200,180,500,10)
chao.addAnimation("chao", imagemChao)
  
  tempoJogo = 0;
trex.setCollider("circle", 0,0,40)
trex.debug = false

  


  
  
      subchao = createSprite(200,190,500,10)
subchao.visible = false

fimDeJogo = createSprite(300,80,30,30)
fimDeJogo.addAnimation("fimdejogo",imagemFim)
fimDeJogo.scale = 0.5
reiniciar = createSprite(300,120,30,30)
reiniciar.addAnimation("reiniciar",imagemReiniciar)
reiniciar.scale = 0.5
  
 grupoDeCactos = new Group()
grupoDeNuvens = new Group() 
  
}

function draw() {
background(180)

text("Tempo: "+ tempoJogo,500,30)


  
  
  
if(estadoJogo == jogar){
tempoJogo = tempoJogo+1
tempoJogo = setInterval(() => { });

if(tempoJogo > 0 && tempoJogo % 100 == 0){
somCheckPoint.play()
}


  fimDeJogo.visible = false
reiniciar.visible = false
  

chao.velocityX = -(3 + tempoJogo / 100)
  
if(chao.x < 0){
chao.x = chao.width / 2
}


  
  
  gerarNuvens()

gerarCactos()
  
  
  
if(grupoDeCactos.isTouching(trex)){
estadoJogo = encerrar;
somMorrendo.play()
}
trex.velocityY = trex.velocityY + 0.5



  
  
if(keyDown("space")&& trex.y > 161){
trex.velocityY =  -15
}
  
  

}else if(estadoJogo == encerrar){
  
  fimDeJogo.visible = true
reiniciar.visible = true
chao.velocityX = 0
grupoDeNuvens.setVelocityXEach(0);
grupoDeCactos.setVelocityXEach(0);
grupoDeNuvens.setLifetimeEach(-1)
grupoDeCactos.setLifetimeEach(-1)
trex.changeAnimation("colidiu",trexColidiu)
trex.velocityY = 0;
}
  




trex.velocityY = trex.velocityY + 0.5

trex.collide(subchao)

if(mousePressedOver(reiniciar) ){
console.log("clicou")
restart()
}


drawSprites()
function restart (){
estadoJogo = jogar
fimDeJogo.visible = false;
reiniciar.visible = false;
grupoDeCactos.destroyEach()
grupoDeNuvens.destroyEach()
trex.changeAnimation("correndo",trexCorrendo)
}

}
function gerarCactos(){
if(frameCount % 60 == 0){
cacto = createSprite (600,165,10,40)
cacto.velocityX = -(3 + tempoJogo / 100)
cacto.velocityX = -3
escolherCacto = Math.round(random(1,6))
switch(escolherCacto){
  case 1 : cacto.addImage(imagemCacto1)
     break;
  case 2 : cacto.addImage(imagemCacto2)
    break;
  case 3 : cacto.addImage(imagemCacto3)  
    break;
  case 4 : cacto.addImage(imagemCacto4)
    break;
  case 5 : cacto.addImage(imagemCacto5)
    break;
  case 6 : cacto.addImage(imagemCacto6)
    break;
default : break;
}

cacto.scale = 0.4
cacto.lifetime = 300;
grupoDeCactos.add(cacto);

}  



}
function gerarNuvens(){
if(frameCount % 60 == 0){
nuvem = createSprite(600,100, 50, 10)
nuvem.velocityX = -3
nuvem.addAnimation("nuvem passando", imagemNuvem)
nuvem.y = Math.round(random(60, 100))
nuvem.depth = trex.depth
trex.depth = trex.depth + 1
nuvem.scale = 0.4
nuvem.lifetime = 300
grupoDeNuvens.add(nuvem);
}

              
}
