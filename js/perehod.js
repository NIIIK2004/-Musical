document.addEventListener("DOMContentLoaded", function () {
  let fullscreenButton = document.getElementById("fullscreen-container");
  fullscreenButton.addEventListener("click", function (event) {
    event.preventDefault();
    $("body").addClass("slide-out");
    setTimeout(function () {
      window.location.href = "fullscreen.html";
    }, 600); // Задержка в миллисекундах должна соответствовать длительности анимации slide-out в CSS
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let fullscreenButton = document.getElementById("fullscreen-container-2");
  fullscreenButton.addEventListener("click", function (event) {
    event.preventDefault();
    $("body").addClass("slide-out");
    setTimeout(function () {
      window.location.href = "AllTracks.html";
    }, 600); // Задержка в миллисекундах должна соответствовать длительности анимации slide-out в CSS
  });
});

$(document).ready(function () {
  $('a').click(function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    if (url != '') {
      $('body').addClass("slide-out");
      setTimeout(function () {
        window.location.href = url;
      }, 600); // Задержка в миллисекундах должна соответствовать длительности анимации slide-out в CSS
    }
  });
});

$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
