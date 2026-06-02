// Search bar
let filterKeywords = ["Azuron", "Yuki", "Aurelia", "Lumina", "Starwind", "Briar"];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("search");

// Get the current page to get the anchor link to work correctly
const currentPage = window.location.href;

//
inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;

    // If there is something in the searchbar, compare it to the available filtered keywords
    if (input.length) {
        result = filterKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }

    display(result);

    // If there are NO results, ie nothing in the search bar, make sure nothing gets shown
    if (!result.length) {
        resultsBox.innerHTML = "";
    }
};

// Write out a list of the available search results
function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

// Updated what gets shown in the search bar and 'update' the href of the search button
function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = "";

    let output = ``;

    // The home page needs a different link to page than the other two pages
    // This only works when running the live server from one of the pages (:
    // There must be a better way of doing this but I couldn't figure it out

    // Check if the page is the index page
    if (currentPage.includes("index")) {
        output = `
            <a class="searchItem" id="searchButton" href="pages/about.html#adopt${list.innerHTML}">
            <i class="fa-solid fa-magnifying-glass"></i></a>`;
    } else {
        output = `
            <a class="searchItem" id="searchButton" href="about.html#adopt${list.innerHTML}">
            <i class="fa-solid fa-magnifying-glass"></i></a>`;
    }
    // Write the anchor links of the search button to go to the relevant adopt page
    document.getElementById("searchButtonDiv").innerHTML = output;
}

// Contact Form Time !!
// Get Form data
contactFormFunction = () => {
    let form = document.forms["filledForm"];
    form.addEventListener("submit", getFormInfo);

    // Extract the Form data into an object
    function getFormInfo(event) {
        // Denying of placeholder text
        event.preventDefault();

        // Create the object that will store the form data
        let formData = {
            "name": this["name"].value,
            "email": this["email"].value,
            "subject": this["subject"].value,
            "message": this["message"].value,
        };

        // Write the HTML to the variable to be interpolated
        let output = `
            <p>
                Thank you, <span>${formData["name"]}</span> for your message!
            </p>
            <p>
                We will contact you soon
            </p>
        `;

        // Select the HTML Section to update
        let outSection = document.querySelector(".outputContainer");

        // Get and populate a Modal from bootstrap and show
        // Populating the section of the bootstrap modal
        outSection.innerHTML = output;

        // Get corresponding HTML element
        let formModal = new bootstrap.Modal(document.getElementById("formModal"));

        // Show Modal
        formModal.show();

        // Clear Form
        form.reset();
    }
};

// Counter
// Used for add and subtract buttons on adopt page and in cart
countMe = (operator, petID) => {
    // Extract element from HTML
    let num = document.getElementById(petID).value;

    // Minus, making the minimum that can be added 1
    if (operator == "minus") {
        if (num > 1) {
            num -= 1;
        }
    }

    // Plus, making the maximum that can be added 50
    // This is arbitrary but I don't want to add too many
    if (operator == "plus") {
        if (num < 50) {
            num++;
        }
    }
    document.getElementById(petID).value = num;
};

// Disable 'add to cart' buttons once they have been clicked once
// this might actually all still change based on the add to cart functionality
let btns = document.querySelectorAll(".addToCradleButton");

btns.forEach(disableBtn);
console.log(btns);
function disableBtn(btn) {
    btn.addEventListener("click", () => {
        // Set the button to be disabled after click
        btn.disabled = true;

        // change the text
        btn.textContent = "Added to cart";
    });
}
