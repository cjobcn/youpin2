requirejs.config({
	baseUrl : "../javascripts/",
	paths : {
		jquery : "libs/jquery-2.1.4.min"
	}
});

require(["controllers/yp-tab"], function (ypTab) {
	ypTab({
		container: "#selection-menu",
		nav: ".selection-nav-list",
		content: ".selection-content-list",
		navItem: "a.selection-nav",
		contentItem: ".selection-content",
		mask: ".selection-mask"
	});
});