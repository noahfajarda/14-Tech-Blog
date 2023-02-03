const updatePostTitleEl = document.querySelector("#updated-post-title");
const updatePostContentEl = document.querySelector("#updated-post-content");
const updatePostSubmitEl = document.querySelector("#updated-post-submit");
const postIDEl = document.querySelector("#post-ID");

async function updatePostHandler(event) {
    event.preventDefault();
    console.log(
        updatePostTitleEl.value,
        updatePostContentEl.value,
        postIDEl.textContent
    );

    // POST to "/api/post"
    const response = await fetch(`/api/post/update/${postIDEl.textContent}`, {
        method: "PUT",
        body: JSON.stringify({
            postid: postIDEl.textContent,
            title: updatePostTitleEl.value,
            content: updatePostContentEl.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
}

updatePostSubmitEl.addEventListener("click", updatePostHandler);
