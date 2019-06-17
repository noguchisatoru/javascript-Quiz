class Quiz{
    constructor(quizData){
        this.category = quizData.category;
        this.correct_answer = quizData.correct_answer;
        this.difficulty = quizData.difficulty;
        this.incorrect_answers = quizData.incorrect_answers;
        this.question = quizData.question;
        this.type = quizData.type;
    }

    answers(){
        const answers = [];
        //正解と不正解をあわせる
        this.incorrect_answers.forEach(el => {
            answers.push(el);
        });
        answers.push(this.correct_answer);
        // 正解と不正解を混ぜる
        this.arrShuffle(answers);
        
        return answers;
    }

    //配列（正解と不正解）のシャッフル
    arrShuffle = (arr) =>{
        let len = arr.length;
        while(len > 0){
        let rnd = Math.floor(Math.random() * len);
        let tmp = arr[len-1];
        arr[len-1] = arr[rnd];
        arr[rnd] = tmp;
        len-=1;
        }
    }
}

const genre = document.getElementById("genre");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const start = document.getElementById("start");

//正解数
let correctNumbers = 0;
let index = 0;

const showQuiz = (quizData) =>{
    if(quizData.length > index){
        //HTMLの表示切り替え
        reset();

        const quiz = new Quiz(quizData[index]);

        const answers = quiz.answers();

        // 問題数・ジャンル・難易度
        const pNumber = document.createElement('p');
        pNumber.textContent = "問題" + (index + 1);
        const pGenre = document.createElement('p');
        pGenre.textContent = "【ジャンル】" + quiz.category;
        const pLevel = document.createElement('p');
        pLevel.textContent = "【難易度】" + quiz.difficulty;
        //問題文章
        const pQuestion = document.createElement('p');
        pQuestion.textContent = quiz.question;
        //上記表示
        genre.appendChild(pNumber);
        genre.appendChild(pGenre);
        genre.appendChild(pLevel);
        question.appendChild(pQuestion);
        //回答一覧表示
        for(let j = 0; j < answers.length; j++){
            const answerBtn = document.createElement('button');
            answerBtn.classList.add('btn');
            answerBtn.textContent = answers[j];
            answer.appendChild(answerBtn);
            const br = document.createElement('br');
            answer.appendChild(br);
        }

        const btns = document.getElementsByClassName("btn");
        for(let i = 0; i < btns.length; i++){
            btns[i].addEventListener("click", function(){
                 //答え合わせ
                if(this.textContent === quiz.correct_answer){
                    correctNumbers++;
                }
                index++;
                showQuiz(quizData);
            });
        }
    }else{
        //結果表示
        result();
    }
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
        //クイズ開始
        showQuiz(data.results);
    })
 });