async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace("/dashboard/new");
}

document
    .querySelector("#new-post-button")
    .addEventListener("click", createPostHandler);
