console.log('Hi Controller!');

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "sender@email_address.com",
    Password: "Enter your password",
    To: 'receiver@email_address.com',
    From: "sender@email_address.com",
    Subject: "Sending Email using javascript",
    Body: "Well that was easy!!",
  })
    .then(function (message) {
      alert("mail sent successfully")
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
  showClosingScene();
}

const recruitmentForm = document.getElementById("recruitment-form");
recruitmentForm?.addEventListener("submit", handleSubmit);

const openingScene = document.getElementById("opening");
const openingWrapper = document.getElementById("opening-wrapper");
const closingScene = document.getElementById("closing");
const closingWrapper = document.getElementById("closing-wrapper");
const replayBtn = document.getElementById("replay-btn");
const paper = document.getElementById("paper-wrapper");
const envelope = document.getElementById("envelope");

openingScene?.addEventListener('ended', () => {
  openingWrapper.style.display = 'none';
  paper.style.display = 'block';
});

closingScene?.addEventListener('ended', () => {
  replayBtn.style.display = 'block';
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
  closingWrapper.style.display = 'flex';
  closingScene.currentTime = 0;
  closingScene.play();
}

replayBtn.addEventListener('click', () => {
  replayBtn.style.display = 'none';
  closingScene.currentTime = 0;
  closingScene.play();
})
