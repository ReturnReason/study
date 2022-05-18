## DOM(Document Obejct Model)

DOM은 트리형식의 자료 구조인데 하나의 객체를 `노드`라고 부른다.
문서객체모델(DOM)은 XML이나 HTML에 접근할 수 있는 인터페이스이다.
자바스크립트는 이 문서 객체 모델을 이용하여 HTML을 조작하고 제어할 수 있다.

Document는 웹 페이지를 의미한다.
그렇기 때문에 자바스크립트에서 HTML 요소에 접근하기 위해서는 document 객체부터 시작해야 한다.

<br>

## Document 메소드

자바스크립트로 HTML 요소 선택을 위해 사용하는 메소드이다.
모든 HTML은 객체이기 때문에 자바스크립트로 접근 및 제어할 수 있다.

```javascript
const documentHtml = document.documentElement; // html
const documentBody = document.body; // body
const documentHead = document.head; //head
```

<br>

위 코드에 작성한 각각의 변수를 console에 찍어보면
html태그, body태그, head태그가 출력된다.

![](https://velog.velcdn.com/images/reasonz/post/d0ffa345-d0c6-41d4-9d98-884b18d748cb/image.png)

<br>

### HTML 요소 선택하기

```html
<div class="container">
  <h1 class="title">타이틀</h1>
  <form action="" method="">
    <input type="email" id="email" />
    <input type="password" name="" id="pw" />
    <button class="btn">버튼</button>
  </form>
</div>

<div class="container">
  <h2 class="title" name="hi">ㅎㅇㅎㅇ</h2>
  <p class="content">텍스트1</p>
  <h2 class="title" name="hi">안녕하세요?</h2>
  <p class="content">텍스트2</p>
</div>
```

<br>

위와 같은 HTML 요소들이 존재할 때 HTML 요소를 선택하는 메소드를 사용해 보았다.

```javascript
const email = document.getElementById('email'); // id 요소
const inputs = document.getElementsByTagName('input'); // 태그 이름 요소
const container = document.getElementsByClassName('container'); // 클래스 요소
const hiAttr = document.getElementsByName('hi'); // name 속성을 가지는 요소 전체

const titles = document.querySelector('.title'); // 선택자 요소 가장 첫번째 것만 선택
const contents = document.querySelectorAll('.content'); // 선택자 요소 모두 선택

console.log(`getElementById : ${email}`);
console.log(`getElementsByTagName : ${inputs}`);
console.log(`getElementsByClassName : ${container}`);
console.log(`getElementsByName : ${hiAttr}`);
console.log(`querySelector ${titles}`);
console.log(`querySelectorAll${contents}`);
```

<br>

요소 선택 메소드를 사용하고 출력값을 확인하기 위해 모두 콘솔에 찍어보았다.

![](https://velog.velcdn.com/images/reasonz/post/eeba5798-edb0-4e93-bc70-17f87a0b70e9/image.png)

![](https://velog.velcdn.com/images/reasonz/post/71891fda-70ab-4db3-a139-d76a1088f66b/image.png)

출력 값을 확인해보면 getElementById와 querySelector는 한 개의 요소만 선택되기 때문에 상관없으나, 여러개를 결과물로 출력하는 메소드는 HTMLCollection와 NodeList라는 유사 배열 형태로 값이 담겨 출력되었다.

<br>

### 한가지의 요소만 선택하는 `getElementById`와 `querySelector`의 차이점

`querySelector`는 css 요소 선택할 때 처럼 사용할 수 있다는 점이다. css에 스타일 주는 것처럼 다소 복잡해 보이는 다음과 같은 `querySelector('.container .title[name="hi"]'` 형태로 작성해도 해당 요소 선택이 가능하다.

`getElementById`는 해당 요소의 id를 선택할 때 사용된다.
id는 문서내에서 유일하다는 특징이 있기 때문에 특정요소를 빠르게 찾을 때 유용하다.

<br>

### HTML Collection과 NodeList는 뭘까?

1. HTML Collection
   배열과 유사한 객체형태로 요소의 문서 내 순서대로 정렬된 일반 컬렉션을 나타낸다.
2. NodeList
   element.childNodes와 같은 속성과 document.querySelectorAll과 같은 메서드에 의해 반환되는 노드 컬렉션이다.

MDN 문서의 설명에 따르면 위와 같지만 이해하기는 살짝 애매한 설명인 것 같아서 조금 더 첨언하고자 한다.
두가지 모두 유사 배열이기 때문에 배열 내장 메소드는 사용하지 못하는 경우가 많다. (NodeList는 forEach처럼 몇가지 사용할 수 있긴 한데 HTML Collection은 불가하다.)

<br>

## HTML Collection, NodeList 차이점 알아보기

```html
<div>
  <h1>제목</h1>
  <p>NodeList와 htmlCollection 차이점</p>
  <p>콘솔에 찍어서 확인해보자.</p>
</div>
```

<br>

```javascript
const nodeList = document.querySelectorAll('p');
const htmlCollection = document.getElementsByTagName('p');

console.log(nodeList);
console.log(htmlCollection);
```

<br>

두가지 변수 모두 p태그를 선택하는 선택자를 사용했다.

![](https://velog.velcdn.com/images/reasonz/post/66824a7c-df2b-4346-bef9-ce8dbf6413c1/image.png)

보기에는 프로토타입이 NodeList나 HTMLCollction 말고는 별다른 차이점이 느껴지지 않는다.

setTimeout을 사용해 1초 후에 p태그를 하나 더 추가하고 전후 비교를 위해 console에 출력해보았다.

<br>

```javascript
const nodeList = document.querySelectorAll('p');
const htmlCollection = document.getElementsByTagName('p');

console.log(nodeList);
console.log(htmlCollection);

const pTagAdd = document.createElement('p');
pTagAdd.innerHTML = 'p태그 하나 더 추가';

setTimeout(() => {
  document.body.append(pTagAdd);
  console.log(nodeList);
  console.log(htmlCollection);
}, 1000);
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/721b56fc-cbce-4a81-8e25-fbf1aaa270ab/image.png)

<br>

setTimeout으로 p태그를 추가하기 전에는 NodeList와 HTMLCollection 모두 동일하게 2개의 p태그 요소를 선택해 유사 배열로 반환하였지만

p태그를 추가한 후에는 NodeList에는 새로 추가한 p태그가 반영되지 않았고 HTMLCollection에는 실시간으로 반영된 것을 확인할 수 있었다.

<br>

### 차이점 확인

`NodeList`는 변경된 태그가 실시간으로 반영되지 않고 (정적 콜렉션) `HTMLCollection`은 실시간으로 변경된 태그도 반영이 된다.
그렇기 때문에 HTMLCollection은 노드의 인덱스 값이 항상 일정하지 않다.
(**참고 : ** NodeList는 Node.childNodes만 실시간으로 반영된다.)

<br>

### NodeList가 유일하게 실시간으로 반영하는 childNodes와 항상 실시간인 HTMLCollection의 children

```html
<div class="parent">
  <!-- 주석 -->
  <p class="child">NodeList와 htmlCollection 차이점</p>
  <p class="child">콘솔에 찍어서 확인해보자.</p>
</div>
```

<br>

```javascript
const parent = document.querySelector('.parent');

console.log(parent.children);
console.log(parent.childNodes);
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/802e03ee-1b5b-41d9-ba5b-137c2936510e/image.png)

반환 값만 봐도 차이가 드러나지만, 이거보다 먼저 NodeList에서 childNodes의 실시간 반영부터 확인하고자 한다.

<br>

```javascript
const parent = document.querySelector('.parent');
const child = document.createElement('p');
child.innerHTML = 'p태그 추가용ㅎ';

console.log(parent.children);
console.log(parent.childNodes);

setTimeout(() => {
  parent.append(child);
  console.log(parent.children);
  console.log(parent.childNodes);
}, 1000);
```

<br>

1초 후에 parent 태그 안에 자식으로 p태그를 추가하도록 하고 해당 요소의 자식을 콘솔에 다시 찍어보도록 했다.

![](https://velog.velcdn.com/images/reasonz/post/a4dcc8f7-c95e-4938-993b-1807e2e7d1ef/image.png)

HTMLCollection과 NodeList모두 실시간으로 변경된 자식태그가 출력되는 것을 확인할 수 있었다.
NodeList는 정적 컬렉션이지만 childNodes에 대해서는 실시간으로 반영된다.

<br>

### 그렇다면, HTMLCollection과 NodeList가 가지고 있는 유사 배열의 길이는 왜 다를까?

![](https://velog.velcdn.com/images/reasonz/post/39f8856c-35f7-46a0-8b9a-09e1dc4da252/image.png)

똑같은 자식 노드를 출력하도록 했는데
`.children`를 사용했을 때와 `.childNodes`를 사용했을 때의 출력이다.
유사 배열의 길이가 다를 뿐더러 유사 배열안에 담긴 요소의 내용도 다르다.

<br>

### HTML Collection은 태그 노드만 취급한다.

즉, `</>`의 형태로 작성된 요소 노드만 유사 배열에 담긴다.

<br>

### NodeList는 주석과 일반 텍스트도 포함된다.

`</>` 태그 형태의 노드 뿐만 아니라, 주석(comment), 읽기 좋은 코드 작성을 위한 줄바꿈(공백문자)도 text로 인식하여 추가한다.

<br>

> ## 정리
>
> NodeList는 모든 타입의 노드가 유사 배열에 담긴다.
> HTMLCollection은 요소(태그) 노드만 유사 배열에 담긴다. <br>
> NodeList는 childNodes외에는 실시간으로 HTML 변경사항이 적용되지 않는다.
> HTMLCollection은 모든 변경사항에 있어 실시간으로 적용된다.

<br>

---

> 참고 자료

> [TCP SCHOOL.com](http://www.tcpschool.com/javascript/js_dom_document)

> [MDN](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementById)
