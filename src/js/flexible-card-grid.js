
var FlexibleCardGrid = (function() {

	function FlexibleCardGrid( option ) {

		var base_size = 240,
			base_height = 240, // percentage
			horizontalTileCount = option.horizontalTileCount,
			cards = option.cards, // array containing card data
			$container = option.container;


		this.alignCards = function(){

			var cur_y,
				tiles = [],
				card_area,
				isCardPositionSet; // check if a card got it's own position

			// traverse cards
			for (var card_idx = 0; card_idx < cards.length; card_idx++) {

				// init x=0, y=0
				// this.resetCardPosition(cards[card_idx]);
				isCardPositionSet = false;

				// check if width of a card overs widths of the container
				if(cards[card_idx].width > horizontalTileCount){
					console.error('size of the card num ' + card_idx +' is larger than container.');
					return null;
				}

				cur_y = 0;


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

			// console.log(cards);
		}

		this.addCardElement = function() {

			$container.find('.card').remove();

			for (var i = 0, style; i < cards.length; i++) {

				style = 'width:' + (base_size* cards[i].width) + 'px; height:' + (base_size* cards[i].height) + 'px; left:'+ (base_size* cards[i].posX) + 'px; top:' + (base_size* cards[i].posY) + 'px;';
				$container.append(
					'<div class=\"card\" style=\"' + style + ' \">' + cards[i].content + '</div>'
				);
			}

		}

		this.setCardPosition =  function( cards ) {

			var $card_box = $('.card');

			for (var i = 0; i < $card_box.length; i++) {
				$card_box.eq(i).css('width', (cards[i].width * base_size) );
				$card_box.eq(i).css('height', (cards[i].height * base_size) );
				$card_box.eq(i).css('left', (cards[i].posX * base_size) );
				$card_box.eq(i).css('top', (cards[i].posY * base_size ));
			}
		}

		this.adjustToViewport =  function( viewportSize ) {
			// console.log(viewportSize);

			if( viewportSize < 480){
				$('.container').css('width', base_size*1);
				horizontalTileCount = 1
				this.alignCards();
				this.updateCardPosition();
			}
			else if( viewportSize < 720){
				$('.container').css('width', base_size*2);
				horizontalTileCount = 2
				this.alignCards();
				this.updateCardPosition();
			}
			else if( viewportSize < 920){
				$('.container').css('width', base_size*3);
				horizontalTileCount = 3
				this.alignCards();
				this.updateCardPosition();
			}
			else{
				$('.container').css('width', 960);
				horizontalTileCount = 4
				this.alignCards();
				this.updateCardPosition();
			}
		}

		this.updateCardPosition = function() {

			var $cards = $container.find('.card');

			for (var i = 0; i < cards.length; i++) {
				$cards.eq(i).css('left', base_size*cards[i].posX);
				$cards.eq(i).css('top', base_size*cards[i].posY);
			}
		}


		this.createTile = function(posX, posY) {
			return { x: posX, y: posY }
		}

		this.resetCardPosition = function ( card ){
			card.posX = 0;
			card.posY = 0;
		}

	}

	return FlexibleCardGrid;

}());

