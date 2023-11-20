
import {
  setBarHeight,
  setBarColor,
  resetBarColors,
  convertArrayFromBars,
  setBarsFromArray,
  sleep, updateAlgorithmCode, highlightCode, algorithmCode, domElement
} from './utils.js';
let selectedAlgorithm;
let speed, sortingTimeout;
let numberOfBars = 30;
let userProvidedArray = false;
let isSortingInProgress = false;
let selectedLanguage = 'js';
const  bars= document.getElementsByClassName("bar");



const generateBars = (arrayLength) => {
  domElement.mainContainer.innerHTML = "";

  const barsCount =numberOfBars || arrayLength;

  for (let i = 0; i < barsCount; i++) {
    let span = document.createElement("span");
    span.setAttribute("class", "bar");
    domElement.mainContainer.append(span);
  }
};
const useUserArray = () => {
  const userArrayInput = domElement.userArray;
  const userInput = userArrayInput.value.trim();

  const userArray = userInput.split(',').map(num => parseInt(num, 10));

  if (userArray.every(num => !isNaN(num))) {
    numberOfBars = userArray.length;
    userProvidedArray = true;
    generateBars(userArray.length);
    setBarsFromUserArray(userArray);
  } else {
    alert("Invalid input. Please enter a valid array of numbers separated by commas.");
  }
};

const setBarsFromUserArray = (userArray) => {
 const maxValue = Math.max(...userArray);


  for (let i = 0; i < bars.length; i++) {
    console.log(((userArray[i]/maxValue)*100))
    bars[i].style.height = `${((userArray[i]/maxValue)*100)}%`;
  }
};

const setRandomBarHeights = () => {
  if(!userProvidedArray) {
    for (let i = 0; i < bars.length; i++) {
      const randomHeight = Math.round(Math.random() * 100);
      setBarHeight(bars[i], randomHeight);
    }
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
  resultElement.remove();

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

function updateResults(
  algorithm,
  comparisons,
  swaps,
  timeTaken,
  initialState,
  finalState
) {
  const container = document.querySelector(".container");
  const resultsDiv = document.createElement("div");
  resultsDiv.setAttribute('class','results');

  resultsDiv.innerHTML = '<h2>Results</h2><div id="sortingResult"></div>';
  container.appendChild(resultsDiv);

  const sortingResultElement = document.getElementById("sortingResult");

  const resultText = `
  <div class="info">
      <p> Algorithm: ${algorithm}</p>
      <p> Comparisons: ${comparisons} </p>
      <p> Swaps: ${swaps}</p>
    </div>
    <div>
      <p>Unsorted Array: [${initialState.join(", ")}]</p>
      <p> Sorted Array:
        [${finalState.join(", ")}]</p>
    </div>
`;
  sortingResultElement.innerHTML = resultText;
}


const startSorting = () => {
 selectedAlgorithm = domElement.selectedAlgorithm.value;
  speed = getSortingSpeed();

  if (!isSortingInProgress) {
    isSortingInProgress = true;

    switch (selectedAlgorithm) {
      case "bubble":
        startBubbleSort(speed);
        break;
      case "selection":
        startSelectionSort(speed);
        break;
      case "insertion":
        startInsertionSort(speed);
        break;
      case "merge":
        startMergeSort(speed);
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

      setBarColor(bars[j], "red");
      setBarColor(bars[j + 1], "blue");

      const codeSnippet = algorithmCode['bubble'][selectedLanguage];

      await highlightCode(codeSnippet, j);

      await new Promise(
        (resolve) => (sortingTimeout = setTimeout(resolve, speed))
      );

      const currentHeight = parseInt(bars[j].style.height);
      const nextHeight = parseInt(bars[j + 1].style.height);

      if (currentHeight > nextHeight) {
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

    setBarColor(bars[i], "red");

    for (let j = i + 1; j < n && isSortingInProgress; j++) {
      setBarColor(bars[j], "blue");

      const codeSnippet = algorithmCode['selection'][selectedLanguage];

      await highlightCode(codeSnippet, j);

      await new Promise(
        (resolve) => (sortingTimeout = setTimeout(resolve, speed))
      );

      if (
        parseInt(bars[j].style.height) <
        parseInt(bars[min_idx].style.height)
      ) {
        comparisons++;
        if (min_idx !== i) {
          setBarColor(bars[min_idx], "black");
        }
        min_idx = j;
      } else {
        setBarColor(bars[j], "black");

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

      const codeSnippet = algorithmCode['insertion'][selectedLanguage];

      await highlightCode(codeSnippet, i);

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

async function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);

  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0,
      j = 0,
      k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
    await visualizeMerge(arr, left, right, k - 1);
  }

  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
    await visualizeMerge(arr, left, right, k - 1);

  }

  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
    await visualizeMerge(arr, left, right, k - 1);

  }
}

async function startMergeSort(speed) {
  let comparisons = 0;
  let swaps = 0;
  let initialArray = Array.from(bars).map((bar) =>
      parseInt(bar.style.height)
  );
  const barsArray = Array.from(bars).map((bar) =>
      parseInt(bar.style.height)
  );

  const startTime = performance.now();
  await mergeSort(barsArray);
  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  isSortingInProgress = false;
  updateResults(
      "Merge Sort",
      comparisons,
      swaps,
      timeTaken.toFixed(2),
      initialArray,
      barsArray
  );
}
async function visualizeMerge(arr, left, right, currentIndex) {
  for (let i = left; i <= right; i++) {
    setBarHeight(bars[i], arr[i]);
    if (i === currentIndex) {
      setBarColor(bars[i], "red");
    } else {
      setBarColor(bars[i], "blue");
    }
    await sleep(speed);
  }
}

function getSortingSpeed() {
  return domElement.speedSlider.value;
}


generateBars();

setRandomBarHeights();

domElement.reset.addEventListener("click", reset);
domElement.start.addEventListener("click", startSorting);
domElement.stop.addEventListener("click", stopSorting);
domElement.useArray.addEventListener("click", useUserArray);




domElement.js.addEventListener("click", () => {
  updateAlgorithmCode(domElement.selectedAlgorithm.value, "js");
});

domElement.python.addEventListener("click", () => {
  updateAlgorithmCode(domElement.selectedAlgorithm.value, "python");
});

domElement.java.addEventListener("click", () => {
  updateAlgorithmCode(domElement.selectedAlgorithm.value, "java");
});
domElement.how.addEventListener('click',()=>{

  const codeElement = document.getElementById("algorithmCode");
  const code = algorithmCode[domElement.selectedAlgorithm.value]['how'];

  codeElement.innerHTML =code;


});


function displayAlgorithmCode(algorithm, language) {
  const codeElement = document.getElementById("algorithmCode");
  const codeSnippet = algorithmCode[algorithm][language];

  codeElement.textContent = codeSnippet;
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultAlgorithm = domElement.selectedAlgorithm.value;
  displayAlgorithmCode(defaultAlgorithm, 'js');
});
