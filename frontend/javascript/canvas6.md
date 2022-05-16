## 캔버스 API로 간단한 그림판 만들기

먼저, 캔버스 위에서 원하는 위치에 도형이 그려지는 것을 만들어 보자.
테스트를 위해 캔버스에 클릭 이벤트 리스너와 클릭 이벤트 리스너에 들어갈 콜백 함수를 작성했다.

<br>

```javascript
canvas.addEventListener('click', clickHandler);

function clickHandler() {
  context.beginPath();
  context.arc(100, 100, 10, 0, Math.PI * 2, false);
  context.fill();
}
```

<br>

이렇게만 작성하면 캔버스 위에서 아무 곳이나 클릭하면 캔버스 기준 x좌표 100, y좌표 100위치에 반지름 10짜리 원이 하나 생길 것이다. (호를 그려주는 arc 메소드 안에 x와 y좌표를 하드 코딩 했기 때문에)

<br>

![](https://velog.velcdn.com/images/reasonz/post/ff52b3f6-e12f-4caa-be65-00238f13faa6/image.gif)

<br>

이제 이 코드를 캔버스에 클릭한 위치에서 원이 그려지도록 수정해보려 한다.
우선 클릭핸들러라는 함수는 canvas의 이벤트 리스너의 콜백 함수로 들어갈 것이기 때문에 event 객체를 파라미터로 받아서 사용할 수 있다.

<br>

```javascript
function clickHandler(event) {
  console.log(event);

  context.beginPath();
  context.arc(100, 100, 10, 0, Math.PI * 2, false);
  context.fill();
}
```

<br>

확인을 위해 콘솔에 이벤트를 찍어보기로 했다.
캔버스 위에서 아무 위치에나 클릭하면 event가 콘솔에 찍힐 것이다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/66362926-3a69-41bc-8720-f60870f37410/image.png)

<br>

정말 다양한 것들이 출력되는 것을 확인할 수 있는데 현재 필요한 것은 캔버스 위에서 클릭한 위치의 x와 y좌표이다.

<br>

`clientY`와 `clientX` : 현재 보이는 브라우저 크기 위치를 기준으로 x와 y값이 출력된다. (스크롤 길이는 무시)

`offsetY`와 `offsetX` : 이벤트 대상을 기준으로 x와 y 좌표가 반환된다.

`pageY`와 `pageX` : 전체 문서를 기준으로 x와 y값이 반환된다. (스크롤 길이 포함)

`screenY`와 `screenX` : 브라우저가 아닌 모니터 화면을 기준으로 좌표를 반환한다.

`layerY`와 `layerX` : 현재 레이어를 기준으로 수평 좌표를 반환한다.

<br>

### 궁금하니까 전부 콘솔에 찍어보자

```javascript
function clickHandler(event) {
  console.log(event);

  context.beginPath();
  context.arc(100, 100, 10, 0, Math.PI * 2, false);
  context.fill();

  console.log(`y : ${event.y}`);
  console.log(`clientY : ${event.clientY}`);
  console.log(`offsetY : ${event.offsetY}`);
  console.log(`layerY : ${event.layerY}`);
  console.log(`pageY : ${event.pageY}`);
  console.log(`screenY : ${event.screenY}`);
  console.log(`tiltY : ${event.tiltY}`);
}
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/689e93c9-2013-463c-8c9f-001be75e9ec8/image.gif)

<br>

캔버스의 가로와 세로 크기를 각각 1000px씩 늘려놓고 캔버스 y축의 가장 끝단을 클릭해보았다.

출력 값은 다음과 같다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/8b07b6b0-b095-4d77-9196-8a5094511f6f/image.png)

<br>

y와 clientY가 동일했고
layerY, pageY가 동일한 값을 반환했으며
screenY는 784, tiltY는 0을 출력했다.
캔버스의 높이가 1000px인 것을 감안하면 offsetY가 캔버스 y값을 출력했다고 보여진다.

1분 코딩님 영상에서는 layerX, Y를 사용하던데 전혀 다른 출력값이 나와서 본인은 offsetX, Y를 선택하기로 했다.

<br>

```javascript
function clickHandler(event) {
  let x = event.offsetX;
  let y = event.offsetY;

  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2, false);
  context.fill();
}

canvas.addEventListener('click', clickHandler);
```

<br>

arc 메소드의 x와 y값에 현재 캔버스위의 마우스 좌표 변수 값을 넣어주었다.

![](https://velog.velcdn.com/images/reasonz/post/bf204ca7-e195-437d-82d1-b62e30545675/image.gif)

이제 캔버스 위에 원하는 위치에서 원이 제대로 그려지는 것을 확인할 수 있다.

<br>

### 이제 마우스를 눌렀을 때만 그림이 그려지도록 코드를 수정해보자.

방금까지는 클릭 이벤트로 캔버스 위에 그렸지만 그림판을 만들기 위해서는 마우스를 누르고 드래그한 상태라면 계속 그림이 이어져서 그려져야 할 것이다.

<br>

```javascript
let drawingMode; // true일 때만 그림이 그려지도록

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
```

<br>

`drawingMode`라는 변수를 선언해주었다.
마우스가 누른 상태일 때 true값을 넣고 true일 때만 캔버스에 그림이 그려지도록 코드를 작성한 것이다.

![](https://velog.velcdn.com/images/reasonz/post/6838d913-18c1-4dce-9a55-d379ca8158d6/image.gif)

간단한 그림판이 완성되었다.

<br>

---

> 참고 자료

> [1분 코딩 - HTML5 Canvas 캔버스 라이브 강좌#2](https://www.youtube.com/watch?v=ovf8cbKtBH0&list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc&index=2&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)

> [ClientX, OffsetX, pageX, screenX의 차이](http://megaton111.cafe24.com/2016/11/29/clientx-offsetx-pagex-screenx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/)

> [MDN layerX](https://developer.mozilla.org/en-US/docs/web/api/mouseevent/layerx)
