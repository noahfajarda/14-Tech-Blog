const deletePostEl = document.querySelector("#deleted-post-submit");
const deletePostIDEl = document.querySelector("#post-ID");
console.log(deletePostIDEl);

async function deletePostHandler(event) {
    event.preventDefault();
    console.log(`/api/post/delete/${deletePostIDEl.textContent}`);

    // POST to "/api/post"
    const response = await fetch(
        `/api/post/delete/${deletePostIDEl.textContent}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
}
if (deletePostIDEl != null) {
    deletePostEl.addEventListener("click", deletePostHandler);
}
