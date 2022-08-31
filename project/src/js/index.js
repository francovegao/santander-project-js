//import '../css/styles.css';
//import image from '../assets/prueba.jpeg';

//GENERAR RECETA RANDOM

//Obtener elementos del DOM
const app = document.getElementById('app');
const botonRandom = document.getElementById('random');
const botonClear = document.getElementById('clear');
const botonSearch = document.getElementById('search');
const input= document.getElementById('text');

//Event listener para boton de Random Recipe, al presionarlo muestra receta RANDOM
//Si se presiona mas de una vez va mostrando varias recetas, una debajod e otra 
botonRandom.addEventListener('mousedown', function(event){
    if(event.button === 0){ //Al hacer click en boton

        getRandomMeal()
            .then(function(data){
                console.log(data)
                
                data.meals.forEach(function(data) {
                    const container=document.createElement('div'); //Crea contenedor DIV para contener la receta
                    container.id="randomRecipe"; //Se le asigna ID randomRecipe al contenedor DIV para despues poder limpiar la pantalla 
                    const sub = document.createElement('h2');
                    let title=document.createTextNode(getTitle(data)); //Obtiene titulo de receta
                    const img = document.createElement('img');
                    img.src = getImageUrl(data); //Obtiene imagen de receta
                    const sub1 = document.createElement('p');
                    sub1.id="subtitulo"
                    const title2=document.createTextNode("Ingredients:")
                    const p2 = document.createElement('p');
                    let ingredients=document.createTextNode(getIngredients(data)); //Obtiene ingredientes de receta
                    const sub2 = document.createElement('p');
                    sub1.id="subtitulo2"
                    const title3=document.createTextNode("Instructions:")
                    const p3 = document.createElement('p');
                    let instructions=document.createTextNode(getInstructions(data)); //Obtiene instrucciones de receta
                    
                    //Agrega todos los elementos al contenedor APP dentro de su propio contenedor 
                    app.appendChild(container)
                    sub.appendChild(title)
                    container.appendChild(sub)
                    container.appendChild(img)
                    sub1.appendChild(title2)
                    container.appendChild(sub1)
                    p2.appendChild(ingredients)
                    container.appendChild(p2)
                    sub2.appendChild(title3)
                    container.appendChild(sub2)
                    p3.appendChild(instructions)
                    container.appendChild(p3)
                })
            })
    }
    
})

//Event listener para boton de borrar receta de pantalla 
botonClear.addEventListener('mousedown', function(event){
    if(event.button === 0){

        //Elimina contenedor DIV randomRecipe, por lo tanto se elimina la receta de pantalla 
        const randomRecipe = document.getElementById('randomRecipe');
        randomRecipe.remove()
    }
})

//Funcion para obtener random Meal de API
function getRandomMeal() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
}

//Obtiene titulo de randomMeal
function getTitle(data){
    return `${data.strMeal}`
}

//Obtiene imagen de RandomMeal
function getImageUrl(data){
    return `${data.strMealThumb}`
}

//Obtiene ingredientes de RandomMeal
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

//Obtiene las instrucciones de RandomMeal
function getInstructions(data){
    return `${data.strInstructions}`
}