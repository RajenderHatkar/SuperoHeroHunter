const publicKey = '0e3346dd10386fb6497f3e9eb731c0b4';
const privateKey = '98be65dbadb7cbc9940e2e8868f0bed2d08b174a';


  function generateHash(ts) {
    // var MD5 = require("crypto-js/md5");
   const hash = CryptoJS.MD5(ts + privateKey + publicKey);
   return hash.toString();
  }
  //fetcing from api
  async function getSuperheroDetails(heroId) {
   /* if (!heroId) {
      console.error('Superhero ID not found in the URL query parameter.');
      return;
    }*/
  
   const ts = new Date().getTime().toString();
   const hash = generateHash(ts);
  
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${heroId}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displaySuperheroDetails(data.data.results[0]);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  //hero detail info card
  function displaySuperheroDetails(superhero) {
    const superheroDetails = document.getElementById('superheroDetails');
    superheroDetails.innerHTML = '';
  
    const img = document.createElement('img');
    img.src = superhero.thumbnail.path + '/standard_fantastic.' + superhero.thumbnail.extension;
    img.alt = superhero.name;
    console.log(superhero.name);
    console.log(superhero.series);
  
    const name = document.createElement('h3');
    name.textContent = superhero.name;

    const comic_id=document.createElement('span');
    comic_id.textContent = `Total No of comics: ${superhero.comics.available}`;

    const events=document.createElement('span');
    events.textContent=`Total No of events: ${superhero.events.available}`;

    const id=document.createElement('span');
    id.textContent=`Hero ID: ${superhero.id}`;

    const infodiv=document.createElement('div');
    infodiv.innerHTML='';
    infodiv.classList.add('super-card');
  
    const description = document.createElement('p');
    description.textContent = `Description : ${superhero.description}`|| 'No description available.';


    infodiv.appendChild(name);
    infodiv.appendChild(id)
    infodiv.appendChild(comic_id);
    infodiv.appendChild(events);
    infodiv.appendChild(description)
    superheroDetails.appendChild(img);
    superheroDetails.appendChild(infodiv);
  }
  
  // Get the superhero ID from the query parameter and display superhero details
  const urlParams = new URLSearchParams(window.location.search);
  const heroId = urlParams.get('id');
  getSuperheroDetails(heroId);