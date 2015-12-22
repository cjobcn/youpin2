define(['./ajax-keys'], function (ajaxKeys) {
  //filterList['filter_list']['manager_list'];
  return function getCustomerManager(data) {
    return data.map(function (one) {
      return {
        name: one['real_name'],
        id: one.id,
        isCustomerManager: true,
        active: false,
        count: false,
        ajax: {key: ajaxKeys.manager, value: one.id}
      };
    });
  };
});
