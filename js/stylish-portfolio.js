var miRuleta = new Winwheel({
           'numSegments': 21, // Número de segmentos
           'outerRadius'    : 170, // Radio externo
            'segments':[ // Datos de los segmentos
            { 'fillStyle': '#ff0000', 'text': '/S 25000' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S 10000' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S  5000' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S  1000' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S   500' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S   100' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' },
            { 'fillStyle': '#ff0000', 'text': '/S    50' },
            { 'fillStyle': '#a8a8a8', 'text': 'Suerte!' },
            { 'fillStyle': '#ffffff', 'text': 'Arriba Peru!' }
            ],
            'animation': { 
                'type': 'spinToStop', // Giro y alto
                'duration': 5, // Duración de giro
                'callbackFinished': 'Mensaje()', // Función para mostrar mensaje
                'callbackAfter': 'dibujarIndicador()' // Funciona de pintar indicador
              }
            });

(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict



$(document).ready(function(){

  $("#btn-inicio").click(function() {

    alert("Validar DNI"); 
  });
  
 
});


// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);

function dibujarIndicador() {
  var ctx = miRuleta.ctx;
  ctx.strokeStyle = 'navy';     
  ctx.fillStyle = 'black';     
  ctx.lineWidth = 2;
  ctx.beginPath();             
  ctx.moveTo(170, 0);          
  ctx.lineTo(230, 0);          
  ctx.lineTo(200, 40);
  ctx.lineTo(171, 0);
  ctx.stroke();                
  ctx.fill();                  
}

function Mensaje() {
   var SegmentoSeleccionado = miRuleta.getIndicatedSegment();
   alert("Elemento seleccionado:" + SegmentoSeleccionado.text + "!");
   miRuleta.stopAnimation(false);
   miRuleta.rotationAngle = 0;
   miRuleta.draw();
   dibujarIndicador();
 }
