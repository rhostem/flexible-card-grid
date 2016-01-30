;(function(global){

	'use strict';


	$(document).ready(function() {


		var flexCard = new FlexibleCardGrid({

			cards: cards_data,
			horizontalTileCount: 4,
			container: $('.container')
		});

		flexCard.alignCards();
		flexCard.addCardElement();
		flexCard.adjustToViewport( window.innerWidth );

		// setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 1 } ) );
		// responsiveFlowingCard(window.innerWidth, cards);

		$(window).resize(function() {
			flexCard.adjustToViewport( window.innerWidth );
		});

	});






})(window);