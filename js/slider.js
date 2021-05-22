$(".product-slider__arrow").on("click", (e) => {
  e.preventDefault();
  const itemList = $(".products");
  const countItem = $(".products__item").length;
  const widthItem = $(".products")[0].clientWidth;
  const left = parseInt(itemList.css("left"));

  if ($(e.currentTarget).hasClass("product-slider__arrow--direction--prev"))
  {
    // console.log(left);
    if (left == 0) {
      itemList.css("left", "-" + (countItem - 1) * widthItem  + "px");
    } else 
    {
      itemList.css("left", left + widthItem + "px");
    }

  }
  else if ($(e.currentTarget).hasClass("product-slider__arrow--direction--next")) {
    console.log((-1)*(countItem - 1) * widthItem);
    console.log(left);

    if (left == ((-1)*(countItem -1)*widthItem))
    {
      itemList.css("left","0px");
    } else {
      itemList.css("left", left - widthItem + "px");
    }

  }
});
// console.log(widthItem);
