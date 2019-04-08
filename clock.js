// Zadanie domowe
// Stwórz stronę wyświetlającą zegar

// Użyj generatora/ów do zwracania kolejnej sekundy/minuty/godziny. Generator(y) mają działać tak, by po otrzymaniu wartości 59 (lub 12 dla godzinowego) wyołanie generator.next() dawało 00 (iteracja cykliczna)
// Generator sekundowy wywołuj w setInterval, pozostałe gdy generator mniejszej jednostki osiągnie wartość 59.
// Zegar powinien przyjmować godzinę wejścia na stronę jako punkt startowy (jeżeli będziesz miał/a problem z tym punktem - postaraj się zrobić pozostałe - każdy punkt oceniamy osobno)
// Zegar powinien być wyświetlany w formacie hh:mm:ss (np 07:15:09 - by otrzymać 07 użyj metody es7-es9)
// Gotowy zegar wrzuć na GHP


// Pobrac aktualną godzinę
// Ustawic widok na aktualną
// Operowac generatorami

// Declaring variables
// 
const hoursContainer = document.querySelector('.clock__hours');
const minutesContainer = document.querySelector('.clock__minutes');
const secondsContainer = document.querySelector('.clock__seconds');
const meridianContainer = document.querySelector('.clock__meridian');

// Getting initial clock values
const getCurrentTime = new Date();
let seconds = getCurrentTime.getSeconds();
let minutes = getCurrentTime.getMinutes();
let hours = getCurrentTime.getHours() % 12 || 12;
let meridian = getCurrentTime.toLocaleTimeString('en-US').slice(-2);


// IIFE to set initial clock values
(function () {
    hoursContainer.textContent = hours;
    minutesContainer.textContent = minutes;
    secondsContainer.textContent = seconds;
    meridianContainer.textContent = meridian;
})();

// Define generators

function* secondsGen() {
    while (true) {
        seconds++
        //   console.log(`Seconds: ${seconds}`);
        if (seconds > 59) {
            console.log(`Petla z 59`)
            seconds = 00;
            minutesIterator.next();
        }
        yield seconds;
    }
}

function* minutesGen() {
    while (true) {
        minutes++;
        if (minutes > 59) {
            minutes = 0;
            hoursIterator.next();
        }
        yield minutes;
    }
}

function* hoursGen() {
    while (true) {
        hours++;
        if (hours >= 12) {
            hours = hours - 12;
            yield meridianIterator.next();
        }

        yield hours;
        
    }
}

function* meridianGen() {
    while (true) {
        (meridian === 'PM')? meridian = 'AM' : meridian = 'PM';
        yield meridian;
    }
}

//Constructing iterators
const secondsIterator = secondsGen();
const minutesIterator = minutesGen();
const hoursIterator = hoursGen();
const meridianIterator = meridianGen();


//   Update clock 
const updateClock = () => {
    hoursContainer.textContent = `${hours.toString().padStart(2, '0')}`;
    minutesContainer.textContent = `${minutes.toString().padStart(2, '0')}`;
    secondsContainer.textContent = `${seconds.toString().padStart(2, '0')}`;
    meridianContainer.textContent = `${meridian}`;
};

// Initialize seconds generator
setInterval(() => {
    secondsIterator.next();
    updateClock();
}, 1000);