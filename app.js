const amountNumber = document.querySelector(".amount-number");
const fromCountry = document.querySelector(".from-country");
const toCountry = document.querySelector(".to-country");
const rateNumber = document.querySelector(".rate-number");
const convertButton = document.querySelector(".convert");
const fetchData = async function () {
  const response = await fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DRHXlHNYhRfOrqIAxLCPh2M6FUsL9FzNsrnbxJCO"
  );
  const data = await response.json();
  return data;
};
const showData = async function () {
  const callFetchData = await fetchData();
  rateNumber.innerHTML="0.00"
  const fromCheckBox = fromCountry.value;
  const toCheckBox = toCountry.value;
  if (fromCheckBox in callFetchData.data && toCheckBox in callFetchData.data) {
    const rate = callFetchData.data[fromCheckBox];
    const anotherRate = callFetchData.data[toCheckBox];
    const amount = parseFloat(amountNumber.value);
    const conversionRate = anotherRate / rate;
       const result=amount*conversionRate
  rateNumber.innerHTML=`${result}`

  }
  else {
    rateNumber.innerHTML='Currency not found in the api data'
  }
};

const populateCurrencyOption = async () => {
  const callFetchData = await fetchData()
  const fromOption = fromCountry
  const toOption = toCountry
  for (const currencyCode in callFetchData.data) {
    const optionFrom = document.createElement("option")
    optionFrom.textContent = currencyCode
    fromOption.appendChild(optionFrom)
   
    const optionTo = document.createElement("option")
    optionTo.textContent = currencyCode
    toOption.appendChild(optionTo)
  }
}
convertButton.addEventListener("click", (e) => {
  e.preventDefault();
showData()
});
populateCurrencyOption()