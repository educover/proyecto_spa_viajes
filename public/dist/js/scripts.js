
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
       
       
        
        
      }, false);
      let pass1 = $('.pass1').value().trim();
      let pass2 = $('.pass2').value().trim();
      if(!(pass1===pass2)){
        $('.container').append('<p>Las contraseñas osn distintas</p>');
        form.checkValidity() = false;
        event.preventDefault();
        event.stopPropagation();
      } else {
        form.classList.add('was-validated');
      }
    });
  }, false);
})();