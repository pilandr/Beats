// const links = document.querySelectorAll(".js-color-link");

// links.forEach(link => {
//   link.addEventListener("click", e => {
//     e.preventDefault();
//     const currentLink = e.currentTarget;
//     const colorItem = currentLink.closest(".color");
    
//     const textPaddingLeft = parseInt(window.getComputedStyle(colorItem.querySelector(".color__content"), null).paddingLeft);
//     const textPaddingRight = parseInt(window.getComputedStyle(colorItem.querySelector(".color__content"), null).paddingRight);
//     const windowWidth = window.innerWidth;
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     console.log(isMobile); 
//     let textWidth = 0;
//     if (isMobile) {
//       textWidth = windowWidth - textPaddingLeft - textPaddingRight - currentLink.clientWidth*3;
//       console.log(windowWidth);
//       console.log(textPaddingLeft);
//       console.log(textPaddingRight);
//       console.log(currentLink.clientWidth*3);

//     } else {
//       textWidth = 524 - textPaddingLeft - textPaddingRight;
//     }
    
//     colorItem.querySelector(".color__content-inner").style.width = textWidth + "px";
//     console.log(colorItem.querySelector(".color__content-inner").clientWidth);

//     if (colorItem.classList.contains("color--active")) {
//       colorItem.classList.remove("color--active");
//     } else {
//       document.querySelectorAll(".color--active").forEach(item => {
//         item.classList.remove("color--active");
//       });
      
//       colorItem.classList.add("color--active");
      
//     }
//     console.log();
//   });
// });
(function() {

  const mesureWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    container = item.closest(".colors");
    const items = container.find(".colors__header");
    const itemsWidth = items.width() * items.length;

    const textContainer = item.find(".colors__content-inner");
    const textPaddingLeft = parseInt(textContainer.css("padding-left"));
    const textPaddingRight = parseInt(textContainer.css("padding-right"));

    const isTablet = window.matchMedia("(max-width: 768px)").matches;
    const isMobile = window.matchMedia("(max-width: 480px)").matches;


     if (isMobile) {
      reqItemWidth = screenWidth - items.width();
    } else if (isTablet) {
      reqItemWidth = screenWidth - itemsWidth;
    } else {
      reqItemWidth = 524;
    }

    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - textPaddingLeft - textPaddingRight
    }
  }
  
  const closeEveryItemInContainer = container => {
    const items = container.find(".colors__item");
    const contents = container.find(".colors__content");
    items.removeClass("active");
    contents.width(0);
  }
  
  const openItem = item => {
    const hiddenContent = item.find(".colors__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".colors__content-inner");
    


    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
  }
  
  $(".colors__header").on("click", e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const item = $this.closest(".colors__item");
    const isOpenItem = item.hasClass("active");
    const container = item.closest(".colors")

    if (isOpenItem) {
      closeEveryItemInContainer(container);
    } else {
      closeEveryItemInContainer(container);
      openItem(item);
    }
  });


})()
