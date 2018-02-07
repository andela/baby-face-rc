// import $ from "jquery";
$(document).ready(() => {
  console.log("shit is working");
  $(".slider").slick({
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    prevArrow: "<div class='slickPrev pull-left clearfix previousImg'><i class='fa fa-angle-left' aria-hidden='true'></i></div>",
    nextArrow: "<div class='slickNext pull-right clearfix nextImg'><i class='fa fa-angle-right' aria-hidden='true'></i></div>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
