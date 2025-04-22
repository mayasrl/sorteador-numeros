const inputText = document.querySelectorAll('input[type="text"]');
inputText.forEach(input => {
  input.oninput = () => {
    let value = input.value.replace(/[^0-9]/g, "");
    input.value = value.trim();
  };
});
const amountNumbers = document.getElementById("draw");
const initialValue   = document.getElementById("initial");
const finalValue     = document.getElementById("final");
const main           = document.querySelector("main");
const form           = document.querySelector("form");
const checkbox       = document.querySelector('input[type="checkbox"]');
form.onsubmit = (event) => {
  event.preventDefault();
  const draw = {
    amount:        parseInt(amountNumbers.value),
    initialSample: parseInt(initialValue.value),
    finalSample:   parseInt(finalValue.value),
  };
  if (draw.amount > (draw.finalSample - draw.initialSample)) {
    alert("O valor de números a serem sorteados é maior que o espaço amostral");
    return;
  }
  if (draw.initialSample >= draw.finalSample) {
    alert("Space amostral não correspondente");
    return;
  }
  const spaceSample = [];
  for (let i = draw.initialSample; i <= draw.finalSample; i++) {
    spaceSample.push(i);
  }
  drawStructure(draw, spaceSample);
};
let execute = 0;
function drawStructure(draw, spaceSample) {
  try {
    main.classList.remove("grid");
    main.innerHTML = "";
    const space = document.createElement("div");
    space.classList.add("space", "container");
    const result = document.createElement("h1");
    result.textContent = "Resultado do sorteio";
    result.classList.add("result");
    const subTitle = document.createElement("h2");
    execute++;
    subTitle.textContent = `${execute}º resultado`;
    subTitle.classList.add("sub-title");
    const title = document.createElement("div");
    title.append(result, subTitle);
    const divSortedNumbers = document.createElement("div");
    divSortedNumbers.classList.add("div-sorted-numbers");
    space.append(title, divSortedNumbers);
    main.append(space);
    const sortedNumbers = drawNumbers(draw.amount, spaceSample);
    let i = 0;
    function showNumbers() {
      if (i < sortedNumbers.length) {
        const numberSorted = document.createElement("span");
        numberSorted.classList.add("number-sorted");
        numberSorted.textContent = sortedNumbers[i];
        const animationDiv = document.createElement("div");
        animationDiv.classList.add("animation-number");
        animationDiv.append(numberSorted);
        divSortedNumbers.append(animationDiv);
        i++;
        setTimeout(showNumbers, 3500);
      } else {
        const button = document.createElement("button");
        button.classList.add("appear-button");
        button.innerHTML = `SORTEAR NOVAMENTE<img src="./assets/images/Frame.svg" alt="rotate arrow">`;
        setTimeout(() => button.style.opacity = "1", 50);
        button.onclick = () => {
          main.innerHTML = "";
          drawStructure(draw, spaceSample);
        };
        main.append(button);
      }
    }
    setTimeout(showNumbers, 500);
  } catch (error) {
    alert("Não foi possível realizar o sorteio");
    console.error(error);
  }
}
function drawNumbers(amount, spaceSample) {
  const sortedNumbers = [];
  const copySpaceSample = [...spaceSample];
  while (sortedNumbers.length < amount) {
    const random = Math.floor(Math.random() * copySpaceSample.length);
    sortedNumbers.push(copySpaceSample[random]);
    if (checkbox.checked) {
      copySpaceSample.splice(random, 1);
    }
  }
  return sortedNumbers;
}
