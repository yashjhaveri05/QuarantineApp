const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const related = document.getElementById('relatable');

const figureParts = document.querySelectorAll('.figure-part');

let words = ['javascript', 'jquery', 'react', 'angular', 'django', 'flask', 'express', 'python', 'bootstrap', 'materialize', 'mysql', 'sqlite', 'mongodb', 'fcbarcelona', 'watford', 'newcastle', 'monaco', 'dortmund', 'chelsea', 'ajax', 'arsenal', 'valencia', 'sheffield', 'wolverhampton', 'sevilla', 'liverpool', 'arsenal', 'realmadrid', 'atletico', 'juventus', 'paris', 'bayern', '', ''];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function hints(){
	if(selectedWord == 'javascript' || selectedWord == 'jquery' || selectedWord == 'react' || selectedWord == 'django' || selectedWord == 'angular' || selectedWord == 'flask' || selectedWord == 'python' || selectedWord == 'bootstrap'  || selectedWord == 'express'  || selectedWord == 'materialize'  || selectedWord == 'mysql' || selectedWord == 'sqlite' || selectedWord == 'mongodb' ){
		related.innerText = 'Hint:Web Development'
	}
	else{
		related.innerText = 'Hint:Football Team'
	}
	console.log(selectedWord);
}

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	hints();
	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

hints();
displayWord();
