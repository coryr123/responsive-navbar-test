document.addEventListener('DOMContentLoaded', () => {

// create variables for toggle-button, navigation-bar, and navbar-links

const toggleBtn = document.getElementsByClassName('toggle-button')[0];
const navbar = document.getElementsByClassName('navigation-bar')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

// event handling for toggle-button
toggleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navbar.classList.toggle('active');
    navbarLinks.classList.toggle('active');

    //change aria state when menu toggled
    const isExpanded = navbar.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    navbarLinks.setAttribute('aria-hidden', !isExpanded);
})
// create variables for search-toggle, search-container, avatar, back-button

const searchToggle = document.getElementsByClassName('search-toggle')[0];
const searchContainer = document.getElementsByClassName('search-container')[0];
const avatar = document.getElementsByClassName('avatar')[0];
const offCanvas = document.getElementById('toggleOffcanvas');
const backBtn = document.getElementsByClassName('back-button')[0];

//create toggle group class for search-container elements + avatar
class SearchToggleGroup {
    //constructor is passed an array of elements and additional optional methods for added functionality
    constructor(elements, { onToggle } = {}) {
        this.elements = elements;
        this.onToggle = onToggle;
    }
    //for each element in array, toggle the active state
    toggle = (event) => {
        event.preventDefault();
        this.elements.forEach(element => element.classList.toggle('active'));

        //if onToggle method passed, execute as part of toggle event
        if (this.onToggle) {
            this.onToggle();
        }
    }
    //event handler that triggers the toggle event on click
    addClickHandler(onClickElement) {
        onClickElement.addEventListener('click', this.toggle);
    }
}

//instantiate a SearchToggleGroup object
const searchToggleGroup = new SearchToggleGroup([searchContainer, searchToggle, avatar, offCanvas, backBtn],
    {
        onToggle: () => {
            //if navbar expanded, clicking the search-toggle button will collapse it
            if (navbar.classList.contains('active')) {
                //store value of navbar height transition time
                const heightTransitionTime = getComputedStyle(navbar).transitionDuration;

                //change transition to happen immediately (needs to be faster than 
                //the search-container transition)
                navbar.style.transitionDuration = '0s';

                navbar.classList.remove('active');
                navbarLinks.classList.remove('active');
                toggleBtn.classList.remove('active');
                //change aria state
                toggleBtn.setAttribute('aria-expanded', false);
                navbarLinks.setAttribute('aria-hidden', true);

                //restore original transition time after 50ms
                setTimeout(() => {
                    navbar.style.transitionDuration = heightTransitionTime;
                }, 50);
            }
        }
    }
);

//add a click handler for the search toggle and the back button
searchToggleGroup.addClickHandler(searchToggle);
searchToggleGroup.addClickHandler(backBtn);

//event handling for search-toggle button
// searchToggle.addEventListener('click', (event) => {
//     event.preventDefault
//     searchContainer.classList.toggle('active')
//     searchToggle.classList.toggle('active')
//     avatar.classList.toggle('active')
//     backBtn.classList.toggle('active')
// })

});