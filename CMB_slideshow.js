// CMB_slideshow.js
// Does what it says on the tin -- JavaScript code powering the CMB slideshow.
// Last modified March 19th, 2013
//
// Copyright New Scientist, 2013.
// All rights reserved. (???)
// OTHER COPYRIGHT AND ATTRIBUTION STUFF GOES HERE, LIKE HEALPIX
// SERIOUSLY, DON'T FORGET TO DO THIS!

$(function(){
  $("#slides").slidesjs({
    width: 40,
    height: 20,
	pagination: {
      active: false,
        // [boolean] Create pagination items.
        // You cannot use your own pagination. Sorry.
      effect: "fade"
        // [string] Can be either "slide" or "fade".
    },
	navigation: {
      active: false,
        // [boolean] Generates next and previous buttons.
        // You can set to false and use your own buttons.
        // User defined buttons must have the following:
        // previous button: class="slidesjs-previous slidesjs-navigation"
        // next button: class="slidesjs-next slidesjs-navigation"
      effect: "fade"
        // [string] Can be either "slide" or "fade".
    },
	effect: {
      fade: {
        speed: 1000,
          // [number] Speed in milliseconds of the fade animation.
        crossfade: true
          // [boolean] Cross-fade the transition.
      }
	}
  });
});

//////////////////////
// Time for jQuery! //
/////////////////////
$("document").ready(function(){
    
    // var y_slide_bottom = $(".slidesjs-control > img").height();
    // // This is sloppy!
    // // Only returns the height of the first image.
    // // So you're screwed if not all your slides are the same height.
    // // On the other hand, I don't think Slidesjs lets you do that anyhow.
    // 
    // $(".slidesjs-navigation")
    //     .css("position", "relative")
    //     .css("top", y_slide_bottom);
    //
    // $("#slides").prepend("")
    
    // $(".slidesjs-control > a")   // Select the buttons!
    //     .css("width", "90%")
    //     .css("left", "5%")
        // .css("margin-left", "auto")
        // .css("margin-right", "auto")
        
    // var position = $(".slidesjs-previous").position();
    // console.log(position.left);
    // $("slidesjs-next").css("right", position.left + "px"); // Doesn't work -- why?
    
    // $("slidesjs-next").click(function(){
    //    $("#explanation").text("Breakfast, breakfast, sun dock trog.");
    // });
    
    $(".slide > img")   // Select the buttons!
        .css("width", "100%");
    
    $(".slide > p")   // Select the captions!
        .addClass("caption");
    
});














