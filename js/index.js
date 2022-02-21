const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelectorAll('.eq');
const delbtn = document.querySelector('.clr');
const clearbtn = document.querySelector('.allclr');
const nums = document.querySelectorAll('.num');

let curr = '0';
let num1 = 0,
	num2 = 0;
let operation = '';

/* Clear Display */
function clear() {
	curr = '0';
	num1 = num2 = 0;
	operation = '';
}

/* Delete Function */
function pop() {
	curr = curr.slice(0, -1);
}

/* Append to Curr */
function append(val) {
	if (curr === '0') {
		curr = '';
	}
	if (val === '.') {
		curr += curr === '' ? '0' : '';
		if (curr.endsWith('.')) return;
	}
	curr += val;
}

/* Integer Clicks */
Array.from(nums).forEach((num) => {
	num.addEventListener('click', () => {
		const val = num.innerText;
		console.dir(val);
		append(val);
		updateDisplay(curr);
	});
});

/* Operator Click */
Array.from(operators).forEach((op) => {
	op.addEventListener('click', () => {
		operation = op.innerHTML;
		num1 = curr === '' ? num1 : parseFloat(curr);
		curr = '';
		updateDisplay(curr);
	});
});

/* Equal Click */
Array.from(equals).forEach((equal) => {
	equal.addEventListener('click', () => {
		if (operation === '') return;
		num2 = parseFloat(curr);
		curr = '';
		solve();
		updateDisplay(curr);
	});
});

/* Display Update */
function updateDisplay(str) {
	display.innerHTML = str;
}

/* Solve Function */
function solve() {
	let val = 0;
	switch (operation) {
		case '+':
			val = num1 + num2;
			break;
		case '-':
			val = num1 - num2;
			break;
		case 'x':
			val = num1 * num2;
			break;
		case '÷':
			val = num1 / num2;
			break;
		default:
			break;
	}
	val = Math.round(val * 10000) / 10000.0;
	curr = val.toString();
}

/* Backspace click */
delbtn.addEventListener('click', () => {
	pop();
	updateDisplay(curr);
});

/* All Clear Button click */
clearbtn.addEventListener('click', () => {
	clear();
	updateDisplay(curr);
});
