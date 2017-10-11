$('#btn-project').click(function () {
  $.ajax({
    type: "post",
    data: $('#form-project').serialize(),
    dataType: 'json',
    success: function (response) {
      console.log(response)

    },
    error: function (error) {
      console.log(error);
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
    }
  });
});