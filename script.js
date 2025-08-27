// HTML要素の取得
const pointDisplay = document.getElementById('point-display');
const addButton = document.getElementById('add-point-btn');

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