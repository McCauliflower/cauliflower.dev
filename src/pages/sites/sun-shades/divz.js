var ticker =  {
	currentNumber: 0,
}

var backgroundRgba = [
	'rgba(87%, 87%, 87%, 0)',
	'rgba(87%, 87%, 87%, 0.1)',
	'rgba(87%, 87%, 87%, 0.2)',
	'rgba(87%, 87%, 87%, 0.3)',
	'rgba(87%, 87%, 87%, 0.4)',
	'rgba(87%, 87%, 87%, 0.5)',
	'rgba(87%, 87%, 87%, 0.6)',
	'rgba(87%, 87%, 87%, 0.7)',
	'rgba(87%, 87%, 87%, 0.8)',
	'rgba(87%, 87%, 87%, 0.9)',
	'rgba(87%, 87%, 87%, 1)',
	'rgba(87%, 87%, 87%, .9)',
	'rgba(87%, 87%, 87%, 0.8)',
	'rgba(87%, 87%, 87%, 0.7)',
	'rgba(87%, 87%, 87%, 0.6)',
	'rgba(87%, 87%, 87%, 0.5)'
]

function row(){
				var topRow = document.getElementById('topRow').children;
				var bottomRow = document.getElementById('bottomRow').children;

				while(true){
					var incrementer = Math.abs((ticker.currentNumber % 30) - 15);
					var tenIncrementer = Math.abs((ticker.currentNumber % 20) - 10);
					topRow[tenIncrementer].style.backgroundColor = backgroundRgba[incrementer];
					bottomRow[tenIncrementer].style.backgroundColor = backgroundRgba[incrementer];

					ticker.currentNumber++;
				break;
		}
}
setInterval(() => row(), 200);
//loop through divs one at a time
