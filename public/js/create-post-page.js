const postTitleEl = document.querySelector("#new-post-title");
const postContentEl = document.querySelector("#new-post-content");
const postSubmitEl = document.querySelector("#new-post-submit");

async function createPostHandler(event) {
    event.preventDefault();
    console.log(postTitleEl.value, postContentEl.value);

    // POST to "/api/post"
    const response = await fetch("/api/post/", {
        method: "POST",
        body: JSON.stringify({
            title: postTitleEl.value,
            content: postContentEl.value,
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

    // document.location.replace("/dashboard/new");
}

postSubmitEl.addEventListener("click", createPostHandler);
