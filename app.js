"use strict";
const container = document.querySelector(".job-container");
const filters = document.querySelector(".filter-items");
const filterBox = document.querySelector(".filter-section");
const filterTags = document.querySelectorAll(".filter-tags");
const clearBtn = document.querySelector(".clear-filters");

//function for clearing the whole job listing
const clearPage = function () {
  document.querySelectorAll(".job-listing").forEach((item) => {
    item.remove();
  });
};

let languageList = [];

let toolsList = [];

let roleList = [];

let levelList = [];
for (const [key, value] of Object.entries(data)) {
  value.languages.forEach(function (language) {
    languageList.push(language);
  });

  value.tools.forEach(function (tool) {
    toolsList.push(tool);
  });

  roleList.push(value.role);

  levelList.push(value.level);
}

//Language tags
const languageFilters = [...new Set(languageList)];

//tools tags
const toolsFilters = [...new Set(toolsList)];

//role tags
const roleFilters = [...new Set(roleList)];

//level tags
const levelFilters = [...new Set(levelList)];

let currentJobs;
let currentFilters = [];

//RENDER METHOD
const renderData = function () {
  //Clear site of every previous content
  clearPage();
  currentJobs = data;

  //FILTER PROCESS

  const currentFiltersTags = (currentTags, filterCategory) => {
    return filterCategory.filter((tag) =>
      currentTags.some((filter) => tag.includes(filter))
    );
  };

  ////////////////
  // currentJobs = currentJobs.forEach(function (item) {
  //   console.log(item);
  //   currentFiltersTags(item.languages, currentFilters);

  //   currentFiltersTags(item.tools, currentFilters);
  //   currentFiltersTags(item.role, currentFilters);
  //   currentFiltersTags(item.level, currentFilters);
  // });
  // console.log(currentJobs);

  // let array2;
  // const filterMethod = function (array) {
  //   array.forEach(function (item) {
  //     array2 = currentFiltersTags(item.languages, currentFilters);
  //     // currentFiltersTags(item.tools, currentFilters);
  //     // currentFiltersTags(item.role, currentFilters);
  //     // currentFiltersTags(item.level, currentFilters);
  //   });
  //   return array2;
  // };

  // currentJobs = filterMethod(currentJobs);
  // console.log(currentJobs);

  ////////////////

  //LANGUAGE FILTER

  const currentLanguageFilters = currentFiltersTags(
    currentFilters,
    languageFilters
  );

  const filterByLanguage = (list, filters) => {
    return list.filter((job) =>
      filters.every((filter) => job.languages.includes(filter))
    );
  };

  currentLanguageFilters.length > 0 &&
    (currentJobs = filterByLanguage(data, currentLanguageFilters));

  //TOOL FILTER
  const currentToolTags = currentFiltersTags(currentFilters, toolsFilters);

  const filterByTools = (list, filters) => {
    return list.filter((job) =>
      filters.every((filter) => job.tools.includes(filter))
    );
  };

  currentToolTags.length > 0 &&
    (currentJobs = filterByTools(currentJobs, currentToolTags));

  //ROLE FILTER
  const filterByRole = (list, filters) => {
    return list.filter((job) =>
      filters.every((filter) => job.role.includes(filter))
    );
  };

  const currentRoleFilters = currentFiltersTags(currentFilters, roleFilters);

  currentRoleFilters.length > 0 &&
    (currentJobs = filterByRole(currentJobs, currentRoleFilters));

  //  LEVEL FILTER
  const filterByLevel = (list, filters) => {
    return list.filter((job) =>
      filters.every((filter) => job.level.includes(filter))
    );
  };

  const currentLevelFilters = currentFiltersTags(currentFilters, levelFilters);

  currentLevelFilters.length > 0 &&
    (currentJobs = filterByLevel(currentJobs, currentLevelFilters));

  //JOB LISTING CONTENT
  currentJobs.forEach(function (job) {
    let [language1, language2, language3] = job.languages;
    let [tool1, tool2, tool3] = job.tools;
    let html = `
    <div class="job-listing">
    <div class="job-info" onClick="highlight(this)">
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
    <hr>
    <!-- Role -->
    <div class="tags">
   
    <span onClick="tagHunt(this)">${job.role}</span>
      

      <!-- Level -->
      <span onClick="tagHunt(this)">${job.level}</span>

      <!-- Languages -->
  
      
     
      <span onClick="tagHunt(this)">${language1}</span>
      ${
        job.languages.length > 1
          ? `<span onClick="tagHunt(this)">${language2}</span>`
          : ""
      }
      ${
        job.languages.length > 2
          ? `<span onClick="tagHunt(this)">${language3}</span>`
          : ""
      }
      ${
        job.tools.length > 0
          ? `<span onClick="tagHunt(this)">${tool1}</span>`
          : ""
      }
      ${
        job.tools.length > 1
          ? `<span onClick="tagHunt(this)">${tool2}</span>`
          : ""
      }
      ${
        job.tools.length > 2
          ? `<span onClick="tagHunt(this)">${tool3}</span>`
          : ""
      }
      
    </div>

  </div>`;

    container.insertAdjacentHTML("beforeend", html);
  });
};

//initialize function upon loading the page
renderData();

//Adding tag towards filter section and applying it with renderData function

const tagHunt = function (tag) {
  //if filter tag is clicked on but is already present in filter section
  if (currentFilters.includes(tag.innerHTML)) {
    return;
  } else {
    currentFilters.push(tag.innerHTML);
    //show filter section
    currentFilters.length > 0 && clearBtn.classList.remove("hidden");
    let html = `<span class=${tag.innerHTML}>${tag.innerHTML}<button class=${tag.innerHTML} onClick="deleteTag(this)"><i class="fas fa-times fa-lg"></i></button></span>`;
    filters.insertAdjacentHTML("afterend", html);
    renderData();
  }
};

const deleteTag = function (tagClass) {
  const deletedItem = currentFilters.indexOf(`${tagClass.className}`);
  filterBox.querySelector(`.${tagClass.className}`).remove();
  currentFilters.splice(deletedItem, 1);
  currentFilters.length === 0 ? clearBtn.classList.add("hidden") : "";
  renderData();
};

//clear all filters when clear button is clicked
const clearAll = function () {
  currentFilters.forEach(function (filter) {
    filterBox.querySelector(`.${filter}`).remove();
  });
  currentFilters = [];
  clearBtn.classList.add("hidden");
  renderData();
};

const highlight = function (item) {
  item.parentNode.classList.toggle("selected");
};

///////////////////////////////////////
