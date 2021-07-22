const container = document.getElementById("container");
const loading = document.querySelector(".loading");

getRandomPost();
getRandomPost();
getRandomPost();

window.addEventListener("scroll", () => {
  // we need to check 3 things -
  // document height, scrollable height and the amount scrolled from the top
  // we then need to check whether document height + amount scrolled > scrollable height
  const currentDocumentHeight = document.documentElement.clientHeight;
  const currentScrollableHeight = document.documentElement.scrollHeight;
  const amountScrolled = document.documentElement.scrollTop;

  if (
    currentDocumentHeight + amountScrolled >=
    Math.floor(currentDocumentHeight)
  ) {
    showLoading();
  }
});

function showLoading() {
  loading.classList.add("show");
  setTimeout(getRandomPost(), 1000);
}

async function getRandomPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`
  );
  const postData = await res.json();
  addDatatoDOM(postData);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function addDatatoDOM(data) {
  const blogPostElement = document.createElement("div");
  blogPostElement.classList.add("blog-post");
  blogPostElement.innerHTML = `
    <h2 class="title">Blog Title</h2>
    <p class="text">${data.body}</p>
  `;

  container.appendChild(blogPostElement);
  loading.classList.remove("show");
}


