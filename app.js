"use strict";
const container = document.querySelector(".job-container");
const filters = document.querySelector(".filter-items");
const filterBox = document.querySelector(".filter-section");
const filterTags = document.querySelectorAll(".filter-tags");
const clearBtn = document.querySelector(".clear-filters");

data.forEach(function (job) {
  let html = `
    <div class="job-listing">
    <div class="job-info">
      <div class="company-img">
        <img src="${job.logo}" alt="Logo" />
      </div>
      <div class="job-description">
        <span class="company">${job.company}</span>
        ${job.new ? `<span class="new">New!</span>` : ""}
        ${job.featured ? `<span class="featured">Featured</span>` : ""}
        <p><strong>${job.position}</strong></p>
        <div class="extra-info">
          <span>${job.postedAt} </span>
          <span>*</span>
          <span>${job.contract} </span>
          <span>*</span>
          <span>${job.location}</span>
        </div>
        <!-- <span class="extra-info">  </span> -->
      </div>
    </div>
    <!-- Role -->
    <div class="tags">
   
    <span onClick="tagHunt(this)">${job.role}</span>
      

      <!-- Level -->
      <span onClick="tagHunt(this)">${job.level}</span>

      <!-- Languages -->
     
      <span class= "testing" onClick="tagHunt(this)">${job.languages[0]}</span>
      ${
        job.languages.length > 1
          ? `<span onClick="tagHunt(this)">${job.languages[1]}</span>`
          : ""
      }
      ${
        job.languages.length > 2
          ? `<span onClick="tagHunt(this)">${job.languages[2]}</span>`
          : ""
      }
      ${
        job.tools.length > 0
          ? `<span onClick="tagHunt(this)">${job.tools[0]}</span>`
          : ""
      }
      ${
        job.tools.length > 1
          ? `<span onClick="tagHunt(this)">${job.tools[1]}</span>`
          : ""
      }
      ${
        job.tools.length > 2
          ? `<span onClick="tagHunt(this)">${job.tools[2]}</span>`
          : ""
      }
      
    </div>

  </div>`;

  container.insertAdjacentHTML("beforeend", html);
});

console.log(data[9].languages.join(","));

let currentFilters = [];
const tagHunt = function (value) {
  if (currentFilters.includes(value.innerHTML)) {
    return;
  } else {
    currentFilters.push(value.innerHTML);
    currentFilters.length > 0 ? clearBtn.classList.remove("hidden") : "";
    let html = `<span class=${value.innerHTML}>${value.innerHTML}<button class=${value.innerHTML} onClick="deleteTag(this)">X</button></span>`;
    filters.insertAdjacentHTML("afterend", html);
  }
};

const deleteTag = function (classID) {
  const deletedItem = currentFilters.indexOf(`${classID.className}`);
  filterBox.querySelector(`.${classID.className}`).remove();
  currentFilters.splice(deletedItem, 1);
  currentFilters.length === 0 ? clearBtn.classList.add("hidden") : "";
};

const clearAll = function () {
  currentFilters.forEach(function (filter) {
    filterBox.querySelector(`.${filter}`).remove();
  });
  currentFilters = [];
  clearBtn.classList.add("hidden");
};
