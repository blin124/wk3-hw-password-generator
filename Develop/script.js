// Introduction to the site
var pwgen = confirm("This is a password generator site.")
var type = confirm("You may select the criteria of password")
var choose = confirm("You may choose if you would like lowercase, uppercase, numbers and symbols")

// DOM Elements
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var symbolsEl = document.getElementById('symbols');
var generateEl = document.getElementById('generate');
var clipboard = document.getElementById('clipboard');

var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Copy Password to CLipboard
clipboard.addEventListener('click', () => {
    var textarea = document.createElement('textarea');
    var password = resultEl.innerText;

    if(!password) {
        alert("Please generate password first!")
    }else {
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert("Password has been copied to clipboard");
    }
});

// Generate eventlistener
generateEl.addEventListener('click', () => {
    var length = +lengthEl.value;
    // makes sures that when tick box is ticked, the generate button will notice print password in container.
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initiate password var
    // 2. Filter out unchecked types
    // 3. Loop over length call generator function for each type
    // 4. Add final pw to the pw var and return

    let generatedPassword = "";

    var typesCount = lower + upper + number + symbol;

    // console.log("typesCount: ", typesCount);

    var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    // console.log("typesArr: ", typesArr);

    if (typesCount === 0) {
        alert("MUST HAVE AT LEAST ONE SELECTED!");
    }
    else if (length <= 7) {

        alert("MUST HAVE AT LEAST 8 CHARACTERS!");
        return finalPassword = " ";
    }


    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            var funcName = Object.keys(type)[0];
            // console.log("functionName: ", funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    var finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Generator Functions http://www.net-comber.com/charset.html

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    var symbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomSymbol());
