function myFunction() {
   var x = document.forms["frm1"]["lname"].value;
   alert(gameContent["levels"][POP.level - 1]["word"]);
   updateGame();
}

function updateGame(){
  clearTheCanvas();
  updateScore();
  performDrawOperations();
}

function clearTheCanvas(){
  POP.Draw.clear();
}

function performDrawOperations(){
  POP.Draw.text("LEVEL: " + POP.level, 100, 100, 40, '#000');
  POP.Draw.text("SCORE: " + POP.score, 100, 200, 40, '#000');
}

function updateScore(){
  POP.score += 1;
  if (POP.score === 5){
    POP.level += 1;
    POP.score = 0;
  }
}

//put game conent here like words, files ...
var gameContent = {
"levels":[
    {"name":"1", "word":"cat"}
]
};

var POP = {
    WIDTH: 320,
    HEIGHT:  480,
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    score: 0,
    level: 1,

    init: function() {
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;

        POP.canvas = document.getElementsByTagName('canvas')[0];
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;

        POP.ctx = POP.canvas.getContext('2d');
        POP.resize();

        POP.Draw.clear();
        POP.Draw.rect(120,120,150,150, 'pink');
        POP.Draw.text('Text to speach : How do you spell cat ', 100, 100, 10, '#000');
    },

    // resizes for Iphone and android
    resize: function() {
        POP.currentHeight = window.innerHeight;
        POP.currentWidth = POP.currentHeight * POP.RATIO;
        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
        POP.ua = navigator.userAgent.toLowerCase();
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ?
            true : false;

        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
    }

};

// draw simple shapes
POP.Draw = {
    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },
    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },
    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
    },
    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }

};

window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);
