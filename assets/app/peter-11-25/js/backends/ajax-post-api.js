function applycopperation(obj) {
  var url = $(obj).attr('url');
  var id = $(obj).attr('id');
  var commission_rate = $('#commission_rate' + id).val();
  var protect_time = $('#protect_time' + id).val();
  $.post(url, {
    commission_rate: commission_rate,
    protect_time: protect_time
  }).success(function (data) {
    if (data.status == 1) {
      $(obj).parent().parent().find(".status").html('已发送申请，等待对方答复');
      $(obj).parent().html('');
    } else {}
  });
}