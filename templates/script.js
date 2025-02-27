$(document).ready(function () {
  const $app = $(".app");
  const $pageNav = $(".pages__item");
  const $body = $("body");

  let curSlide = 1;
  let scrolledUp, nextSlide;
  let sliderActive = false;

  let pagination = function (slide, target) {
    if (target === undefined) {
      nextSlide = scrolledUp ? slide - 1 : slide + 1;
    } else {
      nextSlide = target;
    }

    $(".pages__item--" + nextSlide).addClass("page__item-active");
    $(".pages__item--" + slide).removeClass("page__item-active");

    if (nextSlide === 1) {
      $app.removeClass().addClass("app");
      $app.addClass("initial");
    } else if (nextSlide === 2) {
      $app.removeClass().addClass("app");
      $app.addClass("active");
    } else if (nextSlide === 3) {
      $app.removeClass().addClass("app");
      $app.addClass("active2");
    } else if (nextSlide === 4) {
      $app.removeClass().addClass("app");
      $app.addClass("active3");
    }
    setTimeout(function () {
      animation = false;
    }, 3000);
  };

  let navigateDown = function () {
    if (curSlide > 3 || $app.is(":animated")) return;

    scrolledUp = false;
    pagination(curSlide, curSlide + 1);
    curSlide++;
  };

  let navigateUp = function () {
    if (curSlide === 1 || $app.is(":animated")) return;

    scrolledUp = true;
    pagination(curSlide, curSlide - 1);
    curSlide--;
  };

  setTimeout(function () {
    $app.addClass("initial");
  }, 1500);

  setTimeout(function () {
    animation = false;
  }, 4500);

  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if ($app.is(":animated") || sliderActive) return;

    var delta = e.originalEvent.wheelDelta;
    if (delta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $app.on("mouseover", function () {
    sliderActive = false;
    $body.css("overflow", "hidden");
  });

  $app.on("mouseout", function () {
    sliderActive = true;
    $body.css("overflow", "auto");
  });

  $(document).on("click", ".pages__item:not(.page__item-active)", function () {
    if ($app.is(":animated")) return;

    let target = +$(this).attr("data-target");
    pagination(curSlide, target);
    curSlide = target;
  });
});
