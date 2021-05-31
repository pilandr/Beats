const wrapperBlock = document.querySelector(".wrapper");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const openHamburgerBtn = document.querySelector(".hamburger");

openHamburgerBtn.addEventListener('click', e => {
  hamburgerMenu.style.display = 'block';
  wrapperBlock.style.display = 'none';

  const closeHamburgerMenu = hamburgerMenu.querySelector(".hamburger-menu__link");
  closeHamburgerMenu.addEventListener('click', e => {
    e.preventDefault();
    wrapperBlock.style.display = 'block';
    hamburgerMenu.style.display = 'none';
  });

  const clickOnMenuItem = hamburgerMenu.querySelector(".menu__list");
  clickOnMenuItem.addEventListener("click", e => {
    if (e.target.classList.contains("menu__link")){
      hamburgerMenu.style.display = 'none';
      wrapperBlock.style.display = 'block';
    };
  });
});