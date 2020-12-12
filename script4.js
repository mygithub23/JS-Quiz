//https://learn.co/lessons/js-looping-and-iteration-traversing-nested-objects-readme


let slideCounter = 0;
let arrayLenghth = JS_Questions.length;
let arrayIndex = 0;
let score = 0;
let slideUserAnswer = "";
let correctAnswer = "";
let timeCounter = 120;


const slides = document.querySelectorAll(".slide");
var keys = "test";

// -------------- functions Timer -------------- //

  var interval = setInterval(function () {
    
   timeCounter--;
   if (timeCounter <= 0) {
     clearInterval(interval);
     $('#timer').html("<h3>Count down complete</h3>");
     $( "#quizActive" ).toggle( "slow", function() {
      // Animation complete.
    });
 
     alert("userScore:" + userScore);
     //  $(".quizAction").slideToggle();
     window.location.href = './scores.html';
     return;
   } else {
     $('#time').text("Time left: " + timeCounter + " Seconds");
     $("#time").css({
      
      'color': 'white',
      'font-size': '3rem'
    })
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
// =================== Application Logic ================== //

function buildQuiz() {

  var charCode = 96;

  // remove current slide
  if (slideCounter > 0) {
    $('button').remove();
    $("li").remove();
    $("h1").remove();
  }

  if (slideCounter >= JS_Questions.length) {
   // $(".quizActive").to();
    $( "#boquizActivek" ).toggle( "slow", function() {
      // Animation complete.
    });
    alert("userScore:" + userScore);
    window.location.href = './scores.html';
  }

  // Add h3 element and append next question
  $("<h3></h3>").appendTo("#question");
  $("h3").append(JS_Questions[arrayIndex].question);

  for (let i = 0; i < 4; i++) {
    $(`<li id='${i}' class='active-slide'></li>`).appendTo("#answers");
      $(`<button class='${i} btn btn-primary btn-lg btn-block' id='${i}'></button>`).appendTo(`#${i}`)
      $(`.${i}`).append(JS_Questions[arrayIndex].answers[i])

 
    } 
   

    $("#answers").css({
      'list-style-type': 'upper-alpha',
      'color': 'white',
      'font-size': '2rem'
    })
    $("#answers").css({

      'color': 'white',
      'font-size': '2rem'
    })

    $("#question").css({
      'border': '1px',
      'border-radius': '3px',
      'margin': '20px',
      'backgroundColor': 'rgb(3, 29, 68)',
      'color': 'white',
      'padding': '10px'
    })

    $("button").css('margin', '5px');
    $("button").css('text-align', 'left');
  }

  buildQuiz();


  $("#answers").delegate("button", "click", function () {

    console.log("YOU CLICK ME --->");
    let thisliAttribute  = (this).id ;
   // (e) => { thisliAttribute = $(e.target).attr("id")
   // let i = parseInt(thisliAttribute, 10);
/*    You’re using an arrow function, which has no this context. 
   function () { $(this).attr("id"); } Or (e) => { $(e.target).attr("id") } */
  
    console.log("thisliAttribute: " + thisliAttribute);
    slideUserAnswer = (JS_Questions[arrayIndex].answers[thisliAttribute]); // get text content

    console.log("slideUserAnswer: " + slideUserAnswer);
    slideUserAnswer = thisliAttribute;
    console.log("slideUserAnswer 2: " + slideUserAnswer);
    correctAnswer = JS_Questions[arrayIndex].correctAnswer;
   // intCorrectAnswer = parseInt(correctAnswer, 10)
    slideCounter++;
    arrayIndex++;
    saveQuizResult(slideUserAnswer, correctAnswer)

  });

  let userScore = 0

  function saveQuizResult(slideUserAnswer, correctAnswer) {
    let tempScore = 0;
    if (slideUserAnswer === correctAnswer) {
      tempScore++;
      console.log("tempScore: " + tempScore)
      tempUserScore = tempScore;
      userScore = userScore + 1;
      console.log("tempScore: " + tempScore)
    }
    $("#scoreBoard").text(userScore);
    $("#scoreBoard").css({
      'list-style-type': 'upper-alpha',
      'color': 'white',
      'font-size': '2rem'
    })
    console.log("userScore--> " + userScore)

    buildQuiz();
  }