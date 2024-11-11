

let numbers = document.querySelectorAll(".numb");

let startButt = document.getElementById("start");
let stopButt = document.getElementById("stop");
let resettButt = document.getElementById("reset");

let formElement = document.getElementById("formElem");

let arrayToFind = [];

// START 

startButt.addEventListener("click", function (event) {
    event.preventDefault();

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

    }, 5000)

})


// SUBMIT 

formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    


    let userNumbs = document.querySelectorAll(".inputNumb");

    // if (arrayToFind.some(r=> userNumbs.value.includes(r))){
    //     console.log("successo");

    // }
    let usNumbers = [];
    
    for (let i = 0; i < userNumbs.length; i++) {
        usNumbers.push(userNumbs[i].value)
    }

    for (let i = 0; i < usNumbers.length; i++){
        usNumbers[i] = parseInt(usNumbers[i].trim())
        if (isNaN(usNumbers[i])){
            alert("Errore, uno degli input non è un numero. Riprova")
            location.reload();
            break;
        } 
    }


    for (let i = 0; i < usNumbers.length; i++) {
        numbers[i].innerHTML = `<p class="bg-danger mt-5 rounded">Numero ${usNumbers[i]} è ERRATO!</p>`;

        for (let j = 0; j < arrayToFind.length; j++) {
            if (parseInt(usNumbers[i]) === parseInt(arrayToFind[j])) {
                console.log("prova");
                numbers[i].innerHTML = `<p class="bg-success mt-5 rounded">Il numero ${usNumbers[i]} è CORRETTO!</p>`;
            }
        }
    }
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

})