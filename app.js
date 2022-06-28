const btnNumbers = document.querySelectorAll(".case");
const screenNumbers = document.querySelector(".screen-nmbr");
const submit = document.querySelector(".btn-sub");
const screenName = document.querySelector(".screen-name");
const screenImg = document.querySelector(".screen");
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const description = document.querySelector(".screen-description");
const imgZoom = document.getElementById("zoom");
const pokeZoom = document.querySelector(".bigger");

//permet d'ajouter un nombre au nombre précédent
function addNmbr(el) {
  screenNumbers.innerHTML =
    screenNumbers.textContent + btnNumbers[el].textContent;
}

//rend visible la div prévu pour acceuillir le zomm
function zooom() {
  imgZoom.style.visibility = "visible";
}
//cache la div prévu pour acceuillir le zomm
function noZooom() {
  imgZoom.style.visibility = "hidden";
}

//déclanche la fonction addNmbr au clique sur le clavier du pokédex
btnNumbers.forEach((element) => {
  element.addEventListener("click", () => addNmbr(element.textContent));
});

//Zoom l'image du pokémon sélectionné au clique de celui-ci
screenImg.addEventListener("click", zooom);
//dézoom le pokémon au clique sur l'écran
imgZoom.addEventListener("click", noZooom);

//appel de l'api
submit.addEventListener("click", () => {
  let url = `https://pokebuildapi.fr/api/v1/pokemon/${screenNumbers.textContent}`;
  requestApi(url);
});
function requestApi(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //type 1 du pokémon choisi
      let apiTypes1 = data.apiTypes[0];
      //type 2 du pokémon choisi
      let apiTypes2 = data.apiTypes[1];
      //pour savoir combien de types possède le pokémon
      let typeLength = data.apiTypes;
      //pour avoir accès aux stats du pokémon choisi
      let stats = data.stats;

      //nom du pokemon
      screenName.textContent = `#${data.id} - ${data.name}`;
      //image du pokemon
      screenImg.style.backgroundImage = `url("${data.image}")`;
      //image du pokémon au zoom
      pokeZoom.style.backgroundImage = `url("${data.image}")`;

      //type 1
      t1.style.backgroundImage = `url("${apiTypes1.image}")`;
      //type 2 avec vérification si le pokémon possède 2 types
      if (typeLength.length >= 2) {
        t2.style.backgroundImage = `url("${apiTypes2.image}")`;
      }
      //sinon ne retourne rien comme image pour type 2 (si 1 seul type)
      else {
        t2.style.backgroundImage = ``;
      }
      //stats
      if (typeLength.length >= 2) {
        //déscription si 2 types
        description.textContent = `Les points de vie de ce pokémon s'élève à ${stats.HP}. ${data.name} possède une attaque de ${stats.attack} et une défense de ${stats.defense}. Sa vitesse est de ${stats.speed}. ${data.name} est un pokémon de type ${apiTypes1.name} et ${apiTypes2.name}`;
      } else {
        //description si 1 type
        description.textContent = `Les points de vie de ce pokémon s'élève à ${stats.HP}. ${data.name} possède une attaque de ${stats.attack} et une défense de ${stats.defense}. Sa vitesse est de ${stats.speed}. ${data.name} est un pokémon de type ${apiTypes1.name}`;
      }
    });

  screenNumbers.innerHTML = "";
}
