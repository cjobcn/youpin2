define([
  '../header/index',
  '../nav/index',
  '../content/index',
  '../copyright/index',
  '../position-edit/index'
], function (header, nav, contentSection, copyright, positionEdit) {
  return {
    header: header,
    nav: nav,
    contentSection: contentSection,
    copyright: copyright,
    positionEdit: positionEdit
  };
});
