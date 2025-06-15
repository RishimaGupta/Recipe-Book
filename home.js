let allRecipes = [];

async function fetchRecipes() {
  const db = window.db;
  const getDocs = window.firestoreGetDocs;
  const collection = window.firestoreCollection;

  const querySnapshot = await getDocs(collection(db, "recipes"));
  const recipes = [];
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });
  return recipes;
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipesContainer');
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-name">${recipe.name}</div>
    `;
    card.addEventListener('click', () => showRecipeModal(recipe));
    container.appendChild(card);
  });
}

function showRecipeModal(recipe) {
  document.getElementById('modalTitle').textContent = recipe.name;
  document.getElementById('modalDescription').textContent = recipe.description;
  document.getElementById('modalImage').src = recipe.image;
  document.getElementById('modalServings').innerHTML = `<i class="fa fa-cutlery"></i> ${recipe.servings} servings`;
  document.getElementById('modalTime').innerHTML = `<i class="fa fa-clock-o"></i> ${recipe.prepTime} minutes`;

  const ingredientsList = document.getElementById('modalIngredients');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  const preparationList = document.getElementById('modalPreparation');
  preparationList.innerHTML = '';
  recipe.preparation.split('.').filter(step => step.trim()).forEach(step => {
    const li = document.createElement('li');
    li.textContent = step.trim();
    preparationList.appendChild(li);
  });

  document.getElementById('recipeModal').classList.remove('hidden');
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();

  const filtered = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
  );
  
  renderRecipes(filtered);
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('searchBtn').click();
  }
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('recipeModal').classList.add('hidden');
});

document.getElementById('addRecipeBtn').addEventListener('click', () => {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'add.html';
  }, 500);
});

window.onload = async () => {
  allRecipes = await fetchRecipes();
  renderRecipes(allRecipes);
};
