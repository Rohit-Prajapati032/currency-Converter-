import countryList from "./codes.js"; // import file countryList 
// window.addEventListener('load', getData);
const baseURL = "https://v6.exchangerate-api.com/v6/06fdcec7820ffedca683a4bc/latest/";
let dropdowns = document.querySelectorAll(" .dropdown select");
let btn = document.querySelector("form Button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let amountVal;

for(let select of dropdowns){
    for( let currCode in countryList){
    // console.log(currCode);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name ==='from' && currCode === "USD"){
        newOption.selected = "selected";
    }
    else if(select.name === "to" && currCode ==="INR"){
        newOption.selected = "selected";
    }
        select.append(newOption); 
        }
        select.addEventListener('change',(evt)=>{
            updateFlag(evt.target);                             
        })
    };
function updateFlag(element){
    // console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc  = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;




}

btn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("input");
   amountVal =  amount.value;
    // console.log(amountVal);
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);
    getData();
    
});
async function getData() {
    let response = await fetch(baseURL+fromCurr.value);
    let data = await response.json();
    let currencies = data.conversion_rates;
    // console.log(currencies[fromCurr.value]);
    // console.log(currencies[toCurr.value]);
    // let finalAmount = `${(currencies[fromCurr.value])} = ${amountVal * (currencies[toCurr.value])}`;
    // console.log(fromCurr.value);
    // console.log(finalAmount);
    let exchangeAmount = document.querySelector("#totalAmount");
    exchangeAmount.innerText = `${amountVal} ${fromCurr.value} = ${amountVal * (currencies[toCurr.value])}${toCurr.value} `;
}