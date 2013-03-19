// CMB_slideshow.js
// Does what it says on the tin -- JavaScript code powering the CMB slideshow.
// Last modified March 19th, 2013
//
// Copyright New Scientist, 2013.
// All rights reserved. (???)
// OTHER COPYRIGHT AND ATTRIBUTION STUFF GOES HERE
// LIKE HEALPIX
// SERIOUSLY, DON'T FORGET TO DO THIS!

$(function(){
  $("#slides").slidesjs({
    width: 8192,
    height: 4096,
	pagination: {
      active: true,
        // [boolean] Create pagination items.
        // You cannot use your own pagination. Sorry.
      effect: "fade"
        // [string] Can be either "slide" or "fade".
    },
	navigation: {
      active: true,
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
        speed: 500,
          // [number] Speed in milliseconds of the fade animation.
        crossfade: true
          // [boolean] Cross-fade the transition.
      }
	}
  });
});