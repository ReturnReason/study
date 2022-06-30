## defaultProps 설정하기

props를 지정해서 보내지 않은 경우 기본값을 설정할 수 있다.

```jsx
function MyComp(props) {
  return <div>Hello! {props.name}</div>;
}

MyComp.defaultProps = {
  name: '익명',
};
```

MyComp라는 컴포넌트를 만들었다. 이 컴포넌트는 props를 받아서 props의 name을 렌더링해 보여줄 것이다.

```jsx
<MyComp name="아이유" />
```

![](https://velog.velcdn.com/images/reasonz/post/282e66d3-0bcf-4ebc-b319-4a7bc7a54dcc/image.png)
MyComp 컴포넌트에 name로 아이유를 전달했다.
화면에 Hello! 아이유라고 나타난다.
만약 props로 name값을 넘기지 않으면 어떻게 될까?

```jsx
<MyComp />
```

![](https://velog.velcdn.com/images/reasonz/post/7cfb8795-c3b8-473f-af19-c93218423ffa/image.png)

name 값을 넘기지 않았기 때문에 defaultProps로 설정한 '익명' 이라는 값이 기본값으로 설정되어 렌더링 된 것을 확인할 수 있다.
아무런 값을 보내지 않았을 때 기본 값을 설정하고 싶다면 `defaultProps` 를 사용하면 된다.

## props.children

컴포넌트 태그 사이에 넣은 값을 조회할 때 사용한다.
`props.children`을 사용하여 조회할 수 있다.
어떤 상황에 사용할 수 있는지 살펴보자.

```jsx
<MyComp>
  <div>My Comp</div>
  <InnerComp name="첫번째" />
  <InnerComp name="두번째" />
</MyComp>
```

MyComp 안에 InnerComp 컴포넌트를 자식 컴포넌트로 2개 추가하였다.

```jsx
function MyComp(props) {
  return (
    <div>
      <h1>My component</h1>
    </div>
  );
}
```

MyComp는 My component라는 h1태그를

```jsx
function InnerComp(props) {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  );
```

InnerComp의 컴포넌트는 props를 받아서 name를 h1 태그에 출력해주는 컴포넌트이다.
MyComp 안에 InnerComp를 넣고 렌더링 화면을 확인해보았다.

![](https://velog.velcdn.com/images/reasonz/post/248f3ef2-ba04-483a-91ee-302904720926/image.png)

```css
/* 예상 렌더링 화면 */
My component
My Comp
첫번째
두번째
```

예상대로라면 MyComp의 `MyComponet` 아래에 div 태그의 `My Comp`, InnerComp의 name props `첫번째`, `두번째`가 나타나야할 것 같지만, 실제 화면 결과는 MyComp 컴포넌트에 있는 h1 태그만 출력되었다.
이런 상황에 사용할 수 있는 것이 props.children이다.

```jsx
function MyComp(props) {
  return (
    <div>
      <h1>My component</h1>
      {props.children}
    </div>
  );
}
```

현재 MyComp가 부모 그 안에 div태그와 InnerComp 컴포넌트가 있기 때문에 MyComp 컴포넌트에 `{ props.children }`을 작성해주면 된다.
또는 비구조화 할당을 사용해서 다음과 같이 작성할 수도 있다.

```jsx
/* 비구조화 할당 */
function MyComp({ children }) {
  return (
    <div>
      <h1>My component</h1>
      {children}
    </div>
  );
}
```

> 참고 자료

> [props 를 통해 컴포넌트에게 값 전달하기](https://react.vlpt.us/basic/05-props.html)
