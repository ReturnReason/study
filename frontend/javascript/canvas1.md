> [1분코딩님의 영상](https://www.youtube.com/watch?v=JFQOgt5DMBY&t=226s&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9)을 보고 참고하여 정리하였다.

<br>

### 목차

1. canvas API 개념
2. 브라우저에서 canvas 지원여부 확인
3. canvas 사이즈 설정하기 (&고해상도 처리 방법)
4. canvas 사용 방법

- 사각형 그리기 `fillRect()`
- 사각형 색상 넣기 `fillStyle`
- 사각형 그림 지우기 `clearRect()`
- 외곽선 사각형 그리기(테두리만 그리기) `strokeRect()`

<br>

# Canvas API

canvas를 사용하면 자바스크립트와 HTML을 사용하여 그래픽을 그릴 수 있다.
HTML에서 `<canvas>`태그를 사용하여 작성하고 자바스크립트로 엘리먼트 인터페이스를 그려서 조작할 수 있다.
기본적으로 Canvas API는 2D 그래픽을 그릴 때 사용한다. WebGL API를 사용하면 3D도 그릴 수 있다.

<br>

## canvas를 쓰는 이유?

비트맵 데이터의 픽셀 하나하나를 조작할 수 있고 그래픽 처리 성능이 상대적으로 좋은 편이다.

<br>

## SVG와 canvas 비교

canvas는 비트맵, SVG는 벡터 이미지이다.
어도비 일러스트레이터가 벡터 그래픽을 만드는 대표적인 프로그램인데 벡터는 연산으로 그림을 그리기 때문에 크기가 커져도 용량이 늘어나지 않는다.
canvas는 비트맵이기 때문에 픽셀 개수가 많아질 수록 용량이 커진다.

<br>

---

## 브라우저가 canvas를 지원하는지 확인해보기

### 1. [modernizr 라이브러리](https://modernizr.com/)를 사용하여 canvas 지원 여부 확인하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>캔버스 지원 여부 확인하기</title>
    <script src="./modernizr.js"></script>
  </head>
  <body>
    <canvas>이 브라우저는 캔버스를 지원하지 않아요!</canvas>
    <script>
           if (Modernizr.canvas) {
             console.log('Canvas를 지원하는 브라우저');
           }
      }
    </script>
  </body>
</html>
```

Modernizr 라이브러리를 사용해서 캔버스 지원 여부를 확인할 수 있다.

<br>

### 2. [canvas.getContext()](https://developer.mozilla.org/ko/docs/Web/API/HTMLCanvasElement/getContext) 를 사용하여 드로잉 컨텍스트 반환값 확인하기

```javascript
const canvas = document.querySelector('canvas');
if (canvas.getContext) {
  console.log('캔버스를 지원합니다.');
}
```

라이브러리를 사용하지 않더라도 해당 메소드를 사용해서 캔버스의 드로잉 컨텍스트 반환값을 확인하는 방법이 있다. 컨텍스트 식별자가 지원되지 않는 경우 null이 반환된다.

<br>

---

## 캔버스 사이즈 설정하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>캔버스 사이즈 설정</title>
    <style>
      #canvas {
        background: aliceblue;
      }
    </style>
  </head>
  <body>
    <h1>캔버스 사이즈 설정</h1>
    <p>width와 height로 설정할 수 있어요!</p>
    <canvas id="canvas" width="300" height="300"></canvas>
  </body>
</html>
```

![](https://velog.velcdn.com/images/reasonz/post/d53323e0-b3f0-49eb-8b16-3306871da584/image.png)

### canvas의 사이즈를 CSS에서 조절하는 것과 html속성 값을 주는 것은 의미가 다르다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>캔버스 사이즈 설정</title>
    <style>
      .canvas {
        background: slateblue;
      }
    </style>
  </head>
  <body>
    <h1>캔버스 사이즈 설정</h1>
    <p>width와 height로 설정할 수 있어요!</p>
    <canvas class="canvas" width="100" height="100"></canvas>
    <canvas class="canvas" width="500" height="500"></canvas>
  </body>
</html>
```

cavnas 태그 두개를 사용하고 하나의 canvas 속성의 width와 height는 100씩, 남은 하나의 canvas 태그 속성의 width와 height는 500을 설정했다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/a69584ac-8e4b-4629-9ef2-52429ef4f083/image.png)

이후 css에서 두 캔버스의 width와 height를 100px로 설정해보았다.

<br>

```css
.canvas {
  background: slateblue;
  width: 100px;
  height: 100px;
}
```

![](https://velog.velcdn.com/images/reasonz/post/b4a97232-64d6-4d4a-94d7-16b09d92cf62/image.png)

예상했던 것처럼 css에 설정한 canvas의 스타일인 가로, 세로 100px이 적용되었다.
두 캔버스가 가로 세로 크기가 동일해 보이지만, 사실은 같은 크기가 아니다. 이게 무슨 말인가(!)

```javascript
const canvas = document.querySelector('.canvas');
const canvas2 = document.querySelector('.canvas2');
const context = canvas.getContext('2d');
const context2 = canvas2.getContext('2d');

context.arc(100, 100, 50, 0, Math.PI * 2, false);
context2.arc(100, 100, 50, 0, Math.PI * 2, false);
context.fill();
context2.fill();
```

`.arc()`로 x100, y100, 반지름이 50인 원을 그렸다.

![](https://velog.velcdn.com/images/reasonz/post/0e0dc7f2-bcff-4b8b-9838-7c42b69fc864/image.png)

### 분명 같은 코드를 작성하였음에도 결과물은 두 캔버스가 다르게 나타났다.

캔버스의 전체 사이즈는 css로 줄여놓았기 때문에 캔버스의 크기는 동일하지만 실제 그려지는 캔버스의 사이즈는 좌표가 다르다는 것이다.

가로 300짜리 이미지를 만든다고 하면 최소 2배 사이즈로 만든 후 절반을 줄여서 표현하는 방법으로 위와 같은 방식(실제 사이즈는 더 큰데 css로 강제로 줄여놓는) 방법이 사용되기도 한다. 고해상도 이미지를 보여주기 위해 이러한 방법이 사용된다고 보면 된다.

일반적으로 캔버스는 풀 스크린으로 채워서 사용하는 경우가 많은데 이러한 경우에는 자바스크립트로 캔버스의 가로와 세로를 윈도우 사이즈 2배로 세팅하고 css에서는 100%사이즈 처럼 작성하여 사용한다고 한다.

크게 만들어서 작게 쓴다..!
대신 성능 문제에서 연산할 것이 더 많아지기 때문에 성능면에서는 더 떨어지는 문제가 생길 수 있기 때문에 용도에 따라 적절히 사용하는 것이 좋다.

---

<br>

## 캔버스 사용 방법

1. html `<canvas>` 엘리먼트를 작성한다.
2. 자바스크립트에서 `canvas` 엘리먼트를 가져온다.
3. 자바스크립트에서 getContext()메소드를 호출해서 `context` 객체를 가져온다.

<br>

캔버스는 기본적으로 색상을 갖고 있지 않기 때문에 css로 배경을 칠해 놓고 작업하는 것이 편하다.

```html
<body>
  <canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않아요.</canvas>

  <script>
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
  </script>
</body>
```

이렇게하면 기본 세팅은 완료된다.

context 객체를 콘솔에 찍어보면 CanvasRenderingContext2D라는 객체가 출력된다.

![](https://velog.velcdn.com/images/reasonz/post/1a6c3f78-ac47-40d7-8d25-6a1381a18be4/image.png)

이 객체에 포함된 것을 사용하여 캔버스에 그림을 그릴 수 있는 것이다.

<br>

### fillRect() : 사각형 그리기

```javascript
context.fillRect(0, 0, 100, 100); // x, y, width, height
```

브라우저의 x와 y는 좌측 최상단을 기준으로 (0, 0)으로 정의된다.

![](https://velog.velcdn.com/images/reasonz/post/04deb3d6-a2af-4dd7-945d-0b72d8eaf9d6/image.png)

앞서 작성한 `context.fillRect(0, 0, 100, 100);`를 렌더링해보면 위와 같은 검은 정사각형이 그려지는 것을 확인할 수 있다. 기본 색상이 검정이라 검은 사각형으로 그려졌다.

<br>

### fillStyle : 사각형에 색상 넣기

그리기 전에 색상을 넣어야 한다. fillRect 다음에 fillStyle을 넣으면 코드가 제대로 동작하지 않는다.

```javascript
context.fillStyle = 'blue'; // 유효한 색상 이름 또는 #색상코드 또는 rgba(red,green,blue,alpha)
context.fillRect(0, 0, 100, 100); // x, y, width, height
```

![](https://velog.velcdn.com/images/reasonz/post/c7e2bbe0-1f63-45b7-aca1-cc0025e85a8b/image.png)

<br>

### 사각형을 하나 더 그려보자

```javascript
context.fillRect(50, 50, 100, 100);

context.fillStyle = '#f99999';
context.fillRect(0, 0, 100, 100);
```

x 50, y 50위치에 사각형을 하나 더 그렸다.
분명 fillStyle로 색상을 지정했지만 검정색 정사각형이 그려진 것을 확인할 수 있었다.

![](https://velog.velcdn.com/images/reasonz/post/88eaba25-58b0-4239-8867-9dde36dd02cf/image.png)

캔버스는 그림을 그리는 개념으로 생각해야 한다.
fillStyle을 설정하기 전에는 검정색이 디폴트이다.
fillStyle은 붓에 물감을 찍었다고 생각하면 된다. 붓에 물감을 찍은 다음부터 그 물감 색상이 입혀지는 것이다.
즉, fillStyle로 색상을 지정한 다음부터 그 색상이 적용되기 때문에 검정색 정사각형이 그려진 것이다.

### clearRect() : 그린 사각형 지우기

```javascript
context.clearRect(80, 80, 50, 50); // x, y, width, height
```

`clearRect` 메소드의 파라미터로 지우고자 하는 위치의 x, y, 가로, 세로 사이즈를 적어주면 된다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/9a5a68ff-f248-4ea5-ba5d-f6ec4aef12ba/image.png)

clearRect() 사용으로 인해 80, 80 위치에 50\*50 크기의 정사각형이 지워진 것을 확인할 수 있다.

<br>

### strokeRect() : 선 그리기 (획 그리기)

fillRect는 채워진 사각형을 그리는 것이라면 strokeRect를 사용하면 테두리만 칠해진 사각형을 그릴 수 있다.

```javascript
context.strokeRect(200, 200, 100, 100); // x, y, width, height
```

![](https://velog.velcdn.com/images/reasonz/post/090694e9-7baf-486a-b6f0-076aa0147d45/image.png)

---

> 참고 자료

> [MDN canvas API](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)

> [1분코딩 - HTML5 Canvas 캔버스 라이브 강좌 #1](https://youtu.be/JFQOgt5DMBY)

> [HTML Canvas Graphics](https://www.w3schools.com/html/html5_canvas.asp)
