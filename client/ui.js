const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = taskForm["name"].value;
  const description = taskForm["description"].value;

  App.createTask(name, description);
});
