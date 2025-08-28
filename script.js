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
    let stampDates = []; // スタンプの日付を保存する配列
    const TOTAL_STAMPS = 30;
    const REWARDS = [
        { stamp: 7, name: 'カフェで休憩' },
        { stamp: 15, name: '映画を見る' },
        { stamp: 30, name: '新しい服' }
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
            
            // 日付表示用の要素を追加
            const dateSpan = document.createElement('span');
            dateSpan.classList.add('stamp-date');
            cell.appendChild(dateSpan);

            stampGrid.appendChild(cell);
        }
    }

    function loadPoints() {
        const savedPoints = localStorage.getItem('fitnessPoints');
        if (savedPoints !== null) {
            points = parseInt(savedPoints);
        }
        // 日付のデータを読み込む
        const savedDates = localStorage.getItem('stampDates');
        if (savedDates !== null) {
            stampDates = JSON.parse(savedDates);
        }
    }

    function savePoints() {
        localStorage.setItem('fitnessPoints', points);
        // 日付のデータを保存する
        localStorage.setItem('stampDates', JSON.stringify(stampDates));
    }

    function updateUI() {
        pointDisplay.textContent = points;
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const cell = document.getElementById(`stamp-cell-${i}`);
            if (!cell) continue;

            const isStamped = i <= points;
            const isRewardStamp = REWARDS.some(r => r.stamp === i);

            // 筋トレマークの表示・非表示
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

            // 日付の表示・非表示
            const dateSpan = cell.querySelector('.stamp-date');
            if (isStamped && stampDates[i-1]) {
                const date = new Date(stampDates[i-1]);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                dateSpan.textContent = `${month}/${day}`;
            } else {
                dateSpan.textContent = ''; // 日付を消去
            }
            
            // ご褒美マスのスタイルを適用
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
                stampDates = []; // 日付の配列も初期化
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
            stampDates[points-1] = new Date().toISOString(); // 現在の日付を保存
            updateUI();
            savePoints();

            const newStampCell = document.getElementById(`stamp-cell-${points}`);
            if (newStampCell) {
                const stampImage = newStampCell.querySelector('.stamp-image');
                if (stampImage) {
                    stampImage.classList.add('animate');
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