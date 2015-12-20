define([
  '../../components/header/index',
  '../../components/nav/index',
  '../../components/content/index',
  '../../components/delegate-position/index',
  '../../components/copyright/index',
  '../../components/position-edit/index'
], function (header, nav, content, delegatePosition, copyright, positionEdit) {
  return {
    header: header,
    nav: nav,
    contentSection: {
      content: content,
      list: [delegatePosition]
    },
    copyright: copyright,
    positionEdit: positionEdit
  };
});
