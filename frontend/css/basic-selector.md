# 선택자 (Selector)👈

1. 전체 선택자 (Universal Selector)
2. 태그 선택자 (Type Selector)
3. 클래스 선택자 (Class Selector)
4. ID 선택자 (ID Selector)
5. 속성 선택자 (Attribute Selector)

<br>

## 1. 전체 선택자

전체선택자는 `*` 기호를 사용하면 된다.
`*` 뒤에 다른 선택자를 사용하지 않는다면 모든 HTML 요소를 선택한다.
보통 css reset 용도로 사용한다.
전체 선택자는 성능을 생각하면 많이 사용하지 않는게 좋다고 한다.

```css
* {
  color: skyblue;
}
```

<br>

## 2. 태그 선택자

html `태그 이름`을 기준으로 선택한다.

```css
div {
  margin: 10px;
}

p {
  color: skyblue;
}
```

<br>

## 3. 클래스 선택자

가장 흔하게 사용되는 선택자이다.`.`을 붙여 사용한다. 여러 요소에 지정하여 사용한다.
그룹으로 묶어서 한 번에 같은 스타일을 적용하고 싶을 때나,
다른 선택자만 단독으로 사용하기 애매할 때 사용하면 된다.

```css
.btn {
  border: none;
  border-radius: 5px;
}
```

<br>

## 4. ID 선택자

`#`를 붙여 사용한다. 자바스크립트로 조작할 것이 아니라면 스타일을 위한 용도로는 가급적 사용하지 않는 편이 좋다. (class 선택자를 이용하자!)
굳이 써야한다면 ID 선택자를 꼭 써야하는 곳에만 사용하도록 하자.
이전에 작성했던 [CSS 우선순위](https://velog.io/@reasonz/2022.04.01-%EC%98%A4%EB%8A%98%EC%9D%98-%EA%B3%B5%EB%B6%80-CSS-%EB%8D%AE%EC%96%B4%EC%93%B0%EB%8A%94-%EB%B0%A9%EB%B2%95) 를 생각해서라도 ID 선택자 사용은 신중한 편이 좋다.

```css
#item {
  padding: 10px;
}
```

<br>

## 5. 속성 선택자

html 요소에 속성값을 선택하여 스타일을 줄 수 있다.
`html요소[attr]`의 형태로 사용된다.

```html
<!-- HTML -->
<input type="text" placeholder="인풋 텍스트" />
<input type="text" placeholder="인풋텍스트" />
<input type="text" placeholder="텍스트 인풋" />
<input type="text" placeholder="텍스트" />
```

```css
/* CSS */
input[placeholder] {
  background-color: pink;
}

input[type='text'] {
  color: red;
}

input[placeholder*='인풋'] {
  color: skyblue;
}
```

- `input[placeholder]`는 input에 placeholder라는 속성을 가지고만 있어도 스타일이 적용된다.
- `input[type="text"]`는 input 태그에 type이 "text"인 요소에만 스타일이 적용된다.
- `input[placeholder*="인풋"]`는 placeholder에 '인풋'이라는 값이 포함된 요소에 스타일이 적용된다.
  예제 코드로 적은 `인풋 텍스트`, `인풋텍스트`, `텍스트 인풋` 에 '인풋'이라는 단어가 있기 때문에 `color : skyblue;`가 적용된다. 띄어쓰기 여부 상관 없이 해당 단어만 들어가 있으면 된다.

속성 선택자는 종류가 다양하다. `~=`라던가, `|=`와 같은 것도 존재한다.
`*=`와 같은 속성 선택자는 a태그의 `href` 속성을 사용할 때 유용하게 사용될 수 있을듯 하다.

이외에 속성 선택자는 MDN 문서를 참고하면 된다.

[더 다양한 속성 선택자 보기](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

<br>

> 이번엔 기본 선택자들 위주로 정리해보았다.
> 다음 번엔 가상 요소, 가상클래스 선택자와 하위 선택자,
> 자식/자손 선택자, 인접 형제/일반 형제와 같은 선택자를 정리해봐야 겠다.

<br>

---

> 참고 자료

> [MDN CSS 선택자](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Selectors)

> [W3Schools CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.asp)

> [반드시 기억해야 하는 CSS 선택자 30개](https://code.tutsplus.com/ko/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
