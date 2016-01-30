
var FlexibleCardGrid = (function() {

	function FlexibleCardGrid( option ) {

		var base_size = 240,
			base_height = 240, // percentage
			tiles = [],
			card_area,
			isCardPositionSet, // check if a card got it's own position
			cur_y,
			horizontalTileCount = option.horizontalTileCount,
			cards = option.cards; // array containing card data


		this.getAlignedCards = function(){

			// traverse cards
			for (var card_idx = 0; card_idx < cards.length; card_idx++) {

				// init x=0, y=0
				cur_y = 0;
				isCardPositionSet = false;

				// check if width of a card overs widths of the container
				if(cards[card_idx].width > horizontalTileCount){
					console.error('size of the card num ' + card_idx +' is larger than container.');
					return null;
				}

				var brk = 0;
				// while( !isCardPositionSet || brk < 10){
				while( !isCardPositionSet ) {

					// traverse x position wihin container width
					for (var cur_x = 0, isDuplicate ; cur_x < horizontalTileCount; cur_x++) {
						card_area = [];

						// 현재 위치에서 가로 넓이가 컨테이너 넓이를 넘지 않아야 한다.
						if(cur_x + cards[card_idx].width > horizontalTileCount){
							break;
						}


						// console.log(cards[card_idx].width);
						// console.log(cards[card_idx].height);

						// make card area
						for (var temp_x = cur_x; temp_x < cur_x + cards[card_idx].width ; temp_x++) {
							for (var temp_y = cur_y; temp_y < cur_y + cards[card_idx].height ; temp_y++) {
								card_area.push(this.createTile(temp_x, temp_y));
								// console.log(temp_x, temp_y);
							}
						}

						// console.log(card_area);
						// console.log('tiles', tiles);

						isDuplicate = false;
						for (var chk_cidx = 0; chk_cidx < card_area.length; chk_cidx++) {
							for (var chk_tidx = 0; chk_tidx < tiles.length; chk_tidx++) {

								if( (card_area[chk_cidx].x === tiles[chk_tidx].x) && (card_area[chk_cidx].y === tiles[chk_tidx].y) ){
									// 카드 영역과 타일 영역 중에 겹치는 부분이 있음
									isDuplicate = true;
								}
							}
						}

						if( isDuplicate === true ){
							isCardPositionSet = false;
						}else{
							// 포지션을 찾았음. 더이상 컨테이너 내부를 탐색할 필요 없음
							isCardPositionSet = true;
							// 카드 영역을 타일에 추가
							for (var i = 0; i < card_area.length; i++) {
								tiles.push(card_area[i]);
							}

							cards[card_idx].posX = cur_x;
							cards[card_idx].posY = cur_y;

							// console.log(cur_x, cur_y);
							break; // break traversing container
						}

					}

					if(isCardPositionSet){
						break; // break infinite while loop
					}else{
						cur_y++;
					}

				}// end of while( !isCardPositionSet )

			}// end of for (var card_idx = 0; card_idx < cards.length; card_idx++)

			return cards;

		}

		this.setCardPosition =  function( cards ) {

			var $card_box = $('.card');

			for (var i = 0; i < $card_box.length; i++) {
				$card_box.eq(i).css('width', (cards[i].width * base_size) );
				$card_box.eq(i).css('height', (cards[i].height * base_height) );
				$card_box.eq(i).css('left', (cards[i].posX * base_size) );
				$card_box.eq(i).css('top', (cards[i].posY * base_height ));
			}
		}

		this.responsiveFlowingCard =  function( viewportSize ) {

			if(window.innerWidth < 920){
				$('.container').css('width', 720);
				setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 3 } ) );
			}
			else if(window.innerWidth < 720){
				$('.container').css('width', 480);
				setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 2 } ) );
			}
			else if(window.innerWidth < 480){
				$('.container').css('width', 240);
				setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 1 } ) );
			}
			else{
				$('.container').css('width', 960);
				setCardPosition( flowingCard({ 'cards': cards, 'horizontalTileCount': 4 } ) );
			}
		}


		this.createTile = function(posX, posY) {
			return { x: posX, y: posY }
		}

	}

	return FlexibleCardGrid;

}());

