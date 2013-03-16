// COPYRIGHT INFO GOES HERE
// PRESUMABLY THIS IS COPYRIGHT NEW SCIENTIST, 2013

////////////////////////////////////////
// GLOBAL LOCATION AND SIZE VARIABLES //
///////////////////////////////////////

// Find the height and width of the current window.
// Note that this will not rescale if you change the window size while on the page,
// but I find it hard to care too much about that.
var H = d3.select("body").property("offsetHeight");
var W = d3.select("body").property("offsetWidth");

var title_x = W/2, title_y = H/12, title_font_size = Math.min(W, H)/16;

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

// // We've got to load the JSON files before we do anything else,
// // because d3.json is asynchronous.
// // That's also why we need to use Bostock's queue library, or something like it.
// queue()
//     .defer(d3.json, "us.json")
//     .defer(d3.json, "topo_districts.json")
//     .defer(d3.csv, "2012_data.csv")
//     .await(ready_function);                 // run ready_function AFTER the TopoJSON files and the CSV file are all loaded.

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
    
    var world = topojson.object(world, world.objects.land);
    
    var world_projection = d3.geo.mollweide()
                                .scale(200)
                                .translate([W/2, H/2])
                                .precision(0.1);
    
    var world_path = d3.geo.path().projection(world_projection);
    
    var filter = svg.append("defs")
                    .append("filter")
                    .attr("id", "blur")
                    .append("feGaussianBlur")
                    .attr("stdDeviation", "0.0, 0.0");
    
    svg.append("path")
        .datum({type: "Sphere"})
        .attr("d", world_path)
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none");
    
    svg.append("clipPath")
        .attr("id", "edge-of-the-world")
        .append("path")
            .datum({type: "Sphere"})
            .attr("d", world_path);
    
    svg.append("path")
        .datum(world)
        .attr("d", world_path)
        .attr("class", "land")
        .attr("clip-path", "url(#edge-of-the-world)")
        .attr("filter", "url(#blur)");
    
    filter.transition()
        .ease("linear")
        .delay(1000)
        .duration(10000)
        .attr("stdDeviation", "100.0, 100.0")
        .transition()
        .ease("linear")
        .duration(10000)
        .attr("stdDeviation", "0.0, 0.0");
        
};