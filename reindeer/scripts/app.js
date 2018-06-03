// START THE GAME
$("#startButton").on("touchstart click", function(event){
    $("#start").hide();
    game.start();

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    $("#game").show();
});

//PLAY THE SOUND
$("#playSoundButton").on("touchstart click", function(event){
    $("#playSoundButtonText").text("Playing");
    $.playSound("./audio/"+game.levels[game.level][game.question].word.toLowerCase()+".mp3");
    setTimeout(function(){ $("#playSoundButtonText").text("Play Again"); }, 2000);
});

//CAPTURE THE ANSWER
$(function(){
    $('#spellForm').submit(function () {
        if(!game.started){
            return false;
        }
        var spellInput = $('#spellInput');
        var spellResult = $('#spellResult');
        var answer = spellInput.val();
        var correct = answer.toLowerCase() === game.levels[game.level][game.question].word.toLowerCase();
        if(correct) {
            game.score += 1;
            spellResult.text("Correct");
            spellResult.removeClass("btn-danger").addClass("btn-success");
        }else{
            spellResult.text("Incorrect");
            spellResult.removeClass("btn-success").addClass("btn-danger");
        }

        $("#spellInputGroup").hide();
        $("#spellCheckGroup").show();

        spellInput.val('');
        game.question += 1;

        $("#score").text(game.score + ' / ' + game.levels[game.level].length);
        $("#finalscore").text(game.score);


        return false;
    });
});

//NEXT BUTTON
$("#nextButton").on("touchstart click", function(event){
    $("#playSoundButtonText").text("Play Sound");

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
            {"word": "cat"},
            {"word": "dog"}
        ]
    ],
    start: function () {
        this.score = 0;
        this.level = 0;
        this.question = 0;
        this.sound = 0;
        this.started = true;
    },
    finish: function () {
        this.started = false;
    }
};