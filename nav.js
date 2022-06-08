document.getElementById('lesson-one').onclick = function(){
    localStorage.setItem('lines', '4');
    localStorage.setItem('letters1', 'This website is used to check your typing speed in Words Per Minute (WPM).');
    localStorage.setItem('letters2', 'This was created in Javascript, HTML and CSS.');
    localStorage.setItem('letters3', 'If you wish to find your wpm on your own, you can use the equation:');
    localStorage.setItem('letters4', 'Words divided by (Seconds divided by 60)');
    localStorage.setItem('voice', '/typing/voices/typingOne.wav');
    localStorage.setItem('lesson', 'One');
    setTimeout(() => {
        window.open('/typing/', '_self');
    }, 100);
}