$(document).ready(function() {
  // Search
  $(".headerSearch_button").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".headerSearch_field").fadeToggle(200);
    $("body").addClass("activeSearch");
  });
  $("body").click(function() {
    if ($(this).hasClass("activeSearch")) {
      $(".headerSearch_field").fadeOut(200);
      $(this).removeClass("activeSearch");
    }
  });
  $(".headerSearch").click(function(e) {
    e.stopPropagation();
  });

  var tags = [
    "Prada",
    "Men Shoes",
    "Kids",
    "Pink Shoes",
    "Anna Field",
    "Even&Odd"
  ];
  $("#autocomplete").autocomplete({
    source: function(request, response) {
      var matcher = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(request.term),
        "i"
      );
      response(
        $.grep(tags, function(item) {
          return matcher.test(item);
        })
      );
    }
  });
  // Login Modal

  $(".login-modal-overlay").click(function() {
    $(this).fadeOut(300);
  });
  $(".openb").click(function() {
    $(".login-modal-overlay").fadeIn(300);
  });
  $(".login-modal").click(function(e) {
    e.stopPropagation();
  });

  // Mobile Menu

  $(".mobile").click(function() {
    $(".nav").slideToggle(500);
    $(this).addClass("active");
  });

  // Mobile Search

  $(".mobileSearchInput").click(function() {
    $(".headerSearch").slideToggle(500);
  });

  // Slider
  $(".slider").slick({
    dots: true,
    autoplay: false,
    arrows: false
  });

  var $slideshow = $(".slider");

  $(".sliderBottom_links").on("click", "a", function(e) {
    var slideIndex = $(this)
      .closest("li")
      .index();

    $slideshow.slick("slickGoTo", parseInt(slideIndex));
    e.preventDefault();
  });

  $("ul li a").click(function() {
    if ($(this).hasClass("current")) {
      $(this).removeClass("current");
    } else {
      $("li a.current").removeClass("current");
      $(this).addClass("current");
    }
  });

  // Blog news
  $(".news-blog").slick({
    autoplay: true,
    arrows: false,
    speed: 600,
    fade: true,
    dots: false
  });

  // Flickr
  var flickrApi =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON(flickrApi, {
    tags: "cars, flowers, music",
    tagmode: "any",
    format: "json"
  })
    .done(function(data) {
      $.each(data.items, function(index, item) {
        $("<img>")
          .attr("src", item.media.m)
          .appendTo("#flickr");
        if (index == 5) {
          return false;
        }
      });
    })
    .fail(function() {
      alert("Ajax failed.");
    });

  // Grid & List Veiw

  $(".allProducts_gridView, .allProducts_listView").click(function() {
    if (!$(this).hasClass("active")) {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $(".allProducts_grid").toggleClass("active");
      $(".allProducts_item_info").toggleClass("active");
    }
  });

  // Flickr img pop-out

  $("#flickr").on("click", "img", function() {
    var sImg = $(this).attr("src");
    var bImg = sImg.replace("_m.jpg", "_b.jpg");
    $("body")
      .append(
        '<div class="img-modal">' +
          '<img src="' +
          bImg +
          '">' +
          '<div class="img-modal-close">EXIT</div> ' +
          "</div>"
      )
      .children(".img-modal")
      .fadeIn(200);
  });
  $("body").on("click", ".img-modal-close", function() {
    $(this)
      .parent()
      .fadeOut(function() {
        $(this).remove();
      });
  });

  // Email input

  $("#btn").click(function(e) {
    e.preventDefault();
    var formData = JSON.stringify($("#news_form").serializeArray());
    $.ajax({
      url: "/input/action.php",
      type: "POST",
      data: "inputEmail" + formData
    });
    // alert(formData);
  });

  // Buttons

  $(".price").click(function() {
    $("#myDropdown").toggleClass("show");
  });
  $(".categories").click(function() {
    $("#myDropdown2").toggleClass("show");
  });
  $(".brands").click(function() {
    $("#myDropdown3").toggleClass("show");
  });

  $("input[name=next]").on("click", function(e) {
    e.preventDefault();
    let $emailInput = $("input[name=email]");
    let $nameInput = $("input[name=name");

    const $RegXp = new RegExp($emailInput.attr("pattern"));
    const $email = $RegXp.test($emailInput.val());
    const $wrapper = $(".wrap");
    const $errors = $wrapper.find(".error");

    // if (!$email) {
    //   $(".error-email")
    //     .text("Please enter email!")
    //     .show()
    //     .addClass("error");
    // } else {
    //   $(".error-email").hide();
    // }

    // if ($nameInput.val() === "") {
    //   $(".error-name")
    //     .text("Please eenter your name")
    //     .show()
    //     .addClass(".error");
    // } else {
    //   $(".error-name").hide();
    // }

    if ($errors.length === 0) {
      $(".info").hide();
      $(".questions").show();
    }

    $(".question").each(function() {
      var index = $(this).data("id");
    });
    $("#question").click(function(e) {
      e.preventDefault();
      $("#" + index[1] + "").hide();
      $("#" + index[2]).show();
    });
  });
});
