// This array will store all recipes fetched from the database.
let allRecipes = [];

/**
 * Asynchronously fetches recipes from the Firestore database.
 * @returns {Promise<Array>} A promise that resolves to an array of recipe objects.
 */
async function fetchRecipes() {
  // Access the Firestore database instance and necessary functions from the window object.
  const db = window.db;
  const getDocs = window.firestoreGetDocs;
  const collection = window.firestoreCollection;

  // Create a query snapshot of the 'recipes' collection.
  const querySnapshot = await getDocs(collection(db, "recipes"));
  const recipes = [];
  // Iterate over each document in the snapshot and push its data, along with its ID, into the recipes array.
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });
  return recipes;
}

/**
 * Renders the given array of recipes into the DOM.
 * @param {Array} recipes - An array of recipe objects to be rendered.
 */
function renderRecipes(recipes) {
  // Get the container element where recipes will be displayed.
  const container = document.getElementById('recipesContainer');
  // Clear any existing content in the container.
  container.innerHTML = '';

  // Iterate over each recipe and create a card for it.
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    // Populate the card with recipe image and name.
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-name">${recipe.name}</div>
    `;
    // Add a click event listener to show the recipe modal when the card is clicked.
    card.addEventListener('click', () => showRecipeModal(recipe));
    // Append the created card to the container.
    container.appendChild(card);
  });
}

/**
 * Displays a modal with detailed information about a selected recipe.
 * @param {Object} recipe - The recipe object to display in the modal.
 */
function showRecipeModal(recipe) {
  // Populate the modal with recipe details.
  document.getElementById('modalTitle').textContent = recipe.name;
  document.getElementById('modalDescription').textContent = recipe.description;
  document.getElementById('modalImage').src = recipe.image;
  document.getElementById('modalServings').innerHTML = `<i class="fa fa-cutlery"></i> ${recipe.servings} servings`;
  document.getElementById('modalTime').innerHTML = `<i class="fa fa-clock-o"></i> ${recipe.prepTime} minutes`;

  // Populate the ingredients list.
  const ingredientsList = document.getElementById('modalIngredients');
  ingredientsList.innerHTML = ''; // Clear previous ingredients
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // Populate the preparation steps list.
  const preparationList = document.getElementById('modalPreparation');
  preparationList.innerHTML = ''; // Clear previous preparation steps
  // Split the preparation string by '.' to get individual steps, filter out empty strings, and trim whitespace.
  recipe.preparation.split('.').filter(step => step.trim()).forEach(step => {
    const li = document.createElement('li');
    li.textContent = step.trim();
    preparationList.appendChild(li);
  });

  // Display the recipe modal by removing the 'hidden' class.
  document.getElementById('recipeModal').classList.remove('hidden');
}

// Event listener for the search input field to filter recipes as the user types.
document.getElementById('searchInput').addEventListener('input', (e) => {
  // Get the search query, convert to lowercase, and trim whitespace.
  const query = e.target.value.toLowerCase().trim();

  // Filter recipes based on whether the query matches recipe name, description, or any ingredient.
  const filtered = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
  );

  // Render the filtered recipes.
  renderRecipes(filtered);
});

// Event listener for the search input field to trigger search button click on 'Enter' key press.
document.getElementById('searchInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('searchBtn').click();
  }
});

// Event listener for the close button of the recipe modal to hide it.
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('recipeModal').classList.add('hidden');
});

// Event listener for the 'Add Recipe' button to navigate to the add recipe page with a fade-out effect.
document.getElementById('addRecipeBtn').addEventListener('click', () => {
  document.body.classList.add('fade-out'); // Add fade-out class to the body.
  // After a short delay, redirect to the 'add.html' page.
  setTimeout(() => {
    window.location.href = 'add.html';
  }, 500);
});

// This code runs when the entire page has loaded.
window.onload = async () => {
  // Fetch all recipes from the database and store them in the 'allRecipes' array.
  allRecipes = await fetchRecipes();
  // Render all fetched recipes initially.
  renderRecipes(allRecipes);
};
