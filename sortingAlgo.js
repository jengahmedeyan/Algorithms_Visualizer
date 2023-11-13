const numberOfBars = 30;
const mainContainer = document.querySelector(".box_container");
const bars = document.getElementsByClassName("bar");
const algorithmCodeElement = document.getElementById("algorithmCode");

let isSortingInProgress = false;
let sortingTimeout;

const generateBars = () => {
  for (let i = 0; i < numberOfBars; i++) {
    let span = document.createElement("span");
    span.setAttribute("class", "bar");
    mainContainer.append(span);
  }
};

const setRandomBarHeights = () => {
  for (let i = 0; i < bars.length; i++) {
    const randomHeight = Math.round(Math.random() * 100);
    const barValue = randomHeight;

    bars[i].style.height = `${randomHeight}%`;
  }
};

const reset = () => {
  setRandomBarHeights();
  resetResults();
};
const resetColors = () => {
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "black";
  }
};
function resetResults() {
  const resultElement = document.querySelector(".results");
  resultElement.innerHTML = "";
}
const stopSorting = () => {
  clearTimeout(sortingTimeout);
  isSortingInProgress = false;
  resetColors();
};

const startFresh = () => {
  stopSorting();
  isSortingInProgress = false;
  reset();
};

const swapBars = (i, j) => {
  const temp = bars[i].style.height;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = temp;
};

async function highlightCode(code, lineIndex) {
  const lines = code.split("\n");
  let highlightedCode = "";

  for (let i = 0; i < lines.length; i++) {
    if (i === lineIndex) {
      highlightedCode +=
        '<span class="highlighted">' + lines[i] + "</span>\n";
    } else {
      highlightedCode += lines[i] + "\n";
    }
  }

  algorithmCodeElement.innerHTML = highlightedCode;
}

function updateResults(
  algorithm,
  comparisons,
  swaps,
  timeTaken,
  initialState,
  finalState
) {
  const container = document.querySelector(".container");
  const resultsDiv = document.querySelector(".results");
  resultsDiv.innerHTML = '<h2>Results</h2><div id="sortingResult"></div>';
  container.appendChild(resultsDiv);

  const sortingResultElement = document.getElementById("sortingResult");

  const resultText = `
  <div class="info">
      <p> Algorithm: ${algorithm}</p>
      <p> Comparisons: ${comparisons} </p>
      <p> Swaps: ${swaps}</p>
      <p> Time taken: ${timeTaken} milliseconds </p>
    </div>
    <div>
      <p>Unsorted Array: [${initialState.join(", ")}]</p>
      <p> Sorted Array:
        [${finalState.join(", ")}]</p>
    </div>
`;
  sortingResultElement.innerHTML = resultText;
}

async function insertionSort(speed) {
  const n = bars.length;

  for (let i = 1; i < n; i++) {
    let key = parseInt(bars[i].style.height);
    let j = i - 1;

    bars[i].style.backgroundColor = "red";

    await new Promise(
      (resolve) => (sortingTimeout = setTimeout(resolve, speed))
    );

    while (j >= 0 && parseInt(bars[j].style.height) > key) {
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].style.backgroundColor = "blue";

      j = j - 1;

      await new Promise(
        (resolve) => (sortingTimeout = setTimeout(resolve, speed))
      );
    }

    bars[j + 1].style.height = `${key}%`;
    bars[i].style.backgroundColor = "black";

    for (let k = 0; k < i; k++) {
      bars[k].style.backgroundColor = "black";
    }

    await new Promise(
      (resolve) => (sortingTimeout = setTimeout(resolve, speed))
    );
  }
}

const startSorting = () => {
  const algorithm = document.getElementById("algorithmSelect").value;
  const speed = getSortingSpeed();

  if (!isSortingInProgress) {
    isSortingInProgress = true;

    switch (algorithm) {
      case "bubble":
        startBubbleSort(speed);
        break;
      case "selection":
        startSelectionSort(speed);
        break;
      case "insertion":
        startInsertionSort(speed);
        break;
      default:
        console.error("Invalid algorithm");
    }
  }
};

async function startBubbleSort(speed) {
  const n = bars.length;
  let comparisons = 0;
  let swaps = 0;
  const startTime = performance.now();
  let initialArray = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  for (let i = 0; i < n - 1 && isSortingInProgress; i++) {
    for (let j = 0; j < n - i - 1 && isSortingInProgress; j++) {
      comparisons++;

      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "blue";

      await highlightCode(
        `
let n = array.length;//30
for (let i = ${i}; i < n - 1; i++) {
for (let j= ${j}; j < n - ${i} - 1; j++) {
if (array[${j}] > array[${j}+1]) {
  const temp = array[${j}];
  array[${j}] = array[${j} + 1];
  array[${j} + 1] = temp;
}
}
}
`,
        j
      );

      await new Promise(
        (resolve) => (sortingTimeout = setTimeout(resolve, speed))
      );

      if (
        parseInt(bars[j].style.height) >
        parseInt(bars[j + 1].style.height)
      ) {
        swapBars(j, j + 1);
        swaps++;
      }

      bars[j].style.backgroundColor = "black";
      bars[j + 1].style.backgroundColor = "black";
    }
  }
  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  const finalState = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  isSortingInProgress = false;
  updateResults(
    "Bubble Sort",
    comparisons,
    swaps,
    timeTaken.toFixed(2),
    initialArray,
    finalState
  );
}

async function startSelectionSort(speed) {
  const n = bars.length;
  let comparisons = 0;
  let swaps = 0;
  const startTime = performance.now();
  let initialArray = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  for (let i = 0; i < n - 1 && isSortingInProgress; i++) {
    let min_idx = i;

    bars[i].style.backgroundColor = "red";

    for (let j = i + 1; j < n && isSortingInProgress; j++) {
      bars[j].style.backgroundColor = "blue";

      await highlightCode(
        `
let n = array.length; //30
for (let i = ${i}; i < n - 1; i++) {
let min_idx = i;
for (let j = i + 1; j < n; j++) {
if  (array[j]) < array[min_idx]) {
  min_idx = j;
}
}
}
`,
        j
      );

      await new Promise(
        (resolve) => (sortingTimeout = setTimeout(resolve, speed))
      );

      if (
        parseInt(bars[j].style.height) <
        parseInt(bars[min_idx].style.height)
      ) {
        comparisons++;
        if (min_idx !== i) {
          bars[min_idx].style.backgroundColor = "black";
        }
        min_idx = j;
      } else {
        bars[j].style.backgroundColor = "black";
      }
    }

    if (min_idx !== i) {
      swapBars(min_idx, i);
      swaps++;
    }

    bars[i].style.backgroundColor = "black";
  }
  isSortingInProgress = false;

  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  const finalState = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  isSortingInProgress = false;
  updateResults(
    "Insertion Sort",
    comparisons,
    swaps,
    timeTaken.toFixed(2),
    initialArray,
    finalState
  );
}


async function startInsertionSort(speed) {
  const n = bars.length;
  let comparisons = 0;
  let swaps = 0;
  const startTime = performance.now();
  let initialArray = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  for (let i = 1; i < n && isSortingInProgress; i++) {
    const keyHeight = parseInt(bars[i].style.height);
    let j = i - 1;
    comparisons++

    bars[i].style.backgroundColor = "red";

    await new Promise(resolve => setTimeout(resolve, speed));

    while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].style.backgroundColor = "blue";

      j--;
      swaps++;

      await highlightCode(`
        let n = array.length;
        for (let i = 1; i < n; i++) {
          let key = array[i];
          let j = i - 1;

          while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
          }
        }
      `, i);

      await new Promise(resolve => setTimeout(resolve, speed));
    }

    bars[j + 1].style.height = `${keyHeight}%`;
    bars[i].style.backgroundColor = "black";

    for (let k = 0; k < i; k++) {
      bars[k].style.backgroundColor = "black";
    }
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  const finalState = Array.from(bars).map((bar) =>
    parseInt(bar.style.height)
  );

  isSortingInProgress = false;
  updateResults(
    "Insertion Sort",
    comparisons,
    swaps,
    timeTaken.toFixed(2),
    initialArray,
    finalState
  );
}


function getSortingSpeed() {
  return document.getElementById("speedSlider").value;
}
generateBars();
setRandomBarHeights();