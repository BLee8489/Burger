// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

// UPDATE
  const devourBurgerBtn = document.querySelectorAll(".devour-button");

// Set up the event listener for the create button
  if (devourBurgerBtn) {
    devourBurgerBtn.forEach((button) => {
      button.addEventListener("click", (e) => {

// Grabs the id of the element "id"
        const id = e.target.getAttribute("data-id");
        const burgerDevoured = e.target.getAttribute("data-devoured");

        const eatenBurger = {
          devoured: burgerDevoured,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

// Make sure to serialize the JSON body
          body: JSON.stringify(eatenBurger),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devour to: ${burgerDevoured}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

// CREATE
  const createBurgerBtn = document.getElementById('create-form');

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

// Grabs the value of the textarea "quote"
      const newBurger = {
        burger_name: document.getElementById('burger-name').value.trim(),
        devoured: false,
      };

// Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        },

// Make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        document.getElementById('burger-name').value = '';

// Reload the page so the user can see the new quote
        console.log('Added a new burger!');
        location.reload();
      });
    });
  }

// DELETE
  const deleteBurgerBtn = document.querySelectorAll('.delete-burger');

// Set up the event listeners for each delete button
  deleteBurgerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');

      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        location.reload();
      });
    });
  });
});
