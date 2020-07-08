// Show Class: Represents a Show
class Show {
  constructor(title, Stream, Seasons) {
    this.title = title;
    this.Stream = Stream;
    this.Seasons = Seasons;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayShows() {
    const shows = Store.getShows();

    shows.forEach(show => UI.addShowToList(show));
  }

  static addShowToList(show) {
    const list = document.querySelector("#show-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><h5>${show.title}</h5></td>
        <td><h5>${show.Stream}</h5></td>
        <td><h5>${show.Seasons}</h5></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
      `;

    list.appendChild(row);
  }

  static deleteShow(el) {
    //el targets the element
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#favourites");
    const form = document.querySelector("#show-form");
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#Stream").value = "";
    document.querySelector("#Seasons").value = "";
  }
}

// Store Class: Handles Storage in form of strings
class Store {
  static getShows() {
    let shows;
    if (localStorage.getItem("shows") === null) {
      shows = [];
    } else {
      shows = JSON.parse(localStorage.getItem("shows"));
    }

    return shows;
  }

  static addShow(show) {
    const shows = Store.getShows();
    shows.push(show);
    localStorage.setItem("shows", JSON.stringify(shows));
  }

  static removeShow(Seasons) {
    const shows = Store.getShows();

    shows.forEach((show, index) => {
      if (show.Seasons === Seasons) {
        shows.splice(index, 1);
      }
    });

    localStorage.setItem("shows", JSON.stringify(shows));
  }
}

// Event: Display shows
document.addEventListener("DOMContentLoaded", UI.displayShows);
// Event: Add a show
document.querySelector("#show-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector("#title").value;
  const Stream = document.querySelector("#Stream").value;
  const Seasons = document.querySelector("#Seasons").value;

  // Validate
  if (title === "" || Stream === "" || Seasons === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate show
    const show = new Show(title, Stream, Seasons);

    // Add show to UI
    UI.addShowToList(show);

    // Add show to store
    Store.addShow(show);

    // Show success message
    UI.showAlert("Show Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a show
document.querySelector("#show-list").addEventListener("click", e => {
  // Remove show from UI
  UI.deleteShow(e.target);

  // Remove show from store
  Store.removeShow(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert("Show Removed", "success");
});
