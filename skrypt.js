addEventListener("DOMContentLoaded", function () {
  //&                 HAMBURGER MENU

  let hamburger_button = document.querySelector(".menu-hamburger");
  let active = 0;
  hamburger_button.addEventListener("click", function () {
    if (active == 0) {
      hamburger_button.classList.add("menu-hamburger--active");
      document.querySelector(".popping-menu").style.display = "flex";
      setTimeout(function () {
        document
          .querySelector(".popping-menu")
          .classList.add("popping-menu--active");
      }, 1);
      active = 1;
    } else {
      hamburger_button.classList.remove("menu-hamburger--active");
      document
        .querySelector(".popping-menu")
        .classList.remove("popping-menu--active");
      setTimeout(function () {
        document.querySelector(".popping-menu").style.display = "none";
      }, 400);
      active = 0;
    }
  });

  let menu_items = document.querySelectorAll(".popping-menu__item");
  let active_window = document.querySelector(".main__active");
  let done_window = document.querySelector(".main__done");
  let removed_window = document.querySelector(".main__removed");
  menu_items.forEach(function (menu_item) {
    menu_item.addEventListener("click", function () {
      switch (menu_item.innerHTML) {
        case "Active":
          console.log(menu_item.innerHTML);
          active_window.style.display = "flex";
          done_window.style.display = "none";
          removed_window.style.display = "none";
          break;
        case "Done":
          console.log(menu_item.innerHTML);
          active_window.style.display = "none";
          done_window.style.display = "flex";
          removed_window.style.display = "none";
          break;
        case "Removed":
          console.log(menu_item.innerHTML);
          active_window.style.display = "none";
          done_window.style.display = "none";
          removed_window.style.display = "flex";
          break;
      }
    });
  });

  //*               TASK INPUT
  let input_text = document.querySelector(".navbar__input");
  let input_submit = document.querySelector(".navbar__button");
  let input_value = null;
  let task_container = document.querySelector(".main__active");
  let task_index = 1;
  let task = null;
  let task_element = document.querySelectorAll(".task");
  let popup = document.querySelector(".popup");
  let selected_element = null;

  input_submit.addEventListener("click", function () {
    if (input_text.value == "") {
      alert("To pole nie moze byc puste");
    } else if (
      done_window.style.display == "flex" ||
      removed_window.style.display == "flex"
    ) {
      alert("Wróć do zakładki Active");
    } else {
      input_value = input_text.value;
      task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `${task_index}` + ".\xa0" + input_value;
      task_container.appendChild(task);
      task_index += 1;
      input_text.value = "";
      task_element = document.querySelectorAll(".task");
      task_element.forEach(function (element) {
        element.addEventListener("click", function (event) {
          event.stopPropagation();
          popup.style.display = "flex";
          selected_element = element;
        });
      });
    }
  });

  //!             Obsługa zdarzeń task

  document.addEventListener("click", function (event) {
    if (!popup.contains(event.target) && popup.style.display == "flex") {
      popup.style.display = "none";
    }
  });

  let task_option = document.querySelectorAll(".popup__button");
  let done_container = document.querySelector(".main__done");
  let removed_container = document.querySelector(".main__removed");
  task_option.forEach(function (task_choice) {
    task_choice.addEventListener("click", function () {
      switch (task_choice.innerHTML) {
        case "It's done":
          popup.style.display = "none";
          task_container.removeChild(selected_element);
          done_container.appendChild(selected_element);
          break;
        case "Remove it":
          popup.style.display = "none";
          task_container.removeChild(selected_element);
          removed_container.appendChild(selected_element);
          break;
      }
    });
  });
});
