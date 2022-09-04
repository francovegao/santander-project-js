//import '../css/styles.css';
//import image from '../assets/prueba.jpeg';

//Obtener elementos del DOM
const app = document.getElementById('app');
const botonRandom = document.getElementById('random');
const botonClear = document.getElementById('clear');
const botonClear2 = document.getElementById('clear2');
const botonSearch = document.getElementById('search');
const input= document.getElementById('text');
let contador=0;

//BUSCAR RECETAS POR AREA (PAIS)
botonSearch.addEventListener('mousedown', function(event){
    if(event.button === 0){
        console.log(input.value)
        getRecipesArea(input.value)
            .then(function(data){
                console.log(data)  
                const cont=document.createElement('div'); //Crea contenedor DIV para contener la receta
                cont.id="areaRecipes";
                app.appendChild(cont);

                data.meals.forEach(function(data) {
                    let idNumber=getIdNumber(data);
                    const container=document.createElement('div'); //Crea contenedor DIV para contener la receta
                    container.className="recipes"
                    
                    const sub = document.createElement('h3');
                    let title=document.createTextNode(getTitle(data));
                    const img = document.createElement('img');
                    img.src = getImageUrl(data);
                    img.id=`img${contador}`;
                    const p = document.createElement('p');
                    
                    cont.appendChild(container)
                    sub.appendChild(title);
                    container.appendChild(sub);
                    container.appendChild(img);
                    
                    const section=document.createElement('section'); 
                    section.id=`section${contador}`;
                    section.style.display='none';
                    container.appendChild(section);
                    getRecipesIdNumber(idNumber)
                      .then(function(data){
                        data.meals.forEach(function(data) {
                            const sub1 = document.createElement('p');
                            sub1.id="subtitulo"
                            const title2=document.createTextNode("Ingredients:")
                            let datos=getIngredients(data)
                            const sub2 = document.createElement('p');
                            sub2.id="subtitulo2"
                            const title3=document.createTextNode("Instructions:")
                            const p3 = document.createElement('p');
                            let instructions=document.createTextNode(getInstructions(data));

                            sub1.appendChild(title2)
                            section.appendChild(sub1)
                            section.appendChild(datos)
                            sub2.appendChild(title3)
                            section.appendChild(sub2)
                            p3.appendChild(instructions)
                            section.appendChild(p3)
                        })
                      })
                      contador++;
                })
                createButtons(contador);
                contador=0;
            })
            
    }
})

//GENERAR RECETA RANDOM
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
                    sub.id="randomTitle";
                    let title=document.createTextNode(getTitle(data)); //Obtiene titulo de receta
                    const img = document.createElement('img');
                    img.src = getImageUrl(data); //Obtiene imagen de receta
                    const sub1 = document.createElement('p');
                    sub1.id="subtitulo"
                    const title2=document.createTextNode("Ingredients:")
                    let datos=getIngredients(data)
                    const sub2 = document.createElement('p');
                    sub2.id="subtitulo2"
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
                    container.appendChild(datos)
                    sub2.appendChild(title3)
                    container.appendChild(sub2)
                    p3.appendChild(instructions)
                    container.appendChild(p3)
                })
            })
    }
})

//Funcion para mostrar ingredientes e instrucciones al hacer click en la imagen
function createButtons(contador){
    let totalArray=[] 
    console.log("Funcion createButtons", contador)
    for(let i=0; i<contador; i++){
      totalArray.push(document.getElementById(`img${i}`));
      totalArray.push(document.getElementById(`section${i}`))
    }

    for(let i=0; i<totalArray.length; i=i+2){
        totalArray[i].addEventListener('mousedown', function(event){
            if(event.button === 0){
                totalArray[i+1].style.display='block';  
            }
        })
    }
    contador=0;
}

//Event listener para boton de borrar receta de pantalla 
botonClear.addEventListener('mousedown', function(event){
    if(event.button === 0){
        const areaRecipe = document.getElementById("areaRecipes");
        areaRecipe.remove()      
    }
})

botonClear2.addEventListener('mousedown', function(event){
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
    const list = document.createElement('ul');
    list.id="ingredients"
   let array= Object.entries(data)
   let result=[]
   let x=29;
   let string='';
    for(let i=9; i<=28; i++){
        if(!array[i][1]) break;
        result.push(array[i][1],array[x][1]);
        x++;
    }
    /*for(let x=0; x<result.length;x=x+2){
        string=`${string}${result.slice(x,x+2)}   +   \n`;
    }*/

    let listado=[];
    let count=0;
    let strIngr='';
    let newstr='';
   for(let x=0; x<result.length;x=x+2){
        listado[count]=document.createElement('li')
        strIngr=`${string}${result.slice(x,x+2)}\n`;
        newstr=strIngr.replace(/,/g,':')
        let text=document.createTextNode(newstr);
        listado[count].appendChild(text);
        count++;
        strIngr="";
        text="";
        newstr="";
   }
   
   for (const iterator of listado) {
        list.appendChild(iterator)
   }
    console.log("en getingredients", list)
    return list;
}

//Obtiene las instrucciones de RandomMeal
function getInstructions(data){
    return `${data.strInstructions}`
}

//BUSCAR MEAL NORMAL
function getRecipesArea(area) {
    let baseUrl='https://www.themealdb.com/api/json/v1/1/filter.php?a'
    let url=`${baseUrl}=${area}`
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
}

function getIdNumber(data){
    return `${data.idMeal}`
}

function getRecipesIdNumber(idNumber){
    let baseUrl='https://www.themealdb.com/api/json/v1/1/lookup.php?i'
    let url=`${baseUrl}=${idNumber}`
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
}



