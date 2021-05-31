(function(){

const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu__list")
const sideMenuItems = sideMenu.find(".fixed-menu__item");

//http://hgoebl.github.io/mobile-detect.js/
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;
sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;
  if (isNaN(position)) {
    console.error("передано неверное значение в countSectionPosition")
    return 0
  } 
  return position;
}


const changeMenuTheme = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu__list--color--light"

  if (menuTheme == "light") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
}


const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}


const performTransition = sectionEq => {

  if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;
    const position = countSectionPosition(sectionEq);

    changeMenuTheme(sectionEq);
    
    display.css ({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections,sectionEq,"active");
    
    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(sideMenuItems,sectionEq,"fixed-menu__item--active");

    }, transitionOver + mouseInertiaOver);
}

const Viewportscroller = () => {
const activeSection = sections.filter(".active");
const nextSection = activeSection.next();
const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = Viewportscroller();

  const activeSection = sections.filter(".active");
  

  if (deltaY > 0) {
    scroller.next();
  }
  if (deltaY < 0) {
    // if (activeSection.index() == sections.last().index()) return;
    scroller.prev();
  }
});

$(window).on("keydown", e => {
  const tagname = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagname == "input" || tagname == "textarea";
  const scroller = Viewportscroller();

  if (userTypingInInputs) return;
    switch (e.keyCode) {
      case 38:
        scroller.prev();
        break;
      
      case 40:
        scroller.next();
        break;
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());


$("[data-scroll-to]").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to")
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());

});

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction) {
      const scroller = Viewportscroller();
      let scrolDirection = "";
      if (direction == "up") scrolDirection = "next";
      if (direction == "down") scrolDirection = "prev";
      scroller[scrolDirection]();
    }
  });
}

})();