(function app() {

    const startBtn = document.querySelector('.start-btn');
    const shuffle = document.querySelector('.shuffle');
    const selectList = document.querySelector('.select-list');
    const resultList = document.querySelector('.result-list');

    const shuffleItem = [{shape: 'βοΈ', name: 'scissors'}, {shape: 'β', name: 'rock'}, {shape: 'π', name: 'paper'}];
    let prevName = 'initial';
    const gameResult = [];

    let timerId = null;

    const render = {'scissors':  'βοΈ', 'rock': 'β', 'paper': 'π'};

    function startGame() {
        if(timerId) return;
        startBtn.innerHTML = 'κ²μ μ€...';

        timerId = setInterval(() => {
            const randomPt = Math.floor(Math.random() * 3)
            shuffle.innerHTML = shuffleItem[randomPt].shape;
            shuffle.classList.replace(prevName, shuffleItem[randomPt].name);
            prevName = shuffleItem[randomPt].name;
        }, 100);
    }

    function saveGameResult(myAttack, opAttack, result) {
        const resultInfo = `You:${render[myAttack]}, OP:${render[opAttack]} => ${result}`;
        
        gameResult.push(resultInfo);
        
        resultList.innerHTML = `${gameResult.map((result, index) => {
            return (
                `<li>${index + 1}λ²μ§Έ κ²μ ${result}</li>`
            )
        })}`;
        
    }

    function compareResult(myAttack) {
        clearInterval(timerId);
        timerId = null;
        startBtn.innerHTML = 'λ€μμμ';
        shuffle.innerHTML = 'λ€μ κ²μ μμν΄λ³΄μΈμ';
        const opAttack = shuffle.classList[1];

        if(myAttack === opAttack) {
            alert('λΉκ²Όμ΅λλ€');
            saveGameResult(myAttack, opAttack, 'λΉκ²Όμ΅λλ€');
            return;
        }

        if(myAttack === 'scissors') {
            if(opAttack === 'rock') {
                alert('μ‘μ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ‘μ΅λλ€');
            }
            else {
                alert('μ΄κ²Όμ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ΄κ²Όμ΅λλ€');
            }
        }
        if(myAttack === 'rock') {
            if(opAttack === 'paper') {
                alert('μ‘μ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ‘μ΅λλ€');
            }
            else {
                alert('μ΄κ²Όμ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ΄κ²Όμ΅λλ€');
            } 
        }
        if(myAttack === 'paper') {
            if(opAttack === 'scissors') {
                alert('μ‘μ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ‘μ΅λλ€');
            }
            else {
                alert('μ΄κ²Όμ΅λλ€');
                saveGameResult(myAttack, opAttack, 'μ΄κ²Όμ΅λλ€');
            }
        }

        
    }

    startBtn.addEventListener('click', e => {
        startGame();
    })

    selectList.addEventListener('click', e => {
        if(e.target.nodeName !== 'LI' || !timerId) return;
        
        const currentSelectedLI = e.target.classList[0];
        
        compareResult(currentSelectedLI);
    });
})();