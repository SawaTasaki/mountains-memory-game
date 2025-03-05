# mountains-memory-game"
山の名前のメモリーゲームです。

### フロントエンド
 - React (≒ Svelte, Vue.js)
 - TailwindCSS (Bootstrap)
### バックエンド&データベース(= BaaS)
 - Supabase (≒ Firebase)
### ビルドツール
 - Vite (≒ Webpack, Parcel, Rollup, Esbuild)
### ホスティングサービス
 - Vercel (≒ Cloudflare, Netlify, AWS amplify)

### 環境構築
```
npm create vite@latest // React、TypeScript+SWCを選択
cd vite-project
npm install
npm run dev

npm install -D tailwindcss@3.4.13 postcss autoprefixer
npx tailwindcss init -p

npm install -D @supabase/supabase-js

npx prettier . --write
```

### これから知りたいこと
- TypeScript + SWCは普通のTypeScriptとどう違うのか
- 設定ファイルが何を設定しているのか分からず初期値のままになっているので、内容を理解したい。