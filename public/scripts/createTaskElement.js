const createTaskElement = function (task) {
  const itemName = task.task;
  const itemId = task.id;
  const category = task.category.replace("To ", "");
  const $task = `
          <div>
          <article class="taskArticle" id="${category}">
            <lable>${itemName}</lable>
              <i  class="fa-regular fa-star"></i>
              <i  class="fa-regular fa-circle-xmark" data-taskid="${itemId}"></i>
              <i  class="fa-regular fa-folder"></i>
          </article>
          <div class="dropdown-content">
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Watch</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Eat</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Read</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Buy</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">Other</span>
          </div>
          </div>
        `;

  return $task;
};
