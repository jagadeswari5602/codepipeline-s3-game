document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card6', img: 'images/image1.png' },
        { name: 'card6', img: 'images/image1.png' },
        { name: 'card7', img: 'images/Untitled design (2).png' },
        { name: 'card7', img: 'images/Untitled design (2).png' },
        { name: 'card8', img: 'images/image2.png' },
        { name: 'card8', img: 'images/image2.png' },
        { name: 'card9', img: 'images/Untitled design (4).png' },
        { name: 'card9', img: 'images/Untitled design (4).png' },
        { name: 'card10', img: 'images/Untitled design (5).png' },
        { name: 'card10', img: 'images/Untitled design (5).png' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/main.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/main.png');
            cards[secondCardId].setAttribute('src', 'images/main.png');
        }

        cardsChosen = [];
        cardsChosenId = [];
        const messageElement = document.getElementById('message');

        if (cardsWon.length === cardArray.length / 2) {
            messageElement.innerHTML= "<h1>CONGRATULATIONS!YOU WON THE GAME</h1>";
        }
    }

    startButton.addEventListener('click', createBoard);
});
