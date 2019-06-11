//ボタンがクリックされるまで待機しmyAnswersに保存
const clickAnswer = () =>{
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

//データの取得
const getData = (test) =>{
    test.results.forEach(el => {
        quiz.setQuiz(el.category, el.correct_answer, el.difficulty, el.incorrect_answers, el.question, el.question);
        const test = quiz.getQuiz();
    });
};

//待機画面の表示
const processing = () =>{
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

//配列（正解と不正解）のシャッフル
const arrShuffle = (arr) =>{
    let len = arr.length;
    while(len > 0){
      let rnd = Math.floor(Math.random() * len);
      let tmp = arr[len-1];
      arr[len-1] = arr[rnd];
      arr[rnd] = tmp;
      len-=1;
    }
  }

//結果表示
const result = () =>{
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

//問題、選択肢を削除する
const reset = () =>{
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
