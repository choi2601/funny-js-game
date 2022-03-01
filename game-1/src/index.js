(function app() {

    const startBtn = document.querySelector('.start-btn');
    const shuffle = document.querySelector('.shuffle');
    const selectList = document.querySelector('.select-list');
    const resultList = document.querySelector('.result-list');

    const shuffleItem = [{shape: '✌️', name: 'scissors'}, {shape: '✊', name: 'rock'}, {shape: '🖐', name: 'paper'}];
    let prevName = 'initial';
    const gameResult = [];

    let timerId = null;

    const render = {'scissors':  '✌️', 'rock': '✊', 'paper': '🖐'};

    function startGame() {
        if(timerId) return;
        startBtn.innerHTML = '게임 중...';

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
                `<li>${index + 1}번째 게임 ${result}</li>`
            )
        })}`;
        
    }

    function compareResult(myAttack) {
        clearInterval(timerId);
        timerId = null;
        startBtn.innerHTML = '다시시작';
        shuffle.innerHTML = '다시 게임 시작해보세요';
        const opAttack = shuffle.classList[1];

        if(myAttack === opAttack) {
            alert('비겼습니다');
            saveGameResult(myAttack, opAttack, '비겼습니다');
            return;
        }

        if(myAttack === 'scissors') {
            if(opAttack === 'rock') {
                alert('졌습니다');
                saveGameResult(myAttack, opAttack, '졌습니다');
            }
            else {
                alert('이겼습니다');
                saveGameResult(myAttack, opAttack, '이겼습니다');
            }
        }
        if(myAttack === 'rock') {
            if(opAttack === 'paper') {
                alert('졌습니다');
                saveGameResult(myAttack, opAttack, '졌습니다');
            }
            else {
                alert('이겼습니다');
                saveGameResult(myAttack, opAttack, '이겼습니다');
            } 
        }
        if(myAttack === 'paper') {
            if(opAttack === 'scissors') {
                alert('졌습니다');
                saveGameResult(myAttack, opAttack, '졌습니다');
            }
            else {
                alert('이겼습니다');
                saveGameResult(myAttack, opAttack, '이겼습니다');
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