class Quiz{
    constructor(){
        this.quizes = [];
    }

    setQuiz(category, correct_answer, difficulty, incorrect_answers, question, type){
        const quizData = [];

        quizData.category = category;
        quizData.correct_answer = correct_answer;
        quizData.difficulty = difficulty;
        quizData.incorrect_answers = incorrect_answers;
        quizData.question = question;
        quizData.type = type;

        this.quizes.push(quizData);
    }

    getQuiz(){
        return this.quizes;
    }
}

const genre = document.getElementById("genre");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const start = document.getElementById("start");

const correctAnswers = [];
const answers = [];
const myAnswers = [];
let correctNumbers = 0;

let quiz = new Quiz();

async function showQuiz(data) {
    //問題を１０回表示させる
    for(let i = 0; i < data.length; i++){
        //HTMLの表示切り替え
        reset();

        correctAnswers.push(data[i].correct_answer);

        //正解と不正解をあわせる
        data[i].incorrect_answers.forEach(el => {
            answers.push(el);
        });
            
        answers.push(data[i].correct_answer);

        // 問題数・ジャンル・難易度
        const pNumber = document.createElement('p');
        pNumber.textContent = "問題" + (i + 1);
        const pGenre = document.createElement('p');
        pGenre.textContent = "【ジャンル】" + data[i].category;
        const pLevel = document.createElement('p');
        pLevel.textContent = "【難易度】" + data[i].difficulty;
        //問題文章
        const pQuestion = document.createElement('p');
        pQuestion.textContent = data[i].question;
        //上記表示
        genre.appendChild(pNumber);
        genre.appendChild(pGenre);
        genre.appendChild(pLevel);
        question.appendChild(pQuestion);
        // 正解と不正解を混ぜる
        arrShuffle(answers);
        //答え一覧表示
        for(let j = 0; j < answers.length; j++){
            const answerBtn = document.createElement('button');
            answerBtn.classList.add('btn');
            answerBtn.textContent = answers[j];
            answer.appendChild(answerBtn);
            const br = document.createElement('br');
            answer.appendChild(br);
        }
        //答えをクリックするまで待機
    await clickAnswer();
    }
    //結果表示
    result();
}

//開始が押されたら実行
start.addEventListener("click", function() {
    //処理画面表示
    processing();
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
        return response.json();
    })
    .then(data => {
        // データの取得
        getData(data);
    })
    .then(() => {
        //クイズ開始
        const quizes = quiz.getQuiz();
        showQuiz(quizes);
    })
 });