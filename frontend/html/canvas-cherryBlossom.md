> 맛있는 코딩님의 영상을 보고 따라 만들어봤다. (라고 하지만 사실 그냥 코드 보고 따라치기만 한듯 ㅠㅠ)
> canvas 사용은 처음해봤는데 생각이상으로 복잡하고 어려웠다.
> canvas를 잘 사용하면 인터렉티브한 웹 사이트나 다양한 웹 게임도 개발할 수 있을 것 같아서 canvas 강의도 종종 찾아서 공부해봐야겠다.

<br>

# canvas 입문기

맛있는 코딩님 영상에서는 진한 회색 배경이었지만
벚꽃 배경이나 밝은 배경을 넣으면 더 생생한 느낌이 들 것 같아서 적용해봤다!
올해는 벚꽃 보러갈 사람이 없었기 때문에 더욱 더 나를 위한(?) 코드가 아니었나 생각한다.
맛있는 코딩님께서도 영상 초반에 본인처럼 벚꽃놀이에 갈 이성이 없는 사람은 홈페이지에서 벚꽃놀이를 하자고ㅠㅠ...ㅠㅠㅠㅠ
덕분에 잘 했습니당..............ㅎㅎㅎㅎ
<br>

![](https://velog.velcdn.com/images/reasonz/post/4b4ee47e-3adf-4716-9e76-513bc6935888/image.gif)

![](https://velog.velcdn.com/images/reasonz/post/6ef8ed57-1364-46e5-8e0d-d76c3fa16186/image.gif)

벚꽃 사진을 공유해주신 분이 워낙 잘 찍으신 것도 있지만,
맛있는 코딩님 영상보고 따라친 벚꽃 흩날리는 코드와 함께 적용하니 더 생동감이 느껴졌다.

```javascript
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // 캔버스 가로, 세로를 전체 화면으로 지정
const ctx = canvas.getContext('2d'); // 아무것도 없는 도화지 캔버스에 그리기 도구 사용을 위해 불러옴

const TOTAL = 150;
const petalArray = [];

const petalImg = new Image();
petalImg.src = './petal.png';
petalImg.onload = () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal());
  }
  console.log(petalArray);
  render();
};

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 0, 0 부터 캔버스 가로 세로 길이를 지우기
  window.requestAnimationFrame(render); // 재귀함수를 통해 반복실행(브라우저마다 차이있지만 평균 초당 60)
  petalArray.forEach((petal) => {
    petal.animate();
  });
}

window.addEventListener('resize', () => {
  // 윈도우 사이즈가 바뀔때마다 적용
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 벚꽃잎 클래스

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.w = 30 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 45;
    this.xSpeed = 2 + Math.random();
    this.ySpped = 1 + Math.random();
    this.flip = Math.random();
    this.flipSpeed = Math.random() * 0.03;
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -petalImg.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.xSpeed = 2 + Math.random();
      this.ySpped = 1 + Math.random();
      this.flip = Math.random();
    }

    ctx.globalAlpha = this.opacity;
    ctx.drawImage(petalImg, this.x, this.y, this.w * (0.66 + Math.abs(Math.cos(this.flip) / 3)), this.h * (0.8 + Math.abs(Math.sin(this.flip) / 2)));
  }

  animate() {
    this.x += this.xSpeed;
    this.y += this.ySpped;
    this.draw();
    this.flip += this.flipSpeed;
  }
}
```

캔버스 완전 신세계,, 그냥 이런게 있구나 정도만 알고 있었는데 직접 사용해보니 공부해보고 싶어졌다.
공부하고 싶은게 참 많아서 고민이다. 내가 여러명이면 좋겠다.ㅋㅋㅋ

<br>

---

> 참고 자료

> [맛있는코딩 자바스크립트 Canvas로 벚꽃 애니메이션 만들기 튜토리얼](https://www.youtube.com/watch?v=uEX93cIL8Go&ab_channel=%EB%A7%9B%EC%9E%88%EB%8A%94%EC%BD%94%EB%94%A9yummycoding)

> [벚꽃 배경 이미지](https://www.be-place.com/30/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=723236&t=board&category=V6241z7yk6)
