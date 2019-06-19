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

//問題、選択肢を削除する
const reset = () =>{
    while(genre.firstChild){
        genre.removeChild(genre.firstChild);
    }
    question.removeChild(question.firstChild);
    while(answer.firstChild){
        answer.removeChild(answer.firstChild);
    }
}

//結果表示
const result = () =>{
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