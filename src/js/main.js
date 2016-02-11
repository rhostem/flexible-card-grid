;(function(global){

	'use strict';


	$(document).ready(function() {


		var flexCard = new FlexibleCardGrid({
			cards: cards_data,
			// horizontalTileCount: 4,
			selector: '.container'
		});

		flexCard.init();

		// $(window).resize( function() {
		// 	flexCard.adjustToViewport();
		// });

	});


})(window);