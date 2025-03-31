const container = document.querySelector(".job-container");
let arrayContainer = [];
let jobs;
//console.log(container)//

async function fetchdata() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("failed to load data.");
    }
    jobs = await response.json();
    displaydata(jobs);
  } catch (err) {
    console.error(err);
  }
}

fetchdata();

function displaydata(jobs) {
  let html = "";
  jobs.forEach((data) => {
    html += `
         <div class="jobs">
          <div class="left">
            <div class="image">
                <img src="${data.logo}">
            </div>
            <div class="job-description">
                <div class="top">
                    <p class="name">${data.company}</p>
                    ${data.new ? '<p class="new type">NEW!</p>' : ""}
                    ${
                      data.featured
                        ? '<p class="featured type">FEATURED</p>'
                        : ""
                    }
                </div>
                <div class="position">
                    <h3>${data.position}</h3>
                </div>
                <div class="bottom">
                    <ul>
                    <li class="time"><p>${data.postedAt}</p></li>
                    <li class="mode item"><p>${data.contract}</p></li>
                    <li class="location item"><p>${data.location}</p></li>
                    </ul>
                </div>
            </div>
          </div>
          <div class="right">
            ${data.languages
              .map((language) => {
                return `
                <p class="skills filter-tags">${language}</p>`;
              })
              .join("")}

        <p class="skills filter-tags">${data.level}</p> 

            ${data.tools
              .map((tool) => {
                return `
            <p class="skills filter-tags">${tool}</p>`;
              })
              .join("")}
          </div>
        </div>
        `;
  });
  container.innerHTML = html;

  const btnTags = document.querySelectorAll(".filter-tags");
  btnTags.forEach((each) =>
    each.addEventListener("click", function () {
      //console.log(each.textContent)
      const tags = each.textContent;
      addfilter(tags);
      console.log(arrayContainer);
    })
  );
}

function addfilter(tag) {
  if (!arrayContainer.includes(tag)) {
    arrayContainer.push(tag);

    selectedTags(arrayContainer);
  }
}

function selectedTags(array) {
  const filtertags = document.querySelector(".btn-tags");

  filtertags.innerHTML = "";

  array.forEach((each) => {
    const spanEl = document.createElement("span");
    spanEl.textContent = each;
    filtertags.appendChild(spanEl);
  });
  if (filtertags.innerHTML) {
    let filteredJobs = jobs.filter((job) => {
      return array.every((searchQuery) => {
        return (
          job.languages.includes(searchQuery) ||
          job.tools.includes(searchQuery) ||
          job.level === searchQuery
        );
      });
    });
    console.log(filteredJobs);
    displaydata(filteredJobs);
  }
}

const clearTags = document.querySelector(".clearbtn");
clearTags.addEventListener("click", function () {
  arrayContainer = [];
  console.log(arrayContainer);
  const filtertags = document.querySelector(".btn-tags");

  filtertags.innerHTML = "";
  displaydata(jobs);
});
