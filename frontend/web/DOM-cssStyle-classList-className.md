문서 객체 모델(DOM)을 자바스크립트로 조작하여 노드의 CSS style과 class를 추가/삭제 하는 방법이다.

## CSS 스타일 넣기

자바스크립트에서 DOM을 조작하여 노드에 style을 넣어볼 것이다.

```html
<div class="menu-container">
  <ul class="menu-list">
    <li>menu1</li>
    <li>menu2</li>
    <li>menu3</li>
  </ul>
</div>
<div class="contents-container">
  <p class="title">텍스트1</p>
  <p class="content">텍스트2</p>
</div>
```

먼저, `ul`태그에 스타일을 넣어보았다.

```javascript
const menu = document.querySelector('.menu-list');
menu.style.backgroundColor = 'skyblue';
menu.style.width = '200px';
```

`.style`이라는 키워드를 사용해 css의 스타일 속성을 부여할 수 있다.

### 다음과 같은 형태로 작성해도 스타일을 넣을 수 있다.

```javascript
menu.style['width'] = '200px';
menu.style['backgroundColor'] = 'orange';
menu.style['font-size'] = '20px';
```

`[]`로 작성하는 스타일의 특징은 카멜케이스(camel case) 작성 방법(예시 : backgroundColor)으로 사용해도 스타일이 적용되고 케밥 케이스(kebab-case)로 작성해도 스타일이 적용된다.

<br>

```javascript
console.log(menu.style);
```

콘솔에 찍어보면 `CSSStyleDeclaration`이라는 객체 형태의 무언가가 출력된다.

![](https://velog.velcdn.com/images/reasonz/post/d3f320c1-f871-44e3-aec0-2c009ee397b3/image.png)

살펴보니 숫자 인덱스 키에 적혀있는 값들은 조금 전에 자바스크립트로 적용한 속성들이 작성되어 있었다.
그 외에도 사용할 수 있는 CSS 속성들이 쭉 나열되어 있다.

## CSSStyleDeclaration

CSS 스타일 정보와 다양한 스타일 관련 메소드 및 속성을 가진 객체 인터페이스이다.

```javascript
console.log(menu.style.cssText);
console.log(menu.style.length);
console.log(menu.style.getPropertyPriority('width') === 'important');
console.log(menu.style.getPropertyValue('width'));
console.log(menu.style.item(0));
console.log(menu.style.removeProperty('width'));
console.log(menu.style.setProperty('background-color', 'pink')); // 값 변경
```

![](https://velog.velcdn.com/images/reasonz/post/1bc9490c-7b5d-40b9-ba7c-55c705a62d84/image.png)

스타일 관련 여러 메소드 사용이나 스타일 정보를 확인할 수 있다.

1. `CSSStyleDeclaration.cssText` : 적용한 css를 텍스트로 확인해 볼 수 있다.
2. `CSSStyleDeclaration.length` : 적용한 css의 개수(길이)가 반환된다.
3. `CSSStyleDeclaration.getPropertyPriority('priority')` : ()안에 넣은 스타일의 중요도를 확인할 때 사용한다. 반환 값은 Boolean 타입이다.
4. `CSSStyleDeclaration.getPropertyValue(key)` : 스타일 키 값을 넣으면 해당하는 value값을 받아올 수 있다.
5. `CSSStyleDeclaration.item(index)` : 적용된 스타일의 index를 넣으면 해당하는 key값이 반환된다.
6. `CSSStyleDeclaration.removeProperty('style name')` : 파라미터로 스타일의 이름(key)를 넣으면 해당 스타일이 제거된다.
7. `CSSStyleDeclaration.setProperty('적용할 스타일 이름', '적용할 값', '옵션( important/undefined/"" ')` : 스타일을 수정할 때 사용한다. 현재 적용되어 있지 않는 스타일을 작성하면 추가된다. 옵션 값으로 중요도를 설정할 수 있으나 생략 가능하다.

## 클래스 추가/제거/토글하기

```css
.menu-container {
  border: 2px solid #eee;
}

.menu-list li {
  list-style: none;
}

.contents-container {
  background: #eee;
  padding: 20px;
}

.contents-container .title {
  font-size: 20px;
  font-weight: bold;
}
```

이전에 작성한 스타일은 전부 지우고 css 파일에 클래스 선택자에 스타일을 부여하도록 작성했다.

클래스 부착을 위해 HTML의 클래스도 일부 제거하였다.
찾기 쉽기 위해 임의로 id 속성도 부여해보았다.

```html
<div id="first" class="menu-container">
  <ul>
    <li>menu1</li>
    <li>menu2</li>
    <li>menu3</li>
  </ul>
</div>
<div id="second">
  <p class="title">텍스트1</p>
  <p class="content">텍스트2</p>
</div>
```

```javascript
const first = document.getElementById('first');
const second = document.getElementById('second');
const ul = document.querySelector('ul');
console.log(first.className);
console.log((ul.className = 'menu-list'));
console.log(ul.classList);
```

`Element.className` : 특정 요소의 클래스 속성 값을 가져오거나 설정할 수 있다.
`Element.classList` : `DOMTokenList`를 반환하는 읽기 전용 프로퍼티이다.

`ul.className = 'menu-list';`를 추가했기 때문에 ul의 클래스 이름에 menu-list가 부착될 것이다.

```javascript
console.log(first.className);
console.log((ul.className = 'menu-list'));
console.log(ul.classList.contains('menu-list'));
```

classList.contains로 해당 클래스 명이 있는지 확인할 수 있다. (T/F로 반환)

![](https://velog.velcdn.com/images/reasonz/post/f12661e9-7174-4802-8696-db5edd2f8680/image.png)

## classList 메서드

`Element.classList.add` : 클래스를 추가할 수 있다.
`Element.classList.remove` : 클래스를 제거할 수 있다.
`Element.classList.toggle(String [, force])` : 클래스가 있는 경우 삭제하고 없는 경우 추가한다. 두번째 인자를 넣는 경우 두번째 인자가 true일 때만 값을 추가하고 false면 제거한다.
`Element.classList.item(Number)` : DOMTokenList의 인덱스를 사용하여 클래스 값을 반환한다.
`Element.classList.contains(String)` : 해당 클래스가 존재하는지 확인하고 true또는 false로 반환한다.
`Element.classList.replace(old class, new class)` : 클래스를 변경(재설정)한다.

### className으로 추가하는 것과 classList.add()로 클래스를 추가하는 것의 차이점

### 1. className 사용

```javascript
second.className = 'contents-container';
second.className = 'add-class';
console.log(second.classList);
```

먼저 className을 통해 두개의 클래스를 추가하도록 해보고 클래스 리스트를 확인해 보았다.

![](https://velog.velcdn.com/images/reasonz/post/d01afe2d-47a3-463b-abf8-c3d82154cf73/image.png)

앞서 작성한 `second.className = 'contents-container';`의 값이 덮어쓰기 된 것을 확인할 수 있었다.
결과를 미루어보아 className은 한번 사용할 때 적용하고자 하는 class의 이름을 전부 적어주어야 한다.

```javascript
second.className = 'contents-container add-class';
console.log(second.classList);
```

이런 형태로 작성하여야 2개 이상의 클래스를 적용시킬 수 있다.
클래스를 여러개 추가 해야하는 상황에서는 복잡할 수 있다.

### 2. classList 사용

아래와 같이 작성하면 조금 전에 살펴봤던 className과 같은 형태로 사용된다.

```javascript
second.classList = 'contents-container';
second.classList = 'test';
console.log(second.classList);
```

test 라는 클래스만 남고 먼저 작성한 'contents-container'는 덮어쓰기 되어 사라진다.

![](https://velog.velcdn.com/images/reasonz/post/1b538318-2042-4e06-8412-66fc6497f9da/image.png)

하지만 `.add()` 메소드를 사용하면 기존 클래스에 추가할 수 있게 된다.

```javascript
second.classList = 'contents-container';
second.classList.add('test1');
console.log(second.classList);
```

![](https://velog.velcdn.com/images/reasonz/post/88a07733-9f1e-4445-a5e4-80dd9b78c23d/image.png)

add 메소드에 여러개의 파라미터를 작성하면 1개 이상의 클래스도 추가할 수 있다.

```javascript
second.classList.add('test1', 'test2', 'test3');
```

---

> 참고 자료

> [MDN CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)

> [MDN className](https://developer.mozilla.org/ko/docs/Web/API/Element/className)
