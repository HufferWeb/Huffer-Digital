document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submit
        var form = this;
        var data = new FormData(form);
    
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json' // This tells Formspree to send JSON response
            }
        }).then(response => {
            if (response.ok) {
                form.reset(); // Reset the form if you want
                alert('Thank you, I will reach out to you shortly'); // Show a success message or redirect
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            alert('Error: ' + error);
        });
    });

});

