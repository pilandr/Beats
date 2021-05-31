const openItem = item => {
  const container = item.closest(".human");
  const contentBlock = container.find(".human__profession-block-wrapper");
  const textBlock = contentBlock.find(".human__profession-block");
  const reqHeight = textBlock.height();
  item.addClass("human__name-wrap--active");
  contentBlock.height(reqHeight);
}


const closeEveryItem = item => {
  const container = item.closest(".team__list");
  const items = container.find(".human__profession-block-wrapper");
  const itemsContainer = container.find(".human__name-wrap");
  itemsContainer.removeClass("human__name-wrap--active");
  items.height(0);
}


$(".human__name-wrap").on("click", (e) => {
  $this = $(e.currentTarget);
  
  if ($this.hasClass("human__name-wrap--active")) {
    closeEveryItem($this);
  } else {
    closeEveryItem($this);
    openItem($this);
  }
});



