const loadAllPost = async (searchText, allPost) => {
  handleLoading(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/${
      searchText ? searchText : allPost
    }`
  );
  const data = await res.json();
  displayData(data.posts);
};

const displayData = (posts) => {
  console.log(posts);
  const postContainer = document.getElementById("post-container");
  // clear the prev data
  postContainer.textContent = "";
  posts.forEach((post) => {
    handleLoading(false);
    const div = document.createElement("div");
    div.innerHTML = `
        
        <div class="flex justify-between  bg-[#797DFC1A] rounded-lg p-6">
              <div class="indicator">
                <span class="indicator-item badge ${
                  post.isActive ? "bg-green-600" : "bg-red-600"
                }  "></span>
                <figure class="">
                  <div class="avatar">
                    <div class="w-24 rounded-xl">
                      <img
                        src="${post.image}"
                      />
                    </div>
                  </div>
                </figure>
              </div>

              <div class="card-body py-0">
                <div class="flex gap-7 font-medium">
                  <span># <span>${post.category}</span></span>
                  <span>Author: <span>${post.author.name}</span></span>
                </div>
                <h2 class="card-title">${post.title}</h2>
                <p>${post.description}</p>
                <div class="my-3">
                  <hr class="border-dashed border-2" />
                </div>
                <div class="flex justify-between items-center">
                  <div class="space-x-6 text-[#12132D99] font-medium">
                    <span class="space-x-2">
                      <i class="fa-regular fa-message text-lg"></i>
                      <span>${post.comment_count}</span></span
                    >
                    <span class="space-x-2"
                      ><i class="fa-regular fa-eye"></i> <span>${
                        post.view_count
                      }</span></span
                    >
                    <span class="space-x-2">
                      <i class="fa-regular fa-clock text-lg"></i>
                      <span>${post.posted_time}</span> min</span
                    >
                  </div>
                  <div class="">
                    <button
                    onclick="handleReadPost('${post?.title}' ,'${
      post.view_count
    }')" 
                      class="bg-[#10B981] hover:bg-[#269772] text-white rounded-full text-lg size-8"
                    >
                      <i class="fa-solid fa-envelope-open text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        
        `;
    postContainer.appendChild(div);
  });
};

let count = 0;
const handleReadPost = (title, viewCount) => {
  count++;
  // set read count
  const setCount = document.getElementById("read-count");
  setCount.innerText = count;
  console.log(title, viewCount);
  const showReadingContainer = document.getElementById("show-reding-content");
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="bg-white p-5 rounded-lg flex justify-between gap-3">
                <p class="font-medium max-w-64 break-words">
                  ${title}
                </p>
                <span class="space-x-2 text-[#12132D99]">
                  <i class="fa-regular fa-eye"></i>
                  <span>${viewCount}</span>
                </span>
              </div>
    
    `;
  showReadingContainer.appendChild(div);
};

const handleSearch = () => {
  handleLoading(true);
  const inputText = document.getElementById("search-input").value;
  loadAllPost(`posts?category=${inputText}`);
};

const handleLoading = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

loadAllPost("posts");
