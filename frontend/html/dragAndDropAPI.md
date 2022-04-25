> 드래그&드롭을 구현하고 싶은데 마음처럼 잘 안돼서 이번에 공부겸 정리하면서 개념을 이해하고자 한다.

---

# HTML 드래그 앤 드롭 API

draggable 요소를 마우스로 선택해 droppable요소로 드래그 후
마우스 버튼에서 손을 떼면 요소가 드롭된다.
드래그하는 동안은 draggable 요소는 반투명한 상태로 마우스 포인터를 따라가는 것이 특징이다.

## 드래그 관련 이벤트

|  이벤트   |   핸들러    |                                  설명                                  |
| :-------: | :---------: | :--------------------------------------------------------------------: |
|   drag    |   ondrag    |                        요소를 드래그할 때 발생                         |
|  dragend  |  ondragend  |           요소의 드래그가 끝날때 발생(마우스 버튼을 놓으면)            |
| dragenter | ondragenter |      해당 이벤트를 지정한 요소에 드래그한 아이템이 들어가면 발생       |
| dragexit  | ondragexit  |                             잘 안쓰이는듯                              |
| dragleave | ondragleave | dragexit대신 사용. <br> 이 이벤트가 달린 요소에서 드래그가 떠나면 발생 |
| dragover  | ondragover  |            이 이벤트가 달린 요소에 드래그가 이루어지면 발생            |
| dragstart | ondragstart |                      드래그가 시작되는 순간 발생                       |
|   drop    |   ondrop    | 이 이벤트가 달린 요소에 드래그를 끝내면 발생 (dragover랑 같이 써야함)  |

<br>

> 요소가 드래그 이벤트가 발생할 수 있도록
> 해당 요소의 속성으로 `draggable="true"`값을 주고 시작하면 된다.

<br>

## 1. drag

```html
<div draggable="true" class="item">
  <p>🌸 드래그용 아이템 🌸</p>
</div>
```

```javascript
const item = document.querySelector('.item');

item.addEventListener('drag', (e) => {
  console.log(e);
  console.log('드래그하면 발생하는 이벤트');
});
```

<br>

드래그 이벤트를 테스트해볼 요소를 하나 만들고 이벤트 리스너를 달았다.

![](https://velog.velcdn.com/images/reasonz/post/4abc2cf3-0e26-4978-a460-ad286aff9f26/image.gif)

드래그 하는 중에 계속 이벤트가 실행되는 것을 확인할 수 있었다.

<br>

## 2. dragend

`dragend`이벤트는 드래그를 시작하거나 진행중일때는 발생하지 않고
사용자가 마우스 클릭 버튼을 놓았을 때 발생하는 이벤트이다.

![](https://velog.velcdn.com/images/reasonz/post/fb61a336-9905-4d2f-9db8-f7a7a0af8f48/image.gif)

<br>

## 3. dragenter

드래그하는 요소가 dragenter 이벤트를 달아놓은 요소 안에 진입했을 때 발생한다.
![](https://velog.velcdn.com/images/reasonz/post/b9ea4966-4afb-4380-a5b7-0029f4bcdf78/image.gif)

<br>

## 4. dragexit

dragleave로 대신 사용하는 것 같아서 생략

<br>

## 5. dragleave

어떤 요소든 드래그되고 있다면 이 이벤트가 달린 요소에 들어갔다가 나가는 시점에 발생하는 이벤트이다.

![](https://velog.velcdn.com/images/reasonz/post/bfe6c1c0-3987-495b-a02d-3bf9ce700144/image.gif)

<br>

## 6. dragover

`dragover`이벤트가 달려있는 요소 안에서 어떠한 요소든 드래그가 이루어지고 있다면 발생하는 이벤트이다.

![](https://velog.velcdn.com/images/reasonz/post/baec90f2-bacf-47e2-aa39-8c59d0e5581f/image.gif)

<br>

## 7. dragstart

드래그가 시작되는 순간 발생한다.
![](https://velog.velcdn.com/images/reasonz/post/0f4ad0f9-632f-4f55-a590-d49e7e9e3276/image.gif)

<br>

## 8. drop

드롭될 요소에는 preventDefault()를 사용하지 않으면 정상적인 동작이 되지 않을 수 있으므로
이벤트에 `preventDefault()` 코드를 작성하는 것이 좋다.
단독으로 사용했을 때는 동작을 하지 않았고 `dragover`이벤트와 함께 사용했을 때 비로소 동작을 했다.

### dragover 이벤트가 없을 때

![](https://velog.velcdn.com/images/reasonz/post/25469186-6586-43c3-bd66-932880c9dab7/image.gif)

아무런 반응이 없다..ㅜㅜ 왜 없는지 몰라서 정말 한참 헤맸는데 이 이벤트 저 이벤트 다 넣어보고 빼보고 다 넣어보고도 동작을 안하길래 도대체 언제 동작하는앤가..하고 요소를 바꿔서 이벤트 리스너를 들아봤는데 드랍될 요소에 dragover와 함께 작성하니 동작했다.

### dragover 이벤트가 있을 때

![](https://velog.velcdn.com/images/reasonz/post/f37330a9-ce4c-4341-bcf2-2fc9ce00dffb/image.gif)

예제도 많이 찾아봤는데 drop 이벤트에 대한 내용은 제대로 안나오길래 주먹구구 식으로 직접 하나씩 테스트해봤다. 어쨌든 어떤 경우에 동작하는지 확인했으니 만족.

<br>

---

> 참고 자료

> [MDN 드래그 앤 드롭 API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)
