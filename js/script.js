

let numbers = document.querySelectorAll(".numb");

let startButt = document.getElementById("start");
let stopButt = document.getElementById("stop");
let resettButt = document.getElementById("reset");

let formElement = document.getElementById("formElem");

let arrayToFind = [];

let counterElem = document.getElementById("counter");

let winMessage = document.getElementById("winMess");

// START 

startButt.addEventListener("click", function (event) {
    event.preventDefault();

    countdown();

    for (let i = 0; i < numbers.length; i++) {
        let curItem;
        let randNumb;
        curItem = numbers[i];
        randNumb = Math.floor(Math.random() * 99 - 1)
        arrayToFind.push(randNumb);
        curItem.innerHTML = randNumb;
    }

    resettButt.disabled = false;

    setTimeout(function () {


        for (let i = 0; i < numbers.length; i++) {
            numbers[i].innerHTML = `<input type="text" class="inputNumb w-50 text-center">`
        }

        stopButt.classList.remove("d-none")
        startButt.disabled = true;

    }, 10000)

})


// SUBMIT 

formElement.addEventListener("submit", function (event) {
    event.preventDefault();






    let userNumbs = document.querySelectorAll(".inputNumb");

    // if (arrayToFind.some(r=> userNumbs.value.includes(r))){
    //     console.log("successo");

    // }
    let usNumbers = [];

    let winCount = 0;

    for (let i = 0; i < userNumbs.length; i++) {
        usNumbers.push(userNumbs[i].value)
    }

    for (let i = 0; i < usNumbers.length; i++) {
        usNumbers[i] = parseInt(usNumbers[i].trim())
        if (isNaN(usNumbers[i])) {
            alert("Errore, uno degli input non è un numero. Riprova")
            location.reload();
            break;
        }
    }


    for (let i = 0; i < usNumbers.length; i++) {
        numbers[i].innerHTML = `<p class="bg-danger mt-5 rounded" id="loss">Numero ${usNumbers[i]} è ERRATO!</p>`;

        for (let j = 0; j < arrayToFind.length; j++) {
            if (parseInt(usNumbers[i]) === parseInt(arrayToFind[j])) {

                numbers[i].innerHTML = `<p class="bg-success mt-5 rounded" id="win">Il numero ${usNumbers[i]} è CORRETTO!</p>`;
                delete arrayToFind[j];
                winCount++;
            }
        }
    }

    if (winCount === 5) {
        confetta();
        winMessage.innerHTML = "Complimenti! HAI VINTO"
        winMessage.classList.add("bg-success")
    } else if (winCount === 4) {
        winMessage.innerHTML = "C'eri quasi! Riprova"
        winMessage.classList.add("bg-warning")
    } else if (winCount < 4) {
        winMessage.innerHTML = "Non ci siamo :( Riprova"
        winMessage.classList.add("bg-danger")
    }

    stopButt.disabled = true;

})



// RESET 

resettButt.addEventListener("click", function (event) {

    event.preventDefault();

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].innerHTML = ""
    }

    if (startButt.disabled) {
        startButt.disabled = false;
    }

    if (counterElem.classList.contains("d-none")) {
        counterElem.classList.remove("d-none")
    }

    if (stopButt.classList.contains("d-none") === false) {
        stopButt.classList.add("d-none")
    }

    winMessage.classList = "fs-1 p-3 rounded"
    winMessage.innerHTML = ""

    stopButt.disabled = false;
    counterElem.innerHTML = "";
    arrayToFind = [];
})


// COUNTDOWN 

function countdown() {
    let counterN = 10;
    counterElem.innerHTML = counterN;
    let countDown = setInterval(function () {
        counterN = (counterN - 0.01).toFixed(2);
        counterElem.innerHTML = counterN;

        if (counterN <= 3) {
            counterElem.classList.add("bg-danger", "rounded-pill")
        }

        if (counterN <= 0) {
            clearInterval(countDown);
            counterElem.classList.add("d-none");
            counterElem.classList.remove("bg-danger")
        }

    }, 10)
}

// CONFETTI 

function confetta() {
    const duration = 15 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}