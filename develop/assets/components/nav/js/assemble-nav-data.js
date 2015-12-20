define([
  './filter-list',
  './area',
  './get-city',
  './get-custom',
  './get-industry',
  './get-custom-manager'
], function (filterList, area, getCity, getCustom, getIndustry, getCustomManager) {
  filterList = filterList.filter_list;

  var city = getCity(area);
  var custom = getCustom(filterList.client_list);
  var industry = getIndustry(filterList.industry);
  var customManager = getCustomManager(filterList.manager_list);

  return {
    city: city,
    custom: custom,
    industry: industry,
    customManager: customManager
  };
});
