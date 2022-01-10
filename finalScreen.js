const userName = document.getElementById('userName');
const submit = document.getElementById('submit');
const Score = document.getElementById('Score');
const recentScore = localStorage.getItem('highestScore');
const highScores = JSON.parse(localStorage.getItem("highScores"))|| [];

Score.innerText = recentScore;
userName.addEventListener("keyup", ()=>{
    submit.disabled = !userName.value;
});

saveHighScore=(e)=>{
    const newScore = {
        score: recentScore,
        name :userName.value,
    };
    highScores.push(newScore);
    highScores.sort((a, b)=>b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("./index.html");
}