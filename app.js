"use strict";
const container = document.querySelector(".job-container");
const filters = document.querySelector(".filter-items");
const filterBox = document.querySelector(".filter-section");
const filterTags = document.querySelectorAll(".filter-tags");
const clearBtn = document.querySelector(".clear-filters");

let currentFilters = [];

const clearPage = function () {
  document.querySelectorAll(".job-listing").forEach((item) => {
    item.remove();
  });
};

//Language filters list
let languageList = [];
for (const [key, value] of Object.entries(data)) {
  value.languages.forEach(function (language) {
    languageList.push(language);
  });
}

const languageFilters = [...new Set(languageList)];

//tool filters list
let toolsList = [];
for (const [key, value] of Object.entries(data)) {
  value.tools.forEach(function (tool) {
    toolsList.push(tool);
  });
}

const toolsFilters = [...new Set(toolsList)];

//role filters list
let roleList = [];
for (const [key, value] of Object.entries(data)) {
  roleList.push(value.role);
}

const roleFilters = [...new Set(roleList)];

//level filters list
let levelList = [];
for (const [key, value] of Object.entries(data)) {
  levelList.push(value.level);
}

const levelFilters = [...new Set(levelList)];

let currentJobs;
const renderData = function () {
  //Clear site of every previous content
  clearPage();
  currentJobs = data;

  //FILTER PROCESS

  const currentFiltersTags = (list, filterList) => {
    return filterList.filter((tag) =>
      list.some((filter) => tag.includes(filter))
    );
  };

  //LANGUAGE FILTER
  let currentLanguageFilters = [];
  currentLanguageFilters = currentFiltersTags(currentFilters, languageFilters);

  const filterByLanguage = (list, filters) => {
    return list.filter((person) =>
      filters.every((filter) => person.languages.includes(filter))
    );
  };

  currentLanguageFilters.length > 0
    ? (currentJobs = filterByLanguage(data, currentLanguageFilters))
    : currentJobs;

  //TOOL FILTER
  const currentToolTags = currentFiltersTags(currentFilters, toolsFilters);
  console.log(currentToolTags);

  const filterByTools = (list, filters) => {
    return list.filter((person) =>
      filters.every((filter) => person.tools.includes(filter))
    );
  };

  currentToolTags.length > 0
    ? (currentJobs = filterByTools(currentJobs, currentToolTags))
    : currentJobs;

  //ROLE FILTER
  const filterByRole = (list, filters) => {
    return list.filter((person) =>
      filters.every((filter) => person.role.includes(filter))
    );
  };

  const currentRoleFilters = currentFiltersTags(currentFilters, roleFilters);

  currentRoleFilters.length > 0
    ? (currentJobs = filterByRole(currentJobs, currentRoleFilters))
    : currentJobs;

  //  LEVEL FILTER
  const filterByLevel = (list, filters) => {
    return list.filter((person) =>
      filters.every((filter) => person.level.includes(filter))
    );
  };

  const currentLevelFilters = currentFiltersTags(currentFilters, levelFilters);

  currentLevelFilters.length > 0
    ? (currentJobs = filterByLevel(currentJobs, currentLevelFilters))
    : currentJobs;
  ///////////////////////////////////////
  currentJobs.forEach(function (job) {
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
};

renderData();

const tagHunt = function (value) {
  if (currentFilters.includes(value.innerHTML)) {
    return;
  } else {
    currentFilters.push(value.innerHTML);
    currentFilters.length > 0 ? clearBtn.classList.remove("hidden") : "";
    let html = `<span class=${value.innerHTML}>${value.innerHTML}<button class=${value.innerHTML} onClick="deleteTag(this)">X</button></span>`;
    filters.insertAdjacentHTML("afterend", html);
    renderData();
  }
};

const deleteTag = function (classID) {
  const deletedItem = currentFilters.indexOf(`${classID.className}`);
  filterBox.querySelector(`.${classID.className}`).remove();
  currentFilters.splice(deletedItem, 1);
  currentFilters.length === 0 ? clearBtn.classList.add("hidden") : "";
  renderData();
};

const clearAll = function () {
  currentFilters.forEach(function (filter) {
    filterBox.querySelector(`.${filter}`).remove();
  });
  currentFilters = [];
  clearBtn.classList.add("hidden");
  renderData();
};

///////////////////////////////////////
// let filteredArray = [];
// let filterTag = ["Javascript", "HTML", "Frontend"];
// let filterTag2 = ["JS", "CSS", "Backend"];
// console.log(filterTag.includes(...filterTag2));
// const [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10] =
//   data;

// data.forEach(function (company) {
//   for (const [key, value] of Object.entries(company)) {
//     filteredArray =
//   }
// });

// filteredArray = data.filter(function (company) {
//   for (const [key, value] of Object.entries(company)) {
//     filterTag.includes(value);
//   }
// });

// data.filter(function (company) {
//   for (const [key, value] of Object.entries(company)) {
//     filterTag.includes(value);
//   }
//   console.log(company);
// });

// console.log(filterTag.includes("HTML"));

// const filteredArray = data.filter(
//   (company) =>
//     // console.log(company.role);
//     // filterTag.includes(company.role);
//     filterTag.includes(company.role) && filterTag.includes(...company.languages)
// filterTag.includes(...company.tools)
// );
// console.log(filteredArray);
// console.log(filterTag.includes(data[0].role));
