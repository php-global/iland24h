/*
$('#form-project').submit(function (e) {
  e.preventDefault();
  $.ajax({
    src :$('#form-project').attr('action'),
    type: "post",
    data: new FormData(this),
    processData: false,
    dataType: 'json',
    success: function (data) {
      alert(1);
    },
    error: function (error) {
      //console.log(error);
      if (error.responseJSON) {
        $('#form-project').find('input:visible, textarea').each(function () {
          if (error.responseJSON.hasOwnProperty($(this).attr('name'))) {
            $(this).closest('div').removeClass('has-success').addClass('has-error');
            $(this).prev().find('.fa-status').removeClass('fa-check').addClass('fa-times-circle-o');
            $(this).next().text(eval('error.responseJSON.' + $(this).attr('name') + '[0]'));
          } else {
            $(this).closest('div').removeClass('has-error').addClass('has-success');
            $(this).prev().find('.fa-status').removeClass('fa-times-circle-o').addClass('fa-check');
            $(this).next().text('');
          }
        });
      } else {
        alert(error.statusText);
      }
    }
  });
});

*/


/*
$('#form-project').validate({
  onkeyup: false,
  rules: {

  title: {
      required: true,
      minlength: 5
    },
  owner: {
      required: true,
    },
    image1: {
      required: true,
      maxlength:5000
    },
    price: {
      required: true,
    }

  }
,

  submitHandler: function(form) {
  $.ajax({
    url: form.action,
    type: form.method,
    data: $(form).serialize(),
    success: function(response) {
      $('#answers').html(response);
    },
    error: function (error) {
        console.log(error);
    }
  });
}
});
*/


$('.edit-form').click(function () {
    // alert('click');
    var id = $(this).attr('id');
    $.ajax({
       url:'/getID',
       data: {'id':id},
       type:'GET',
       success: function (response) {
         $('#contentDialog').html('');
         $('#contentDialog').html(response);
       }
     });

});
$('.btn-project').click(function (e) {
  if($('#error').val()){
    e.preventDefault();
  }

});


