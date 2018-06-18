 (function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission

    
    var validation = Array.prototype.filter.call(forms, function(form) {
        
      form.addEventListener('submit', function(event) {
        let pass1 = $('.pass1').val();
        let pass2 = $('.pass2').val();
        
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if(pass1 !== pass2){
          $('.container').append('<p>Las contraseñas deben ser iguales</p>');
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

/*
let miFunc=(username, pass)=>{
let obj= JSON.stringify({
  nombre:username,
  contraseña: pass
});

localStorage.setItem('Usuario', obj);
}

module.exports = miFunc;*/