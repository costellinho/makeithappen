// START THE GAME
$("#startButton").on("touchstart click", function(event){
    $("#start").hide();
    game.start();

    setupQuestion();

    $("#game").show();
});

//PLAY THE SOUND
$("#playSoundButton").on("touchstart click", function(event){
    $("#playSoundButtonText").text("Playing...");
	$('#playSoundButton').css('background-image','url(assets/playing.svg)');
    $.playSound("./audio/"+ getAudioFileName()+ ".mp3");
     setTimeout(function(){
        $("#playSoundButtonText").text("Play Again");
        $('#playSoundButton').css('background-image','url(assets/play_again.svg)');
        }, 2000);
});

function getAudioFileName() {
	var question = game.levels[game.level][game.question]
	return question.word.replace('_', question.answers[question.correct] ).toLowerCase()
}
function setupQuestion () {

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    if(game.question < game.levels[game.level].length) {
        $("#qt0").text(game.levels[game.level][game.question].word[0].toUpperCase());
        $("#qt1").text(game.levels[game.level][game.question].word[1].toUpperCase());
        $("#qt2").text(game.levels[game.level][game.question].word[2].toUpperCase());

        $("#at0").text(game.levels[game.level][game.question].answers[0].toUpperCase());
        $("#at1").text(game.levels[game.level][game.question].answers[1].toUpperCase());
        $("#at2").text(game.levels[game.level][game.question].answers[2].toUpperCase());
    }
}

$("#a0").on("touchstart click", function(event){
    checkAnswer(0);
    event.preventDefault();
    return false;
});
$("#a1").on("touchstart click", function(event){
    checkAnswer(1);
    event.preventDefault();
    return false;
});
$("#a2").on("touchstart click", function(event){
    checkAnswer(2);
    event.preventDefault();
    return false;
});
function checkAnswer(index) {
    if(!game.started){
        return false;
    }
    var spellResult = $('#spellResult');
    var nextButton = $('#nextButton');
    var correct = index === game.levels[game.level][game.question].correct;
    if(correct) {
        game.score += 1;
        spellResult.text("Correct");
        spellResult.removeClass("btn-danger").addClass("btn-success");
        nextButton.removeClass("btn-danger").addClass("btn-success");
    }else{
        spellResult.text("Incorrect");
        spellResult.removeClass("btn-success").addClass("btn-danger");
        nextButton.removeClass("btn-success").addClass("btn-danger");
    }

    $("#spellInputGroup").hide();
    $("#spellCheckGroup").show();

    game.question += 1;

    setupQuestion();
}

//NEXT BUTTON
$("#nextButton").on("touchstart click", function(event){
    $("#playSoundButtonText").text("Play Sound");
	$('#playSoundButton').css('background-image','url(assets/play.svg)');
    if(game.question === game.levels[game.level].length){
        game.finish();
        $("#game").hide();
        $("#finish").show();
    }

    $("#spellCheckGroup").hide();
    $("#spellInputGroup").show();

});

//BACK BUTTON
$("#backButton").on("touchstart click", function(event){
    $("#game").hide();
    $("#start").show();
});

//FINISH THE GAME
$("#finishButton").on("touchstart click", function(event){
    $("#finish").hide();
    $("#start").show();
});

//OUR GAME DATA
var game = {
    started: false,
    score: 0,
    level: 0,
    question: 0,
    levels: [
        [
            {"word": "c_t", "correct": 0, answers: ["a","e","i"]},
            {"word": "_og", "correct": 2, answers: ["m","l","d"]}
        ]
    ],
    start: function () {
        this.score = 0;
        this.level = 0;
        this.question = 0;
        this.started = true;
    },
    finish: function () {
        this.started = false;
    }
};