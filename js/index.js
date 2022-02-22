const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelectorAll('.eq');
const delbtn = document.querySelector('.clr');
const clearbtn = document.querySelector('.allclr');
const nums = document.querySelectorAll('.num');
const btns = document.querySelectorAll('.btn');

let curr = '0';
let num1 = 0,
	num2 = 0;
let operation = '';

/* Disable Tab functionality */
document.onkeydown = function (t) {
	if (t.key == 'Tab') {
		return false;
	}
};

/* Add no focus to all buttons */
Array.from(btns).forEach((btn) => {
	btn.addEventListener('mousedown', noFocus);
});

/* No focus on click */
function noFocus(e) {
	e.preventDefault();
}

/* Reset the calculator */
function reset() {
	curr = '0';
	num1 = 0;
	num2 = 0;
	operation = '';
	updateDisplay(curr);
}

document.addEventListener('keyup', (e) => {
	console.log(e.key);
	if (e.key == 'Escape') {
		reset();
	} else if (isFinite(e.key) || e.key == '.') {
		append(e.key);
		updateDisplay(curr);
		// console.log(num1, num2, curr);
	} else if ('+-*/x'.includes(e.key)) {
		operation = e.key;
		num1 = curr === '' ? num1 : parseFloat(curr);
		curr = '';
		updateDisplay(curr);
		// console.log(num1, num2, curr, operation);
	} else if (e.key === '=') {
		// console.log('eq');
	} else if (e.key === 'Backspace') {
		pop();
		updateDisplay(curr);
	} else if (e.key === 'Enter' || e.key === '=') {
		if (operation === '') return;
		num2 = parseFloat(curr);
		curr = '';

		solve();
		updateDisplay(curr);
	}
});

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

/* Resume the equal button */
function startInteraction() {
	Array.from(equals).forEach((equal) => {
		equal.addEventListener('click', equalHandler);
	});
}

/* Integer Clicks */
Array.from(nums).forEach((num) => {
	num.addEventListener('click', () => {
		startInteraction();
		const val = num.innerText;
		// console.dir(val);
		append(val);
		updateDisplay(curr);
	});
});

/* Operator Click */
Array.from(operators).forEach((op) => {
	op.addEventListener('click', () => {
		startInteraction();
		operation = op.innerHTML;
		num1 = curr === '' ? num1 : parseFloat(curr);
		curr = '';
		updateDisplay(curr);
	});
});

/* Equal Button click handler */
const equalHandler = () => {
	if (operation === '') return;
	num2 = parseFloat(curr);
	curr = '';

	solve();
	// console.log(num1, num2, curr);
	updateDisplay(curr);
};

/* Equal Click */
Array.from(equals).forEach((equal) => {
	equal.addEventListener('click', equalHandler);
});

/* Display Update */
function updateDisplay(str) {
	display.innerHTML = str === '' ? '0' : str;
}

/* Solve Function */
function solve() {
	Array.from(equals).forEach((equal) => {
		equal.removeEventListener('click', equalHandler);
	});
	let val = 0;
	switch (operation) {
		case '+':
			val = num1 + num2;
			break;
		case '-':
			val = num1 - num2;
			break;
		case 'x':
		case '*':
			val = num1 * num2;
			break;
		case '÷':
		case '/':
			val = num1 / num2;
			break;
		default:
			break;
	}
	if (isNaN(val)) {
		curr = 'Error🤔';
		return;
	}
	if (val == Infinity) {
		curr = 'Infinity♾️';
		return;
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
