// HTML要素を取得
const pointDisplay = document.getElementById('point-display');
const addButton = document.getElementById('add-point-btn');

let points = 0; // 初期ポイント

// ボタンがクリックされたときの処理
addButton.addEventListener('click', () => {
    points++; // ポイントを1増やす
    pointDisplay.textContent = points; // 画面の表示を更新
    console.log('現在のポイント:', points);
});