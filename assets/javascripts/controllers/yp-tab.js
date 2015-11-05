define(["jquery"], function ($) {
	return function (data) {
		var $container = $(data.container);
		var $nav = $container.find(data.nav);
		var $content = $container.find(data.content);
		var active = data.active || 'active';
		$nav.on("mouseenter", data.navItem, toggle).on("mouseleave", data.navItem, toggle);
		$content.on("mouseenter", data.contentItem, toggle).on("mouseleave", data.contentItem, toggle);
		function toggle(e) {
			var $self = $(this);
			var index = $self.attr("index");
			if (index == null) return false;
			var $contentItem = $content.find(data.contentItem + "[index='" + index + "']");
			if ($contentItem.length === 1) {
				$contentItem.toggleClass(active);
				var $navItem = $nav.find(data.navItem + "[index='" + index + "']");
				if ($navItem.length === 1) {
					$navItem.toggleClass(active);
					if (!data.mask) return false;
					if ($navItem.hasClass(active)) {
						$navItem.find(data.mask).show();
					} else {
						$navItem.find(data.mask).hide();
					}
				}
			}
			return false;
		}
	};
});