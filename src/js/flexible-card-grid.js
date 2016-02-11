
var FlexibleCardGrid = (function() {

  function FlexibleCardGrid( option ) {
    var self = this;
    var cards = option.cards; // array having card data

    var $container = $(option.selector);

    var container_width;
    var horizontalTileCount;

    var base_size;
    var base_height;

    /**
     * initialization
     *
     * @return {[type]} [description]
     */
    this.init = function() {
      this.adjustToViewport();
      this.addCardElement();

      $(window).resize( function() {
        self.adjustToViewport();
        self.updateCard();
      });

    }

    /**
     * align cards fit to container size
     * @return {[type]} [description]
     */
    this.alignCards = function(){

      var cur_y,
        tiles = [], // tiles set having all of the cards area
        card_area, // one of a card in the container
        isCardPositionSet; // check if a card got it's own position

      // traverse cards, reset position x
      for (var card_idx = 0; card_idx < cards.length; card_idx++) {

        isCardPositionSet = false;

        // check if width of a card overs widths of the container
        if(cards[card_idx].width > horizontalTileCount){

          // terminate the method
          console.error('size of the card num ' + card_idx +' is larger than container.');
          return null;
        }

        cur_y = 0; // reset position y

        while( !isCardPositionSet ) { // infinite loop until get a position

          // traverse x position wihin container width
          for (var cur_x = 0, isDuplicate ; cur_x < horizontalTileCount; cur_x++) {

            card_area = [];

            // width of a card must not overflow
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

            // duplication check between a card and tiles set
            for (var chk_cidx = 0; chk_cidx < card_area.length; chk_cidx++) {
              for (var chk_tidx = 0; chk_tidx < tiles.length; chk_tidx++) {

                if( (card_area[chk_cidx].x === tiles[chk_tidx].x) && (card_area[chk_cidx].y === tiles[chk_tidx].y) ){

                  isDuplicate = true;
                }
              }
            }

            if( isDuplicate === true ){

              isCardPositionSet = false;

            }else{

              // got position. need no more check
              isCardPositionSet = true;

              // add card area to tiles set
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
            cur_y++; // go to the next row
          }

        }// end of while( !isCardPositionSet )

      }// end of for (var card_idx = 0; card_idx < cards.length; card_idx++)

      self.updateCard();
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

    /**
     * set
     * - container width
     * - base size of card relative to container width
     * - horizontal number of tiles relative to container width
     */
    this.adjustToViewport =  function() {

      var viewportSize = window.innerWidth;

      horizontalTileCount = viewportSize < 768 ? 2 : 3 ;
      container_width = $container.innerWidth();
      base_size = container_width/horizontalTileCount;
      base_height = base_size;

      this.alignCards();

    }

    /**
     * update card width, height, position
     */
    this.updateCard = function() {

      var $cards = $container.find('.card');

      for (var i = 0; i < cards.length; i++) {
        $cards.eq(i).css('left', base_size*cards[i].posX);
        $cards.eq(i).css('top', base_height*cards[i].posY);
        $cards.eq(i).css('width', base_size*cards[i].width);
        $cards.eq(i).css('height', base_height*cards[i].height);
      }
    }

    this.createTile = function(posX, posY) {
      return { x: posX, y: posY }
    }

  }

  return FlexibleCardGrid;

}());

