# 바닐라 자바스크립트로 슬라이드 만들기

그동안 공부한 내용을 바탕으로 직접 이미지 슬라이드를 만들어보기로 했다.

다음/이전 버튼을 누르면 이미지가 슬라이드되는 방식이다.

<br>

```html
<div class="slide-container">
  <h2 class="slide-title">이달의 소녀 전희진</h2>
  <ul class="slide">
    <li>
      <img src="./img0.png" alt="" />
    </li>
    <li>
      <img src="./img1.png" alt="" />
    </li>
    <li>
      <img src="./img2.png" alt="" />
    </li>
  </ul>
  <div class="btn-container">
    <button class="prev-btn btn">prev</button>
    <button class="next-btn btn">next</button>
  </div>
</div>
```

먼저 html 구조는 이렇게 짰다.
전체 슬라이드를 감싸서 `overflow : hidden`을 입힐 slide-container와
`flexbox`를 사용해서 가로로 나열시킬 `ul`, 각 이미지가 담길 `li`로 구성했다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/b084dcc5-ba9d-4eb7-ae10-18cd3b9f3f05/image.gif)

```css
.slide-container {
  width: 800px;
  /* overflow: hidden; */
  margin: 0 auto;
}

.slide-title {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
}
.slide {
  display: flex;
}

.slide li img {
  border-radius: 10px;
  width: 800px;
}
```

<br>

slide-container에 overflow hidden 속성을 넣으면 가로로 길어진 스크롤바를 없앨 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/69fa3318-af9f-4404-b177-744e401137c3/image.png)

이제 `transform: translateX` 속성을 사용해서 이미지 한장의 가로 사이즈 만큼 이동시키게 만들면 된다.

먼저, 하나만 만들어서 제대로 작동하는지 확인해 보기로 했다.

<br>

```javascript
const nextBtn = document.querySelector('.next-btn');
const slide = document.querySelector('.slide');

// 다음 버튼 클릭
nextBtn.addEventListener('click', next);
function next(event) {
  console.log(event.target);
  slide.style.transform = 'translateX(-800px)';
}
```

<br>

자바스크립트로 다음 버튼을 클릭 했을 때 이미지 가로 사이즈가 800px이므로 -800px 만큼 이동시켜서 다음 이미지가 보일 수 있도록 작성해보았다.

![](https://velog.velcdn.com/images/reasonz/post/a8a67f62-f66b-4cb9-ae29-328e721599e3/image.gif)

제대로 동작하는 것을 확인했다. 이제 나머지 코드도 작성해 볼 것이다.

```javascript
const nextBtn = document.querySelector('.next-btn');
const slide = document.querySelector('.slide');
const slideLength = document.querySelectorAll('.slide li').length;
let currentSlide = 1;
const IMAGE_WIDTH = 800;

// 다음 버튼 클릭
nextBtn.addEventListener('click', next);
function next() {
  console.log(currentSlide);
  if (currentSlide >= slideLength) {
    currentSlide = 0;
  }
  slide.style.transform = `translateX(-${IMAGE_WIDTH * currentSlide}px)`;
  currentSlide++;
}

<br>


```

현재 이미지의 위치를 `currentSlide` 라는 변수를 선언하여 저장하고 다음 버튼을 누를 때마다 1씩 증가시키도록 했다.
또, 이미지 슬라이드의 길이(이미지 장수)보다 커지면 안되므로 슬라이드에 포함된 이미지의 개수만큼만 작동할 수 있도록 currentSlide가 이미지 슬라이드 길이보다 커지면 0으로 만들도록 했다.

![](https://velog.velcdn.com/images/reasonz/post/b899f3b1-3ef7-4d30-b61e-43471f8dd417/image.gif)

이렇게 작성하면 첫번째 이미지부터 마지막 이미지 -> 마지막이미지 -> 첫번째 이미지 순서로 보여주도록 동작하게 된다.

<br>

```css
.slide {
  display: flex;
  transition: all 1s;
}
```

![](https://velog.velcdn.com/images/reasonz/post/6bee25e5-03ff-41fc-9d6a-7b9e3af34946/image.gif)

`transition`까지 넣어주면 흔히 볼 수 있는 슬라이드가 완성된다.

이전 버튼도 구현해 보았다.

<br>

```javascript
// 다음 버튼 클릭
nextBtn.addEventListener('click', next);
function next() {
  console.log(currentSlide);

  if (currentSlide >= slideLength) {
    currentSlide = 0;
  }
  slide.style.transform = `translateX(-${IMAGE_WIDTH * currentSlide}px)`;
  currentSlide++;
}

// 이전 버튼 클릭
prevBtn.addEventListener('click', prev);
function prev() {
  if (currentSlide === 1) {
    currentSlide = slideLength;
  } else {
    currentSlide--;
  }
  slide.style.transform = `translateX(-${IMAGE_WIDTH * (currentSlide - 1)}px)`;
}
```

![](https://velog.velcdn.com/images/reasonz/post/e909e873-d813-4ca7-b26b-de7e59cce808/image.gif)

이전 버튼은 현재 슬라이드가 `가장 첫번째 이미지인 경우`
마지막 이미지로 이동해야 하기 때문에 슬라이드의 길이를 넣어주었다.

가장 첫번째 이미지가 아닌 경우, 예를 들면 2번 이미지 일때는 1번 이미지로 이동해야하고 3번일 때는 2번 … 이라는 규칙을 찾아 현재 슬라이드 번호를 -1만큼 감소 시키도록 하였다.

`translateX(-${IMAGE_WIDTH * (currentSlide - 1)}px` 부분은 현재 이미지의 가로 사이즈가 800이고, 현재 위치가 1번이고 마지막 슬라이드의 번호가 3번이라고 가정했을 때

이전 버튼을 눌러서 1번 이미지에서 3번 이미지를 보여주기 위해서는 -(800\*2)px 만큼 이미지가 이동해야 한다.

이때 현재 1번 이미지가 보여지는 경우, 슬라이드의 길이를 넣어주도록 했기 때문에 currentSlide의 값은 3이된다.

즉,`-(800 * (3 - 1))px` 이 되어 첫번째 이미지로부터 -1600px 만큼 이동하여 마지막 이미지가 보여진다.
그 외의 경우 이전 버튼을 눌렀을 때 currentSlide의 값을 -1씩 차감하여 이미지를 이동시키도록 했다.

> 배운 지식들 활용해서 만들어봤는데 다음 버튼 만드는 건 쉬웠는데 이전 버튼은 조금 생각하는 시간이 필요했다.
> 제대로 동작하긴 하는데 이렇게 만드는게 가장 최적의(?)적합한 방법인지는 잘 모르겠다. ㅎㅎ..ㅎ

이미지 출처 : 구글링 (이달의소녀 희진)
