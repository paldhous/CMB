// COPYRIGHT INFO GOES HERE
// PRESUMABLY THIS IS COPYRIGHT NEW SCIENTIST, 2013

////////////////////////////////////////
// GLOBAL LOCATION AND SIZE VARIABLES //
///////////////////////////////////////

// Find the height and width of the current window.
// Note that this will not rescale if you change the window size while on the page,
// but I find it hard to care too much about that.
var H = window.innerHeight;
var W = window.innerWidth;

var title_x = W/2, title_y = H/15, title_font_size = Math.min(W, H)/16;

var map_scale = 20000;
var max_map_width = W/1.2, max_map_height = H/1.2;

// Resolutions of various experiments, in degrees.
// Please check Planck before going to press.
var cobe_res = 7, wmap_res = 0.5, planck_res = 0.1;

label_x = W/2, label_y = 19*H/20, label_size = Math.min(W, H)/20;

///////////////////////
// GLOBAL FUNCTIONS //
//////////////////////

////////////////////////////////
// Setting up the SVG canvas //
///////////////////////////////

// Create the big svg canvas that will hold all of the stuff.
var svg = d3.select("body").append("svg")
            .attr("height", H)
            .attr("width", W);

// Slap a title on the thing!
svg.append("text")
    .text("Gaussian Blur Test")
    .attr("id", "title")
    .attr("x", title_x)
    .attr("y", title_y)
    .attr("font-size", title_font_size);

//////////////////////////////////////////
// Loading the TopoJSON files we need. //
/////////////////////////////////////////

d3.json("world-50m.json", ready_function);

//////////////////////////////////
// Defining the ready function //
/////////////////////////////////
// d3.json is asynchronous, 
// so we need to put anything involving those files into a function that we *know* won't get called until those files are loaded.
// That's the ready function -- it does EVERYTHING that directly involves TopoJSON files.

// Note that we're using a function statement here, rather than a function expression.
// I.e., we're saying "function foo(bar) {baz}" rather than "var foo = function(bar) {baz}".
// That's because function statements are *hoisted* -- 
// you can stick one in anywhere in your code and it will act as if you defined a function using a function expression at the very top.
// The practical upshot of this is that you can call a function defined in a function statement before you actually define it!
// Normally this is sloppy (so saith Crockford), 
/// but in this case, it leads to better logical flow in the code to load the JSON files first and then define ready_function.

function ready_function(error, world) {
    
    // Setting up a group to contain the map stuff.
    var g = svg.append("g")
    
    // Get the land information out of the world map TopoJSON object.
    var world = topojson.object(world, world.objects.land);
    
    // Specify the projection.
    var world_projection = d3.geo.mollweide()
                                .translate([0, 0])
                                .scale(map_scale);
    
    // Create a path.
    var world_path = d3.geo.path().projection(world_projection);
    
    // Specify the Gaussian blur parameters.
    var filter = svg.append("defs")
                    .append("filter")
                    .attr("id", "blur")
                    .append("feGaussianBlur")
                    // NB: stdDeviation can take two parameters:
                    // the first is sigma_x and the second is sigma_y;
                    // both are in pixels.
                    .attr("stdDeviation", "0");
    
    // Setting up the border for the world map.
    var border = g.append("path")
                    .datum({type: "Sphere"})    // This line is a trick I stole from Mike Bostock.
                    .attr("d", world_path)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
                    .attr("fill", "none");
    
    // Setting the border as a clipping path for the actual map -- we don't want the blur to spill over the boundaries.
    g.append("clipPath")
        .attr("id", "edge-of-the-world")
        .append("path")
            .datum({type: "Sphere"})
            .attr("d", world_path);
    
    // Plot the actual map!
    g.append("path")
        .datum(world)
        .attr("d", world_path)
        .attr("class", "land")
        .attr("clip-path", "url(#edge-of-the-world)")
        .attr("filter", "url(#blur)");
    
    // Find the width and height of the map.
    var map_boundingbox = world_path.bounds(world);
    var map_width = (map_boundingbox[1][0] - map_boundingbox[0][0]);
    var map_height = (map_boundingbox[1][1] - map_boundingbox[0][1]);
    // A map of the world should be about half as high as it is wide, at least in most standard projections.
    var map_ratio = map_width/map_height/2;
    console.log(map_ratio);
    
    // Stretch or shrink the container holding the map to fit the screen.
    var scaling_factor = Math.min(max_map_width/map_width, max_map_height/map_height);
    g.attr("transform", "translate(" + W/2 + "," + H/2 + ")scale(" + scaling_factor +")");
    border.attr("stroke-width", 1/scaling_factor);
    
    
    // Transitioning the values of the Gaussian blur filter over the map.
    var degree = map_width/360;
    filter.transition()
        .ease("linear")
        .delay(3000)
        .duration(1000)
        .attr("stdDeviation", cobe_res*degree)
        .each("end", function(){
            svg.append("text")
                .text("Resolution of COBE (1992)")
                .attr("id", "label")
                .attr("x", label_x)
                .attr("y", label_y)
                .attr("font-size", label_size);
            
            d3.select(this).transition()
                .delay(3000)
                .ease("linear")
                .duration(1000)
                .each("start", function(){
                    svg.selectAll("#label")
                        .remove();
                })
                .attr("stdDeviation", wmap_res*degree)
                .each("end", function(){
                    svg.append("text")
                        .text("Resolution of WMAP (2003)")
                        .attr("id", "label")
                        .attr("x", label_x)
                        .attr("y", label_y)
                        .attr("font-size", label_size);
                     
                    d3.select(this).transition()
                            .delay(3000)
                            .ease("linear")
                            .duration(1000)
                            .each("start", function(){
                                svg.selectAll("#label")
                                    .remove();
                            })
                            .attr("stdDeviation", planck_res*degree)
                            .each("end", function(){
                                svg.append("text")
                                    .text("Resolution of Planck (2013)")
                                    .attr("id", "label")
                                    .attr("x", label_x)
                                    .attr("y", label_y)
                                    .attr("font-size", label_size);
                                })
                })
            });
        
};