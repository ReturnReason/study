# 자바스크립트 Promise

자바스크립트는 동기적인 언어이지만 setTimeout이나 이벤트리스너와 같은 함수를 사용할 때 비동기적으로 동작하곤 한다. 프로미스는 비동기식 코드를 처리하는 패턴중 하나라고 할 수 있다.
프로미스를 사용하면서 공부해보기 전에 동기식과 비동기식에 대해 조금 정리해보고자 한다.

<br>

### asynchronous (동기)

동기적인 것은 코드를 한줄 한줄씩 실행하는 것을 의미한다. (한번에 한개씩만)
자바스크립트는 여기에 해당되는 언어이다.
그렇기 때문에 한줄의 코드가 연산이 오래 걸리는 경우 다음 코드가 실행되지 않는 일이 발생할 수 있다. 예를 들면, 한번에 한명씩만 들어갈 수 있는 문에 차례대로 한사람씩 들어가는 것과 비슷하다고 볼 수 있다.

<br>

### synchronous (비동기)

비동기적이라는 것은 동기와 반대되는 의미이다.
동기적으로 실행되는 코드는 한번에 한줄씩 코드를 읽어나갈 것이다. 그렇기 때문에 동기적으로 실행되는 한 줄의 코드가 어려운 연산 등으로 인해 오랜 시간 소요한다면 이 코드가 완료될 때까지 다음 코드는 실행하지 못하는 상태가 된다. 웹 사이트가 먹통이 되거나 다른 작업이 진행되지 않는 불상사가 발생할 수도 있다.
이때 비동기식으로 실행된다면 이러한 문제를 해소할 수 있다. 오래 걸리는 코드가 있다면 이 코드만을 따로 대기실에 넣고 완료되기 전까지는 다음 코드를 순차적으로 실행하도록 하여 앞선 동기식 실행의 단점을 보완할 수 있다.
자바스크립트는 동기적 언어이지만 비동기적으로 사용할 수 있는 이벤트리스너나 setTimeout과 같은 함수를 사용하면 비동기적으로 실행이 가능하다. 즉, 자바스크립트는 웹 API를 사용해야만 비동기적 실행이 가능해지는 것이다.

<br>

## Promise

[어제 공부했던 콜백 함수](https://velog.io/@reasonz/2022.05.25-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98JS-callback-function)의 단점인 가독성이 떨어지는 일명 콜백지옥 현상이 나타나는 문제가 있었다.
이런 문제를 해결하는 방법중 하나가 Promise이다. 프로미스는 비동기 작업의 완료와 실패를 나타내는 객체이다. 성공했을 때 실행할 것을 `.then()`에 작성하고 실패했을 때 실행할 코드를 `.catch()`에 작성하면 된다.

<br>

```javascript
const promise = new Promise((resolve, reject) => {
  resolve(); // resolve처리
});

promise
  .then(() => {
    console.log('성공했어요');
  })
  .catch(() => {
    console.log('실패했어요');
  })
  .finally(() => {
    console.log('실패 또는 성공시');
  });
```

`.then`에 작성한 것은 `resolve`됐을 때 실행될 코드, `.catch`에 작성한 것은 `reject`됐을 때 실행될 코드이다. `.finally`는 프로미스의 성공, 실패와 상관없이 지정된 콜백 함수를 실행한다.
`.finally`는 프로미스가 처리되면 무조건 한 번은 실행할 것을 작성하면 된다.

```javascript
const test = fetch('#', {
  method: 'GET',
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

보통 서버와 관련된 작업을 할 때 사용하는 fetch 메소드와 Promise가 연관이 있어서 쓸모있는 코드는 아니지만 프로미스 이해를 위해 작성해보았다.
`fetch()`메소드는 Promise 객체를 반환하기 때문에 위와 같이 사용될 수 있다.
<br>

## 콜백 함수와 다른 점이 무엇인가?

비동기를 처리한다는 점에서 두가지는 공통된다. 그럼에도 콜백함수에서 발생할 수 있는 일명 콜백지옥을 Promise에서는 발생하지 않는다.
즉, Promise는 콜백 지옥이라 불리는 뎁스가 깊어져 가독성이 나빠지는 부분이 어느정도 해소된다고 볼 수 있다. 그렇다고 콜백함수를 무조건 대신해서 사용할 수 있는 상위 함수는 아니다.
적재적소 또는 취향에 따라 두가지 알맞게 사용하는 것이 좋다.

### Promise의 state

프로미스의 resolve, reject 여부를 가리기 전의 상태는 pending이다.
성공이 되면 프로미스는 fulfilled 상태가 되고 실패하면 rejected상태가 된다.
또, 이미 처리된 Promise의 상태를 다시 변경할 수는 없다.

![](https://velog.velcdn.com/images/reasonz/post/acb12fee-085d-43a5-b519-1f6846d56868/image.png)

▲ 프로미스의 resolve, reject가 판정되기 전 상태이다.

![](https://velog.velcdn.com/images/reasonz/post/36087e85-e916-4fe1-901d-a62f7ded7b00/image.png)

▲ 프로미스가 resolve(성공)되었을 때 상태이다.

![](https://velog.velcdn.com/images/reasonz/post/299bc115-d480-4b2f-b5c5-b83d00afbcb9/image.png)

▲ 프로미스가 reject(실패)했을 때 상태이다.

![](https://velog.velcdn.com/images/reasonz/post/00f4e43f-45dc-4fd6-a84e-7b739e5f7252/image.png)

프로미스를 테스트 하는 적절한 [코드 예시](https://github.com/mdn/js-examples/blob/master/promises-test/index.html)도 참고해보면 좋을 것 같다.

> 프로미스에 대한 이해가 생각보다 어려웠다.
> 사용하는 방법은 잘 알겠지만 아직 프로미스를 사용해서 코드를 작성한 경험이 없어서 그런 것 같다. (공부하면서 알았지만 이전에 fetch는 써본적이 있으니 그거 빼면ㅋㅋ)
> 개인적으로 조금 더 공부해봐야 완전히 이해가 가능할 것 같다.😥

<br>

---

> 참고 자료

[MDN Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[MDN Using promises](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)

[Zerocho Blog - ES2015(ES6) Promise](https://www.zerocho.com/category/ECMAScript/post/5770c27e6a8e09150013f0f7)

[MDN Promise finally()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
