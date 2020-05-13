# youtube-page
[Demo](https://rccj.github.io/having-github/)

## 核心
- 串接GitHub api

- 抓取Repositories資料
  - 標題
  - 描述
  - 時間

- 點擊前往
  - 當前Repositories
  - Demo頁面

- 不用套件完成Infinite Scroll(無限滾動)
  - 如果Repositories資料還沒顯示完整，頁面拉到底會繼續加載。

- 搜尋其他使用者資料

- 存取喜歡的專案(localstorage)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```