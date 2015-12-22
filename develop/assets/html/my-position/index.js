define([
  '../../components/header/index',
  '../../components/nav/index',
  '../../components/content/index',
  '../../components/my-position/index',
  '../../components/copyright/index',
  '../../components/position-edit/index'
], function (header, nav, content, myPosition, copyright, positionEdit) {
  return {
    header: header,
    nav: nav,
    contentSection: {
      content: content,
      list: [myPosition]
    },
    copyright: copyright,
    positionEdit: positionEdit
  };
});
