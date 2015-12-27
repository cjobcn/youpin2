define([
  '../header',
  '../nav',
  './list',
  '../copyright',
  '../position-edit'
], function (header, nav, positionList, copyright, positionEdit) {
  return {
    header: header,
    nav: nav,
    contentSection: {
      list: [positionList]
    },
    copyright: copyright,
    positionEdit: positionEdit
  };
});
