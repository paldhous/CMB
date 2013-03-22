// CMB_slideshow.js
//
// Copyright New Scientist, 2013.


/////////////////////////////
// First, set up SlidesJS. //
/////////////////////////////

$(function(){
  $("#slides").slidesjs({
    width: 4000,
    height: Math.max(1500, window.innerHeight/window.innerWidth * 3000),
	pagination: {
      active: false,
        // [boolean] Create pagination items.
        // You cannot use your own pagination. Sorry.
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
	},
  	play: {
        active: false,
          // [boolean] Generate the play and stop buttons.
          // You cannot use your own buttons. Sorry.
        effect: "fade",
          // [string] Can be either "slide" or "fade".
        interval: 20000,
          // [number] Time spent on each slide in milliseconds.
        auto: true,
          // [boolean] Start playing the slideshow on load.
        swap: false,
          // [boolean] show/hide stop and play buttons
        pauseOnHover: false,
          // [boolean] pause a playing slideshow on hover
        restartDelay: 2500
          // [number] restart delay on inactive slideshow
      }
  });
});


//////////////////////
// Time for jQuery! //
/////////////////////
// 
// function reSize(){
//     
//     // $target.css('width', $(window).width()+'px');
//     
//     $(".slide > img").css("width", "100%");
//     $(".slide > p").css("width", "100%");
//     
//     // Finding the width of the window, not including the vertical scroll bar.
//     var true_width = $('body').innerWidth();
//     // Adjusting for the margins of the content div.
//     true_width *= 0.93;
//     
//     // I can't figure out what's going on with the height of the image -- it seems to stay fixed at 21px for a while, then change.
//     // I'm sure there's a good way to solve this with jQuery, but I don't have access to the jQuery API right now.
//     // So I'm going to do something really ugly: 
//     // I'm going to use the fact that all the images have a known width and identical aspect ratios
//     // and just read their height off of their width that way.
//     
//     var aspect_ratio = 0.25; // all the images are 4 times wider than they are tall.
//     var img_height = true_width * aspect_ratio;
//     
//     var caption_height = $(".caption:visible")
//                                 .css("height");
//     
//     // Even more fudging -- adding an extra 50 pixels just to keep us safe.
//     var slide_height = parseInt($(".slidesjs-navigation").css("height"), 10) + caption_height + img_height;
//     slide_height += "px";
//     
//     $(".slidesjs-container").css("height", slide_height);
//     
//     
// }
// $(document).ready(function(){
//     $(window).bind('resize', reSize($('#full')));
//     $(window).trigger('resize');
// });

$("document").ready(function(){
    
    // A lot of this jQuery code is to handle a nasty and subtle glitch:
    // SlidesJS sets the width of the slides is set before a scrollbar appears.
    // This is the fundamental cause of *all* the horizontal clipping problems we've been seeing.
    // Thankfully, jQuery makes a solution possible.
    
    // Finding the width of the window, not including the vertical scroll bar.
    var true_width = $('body').innerWidth();
    // Adjusting for the margins of the content div.
    true_width *= 0.93;

    // Finding the width of the container holding the slides.
    var container_width = $(".slidesjs-container").css("width");
    
    // Setting the width of the image appropriately.
    // It needs to be in percent to resize with the window.
    // Unfortunately, it's in percentage of the width of the parent container, 
    // the slidesjs-container div.
    var correct_width = (true_width/parseInt(container_width, 10) * 100) + "%";
    
    
    // Select the slide images and give them the right width.
    $(".slide > img")
        .css("width", correct_width);
        
    // Select the slide captions and give them the right width.
    $(".slide > p")
        .css("width", correct_width)
        .addClass("caption");
    
    
    // I can't figure out what's going on with the height of the image -- it seems to stay fixed at 21px for a while, then change.
    // I'm sure there's a good way to solve this with jQuery, but I don't have access to the jQuery API right now.
    // So I'm going to do something really ugly: 
    // I'm going to use the fact that all the images have a known width and identical aspect ratios
    // and just read their height off of their width that way.
    
    var aspect_ratio = 0.25; // all the images are 4 times wider than they are tall.
    var img_height = true_width * aspect_ratio;
    
    // var max_caption_height = function(){
    //     var captions = $(".caption");
    //     num_captions = captions.length;
    //     caption_heights = [];
    //     for (var j = 0; j < num_captions; j += 1){
    //         caption = captions[j];
    //         height = caption.css("height");
    //         caption_heights.push(height);
    //     }
    // };
    
    // var max_caption_height = $(".caption")
    //                             .filter(function(){
    //                                 // console.log(caption)
    //                                 this.css("height") !== 0;
    //                             })
    //                             .css("height");
    
    
    
    // console.log(max_caption_height);
    // 
    
    // Even more fudging -- adding an extra 50 pixels just to keep us safe.
    var slide_height = parseInt($(".slidesjs-navigation").css("height"), 10) + parseInt($(".caption").css("height"), 10) + img_height;
    slide_height += "px";
    
    
    // Get the height of the first slide.
    // var slide_height = parseInt($(".slidesjs-navigation").css("height"), 10) + parseInt($(".slide > img").css("height"), 10) + parseInt($(".slide > p").css("height"), 10);
    // console.log(slide_height);
    // console.log($(".slide > p").css("height"));
    // console.log($(".slidesjs-navigation").css("height"));
    
    // This is a bit of a fudge, since it should really be the MAX height of the slides...
    
    // Resize the height of the slide container to that of the slides themselves.
    $(".slidesjs-container").css("height", slide_height);
    
    // Once the user resizes the window, SlidesJS will understand that there's a scroll bar,
    // and we can (and should!) go back to a width of 100% for the images and captions.
    $(window).resize(function() {
        $(".slide > img").css("width", "100%");
        $(".slide > p").css("width", "100%");
        
        // img_height = aspect_ratio * $(".slidesjs-container").css("width");
        // slide_height = (parseInt($(".slidesjs-navigation").css("height"), 10) + parseInt($(".slide > p").css("height"), 10) + img_height) + "px";
        // $(".slidesjs-container").css("height", slide_height);
        // // var slide_height = $(".slide").css("height");
        // // $(".slidesjs-container").css("height", slide_height);
    });
    
    // $(".slidesjs-navigation").on("click", function(){
    //     
    // })
    
});














