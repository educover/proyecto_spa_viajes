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
        
        if (form.checkValidity() === false){
          event.preventDefault();
          event.stopPropagation();
        }
        if(pass1 !== pass2){

          $('.container').appendTo('<p>Las contraseñas deben ser iguales, gilipoyas</p>');
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


$("input[class='miCheckBox']").change(function(e) {
  console.log(e.target.id)
  var id = e.target.id;
  window.location="http://localhost:3000/admin/modificar/"+id;
});

$("input[class='miCheckActive']").change(function(e) {
  console.log(e.target.id)
  var id = e.target.id;
  window.location="http://localhost:3000/admin/users/desactivate/"+id;
});

$("input[class='miCheckBoxAdmin']").change(function(e) {
  console.log(e.target.name)
  var id = e.target.name;
  //alert(id)
  window.location="http://localhost:3000/admin/users/admin1/"+id;
});


$('.dropdown-toggle').dropdown()


  var miFunction= function(id){
    $('.idTravel').empty();
    $('.idTravel').append(id);
  }



/*var modificar = function(e){
  console.log(e.target)
  var travel = $('input[name=travel]').val()||1;
  var ahorro = $('input[name=ahorro]').val()||1;
  var precio = $('input[name=price]').val()||1;
 
  var id = $('.idTravel').text();
  console.log(id)
  console.log(travel)
  console.log(ahorro)
  console.log(precio)
  $.post("http://localhost:3000/admin/modificar/",{"datos":"prueba"});
  //window.location="http://localhost:3000/admin/modificar/"+id+"/"+travel+"/"+precio+"/"+ahorro;

}*/



 // $('body').on('click', 'button[name=submit1]', enviarModificar);

function eliminaFila(id){

      var elem = $(this).closest('.item');

      $.confirm({
          'title'     : 'Borrar viaje',
          'message'   : 'Deseas borrar el viaje. <br />No se puede recuperar! Continamos?',
          'buttons'   : {
              'Yes'   : {
                  'class' : 'blue',
                  'action': function(){
                    window.location="http://localhost:3000/admin/elim/"+id;
                  }
              },
              'No'    : {
                  'class' : 'gray',
                  'action': function(){}  // Nothing to do in this case. You can as well omit the action property.
              }
          }
      });
    }

    function eliminaUsuario(id){

      var elem = $(this).closest('.item');

      $.confirm({
          'title'     : 'Borrar usuario',
          'message'   : 'Deseas borrar el usuario. <br />No se puede recuperar! Continamos?',
          'buttons'   : {
              'Yes'   : {
                  'class' : 'blue',
                  'action': function(){
                    window.location="http://localhost:3000/admin/users/elim/"+id;
                  }
              },
              'No'    : {
                  'class' : 'gray',
                  'action': function(){}  // Nothing to do in this case. You can as well omit the action property.
              }
          }
      });
    }

    (function($){

      $.confirm = function(params){
  
          if($('#confirmOverlay').length){
              // A confirm is already shown on the page:
              return false;
          }
                  
          var buttonHTML = '';
          $.each(params.buttons,function(name,obj){
  
              // Generating the markup for the buttons:
  
              buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';
  
              if(!obj.action){
                  obj.action = function(){};
              }
          });
  
          var markup = [
              '<div id="confirmOverlay">',
              '<div id="confirmBox">',
              '<h1>',params.title,'</h1>',
              '<p>',params.message,'</p>',
              '<div id="confirmButtons">',
              buttonHTML,
              '</div></div></div>'
          ].join('');
  
          $(markup).hide().appendTo('body').fadeIn();
  
          var buttons = $('#confirmBox .button'),
              i = 0;
  
          $.each(params.buttons,function(name,obj){
              buttons.eq(i++).click(function(){
  
                  // Calling the action attribute when a
                  // click occurs, and hiding the confirm.
  
                  obj.action();
                  $.confirm.hide();
                  return false;
              });
          });
      }
  
      $.confirm.hide = function(){
          $('#confirmOverlay').fadeOut(function(){
              $(this).remove();
          });
      }
})(jQuery);

function enviaMail(email){
  $('.mailer').empty();
  $('.mailer').append(email);
  $(".text-hidden").toggleClass("text");
}



function modificar(){
  var idr = $('.idTravel').text();
  console.log("pulsado ->"+ idr);

  $.ajax(
    console.log($('input[name=file]').val()),
    {
    method: "POST",
    url: "http://localhost:3000/admin/modificar",
    data: { id: idr, travel: $('input[name=travel]').val(),
            ahorro: $('input[name=ahorro]').val(), precio: $('input[name=price]').val(),
            file: $('input[name=file]').val()}
  })
    .done(function( msg ) {
      console.log( "Data Saved: " + msg )
      
    });
}
