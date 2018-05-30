

var holaMundo = function () {
    alert('HolaMundo');
}

var miEvent = function () {
$('.miBoton').on('click', holaMundo);
}


$(document).ready(miEvent);
