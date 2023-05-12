// Variablen om elementen te selecteren
const messageEl = document.getElementById("message-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")
const dealerSumEl = document.getElementById("dealer-sum-el")
const playerCardsEl = document.getElementById("player-cards-el")
const playerSumEl = document.getElementById("player-sum-el")
let newCardBtn = document.querySelector("main section div:nth-of-type(2) button:nth-of-type(1)")
let doneBtn = document.querySelector("main section div:nth-of-type(2) button:nth-of-type(2)")

// Card images
let cardImages = {
    1: "img/A.png",
    2: "img/2.png",
    3: "img/3.png",
    4: "img/4.png",
    5: "img/5.png",
    6: "img/6.png",
    7: "img/7.png",
    8: "img/8.png",
    9: "img/9.png",
    10: "img/10.png",
    11: "img/J.png",
    12: "img/K.png",
    13: "img/Q.png"
}

// Variablen instellingen
let message = ""
newCardBtn.style.backgroundColor = "#A9A9A9"
doneBtn.style.backgroundColor = "#A9A9A9"
newCardBtn.disabled = true
doneBtn.disabled = true
let dealerIsAlive = false
let playerIsAlive = false
let dealerCards = cardImages
let playerCards = cardImages
let dealerSum = 0
let playerSum = 0

// getRandomCard()
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * Object.keys(cardImages).length) +  1
    let cardValue = randomCard
    if (cardValue === 1) {
        cardValue = 11
    }
    console.log("Card value:", cardValue)
    return cardValue
}

// resetGame()
function resetGame() {
    newCardBtn.style.backgroundColor = "#000000"
    newCardBtn.disabled = false
    doneBtn.style.backgroundColor = "#000000"
    doneBtn.disabled = false
    dealerIsAlive = true
    playerIsAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let thirdCard = getRandomCard()
    let forthCard = getRandomCard()
    while (firstCard + secondCard > 17) {
        firstCard = getRandomCard()
        secondCard = getRandomCard()
    }
    while (thirdCard + forthCard > 20) {
        thirdCard = getRandomCard()
        forthCard = getRandomCard()
    }
    dealerCards = [firstCard, secondCard]
    playerCards = [thirdCard, forthCard]
    dealerSum = firstCard + secondCard
    playerSum = thirdCard + forthCard
    checkResults()
    renderGame()
    messageEl.textContent = message
}

// checkResults()
function checkResults() {
    if (playerSum < 21 && dealerSum < 21) {
        dealerIsAlive = true
        playerIsAlive = true
        if (dealerIsAlive === true && playerIsAlive === true) {
            message = "Want to draw another card?"
        }
    } 
    
    if (playerSum > 21) {
        playerIsAlive = false
        dealerIsAlive = true
        if (playerIsAlive === false && dealerIsAlive === true) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You lost 😔 You're over 21."
        }
    } else if (dealerSum > 21 ) {
        playerIsAlive = true
        dealerIsAlive = false
        if (playerIsAlive === true && dealerIsAlive === false) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You won 🎉🎉🎉 The dealer is over 21."
        }
    } else if (playerSum > 21 && dealerSum > 21 ) {
        playerIsAlive = false
        dealerIsAlive = false
        if (playerIsAlive === false && dealerIsAlive === false) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You both lost."
        }
    } else if (playerSum === 21) {
        playerIsAlive = true
        dealerIsAlive = false
        if (playerIsAlive === true && dealerIsAlive === false) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You won 🎉🎉🎉 You've got Blackjack!"
        }
    } else if (dealerSum === 21) {
        playerIsAlive = false
        dealerIsAlive = true
        if (playerIsAlive === false && dealerIsAlive === true) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You lost 😔 The dealer has Blackjack!"
        }
    } else if (playerSum === 21 && dealerSum === 21) {
        playerIsAlive = true
        dealerIsAlive = true
        if (playerIsAlive === true && dealerIsAlive === true) {
            newCardBtn.style.backgroundColor = "#A9A9A9"
            newCardBtn.disabled = true
            doneBtn.style.backgroundColor = "#A9A9A9"
            doneBtn.disabled = true
            message = "You both have Blackjack, it's a tie!"
        }
    }
}

// renderGame()
function renderGame() {
    messageEl.textContent = ""
    dealerCardsEl.textContent = ""
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.innerHTML += `<img src="${cardImages[dealerCards[i]]}">`
    }
    playerCardsEl.textContent = ""
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.innerHTML += `<img src="${cardImages[playerCards[i]]}">`
    }
    playerSumEl.textContent = "Player: " + playerSum
    dealerSumEl.textContent = "Dealer: " + dealerSum
}

// playerNewCard()
function playerNewCard() {
    if (playerIsAlive === true) {
        let playerCard = getRandomCard()
        playerSum += playerCard
        playerCards.push(playerCard)
        renderGame()
        checkResults()
        messageEl.textContent = message
    }
}

// dealerNewCard()
function dealerNewCard() {
    if (dealerSum < 17) {
        let dealerCard = getRandomCard()
        dealerSum += dealerCard
        dealerCards.push(dealerCard)
        renderGame()
        messageEl.textContent = message
    } 
}

// whoWon()
function whoWon() {
    if (playerSum < dealerSum) {
        playerIsAlive = true
        dealerIsAlive = false
        if (playerIsAlive === true && dealerIsAlive === false) {
            message = "You won! 🎉🎉🎉"
        }
    } else if (playerSum > dealerSum) {
        playerIsAlive = true
        dealerIsAlive = false
        if (playerIsAlive === true && dealerIsAlive === false) {
            message = "You lost 😔 The dealer won."
        }
    } else if (playerSum === dealerSum && dealerSum === playerSum) {
        playerIsAlive = true
        dealerIsAlive = false
        if (playerIsAlive === true && dealerIsAlive === false) {
            message = "It's a tie!"
        }
    }
}

// finish()
function finish() {
    console.log("Button is clicked.")
    if (playerSum < 17) {
        alert("You should draw another card before finishing when you're sum is under 17.")
        return
    } else {
        dealerNewCard()
        whoWon()
    }
    messageEl.textContent = message
    console.log(message)
    doneBtn.style.backgroundColor = "#A9A9A9"
    doneBtn.disabled = true
    newCardBtn.style.backgroundColor = "#A9A9A9"
    newCardBtn.disabled = true
}



