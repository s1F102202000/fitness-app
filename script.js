// --- タイトル画面の処理 ---
const titleScreen = document.getElementById('title-screen');
const currentDateDisplay = document.getElementById('current-date');

if (titleScreen) { // タイトル画面が存在する場合のみ実行
    // 現在の日付を表示 (例: 2023年10月26日 木曜日)
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateDisplay.textContent = date.toLocaleDateString('ja-JP', options);

    // 画面タップでメインページへ遷移
    titleScreen.addEventListener('click', () => {
        window.location.href = 'main.html'; // main.htmlへ移動
    });
}


// --- メイン画面の処理（既存のコードを維持しつつ、必要に応じて変更） ---
// HTML要素の取得
const pointDisplay = document.getElementById('point-display');
const addButton = document.getElementById('add-point-btn');

// main.htmlが存在する場合のみ実行
if (pointDisplay && addButton) {
    // ご褒美の目標ポイントと要素を配列で管理
    const rewards = [
        { id: 1, target: 5 },
        { id: 2, target: 10 },
        { id: 3, target: 25 }
    ];

    let points = 0;

    // ポイントをローカルストレージから読み込む
    function loadPoints() {
        const savedPoints = localStorage.getItem('fitnessPoints');
        if (savedPoints !== null) {
            points = parseInt(savedPoints);
        }
    }

    // ポイントをローカルストレージに保存する
    function savePoints() {
        localStorage.setItem('fitnessPoints', points);
    }

    // 画面表示を更新する関数
    function updateUI() {
        pointDisplay.textContent = points;
        rewards.forEach(reward => {
            const progressBar = document.getElementById(`progress-${reward.id}`);
            const progressText = document.getElementById(`progress-text-${reward.id}`);
            const rewardItem = document.getElementById(`reward-${reward.id}`);

            if (progressBar && progressText && rewardItem) { // 要素が存在するか確認
                // ゲージの幅を計算
                const progressPercentage = Math.min((points / reward.target) * 100, 100);
                progressBar.style.width = `${progressPercentage}%`;

                // 進捗テキストを更新
                progressText.textContent = `${Math.min(points, reward.target)} / ${reward.target} P`;

                // 達成状況に応じてクラスを付与
                if (points >= reward.target) {
                    rewardItem.classList.add('achieved');
                } else {
                    rewardItem.classList.remove('achieved');
                }
            }
        });
    }

    // ボタンクリック時の処理
    addButton.addEventListener('click', () => {
        points++;
        updateUI();
        savePoints();
    });

    // ページ読み込み時に実行
    loadPoints();
    updateUI();
}