## 캔버스에서 이미지 사용하는 방법

<br>

자바스크립트에서 이미지 객체를 만든 후, 캔버스에서 불러오면 된다.

<br>

```javascript
const imgElem = document.createElement('img'); // 방법1
const imgElem2 = new Image(); // 방법2
```

두 가지 방법 중 1개를 사용하면 메모리 상에 이미지 객체가 만들어진다.

<br>

```javascript
imgElem2.src = '이미지 경로';
```

이제 HTML에서 img 요소를 작성하는 것처럼 자바스크립트에서 src를 넣어서 이미지의 경로를 작성해주면 된다.
여기서 알아야 할 점은 이미지는 외부 데이터이기 때문에 로딩될 시간이 필요하다. 캔버스에 그리려면 이 데이터가 다 있어야 하기 때문에 이미지가 로드되는 것을 기다렸다가 끝나면 가져와야 한다.

<br>

```javascript
imgElem2.addEventListener('load', () => {
  ctx.drawImage(imgElem2, -100, -100); // 그릴 이미지 엘리먼트, x, y, width ,height
});
```

<br>

이미지가 다 로드되는 것을 기다리려면 앞서 만든 이미지 객체에 이벤트리스너를 `load`로 달아주면 된다.
이후 실행될 작업을 작성하면 되는데 이미지를 그려줘야 하기 때문에 `drawImage()`를 사용하면 된다.
`drawImage(이미지 객체, x, y, width, height)`
위 코드에서는 가로와 세로 파라미터는 생략하여 작성했다.

![](https://velog.velcdn.com/images/reasonz/post/e608a669-21b4-4c61-9051-cef3daf54d1d/image.png)

이렇게하면 캔버스 안에 이미지가 생성이 되는 것을 확인할 수 있다.

<br>

### MDN 문서에 적힌 drawImage 문법은 다음과 같다.

```javascript
drawImage(image, dx, dy);
drawImage(image, dx, dy, dWidth, dHeight);
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

<br>

### 가로와 세로 사이즈를 넣어서 이미지를 캔버스에 그려보자.

```javascript
imgElem2.addEventListener('load', () => {
  ctx.drawImage(imgElem2, -100, -100);
  ctx.drawImage(imgElem2, 0, 0, 100, 120);
});
```

<br>

처음에 그린 이미지는 가로/세로의 값을 넣지 않았고 두번째로 그리는 이미지는 가로와 세로 사이즈를 지정하여 그리도록 했다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/77cd9183-322c-4c8d-a83b-9807c9fbf6c5/image.png)

<br>

설정한 값대로 100\*120 사이즈로 이미지가 그려졌다.
MDN 문서에 있는 3번째 문법 예제도 사용해보자.
`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)` 여기에 적힌 s는 소스를 의미한다.
(sx, sy)

이미지의 특정 부분만 크롭해서 가져올 수 있는 문법이다.
앞에 4개가 소스 이미지, 뒤에 4개가 캔버스 상에서 그릴 이미지를 의미한다.

<br>

```javascript
ctx.drawImage(imgElem2, 350, 300, 400, 400, 0, 0, 400, 500);
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/dbf36385-f379-42df-aa2e-690be5f66576/image.png)

<br>

넣는 인자의 개수에 따라 기능이 바뀐다.

이미지의 크기를 조정할 때 이미지의 width, height 자체를 넣을 수도 있지만 변환을 통해서도 이미지의 크기를 변화시킬 수 있다.

<br>

---

> 참고 자료

> [1분코딩 - HTML5 Canvas 캔버스 라이브 강좌 #2](https://www.youtube.com/watch?v=ovf8cbKtBH0&list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc&index=2&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)

> [MDN CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
