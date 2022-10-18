// Math Random 

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// Vedere se un numero è pari o dispari 

function isEven(num){
  if(num % 2 === 0){
    return true;
  } else {
    return false;
  }
}

// Creare un messaggio di errore
function notificationError(msgError){
    const myAlert = document.createElement('div');
    myAlert.className = 'alert alert-danger';
    myAlert.innerHTML = msgError;
    return myAlert; 
}