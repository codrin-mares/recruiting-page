const questions = {
  q1: 'Q: How did your programming journey begin and what made you love it?',
  q2: 'Q: Describe projects you have been personally involved in and outline your contributions to them (contests, game jams, personal projects, etc.).',
  q3: 'Q: What are your hobbies and activities that you really enjoy doing (can be anything!)?',
};

// Example POST method implementation:
function postData(url = "", data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

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

let formValues = undefined;

function processFormProps(formProps) {
  const { q1, q2, q3 } = formProps || {};
  const { name, email, socialMedia, message} = formProps || {};

  const questionProps = { q1, q2, q3 };

  const detailString = `Name: ${name}\nEmail: ${email}\nSocial Media: ${socialMedia || 'N/A'}\nReference: ${extractRefQP() || 'Website'}\n`

  const questionsString = Object.entries(questionProps).reduce((acc, [k, v]) => {
    return acc + questions[k] + '\n' + 'A: ' + v + '\n\n';
  }, '');

  const finalString = `${detailString}\n${questionsString}Message:\n${message || 'N/A'}`;

  return finalString;
}

function sendEmail() {
  postData("https://questfoxstudio.com/wp-json/contact/v1/send", {
    contact_name: formValues.name,
    contact_message: processFormProps(formValues),
  })
    .then(function (message) {
    })
    .catch(function(error) {
      console.log('Error sending email:', error);
    });
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  formValues = {...formProps};

  showEnvelope();
}

function confirmSubmit() {
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
