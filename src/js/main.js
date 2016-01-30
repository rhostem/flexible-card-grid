;(function(global){

	'use strict';

	var flexCard = new FlexibleCardGrid({

		cards: cards_data,
		horizontalTileCount: 2,

	});

	var aligned = flexCard.getAlignedCards();
	console.log(aligned);


	// $(document).ready(function() {
	// 	setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 1 } ) );
	// 	// responsiveFlowingCard(window.innerWidth, cards);
	// });ss


	// $(window).resize(function() {
	// 	// console.log(window.innerWidth);
	// 	// responsiveFlowingCard( window.innerWidth, cards );
	// })

})(window);