# 会社情報検索サイト

AIを使って会社の情報を簡単に理解・検索できるWebアプリケーションです。

## 特徴

- シンプルで直感的なUI
- 中央に配置された検索バー
- よくある質問へのクイックアクセスボタン
- OpenAI GPT-4を使用したAI検索機能
- レスポンシブデザイン

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI**: OpenAI API (GPT-4)
- **ランタイム**: Node.js

## セットアップ方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、OpenAI APIキーを設定してください。

```bash
cp .env.example .env
```

`.env`ファイルを編集:

```
OPENAI_API_KEY=your_openai_api_key_here
```

OpenAI APIキーは[OpenAI Platform](https://platform.openai.com/api-keys)で取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 会社情報のカスタマイズ

`data/company-info.json`ファイルを編集して、自社の情報に書き換えてください。

```json
{
  "company": {
    "name": "あなたの会社名",
    "overview": "会社の概要...",
    "business": {
      "main": "主な事業内容..."
    }
    // その他の情報...
  }
}
```

## プロジェクト構造

```
company-info/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts      # AI検索APIエンドポイント
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # メインページ
├── components/
│   ├── SearchBar.tsx         # 検索バーコンポーネント
│   └── QuickButtons.tsx      # クイックアクセスボタン
├── data/
│   └── company-info.json     # 会社情報データ
└── README.md
```

## 使い方

### 検索方法

1. **検索バーから検索**: 中央の検索バーに質問を入力して「検索」ボタンをクリック
2. **クイックボタンから検索**: よくある質問ボタンをクリックすると自動的に検索が実行されます

### クイックアクセスボタン

- どんな会社？
- 何やってる？
- 何やりたい？
- 売上はどう作る？
- ターゲットは？
- 実績は？

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にログイン
2. プロジェクトをインポート
3. 環境変数 `OPENAI_API_KEY` を設定
4. デプロイ

## カスタマイズ

### クイックボタンの追加・変更

`components/QuickButtons.tsx`の`quickButtons`配列を編集してください。

```typescript
const quickButtons: QuickButton[] = [
  {
    label: '新しいボタン',
    query: '質問内容',
    icon: '🎯'
  },
  // ...
];
```

### AIモデルの変更

`app/api/search/route.ts`で使用するモデルを変更できます。

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // ここを変更
  // ...
});
```

利用可能なモデル:
- `gpt-4o` - 最新の高性能モデル
- `gpt-4o-mini` - コスト効率の良いモデル（デフォルト）
- `gpt-3.5-turbo` - 低コストモデル

## トラブルシューティング

### APIエラーが発生する場合

1. `.env`ファイルに`OPENAI_API_KEY`が正しく設定されているか確認
2. OpenAI APIキーが有効で、使用可能な残高があるか確認
3. 開発サーバーを再起動

### スタイルが反映されない場合

```bash
npm run dev
```

を実行してから再度確認してください。

## ライセンス

MIT
