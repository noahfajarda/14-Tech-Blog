const comment = document.querySelector("#comment");
const submitForm = document.querySelector("#submit-comment");

submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = comment.value;
    const postId = comment.getAttribute("data-id");
    const res = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
            body,
            postId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("RESSS", res);

    // document.location.reload();
});
