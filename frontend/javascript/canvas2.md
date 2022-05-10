> [1분코딩님의 영상](https://youtu.be/JFQOgt5DMBY)을 보고 참고하여 정리하였다.

[이전](https://velog.io/@reasonz/2022.05.10-Canvas-API-%EA%B0%9C%EB%85%90-%EA%B8%B0%EB%B3%B8%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95)에 Canvas API에 대한 개념과 캔버스에 사각형을 그리는 등의 기본 사용 방법을 살펴보았다.
오늘도 이어서 canvas API 사용에 대해 살펴보고자 한다.

<br>

### 목차

1. 선 그리기
2. 원 그리기

---

<br>

## 선 그리기

좌측 상단 0, 0으로부터 시작해서 x좌표와 y좌표에 따라 선을 그릴 수 있다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.beginPath();
context.moveTo(0, 0); // x, y
context.lineTo(100, 0); // x, y
context.stroke();
```

`beginPath()`를 사용하여 선을 시작을 알려주는 것이 좋다.
`moveTo()`는 어느 위치에서 선을 그을지 위치를 정하는 것이다.
`lineTo()`는 선을 실제로 그리는 것이다. (실제 렌더링되어서 시각적으로 보여지진 않는다.)
`stroke()`를 사용하면 lineTo()로 그린 선이 나타난다.
`fill()`은 직선을 그렸을 경우엔 보여지지 않지만 선을 연결한 그림을 그렸을 때는 색상이 채워져 나타난다.
`closePath()`는 선 연결이 끝나면 닫아주는 것이다. (일러스트 레이터 프로그램의 패스 그릴때 마침표를 찍는 것과 같음)

![](https://velog.velcdn.com/images/reasonz/post/b7bd324c-55a5-4164-b38b-4a811c880f41/image.png)

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.beginPath();
context.moveTo(10, 200); // x, y
context.lineTo(200, 100); // x, y
context.stroke();
```

![](https://velog.velcdn.com/images/reasonz/post/915d79e4-12ba-4fcc-9069-67390bbed99a/image.png)

---

## 원 그리기

`arc()` 호를 그리는 메소드이다. 이것을 0부터 360도로 돌리면 원을 그릴 수 있다.
`arc(x, y, 반지름, 시작각도, 끝각도(radian), true 또는 false (반시계방향: true, 시계방향 : false(기본값))`

다른 도형을 칠할때와 마찬가지로 fill() 또는 stroke()를 사용하면 화면에 보여지도록 할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/2c730942-a4d8-4141-864a-08cff633910b/image.png)

```javascript
function toRadian(d) {
  // radian으로 변환하는 함수, 각도를 파라미터로 넣는다
  return (d * Math.PI) / 180;
}
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.arc(300, 200, 50, 0, toRadian(360), false); // x, y, 반지름, 시작 각도, 끝 각도(radian 값), true/false (반시계, 시계방향, 기본값은 false)
// 중심점을 기준으로. 캔버스 중앙에 그리려면 (캔버스 크기 / 2) 사이즈

context.fill();
```

<br>

호를 그리는 것이기 때문에 원을 그리려면 0도부터 360도 만큼 돌려야 하는데 arc 메소드는 인자로 끝 각도에 radian값을 필요로 하기 때문에 `toRadian()`이라는 함수를 만들어 주었다.

![](https://velog.velcdn.com/images/reasonz/post/019ccbc4-e4f8-496b-b42b-7994eae7a449/image.png)

<br>

```javascript
function toRadian(d) {
  // radian으로 변환하는 함수, 각도를 파라미터로 넣는다
  return (d * Math.PI) / 180;
}
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.arc(300, 200, 50, 0, toRadian(180), false); // x, y, 반지름, 시작 각도, 끝 각도(radian 값), true/false (반시계, 시계방향, 기본값은 false)
// 중심점을 기준으로. 캔버스 중앙에 그리려면 (캔버스 크기 / 2) 사이즈

context.stroke();
```

arc 메소드의 마지막 인자 값을 true(반시계)로 설정해 보았다.

![](https://velog.velcdn.com/images/reasonz/post/5d6eeb47-b972-4e0c-a65b-dea831f7752a/image.png)

<br>

```javascript
function toRadian(d) {
  // radian으로 변환하는 함수, 각도를 파라미터로 넣는다
  return (d * Math.PI) / 180;
}
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.arc(300, 200, 50, 0, toRadian(180), true); // x, y, 반지름, 시작 각도, 끝 각도(radian 값), true/false (반시계, 시계방향, 기본값은 false)
// 중심점을 기준으로. 캔버스 중앙에 그리려면 (캔버스 크기 / 2) 사이즈

context.stroke();
```

<br>

### 한붓 그리기(?) beginPath 유무에 따른 차이점

```javascript
function toRadian(d) {
  // radian으로 변환하는 함수, 각도를 파라미터로 넣는다
  return (d * Math.PI) / 180;
}
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.arc(300, 200, 50, 0, toRadian(180), true); // x, y, 반지름, 시작 각도, 끝 각도(radian 값), true/false (시계방향, 반시계방향)
// 중심점을 기준으로. 캔버스 중앙에 그리려면 (캔버스 크기 / 2) 사이즈
context.arc(500, 100, 20, 0, toRadian(180), true);

context.stroke();
```

두개의 호를 그리도록 코드를 작성하였다.

![](https://velog.velcdn.com/images/reasonz/post/5328877c-5262-4eb1-8f3e-0b2d09b62814/image.png)

결과물은 그리고자 했던 것과 달리 나타났다. `beginPath()`가 없기 때문에 처음 그린 호의 끝지점에서부터 연결되어 다음 호를 그려버린 것이다.

<br>

#### beginPath를 추가해보자.

```javascript
context.beginPath();
context.arc(300, 200, 50, 0, toRadian(180), true);
context.stroke();

context.beginPath();
context.arc(500, 100, 20, 0, toRadian(180), true);
context.stroke();
```

![](https://velog.velcdn.com/images/reasonz/post/b67a4b5e-f525-4245-8d0f-29cbb254f072/image.png)

beginPath()를 각각의 호를 그리기 전에 추가해 주었더니 원하던 결과물을 얻을 수 있었다. (때에 따라 1번 결과물도 유용하게 쓰일 것 같긴하다.)

<br>

### closePath()는 꼭 작성하지 않아도 괜찮지만, 작성했을 때 또 다른 결과물을 얻을 수 있었다.

```javascript
// context.beginPath(); 있어도 똑같은 결과물
context.arc(300, 200, 50, 0, toRadian(180), true);
context.stroke();
context.closePath();

context.arc(500, 100, 20, 0, toRadian(180), true);
context.stroke();
```

첫번째 호에만 `closePath()`를 사용해 패스를 닫아주기만 하고 다음 호를 그릴때는 `beginPath()`를 사용하지 않아보았다.

![](https://velog.velcdn.com/images/reasonz/post/7bad95bc-7bbb-4548-9254-b847b39c440c/image.png)

첫번째 호의 시작점과 끝점을 연결한 상태로 다음 호가 그려졌다.

<br>

### (응용) 얼굴 그려보기

정리 열심히 했으니 귀여운 얼굴 하나 그려보면서 복습겸 실습을 해보기로 했다.

```javascript
context.beginPath();
context.arc(300, 200, 100, 0, toRadian(360));
context.stroke();
context.closePath();

context.beginPath();
context.arc(250, 200, 10, 0, toRadian(360));
context.fill();

context.beginPath();
context.arc(350, 200, 10, 0, toRadian(360));
context.fill();

context.beginPath();
context.arc(300, 200, 20, 0, toRadian(180));
context.stroke();
context.closePath();

context.stroke();
```

마지막 stroke()는 입모양을 만들기 위해 일부러 beginPath()를 사용하지 않았다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/8ae9f3db-c9e9-4ba9-9d5e-b2b1af83f391/image.png)

호 그리는 방법으로 간단히 귀여운 얼굴을 그렸다! 😇

베지어 곡선도 그려보고 싶지만 아직은 내게 너무 멀고도 험한 길인 것 같아서ㅠㅠ
하나씩 차근차근 배워보려한다.

---

> 참고 자료

> [HTML5 Canvas 캔버스 라이브 강좌 #1](https://youtu.be/JFQOgt5DMBY)

> [MDN 캔버스를 이용한 도형 그리기](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
