const btnNumbers = document.querySelectorAll(".case");
const screenNumbers = document.querySelector(".screen-nmbr");
const submit = document.querySelector(".btn-sub");
const screenName = document.querySelector(".screen-name");
const screenImg = document.querySelector(".screen");

//clavier
btnNumbers.forEach((element) => {
  element.addEventListener("click", () => addNmbr(element.textContent));
});

function addNmbr(el) {
  screenNumbers.innerHTML =
    screenNumbers.textContent + btnNumbers[el].textContent;
}

//appel de l'api
submit.addEventListener("click", () => {
  let url = `https://pokebuildapi.fr/api/v1/pokemon/${screenNumbers.textContent}`;
  requestApi(url);
});
function requestApi(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      screenName.textContent = data.name;
      screenImg.style.backgroundImage = `url("${data.image}")`;
    });

  screenNumbers.innerHTML = "";
}
