자바스크립트와 CSS를 사용해서 3D 카드 효과를 만들었다.
어제에 이어 오늘도 맛있는코딩님 영상을 보고 따라 만들어 보았다.
이것을 만드는데 필요한 함수와 사전 지식도 함께 간단히 메모했다.

## getBoundingClientRect()

마우스 좌표 값을 사용할 때 사용하는 함수
엘리먼트의 왼쪽 여백 x좌표, 위쪽 여백 y좌표, 엘리먼트의 가로와 세로 길이를 구할 수 있다.

## mousemove(e)

마우스 무브 함수를 사용하여 마우스 좌표를 실시간으로 적용시킨다.
현재 마우스의 좌표를 e.clientX, e.clientY로 확인할 수 있다. 카드 내부를 기준으로 left 값을 clientX - x값으로 구할 수 있고 top 값도 마찬가지로 clientY - y 값으로 구할 수 있게 된다.

그다음에 구해야 할 값은 centerX와 centerY값이다.
카드 중심을 기준으로 마우스가 얼마만큼 떨어졌냐에 따라 카드에 기울기를 주어야 하기 때문에 필요하다.
centerX = left - (width/2)
centerY = top - (height/2)

## rotate3d 인자 구하기

중심을 기준으로 한 centerX와 centerY 값을 구했으므로 기울여주면 되는데 기울일 때 사용할 수 있는 속성은 CSS의 transfrom : rotate3d를 이용하면 된다.

![](https://velog.velcdn.com/images/reasonz/post/932ba286-bd6c-4a43-adff-89df704c38a3/image.gif)

완성하면 위와 같이 카드 안에서 마우스 위치에 따라 포토카드에 그림자, 카드 기울기, 빛반사 등의 효과가 추가된다.

```javascript
const frame = document.getElementById('frame');
const card = document.getElementById('card');
const light = document.getElementById('light');

let { x, y, width, height } = frame.getBoundingClientRect();

function mouseMove(e) {
  const left = e.clientX - x;
  const top = e.clientY - y;
  const centerX = left - width / 2;
  const centerY = top - height / 2;
  const d = Math.sqrt(centerX ** 2 + centerY ** 2);

  card.style.boxShadow = `
    ${-centerX / 10}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.1)
  `;

  card.style.transform = `
    rotate3d(
      ${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg
    )
  `;

  light.style.backgroundImage = `
    radial-gradient(
      circle at ${left}px ${top}px, #00000010, #ffffff00, #ffffff50
    )
  `;
}

frame.addEventListener('mouseenter', () => {
  frame.addEventListener('mousemove', mouseMove);
});

frame.addEventListener('mouseleave', () => {
  frame.removeEventListener('mousemove', mouseMove);
  card.style.boxShadow = '';
  card.style.transform = '';
  light.style.backgroundImage = '';
});

window.addEventListener('resize', () => {
  rect = frame.getBoundingClientRect();
  x = rect.x;
  y = rect.y;
});
```

이번 영상을 따라 만들면서 디스트럭처링 실전으로(?) 사용하는 거랑 자바스크립트에서 css 스타일 추가 및 제거,
특히 이벤트리스너를 중첩해서 사용하는 부분과 이벤트 리스너 moseMove라는 함수를 따로 만들어서 호출하는 부분이 공부가 많이 됐다.

기본적인 수학 지식이 풍부하면 확실히 자바스크립트를 더 자유자재로 가지고 놀 수 있는 것 같다.

![](https://velog.velcdn.com/images/reasonz/post/18ffc398-795c-47fe-b406-e645640c2726/image.gif)

---

> 참고 자료

> [자바스크립트로 8분만에 마우스 따라 움직이는 3D 카드 마스터하기](https://youtu.be/qbbMFxyetCI)

> [아이유 셀러브리티 고화질 배경이미지](https://m.blog.naver.com/smotherguy/222224487978)

> [아이유 골든디스크 블루밍 이미지](https://twitter.com/naeun_516/status/1347872182064402436?lang=fi)
