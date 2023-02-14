
$(document).ready(function() {

  const createTaskElement = function(task) {

    const categoryFromApi = () => {
      return new Promise(task).then(res => { return res.category; });
    };

    const $task = $(`
            <article id="taskArticle">
            <lable>${categoryFromApi}: ${$taskCommand}</lable>
            <i id="star" class="fa-regular fa-star"></i>
            <i id="flag" class="fa-regular fa-flag"></i>
            <i id="delete" class="fa-regular fa-circle-xmark"></i>
            <i id="folder" class="fa-regular fa-folder"></i>
          </article>`);

    let categoryMap = { watch: "#45c4b0", read: '#ca06ec', eat: '#7c001d', buy: '#0109ea' };

    for (let key in categoryMap) {
      if (categoryFromApi.includes(key)) {
        $task.css('border-left', `solid 10px ${categoryMap[key]}`);
      }
    }
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
      reset();
      loadTasks();
    });

  });

  //To render a new task and append it to the end of tasks
  const renderTasks = function(arrayOfTaskObj) {
    $("#newTask").empty();
    for (let item of arrayOfTaskObj) {
      const $task = createTaskElement(item);
      $("#taskSection").prepend($task);
    }
  };

  //send a get request to backend with the name of "/tasks"
  const loadTasks = () => {
    $.get("/tasks").then((data) => {
      renderTasks(data);
    });
  };

  loadTasks();

});
