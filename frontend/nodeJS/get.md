# Node.js

Node.js는 V8 엔진으로 빌드된 자바스크립트 런타임이다. 네트워크 애플리케이션(보통 서버사이드)개발에 사용된다.
자바스크립트 언어를 사용하며 논블로킹 I/O와 단일 스레드 이벤트 루프를 사용하여 높은 처리 성능을 가지고 있다.

[Node.js 다운로드
](https://nodejs.org/ko/download/)

<br>

```javascript
/* Node.js 홈페이지 예제 코드 */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

<br>

Node.js의 가장 큰 장점은 논블로킹 I/O라는 점과 프론트엔드와 백엔드 개발자가 동일한 언어를 사용하는 것이다.

보통 서버 개발에 사용할 때는 express 라이브러리와 함께 사용한다.

<br>

### express 사용 예제 코드

```javascript
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});
```

express 라이브러리 사용만으로 코드가 짧아짐은 물론 사용하는 것도 더 쉬워졌다.

<br>

### get 요청하기

express 라이브러리를 사용해서 서버를 만들었다.
사용방법은 어렵지 않기 때문에 생략했다.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // res.send('기본페이지');
  res.sendFile(__dirname + '/index.html');
  // __dirname은 현재 파일 경로를 의미한다.
  // sendFile을 사용하면 파일을 보낼 수 있다.
});

app.listen(8000, function () {
  console.log('listening on 8000');
});
```

<br>

`/`는 홈을 의미한다. 누군가 8000번 포트로 접속을 하면 보여줄 페이지가 되는 것이다.
`req`와 `res`는 request, response를 의미한다.
말 그대로 요청과 응답이라는 뜻인데 위 코드에서는 사용자가 해당 주소(`/`)로 접속하면 res(응답)으로 `index.html`을 보여주겠다는 의미가 된다.

여기서 `__dirname`이 의미하는 것은 현재 파일 경로를 뜻한다.
`sendFile`을 사용하면 파일을 보낼 수 있다.
즉, 위 코드는 현재 경로에 있는 index.html을 응답으로 보낸다는 해석이 된다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/6d94fbd6-872b-4520-8b61-53dd87e1cf66/image.png)

추가적으로 `nodemon`이라는 라이브러리를 함께 사용하면 서버를 껐다 켜야하는 수고로움을 덜 수 있다.

<br>

---

> 참고 자료

> [위키백과 Node.js](https://ko.wikipedia.org/wiki/Node.js)

> [Node.js](https://nodejs.org/ko/about/)

> [express](https://expressjs.com/ko/guide/routing.html)
