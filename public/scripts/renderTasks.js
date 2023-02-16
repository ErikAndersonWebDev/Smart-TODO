let renderTasks = function(tasks) {
  $('#task-container').empty(); //add id to the section
  // loops through tasks
  for (const task of tasks) {
    // calls createTaskElement for each task
    const newTask = createTaskElement(task); //createTaskElement.js
    // takes return value and appends it to the task container
    $('#task-container').append(newTask);
  }
  $(".fa-circle-xmark").on("click", function (event) {
    event.preventDefault();

    const taskId = $(this).data("taskid");

    $.ajax({
      url:`http://localhost:8080/api/tasks/delete/${taskId}`,
      method: 'POST'
    })
      .then(loadTasks) //function from client.js
      .fail(handleServerError)
  });

  $(".fa-folder").on("click", function (event) {
    event.preventDefault();
    $(this).parent().siblings(".dropdown-content").slideToggle("slow")
  });

  $(".dropdown-element").on("click", function (event) {
    event.preventDefault();

    const newCategory = $(this).text();
    const taskId = $(this).data("taskid");

    $.ajax({
      url:`http://localhost:8080/api/tasks/change/${taskId}`,
      method: 'POST',
      data: JSON.stringify({newCategory}),
      dataType: 'json',
      contentType: 'application/json',
    })
      .then(loadTasks) //function from client.js
      .fail(handleServerError)
  });
};
