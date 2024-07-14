/**
 * Manipulating the DOM exercise.
 * 
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation, and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 * 
 * These variables are used throughout the script to interact with the DOM elements.
 */
const sections = document.querySelectorAll('section');  // All sections on the page
const navList = document.getElementById('navbar__list');  // Navigation menu list

/**
 * Start Helper Functions
 * 
 * These helper functions simplify main functions and improve code organization.
 */

/**
 * Build the navigation menu dynamically from the sections present on the page.
 */
function buildNavigation() {
  sections.forEach(section => {
    // Create a list item element
    const listItem = document.createElement('li');

    // Create a link element
    const link = document.createElement('a');
    link.className = 'menu__link';
    link.href = `#${section.id}`;
    link.textContent = section.dataset.nav;

    // Add the link to the list item
    listItem.appendChild(link);

    // Add the list item to the navigation menu
    navList.appendChild(listItem);
  });
}

/**
 * Add 'active' class to section when it is near the top of the viewport.
 * This method is used with getBoundingClientRect().
 */
function setActiveSection() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    // Check if section is in the viewport
    if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
      section.classList.add('your-active-class');
      document.querySelector(`a[href="#${section.id}"]`).classList.add('active');
    } else {
      section.classList.remove('your-active-class');
      document.querySelector(`a[href="#${section.id}"]`).classList.remove('active');
    }
  });
}

/**
 * Scroll to anchor ID using scrollIntoView method.
 * This method is called when a navigation link is clicked.
 */
function scrollToSection(event) {
  // Prevent the default action of the link
  event.preventDefault();

  // Get the section ID from the clicked link's href attribute
  const targetId = event.target.getAttribute('href');

  // Check if the target ID is valid before scrolling
  if (targetId && document.querySelector(targetId)) {
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error(`No element found with ID: ${targetId}`);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 * These main functions set up the core functionality of the page.
 */

/**
 * Initialize the page by building the navigation menu and setting up the Intersection Observer.
 */
function init() {
  buildNavigation();  // Build the navigation menu

  // Add scroll event listener to update active section on scroll
  window.addEventListener('scroll', setActiveSection);

  // Add click event listeners to the navigation links
  navList.addEventListener('click', scrollToSection);
}

/**
 * End Main Functions
 * Begin Events
 * 
 * Initialize the page when the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', init);
