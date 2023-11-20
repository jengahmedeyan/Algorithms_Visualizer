const domElement = {
    reset: document.getElementById("resetBtn"),
    start: document.getElementById("startBtn"),
    stop: document.getElementById("stopBtn"),
    useArray: document.getElementById("useArrayBtn"),
    userArray: document.getElementById("userArray"),
    js: document.getElementById('js_tab'),
    python: document.getElementById('python_tab'),
    java: document.getElementById('java_tab'),
    how: document.getElementById('how_tab'),
    selectedAlgorithm: document.getElementById('algorithmSelect'),
    speedSlider: document.getElementById("speedSlider"),
    mainContainer: document.querySelector(".box_container"),
    bars: document.getElementsByClassName("bar"),
};

const setBarHeight = (bar, height) => {
    bar.style.height = `${height}%`;
};

const setBarColor = (bar, color) => {
    bar.style.backgroundColor = color;
};

const resetBarColors = () => {
    for (let i = 0; i < bars.length; i++) {
        setBarColor(bars[i], "black");
    }
};


const convertArrayFromBars = () => {
    return Array.from(bars).map((bar) => parseInt(bar.style.height));
};

const setBarsFromArray = (userArray) => {
    const maxValue = Math.max(...userArray);

    for (let i = 0; i < bars.length; i++) {
        setBarHeight(bars[i], (userArray[i] / maxValue) * 100);
    }
};




const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};



async function highlightCode(code, lineIndex) {
    const algorithmCodeElement = document.getElementById("algorithmCode");

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


const algorithmCode = {
    bubble: {
        js: `// Bubble Sort in JavaScript
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
        
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
            
                // Swap if the current element is larger than the next
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // If no swaps occurred in an iteration, the array is sorted
        if (!swapped) {
            break;
        }
    }
}`,
        python: `# Bubble Sort in Python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
        
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
            
                # Swap if the current element is larger than the next
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swaps occurred in an iteration, the array is sorted
        if not swapped:
            break`,
        java: `// Bubble Sort in Java
public class BubbleSort {
    void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                
                    // Swap if the current element is larger than the next
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swaps occurred in an iteration, the array is sorted
            if (!swapped) {
                break;
            }
        }
    }
}`,
        how:`<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
  <h4 style="font-size: 1.5em;">Bubble Sort Explained</h4>
  <p style="font-size: 1em;">
    Bubble sort is a simple sorting algorithm. It repeatedly steps through the list of elements,<br/> compares adjacent items, and swaps them if they are in the wrong order.
  </p> 
  <p style="font-size: 1em;">
    Imagine you have an array: [5, 2, 9, 1, 5].
  </p>
  <h2 style="font-size: 1.2em;">Step-by-Step Process</h2>
  <ol style="font-size: 1em; line-height: 1.5;">
    <li>Start at the beginning of the array.</li>
    <li>Compare the first two elements (5 and 2). If they're in the wrong order, swap them.</li>
    <li>Move to the next pair (2 and 9). If they're in the correct order, leave them; otherwise, swap.</li>
    <li>Continue this process, comparing and swapping adjacent elements until you reach the end of the array.</li>
    <li>Repeat this process for multiple passes until no more swaps are needed.</li>
  </ol>
</div>
`



    },
    selection: {
        js: `// Selection Sort in JavaScript
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
        
            // Find the index of the minimum element
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap the minimum element with the first unsorted element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
}`,
        python: `# Selection Sort in Python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
        
            # Find the index of the minimum element
            if arr[j] < arr[min_index]:
                min_index = j
        # Swap the minimum element with the first unsorted element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]`,
        java: `// Selection Sort in Java
public class SelectionSort {
    void selectionSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
            
                // Find the index of the minimum element
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the minimum element with the first unsorted element
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
}`,
        how:'selection helper'
    },
    insertion: {
        js: `// Insertion Sort in JavaScript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
        
            // Shift elements greater than the current value to the right
            arr[j + 1] = arr[j];
            j--;
        }
        // Insert the current value at the correct position
        arr[j + 1] = current;
    }
}`,
        python: `# Insertion Sort in Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        current = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > current:
        
            # Shift elements greater than the current value to the right
            arr[j + 1] = arr[j]
            j -= 1
        # Insert the current value at the correct position
        arr[j + 1] = current`,
        java: `// Insertion Sort in Java
public class InsertionSort {
    void insertionSort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int current = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > current) {
            
                // Shift elements greater than the current value to the right
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            // Insert the current value at the correct position
            arr[j + 1] = current;
        }
    }
}`,
        how:'insertion helper'
    },
    merge: {
        js: `// Merge Sort in JavaScript
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
    
        // Merge two sorted arrays into a single sorted array
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
        python: `# Merge Sort in Python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)

def merge(left, right):
    result = []
    left_index, right_index = 0, 0

    while left_index < len(left) and right_index < len(right):
    
        # Merge two sorted arrays into a single sorted array
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1

    result.extend(left[left_index:])
    result.extend(right[right_index:])
    return result`,
        java: `// Merge Sort in Java
public class MergeSort {
    public void mergeSort(int arr[]) {
        if (arr.length > 1) {
            int mid = arr.length / 2;
            int[] left = Arrays.copyOfRange(arr, 0, mid);
            int[] right = Arrays.copyOfRange(arr, mid, arr.length);

            mergeSort(left);
            mergeSort(right);

            int i = 0, j = 0, k = 0;

            while (i < left.length && j < right.length) {
            
                // Merge two sorted arrays into a single sorted array
                if (left[i] <= right[j]) {
                    arr[k] = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    j++;
                }
                k++;
            }

            while (i < left.length) {
                arr[k] = left[i];
                i++;
                k++;
            }

            while (j < right.length) {
                arr[k] = right[j];
                j++;
                k++;
            }
        }
    }
}`,
        how: 'merge helper'
    },
};

const updateAlgorithmCode = (algorithm, language) => {
    const codeElement = document.getElementById("algorithmCode");
    const code = algorithmCode[algorithm][language];

    codeElement.innerHTML = code
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
        .replace(/^(\s*#.*$)/gm, match => {
            return '<span class="comment">' + match + '</span>';
        })
        .replace(/('.*?')/g, '<span class="string">$1</span>')
        .replace(/(\b(?:function|for|if|else|while|true|break|let|length,def)\b)/g, '<span class="keyword">$1</span>');





};

export {
    domElement,
    algorithmCode,
    setBarHeight,
    setBarColor,
    resetBarColors,
    convertArrayFromBars,
    setBarsFromArray,
    sleep,
    updateAlgorithmCode,
    highlightCode
};