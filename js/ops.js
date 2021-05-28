const sections = $("section");
const display = $(".maincontent");
let inScroll = false;
sections.first().addClass("active");

const performTransition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;
    const position = sectionEq * -100;

    display.css ({
      transform: `translateY(${position}%)`
    });

    const currentSection = sections.eq(sectionEq);
      menuTheme = currentSection.attr("data-sidemenu-theme");
      const sideMenu = $(".fixed-menu__list")

      if (menuTheme == "light") {
        sideMenu.addClass("fixed-menu__list--color--light");
      } else {
        sideMenu.removeClass("fixed-menu__list--color--light");
      }

      

    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
    
    setTimeout(() => {
      inScroll = false;

      sideMenu
        .find(".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .siblings()
        .removeClass("fixed-menu__item--active");
    }, 1300);
  }
  
}

const scrollViewport = direction => {
const activeSection = sections.filter(".active");
const nextSection = activeSection.next();
const prevSection = activeSection.prev();


  if (direction == "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction == "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }
  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on("keydown", e => {

  const tagname = e.target.tagName.toLowerCase();

  if (tagname != "input" && tagname != "textarea") {
    switch (e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;
      
      case 40:
        scrollViewport("next");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to")
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());

});