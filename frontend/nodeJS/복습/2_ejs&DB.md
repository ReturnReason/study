> [이전에 get, post 요청하는 코드까지 작성](https://velog.io/@reasonz/2022.06.19-Node-GETPOST-%EC%9A%94%EC%B2%AD%ED%95%98%EA%B8%B0)했고
> 이번에는 작성한 html의 form을 post했을 때 몽고DB에 저장 후, 몽고DB에 저장한 데이터를 다시 가져와서 HTML에 보여주는 것을 구현해보려 한다.

# body-parser 사용하기

```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```

express 라이브러리를 최신 버전으로 설치했기 때문에 body-parser를 따로 설치하지 않아도 사용할 수 있다.

body-parser를 이용하면 req.body로 받아올 데이터를 원하는 형태로 파싱해서 사용할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/3653b53f-05f4-4bb8-94b0-98a5e4e2732d/image.png)

bodyParser 사용을 위한 코드를 작성했으니 위에 form에서 작성한 제목과 날짜를 DB에 저장하고 확인해볼 것이다.

```html
<form action="/send" method="POST">
  <div class="write-title">
    <h2>제목</h2>
    <input type="text" placeholder="ex ) 메이플 빵 사기" name="title" />
  </div>
  <div class="write-date">
    <h2>날짜</h2>
    <input type="text" placeholder="ex ) 2022.06.19 " name="date" />
  </div>
  <button class="btn write-btn">등록</button>
</form>
```

input 태그에 name 속성을 넣고 이름을 부여해주었다.
여기에 적은 name값은 req.body.name과 같은 형태로 접근하여 확인할 수 있다.
이제 이 form에서 POST 요청 되었을 때 bodyParser를 통해 name 속성이 있는 input 태그에 작성된 값을 확인할 수 있을 것이다.

```javascript
/* server.js */
app.post('/send', (req, res) => {
  console.log(req.body);
  return res.redirect('/send');
});
```

/send로 post요청이 되면서 이전에 input 박스에 name값을 작성한 데이터를 req.body를 통해 확인해 볼 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/8d82cb87-cc1a-4f9e-bf72-8768ccdbaa7e/image.png)

제대로 데이터가 받아와지는지 확인을 하기 위해 대충 입력하고 등록 버튼을 눌렀다.

![](https://velog.velcdn.com/images/reasonz/post/1b8cd5d4-6495-4ff5-b54f-b0cdab82f01d/image.png)

작성한 값이 제대로 나타나는 것을 확인할 수 있었다.
이제 이 데이터를 DB에 저장해볼 것이다.

## input에 작성한 데이터 DB에 저장하기

![](https://velog.velcdn.com/images/reasonz/post/70340249-5718-4577-93d8-837e0ec69da0/image.gif)

```javascript
app.post('/send', (req, res) => {
  db.collection('list').insertOne({ title: req.body.title, date: req.body.date }, (err, result) => {
    console.log('저장이 완료 되었습니다.');
  });

  return res.redirect('/send');
});
```

input 박스에 각각 들어갈 내용을 입력하고 mongoDB에 저장이 잘 되었는지 확인해보았다.

![](https://velog.velcdn.com/images/reasonz/post/7200be50-7b04-46a1-99dc-b79197de8f39/image.png)

작성한 내용이 제대로 저장이 되어있다.
이제 DB에서 데이터를 가져와서 HTML에 보여주는 코드를 작성해볼 것이다.

# ejs 사용하기

html에 자바스크립트 코드를 작성하기 위해 ejs 라이브러리를 설치해주었다. 사용을 위해 `app.set('view engine', 'ejs');`을 서버 JS 파일에 작성해주면 된다.

```javascript
/* server.js */
app.set('view engine', 'ejs');
```

![](https://velog.velcdn.com/images/reasonz/post/0b5aaee4-0f9b-40db-8690-e3e01b78b0dd/image.png)

ejs 파일은 반드시 `views 폴더`안에 만들어야 한다.
list.ejs라는 파일을 만든 후 다른 html의 기본 구조만 복붙해서 작성해주고 server.js 파일로 가서 get요청에 대한 코드를 작성했다.

```javascript
/* server.js */
app.get('/list', (req, res) => {
  res.render('list.ejs');
});
```

이전에는 `res.sendFile( __dirname + '파일명.html');`을 작성해서 화면에 렌더링했다면, ejs 파일은 `res.render('esj파일')` 형태로 화면에 렌더링 할 수 있다.

## DB에서 데이터 가져오기

```javascript
app.get('/list', (req, res) => {
  db.collection('list')
    .find()
    .toArray((err, result) => {
      console.log(result);
    });

  res.render('list.ejs');
});
```

/list로 get요청을 했을 때 db의 list라는 이름의 컬렉션에 있는 데이터를 가져오는 코드이다.
`console.log(result);` 해보면 현재 list 컬렉션에 있는 DB 데이터가 배열 안에 오브젝트 형태로 출력된다.

![](https://velog.velcdn.com/images/reasonz/post/81c3e54d-29fc-4886-bac9-6e19f3b575a9/image.png)

현재 DB에 저장되어 있는 내용이다.
이제 이 결과에서 필요한 값만 list.ejs 파일로 보내주면 된다.

render함수의 두번째 파라미터로 데이터값을 보내줄 수 있끼 때문에 render 함수 안에 두번째 파라미터로 결과값을 작성해주면 될 것이다. 작성 방법은 `{ 보낼 데이터 이름 : 전송할 데이터}` 형태로 작성해주면 된다.

```javascript
app.get('/list', (req, res) => {
  db.collection('list')
    .find()
    .toArray((err, result) => {
      res.render('list.ejs', { todoList: result });
    });
});
```

res.render의 두번째 파라미터로 todoList라는 이름으로 DB에서 받아온 데이터를 list.ejs 파일로 전송했다.

## DB에서 받아온 데이터 ejs파일에 바인딩하기

이제 list.ejs 파일에서는 받아온 데이터를 사용할 수 있게 되는데 사용하기 위해서는 ejs 문법을 사용해야 한다.

```html
<!-- list.ejs -->
<div class="list-container">
  <ul>
    <li class="list">
      <h2>할 일 : <%= todoList %></h2>
      <p>날짜</p>
    </li>
  </ul>
</div>
```

먼저, 어떤 데이터가 넘어오는지 확인하기 위해 이전에 todoList라는 이름으로 보냈기 때문에 ejs 문법을 사용하여 출력해보았다.

![](https://velog.velcdn.com/images/reasonz/post/409d6f94-914b-4f9e-bbdd-dc205a63ad44/image.png)

위와 같은 형태로 출력이 되었다.

```
<h2>할 일 : <%= todoList[0].title %></h2>
<p>날짜 : <%= todoList[0].date %></p>
```

그렇다면 0번째 데이터의 title, 0번째 데이터의 date를 받아오는 형태로 작성해주면 원하는 결과를 얻을 수 있을 것이다.

![](https://velog.velcdn.com/images/reasonz/post/9d08f919-d77f-41f7-b4bf-eb129f9be5d8/image.png)

현재는 하드코딩 했기 때문에 반복문을 사용하여 todoList의 데이터 길이 만큼 li요소를 추가하도록 코드를 수정하였다.

```html
<div class="list-container">
  <ul>
    <% for(list of todoList){ %>
    <li class="list">
      <h2>할 일 : <%= list.title %></h2>
      <p>날짜 : <%= list.date %></p>
    </li>
    <% } %>
  </ul>
</div>
```

![](https://velog.velcdn.com/images/reasonz/post/c9b0d661-6b21-4bcd-8e8e-a0d628ca4c23/image.png)

반복문으로 코드 수정 후 데이터도 하나 더 추가해보았다.

> 공부했던 내용을 복습겸 작성해보았다.
> 아직 익숙하지 않아서 약간의 구글링이 필요한 단계이지만 여러 차례 더 반복해서 손에 익힐 수 있도록 해봐야겠다.
