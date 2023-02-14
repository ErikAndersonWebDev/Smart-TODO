const { response } = require("express");

// Client facing scripts here
$(() => {
  // $('#fetch-users').on('click', () => {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/users'
  //   })
  //   .done((response) => {
  //     const $usersList = $('#users');
  //     $usersList.empty();

  //     for(const user of response.users) {
  //       $(`<li class="user">`).text(user.name).appendTo($usersList);
  //     }
  //   });
  // });

  //Check if a user exists with a given username and password

  $('#subscription-form').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior
    let formData = new FormData(this); // get form data
    $.ajax({
      method: 'POST',
      url: '/api/subscribe',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function(data) {
        // handle success response from server
        alert('You have successfully subscribed!');
      },
      error: function(error) {
        // handle error response from server
        alert('Subscription failed.');
      }
    });
  });

  // Intercept the form submission event
  $('#login-form').on('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the user's credentials from the form
    var username = $('#username-input').val();
    var password = $('#password-input').val();

    // Send an AJAX request to the server
    $.ajax({
      url: '/login',
      method: 'POST',
      data: { username: username, password: password },
      success: function(response) {
        // If the login was successful, update the UI
        if (response.success) {
          $('#login-form').hide();
          $('#welcome-message').text('Welcome, ' + username + '!');
        } else {
          // If the login failed, display an error message
          $('#error-message').text('Invalid username or password');
        }
      }
    });
  });



});
