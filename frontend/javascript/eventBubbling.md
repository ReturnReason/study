
## 이벤트 버블링(bubbling)과 캡처링(capturing)
![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/1f16b832-b801-4801-c85a-363c27f95900/public)


#### 이벤트 버블링(bubbling)이란,

DOM트리를 기준으로 자식 요소에서 발생한 이벤트가 부모요소로 전파되는 것을 의미한다. 
즉, **하위요소에서 상위 요소로 이벤트가 전파**된다는 것이다.
가장 최상위 요소에 닿을 때까지 이러한 행동이 반복된다.
이벤트가 거슬어 올라간다는 것이 거품 같다하여 버블링이라고 칭한다.


> 모든 이벤트가 버블링이 일어나는 것은 아니다!
예를 들면, focus(이벤트 요소가 포커스를 받을 때 발생)라던가,
blur(이벤트 요소가 포커스를 잃을 때 발생)등이 있다. <br>
위 이벤트에 버블링을 발생시키고 싶다면 focusin, focusout을 사용하면 된다.

<br>

#### 이벤트 캡처링(capturing)이란,
버블링과 반대되는 개념이라고 보면 된다. 버블링은 하위 요소에서 상위 요소로 전파되는 것이라면
**캡처링은 상위요소에서 하위요소**로 전파된다.

참고로, 버블링에 대한 이야기는 많지만, 캡쳐링에 대해서는 생소할 수도 있다.
캡처링을 활용하는 일은 거의 없기 때문이다.

<br>

#### 이벤트 캡쳐링(capturing)으로 설정하는 방법
기본적으로 자바스크립트의 이벤트 처리는 버블링 과정(기본값 false)으로 일어난다.
캡처링 과정으로 이벤트를 전파하고자 할 때
이벤트 리스너에서 세번째 인자로 capture 옵션 여부를 true로 켜주면 된다.

``` javascript
	target.addEventListener('click', () => {
      // 이벤트 캡쳐링으로 설정하기
    }, true);
```

![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/2e29aa10-7543-46f9-9412-4a4a28bb9900/public)


<br>

> **참고사항 :** 이벤트 버블링과 캡처링이 모두 일어나는 경우에는
캡처링이 먼저 실행된 후 버블링 단계가 실행된다.

<br>

-- -- 
## 이벤트 버블링 확인하기
자주 사용되는 이벤트 버블링에 대해서는 추가적인 실습을 통해 공부해보았다.

>![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/e574f17e-b499-492d-f308-b2578b1ee400/public)

모달창 열기 버튼을 누르면 검은색 반투명도 배경 위에 흰색 모달창이 나타난다.
검은색 반투명한 배경을 클릭하면 모달창이 닫힌다. 
닫기 버튼에는 콘솔 출력외에 아무런 기능도 추가하지 않았다.


```javascript
modalOpenBtn.addEventListener('click', () => {
  modalBg.classList.toggle('visible');
})

modalBg.addEventListener('click', () => {
  modalBg.classList.toggle('visible');
  console.log('모달창 검은 반투명도 배경이 클릭되면 출력 🎈')
});

modalOpenBg.addEventListener('click', () => {
  console.log('모달창 흰 배경이 클릭되면 출력');
});

modalText.addEventListener('click',() => {
  console.log('모달창 타이틀 글자 클릭되면 출력');
})

modalCloseBtn.addEventListener('click', () => {
  console.log('모달 닫기 버튼 클릭되면 출력');
});

```
앞서 언급했지만, `모달창이 닫히는 코드`는 모달창의 배경에만 작동되도록 하였고
이벤트 버블링이 일어나는 것을 확인하기 위해 모달창 구성 요소들에 console.log를 출력하는 코드를 작성했다.

![modal-2](https://user-images.githubusercontent.com/48672106/161750966-249703b8-479a-40d4-bd4a-f297abcc731b.gif)위 움짤을 확인해보면 아래의 행위를 시도했을 때 모달창이 닫히는 것을 확인할 수 있었다.
1. 모달창의 검은색 반투명 배경을 클릭했을 때
2. 모달창의 흰 배경을 클릭했을 때
3. 모달창 텍스트('이벤트 버블링 확인용 모달창')을 클릭했을 때
4. 모달창 닫기 버튼을 클릭했을 때
즉, 모달창 배경외에도 모달창과 관련된 모든 요소에 모달창을 닫는 이벤트가 적용되었다. 

내가 만들고자 하는대로 동작했다면, `1번` 검은색 반투명 배경을 클릭한 경우에만 모달창이 닫혀야 한다.
하지만, 자바스크립트의 `이벤트 버블링` 으로 인해 검은색 반투명 배경 위에 있는 어떤 요소를 클릭하더라도 검은색 반투명 배경이 클릭된 것과 같은 현상이 발생했다.

## 이벤트 버블링 막는 방법
1. event.stopPropation();
2. return false
```javascript
event.stopPropagation();
```

```javascript
return false;
```

`return false`의 경우 stopPropagation() 뿐만 아니라, 
이벤트의 기본 동작을 막는 stopPropagation()도 함께 수행된다.
![modal-3](https://user-images.githubusercontent.com/48672106/161752390-3c4c6a94-d47e-4bd7-8b7a-b93d9f12ee11.gif)모달창에 stopPropagation으로 이벤트 버블링을 막은 후 다시 모달창을 클릭해보았다.
처음에 만들고자 했던 검은 뒷 배경을 클릭했을 때만 닫히는 모달창이 완성되었다.

모달창의 흰 배경에만 stopPropation()을 주어 이벤트 전파를 막았다.
텍스트나 닫기 버튼까지 각각 달지 않아도 흰 배경에만 달면 그 안에 있는 요소들을 클릭하면 생기는 이벤트 전파를 부모인 흰 박스가 막아주어 검은 배경으로 가는 클릭 전파를 흰 배경에서 막아준다.

> 📔 공부하면서 알게된 점 : 버블링을 공부하면서 가장 헷갈렸던 부분이다! '검은 배경에 버블링을 막는 stopPropagation을 사용하면 되겠지?'라고 생각 했었는데 실제 동작 결과는 하위 요소를 눌러도 이벤트 전파가 이루어져서 내가 생각한 대로 동작하지 않았다.(아무 효과가 없었다.) <br> 검은 배경이 아닌 그 안에 있는 흰 배경에 stopPropagation을 달아야 내가 원하는 이벤트 막기가 정상적으로 동작했는데 이 원인이 이해가 잘 안되어 헷갈렸었다.** "이벤트가 상위요소로 가는 것을 막는다."라는 핵심을 간과했던 것이다. **내가 처음에 생각했던 것의 실제 결과물은 검은 배경의 상위 요소인 body, html, document, window로 가는 클릭 이벤트를 막은 것 밖에 안되는 것이였다.

이벤트를 막는 방법을 아는 정도만 기억하고 가능하면 이벤트 버블링을 이용하는 것이 좋다.


## 🎀 이벤트 버블링을 이용하는 방법
이벤트 버블링을 잘 사용한다면 정말 효율적인 코딩이 가능해진다.
이벤트 리스너를 줄일 수 있기 때문에 코드 짜는 시간을 줄일 수 있으며, 성능, 유지보수에도 이점이 있다.
![이벤트 버블링활용](https://user-images.githubusercontent.com/48672106/161752677-79bcd473-0706-4624-a9ef-374440d74830.png)
``` html
<div class="event-bubbling-conatiner">
  <h1>이벤트 버블링 활용하기</h1>
  <ul class="list">
    <li class="list-item item">1번 리스트</li>
    <li class="list-item item">2번 리스트</li>
    <li class="list-item item">3번 리스트</li>
  </ul>
</div>
```
ul 태그 안에 리스트 3개를 만들었다.

![eventbubble](https://user-images.githubusercontent.com/48672106/161751617-eca4196f-3919-49c4-a393-3b16f2c67e2d.gif)


```javascript
const listItems = document.querySelectorAll('.list-item');

for (let i=0; i<listItems.length; i++){
  listItems[i].addEventListener('click', () => {
      listItems[i].classList.add('gray-bg');
  });
}

```
for문을 사용해서 각각의 리스트에 모두 이벤트 리스너를 달아주었다.
각 리스트를 클릭하면 배경 색이 진한 회색으로 바뀌는 코드이다.
여기에서는 리스트가 3개이므로 이벤트 리스너가 3개가 달린 것과 동일하다.
지금은 적지만 더 많은 리스트가 생기면 각 li 태그마다 이벤트가 하나씩 달린다는 의미이다.
이때 성능 최적화를 하려면 부모 요소에 이벤트 버블링을 활용하여 이벤트를 위임하는 것이 좋다.

### 이벤트 위임
이벤트 위임은 개별 요소 마다 이벤트 리스너를 부착하는 것이 아니라
감싸고 있는 부모 요소 하나에만 이벤트를 달아 버블링이 일어나도록 하는 것을 의미한다.

부모 요소에 이벤트를 위임하여 버블링을 이용해보자.
```javascript
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
	e.target.classList.add('gray-bg');
});
```

클릭한 요소를 담고있는 `e.target`을 사용하여 해당 리스트의 배경색이 바뀌도록 하였다.
여기서 문제점이 하나 있다면 ul을 클릭하면 ul의 배경색도 바뀐다는 점이다.

```javascript
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
  if(e.target !== list){
    e.target.classList.add('gray-bg');
  }
});
```
if문을 추가해서 ul을 클릭했을 때 배경색이 바뀌는 것을 막는 코드도 작성해보았다.
if문 안에는 `e.target !== list` 대신 `e.target !== e.currentTarget`을 해도 동일하게 동작할 것이다.
target은 사용자가 클릭한 요소라면 currentTarget이 실제 이벤트가 달린 요소를 의미하기 때문이다.
![eventbubble](https://user-images.githubusercontent.com/48672106/161751617-eca4196f-3919-49c4-a393-3b16f2c67e2d.gif)


리스트를 클릭하면 배경색이 진한 회색으로 바뀌는 동작은 동일하게 적용된다. (코드는 더 짧아졌다!)


-- -- 
> 참고문서
[W3C](www.w3.org)
[MDN 이벤트 버블링과 캡처링](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events)
[모던 자바스크립트 튜토리얼 - focus와 blur](https://ko.javascript.info/focus-blur)
## 이벤트 버블링(bubbling)과 캡처링(capturing)
![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/1f16b832-b801-4801-c85a-363c27f95900/public)
#### 이벤트 버블링(bubbling)이란,
DOM트리를 기준으로 자식 요소에서 발생한 이벤트가 부모요소로 전파되는 것을 의미한다. 
즉, **하위요소에서 상위 요소로 이벤트가 전파**된다는 것이다.
가장 최상위 요소에 닿을 때까지 이러한 행동이 반복된다.
이벤트가 거슬어 올라간다는 것이 거품 같다하여 버블링이라고 칭한다.
<br>

> 모든 이벤트가 버블링이 일어나는 것은 아니다!
예를 들면, focus(이벤트 요소가 포커스를 받을 때 발생)라던가,
blur(이벤트 요소가 포커스를 잃을 때 발생)등이 있다. <br>
위 이벤트에 버블링을 발생시키고 싶다면 focusin, focusout을 사용하면 된다.

<br>

#### 이벤트 캡처링(capturing)이란,
버블링과 반대되는 개념이라고 보면 된다. 버블링은 하위 요소에서 상위 요소로 전파되는 것이라면
**캡처링은 상위요소에서 하위요소**로 전파된다.

참고로, 버블링에 대한 이야기는 많지만, 캡쳐링에 대해서는 생소할 수도 있다.
캡처링을 활용하는 일은 거의 없기 때문이다.

<br>

#### 이벤트 캡쳐링(capturing)으로 설정하는 방법
기본적으로 자바스크립트의 이벤트 처리는 버블링 과정(기본값 false)으로 일어난다.
캡처링 과정으로 이벤트를 전파하고자 할 때
이벤트 리스너에서 세번째 인자로 capture 옵션 여부를 true로 켜주면 된다.

``` javascript
	target.addEventListener('click', () => {
      // 이벤트 캡쳐링으로 설정하기
    }, true);
```

![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/2e29aa10-7543-46f9-9412-4a4a28bb9900/public)


> **참고사항 :** 이벤트 버블링과 캡처링이 모두 일어나는 경우에는
캡처링이 먼저 실행된 후 버블링 단계가 실행된다.

-- -- 
## 이벤트 버블링 확인하기

<br>

자주 사용되는 이벤트 버블링에 대해서는 추가적인 실습을 통해 공부해보았다.
<br>


>![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/e574f17e-b499-492d-f308-b2578b1ee400/public)

모달창 열기 버튼을 누르면 검은색 반투명도 배경 위에 흰색 모달창이 나타난다.
검은색 반투명한 배경을 클릭하면 모달창이 닫힌다. 
닫기 버튼에는 콘솔 출력외에 아무런 기능도 추가하지 않았다.

<br>


```javascript
modalOpenBtn.addEventListener('click', () => {
  modalBg.classList.toggle('visible');
})

modalBg.addEventListener('click', () => {
  modalBg.classList.toggle('visible');
  console.log('모달창 검은 반투명도 배경이 클릭되면 출력 🎈')
});

modalOpenBg.addEventListener('click', () => {
  console.log('모달창 흰 배경이 클릭되면 출력');
});

modalText.addEventListener('click',() => {
  console.log('모달창 타이틀 글자 클릭되면 출력');
})

modalCloseBtn.addEventListener('click', () => {
  console.log('모달 닫기 버튼 클릭되면 출력');
});

```
앞서 언급했지만, `모달창이 닫히는 코드`는 모달창의 배경에만 작동되도록 하였고
이벤트 버블링이 일어나는 것을 확인하기 위해 모달창 구성 요소들에 console.log를 출력하는 코드를 작성했다.

<br>


![modal-2](https://user-images.githubusercontent.com/48672106/161750966-249703b8-479a-40d4-bd4a-f297abcc731b.gif)위 움짤을 확인해보면 아래의 행위를 시도했을 때 모달창이 닫히는 것을 확인할 수 있었다.
1. 모달창의 검은색 반투명 배경을 클릭했을 때
2. 모달창의 흰 배경을 클릭했을 때
3. 모달창 텍스트('이벤트 버블링 확인용 모달창')을 클릭했을 때
4. 모달창 닫기 버튼을 클릭했을 때
즉, 모달창 배경외에도 모달창과 관련된 모든 요소에 모달창을 닫는 이벤트가 적용되었다. 

내가 만들고자 하는대로 동작했다면, `1번` 검은색 반투명 배경을 클릭한 경우에만 모달창이 닫혀야 한다.
하지만, 자바스크립트의 `이벤트 버블링` 으로 인해 검은색 반투명 배경 위에 있는 어떤 요소를 클릭하더라도 검은색 반투명 배경이 클릭된 것과 같은 현상이 발생했다.

<br>
<br>

## 이벤트 버블링 막는 방법
1. event.stopPropation();
2. return false
```javascript
event.stopPropagation();
```

```javascript
return false;
```

`return false`의 경우 stopPropagation() 뿐만 아니라, 
이벤트의 기본 동작을 막는 stopPropagation()도 함께 수행된다.
<br>

![modal-3](https://user-images.githubusercontent.com/48672106/161752390-3c4c6a94-d47e-4bd7-8b7a-b93d9f12ee11.gif)모달창에 stopPropagation으로 이벤트 버블링을 막은 후 다시 모달창을 클릭해보았다.
처음에 만들고자 했던 검은 뒷 배경을 클릭했을 때만 닫히는 모달창이 완성되었다.

모달창의 흰 배경에만 stopPropation()을 주어 이벤트 전파를 막았다.
텍스트나 닫기 버튼까지 각각 달지 않아도 흰 배경에만 달면 그 안에 있는 요소들을 클릭하면 생기는 이벤트 전파를 부모인 흰 박스가 막아주어 검은 배경으로 가는 클릭 전파를 흰 배경에서 막아준다.

<br>

> 📔 공부하면서 알게된 점 : 버블링을 공부하면서 가장 헷갈렸던 부분이다! '검은 배경에 버블링을 막는 stopPropagation을 사용하면 되겠지?'라고 생각 했었는데 실제 동작 결과는 하위 요소를 눌러도 이벤트 전파가 이루어져서 내가 생각한 대로 동작하지 않았다.(아무 효과가 없었다.) <br> 검은 배경이 아닌 그 안에 있는 흰 배경에 stopPropagation을 달아야 내가 원하는 이벤트 막기가 정상적으로 동작했는데 이 원인이 이해가 잘 안되어 헷갈렸었다.** "이벤트가 상위요소로 가는 것을 막는다."라는 핵심을 간과했던 것이다. **내가 처음에 생각했던 것의 실제 결과물은 검은 배경의 상위 요소인 body, html, document, window로 가는 클릭 이벤트를 막은 것 밖에 안되는 것이였다.


<br>
이벤트를 막는 방법을 아는 정도만 기억하고 가능하면 이벤트 버블링을 이용하는 것이 좋다.
<br>
<br>

## 🎀 이벤트 버블링을 이용하는 방법
이벤트 버블링을 잘 사용한다면 정말 효율적인 코딩이 가능해진다.
이벤트 리스너를 줄일 수 있기 때문에 코드 짜는 시간을 줄일 수 있으며, 성능, 유지보수에도 이점이 있다.
<br>
<br>

![이벤트 버블링활용](https://user-images.githubusercontent.com/48672106/161752677-79bcd473-0706-4624-a9ef-374440d74830.png)
``` html
<div class="event-bubbling-conatiner">
  <h1>이벤트 버블링 활용하기</h1>
  <ul class="list">
    <li class="list-item item">1번 리스트</li>
    <li class="list-item item">2번 리스트</li>
    <li class="list-item item">3번 리스트</li>
  </ul>
</div>
```
ul 태그 안에 리스트 3개를 만들었다.

![eventbubble](https://user-images.githubusercontent.com/48672106/161751617-eca4196f-3919-49c4-a393-3b16f2c67e2d.gif)


```javascript
const listItems = document.querySelectorAll('.list-item');

for (let i=0; i<listItems.length; i++){
  listItems[i].addEventListener('click', () => {
      listItems[i].classList.add('gray-bg');
  });
}

```
for문을 사용해서 각각의 리스트에 모두 이벤트 리스너를 달아주었다.
각 리스트를 클릭하면 배경 색이 진한 회색으로 바뀌는 코드이다.
여기에서는 리스트가 3개이므로 이벤트 리스너가 3개가 달린 것과 동일하다.
지금은 적지만 더 많은 리스트가 생기면 각 li 태그마다 이벤트가 하나씩 달린다는 의미이다.
이때 성능 최적화를 하려면 부모 요소에 이벤트 버블링을 활용하여 이벤트를 위임하는 것이 좋다.
<br>
<br>

### 이벤트 위임
이벤트 위임은 개별 요소 마다 이벤트 리스너를 부착하는 것이 아니라
감싸고 있는 부모 요소 하나에만 이벤트를 달아 버블링이 일어나도록 하는 것을 의미한다.

부모 요소에 이벤트를 위임하여 버블링을 이용해보자.
<br>

```javascript
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
	e.target.classList.add('gray-bg');
});
```
<br>

클릭한 요소를 담고있는 `e.target`을 사용하여 해당 리스트의 배경색이 바뀌도록 하였다.
여기서 문제점이 하나 있다면 ul을 클릭하면 ul의 배경색도 바뀐다는 점이다.<br><br>

```javascript
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
  if(e.target !== list){
    e.target.classList.add('gray-bg');
  }
});
```
<br>

if문을 추가해서 ul을 클릭했을 때 배경색이 바뀌는 것을 막는 코드도 작성해보았다.<br>
if문 안에는 `e.target !== list` 대신 `e.target !== e.currentTarget`을 해도 동일하게 동작할 것이다.<br>
target은 사용자가 클릭한 요소라면 currentTarget이 실제 이벤트가 달린 요소를 의미하기 때문이다.<br><br>
![eventbubble](https://user-images.githubusercontent.com/48672106/161751617-eca4196f-3919-49c4-a393-3b16f2c67e2d.gif)
<br>

리스트를 클릭하면 배경색이 진한 회색으로 바뀌는 동작은 동일하게 적용된다. (코드는 더 짧아졌다!)
<br>

-- -- 
> 참고문서
<br>
[W3C](www.w3.org) <br>
[MDN 이벤트 버블링과 캡처링](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events)<br>
[모던 자바스크립트 튜토리얼 - focus와 blur](https://ko.javascript.info/focus-blur)