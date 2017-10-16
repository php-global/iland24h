/*

$('#form-project').submit(function (e) {
  e.preventDefault();
  var data1={
    title:$('#title').val(),
    title:$('#owner').val(),
    title:$('#area').val(),
    title:$('direction').val(),
    title:$('location').val(),
    title:$('title').val(),
    title:$('title').val(),
    title:$('title').val(),
  }
  $.ajax({
    type:'post',
    url:'insert',
    data: new FormData($("#form-project")[0]), /!*new FormData(this)*!/
    processData: false,
    dataType: 'json',
    success: function (data) {
      $('modal-project').hide();
      location.reload('projects.index');
    },
    error: function (error) {

      if (error.responseJSON) {
        $('#form-project').find('input:visible,erea').each(function () {
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
});*/



$('.edit-form').click(function () {
    // alert('click');
    var id = $(this).attr('data-id');
    $.ajax({
       url:'/projects/' + id + '/edit',
       type: 'GET',
       success: function (response) {
         $('#contentDialog').html('');
         $('#contentDialog').html(response);
       }
     });

});
$(document).ready(function(){
  $(".delete_data").click(function(){
    var del_id = $(this).attr('id');
    $.ajax({
      type:'DELETE',
      url:'/projects/' + del_id,
      success:function(data) {
        console.log(data);
      },
      error:function (error) {
        console.log(error.responseJSON);
      }
    });

  });
});
/*
$('#btn-project').click(function (e) {
  if($('#error').val()){
    e.preventDefault();
  }

});
*/


