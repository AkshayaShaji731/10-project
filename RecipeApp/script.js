const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals')
const searchTerm = document.getElementById("search-term")
const searchBtn = document.getElementById("search")
const mealPopup = document.getElementById("meal-popup")
const popupCloseBtn = document.getElementById('close-popup')
const mealInfoEl = document.getElementById("meal-info")
getRandomMeal();
fetchFavMeals()

async function getRandomMeal() {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const respData = await resp.json()
  const randomMeal = respData.meals[0]

  console.log(randomMeal);
  addMeal(randomMeal, true)
}

async function getMealById(id) {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  const respData = await resp.json();

  const meals = await respData.meals[0]
  return meals
}

async function getMealsBySearch(term) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
  const respData = await resp.json();

  const meals = respData.meals
  console.log(meals);
  return meals
}

function addMeal(mealData, random = false) {
  // console.log(mealData);
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
            <div class="meal">
                <div class="meal-header">
                    ${random ? `
                      <span class="random">Random Receipe</span>`: ''}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn " >   
                        <i class="fa  -solid fa-heart"></i>               
                    </button>
                </div>
            </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal)
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal)
      btn.classList.add("active")
    }
    // btn.classList.toggle('active')
    // favoriteContainer.innerHTML=""
    fetchFavMeals()
  })

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  })
  mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS()

  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)))
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

  favoriteContainer.innerHTML = ""
  const mealIds = getMealsLS();

  const meals = []
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealToFav(meal)
  }
  console.log(meals);

  //  add them to the screen
}

function addMealToFav(mealData) {

  const favMeal = document.createElement('li');
  favMeal.classList.add('meal');

  favMeal.innerHTML = `
            <img src="${mealData.strMealThumb}" 
                 alt="${mealData.strMeal}">
                 <span>${mealData.strMeal}</span>
                 <button class="clear"><i class="fas fa-window-close"</i></button>`;

  const btn = favMeal.querySelector('.clear')
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal)
    fetchFavMeals()
  });
  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  // update the Meal info
  mealInfoEl.innerHTML = ""
  const mealEl = document.createElement('div')
  
  const ingredient=[];
  for(let i=1;i<=20;i++){
    if(mealData["strIngredient"+i]){
      ingredient.push(`${mealData["strIngredient"+i]}/${mealData["strMeasure"+i]}`)
    }else{
      break;
    }
  }
  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
      <img src="${mealData.strMealThumb}" alt="">
    <p> ${mealData.strInstructions} </p>
    <h3>Ingredients:</h3>
    <ul>
    ${ingredient.map((ing)=>
      `<li>${ing}</li>`).join("")}
    </ul>`

  mealInfoEl.appendChild(mealEl)

  // show the popup
  mealPopup.classList.remove('hidden')
}


searchBtn.addEventListener('click', async () => {
  mealsEl.innerHTML = ''
  const search = searchTerm.value
  const meals = await getMealsBySearch(search)

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal)
    });
  }
})

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add('hidden')
})