> 1분코딩님의 canvas API 영상을 보고 정리하였다.

이전에 만들어본 간이 그림판에 기능을 추가해보기로 했다.

<br>

```html
<body>
  <h1>그림판</h1>
  <canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않습니다.</canvas>
  <script>
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    let drawingMode;

    function downHandler() {
      drawingMode = true;
    }

    function upHandler() {
      drawingMode = false;
    }

    function moveHandler(event) {
      if (!drawingMode) return;

      let x = event.offsetX;
      let y = event.offsetY;

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2, false);
      context.fill();
    }

    canvas.addEventListener('mousedown', downHandler);
    canvas.addEventListener('mousemove', moveHandler);
    canvas.addEventListener('mouseup', upHandler);
  </script>
</body>
```

<br>


위 코드는 지난 번에 그림판 만들기를 위해 작성한 코드이다.
여기에 컬러 팔레트를 만들어 해당 색상을 누르면 펜의 색이 변경되고 해당 컬러로 드로잉할 수 있는 기능을 추가해볼 것이다.

먼저 html과 css를 추가하였다.

<br>


```html
<h1>그림판</h1>
<canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않습니다.</canvas>
<div class="control">
  <button class="color-btn" data-color="black"></button>
  <button class="color-btn" data-color="red"></button>
  <button class="color-btn" data-color="green"></button>
  <button class="color-btn" data-color="blue"></button>

</div>
```

<br>


```css
  canvas {
    background: #eee;
  }

  .color-btn {
    width: 30px;
    height: 30px;
    border : none;
    border-radius: 50%;
  }
  .color-btn[data-color="black"]{
    background: black;
  }
  .color-btn[data-color="red"]{
    background: red;
  }
  .color-btn[data-color="green"]{
    background: green;
  }
  .color-btn[data-color="blue"]{
    background: blue;
  }
```

![](https://velog.velcdn.com/images/reasonz/post/3d5e2ae1-76af-4349-b14b-fbb4d54ac44d/image.png)

그림판 캔버스 아래에 컬러 버튼을 추가하였다.

```javascript
let colVal = 'black'; // 색상

function moveHandler(event) {
  if (!drawingMode) return;

  let x = event.offsetX;
  let y = event.offsetY;
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2, false);
  context.fill();
}

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);
control.addEventListener('click', setColor); // 부모박스에 이벤트 넣기

function setColor(e){
  colVal = e.target.getAttribute('data-color');
  context.fillStyle = colVal; // 펜 색상
}

```

디폴트 컬러는 블랙으로 변수에 담아 놓았다.
이벤트 버블링을 이용하여 부모 컨트롤 박스에만 이벤트를 달았고
각 버튼의 데이터 컬러 속성 이름을 받아와서 colVal 변수에 저장하도록 하였다.

이제 클릭한 컬러에 따라 펜의 색상이 바뀌어 바뀐 컬러로 그림을 그릴 수 있게 된다.

![](https://velog.velcdn.com/images/reasonz/post/b75479ca-afdb-45f5-b5c6-cd9bb8d6e4ea/image.png)


-- -- 
> 참고 자료

[1분코딩 HTML5 Canvas 캔버스 라이브 강좌 #2](https://www.youtube.com/watch?v=ovf8cbKtBH0&list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc&index=2&t=1793s&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)