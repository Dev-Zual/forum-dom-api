const loadAllPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  displayData(data.posts);
};

const displayData = (posts) => {
  console.log(posts);
};

loadAllPost();
