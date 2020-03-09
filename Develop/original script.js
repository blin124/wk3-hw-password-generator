// Introduction to the site
var pwgen = confirm("This is a password generator site.")

// Assignment Code
// var generateBtn = document.querySelector("#generate");

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword); {

// }

//DOM elements
var resultEl = document.getElementsById('password');
var lengthEl = document.getElementsById('length');
var uppercaseEl = document.getElementsById('uppercase');
var lowercaseEl = document.getElementsById('lowercase');
var numbersEl = document.getElementsById('numbers');
var symbolsEl = document.getElementsById('symbols');
var generateEl = document.getElementsById('btn');
// var clipboardEl = document.getElementsByClassName('clipboard');

var randomFunc = {
  lower: getRandomLower, 
  upper: getRandomUpper,
  number: getRandomNumber, 
  symbol: getRandomSymbol
};
// Generate event listener
generateEl.addEventListener('click', () => {
  var length = +lengthEl.value;
  var hasLower = lowercaseEl.checked;
  var hasUpper = uppercaseEl.checked;
  var hasNumber = numbersEl.checked;
  var hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassworkd(
  hasLower, 
  hasUpper, 
  hasNumber, 
  hasSymbol, 
  length
  );
})

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  var textarea = document.createElement('textarea');
  var password = resultEl.innerText;

  if(!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
})

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // 1. Initiate password var
  // 2. Filter out unchecked types
  // 3. Loop over length call generator function for each type
  // 4. Add final pw to the pw var and return

  let generatePassword = '';

  var typesCount = lower + upper + number + symbol;

  // console.log('typesCount: ', typesCount);

  var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
  (
    item => Object.values(item)[0]
  );

  // console.log('typesArr: ', typesArr);
  
  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      var funcName = Object.keys(type)[0];

      // console.log('funcName: ', funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }

  var finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}


//Generator functions - http://www.net-comber.com/charset.html

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

console.log(String.fromCharCode(97));

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbols = "!@#$%^&*(){}[]=<>/,."
  return symbols[Math.floor(Math.random() * symbols.length)];
}



