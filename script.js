const publicKey = '0e3346dd10386fb6497f3e9eb731c0b4';


// Function to generate the MD5 hash
function generateHash(ts) {
   // var MD5 = require("crypto-js/md5");
  const hash = CryptoJS.MD5(ts +Key + publicKey).toString();
  console.log("your has: "+ hash);
  return hash;
}

// Function to fetch superhero data from the Marvel API
async function herohunt() {
  const heroSearch = document.getElementById('input').value.trim();
  
  if (heroSearch !== '') {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);
  
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroSearch}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
  
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayHeroResults(data.data.results);
    } catch (error) {
        console.log('Error:', error);
    }
  }
  
   /* else {
        // If the search input is empty, display all superheroes
        fetchAllSuperheroes();
      }*/
    
}
//function display all the results when input is empty
/*async function fetchAllSuperheroes() {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);
  
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayHeroResults(data.data.results);
    } catch (error) {
      console.log('Error:', error);
    }
  }*/

// Function to display superhero data on the page
function displayHeroResults(heroes) {
  const heroList = document.getElementById('heroResult');
  heroList.innerHTML = '';

  heroes.forEach((hero) => {
    const heroCard = createHeroCard(hero);
    heroList.appendChild(heroCard);
  });
}

// Function to create a card for each superhero
function createHeroCard(hero) {
  const heroCard = document.createElement('div');
  heroCard.classList.add('hero-card');

  const img = document.createElement('img');
  img.src = hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension;

  const name = document.createElement('h3');
  name.textContent = hero.name;

  const favotiteButton=document.createElement('button');
  favotiteButton.innerHTML=`<i class="fa-solid fa-heart"></i>`;
  favotiteButton.addEventListener('click', () => addToFavorites(hero));

  const moreInfo=document.createElement('button');
  moreInfo.innerHTML='MoreInfo';
  moreInfo.addEventListener('click', () => showSuperheroPage(hero.id));
  //console.log(hero.id)

  heroCard.appendChild(img);
  heroCard.appendChild(name);
  heroCard.appendChild(moreInfo);
  heroCard.appendChild(favotiteButton);
  
  return heroCard;
}
//function to add favotites
function addToFavorites(hero) {
  console.log("Function working")
  const favoriteHeroes = JSON.parse(localStorage.getItem('favoriteHeroes')) || [];
  const isFavorite = favoriteHeroes.some((favHero) => favHero.id === hero.id);

  if (!isFavorite) {
    favoriteHeroes.push(hero);
    localStorage.setItem('favoriteHeroes', JSON.stringify(favoriteHeroes));
    alert("addded to favorites");
    //showPopUpMessage(`${hero.name} added to favorites.`);
  } else {
    const updatedHeroes = favoriteHeroes.filter((favHero) => favHero.id !== hero.id);
    localStorage.setItem('favoriteHeroes', JSON.stringify(updatedHeroes));
    alert("removed from favorite list!!")
    //showPopUpMessage(`${hero.name} removed from favorites.`);
  }
}
/*function showPopUpMessage(message) {
  const popUp = document.createElement('div');
  popUp.classList.add('pop-up');
  popUp.textContent = message;
  document.body.appendChild(popUp);

  setTimeout(() => {
    popUp.remove();
  },1000);
}*/
// Add event listener to the search form
//const searchForm = document.getElementById('searchForm');
//searchForm.addEventListener('submit', searchSuperhero);

/*-------------------------------------------------------------------------------*/
//code for favorites page
function getFavoriteSuperheroes() {
  const favoriteHeroes = JSON.parse(localStorage.getItem('favoriteHeroes')) || [];
displayFavoriteSuperheroes(favoriteHeroes);
}
//display favorites
function displayFavoriteSuperheroes(heroes) {
  const favoriteList = document.getElementById('favoriteList');
  favoriteList.innerHTML = '';

  if (heroes.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'You have no favorite superheroes.';
    favoriteList.appendChild(message);
    return;
  }

  heroes.forEach((hero) => {
    const heroCard = createFavoriteHeroCard(hero);
    favoriteList.appendChild(heroCard);
  });
}
//create favorite card 
function createFavoriteHeroCard(hero) {
  const heroCard = document.createElement('div');
  heroCard.classList.add('fav-card');

  const img = document.createElement('img');
  img.src = hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension;
  img.alt = hero.name;

  const name = document.createElement('h3');
  name.textContent = hero.name;

  const removeButton = document.createElement('button');
  removeButton.innerHTML=`<i class="fa-regular fa-square-minus"></i>`;
  removeButton.addEventListener('click', () => removeFromFavorites(hero.id));
  const moreInfo=document.createElement('button');
  moreInfo.innerHTML='MoreInfo';
  moreInfo.addEventListener('click', () => showSuperheroPage(hero.id));

  heroCard.appendChild(img);
  heroCard.appendChild(name);
  heroCard.appendChild(moreInfo);
  heroCard.appendChild(removeButton);

  return heroCard;
}
//function to remove fav
function removeFromFavorites(id) {
  const favoriteHeroes = JSON.parse(localStorage.getItem('favoriteHeroes')) || [];
  const updatedHeroes = favoriteHeroes.filter(hero => hero.id !== id);
  localStorage.setItem('favoriteHeroes', JSON.stringify(updatedHeroes));
  getFavoriteSuperheroes();
}

document.addEventListener('DOMContentLoaded', getFavoriteSuperheroes);
/*---------------------------------------------*/ 
const Key = '98be65dbadb7cbc9940e2e8868f0bed2d08b174a';
//finction to redirect info
function showSuperheroPage(heroId) {
  // Redirect to the superinfo.html page with the superhero's ID as a query parameter
  window.location.href = `superinfo.html?id=${heroId}`;
  console.log("hi")
}






