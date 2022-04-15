> - MDN 문서에서는 selector가 아닌 combinator로 명시되어있지만
>   편의상 선택자(selector)라고 칭하였음.

## combinator

1. 일치 선택자
2. 자손 선택자
3. 자식 선택자
4. 인접 형제 선택자
5. 일반 형제 선택자

---

## 1. 일치 선택자

```css
div.container {
  color: pink;
}
```

선택자와 선택자가 붙어있는 형태를 일치 선택자라 한다.
위 코드는 div태그이면서 class의 이름이 container인 요소를 선택한다.

<br>

## 2. 자손 선택자 (Descendant combinator)

자손 선택자는 한 칸 이상의 공백문자로 ` ` 표현할 수 있다.
부모 안에 속한 모든 자식 또는 자손 요소(하위 요소들)를 모두 선택한다.

![](https://velog.velcdn.com/images/reasonz/post/d816c734-9d74-4852-9861-4131057469a8/image.png)

```html
<div class="container">
  <h1>자손 선택자</h1>
  <p>자손 선택자는 두 선택자를 한 칸 이상의 공백으로 조합한다.</p>
</div>
```

```css
.container h1 {
  color: pink;
}
```

<br>

## 3. 자식 선택자 (Child combinator)

자식 선택자는 두 선택자 사이에`>` 기호를 사용한다.
부모 요소 바로 아래에 있는 자식을 선택한다. (부모를 기준으로 자식을 찾는다.)
즉, `>` 기호 앞에 있는 것은 조건이 되고 찾는 것은 `>`기호 다음에 오는 것이 된다.

![](https://velog.velcdn.com/images/reasonz/post/aea31c27-899f-4d6b-83c9-94312ee4e2fa/image.png)

```html
<div class="container">
  <h1>자식 선택자</h1>
  <p>자식 선택자는 두 선택자 사이에 > 기호를 사용한다.</p>
</div>
<hr />

<div class="hi">
  <div>
    <p>Hi, 1번 입니다.</p>
    <span>Hi, 2번 입니다.</span>
  </div>
  <p>Hi, 3번 입니다.</p>
</div>
```

```css
.hi > p::after {
  content: '★';
  background: powderblue;
  color: #555;
}
```

<br>

## 4. 인접 형제 선택자 (Adjacent sibling combinator)

인접 형제 선택자는 선택자 사이에 `+` 기호를 사용한다.
예를 들어, `A+B`라고 작성했을 때 A 뒤에 바로 오는 B가 선택된다.
즉, `같은 부모` 아래 있는 `형제 요소` 중 `바로 다음에 오는 것`이 선택된다는 의미이다.

![](https://velog.velcdn.com/images/reasonz/post/9a0dbe7f-aed7-4cfb-9759-c964e9abe6f3/image.png)

```html
<div class="container">
  <h1>인접 형제 선택자</h1>
  <p>인접 형제 선택자는 두 선택자 사이에 + 기호를 사용한다.</p>

  <div class="content">
    <ul>
      <li class="content">★1★</li>
      <li class="content">★2★</li>
      <li>★3★</li>
    </ul>
  </div>
  <div>★</div>
  <div class="content">
    <ul class="content">
      <li>★4★</li>
      <li>★5★</li>
      <li>★6★</li>
    </ul>
  </div>
  <div class="content">
    <ul>
      <li>★7★</li>
      <li>★8★</li>
      <li>★9★</li>
    </ul>
  </div>
</div>
```

```css
.content + .content {
  color: slateblue;
  background: pink;
}
```

<br>

## 5. 일반 형제 선택자 (General sibling combinator)

일반 형제 선택자는 인접 형제와 비슷하지만 다른 점이 있다.
인접 형제는 `같은 부모`이면서 바로 다음에오는 요소만 적용이 되었다면, `일반 형제 선택자는 바로 다음에 오지 않아도 된다`는 부분에서 차이가 있다.

![](https://velog.velcdn.com/images/reasonz/post/9177b949-5646-4582-a538-0202016a5f63/image.png)

```html
<div class="container">
  <h1>일반 형제 선택자</h1>
  <p>일반 형제 선택자는 두 선택자 사이에 ~ 기호를 사용한다.</p>

  <div class="content">
    <ul>
      <li class="content">💜1</li>
      <li>💜2</li>
      <li class="content">💜3</li>
    </ul>
  </div>
  <div>
    <ul>
      <li>💛4</li>
      <li>💛5</li>
      <li>💛6</li>
    </ul>
  </div>
  <div class="content">
    <ul>
      <li>💜7</li>
      <li>💜8</li>
      <li>💜9</li>
    </ul>
  </div>
</div>
```

```css
.content ~ .content {
  color: slateblue;
  background: pink;
}
```

<br>

---

> 참고 자료
> [MDN CSS Selector](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Selectors)
