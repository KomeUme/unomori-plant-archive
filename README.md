# 鵜ノ森｜植物アーカイブ

植物の成長記録、親株情報、栽培ガイドを公開するための静的サイトです。GitHub Pages 向けに設定済みで、サーバーやデータベースは必要ありません。

## ローカルで確認する

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。公開前の表示確認はこの方法で行えます。

## GitHub Pages で公開する

1. GitHub で空のリポジトリを作成します。
2. このフォルダの内容を `main` ブランチへ push します。
3. リポジトリの **Settings → Pages** を開き、公開元に **GitHub Actions** を選びます。
4. `main` への push ごとに `.github/workflows/deploy-pages.yml` が静的サイトをビルドして公開します。

通常のリポジトリURL（`https://ユーザー名.github.io/リポジトリ名/`）と、`ユーザー名.github.io` 形式の独自リポジトリの両方に対応しています。

## 日々の更新箇所

- 記事・植物・親株の内容: `app/data.ts`
- 写真: `public/` に追加し、`app/data.ts` の画像パスを `/画像名.jpg` の形で指定
- 表示や配色: `app/globals.css`
- BASE / Yahoo!オークションのURL: `app/shop/page.tsx`

## 独自ドメインを使う場合

独自ドメインのDNS設定後、`public/CNAME` を作成してドメイン名だけを記載してください。独自ドメインでもOGPを正しく表示するには、GitHub Actions のビルド環境変数 `NEXT_PUBLIC_SITE_URL` を `https://あなたのドメイン` に変更します。
