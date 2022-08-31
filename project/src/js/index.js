//import '../css/styles.css';
//import image from '../assets/prueba.jpeg';

//const imageLogo = document.getElementById('prueba')
//imageLogo.src = image;

//Obtener datos de API Random
const app = document.getElementById('app');

function getRandomMeal() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
}

getRandomMeal()
.then(function(data){
    console.log(data)
    
    data.meals.forEach(function(data) {
        const sub = document.createElement('h2');
        let title=document.createTextNode(getTitle(data));
        const img = document.createElement('img');
        img.src = getImageUrl(data);
        const sub1 = document.createElement('p');
        sub1.id="subtitulo"
        const title2=document.createTextNode("Ingredients:")
        const p2 = document.createElement('p');
        let ingredients=document.createTextNode(getIngredients(data));
        const sub2 = document.createElement('p');
        sub1.id="subtitulo2"
        const title3=document.createTextNode("Instructions:")
        const p3 = document.createElement('p');
        let instructions=document.createTextNode(getInstructions(data));

        sub.appendChild(title)
        app.appendChild(sub)
        app.appendChild(img)
        sub1.appendChild(title2)
        app.appendChild(sub1)
        p2.appendChild(ingredients)
        app.appendChild(p2)
        sub2.appendChild(title3)
        app.appendChild(sub2)
        p3.appendChild(instructions)
        app.appendChild(p3)
    })
})


function getTitle(data){
    return `${data.strMeal}`
}

function getImageUrl(data){
    return `${data.strMealThumb}`
}

function getIngredients(data){
   let array= Object.entries(data)
   let result=[]
   let x=29;
   let string='';
    for(let i=9; i<=28; i++){
        if(!array[i][1]) break;
        result.push(array[i][1],array[x][1]);
        x++;
    }

   for(let x=0; x<result.length;x=x+2){
        string=`${string}${result.slice(x,x+2)}+\n`;
   }
    let newstr=string.replace(/,/g,':')
    return newstr;
}

function getInstructions(data){
    return `${data.strInstructions}`
}