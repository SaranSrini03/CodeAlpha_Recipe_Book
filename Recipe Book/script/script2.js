const content = document.getElementById("content");
const detailboard = document.getElementById("detailboard");
const recipeform = document.getElementById("recipeform");
const fullscreen = document.getElementById("fullscreen");
const ingreholderInput = document.getElementById("ingreholder");
const directionholderInput = document.getElementById("directionholder");

window.addEventListener("load", function () {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.forEach(function (recipeData) {
    make(recipeData.recipename, recipeData.chefname, recipeData.ingreholder, recipeData.directionholder);
  });
});

function make(recipename, chefname, ingreholder, directionholder) {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const deleteButton = document.createElement("button");
  const fullscreenButton = document.createElement("span");

  deleteButton.setAttribute("id", "deletebutton");
  fullscreenButton.setAttribute("id", "fullscreenbutton");
  div.setAttribute("id", "box");
  deleteButton.innerHTML = "Delete";
  fullscreenButton.innerHTML = "&#x2192;";
  h1.textContent = recipename;
  h3.textContent = chefname;

  deleteButton.addEventListener("click", function () {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      content.removeChild(div);
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const updatedRecipes = recipes.filter(function (recipe) {
        return recipe.recipename !== recipename && recipe.chefname !== chefname;
      });
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    }
  });

  fullscreenButton.addEventListener("click", function () {
    const title = document.getElementById("title");
    const name = document.getElementById("name");
    const ingredients = document.getElementById("ingredients");
    const directions = document.getElementById("directions");
    const pen = document.getElementById("pen");
    const tick = document.getElementById("tick");

    title.innerText = recipename;
    name.innerText = "~ " + chefname;
    ingredients.innerText = ingreholder;
    directions.innerText = directionholder;
    
    pen.addEventListener("click",function(){
      title.setAttribute("contentEditable","true");
      name.setAttribute("contentEditable", "true");
      ingredients.setAttribute("contentEditable", "true"); 
      directions.setAttribute("contentEditable", "true");
      pen.style.display="none";
      tick.style.display="block";
    });
    
    tick.addEventListener("click", function () {
      title.setAttribute("contentEditable", "false");
      name.setAttribute("contentEditable", "false"); 
      ingredients.setAttribute("contentEditable", "false");
      directions.setAttribute("contentEditable", "false"); 
      pen.style.display = "block";
      tick.style.display = "none";
    
      const updatedTitle = title.innerText;
      const updatedName = name.innerText;
      const updatedIngredients = ingredients.innerText;
      const updatedDirections = directions.innerText;
    
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const updatedRecipes = recipes.map(function (recipe) {
        if (recipe.recipename === recipename && recipe.chefname === chefname) {
          recipe.recipename = updatedTitle;
          recipe.chefname = updatedName;
          recipe.ingreholder = updatedIngredients;
          recipe.directionholder = updatedDirections;
        }
        return recipe;
      });
    
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    
      const addbox = document.getElementById("addbox");
      content.innerHTML = "";
      content.appendChild(addbox);
    
      updatedRecipes.forEach(function (recipeData) {
        make(recipeData.recipename, recipeData.chefname, recipeData.ingreholder, recipeData.directionholder);
      });
    });
    
    
  
    fullscreen.style.display = "block";
  });

  content.appendChild(div);
  div.appendChild(fullscreenButton);
  div.appendChild(h1);
  div.appendChild(h3);
  div.appendChild(deleteButton);
}

function display() {
  detailboard.style.display = "block";
}

function done() {
  const recipename = document.getElementById("RecipeName").value;
  const chefname = document.getElementById("ChefName").value;
  const ingreholder = ingreholderInput.value;
  const directionholder = directionholderInput.value;

  const formattedIngredients = ingreholder.split('\n').map(line => `→ ${line}`).join('\n');
  const formattedDirections = directionholder.split('\n').map((line, index) => `Step${index + 1} : ${line}`).join('\n');
  
  make(recipename, chefname, formattedIngredients, formattedDirections);

  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push({ recipename, chefname, ingreholder: formattedIngredients, directionholder: formattedDirections });
  localStorage.setItem("recipes", JSON.stringify(recipes));

  detailboard.style.display = "none";
}

function off() {
  detailboard.style.display = "none";
}

function off2() {
  fullscreen.style.display = "none";
}

recipeform.addEventListener("submit", function (e) {
  e.preventDefault();
  done();
  recipeform.reset();
});

function displayItemsFromLocalStorage() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.forEach(function (recipeData) {
      make(recipeData.recipename, recipeData.chefname, recipeData.ingreholder, recipeData.directionholder);
    });
  }
  
  window.addEventListener("load", function () {
    displayItemsFromLocalStorage();
  });