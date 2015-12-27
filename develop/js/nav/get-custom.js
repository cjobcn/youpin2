define(['./ajax-keys'], function (ajaxKeys) {
  // filterList['filter_list']['client_list']
  return function getCustom(data) {
    return data.map(function (one) {
      return {
        name : one['show_name'],
        id: one.id,
        isCustomer: true,
        active: false,
        count : false,
        ajax : { key: ajaxKeys.client, value: one.id }
      }
    });
  }
});
