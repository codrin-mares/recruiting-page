console.log('Hi Controller!');

/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

function extractRefQP() {
  const qp = window.location.href.split('?')[1];

  if (!qp) {
    return undefined;
  }

  const res = qp.split('&').reduce((acc, item) => {
    const [k, v] = item.split('=');

    return {
      ...acc,
      [k]: v,
    };
  }, {})

  return res.ref;
}

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "questfoxstudio@gmail.com",
    Password: "Airplane111!",
    To: 'questfoxstudio@gmail.com',
    From: "questfoxstudio@gmail.com",
    Subject: "Test recruitment email",
    Body: "Well that was easy!!",
  })
    .then(function (message) {
      alert("mail sent successfully")
    })
    .catch(function(error) {
      console.log('ERROR', error);
    });
}

let formValues = undefined;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  formValues = {...formProps};
  // alert(`Email sent with: ${JSON.stringify(formProps)}`, );

  showEnvelope();
}

function confirmSubmit() {
  // alert(`Email sent with: ${JSON.stringify(formValues)}`, );
  sendEmail();
  showClosingScene();
}

const recruitmentForm = document.getElementById("recruitment-form");
recruitmentForm?.addEventListener("submit", handleSubmit);

const openingScene = document.getElementById("opening");
const openingWrapper = document.getElementById("opening-wrapper");
const closingScene = document.getElementById("closing");
const closingWrapper = document.getElementById("closing-wrapper");
const replayBtn = document.getElementById("replay-btn");
const replayBtn2 = document.getElementById("replay-btn2");
const paper = document.getElementById("paper-wrapper");
const envelope = document.getElementById("envelope");
const replayScene = document.getElementById("replay-scene");
const replaySceneWrapper = document.getElementById("replay-scene-wrapper");

openingScene?.addEventListener('ended', () => {
  openingWrapper.style.display = 'none';
  paper.classList.add('fade-in-transition');
});

closingScene?.addEventListener('ended', () => {
  replayBtn.style.display = 'block';
})

replayScene?.addEventListener('ended', () => {
  replayBtn2.style.display = 'block';
})

function showEnvelope() {
  envelope.style.display = 'flex';
}

function hideEnvelope() {
  envelope.style.display = 'none';
}

function showClosingScene() {
  envelope.style.display = 'none';
  paper.style.display = 'none';
  replayBtn.style.display = 'none';
  closingWrapper.style.display = 'flex';
  closingScene.currentTime = 0;
  closingScene.play();
}

replayBtn.addEventListener('click', () => {
  replayBtn.style.display = 'none';
  closingWrapper.style.display = 'none';
  replaySceneWrapper.style.display = 'flex';

  replayScene.currentTime = 0;
  replayScene.play();
})

replayBtn2.addEventListener('click', () => {
  replayBtn2.style.display = 'none';
  replaySceneWrapper.style.display = 'flex';

  replayScene.currentTime = 0;
  replayScene.play();
})
