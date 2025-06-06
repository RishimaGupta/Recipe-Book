/**
 * Load recipes from localStorage.
 * Returns an array of recipe objects or empty array if none found.
 */
function loadRecipes() {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Render recipe cards dynamically into the container.
 */
function renderRecipes(recipes) {
  const container = document.getElementById('recipesContainer');
  container.innerHTML = ''; // Clear existing content

  if (recipes.length === 0) {
    // Show message if no recipes found
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  // Create and append a card for each recipe
  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-name">${recipe.name}</div>
    `;
    // Show modal with details on card click
    card.addEventListener('click', () => showModal(recipe));
    container.appendChild(card);
  });
}

/**
 * Populate and display the modal with recipe details.
 */
function showModal(recipe) {
  document.getElementById('modalTitle').textContent = recipe.name;
  document.getElementById('modalDescription').textContent = recipe.description || '';
  document.getElementById('modalImage').src = recipe.image;

  // Update servings and prep time with icons
  document.getElementById('modalServings').innerHTML = `<i class="fa fa-user"></i> ${recipe.servings} servings`;
  document.getElementById('modalTime').innerHTML = `<i class="fa fa-clock"></i> ${recipe.prepTime} minutes`;

  // Populate ingredients list
  const ingredientsList = document.getElementById('modalIngredients');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });

  // Populate preparation steps list, splitting by newline
  const preparationList = document.getElementById('modalPreparation');
  preparationList.innerHTML = '';
  recipe.preparation.split('\n').forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    preparationList.appendChild(li);
  });

  // Show modal
  document.getElementById('recipeModal').classList.remove('hidden');
}

/**
 * Search recipes by name or ingredient matching the query (case-insensitive).
 * @param {string} query - Search term.
 * @returns {Array} Filtered array of recipes.
 */
function searchRecipes(query) {
  const allRecipes = loadRecipes();
  const lowerQuery = query.toLowerCase();
  return allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery))
  );
}

// Event: live search on input in the search bar
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.trim();
  // Render filtered results or all recipes if empty
  renderRecipes(query ? searchRecipes(query) : loadRecipes());
});

// Event: Navigate to add recipe page with fade-out effect
document.getElementById('addRecipeBtn').addEventListener('click', () => {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'add.html';
  }, 500);
});

// Event: Close modal when clicking close button
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('recipeModal').classList.add('hidden');
});

// Event: Close modal when clicking outside modal content area
window.addEventListener('click', (e) => {
  const modal = document.getElementById('recipeModal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Initial render of all recipes on page load
renderRecipes(loadRecipes());
