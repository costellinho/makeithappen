function myFunction() {
   var x = document.forms["frm1"]["lname"].value;
   updateGame();
   return false;
}

function updateGame(){
  clearTheCanvas();
  updateScore();
  performDrawOperations();
}

$(function(){
  $('#frm1').submit(function () {
  console.log("Hello");
   myFunction();
   return false;
  });
});


function clearTheCanvas(){
  POP.Draw.clear();
}

function performDrawOperations(){
  simpleAnimate();
  POP.Draw.text(POP.score + "/" + POP.level, 200, (POP.currentHeight + 20) - POP.currentHeight, 20, '#000');
}

function wait(ms)
{
POP.Draw.clear();
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

function updateScore(){
  POP.score += 1;
  if (POP.score === 5){
    POP.level += 1;
    POP.score = 0;
  }
}

function simpleAnimate(){
  POP.Draw.rect(75,150,40,40, 'pink');
  wait(100);
  POP.Draw.rect(95,150,40,40, 'pink');
  wait(100);
  POP.Draw.rect(105,150,40,40, 'pink');
  wait(100)
  POP.Draw.rect(125,150,40,40, 'pink');
  wait(100);
  POP.Draw.rect(145,150,40,40, 'pink');
  wait(100);
  POP.Draw.rect(150,70,40,40, 'pink');
}

var test = "test";

var spriteR = new Image();
spriteR.src = "images/sprite.png";

//put game conent here like words, files ...
var gameContent = {
"levels":[
    {"name":"1", "word":"cat"}
]
};

var POP = {
    WIDTH: 250,
    HEIGHT:  450,
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

        POP.Draw.rect(75,150,40,40, 'pink');
    },

    // resizes for Iphone and android
    resize: function() {
        POP.currentHeight = window.innerHeight;
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
        POP.ua = navigator.userAgent.toLowerCase();
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ?
            true : false;

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

function sprite (options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
}

window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);
