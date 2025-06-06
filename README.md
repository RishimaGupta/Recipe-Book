# Recipe Book <br>
## Project Overview <br>
This is a multi-page interactive digital Recipe Book built using only HTML, CSS, and JavaScript — no frameworks or libraries required. Add, view, and search through your favorite recipes in a stylish and animated book-like interface that stores everything right in your browser using localStorage. <br>

## Key Features Implemented <br>
* *Animated Opening Page:* Includes a visually engaging page-turn animation to simulate a real book opening. <br>
* *Multi-Page Navigation:* Separate pages for the welcome screen (`index.html`), recipe list (`home.html`), and recipe creation (`add.html`). <br>
* *Add Recipe Form:* Users can input the recipe title, description, ingredients, preparation steps, prep time, servings, and upload an image. <br>
* *Live Search Functionality:* Instantly filter recipes by title or ingredients with a responsive search bar. <br>
* *Recipe Cards with Modal View:* Recipes are displayed as cards; clicking a card opens a modal showing full details with image, ingredients, and steps. <br>
* *Persistent Storage:* All recipes are stored using `localStorage`, so they remain available even after refreshing or closing the browser. <br>
* *Smooth Page Transitions:* Delayed navigation and transition effects enhance the book-like experience when turning pages. <br>

## How to Use <br>
1. *Open the App:* Launch `index.html` in a browser. <br>
2. *Turn the Page:* Click the arrow on the cover to flip to the home page. <br>
3. *View Recipes:* Browse existing recipes shown as interactive cards. <br>
4. *Search Recipes:* Use the search input to filter recipes in real-time. <br>
5. *View Full Recipe:* Click any recipe card to open a modal with full details. <br>
6. *Add a New Recipe:* Click the "Add New Recipe" button to go to the form page. <br>
7. *Submit Recipe:* Fill in all fields and upload an image to create a new recipe. It will instantly appear on the home page. <br>
8. *Enjoy Offline:* Everything is stored locally — no internet or login required after first load. <br>

## Technologies Used <br>
* *HTML5:* Structured multi-page layout and semantic elements for content. <br>
* *CSS3:* Custom styling, page transition effects, modal design, and responsive layouts. <br>
* *JavaScript (ES6+):* DOM manipulation, localStorage handling, form validation, modal logic, and dynamic content rendering. <br>

## Development Highlights <br>
* *Realistic Page Flip Animation:* CSS-based animation with delayed JavaScript redirection simulates a book-opening experience. <br>
* *Form Handling & Validation:* JavaScript ensures all required recipe data is collected and validated before saving. <br>
* *Base64 Image Encoding:* Uploaded recipe images are converted and stored in base64 format in localStorage for portability. <br>
* *Modular File Structure:* HTML, CSS, and JS are organized per page for maintainability and clarity. <br>
* *Custom Modal Implementation:* A lightweight, reusable modal system built from scratch using only HTML, CSS, and JavaScript. <br>
* *Offline Usability:* Fully functional with no server or API required, thanks to localStorage. <br>
