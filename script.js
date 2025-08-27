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

if (stampGrid) {
    let points = 0;
    const TOTAL_STAMPS = 30;
    const REWARD_STAMPS = [7, 15, 30]; // ご褒美マスのポイント

    // ページの初期化
    function initializeStamps() {
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const cell = document.createElement('div');
            cell.classList.add('stamp-cell');
            cell.id = `stamp-cell-${i}`;

            const numberSpan = document.createElement('span');
            numberSpan.classList.add('stamp-number');
            numberSpan.textContent = i;
            cell.appendChild(numberSpan);

            // ご褒美マスに特別なクラスを付与
            if (REWARD_STAMPS.includes(i)) {
                cell.classList.add('reward-stamp');
                const label = document.createElement('span');
                label.classList.add('stamp-label');
                label.textContent = 'ご褒美';
                cell.appendChild(label);
            }

            stampGrid.appendChild(cell);
        }
    }

    // ローカルストレージからポイントを読み込む
    function loadPoints() {
        const savedPoints = localStorage.getItem('fitnessPoints');
        if (savedPoints !== null) {
            points = parseInt(savedPoints);
        }
    }

    // ローカルストレージにポイントを保存
    function savePoints() {
        localStorage.setItem('fitnessPoints', points);
    }

    // 画面表示を更新
    function updateUI() {
        pointDisplay.textContent = points;
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const cell = document.getElementById(`stamp-cell-${i}`);
            if (i <= points) {
                cell.classList.add('stamped');
                if (REWARD_STAMPS.includes(i)) {
                    cell.classList.add('achieved');
                }
            } else {
                cell.classList.remove('stamped', 'achieved');
            }
        }
    }

    // ボタンクリック時の処理
    addButton.addEventListener('click', () => {
        if (points < TOTAL_STAMPS) {
            points++;
            updateUI();
            savePoints();
        }
    });

    // ページ読み込み時に実行
    initializeStamps();
    loadPoints();
    updateUI();
}