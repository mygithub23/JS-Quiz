$(document).ready(function () {
  //https://learn.co/lessons/js-looping-and-iteration-traversing-nested-objects-readme

  let counter = 0;
  arrayQuiz = [];
  currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  let keys = "test";
  let slideCounter = 0;
  let stopTime = 0;
  //set timer 
  let timeCounter = 120;
  let userScore = 0;
  let tempUserScore = 0;
  let i = 0;
  let qIndex = 0;
  let aIndex = 1;
  let charCode = 96;


  //var counter = 0;
  // var keys=0;
  var arrayListAnswers = [];

  // -------------- functions Helper -------------- //


  var interval = setInterval(function () {
    timeCounter--;
    if (timeCounter <= 0) {
      clearInterval(interval);
      $('#timer').html("<h3>Count down complete</h3>");
      alert("userScore:" + userScore);
      window.location.href = './scores.html';
      return;
    } else {
      $('#time').text("Time left: " + timeCounter + " Seconds");
    }
  }, 1000);

  // return char count in a string
  function stringCharCounter(string) {
    var i = 0;
    var count = {};
    string.split('').forEach(function (s) {
      count[s] ? count[s]++ : count[s] = 1;
      i++;
    });
    // return count;
    return i;
  }

  function quizAnswersList(target) {
    if (typeof target === 'object') {
      //console.log("counter_1: " + counter)

      for (const k in target) {
        if (stringCharCounter(k) < 2) {
          console.log("Key: >>> " + k);
          arrayListAnswers.push(k);
        }
        quizAnswersList(target[k]);
      }
    }

  }

  quizAnswersList(myQuestions);

  var arrayCorrectAnswerList = []
  // traverse through the object

  function quizCorrectAnswerList(target) {
    var keys = "";
    if (typeof target === 'object') {
      for (const k in target) {
        //console.log("Key--: " + key);
        // console.log("element1 >>>")
        keys = k;
        quizCorrectAnswerList(target[k]);

      }
    } else {

      let element = target;
      if (stringCharCounter(element) < 2) {
        //console.log(counter)
        counter++;
        arrayCorrectAnswerList.push(element);
        console.log(element);
      }

    }
  }

  quizCorrectAnswerList(myQuestions);

  // traverse through the object
  function deepIterator(target) {
    if (typeof target === 'object') {
      for (const key in target) {
        //console.log("Key--: " + key);
        keys = key;
        deepIterator(target[key]);
      }
    } else {
      let element = keys + ": " + target;
      arrayQuiz.push(element);
      counter++;
    }
  }

  deepIterator(myQuestions);


  // =================== Application Logic ================== //


  function buildQuiz(q, a) {

    console.log("Stop Time: -----------> " + stopTime)
   

    if (slideCounter >= 6) {
      alert("userScore:" + userScore);
      window.location.href = './scores.html';
    }
    // remove current slide
    $('button').remove();
    $("li").remove();
    $("h3").remove();

    console.log("qIndex ----> " + q);
    $("<h3></h3>").appendTo("#question");
    $("h3").append(arrayQuiz[q]);

    for (i = 1; i < 5; i++) {
      $(`<li id='${i}' class='active-slide'></li>`).appendTo("#answers");
      charCode++;
      $(`<button class='${i} btn btn-primary active-slide' data-id=${charCode}></button>`).appendTo(`#${i}`)

      $(`.${i}`).append(arrayQuiz[a])
      $("button").css('width', '600px')
        .css('height', 'auto')
        .css('textAlign', 'left');
      a++;
    }

    $("#question").css({
      'border': '1px',
      'border-radius': '3px',
      'margin': '20px',
      'backgroundColor': 'rgb(3, 29, 68)',
      'color': 'white',
      'padding': '10px'
    })
    $("button").css('margin', '5px');

    qIndex = q;
    aIndex = a;
    console.log(slideCounter)
  }
  /* 
    arrayQuiz.forEach(element => {
      console.log(element);
    });
    quizListAnswers.forEach(element => {
      console.log(element);
});
/* for (i = 0; i < arrayQuiz.length; i++) {
    console.log( quizListAnswers[i])
} */

function saveQuizResult(slideUserAnswer, correctAnswer) {
  let tempScore = 0;
  if (slideUserAnswer === correctAnswer) {
    tempScore++;
    tempUserScore = tempScore;
    userScore = userScore + 1;
  }
  $("#scoreBoard").text(userScore);
  console.log("userScore--> " + userScore)


  qIndex += 6;
  aIndex += 2;
  buildQuiz(qIndex, aIndex);
}

buildQuiz(qIndex, aIndex);


$("ul").delegate("li", "click", function () {

// alert$(this).text;
//console.log("target: ---> " + ($(this).target))
$(this).after()
console.log("YOU CLICK ME --->" + (this).id)
var userPick = parseInt ((this).id, 10);
//userPick = userPick;

let slideUserAnswer = arrayListAnswers[userPick];
let correctAnswer = arrayCorrectAnswerList[slideCounter];
//$("#remain").text(`${slideCounter}`);
slideCounter++;



// console.log("SllideUserAnswer " + String.fromCharCode($(this).data("id")));
//slideUserAnswer = String.fromCharCode($(this).data("id"));
/* 
console.log("tempScore: " + String.fromCharCode($(this).attr("data-id")));
//let correctAnswer = arrayQuiz[i]
console.log(correctAnswer.substring(correctAnswer.length - 1))
correctAnswer = correctAnswer.substring(correctAnswer.length - 1) */

saveQuizResult(slideUserAnswer, correctAnswer)
});

});