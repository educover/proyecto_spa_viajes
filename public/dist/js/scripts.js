
 (function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission

    
    var validation = Array.prototype.filter.call(forms, function(form) {
        
      form.addEventListener('submit', function(event) {
        var pass1 = $('.pass1').val();
        var pass2 = $('.pass2').val();
        
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if(pass1 !== pass2){

          $('.container').append('<p>Las contraseñas deben ser iguales, gilipoyas</p>');
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

var miFunc = function(){
  var texto = $('.userCorrecto input').val();
  console.log('usuario ->' + texto);
  if(texto===''){
    return;
  } else if(typeof(texto)==='undefined'){
    console.log(texto)
    return;
  }else{
  localStorage.setItem('Usuario', texto);
  }
};

$('.userCorrecto').change(miFunc());


$("input[type='checkbox']").change(function(e) {
  console.log(e.target.id)
  var id = e.target.id;
  window.location="http://localhost:3000/admin/modificar/"+id;
});



function eliminaFila(id){
  window.location="http://localhost:3000/admin/elim/"+id;
}

$('.dropdown-toggle').dropdown()

function miPopUpEdit(id, travel){
  $('.travel').append(`<p>${travel}</p>`);
}



