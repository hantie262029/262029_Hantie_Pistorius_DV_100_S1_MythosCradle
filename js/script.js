// Contact Form Time !!
// Get Form data

contactFormFunction = () => {
    let form = document.forms['filledForm'];
    form.addEventListener('submit', getFormInfo);

    // Extract the Form data into an object
    function getFormInfo(event){
        // Denying of placeholder text
        event.preventDefault();

        // Create the object that will store the form data
        let formData = {
            'name' : this['name'].value,
            'email' : this['email'].value,
            'subject' : this['subject'].value,
            'message' : this['message'].value
        };

        // Write the HTML to the variable to be interpolated
        let output = `
            <p>
                Thank you, <span>${formData['name']}</span> for your message!
            </p>
            <p>
                We will contact you soon
            </p>
        `;

        // Select the HTML Section to update
        let outSection = document.querySelector('.outputContainer');


        // Get and populate a Modal from bootstrap and show
        // Populating the section of the bootstrap modal
        outSection.innerHTML = output;

        // Get corresponding HTML element
        let formModal = new bootstrap.Modal(
            document.getElementById('formModal')
        );

        // Show Modal
        formModal.show();

        // Clear Form
        form.reset();
    };
};

// Counter
// Used for add and subtract buttons on adopt page and in cart
countMe = (operator, petID) => {
    // Extract element from HTML
    let num = document.getElementById(petID).value;

    // Minus, making
    if (operator == 'minus' ){
        if (num > 1){
            num -=1;
        }
    };

    if (operator == 'plus' ){
        if (num < 50){
            num ++ ;
        }
    };
    document.getElementById(petID).value = num;
};
