// --- タイトル画面の処理 ---
const titleScreen = document.getElementById('title-screen');
const currentDateDisplay = document.getElementById('current-date');

if (titleScreen) {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateDisplay.textContent = date.toLocaleDateString('ja-JP', options);

    titleScreen.addEventListener('click', () => {
        window.location.href = 'main.html';
    });
}

// --- メイン画面の処理 ---
const pointDisplay = document.getElementById('point-display');
const addButton = document.getElementById('add-point-btn');
const stampGrid = document.getElementById('stamp-grid');
const resetButton = document.getElementById('reset-btn');

if (stampGrid) {
    let points = 0;
    const TOTAL_STAMPS = 30;
    const REWARDS = [
        { stamp: 7, name: 'ガチャガチャ' },
        { stamp: 15, name: 'ガチャガチャ&アイス' },
        { stamp: 30, name: '焼肉!!' }
    ];

    function initializeStamps() {
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const cell = document.createElement('div');
            cell.classList.add('stamp-cell');
            cell.id = `stamp-cell-${i}`;

            const numberSpan = document.createElement('span');
            numberSpan.classList.add('stamp-number');
            numberSpan.textContent = i;
            cell.appendChild(numberSpan);

            const reward = REWARDS.find(r => r.stamp === i);
            if (reward) {
                cell.classList.add('reward-stamp');
                const label = document.createElement('span');
                label.classList.add('stamp-label');
                label.textContent = reward.name;
                cell.appendChild(label);
            }

            stampGrid.appendChild(cell);
        }
    }

    function loadPoints() {
        const savedPoints = localStorage.getItem('fitnessPoints');
        if (savedPoints !== null) {
            points = parseInt(savedPoints);
        }
    }

    function savePoints() {
        localStorage.setItem('fitnessPoints', points);
    }

    function updateUI() {
        pointDisplay.textContent = points;
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const cell = document.getElementById(`stamp-cell-${i}`);
            if (!cell) continue;

            const isStamped = i <= points;
            const isRewardStamp = REWARDS.some(r => r.stamp === i);

            if (isStamped) {
                if (!cell.querySelector('.stamp-image')) {
                    const img = document.createElement('img');
                    img.src = 'img/kin_tore.png';
                    img.alt = '筋トレスタンプ';
                    img.classList.add('stamp-image');
                    cell.appendChild(img);
                }
                cell.classList.add('stamped');
            } else {
                const img = cell.querySelector('.stamp-image');
                if (img) {
                    img.remove();
                }
                cell.classList.remove('stamped');
            }
            
            if (isRewardStamp && isStamped) {
                cell.classList.add('achieved');
            } else {
                cell.classList.remove('achieved');
            }
        }
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const confirmReset = window.confirm('本当にスタンプを初期化しますか？この操作は元に戻せません。');
            if (confirmReset) {
                points = 0;
                savePoints();
                updateUI();
                alert('スタンプを初期化しました。');
            }
        });
    }

    // ボタンクリック時の処理
    addButton.addEventListener('click', () => {
        if (points < TOTAL_STAMPS) {
            points++;
            updateUI();
            savePoints();

            // 新しくスタンプが押されたマス目の要素を取得
            const newStampCell = document.getElementById(`stamp-cell-${points}`);
            if (newStampCell) {
                const stampImage = newStampCell.querySelector('.stamp-image');
                if (stampImage) {
                    // アニメーションをトリガーする
                    stampImage.classList.add('animate');
                    // アニメーションが終わったらクラスを削除 (再度アニメーションできるように)
                    stampImage.addEventListener('animationend', () => {
                        stampImage.classList.remove('animate');
                    }, { once: true });
                }
            }
        }
    });

    initializeStamps();
    loadPoints();
    updateUI();
}