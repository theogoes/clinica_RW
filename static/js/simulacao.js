let items = document.querySelectorAll(".slider .list .item");
let thumbs = document.querySelectorAll(".thumbnail .item");
let countItem = items.length;
let itemActive = 0;

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

function showSlider() {
  let itemActiveOld = document.querySelector(".item.active");
  let itemActiveThumnOld = document.querySelector(".thumbnail .item.active ");
  itemActiveOld.classList.remove("active");
  itemActiveThumnOld.classList.remove("active");

  items[itemActive].classList.add("active");
  thumbs[itemActive].classList.add("active");
}
