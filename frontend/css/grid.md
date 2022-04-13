# Grid 레이아웃

레이아웃을 만들 때 사용하는 속성으로 가로 행과 세로 열의 기준으로 요소를 정렬할 수 있다.
겹치는 레이아웃을 만들 수도 있고 `display : flex`보다 세부적인 레이아웃이 가능하다.
그렇다고 `display : flex`보다 낫다는 의미가 아니므로 두가지 모두 적절히 때에 따라 사용하는 것이 좋다.

구글링만으로는 이해가 되지 않는 부분이 있어 그리드 레이아웃에 대해 직접 실습하면서 익히기로 했다.

---

```html
<div class="grid-container">
  <div class="grid-item">1번</div>
  <div class="grid-item">2번</div>
  <div class="grid-item">3번</div>
  <div class="grid-item">4번</div>
  <div class="grid-item">5번</div>
</div>
```

먼저, `html`에 그리드를 적용할 컨테이너(부모 박스)를 만들어 주고, 그 안에 자식 박스를 원하는 만큼 생성해주었다.
<br>

![](https://velog.velcdn.com/images/reasonz/post/666d3afd-c175-4839-993e-3adb0cb6e192/image.png)

```css
/* Grid layout */
.grid-container {
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px;
}
```

grid 외의 적용한 다른 스타일들은 생략하였다.
컨테이너 박스에 `display : grid;` 속성을 넣어주고 `grid-template-rows`에 몇 개의 행을 만들 건지 명시해주고, `grid-template-columns`에 몇 개의 열을 만들 건지 적어주면 된다.

1. 컨테이너 박스에 `display : grid;` 속성을 주면 그리드 레이아웃을 만들 수 있다.
2. `grid-template-rows: 100px 100px 100px;`의 의미는 3개의 행을 만들 것이고 각각 아이템은 100px(행의 크기) 만큼의 사이즈를 가지겠다는 의미이다.
3. `grid-template-columns: 100px 100px;`도 마찬가지로 2개의 열을 만들고 내부 아이템의 사이즈는 100px(열의 크기)로 만들겠다는 뜻이다.
   즉, 각 아이템의 행 사이즈 100px의 행 3개, 열 사이즈 100px의 열 2개를 만드는 레이아웃이 된다.

단위를 적는 부분은 여러 가지 단위(px 외에도 fr, auto 등)를 사용할 수 있으며 다른 단위와 섞어서 사용도 가능하다. `fr`은 숫자의 비율만큼 크기가 적용된다. 예를 들면, `grid-template-rows: 1fr 1fr 1fr;`의 의미는 아이템 크기를 1:1:1 비율로 가지겠다는 뜻이 된다.
다른 단위와 여러가지 혼용해서 사용할 수 있으므로 참고해두면 더 다양한 레이아웃을 만들 수 있다.
<br>

![](https://velog.velcdn.com/images/reasonz/post/b0a133c3-a393-4495-a6e3-2180a3c6087a/image.png) ![](https://velog.velcdn.com/images/reasonz/post/80d2af97-d119-444a-b503-84bc51e05d42/image.png)

<br>

앞서 작성한 코드에서 3열 2행으로 만들어서 배치된 모습이다.
구글 크롬 개발자 도구로 확인해보면 다음과 같다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/fe2d562b-000d-432f-927c-da13b1f55dde/image.png)

![](https://velog.velcdn.com/images/reasonz/post/ebbbb385-ffb1-4e02-a8c9-1864ab664f27/image.png)

<br>

grid-template-row/columns에 적은 사이즈는 content 영역뿐만 아니라,

margin, padding을 포함한 사이즈인 것도 확인할 수 있었다.

컨텐츠 영역 70px + 패딩 20px + 마진 10px = 100px

<br>

![](https://velog.velcdn.com/images/reasonz/post/a94e921f-a402-460a-95cd-95c05c6b96ad/image.png)

<br>

아직 `grid-template-row/columns`에 적은 수치가 어떻게 적용되는지 잘 이해가 되지 않아서 rows의 값과 columns의 값 하나씩을 바꿔보았다.
`rows 첫번째 값 50px`로 인해 첫 번째 행의 높이가 50px로 변경되었고,
`columns 첫번째 값 200px`로 인해 첫번째 열의 길이가 200px가 되었다.
즉, rows에 적은 값은 각 행의 높이를, columns에 적은 값은 각 열의 길이를 조절한다고 보면 될 것 같다.

<br>

### repeat 함수

`grid-template-rows: 100px 100px 100px;`와 같이 여러번 작성하지 않아도 되는 함수도 존재한다.
repeat을 사용하면 더 짧고 간결하게 작성할 수 있다.
반복하고 싶은 횟수와 그 값을 입력해주면 된다.

```css
.grid-container {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(2, 100px);
}
```

각각 다른 단위를 사용하고 싶을 수도 있기 때문에 `3, 100px 1fr`과 같은 형태로도 사용할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/1817fb30-41d8-46a2-9f54-4920fc4b1dd8/image.png)
크롬 개발자 도구에서 부모 박스의 grid를 확인해보면 위와 같이 번호가 표시되는 것을 확인할 수 있다.
이 번호를 통해 각 아이템의 크기를 지정하여 레이아웃을 만들 수 있다.

```css
.grid-item:first-child {
  grid-row: 1/3;
  grid-column: 1/3;
  /* 시작 ~ 끝 번호 */
}
```

그리드 아이템 1번에 얼마 만큼 영역을 차지할지 `grid-row`, `grid-column` 속성을 사용해 적용할 수 있다.
의미는 1부터 3만큼 차지해달라는 뜻이다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/db2eb12d-f568-4fdc-b897-3e656d60812d/image.png)

<br>

1번 아이템 박스의 크기를 가로는 부모 박스의 1~3까지, 세로도 1~3까지 차지해달라고 했기 때문에 위와 같은 결과물이 나타난다.
밑에 `4번`과 `5번`이 찌그러진(?) 이유는 부모 박스는 가로로 3까지 세로는 4까지 밖에 없는데 1번 박스 혼자 가로, 세로를 3씩 차지하면서 남은 2번, 3번 박스가 밀려났기 때문에 부모 박스의 범위를 초과하여 4번, 5번이 가질 수 있는 자리를 뺏겼기 때문이다. (부모 박스 크기를 늘리던가 1번을 조정하면 해결된다.)

### grid-gap

행과 열 사이의 간격을 지정할 수 있다.
`row-gap`, `column-gap`을 사용하면 행/열 사이의 간격만 따로 줄 수도 있다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/11f2c47b-cc3d-491b-8246-1ec7c2d28eb5/image.png)

<br>

```css
.grid-container {
  display: grid;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(2, 100px);
  grid-gap: 10px;
}
```

### grid-template-areas

부모가 자식의 레이아웃을 정할 수 있는 속성이다.
자식 아이템에 이름을 정의하여 사용할 수 있다.

```html
<div class="grid-container">
  <div class="grid-header">헤더</div>
  <div class="grid-nav">네비게이션</div>
  <div class="grid-section">섹션</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(2, 100px);

  grid-template-areas:
    'header header'
    'nav nav'
    'section section'
    'section section';
}

/*이름 작명*/
.grid-header {
  grid-area: header;
}
.grid-nav {
  grid-area: nav;
}
.grid-section {
  grid-area: section;
}
```

![](https://velog.velcdn.com/images/reasonz/post/61b51350-ce2a-4e65-9a8c-1335115da4bd/image.png)
각 아이템(자식 박스)에 `grid-area` 속성으로 작명을 하고 컨테이너(부모 박스)에서 `grid-template-areas`에 작명한 이름을 넣어 배치하면 된다.

```css
grid-template-areas:
  'header header'
  'nav nav'
  'section section'
  'section section';
```

이 코드를 보면 첫번째 줄은 헤더가 2칸, 2번째 줄은 네브가 2칸, 3번째와 4번째줄 2칸씩은 섹션이 차지해달라고 했기 때문에 위와 같은 결과가 나타난 것이다.
빈 칸을 사용하고 싶다면 자식 박스에 작명한 이름 대신 `.` 을 사용하면 된다.

```css
grid-template-areas:
  'header header'
  'nav nav'
  ' . . '
  'section section';
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/41a6d760-775f-4117-8f8d-5f381e484cdd/image.png)

<br>

### grid-row, grid-column

`grid-template-areas`는 부모가 레이아웃을 정했다면 `grid-row`, `grid-column`은 자식이 레이아웃을 정할 수 있는 속성이다.

```css
.grid-header {
  grid-column: 1/3;
}
.grid-nav {
  grid-column: 1/3;
}
.grid-section {
  grid-column: 1/3;
  grid-row: 3/5;
}
```

얼마만큼 차지할지 `grid-row`, `grid-column`에 적어주면 된다.
위 코드는 grid-column의 1부터 3까지 차지하겠다는 뜻이다. 앞서 repeat함수를 사용할 때 잠깐 등장했던 번호가 달린 줄의 범위만큼 차지한다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/9da5347c-9dda-4053-acd2-1a930ad891e8/image.png)

<br>

`grid-template-areas`로 만들었던 코드와 동일한 결과물을 만들었다.

grid에 사용할 수 있는 속성이 많기 때문에 자주 사용하는 것들만 먼저 기억해 놓고 세부적인 디테일을 위한 정렬과 같은 것들은 필요할 때 문서를 보면서 적용해봐야겠다.

---

> 참고 자료

> [MDN CSS 그리드 레이아웃](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)

> [HEROPY CSS Grid 완벽 가이드](https://heropy.blog/2019/08/17/css-grid/)
