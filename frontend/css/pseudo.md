# pseudo-class & pseudo-element

CSS를 사용하다보면 심심치 않게 가상 요소 선택자나 가상 클래스 선택자를 사용하는 상황이 생기곤 한다.
가상 요소 선택자와 가상 클래스 선택자는 어떤 종류가 있으며 어떤 차이점이 있을까 ?

## 1. 가상 클래스 선택자 (pseudo-class)

먼저, 가상 클래스 선택자(pseudo-class)는 HTML 문서에 작성된 요소에 가상의 클래스를 만들어 부착할 수 있다.
가상 클래스 선택자의 종류는 다음과 같다.

<br>

| index |  가상클래스   |                                                                           내용                                                                            |
| :---: | :-----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   1   |    :active    |                       `<a>`,`<button>`과 함께 사용하는 경우가 많다. <br> 사용자가 활성화한 요소를 나타낸다. (마우스로 요소 클릭 시)                       |
|   2   |  :only-child  |                                     형제가 없는 요소를 선택할 때 사용된다. <br>`:first-child:last-child` 와 동일하다.                                     |
|   3   |    :hover     |               마우스 커서가 올라가 있을 때(마우스 오버)선택된다.<br> :link, :visited, :active를 함께 쓴다면 css작성시 순서에 주의해야 한다.               |
|   4   | :only-of-type |                                                         같은 유형의 요소 형제가 없을 때 적용된다.                                                         |
|   5   |   :checked    |                                          요소를 선택했거나 <br>radio, checkbox의 옵션에 체크한 경우 활성화된다.                                           |
|   6   |   :invalid    |                                                   input이나 form 태그 등의 유효성을 검사할 때 사용된다.                                                   |
|   7   | :out-of-range |                                           input박스에 설정한 max값을 초과하는 등 한계치를 벗어났을 때 사용된다.                                           |
|   8   | :nth-child()  |            형제의 순서에 따라 요소를 선택한다. <br> ()안에는 인덱스(1이상)외에도 odd(홀수), even(짝수)번째, An+B 등의 함수식도 적용할 수 있다.            |
|   9   |     focus     | input 태그 등의 입력칸이 포커스되었을 때 사용된다. <br> 포커스 받은 요소만 해당되므로 자식이 포커스를 받았을 때 사용하려면 :focus-within을 사용하면 된다. |
|  10   |     :link     |    href 속성을 가진 태그 중, 아직 방문하지 않은 요소에 사용하면 된다. <br> :visited, :hover, :active와 함께 사용한다면 css 작성 순서에 주의해야 한다.     |
|  11   |   :visited    |                    사용자가 방문한 적있는 링크에 해당된다. <br> :link, :hover, :active와 함께 사용한다면 css 작성 순서에 주의해야한다.                    |

<br>

### LVHA 순서

가상 클래스를 사용하여 링크 속성이 있는 요소에 css를 적용하고 싶을 때 순서를 지켜야 한다.
`:link ▶ :visited ▶ :hover ▶ :active`
순서이다. 이 순서가 어긋나면 css가 제대로 동작하지 않을 수 있으니 꼭 순서를 지켜서 작성하도록 하자.

### 자주 사용되는 가상 클래스 선택자 사용해보기

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="abERXep" data-user="RETURNREASON" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/RETURNREASON/pen/abERXep">
  가상 클래스 선택자</a> by YOU (<a href="https://codepen.io/RETURNREASON">@RETURNREASON</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 2. 가상 요소 선택자 (pseudo-element)

| index |    가상요소    | 내용                                                                                                                                          |
| :---: | :------------: | :-------------------------------------------------------------------------------------------------------------------------------------------- |
|   1   |    ::after     | ::after가 선택된 요소의 맨 마지막 자식으로 요소를 하나 생성한다.                                                                              |
|   2   |    ::before    | ::before가 선택된 요소의 맨 첫번째 자식으로 요소를 하나 생성한다.                                                                             |
|   3   | ::first-letter | 선택한 요소의 첫 번째 글자에 스타일이 적용된다.                                                                                               |
|   4   |  ::first-line  | 선택한 요소의 첫 번째 줄애 스타일이 적용된다.                                                                                                 |
|   5   |  ::selection   | 선택한 요소의 하이라이트 스타일을 적용한다.<br> color, background, text-decoration과 그 관련 속성, text-shadow와 같은 특정 속성에만 적용된다. |

[더 많은 가상 요소 선택자 확인하기](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements)

<br>

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="PoEygBb" data-user="RETURNREASON" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/RETURNREASON/pen/PoEygBb">
  가상 요소 선택자</a> by YOU (<a href="https://codepen.io/RETURNREASON">@RETURNREASON</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

가상 요소 선택자 중에 가장 흔히 사용되는 `::after`를 사용하여 박스를 디자인해보았다.

<br>

### 그렇다면, 가상 클래스 선택자와 가상 요소 선택자의 차이는 무엇일까?

1. 가상 클래스는 특정 상태일 때 스타일을 적용하는 것이고 가상 요소 선택자는 특정 상태가 아니더라도 스타일을 적용할 수 있다.

2. 가상 클래스는 기존에 존재하는 요소를 선택하는 것이고 가상 요소는 기존에 존재하지 않는 가상의 요소를 만들어 선택하는 것이다.

3. 가상 클래스는 콜론을 1개 붙인 `:hover`와 같은 형태로, 가상 요소는 콜론을 2개 붙인 `::first-letter`로 작성한다. 하지만, 과거 W3C 명세에서는 구별을 두지 않았다는 이유로 대부분의 브라우저가 콜론의 개수와 관계없이 모두 지원한다고 한다.

<br>

---

> 참고 자료

> [MDN 의사 클래스](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes)

> [MDN 의사 요소](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements)
