// アンカーリンクかどうかをチェックする関数
function isAnchor(url){
  // 現在のURLからリンクのURLを取得
  url = url.replace(location.href,'')
  // リンクがアンカーリンクかどうかをチェック
  return /^#/.test(url)
}

// 絶対URLかどうかをチェックする関数
function isAbsoluteUrl(url) {
    // URLの先頭が"http://"または"https://"で始まるかどうかをチェック
    return /^https?:\/\//i.test(url);
}

// 相対URLから絶対URLを取得する関数
function getAbsoluteUrl(relativeUrl) {
    const resolved = new URL(relativeUrl, window.location.href);
    return resolved.href;
}

// 絶対URLを取得する関数
function _href(url){
  return isAbsoluteUrl(url) ? url : getAbsoluteUrl(url);
}

// リンクのチェックを行う関数
async function linkChecker() {
    try {
        // ページ内の全てのリンクを取得し、アンカーリンクを除外する
        const links = Array.from(document.querySelectorAll('a')).filter(link => !isAnchor(link.href));
        
        // 各リンクについてループ
        for (const link of links) {
            const url = _href(link.href);
            // fetchを使用してリンクの有効性をチェック
            const response = await fetch(url, { method: 'HEAD' });

            // レスポンスがない場合はリンク要素の背景色を赤くする
            if (!response.ok) {
                link.style.backgroundColor = 'red';
                console.log(`Link ${url} is broken.`);
            }
        }
    } catch (error) {
        console.error(`Error checking links: ${error.message}`);
    }
}

window.linkChecker = linkChecker;

// ページのロード完了時にリンクチェッカーを実行する
document.addEventListener('DOMContentLoaded', linkChecker);

