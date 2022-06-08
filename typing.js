const typingElm = document.getElementById('typing');
let currentLetter = 0;
let maxLetters = 0;
let wordCount = 0;

function createLetters(){
    for (i=1; i<parseInt(localStorage.getItem("lines")) + 1; i++){
        var line = document.createElement('div');
        line.classList.add('line');
        var letters = localStorage.getItem(`letters${i}`).split("");
        for (j=0; j<letters.length; j++){
            var letter = document.createElement('p');
            letter.classList.add('letter');
            letter.textContent = letters[j];
            line.appendChild(letter);
            if (letters[j] === ' '){
                wordCount++;
            }
        }
        maxLetters = maxLetters + letters.length;
        typingElm.appendChild(line);
    }
}

function fixSpecial(){
    var letterElms = document.getElementsByClassName('letter');
    for (i=0; i<letterElms.length; i++){
        letterElms[i].innerHTML = letterElms[i].innerHTML.replaceAll(" ", "&nbsp;");
    }
}

function setup(){
    createLetters();
    fixSpecial();
}

const started = new Date();

document.body.onkeypress = function(key){
    var letterElms = document.getElementsByClassName('letter');
    if (letterElms[currentLetter].innerHTML === '&nbsp;') {
        if (key.keyCode === 32){
            letterElms[currentLetter].classList.remove('wrong');
            letterElms[currentLetter].classList.add('typed');
            currentLetter++;
        } else {
            letterElms[currentLetter].classList.add('wrong');
        }
    } else {
        if (letterElms[currentLetter].innerHTML === '&br;'){
            if (key.keyCode === 32){
                letterElms[currentLetter].classList.remove('wrong');
                letterElms[currentLetter].classList.add('typed');
                currentLetter++;
            } else {
                letterElms[currentLetter].classList.add('wrong');
            }
        } else {
            if (key.keyCode === keyCode(letterElms[currentLetter])){
                letterElms[currentLetter].classList.remove('wrong');
                letterElms[currentLetter].classList.add('typed');
                currentLetter++;
            } else {
                letterElms[currentLetter].classList.add('wrong');
            }
        }
    }
    if (currentLetter === maxLetters){
        var seconds = Math.floor((new Date() - started) / 1000);
        localStorage.setItem("wpm", `${wordCount / (seconds / 60)}`);
        var highscore = localStorage.getItem(`lesson${localStorage.getItem("lesson")}-highscore`);
        if (`${highscore}` === 'null'){
            localStorage.setItem(`lesson${localStorage.getItem("lesson")}-highscore`, localStorage.getItem("wpm"));
            console.log(localStorage.getItem(`lesson${localStorage.getItem("lesson")}-highscore`));
        }
        if (parseInt(localStorage.getItem("wpm")) > parseInt(highscore)){
            localStorage.setItem(`lesson${localStorage.getItem("lesson")}-highscore`, localStorage.getItem("wpm"));
        }
        window.open('/typing/finished/', "_self");
    }
};

function keyCode(characterElm){
    var code = characterElm.textContent.charCodeAt(0);
    return code;
}

document.getElementById("voice").setAttribute('src', localStorage.getItem("voice"));

setup();