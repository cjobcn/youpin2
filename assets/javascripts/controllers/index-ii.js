(function (ypTemplate, data) {
  [].slice.call(document.body.querySelectorAll('*')).forEach(function (node) {
    if (node.id && ypTemplate[node.id])
      node.innerHTML = ypTemplate[node.id](data);
  });
})(window.ypTemplate, window['t-data']);