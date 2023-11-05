
export const searchInput = document.querySelector(".data-search");
export function addSearchEventListener() {
    searchInput.addEventListener("input", e => {
    const value = e.target.value;
    console.log(value);

})
}