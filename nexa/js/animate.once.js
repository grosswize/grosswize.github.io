(function($) {
	$.fn.animated = function(inEffect) {
		$(this).css("opacity", "0").waypoint(function(dir) {
			if (dir === "down") {
					$(this).addClass(inEffect).css("opacity", "1");
			};
		}, {
			offset: "80%"
		});
	};
})(jQuery);