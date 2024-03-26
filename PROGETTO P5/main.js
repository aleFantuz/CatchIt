let backgroundImg;
let backgroundMenu;
let personaggioImg;
let personaggioInvertito;
let personaggioClick;
let menuAttivo = true; // Stato del gioco: true = menu, false = gioco attivo
let personaggioGirato = false;
let altezza = 1100;
let lunghezza = 2500;
let x = 0;
let y = 0;
let z = 20;
let w = 10;

let ostacoloX;
let ostacoloY;

let ostacoloX2;
let ostacoloY2;
let quadratoRosso;

let tipoLivello=0;
let sceltaLivelloEseguita=false;

let moltiplicatore = 1;

let menuPausaControllo=false;

let staiGiocando=false;

let spostamento=1;

let sceltaLivello=false; 

let monete = 0;
let costoMolt = 0;

let opzioniMenu = false;

let punteggioMax = 0;

let roundSuperato = false; // Variabile per controllare se il round è stato superato

let nframe = 10;
let immagineCambiata = false;
let visualPersonaggioDanneggiato = 0;

let punteggio = 0;
let numero = 10;
let round = 1;
let visualRound = 0;

let backgroud2;
let backgroud3;

let gameOver;

let generazioneQuadrato = false;


function preload() {
  backgroundImg = loadImage('./img/backgroud.png');
  personaggioImg = loadImage('./img/nemico.png');
  personaggioImg.resize(100, 0); // Imposta la larghezza a 100 pixel e scala automaticamente l'altezza in base all'aspect ratio
  personaggioClick = loadImage('./img/nemico.png');
  personaggioClick.resize(10, 0); // Imposta la larghezza a 100 pixel e scala automaticamente l'altezza in base all'aspect ratio
  backgroundMenu = loadImage('./img/sfondoMenu.jpeg');
  backgroud2 = loadImage('./img/sfondo2.jpg'); 
  backgroud3= loadImage('./img/sfondo3.png');
  quadratoRosso= loadImage('./img/quadratoRosso.jpg');

  gameOver=loadImage('./img/gameOver.gif');

  

  backgroundSceltaLivello = loadImage('./img/sceltalivello.jpg');

  backgroundOpzioni = loadImage('./img/sfondoOpzioni.gif');

}
let startTime; 


function setup() {
  startTime= millis(); 

  createCanvas(lunghezza, altezza);
  frameRate(nframe);
  personaggioImg.resize(0, 0);
  personaggioClick.resize(0, 0);
  backgroundImg.resize(lunghezza, altezza);
  quadratoRosso.resize(300,300);
  menuAttivo = true; // Imposta il menu attivo all'avvio
}

let gameOverMenu=false;

function draw() {
  frameRate(nframe);
  if (menuAttivo) {
      drawMenu();
  } 
  else{
    if(opzioniMenu){
      drawOpzioniMenu();
    }
    if(sceltaLivello)
    {
        drawSceltalivello();

        switch(tipoLivello) {
          case 1: // Livello pacifico
            if (menuPausaControllo) {
              drawSchermataPausa();
            }
            else {

              background(backgroundImg);
              playGame();
              sceltaLivelloEseguita = true;
              staiGiocando = true;
            }
            break;
          case 2: // Livello medio
            if (menuPausaControllo) {
              drawSchermataPausa();
            } 
            else {
              background(backgroud2);
              playGame();
              sceltaLivelloEseguita = true;
              staiGiocando = true;
            }
            if(gameOverMenu)
            {
              drawGameOver();

            }

            break;
          case 3: // Livello difficile
            if (menuPausaControllo) {
              drawSchermataPausa();
            } else {
              background(backgroud3);
              playGame();
              sceltaLivelloEseguita = true;
              staiGiocando = true;
            }
            if(gameOverMenu)
            {
              drawGameOver();

            }
            break;
        }
    }
  }
  /*
  text("MouseX: " + mouseX, 40, 20);
  text("MouseY: " + mouseY, 40, 40);
  */
}

function drawSchermataPausa() {
  // Disegna lo sfondo semitrasparente per la schermata di pausa
  fill(0, 0, 0, 150); // Colore nero con trasparenza
  rect(0, 0, lunghezza, altezza); // Disegna un rettangolo che copre l'intero schermo

  // Testo "PAUSA"
  fill(255); // Colore bianco
  textSize(60); // Dimensione del testo
  textAlign(CENTER, CENTER); // Allineamento del testo al centro
  text("PAUSA", lunghezza / 2, altezza / 2 - 100); // Posizione del testo

  // Testo "Premi SPAZIO per riprendere il gioco"
  textSize(32); // Dimensione del testo
  text("Premi SPAZIO per riprendere il gioco", lunghezza / 2, altezza / 2); // Posizione del testo

  text("HOME", lunghezza / 2, altezza / 2 + 400 )
}

function drawGameOver()
{
  background(gameOver);
}

function drawOpzioniMenu() {
  background(backgroundOpzioni);
  fill(255, 0, 255);
  textSize(40);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(" Benvenuti\nil gioco consiste nel colpire il nostro nemico comune, Azrot il Profanatore\necco i comandi:\nCLICK SINISTRO: COLPISCI\nSPACE: SCHERMATA DI PAUSA\nin oltre potremo aumentare i punti guadagnati tramite un moltiplicatore\nsituato nella parte sinistra dello schermo, a fianco del punteggio\nATTENIONE PERO' A NON FAR SCENDERE IL PUNTEGGIO SOTTO 0!\ninfatti colpendo i quadrati rossi situati nel livello 2 e 3 il vostro punteggio si decrementerà", width / 2, height / 2);
  text("HOME", lunghezza / 2, altezza / 2 + 400);
}

function drawMenu() {
  sceltaLivelloEseguita=false;
  tipoLivello=0;// set livello a 0 per far scegliere di nuovo
  nframe=10;
  background(backgroundMenu);
  punteggio = 0;
  round = 1;
}


function playGame() {
  // Disegna l'immagine del personaggio
  image(personaggioImg, x, y);

  // Muovi il personaggio lungo l'asse X
  x = x + z;
  if (x > lunghezza - 350) {
    z = z * -1;
    personaggioImg = loadImage('./img/nemicoGirato.png')
    personaggioImg.resize(150, 0);
    personaggioGirato = !personaggioGirato;
  } else if (x < 0) {
    z = z * -1;
    personaggioImg = loadImage('./img/nemico.png')
    personaggioImg.resize(150, 0);
    personaggioGirato = !personaggioGirato;
  }

  // Muovi il personaggio lungo l'asse Y
  y = y + w;
  if (y > altezza - 350 || y < 0) {
    w = w * -1;
  }
  
  // Genera un nuovo quadrato rosso solo nei livelli 2 e 3 ogni 2 secondi
  if (tipoLivello === 2) {
    if (frameCount % (nframe * 2) === 0) {
      ostacoloX = random(0, lunghezza - 50); // Genera una coordinata X casuale all'interno del background
      ostacoloY = random(0, altezza - 50); // Genera una coordinata Y casuale all'interno del background  
    }

    // Disegna il quadrato rosso
    fill(255, 0, 0);
    rect(ostacoloX, ostacoloY, 250, 250); // Disegna il quadrato rosso
  }
  if (tipoLivello == 3) {
    if (frameCount % (nframe * 2) === 0) {
      ostacoloX = random(0, lunghezza - 250); // Genera una coordinata X casuale per il primo quadrato
      ostacoloY = random(0, altezza - 250); // Genera una coordinata Y casuale per il primo quadrato  
      ostacoloX2 = random(0, lunghezza - 250); // Genera una coordinata X casuale per il secondo quadrato
      ostacoloY2 = random(0, altezza - 250); // Genera una coordinata Y casuale per il secondo quadrato
    }
  
    // Disegna il primo quadrato rosso
    fill(255, 0, 0);
    rect(ostacoloX, ostacoloY, 250, 250);
  
    // Disegna il secondo quadrato rosso
    rect(ostacoloX2, ostacoloY2, 250, 250);
  }

  if(punteggio<0)
  {
    gameOverMenu=true;
  }
  

  // Visualizza il punteggio e altre informazioni
  textSize(32);
  fill(255);
  text("Punteggio: " + punteggio, 40, 30);
  text("Monete: " + monete, 40, 65); // Visualizza il numero di monete possedute

  // Visualizza il punteggio massimo
  if (punteggioMax < punteggio) {
    punteggioMax = punteggio;
  }
  textSize(32);
  text("Punteggio massimo: " + punteggioMax, 40, 95);
  stroke(255); // Colore del bordo
  strokeWeight(2); // Spessore del bordo
  noFill(); // Senza riempimento per il rettangolo
  rect(400, 5, 430, 80); // Disegna il rettangolo intorno al pulsante 
  text("Monete richieste: " + costoMolt, 440, 35);
}


function drawSceltalivello() {
  background(backgroundSceltaLivello);
}

function mousePressed() {
  if(menuPausaControllo)
  {  //entra in schermata di pausa e controlla se premi home 
    if(
      mouseX > lunghezza / 2 -100 &&
      mouseX < lunghezza/2 + 100 &&
      mouseY > altezza / 2 + 300 &&
      mouseY < altezza / 2 + 500
    )
    {
      menuAttivo = true;
      menuPausaControllo=false;
      sceltaLivelloEseguita=false;
      sceltaLivello=false;
    }
  }

  if (menuAttivo) {
    // Verifica se il clic è avvenuto sull'area del pulsante di play
    if (
      mouseX > 818 &&
      mouseX < 1730 &&
      mouseY > 202 &&
      mouseY < 300
    ) {
       menuAttivo= false;   //esco dalla home 
       sceltaLivello=true;  // entro nella schermata scelta livello 
       sceltaLivelloEseguita=false;
    }

    // Verifica se il clic è avvenuto sull'area del pulsante di opzioni
    else if (
      mouseX > 810 &&
      mouseX < 1770 &&
      mouseY > 485 &&
      mouseY < 580
    ) {
      console.log("opzioni premuto");
      opzioniMenu = true; // Attiva il menu opzioni
      menuAttivo=false;
    }
  } else {

    if(opzioniMenu)
    {
      if(mouseX > 1140 &&
        mouseX < 1380 &&
        mouseY > 895 &&
        mouseY < 980)
        {
          menuAttivo=true;
          opzioniMenu=false;
        }
    }

    if(sceltaLivello)
    {
      if(sceltaLivelloEseguita==false){
      if(mouseX > 0 &&
        mouseX < lunghezza/3 &&
        mouseY > 0 &&
        mouseY < altezza)
        {
          console.log("pacifica");
          tipoLivello=1;
          
        }

        if(mouseX > lunghezza/3 &&
          mouseX < lunghezza/1.5 &&
          mouseY > 0 &&
          mouseY < altezza)
          {
            console.log("normale");
            tipoLivello=2;

          }

          if(mouseX > lunghezza/1.5 &&
            mouseX < lunghezza &&
            mouseY > 0 &&
            mouseY < altezza)
            {
              console.log("difficile");
              tipoLivello=3;
            }
          }

    }
    // Verifica se il clic è avvenuto sull'immagine del personaggio
    if (
      mouseX > x &&
      mouseX < x + personaggioImg.width &&
      mouseY > y &&
      mouseY < y + personaggioImg.height
    ) {
      danneggiaPersonaggio(); // Danneggia l'immagine del personaggio
      setTimeout(ripristinaPersonaggio, 1000); // Ripristina l'immagine del personaggio dopo un secondo
    }

    if (mouseX > ostacoloX && mouseX < ostacoloX + 250 && mouseY > ostacoloY && mouseY < ostacoloY + 250) {
      // Il mouse è stato premuto sopra l'immagine del quadrato rosso
      console.log("Hai premuto sull'immagine del quadrato rosso!");
      punteggio= punteggio -2;  //tolgo 2 punti 
      generazioneQuadrato=false;
    }

    if (mouseX > 430 &&
      mouseX < 600 &&
      mouseY > 10 &&
      mouseY < 90) {
      if (costoMolt < monete) {
        moltiplicatore++;
        console.log("moltiplicatore aumentato");
        costoMolt += 300;
      } else {
        textSize(60);
        console.log("non hai abbastanza monete");
      }
    }

    // Verifica se il clic è avvenuto sull'area del pulsante "HOME" nella schermata delle opzioni
    if (opzioniMenu && mouseX > lunghezza / 2 - 200 && mouseX < lunghezza / 2 + 200 && mouseY > altezza / 2 - 100 && mouseY < altezza / 2 + 200) {
      menuAttivo = true; // Torna al menu principale
      opzioniMenu = false; // Esci dalla schermata delle opzioni
      console.log("home premuto");
    }
  }
  if(gameOverMenu)
  {
    if(
    mouseX > 980 &&
    mouseX < 1550 &&
    mouseY > 900 &&
    mouseY < 1000
    )
    {
      menuAttivo=true;
      gameOverMenu=false;
      sceltaLivello=false;

    }
  }

}

function danneggiaPersonaggio() {
  if (immagineCambiata) {
    if (personaggioGirato) {
      personaggioImg = loadImage('./img/nemicoGiratoDanneggiato.png');
      console.log("punteggio incrementato di 2");
      punteggio = punteggio + moltiplicatore;
      monete += 30;
    } else {
      personaggioImg = loadImage('./img/nemicoDanneggiato.png');
      console.log("punteggio incrementato di 2");
      punteggio = punteggio + moltiplicatore;
      monete += 30;
    }
    setTimeout(ripristinaPersonaggio, 1000); // Ripristina l'immagine e nasconde il testo dopo 1 secondo
  }
  immagineCambiata = !immagineCambiata;
  if (nframe < 60) {
    nframe += 5;
  } 
  console.log("punteggio incrementato verifica");
  punteggio++;
}

function ripristinaPersonaggio() {
  if (personaggioGirato) {
    personaggioImg = loadImage('./img/nemicoGirato.png');
  } else {
    personaggioImg = loadImage('./img/nemico.png');
  }
  immagineCambiata = false;
}

function keyPressed(){
if(staiGiocando)
{
    if (key === " ") {   
      console.log("space premuto");   
      menuPausaControllo= !menuPausaControllo;
    }
}
}