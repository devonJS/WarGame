$(document).ready(function() {

	//what does this do?
    //Converts getting numbers 11-13 to a face card value, also returns the number in string form
    // probably should call this at the very end so you can continue to compare numbers without reverting
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
                //added case for 14 to be ace
                case 14:
                return 'Ace';
                break;
			}
		}
		return value.toString();
	};

	//what does this do?
    //Makes the card deck, all 52 cards is assigned a value and a suit.  Cards are objects containing 2 properties: values and suits
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
        //changed j=0 to j=1 and j < 13 to j < 14
		for (var j = 1; j<14; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
    //Creates a copy of the deck, but rearranges everything by random.  Random number generator selects a card from the deck, and pushes it to the copy array
    //then the card is deleted, and the loop will run 51 (or however many more cards in the deck) more times.

	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	};
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	var shuffledDeck = shuffle(deck);

	var cards_player_1 = [];
	var cards_player_2 = [];

	// write a function called deal that will evenly divide the deck up between the two players
    // take shuffled deck and split the cards one by one

	var deal = function(shuffledDeck){
        for(i=0;i < shuffledDeck.length; i++){
            if(i % 2 == 0){
                cards_player_1.push(shuffledDeck[i]);
            }
            else{
                cards_player_2.push(shuffledDeck[i]);
            }
        }
    };

    var dealMiniDeck = function(shuffledDeck){
        for(i=0;i < Math.floor((shuffledDeck.length) / 3); i++){
            if(i % 2 == 0){
                cards_player_1.push(shuffledDeck[i]);
            }
            else{
                cards_player_2.push(shuffledDeck[i]);
            }

        }
    };

    var dealDoubleWarShort = function(shuffledDeck){
        for(i=0;i < 14; i++){
            if(i % 2 == 0){
                cards_player_1.push(shuffledDeck[i]);
            }
            else{
                cards_player_2.push(shuffledDeck[i]);
            }
        }
        cards_player_1[0] = shuffledDeck[50];
        cards_player_2[0] = shuffledDeck[50];
        cards_player_1[4] = shuffledDeck[51];
        cards_player_2[4] = shuffledDeck[51];
        cards_player_2.push(shuffledDeck[40]);
        cards_player_2.push(shuffledDeck[41]);
        cards_player_2.push(shuffledDeck[42]);
        cards_player_2.push(shuffledDeck[43]);
        cards_player_2.push(shuffledDeck[44]);
        cards_player_2.push(shuffledDeck[45]);
    };

    var dealDoubleWar = function(shuffledDeck){
        for(i=0;i < shuffledDeck.length; i++){
            if(i % 2 == 0){
                cards_player_1.push(shuffledDeck[i]);
            }
            else{
                cards_player_2.push(shuffledDeck[i]);
            }
        }
        cards_player_1[0] = shuffledDeck[50];
        cards_player_2[0] = shuffledDeck[50];
        cards_player_1[4] = shuffledDeck[51];
        cards_player_2[4] = shuffledDeck[51];
    };
	//create a function (algorithm) called "war" that takes two cards as parameters,
	// compares them and returns a winner. A tie should return false.

    var war = function(cardPlayer1,cardPlayer2){
        if(cardPlayer1["number"] > cardPlayer2["number"]){
            return "Player1"
        }
        else if(cardPlayer1["number"] < cardPlayer2["number"]){
            return "Player2"
        }
        else{
            return false
        }
	};


	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length > 0 && cards_player_2.length > 0) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
		}
	};

    var warAnimation = function(){
        var warTime = true;
        var warCount = 4;
        while(warTime) {
            var card_1 = cards_player_1[warCount];
            var card_2 = cards_player_2[warCount];
            console.log("Animation card1: " + card_1["number"] + "| array size: " + cards_player_1.length);
            console.log("Animation card2: " + card_2["number"] + "| array size: " + cards_player_2.length)
            $("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit);
            $("#opp-card-count").html(cards_player_1.length);
            $("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit);
            $("#my-card-count").html(cards_player_2.length);

            if(war(cards_player_1[warCount],cards_player_2[warCount]) == "Player1" ){
                alert("You lost the war");
                warTime = false;
            }
            else if(war(cards_player_1[warCount],cards_player_2[warCount]) == "Player2" ){
                alert("Congrats, you won the war");
                warTime = false;
            }
            else{
                alert("Commence war again!");
                warCount += 4;
                if (cards_player_1.length <= warCount && cards_player_1.length < cards_player_2.length) {
                    alert ("You win the game");
                    return;
                    warTime = false;
                }
                else if (cards_player_2.length <= warCount && cards_player_2.length > cards_player_1.length) {
                    alert ("You lost the game");
                    return;
                    warTime = false;
                }
                else if(cards_player_2.length <= warCount && cards_player_1.length == cards_player_2.length){
                    alert ("It's a tie!");
                    return
                    warTime= false;
                }
                else{
                    warTime = true;
                }
            }
        }
    };

	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)

    //compare top card of each player's deck, then
    //winner takes both, places under deck
    //deal(shuffledDeck);
    dealMiniDeck(shuffledDeck);
    //dealDoubleWarShort(shuffledDeck);
    //dealDoubleWar(shuffledDeck);
	var play = function(){
        advance();
        var cardPlayer1 = cards_player_1[0];
        var cardPlayer2 = cards_player_2[0];
        console.log("inital Player 1: " + cardPlayer1["number"] + "| array size: " + cards_player_1.length);
        console.log("initial Player 2: " + cardPlayer2 ["number"] + "| array size:  + " + cards_player_2.length);
        //play if one card is bigger
        if(war(cardPlayer1,cardPlayer2) == "Player1"){
            if(cards_player_2.length == 1){
                alert("You lose the game!");
                return;
            }
            else if (cards_player_2.length > 1) {
                cards_player_1.push(cards_player_1[0], cards_player_2[0]);
                cards_player_1.shift();
                cards_player_2.shift();
            }
        }
        else if(war(cardPlayer1,cardPlayer2) == "Player2"){
            if(cards_player_1.length == 1){
                alert("You win the game!");
                return;
            }
            else if (cards_player_1.length > 1){
                cards_player_2.push(cards_player_1[0], cards_player_2[0]);
                cards_player_1.shift();
                cards_player_2.shift();
            }
        }
        else if(war(cardPlayer1,cardPlayer2) == false && cards_player_1.length < 4 && cards_player_2.length > cards_player_1.length){
            alert("You win the game!");
            return;
        }
        else if(war(cardPlayer1,cardPlayer2) == false && cards_player_2.length < 4 && cards_player_1.length > cards_player_2.length){
            alert("You lose the game!");
            return;
        }
        else if(war(cardPlayer1,cardPlayer2) == false && cards_player_2.length < 4 && cards_player_1.length == cards_player_2.length){
            alert("You both don't have enough cards for war, and have the same amount,it's a tie!");
            return;
        }
        //Play where cards are tied
        else if(war(cardPlayer1,cardPlayer2) == false){
            alert("It's war time yo");
            var warTime = true;
            var warCount = 4;
            if (cards_player_1.length <= warCount && cards_player_1.length < cards_player_2.length) {
                alert ("You win the game");
                return;
                warTime = false;
            }
            else if (cards_player_2.length <= warCount && cards_player_2.length > cards_player_1.length) {
                alert ("You lost the game");
                return;
                warTime = false;
            }
            else if(cards_player_2.length <= warCount && cards_player_1.length == cards_player_2.length){
                alert ("It's a tie!");
                return;
                warTime = false;
            }
            else{
                warTime = true;
            }
            console.log("warcounter first: " + warCount);

            //Drawing the war cards to compare
            var warCard1 = cards_player_1[warCount];
            var warCard2 = cards_player_2[warCount];

            //Update card visually for war card comparison

            warAnimation();

            while(warTime) {

                console.log("Player 1: " + warCard1["number"] + "| array size: " + cards_player_1.length);
                console.log("Player 2: " + warCard2["number"] + "| array size: " + cards_player_2.length);
                warCard1 = cards_player_1[warCount];
                warCard2 = cards_player_2[warCount];
                //Maybe check for end game condition: 1 player has less than 4 cards


                //War resolves when one cards is bigger
                if (war(warCard1, warCard2) == "Player1") {
                    for (i = 0; i < warCount + 1; i++) {
                        cards_player_1.push(cards_player_1[i]);
                        cards_player_1.push(cards_player_2[i]);
                        cards_player_1.shift();
                        cards_player_2.shift();
                    }
                    warTime = false;
                }
                else if (war(warCard1, warCard2) == "Player2") {
                    for (i = 0; i < warCount + 1; i++) {
                        cards_player_2.push(cards_player_1[i]);
                        cards_player_2.push(cards_player_2[i]);
                        cards_player_1.shift();
                        cards_player_2.shift();
                    }
                    warTime = false;
                }
                else if (war(warCard1, warCard2) == false) {
                    warCount += 4;
                    console.log("war counter second: " + warCount);

                }
            }
        }

		//this function (defined below) will continue to the next turn
	};
    var simulate = function(){
        var continueGame = true;
        while(continueGame){
            play();
            if(cards_player_1.length > 1 && cards_player_2.length > 1){
                continueGame = true;
            }
            else {
                continueGame = false;
                return;
            }
        }
    };
    //var newGame = function(){
    //    var shuffledDeck = shuffle(deck);
    //    deal(shuffledDeck);
    //    play();
    //    console.log("new game started");
    //};


$("#play").click(function () {
    play();
});

$("#simulate").click(function(){
    simulate();
});
//$("#newGame").click(function(){
//    newGame();
//});
});
