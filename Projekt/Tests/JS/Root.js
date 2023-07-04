

async function fetchstuff() {
    {
        const test = await fetch('https://opentdb.com/api_category.php');
        const pest = await test.json();
        console.log(pest);

        const select = document.getElementById("category");
        let list = pest.trivia_categories;
        localStorage.setItem("categorylist", JSON.stringify(list));
        for (category of list) {
            const option = document.createElement("option");
            const name = document.createTextNode(category.name);
            option.appendChild(name);
            select.appendChild(option);
        }
    }
    const gamescreen = document.getElementById("gamescreen");
    const winscreen = document.getElementById("winscreen");
    gamescreen.style.display = "none";
    winscreen.style.display = "none";
}



var questionindex = 0;
var json;
async function startgame() {
    const categorylist = localStorage.getItem("categorylist");
    const catlist = JSON.parse(categorylist);
    const selectcat = document.getElementById("category");
    const selectdiff = document.getElementById("difficulty");
    const amountelem = document.getElementById("amount");
    let amount = amountelem.value;
    if (amount > 25) {amount = 25;}
    const diff = selectdiff.value;
    const selectedindexdiff = selectdiff.selectedIndex;
    const selectedoptionindex = selectcat.selectedIndex;
    const gamescreen = document.getElementById("gamescreen");
    if (selectedoptionindex >= 1) {
        const category = catlist[selectedoptionindex-1].id;
        if (selectedindexdiff >= 1) {
            const res = await fetch('https://opentdb.com/api.php?amount=' + amount + '&category=' + category + '&difficulty=' + diff.toLowerCase() + '&type=multiple');
            json = await res.json();
        } else {
            const res = await fetch('https://opentdb.com/api.php?amount=' + amount + '&category=' + category + '&type=multiple');
            json = await res.json();
        }
    } else {
        if (selectedindexdiff >= 1) {
            const res = await fetch('https://opentdb.com/api.php?amount=' + amount + '&difficulty=' + diff.toLowerCase() + '&type=multiple');
            json = await res.json();
        } else {
            const res = await fetch('https://opentdb.com/api.php?amount=' + amount + '&type=multiple');
            json = await res.json();
        }
    }
    console.log(json);
    gamescreen.style.display = "block";
    asignquestion(questionindex);
}

function asignquestion(index) {
    const quest = document.getElementById("question");
    quest.innerHTML = json.results[index].question

    let answers = [];
    answers.push(json.results[index].correct_answer);
    answers.push(json.results[index].incorrect_answers[0]);
    answers.push(json.results[index].incorrect_answers[1]);
    answers.push(json.results[index].incorrect_answers[2]);
    let rand = Math.floor((Math.random() * 100) + 1);

    let rngA;
    let rngB;
    let rngC;
    let rngD;
    if (rand > 75) {
        rngA = 0;
        rngB = 1;
        rngC = 2;
        rngD = 3;
    } else if (rand < 50) {
        if (rand < 25) {
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

    const buttonone = document.getElementById("answerone");
    buttonone.innerHTML = answers[rngA];
    if (rngA == 0) { buttonone.addEventListener("click", correctAnswer); }
    else { buttonone.addEventListener("click", wrongAnswer); }

    const buttontwo = document.getElementById("answertwo");
    buttontwo.innerHTML = answers[rngB];
    if (rngB == 0) { buttontwo.addEventListener("click", correctAnswer); }
    else { buttontwo.addEventListener("click", wrongAnswer); }

    const buttonthree = document.getElementById("answerthree");
    buttonthree.innerHTML = answers[rngC];
    if (rngC == 0) { buttonthree.addEventListener("click", correctAnswer); }
    else { buttonthree.addEventListener("click", wrongAnswer); }

    const buttonfour = document.getElementById("answerfour");
    buttonfour.innerHTML = answers[rngD];
    if (rngD == 0) { buttonfour.addEventListener("click", correctAnswer); }
    else { buttonfour.addEventListener("click", wrongAnswer); }

}

var counter = 0;
var a = 0;
function correctAnswer() {
    const questionfield = document.getElementById("questionfield");
    const winscreen = document.getElementById("winscreen");
    const congrats = document.getElementById("congratulation");
    const amount = document.getElementById("amount").value;
    if (questionindex < json.results.length-1) {
        questionindex++;
        asignquestion(questionindex);
        console.log(json.results.length);
        counter++;
    }
    else{
        counter++;
        questionfield.style.display = "none";
        if (100/counter>90){
            console.log(100/counter);
            congrats.innerHTML = "You have done very well congratulations!";
        } else if (100/counter>80){
            console.log(100/counter);
            congrats.innerHTML = "You have done very good!";
        } else {
            console.log(100/counter);
            congrats.innerHTML = "You have done quite well, but you can do better!";
        }
        winscreen.style.display = "block";
    }
    const correct = document.getElementById("correct");
    const questionamount = document.getElementById("questionamount");
    const temp = document.getElementById("temp");
    console.log(amount);
    temp.innerHTML =""
    temp.innerHTML = "Correct Answer";
    console.log("Correct");
    correct.innerHTML = counter;
    questionamount.innerHTML = amount;
    correct.style.color = "green";
    questionamount.style.color = "red";
    let widthfirstbar = document.getElementById("firstbar");
    let style = getComputedStyle(widthfirstbar);
    let width = style.width;
    let firstshell = document.getElementById("firstshell");
    let styleshell = getComputedStyle(firstshell);
    let maxwidth = parseInt(styleshell.width);
    let value = maxwidth / parseFloat(width);
    let currentwidth = 100 / value;
    let newwidth = Math.round(currentwidth);
    let widthaddvalue = 100 / amount;
    if (Math.floor(newwidth) < 100) {
        newwidth = Math.round(currentwidth) + widthaddvalue;
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
                firstbar.style.width = incwidth + "%";
            }
        }
    }
}

function wrongAnswer() {
    const questionfield = document.getElementById("questionfield");
    const winscreen = document.getElementById("winscreen");
    const congrats = document.getElementById("congratulation");
    const amount = document.getElementById("amount").value;
    if (questionindex < json.results.length-1) {
        questionindex++;
        asignquestion(questionindex);
        console.log(json.results.length);
    }
    else{
        questionfield.style.display = "none";
        if (100/counter>90){
            console.log(100/counter);
            congrats.innerHTML = "You have done very well congratulations!";
        } else if (100/counter>80){
            console.log(100/counter);
            congrats.innerHTML = "You have done very good!";
        } else {
            console.log(100/counter);
            congrats.innerHTML = "You have done quite well, but you can do better!";
        }
        winscreen.style.display = "block";
    }
    const correct = document.getElementById("correct");
    const questionamount = document.getElementById("questionamount");
    correct.innerHTML = counter;
    questionamount.innerHTML = amount;
    correct.style.color = "green";
    questionamount.style.color = "red";
    const temp = document.getElementById("temp");
    temp.innerHTML =""
    temp.innerHTML = "Wrong Answer";
}


