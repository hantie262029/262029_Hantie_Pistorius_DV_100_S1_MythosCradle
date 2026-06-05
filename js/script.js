// ## Search bar
let filterKeywords = ["Azuron", "Yuki", "Aurelia", "Lumina", "Starwind", "Briar"];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("search");

// Get the current page to get the anchor link to work correctly
const currentPage = window.location.href;
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

// ## Contact Form Time !!
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

// ## Counters
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

// ## Disable 'add to cart' buttons once clicked
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

// ## Cart

// List variable to store tasks
// Get saved tasks OR assigns as empty

// Hard-coding pet dictionary
const products = [
    {
        name: "Azuron",
        price: 2500,
        id: 1,
        petType: "Blue Dragon",
        quantity: 0,
    },
    {
        name: "Yuki",
        price: 4500,
        id: 2,
        petType: "Kitsune",
        quantity: 0,
    },
    {
        name: "Aurelia",
        price: 6500,
        id: 3,
        petType: "Griffin",
        quantity: 0,
    },
    {
        name: "Lumina",
        price: 4000,
        id: 4,
        petType: "Water Wisp",
        quantity: 0,
    },
    {
        name: "Starwind",
        price: 5000,
        id: 5,
        petType: "Pegasus",
        quantity: 0,
    },
    {
        name: "Briar",
        price: 3500,
        id: 6,
        petType: "Forest Spirit",
        quantity: 0,
    },
];

// SESSION STORAGE
let loadProducts = () => {
    // Retrieve last saved username from storage
    let storedProducts = sessionStorage.getItem("products");
};

// List variable to store cradle
// Get saved cradle OR assigns as empty
let cradle = JSON.parse(sessionStorage.getItem("cradle")) || [];

// Access HTML elements from other parts of the document
let cartBody = document.querySelector(".cartBody");
let cartFooter = document.querySelector(".cartFooter");
let cartItems = document.querySelector(".cradleItems");
let finishAdoptBtn = document.querySelector(".hideFinishCart");
let clearTasks = document.getElementById("clearTasks");
/*

DONE On 'Add to Cradle'-click, the const of products needs to be updated.
DONE This is done by getting the quantity from the input counter and populating the cradle

DONE Once a pet has been added to the cradle, update the products array/object and then populate the cradle array

in the cart, calculate the price per item by price * quantity
as well as the total cost of the cart

there should be a functioning +/-counters, rather than retrofitting the existing ones, i'll rewrite them
delete button

session storage needs to be updated on changing cart

if the cart length is 0, display a different message and overwrite '.hideFinishCart'

*/

// Add to Cradle Button click

function addToCradle(petName) {
    // Get the required quantity from form
    let adoptQuant = document.getElementById("adoptQuant" + petName).value;

    // Find the pet in the list of products that need to be updated
    const quant = products.find((item) => item.name == petName);

    // Update the existing Quantity in the products object
    quant.quantity = parseInt(adoptQuant);

    // Push to the cradle array and save
    cradle.push(quant);
    saveCradle();
}

// save the cradle
let saveCradle = () => {
    sessionStorage.setItem("cradle", JSON.stringify(cradle));
};

function viewCradle() {
    // If the cart is empty,
    if (cradle.length === 0) {
        cartFooter.innerHTML = `
                            <button
                            type="button"
                            class="btn btn-secondary buttonBase buttonCartModal"
                            data-bs-dismiss="modal">
                            Continue Searching
                        </button>`;
        cartBody.innerHTML = `
                            <div class="cartMessage">
                            <p>
                                Oh no! It seems like your cradle is currently empty. <br />
                                Please continue searching to find your perfect companion.
                            </p>
                        </div>`;
    } else {
        let cradleHTML = cradle.map(
            (pet) => `
                <div class="eachPetItem">
                    <div class="petDescriptionCard">
                        <h5> ${pet.name} - ${pet.petType}</h5>
                    </div>

                    <div class="petQuantityCard">
                        <div class="petCounterCard">
                            <button class="buttonCounter"><i class="fa-solid fa-minus"></i></button>
                            <p>${pet.quantity}</p>
                            <button class="buttonCounter"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="itemCost"><p>R ${(pet.quantity * pet.price).toFixed(2)}</p></div>
                        <button class="buttonCounter" id="deleteBtn"><i class="deleteBtn fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`,
        );
        cartItems.innerHTML = cradleHTML.join("");
    }
}

// Add the event listener stuff
window.addEventListener("DOMContentLoaded", loadProducts); // Important for session storage, manages the execution of the loadTasks function
