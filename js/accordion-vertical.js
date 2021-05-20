// const accordionArrow = document.querySelector(".team__list");
// accordionArrow.addEventListener("click", e => {

//   const ishumanArrow = e.target.classList.contains("human__arrow");
  
//   // console.log(e.target);
//   if (ishumanArrow)
//   {
    
//     const profBlockWrapper = e.target.closest(".human").querySelector(".human__profession-block-wrapper");
//     const profBlock = e.target.closest(".human").querySelector(".human__profession-block");
//     profBlockWrapper.style.height = window.getComputedStyle(profBlock,null).height;
    
//     if (e.target.closest(".human__name-wrap").classList.contains("human__name-wrap--active")) {
//       profBlockWrapper.style.height = 0;
//       e.target.closest(".human__name-wrap").classList.remove("human__name-wrap--active");
//     } else e.target.closest(".human__name-wrap").classList.add("human__name-wrap--active");
//   }
// });


// $(document).ready((e) => {

//   const teamList = $('.team__list');
//   teamList.on("click", e => {
    
//     console.log($(e.target));
//     console.log(e.target);
//   });

// });
const openItem = item => {
  const container = item.closest(".human");
  const contentBlock = container.find(".human__profession-block-wrapper");
  const textBlock = contentBlock.find(".human__profession-block");
  const reqHeight = textBlock.Height();

  contentBlock.Height(reqHeight);
}

$(".human__name-wrap").on("click", (e) => {
  $this = $(e.currentTarget);
  $this.toggleClass("human__name-wrap--active");
  openItem($this);
});



