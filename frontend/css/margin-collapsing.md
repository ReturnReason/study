# margin collapsing

<br>

> margin이 결합(상쇄)되는 현상을 margin collapsing이라고 한다.

<br>

[MDN 문서](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)를 참고하여 정리하였다.

---

## margin collapse가 나타나는 상황

1. 인접 형제
2. 부모와 자식의 마진이 겹칠 때
3. 높이가 0인 빈 블록(block)의 상하 마진이 겹칠 때

<br>

## 1. 인접 형제

인접 형제라는 말이 솔직히 마음에 들지는 않는다. <br>
틀린 말은 아니지만, 초보자가 알아듣기 애매한 번역이라서 처음에 공부할 때 말이 어려워서 힘들었다. 😥 <br>
그냥 같은 레벨에 가까이 있는 (바로 다음에 있는) 요소를 의미한다.<br>

![](https://media.vlpt.us/images/reasonz/post/053be8f4-519d-4736-b3ef-e3ed54eade54/margin-collapse.png)

`margin collasing` 확인을 위해 부모 박스와 <span style="color : #c5ccfa">자식 박스 test</span>, <span style="color:#7592d6">자식 박스 test2</span> 를 만들었다.

<br>

```html
<body>
    <div class="bg-container">
        <p class="items item1">margin test</p>
        <p class="items item2">margin test2</p>
    </div>
</body>
```

여기에서는 item1을 기준으로 보면 item2가 인접 형제가 되는 것이다.
item1과 item2에 각각 margin을 줘보도록 하자.

<br>

```css
.item1 {
    background: #c5ccfa;
    margin-bottom: 10px;
}

.item2 {
    background: #7592d6;
    margin-top: 10px;
}
```

위 코드와 같이 item1에는 margin-bottom으로 10px을 주었고 item2에는 margin-top을 10px 주었다.<br>
이론 상으로는 item1과 item2의 간격은 20px이 될 것 같지만 결과는 그렇지 않았다.<br>
<br>
![](https://media.vlpt.us/images/reasonz/post/d3c225ed-e6cc-4dbc-a3e1-da9d5347d5f4/margin-collapse2.png) 
<br>
margin이 겹쳐져 `10px만 적용된 모습`이다. <br> margin collapsing 현상이 일어나서 두 가지의 margin중 한 가지만 적용되었다. <br> 예시로는 동일한 마진 값을 주었지만 동일한 마진 값이 아니라 한쪽이 더 큰 마진 값을 가지고 있었다면 더 큰 마진 값 하나만 적용된다. <br> (css 상으로는 둘 다 마진을 가진것 처럼 나오지만 보이는 렌더링 결과는 그렇지 않다.)
<br>
<br>

## 2. 부모와 자식의 마진이 겹칠 때

부모와 자식의 마진이 겹치는 경우에도 margin-collapsing이 일어난다.<br>
일단, margin-collpasing이 일어나려면 `부모 블록 요소`에 border, padding, inline 콘텐츠가 없어야 한다.<br>
즉, 부모와 자식의 상단 또는 하단 위치가 딱 붙어있는 경우를 의미한다.<br>
<br>
![](https://media.vlpt.us/images/reasonz/post/88636481-52ab-49ed-95e4-896f74a388a4/margin-collapse3.png)
<br>
부모 박스 하나와 자식 박스 하나를 준비해보았다.

<br>

```css
.bg-container {
    background: #d4e9ff;
}

.item1 {
    background: #7592d6;
}
```

<br>

그 다음, 자식 박스 <span style="color:#7592d6">item1</span>에 margin-top으로 10px을 적용해 보았다. 
<br>
예상으로는 부모 박스(bg-container)에 상단 여백이 10px 만큼 남을 것이라고 생각할 것이다.

<br>

![](https://media.vlpt.us/images/reasonz/post/9cd16222-1ad1-411a-b0de-03fc3da16c74/margin-collapse4.png) 
<br> 예상하는 결과물은 위 사진과 같다. <br>
부모 박스 안에 있는 'margin test'라고 쓰여있는 박스 위에 margin-top이 10px만큼 생기는 것이다.

<br>

![](https://media.vlpt.us/images/reasonz/post/7243dd4f-2a0d-4e0e-bb05-75f93fc5fa44/margin-collapse7.png)
예상과는 달리 결과물은 부모 박스에 margin-top을 적용된 것처럼 렌더링되었다. (실제 부모 박스 css margin-top이 추가되는 것은 아니다.)<br>
부모와 자식이 겹쳐있을 때 나타나는 margin-collapsing 현상이다.<br>
예시로는 상단 마진을 들었는데, 하단 마진도 이와 동일하게 적용된다.
<br>

<br>

## 3. 높이가 0인 빈 블록(block)의 상하 마진이 겹칠 때

```html
<div class="bg-container">
    <div style="margin-bottom:10px;"></div>
    <div style="margin-top:10px;"></div>
    <div style="margin-bottom:10px;"></div>
    <div style="margin-top:10px;"></div>
    <div>margin collapse</div>
</div>
```

<br>

빈 div 박스 여러개에 margin-top 또는 margin-bottom값을 10px씩 주었다. <br> 
`<div>margin collapse</div>` 위에는 단순 계산하여 40px정도의 여백이 생기지 않을까?하는 추측을 해볼 수 있을것이다.<br>
<br>
![](https://media.vlpt.us/images/reasonz/post/00840ff4-5a57-4574-9567-91018cc3e254/margin-collapse8.png)
<br>
결과는 `margin-collpasing`현상으로 인해 10px만 적용되었다.

<br>

> 해결 방법
> height, min-height, max-height, padding, border 등을 넣어주면 된다.

<br>

### margin-collapsing 을 피하려면?

<br>
마진 콜랩싱은 블록 요소에서 적용되기 때문에<br>
1. float가 적용되어 있거나(clear 되지 않은)<br>
2. position : absolute 상태<br>
3. display : flex 또는 grid 일 때 내부 아이템들<br>
4. 요소에 padding, border, inline 요소 추가 등<br>

<br>

박스끼리 `겹치는 부분을 분리하는 작업`을 적용하면 해결할 수 있다.

---
