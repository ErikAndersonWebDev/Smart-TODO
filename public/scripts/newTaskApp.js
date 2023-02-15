$(document).ready(function() {

  const createTaskElement = function(taskDataObj) {
    const category = taskDataObj.category;
    const task = taskDataObj.task;

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
    $(".errorContainer").text(errorMessage).slideDown().delay(3000);
  };

  $(".taskForm").submit(function(event) {
    event.preventDefault();
    const $text = $("#newTask").val();
    if ($text.length < 3) {
      appendError(
        `🚫 Your text should has more than 3 characters.`
      );
    }

    const serilizedData = $("#newTask").serialize();
    $.ajax("/create", { method: "POST", data: serilizedData })
      .then(() => {
        $("#newTask").empty();
      });

    $.get("/").then((jasonData) => {
      const task = createTaskElement(jasonData);
      $("#taskSection").prepend(task);
    });
  });

});
