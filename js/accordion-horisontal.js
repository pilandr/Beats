const links = document.querySelectorAll(".js-color-link");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const currentLink = e.currentTarget;
    const colorItem = currentLink.closest(".color");
    if (colorItem.classList.contains("color--active")) {
      colorItem.classList.remove("color--active");
    } else {
      document.querySelectorAll(".color--active").forEach(item => {
        item.classList.remove("color--active");
      });
      colorItem.classList.add("color--active");
    }
  });
});