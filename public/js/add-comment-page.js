const addCommentEl = document.querySelector("#add-comment");
const commentTextEl = document.querySelector("#comment-box");
const postIDEl = document.querySelector("#post-id");
const userIDEl = document.querySelector("#user-id");

async function addComment(event) {
    event.preventDefault();
    console.log(commentTextEl.value);
    console.log(postIDEl.textContent);
    console.log(userIDEl.textContent);

    // POST to "/api/post"
    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({
            body: commentTextEl.value,
            postID: postIDEl.textContent,
            userID: userIDEl.textContent,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace(`/post/${postIDEl.textContent}`);
    } else {
        alert(response.statusText);
    }
}

addCommentEl.addEventListener("click", addComment);
