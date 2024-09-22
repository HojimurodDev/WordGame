const words = [];  // So'zlar va ularning tarjimalari saqlanadi
let correctAnswers = 0; // To'g'ri javoblar soni
let wrongAnswers = 0;   // Noto'g'ri javoblar soni
let stars = 3; // Boshlanishi uchun 3 yulduz
let timeLeft = 30; // Qolgan vaqt
let timer; // Timer

// O'yinni boshlash tugmasiga bosilganda so'zlarni olish va o'yinni boshlash funksiyasi
document.getElementById('startGame').addEventListener('click', startGame);

function startGame() {
    const input = document.getElementById('wordInput').value;
    if (input) {
        input.split('\n').forEach(item => {
            const parts = item.split('-');
            if (parts.length === 2) {
                const word = parts[0].trim();
                const translation = parts[1].trim();
                if (word && translation) {
                    words.push({ word: word, translation: translation });
                }
            } else {
                alert(`Noto'g'ri format: "${item}". Iltimos, "so'z - tarjima" formatida kiritilsin.`);
            }
        });
        document.getElementById('inputArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        startTimer(); // Timerni boshlash
        showRandomWord(); // Random so'zni ko'rsatish
        document.getElementById('translationInput').disabled = false; // Inputni yoqish
    }
}

function showRandomWord() {
    if (words.length === 0) {
        alert("So'zlar kiritilmagan!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    document.getElementById('randomWord').innerText = randomWord.word;
    document.getElementById('checkAnswer').onclick = () => checkAnswer(randomWord);
}

function checkAnswer(randomWord) {
    const userAnswer = document.getElementById('translationInput').value.toLowerCase();

    if (userAnswer === randomWord.translation.toLowerCase()) {
        alert("To'g'ri javob!");
        correctAnswers++;
        stars++; // Yulduz qo'shish
        resetTimer(); // Timerni qayta tiklash
    } else {
        alert(`Noto'g'ri! To'g'ri javob: ${randomWord.translation}`);
        wrongAnswers++;
        stars--; // Yulduz yo'qotish
    }

    document.getElementById('starCount').innerText = stars; // Yulduzlarni yangilash

    // Agar yulduzlar 0 ga teng bo'lsa yoki vaqt tugasa, o'yin tugaydi
    if (stars <= 0 || timeLeft <= 0) {
        alert("O'yin tugadi!");
        document.getElementById('translationInput').disabled = true; // Inputni o'chirish
        showResults(); // Natijalarni ko'rsatish
    } else {
        document.getElementById('translationInput').value = ''; // Inputni tozalash
        showRandomWord(); // Yangi random so'zni ko'rsatish
    }
}

function startTimer() {
    timeLeft = 30; // Vaqtni qayta tiklash
    document.getElementById('timeLeft').innerText = timeLeft; // Vaqtni yangilash
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('translationInput').disabled = true; // Inputni o'chirish
            alert("Vaqt tugadi!");
            showResults(); // Natijalarni ko'rsatish
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer); // Oldingi timerni to'xtatish
    startTimer(); // Yangi timerni boshlash
}

function showResults() {
    alert(`O'yin tugadi!\nTo'g'ri javoblar: ${correctAnswers}\nNoto'g'ri javoblar: ${wrongAnswers}`);
    document.getElementById('restartGame').style.display = 'block'; // "Yana o'ynash" tugmasini ko'rsatish
    clearInterval(timer); // Timerni to'xtatish
}

document.getElementById('restartGame').addEventListener('click', () => {
    correctAnswers = 0;
    wrongAnswers = 0;
    stars = 3; // Yulduzlarni qayta tiklash
    timeLeft = 30; // Vaqtni qayta tiklash
    words.length = 0; // So'zlarni tozalash
    document.getElementById('wordInput').value = '';
    document.getElementById('starCount').innerText = stars; // Yulduzlarni yangilash
    document.getElementById('timeLeft').innerText = timeLeft; // Vaqtni yangilash
    document.getElementById('inputArea').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('restartGame').style.display = 'none'; // Tugmani yashirish
    document.getElementById('translationInput').disabled = false; // Inputni yoqish
});
