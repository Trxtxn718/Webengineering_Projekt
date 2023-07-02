

async function genquestion(){
    const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const json = await res.json();
    console.log(json);

    {
    const test = await fetch('https://opentdb.com/api_category.php');
    const pest = await test.json();
    console.log(pest);

    const select = document.getElementById("category");
    let list = pest.trivia_categories;
    for (category of list) {
        const option = document.createElement("option");
        const name = document.createTextNode(category.name);
        option.appendChild(name);
        select.appendChild(option);
    }
    }

    const quest = document.getElementById("question");
    quest.innerHTML = json.results[0].question

    let answers = [];
    answers.push(json.results[0].correct_answer);
    answers.push(json.results[0].incorrect_answers[0]);
    answers.push(json.results[0].incorrect_answers[1]);
    answers.push(json.results[0].incorrect_answers[2]);
    let rand = Math.floor((Math.random() * 100) + 1);

    let rngA;
    let rngB;
    let rngC;
    let rngD;
    if (rand>75) {
        rngA = 0;
        rngB = 1;
        rngC = 2;
        rngD = 3;
    } else if (rand<50) {
        if (rand<25) {
            rngA = 3;
            rngB = 0;
            rngC = 1;
            rngD = 2;
        } else {
            rngA = 2;
            rngB = 3;
            rngC = 0;
            rngD = 1;
        }
    } else {
        rngA = 1;
        rngB = 2;
        rngC = 3;
        rngD = 0;
    }
    const temp = document.getElementById("temp");
    temp.innerHTML = "";
    const buttonone = document.getElementById("answerone");
    buttonone.innerHTML = answers[rngA];
    if (rngA == 0) {buttonone.addEventListener("click", correctAnswer);}
    else {buttonone.addEventListener("click", wrongAnswer);}

    const buttontwo = document.getElementById("answertwo");
    buttontwo.innerHTML = answers[rngB];
    if (rngB == 0) {buttontwo.addEventListener("click", correctAnswer);}
    else {buttontwo.addEventListener("click", wrongAnswer);}

    const buttonthree = document.getElementById("answerthree");
    buttonthree.innerHTML = answers[rngC];
    if (rngC == 0) {buttonthree.addEventListener("click", correctAnswer);}
    else {buttonthree.addEventListener("click", wrongAnswer);}

    const buttonfour = document.getElementById("answerfour");
    buttonfour.innerHTML = answers[rngD];
    if (rngD == 0) {buttonfour.addEventListener("click", correctAnswer);}
    else {buttonfour.addEventListener("click", wrongAnswer);}




}

var a = 0;
function correctAnswer() {
    const temp = document.getElementById("temp");
    temp.innerHTML = "Correct Answer";

    let widthfirstbar = document.getElementById("firstbar");
    let style = getComputedStyle(widthfirstbar);
    let width = style.width;
    let firstshell = document.getElementById("firstshell");
    let styleshell = getComputedStyle(firstshell);
    let maxwidth = parseInt(styleshell.width);
    let value = maxwidth / parseFloat(width);
    let currentwidth = 100/value;
    let newwidth = Math.round(currentwidth);
    if (Math.floor(newwidth) <100){
        newwidth = Math.round(currentwidth) + 10;
    }
    const firstbar = document.getElementById("firstbar");
    if (a == 0) {
        a = 1;
    incwidth = Math.round(currentwidth);
    var id = setInterval(incrementfirstbar, 10);
    function incrementfirstbar() {
        if (incwidth >= newwidth) {
            clearInterval(id);
            a = 0;
        } else {
            incwidth++;
            firstbar.style.width = incwidth +"%";
            }
        }
    }
}

function wrongAnswer() {
    const temp = document.getElementById("temp");
    temp.innerHTML = "Wrong Answer";
}


