// START THE GAME
$("#startButton").on("touchstart click", function(event){
    $("#start").hide();
    game.start();

    setupQuestion();

    $("#game").show();
});

function setupQuestion () {

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    if(game.question < game.levels[game.level].length) {
        $("#clock").text(game.levels[game.level][game.question].time.toUpperCase());
       
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
    var tellTheTimeResult = $('#tellTheTimeResult');
    var nextButton = $('#nextButton');
    var correct = index === game.levels[game.level][game.question].correct;
    if(correct) {
        game.score += 1;
        tellTheTimeResult.text("Correct");
        tellTheTimeResult.removeClass("btn-danger").addClass("btn-success");
        nextButton.removeClass("btn-danger").addClass("btn-success");
    }else{
        tellTheTimeResult.text("Incorrect");
        tellTheTimeResult.removeClass("btn-success").addClass("btn-danger");
        nextButton.removeClass("btn-success").addClass("btn-danger");
    }

    $("#tellTheTimeInputGroup").hide();
    $("#tellTheTimeResultGroup").show();

    game.question += 1;

    setupQuestion();
}

//NEXT BUTTON
$("#nextButton").on("touchstart click", function(event){
    if(game.question === game.levels[game.level].length){
        game.finish();
        $("#game").hide();
        $("#finish").show();
    }

    $("#tellTheTimeResultGroup").hide();
    $("#tellTheTimeInputGroup").show();

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
            {"time": "1010", "correct": 0, answers: ["10:10","3:45","4:30"]},
            {"time": "3:20", "correct": 1, answers: ["7:15","3:20","8:40"]}
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