지난번에 작성한 캔버스 관련 포스트

[Canvas API 개념 & 기본 사용방법](https://velog.io/@reasonz/2022.05.10-Canvas-API-%EA%B0%9C%EB%85%90-%EA%B8%B0%EB%B3%B8%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95)

[Canvas API 선과 원 그리기](https://velog.io/@reasonz/2022.05.11-Canvas-API-%EC%84%A0%EA%B3%BC-%EC%9B%90-%EA%B7%B8%EB%A6%AC%EA%B8%B0)

## 목차

1. 캔버스에서 애니메이션 구현하기 (requestAnimationFrame)
   - 원이 수평으로 움직이도록 만들기
   - setInterval 사용해보기
   - setInterval과 비교
   - requestAnimationFrame으로 타이밍 조절하기

## canvas 애니메이션 만들기

애니메이션은 반복해서 보여줘야 하기 때문에 그리고 지우고 살짝 이동시켜서 그리고 지우고를 반복하면 된다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

function draw() {
  context.arc(10, 150, 10, 0, Math.PI * 2, false);
  context.fill();
}

draw();
```

먼저 사용한 예제 코드는 draw라는 함수를 만들어서 반지름 10짜리 원을 그리도록 했다. 이제 이 원이 움직이도록 코드를 작성해볼 것이다.

![](https://velog.velcdn.com/images/reasonz/post/4bb444b8-e719-45e2-8014-66cfc11fcc27/image.png)

### 어떻게 반복 시킬까?

윈도우 전역객체가 가진 `requestAnimationFrame()` 메소드를 사용하여 기본적인 반복을 수행시킬 수 있다.
동작시킬 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출시키는 메소드이다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

function draw() {
  context.arc(10, 150, 10, 0, Math.PI * 2, false);
  context.fill();

  requestAnimationFrame(draw);
  // 반복적으로 그릴 함수 안에서 호출 (재귀함수)
}

draw();

// requestAnimationFrame(draw); // 여기서 호출하면 한번만 실행
```

반복하고자 하는 함수 안에서 requestAnimationFrame 메소드를 호출하면 된다. 파라미터에는 해당 함수 이름을 적어서 재귀 함수로 만들어주면 된다.

만약, 함수 안이 아닌 바깥에서 호출하는 경우엔 한번만 실행된다.

이제 애니메이션을 만들어주기 위해서는 원의 좌표를 바꿔서 반복시키면 될 것이다. 현재 위의 코드는 위치가 고정되어 있기 때문에 동일한 위치에 원을 계속 그리고 있을 것이다. (기본적으로 1/60초를 목표로 한다.)
원의 x축을 바꾸면 수평이동시킬 수 있을 것이다.

```javascript
let xPos = 10;

function draw() {
  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 3;

  requestAnimationFrame(draw);
}

draw();
```

x좌표를 변경해줄 변수를 선언하고 arc메소드 안의 x좌표 파라미터에 해당 변수를 넣어주었다.

![](https://velog.velcdn.com/images/reasonz/post/264f6da6-8a28-446e-8f76-47f9296393a3/image.gif)

1초에 약 60프레임만큼 xPos의 값이 3씩 증가되면서 위와 같은 형태로 애니메이션이 동작하게 된다.

그런데 공이 이동하는 애니메이션이 아닌 선이 연결되는 애니메이션이 되었다. 그 이유는 그리기만하고 지우지 않았기 때문이다.

### 원이 수평으로 움직이도록 만들기

```javascript
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 3;

  requestAnimationFrame(draw);)
}
```

함수안에서 `clearRect` 메소드를 사용하여 전체 캔버스를 지워주고 원을 그리도록 작성하면 된다.
여기서 beginPath가 작성되어있지 않다면, 앞서 선이 연결되는 것처럼 동일하게 동작하니 주의!

![](https://velog.velcdn.com/images/reasonz/post/ce1ee64c-8eb2-4296-a2e2-25b43f72027c/image.gif)

### setInterval로도 가능하다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

let xPos = 10;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 3;
}

setInterval(draw, 20);
```

![](https://velog.velcdn.com/images/reasonz/post/e4ee5cc9-091d-4496-a506-c1b7d5fd7757/image.gif)

setInterval을 사용해서 만든 애니메이션이다.
초당 몇번을 반복할지 정해줄 수 있다는 장점(컨트롤이 쉽다)이 있다.

### 그러면 setInterval이 더 좋은 것 아닌가?

기본적으로 기능은 그래보이지만, setInterval을 사용하지 않는 것은 requestAnimationFrame의 장점을 갖고 있지 않기 때문이다. requestAnimationFrame에 비해 버벅임 이슈라던가, 리페인트가 진행되기 전까지 기다려준다거나, 모바일 기기에서의 배터리 성능 등을 따져봤을 때 requestAnimtaionFrame이 캔버스 애니메이션에 있어서 장점이 더 큰 편이다.
고성능 애니메이션을 다루지 않는다면 setInterval을 사용해도 되긴 할 것이다.

### setInterval처럼 반복되는 속도나 타이밍을 조절하는 방법

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

let xPos = 10;
let count = 0;

function draw() {
  if (count % 30 === 0) {
    // 약 0.5초에 한번 실행된다.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
    context.fill();
    xPos += 3;
  }

  count++;

  requestAnimationFrame(draw);
}

draw();
```

count라는 변수를 선언하고 매 프레임마다 카운트를 1씩 증가시킨다. 카운트를 30으로 나눴을 때 나머지가 0인 경우에만 if문이 충족되어 해당 코드가 실행된다.
위 코드대로 진행하면 약 0.5초에 한번씩 원이 수평으로 이동하는 것처럼 보여진다.

![](https://velog.velcdn.com/images/reasonz/post/eaffa1f9-8944-44e0-a6a2-2f0a5828751d/image.gif)

즉, 나머지 연산자를 사용해 애니메이션 타이밍을 조정할 수 있는 것이다.

---

> 참고 자료

> [1분 코딩 - HTML5 Canvas 캔버스 라이브 강좌 #1](https://www.youtube.com/watch?v=JFQOgt5DMBY&list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc&index=1&t=3248s&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)

> [MDN window.requestAnimationFrame()](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)
