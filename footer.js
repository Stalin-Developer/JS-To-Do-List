/**Copyright year dynamically. */
// Obtain the current year.
let currentYear = new Date().getFullYear();

//Insert the current year in the copyrightBar.
document.getElementById('year-placeholder').textContent = currentYear;












/**Modal window to copy developer's email. */
/**We access to the container. */
let contentModal = document.querySelector(".content-modal");

/**We set the actions when the user press the button copy. */
contentModal.querySelector(".buttons-modal .btn-copy").addEventListener("click", function () {
    /**We select the input text. */
    let input = contentModal.querySelector("input.text");

    /**We select the value of the input. */
    input.select();

    //Copy the selected text.
    document.execCommand("copy");

    //We remove the selected text once we copied to the clipboard.
    //We do this because i don't like that the text keeps selected.
    input.setSelectionRange(0, 0);

    //We show this icon to let the user know that the text have been copied.
    let icon = contentModal.querySelector(".fa-circle-check");
    icon.style.display = "inline-flex";
});