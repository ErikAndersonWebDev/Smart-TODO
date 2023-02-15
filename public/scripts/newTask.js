const db_queries = require('../../db/queries/tasks.js');
$(document).ready(function() {



  const createTaskElement = function(task) {

    const category = task.category;
    const task = task.task;

    // let categoryMap = { watch: "#45c4b0", read: '#ca06ec', eat: '#7c001d', buy: '#0109ea' };

    // for (let key in categoryMap) {
    //   if (category.includes(key)) {
    //     $task.css('border-left', `solid 10px ${categoryMap[key]}`);
    //   }
    // }
    const $task = $(`
            <article class="${category}" id="taskArticle">
            <lable>${category}: ${task}</lable>
            <i id="star" class="fa-regular fa-star"></i>
            <i id="delete" class="fa-regular fa-circle-xmark"></i>
            <i id="folder" class="fa-regular fa-folder"></i>
            </article>`);

    return $task;

  };

  //error handler function
  const appendError = (errorMessage) => {
    // $(".errorContainer").css("visibility", "visible");
    $(".errorContainer").text(errorMessage).slideDown().delay(3000);
  };

  //Defining an action for submit button of form utilizing AJAX
  $(".taskForm").submit(function(event) {
    event.preventDefault();
    const $text = $("#newTask").val();
    if ($text.length < 3) {
      appendError(
        `🚫 Your text should has more than 3 characters.`
      );
    }

    const serilizedData = $(this).serialize();
    $.ajax("/tasks", { method: "POST", data: serilizedData }).then(() => {
      $("#newTask").empty();
      loadTasks();
    });

  });

  //send a get request to backend with the name of "/tasks"
  const loadTasks = () => {
    const arrayOfUserTasks = db_queries.getAllUserTasks();

    renderTasks(arrayOfUserTasks);

  };
  //To render a new task and append it to the end of tasks
  const renderTasks = function(arrayOfTaskObj) {
    for (let item of arrayOfTaskObj) {
      const $task = createTaskElement(item);
      $("#taskSection").prepend($task);
    }
  };
  loadTasks();

});
