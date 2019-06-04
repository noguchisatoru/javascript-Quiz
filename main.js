const genre = document.getElementById("genre");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const start = document.getElementById("start");

const correctAnswers = [];
const answers = [];
const myAnswers = [];
let correctNumbers = 0;

async function quiz(data) {
    //問題を１０回表示させる
    for(let i = 0; i < data.results.length; i++){
        //HTMLの表示切り替え
        reset();

        correctAnswers.push(data.results[i].correct_answer);

        for(let j = 0; j < data.results[i].incorrect_answers.length; j++){
            answers.push(data.results[i].incorrect_answers[j]);
        }
        answers.push(data.results[i].correct_answer);

        // 問題数・ジャンル・難易度
        const pNumber = document.createElement('p');
        pNumber.textContent = "問題" + (i + 1);
        const pGenre = document.createElement('p');
        pGenre.textContent = "【ジャンル】" + data.results[i].category;
        const pLevel = document.createElement('p');
        pLevel.textContent = "【難易度】" + data.results[i].difficulty;
        //問題文章
        const pQuestion = document.createElement('p');
        pQuestion.textContent = data.results[i].question;
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

//ボタンがクリックされるまで待機しmyAnswersに保存
let clickAnswer = () =>{
    return new Promise(resolve =>{
        const btns = document.getElementsByClassName("btn");
        for(let test = 0; test < btns.length; test++){
            btns[test].addEventListener("click", function(){
                myAnswers.push(this.textContent);
                resolve();
            });
        }
    });
};

//待機画面の表示
let processing =() =>{
    genre.removeChild(genre.firstChild);
    question.removeChild(question.firstChild);
    answer.removeChild(answer.firstChild);

    const pGenre = document.createElement('p');
    pGenre.textContent = "取得中";
    const pQuestion = document.createElement('p');
    pQuestion.textContent = "少々お待ち下さい";

    genre.appendChild(pGenre);
    question.appendChild(pQuestion);
}


//配列のシャッフル
let arrShuffle = (arr) =>{
    let len = arr.length;
    while(len > 0){
      let rnd = Math.floor(Math.random() * len);
      let tmp = arr[len-1];
      arr[len-1] = arr[rnd];
      arr[rnd] = tmp;
      len-=1;
    }
  }

//問題、選択肢を削除する
let reset = () =>{
    while(genre.firstChild){
        genre.removeChild(genre.firstChild);
    }
    question.removeChild(question.firstChild);
    while(answer.firstChild){
        answer.removeChild(answer.firstChild);
    }
　　//配列リセット
    answers.length = 0;
}

//結果表示
let result = () =>{
    //答え合わせ
    for(i = 0; i < myAnswers.length; i++){
        if(myAnswers[i] === correctAnswers[i]){
            correctNumbers++
        }
    }

    reset();

    const pGenre = document.createElement('p');
    pGenre.textContent = "あなたの正解数は" + correctNumbers + "です！";
    const pQuestion = document.createElement('p');
    pQuestion.textContent = "再度挑戦の場合以下をクリック";

    const homeBtn = document.createElement('button');
    homeBtn.setAttribute("id","home");
    homeBtn.textContent = "ホームへ戻る";

    genre.appendChild(pGenre);
    question.appendChild(pQuestion);
    answer.appendChild(homeBtn);
    
    const home = document.getElementById("home");
    home.addEventListener("click", function(){
        //更新処理
        location.reload();
     });
}

fetch('https://opentdb.com/api.php?amount=10')
 .then(response => {
     return response.json();
 })
 .then(data => {
    //  クリックしたら開始される
    start.addEventListener("click", function() {
        processing();
        setTimeout(
            function()
            {
            quiz(data);
            },2000);
     });
 });