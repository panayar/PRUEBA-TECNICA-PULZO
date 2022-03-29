// Get data from json to set the pictures 
fetch('https://filesstaticpulzo.s3.us-west-2.amazonaws.com/pulzo-lite/jsons/rushbet/native/1007806226.json')
  .then(response => response.json())
  .then(data => {

    //set team flags
    const firstTeam = document.querySelector('.teamOne');
    firstTeam.src = data.logoLoc

    const secondTeam = document.querySelector('.teamTwo');
    secondTeam.src = data.logoVis



  });



//checkbox variables
const checkLocalTeam = document.getElementById('chck-teamOne');
const checkVisitorTeam = document.getElementById('chck-teamTwo');
const checkTie = document.getElementById('chck-tie');

checkLocalTeam.addEventListener('click', () => {
  checkVisitorTeam.checked = false;
  checkTie.checked = false;
});

checkVisitorTeam.addEventListener('click', () => {
  checkLocalTeam.checked = false;
  checkTie.checked = false;
});

checkTie.addEventListener('click', () => {
  checkLocalTeam.checked = false;
  checkVisitorTeam.checked = false;
});



//form variables
let inputMoney = document.querySelector('#input-quantity');
let inputResult = document.querySelector('#input-result');
let btnCalc = document.querySelector('#btn-calcular');
let btnRestart = document.querySelector('#btn-restart');
let btnBet = document.querySelector('#btn-bet-now');



const makeBet = () => {

  fetch('https://filesstaticpulzo.s3.us-west-2.amazonaws.com/pulzo-lite/jsons/rushbet/native/1007806226.json')
    .then(response => response.json())
    .then(data => {

      let result;
      let betMoney = inputMoney.value;

      if (betMoney < 10000 ) {
        alert("La cantidad minima para apostar es de $10.000");
      } else if (betMoney > 200000) {
        alert("La cantidad maxima para apostar es de $200.000")
      }
      else if (betMoney > 10000 && checkLocalTeam.checked) {
        console.log("Entro 1")
        result = calculate(betMoney, data.valorLoc);
      }
      else if (betMoney > 10000 && checkTie.checked) {    
        console.log("Entro 2")

        result = calculate(betMoney, data.valorEmp);
      }
      else if (betMoney > 10000 && checkVisitorTeam.checked) {
        console.log("Entro 3")
        result = calculate(betMoney, data.valorVis);
      }else {
        alert("Debes seleccionar un ganador")
      }

      if(result != undefined || result != null) {

        inputResult.value = '$ ' +result;

        const btnBetNow =document.querySelector('#btn-bet-now');
        btnBetNow.href = data.url;
      }

    });

}


const calculate = (valorApuesta, cuota) => {
  return valorApuesta * cuota
}