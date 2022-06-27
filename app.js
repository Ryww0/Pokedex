const btnNumbers = document.querySelectorAll(".case");
const screenNumbers = document.querySelector(".screen-nmbr");
const submit = document.querySelector(".btn-sub");
const screenName = document.querySelector(".screen-name");
const screenImg = document.querySelector(".screen");
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");

//log variables
// console.log(t1);

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
      let apiTypes1 = data.apiTypes[0];
      let apiTypes2 = data.apiTypes[1];
      let test = data.apiTypes;

      // console.log(test);

      //nom du pokemon
      screenName.textContent = `#${data.id} - ${data.name}`;
      //image du pokemon
      screenImg.style.backgroundImage = `url("${data.image}")`;
      //type 1
      t1.style.backgroundImage = `url("${apiTypes1.image}")`;
      //type 2 avec vérification
      if (test.length >= 2) {
        t2.style.backgroundImage = `url("${apiTypes2.image}")`;
      } else {
        t2.style.backgroundImage = ``;
      }
    });

  screenNumbers.innerHTML = "";
}
