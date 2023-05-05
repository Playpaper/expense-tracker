## 我的餐廳清單 (S3 Expense-tracker)

## 專案畫面

![This is an image](https://github.com/Playpaper/expense-tracker/blob/main/public/images/logout.png)
![This is an image](https://github.com/Playpaper/expense-tracker/blob/main/public/images/register.png)
![This is an image](https://github.com/Playpaper/expense-tracker/blob/main/public/images/home.png)
![This is an image](https://github.com/Playpaper/expense-tracker/blob/main/public/images/new.png)

## Features - 產品功能
提供您紀錄日常支出，將所有支出分類，方便您掌握金錢的流向，使用者可以透過註冊新帳號或連結FB等方式登入，登入後的會員可享有以下服務 :

:one: 使用者可以瀏覽所有的支出。

:two: 使用者可以瀏覽支出的詳細資訊。

:three: 使用者可以新增一筆支出。

:four: 使用者可以修改支出的資訊。

:five: 使用者可以刪除支出。

:six: 使用者可以依 "分類" 搜尋該分類支出的總額。

## Environment SetUp - 環境建置
- Runtime : Node.js
- Framework : Express@4.17.1
- Template Engine : Express-handlebars@4.0.2
- Database : MongoDB + mongoose@5.9.7
> :heavy_check_mark: Check package.json for other dependencies

## Installing - 專案安裝流程
:one: 開啟終端機, 複製此專案至本機電腦:
```
git clone https://github.com/Playpaper/restaurant-list-crud.git
```
:two: 進入存放此專案的資料夾
```
cd restaurant-list-crud
```
:three: 安裝 express
```
npm i express@4.17.1
```
:four: 安裝 handlebars
```
npm i express-handlebars@4.0.2
```
:five: 安裝 nodemon (如已安裝可跳過此步驟)
```
npm install -g nodemon
```
:six: 新增種子資料
```
npm run seed
```
當終端機出現以下字樣時，表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

> MONGODB connected!

> done!

:seven: 啟動伺服器
```
npm run dev
```
:eight: 當終端機出現以下字樣時，表示伺服器已啟動
```
The express server is listening on http://localhost:3000
```
