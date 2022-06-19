> 공부한 내용을 바탕으로 직접 구현해보기

<br>

![](https://velog.velcdn.com/images/reasonz/post/216b8d49-0088-48af-a7d2-d3315c4ae243/image.png)

메인 페이지를 간단하게 디자인했다.
홈에서 글쓰기 버튼을 누르면 /write 페이지로 이동되도록 코드를 작성했다.
또, 사용자가 /write 페이지로 접속했을 때도 마찬가지로 get요청을 처리하도록 하였다.

```javascript
/* server.js */
app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});
```

우선 wrtie 페이지 get요청은 이렇게 작성하였고 버튼을 눌렀을 때 /write 페이지로 이동하는 것은 window.location.href 를 사용했다.
맞는 방법인지는 모르겠지만 페이지를 리다이렉션 시켜서 제대로 동작하긴 한다.

```javascript
const writeBtn = document.querySelector('.write-btn');

writeBtn.addEventListener('click', () => {
  window.location.href = '/write';
});
```

![](https://velog.velcdn.com/images/reasonz/post/b6c50f46-1649-4d54-b6ad-0cf08a9c3a86/image.gif)

이제 write.html 페이지의 html 작성 후 form 태그로 POST 요청을 해볼 것이다.

![](https://velog.velcdn.com/images/reasonz/post/e58d25c8-cb1b-42e8-8f75-199b3eebacb2/image.png)

form 태그 안에 인풋 태그를 넣었다. 등록 버튼을 누르면 POST요청을 하도록 하였다.

![](https://velog.velcdn.com/images/reasonz/post/e2a3ba64-ffeb-4989-a28f-d0e92cb3a484/image.gif)

아직 폼 태그에 작성한 내용을 DB에 저장하고 꺼내오는 코드는 작성하지 않아서 페이지만 변경되고 있지만 form에 작성한 내용을 POST 요청하면 `/send` 페이지로 리다이렉션되도록 하였다. 리다이렉트 시키기 위해 get 코드도 함께 작성해주어야 한다.

```javascript
app.get('/send', (req, res) => {
  res.sendFile(__dirname + '/send.html');
});

app.post('/send', (req, res) => {
  return res.redirect('/send');
});
```

간단하게 get, post 요청하는 방법을 작성해보았다.
다음 번에는 이 페이지에 작성한 내용을 DB에 저장하고 꺼내서 보여주는 기능을 구현해보려 한다.
