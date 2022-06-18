# Node.js ✍

1. 터미널에 `npm init` 명령어를 사용해서 package.json 파일을 먼저 만들어 주었다.

2. `npm install express`하여 express 라이브러리를 설치했다.

## 서버 세팅하기

```javascript
const express = require('express');
const app = express();

app.listen('8000', () => {
  console.log('listening on 8000');
});

app.get('/', (req, res) => {
  res.send('안녕!');
});
```

설치한 express 라이브러리를 require를 사용해 불러온 후 8000번 포트를 사용하도록 작성했다.
localhost:8000으로 접속하면 '안녕!'이라는 메시지가 화면에 출력된다.

## html 파일 보여주기

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

send로 작성했던 부분을 sendFile로 변경해 주고 파일 경로와 파일 이름을 작성해주었다.

## css 파일 적용하기 (정적 파일 사용하기)

일반 html에 link 태그를 사용하여 css를 불러와도 css가 먹히지 않는다.
미들웨어를 사용해 이 부분을 해결할 수 있다.

1. public이라는 폴더를 만든다.
2. public 폴더 안에 css 폴더를 만들고 css 파일을 만든다.
3. server.js 파일에서 `app.use(express.static('public'));`를 작성해준다.

이제 평상시와 같이 html에 link태그를 사용해서 css 경로를 작성해주면 css가 적용이 된다.

```
<link rel="stylesheet" href="/css/style.css" />

```

public 폴더 명은 작성하지 않아도 된다.
public 폴더 안에 css 폴더를 만들었으므로 `/css/css파일명.css` 형태로 작성하면 적용된다.

![](https://velog.velcdn.com/images/reasonz/post/993a4dcc-cbb9-40e6-8f40-15fa9159de87/image.png)

css 파일로 간단하게 스타일링해보았다.

## MongoDB Atlas 사용하기

MongoDB Atlas 사용 방법은 유튜버 [나동빈님의 영상](https://www.youtube.com/watch?v=C2rhqCwhoB0&ab_channel=%EB%8F%99%EB%B9%88%EB%82%98)을 보고 따라가면 쉽게 적용할 수 있다.
또는 [mongodb 문서](https://www.mongodb.com/docs/drivers/node/current/quick-start/)를 참고하면 된다.

1. MongoDB 설치하기 `npm install mongodb`
2. Mogodb atlas 회원가입 후 클러스터 생성

![](https://velog.velcdn.com/images/reasonz/post/0a300b85-95ed-47f4-9725-9f69d47d124a/image.png)

3. Connect Your Application 버튼을 눌러서 나오는 string code를 사용해서 접속할 수 있다. (database 메뉴에서 connect 버튼을 누르면 나타난다.)

![](https://velog.velcdn.com/images/reasonz/post/4dc859eb-af05-401c-a60f-713ac4532ecc/image.png)

Create Database를 사용해서 database 이름과 사용할 collection name을 작성해주고 생성버튼을 눌러준다.

4. server.js에서 mongoDB를 연동한다

```javascript
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('connect 에서 제공된 URL', (err, client) => {
  if (err) return console.error(err);
  // 연동후 실행할 코드
});
```

MongoClient.connect의 첫번째 파라미터로 `Connect Your Application`을 눌렀을 때 나타나는 string code를 붙여넣으면 된다.
붙여넣을 때 `<password>`부분은 지우고 db 생성할 때 설정한 비밀번호를 입력하면 된다.

```javascript
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('connect 에서 제공된 URL', (err, client) => {
  if (err) return console.error(err);

  app.listen('8000', () => {
    console.log('listening on 8000');
  });
});
```

MongoDB가 연동되면 실행할 코드로 app.listen 코드를 옮겨넣었다.

## db 연동하기

Atlas 사용하기 3번에서 작성한 Create Database에서 만든 database 이름을 적어서 연동할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/1fcb15b4-22bb-403b-b6ba-52f6d975ab4b/image.png)

본인은 todolist라는 이름으로 만들었기 때문에 todolist라고 입력해주면 된다.

```javascript
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('connect 에서 제공된 URL', (err, client) => {
  if (err) return console.error(err);
  db = client.db('todolist');

  app.listen('8000', () => {
    console.log('listening on 8000');
  });
});
```

db라는 변수를 위에서 선언해주고 MongoDB가 연결됐을 때 결과(생성한 db 이름)를 담아주면 된다.

## DB연동 및 데이터 저장 확인해보기

```javascript
MongoClient.connect('connect 에서 제공된 URL', (err, client) => {
  if (err) return console.error(err);
  db = client.db('todolist');

  db.collection('list').insertOne({ key: 'value', 저장해보기: '테스트' }, (err, result) => {
    console.log('저장이 완료 되었습니다.');
  });

  app.listen('8000', () => {
    console.log('listening on 8000');
  });
});
```

todolist라는 이름의 데이터 베이스가 있고
이 todolist 데이버테이스의 collection 이름으로 list를 가지고 있다.

db를 담은 변수에 만든 collection의 이름을 달아준 후 데이터베이스에 insert(추가)할 수 있다.

```javascript
db.collection('list').insertOne({ key: 'value', 저장해보기: '테스트' }, (err, result) => {
  console.log('저장이 완료 되었습니다.');
});
```

이 부분이 list라는 collection에 insert하는 코드인데
inserOne 또는 inserMany를 사용해서 DB안에 저장할 수 있다.
위에서는 insertOne을 사용했는데, insertOne 메소드 인자로 오브젝트 형태의 `{ key : value }` 와 같이 작성해주면 된다.

위처럼 작성하고 저장하고 서버를 실행해보면 터미널 창에 '저장이 완료 되었습니다.'라는 문구가 뜰 것이다.

MongoDB Atlas에서 확인해보면 방금 전에 insertOne으로 추가한 데이터가 저장이 되어 있는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/298e7e73-c868-4988-9dbd-2384e76ff966/image.png)

작성한 내용이 DB에 저장이 되어 있다면 연동이 제대로 된 것이다.

`_id`라는 것은 작성하지 않았지만 DB 자료 구분을 위해 유니크한 key가 필요하다. 직접 작성하지 않았을 때는 MongoDB가 임의의 id값을 부여한다.

---

> 참고 자료

[MongoDB Atlas 사용방법](https://www.youtube.com/watch?v=C2rhqCwhoB0&ab_channel=%EB%8F%99%EB%B9%88%EB%82%98)

[MongoDB](https://www.mongodb.com/docs/drivers/node/current/quick-start/)
