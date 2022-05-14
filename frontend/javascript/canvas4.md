이전에 공부했던 캔버스 강좌를 이어서 1분 코딩님의 라이브강좌 영상을 기준으로 작성하였다.
오늘은 간단히 애니메이션을 멈추는 방법에 대해 공부해보았다.

> 지난번에 작성한 캔버스 관련 포스트

> [Canvas API 개념 & 기본 사용방법](https://velog.io/@reasonz/2022.05.10-Canvas-API-%EA%B0%9C%EB%85%90-%EA%B8%B0%EB%B3%B8%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95)

> [Canvas API 선과 원 그리기](https://velog.io/@reasonz/2022.05.11-Canvas-API-%EC%84%A0%EA%B3%BC-%EC%9B%90-%EA%B7%B8%EB%A6%AC%EA%B8%B0)

> [Canvas 기본 애니메이션 적용하기](https://velog.io/@reasonz/2022.05.12-Canvas-API-%EC%BA%94%EB%B2%84%EC%8A%A4-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

<br>

# Canvas API #4

<br>

### 목차

1. 애니메이션 멈추는 방법
   - requestAnimationFrame 멈추는 방법
   - setInterval 멈추는 방법

---

<br>

# requestAnimationFrame

### 계속 무한 반복되는 애니메이션을 멈추는 방법

캔버스의 끝까지 왔을 때 더이상 애니메이션이 실행되지 않게 하려면 `x위치`와 `캔버스의 가로 길이에서 원의 반지름 만큼을 제외한 값`을 `비교`하면 된다.

![](https://velog.velcdn.com/images/reasonz/post/bfbebce0-a278-44e9-8801-f9e3e738159a/image.gif)

현재 한 방향으로 원이 계속 이동하여 애니메이션이 종료되지 않고 있다. (움짤이라 중간에 짤리지만 한 방향으로 끊임없이 계속 이동된다.)

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

  requestAnimationFrame(draw);
}

draw();
```

캔버스 끝에 딱 닿았을 때 애니메이션을 종료 해보자.

### requestAnimationFrame이 실행되기 전에 return으로 멈추기

```javascript
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 3;

  if (xPos >= canvas.width - 10) {
    return;
  }
  requestAnimationFrame(draw);
}
```

draw함수 안에 if문을 넣고 현재 x위치가 캔버스의 가로사이즈-원의반지름 보다 크거나 같은 경우 return시키는 조건문을 추가하였다.

![](https://velog.velcdn.com/images/reasonz/post/9442c540-5aa0-4556-80e7-ed1beae34a00/image.gif)

캔버스의 끝에 닿았을 때 공이 멈추는 것을 확인할 수 있다.

### 또 다른 방법으로 멈추기

requestAnimationFrame을 취소시키는 방법이다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

let xPos = 10;
let timerId;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 3;

  timerId = requestAnimationFrame(draw);
  console.log(timerId);

  if (xPos >= canvas.width - 10) {
    cancelAnimationFrame(timerId);
  }
}

draw();
```

먼저 timerId라는 변수를 하나 선언했다.
이후 timerId에 requestAnimationFrame(draw)를 담아서 출력해보면 1씩 증가하는 숫자값이 콘솔에 찍히는 것을 알 수 있는데 이것을 활용하여 애니메이션을 멈추는 방법이다.
앞서 사용했던 if문을 그대로 사용하고 그 안에서 `cancleAnimationFrame(timerId)`를 넣어주면 캔버스의 끝 지점에서 공이 멈추도록 할 수 있다.

### 외부에서 클릭등의 이벤트로 멈춘다고 하면 캔슬애니메이션을 사용하면 된다.

```javascript
canvas.addEventListener('click', () => {
  cancelAnimationFrame(timerId);
});
```

위와 같은 코드를 사용하면 클릭했을 때 애니메이션이 멈추는 것을 확인할 수 있다.

# setInterval

### clearInterval 사용하여 애니메이션 멈추기

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

let xPos = 10;
let timerId;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
  context.fill();
  xPos += 10;
}

timerId = setInterval(draw, 500);
canvas.addEventListener('click', () => {
  clearInterval(timerId);
});
```

requestAnimationFrame을 멈췄을 때와 동일하게 변수를 하나 선언해 주었다. `(timerId)`
선언한 변수에 setInerval을 담아준다.
특정 조건을 만족했을 때 clearInterval이 실행될 수 있도록 특정 조건을 추가해주었다. (위 코드에서는 캔버스 클릭 이벤트가 발생하면 clearInterval이 실행된다.)

![](https://velog.velcdn.com/images/reasonz/post/5ea9ed8e-567e-4cc8-a20f-bed228ea4e0c/image.gif)

캔버스를 클릭하면 움직임이 멈추는 것을 확인할 수 있다.

---

> 참고 자료

> [1분 코딩 - HTML5 Canvas 캔버스 라이브 강좌#2](https://www.youtube.com/watch?v=ovf8cbKtBH0&list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc&index=2&t=11s&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)
