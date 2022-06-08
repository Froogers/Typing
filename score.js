let lesson1Highscore = localStorage.getItem('lessonOne-highscore');
if (`${lesson1Highscore}` === 'null'){
    document.getElementById('lesson-one-highscore').textContent = `Complete this to get your statistics!`;
} else {
    document.getElementById('lesson-one-highscore').textContent = `Highest WPM = ${parseInt(lesson1Highscore).toFixed(0)}`;
}