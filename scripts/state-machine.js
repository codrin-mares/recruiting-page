const opening = document.getElementById('opening');
const closingAnimation = document.getElementById('closingAnimation');
const closing = document.getElementById('closing');
const paper = document.getElementById('paperDiv');
const envelope = document.getElementById('envelope');
const source = document.getElementById('changeSrc');
const wrapper = document.getElementById('wrapper');

const btnSubmit = document.getElementById('btnSubmit');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

var isReplayDisplayed = true;

opening?.addEventListener('ended',middleSection,false);
closingAnimation?.addEventListener('ended',showRepeat,false);

middleSection();

window.onresize = resize();

function resize() {
    if ( isReplayDisplayed ) {
        const replayButton = document.getElementById('replayButton');

        console.log("REPLAY BTN", replayButton);

        if (!replayButton) {
            return;
        }

        replayButton.style.width = '40px';
        if ( closingAnimation.clientWidth >= 890 )
            replayButton.style.width = '65px';
    }
}

function showRepeat(e) {
    if ( !isReplayDisplayed ) {
        const replayButton = document.createElement('img');
        replayButton.setAttribute('src', 'res/replay.gif');
        replayButton.setAttribute('onclick', 'replay()');
        replayButton.setAttribute('id', 'replayButton');
        replayButton.style.width = '40px';
        if ( closingAnimation.clientWidth >= 890 )
            replayButton.style.width = '65px';
        replayButton.style.position = 'absolute';
        replayButton.style.top = 0;
        replayButton.style.left = 0;
        replayButton.style.opacity = 1;

        closing.appendChild(replayButton);
        isReplayDisplayed = true;
    }
}

function middleSection() {
    btnSubmit.classList.remove('disabled');
    btnPrev.classList.add('disabled');
    btnNext.classList.add('disabled');

    if (opening) {
        opening.style.opacity = 0;
    }
    
    envelope.style.opacity = 0;
    paper.style.opacity = 1;
    wrapper.style.overflow = 'visible';
}

function submitSection() {
    btnSubmit.classList.add('disabled');
    btnPrev.classList.remove('disabled');
    btnNext.classList.remove('disabled');
    paper.style.opacity = 0;
    wrapper.style.overflow = 'hidden';
    envelope.style.opacity = 1;
}

function verificationSection() {
    btnSubmit.classList.add('disabled');
    btnPrev.classList.add('disabled');
    btnNext.classList.add('disabled');
    isReplayDisplayed = false;
    envelope.style.opacity = 0;
    closing.style.opacity = 1;
    closingAnimation.play();
}

function replay() {
    isReplayDisplayed = false;
    document.getElementById('replayButton').remove();
    source.setAttribute('src', 'res/opening-scene.mp4'); // here will be the full animation
    source.setAttribute('type', 'video/mp4');
    closingAnimation.load();
    closingAnimation.play();
}
