function loadRecipes() {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : [];
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipesContainer');
  container.innerHTML = '';

  if (recipes.length === 0) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-name">${recipe.name}</div>
    `;
    card.addEventListener('click', () => showModal(recipe));
    container.appendChild(card);
  });
}

function showModal(recipe) {
  document.getElementById('modalTitle').textContent = recipe.name;
  document.getElementById('modalDescription').textContent = recipe.description || '';
  document.getElementById('modalImage').src = recipe.image;
  document.getElementById('modalServings').innerHTML = `<i class="fa fa-user"></i> ${recipe.servings} servings`;
  document.getElementById('modalTime').innerHTML = `<i class="fa fa-clock"></i> ${recipe.prepTime} minutes`;

  const ingredientsList = document.getElementById('modalIngredients');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });

  const preparationList = document.getElementById('modalPreparation');
  preparationList.innerHTML = '';
  recipe.preparation.split('\n').forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    preparationList.appendChild(li);
  });

  document.getElementById('recipeModal').classList.remove('hidden');
}

function searchRecipes(query) {
  const allRecipes = loadRecipes();
  const lowerQuery = query.toLowerCase();
  return allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery))
  );
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.trim();
  renderRecipes(query ? searchRecipes(query) : loadRecipes());
});

document.getElementById('addRecipeBtn').addEventListener('click', () => {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'add.html';
  }, 500);
});
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('recipeModal').classList.add('hidden');
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('recipeModal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


renderRecipes(loadRecipes()); 