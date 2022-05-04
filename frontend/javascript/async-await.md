# 자바스크립트 async, await

자바스크립트의 `async`와 `await`은 [콜백함수](https://velog.io/@reasonz/2022.05.25-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98JS-callback-function), [Promise](https://velog.io/@reasonz/2022.05.03-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EB%8F%99%EA%B8%B0%EC%8B%9D%EA%B3%BC-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%8B%9D)와 같이 비동기처리를 할 수 있는 방법중 하나이다.
async는 function 앞에 선언하여 사용된다. 이 외에는 일반 함수 사용과 비슷하게 사용된다.
async 키워드로 작성된 함수 안에서는 await 키워드를 사용할 수 있다.
await은 반드시 async 함수에서만 유효하기 때문에 async 함수 바깥에서 사용시 에러가 발생된다.
`async`함수는 항상 `Promise`를 반환한다. 반환값이 promise가 아니면 암묵적으로 promise가 된다.

<br>

## async 사용법

```javascript
async function myFc() {
  return '안녕'; // Promise.resolve('안녕')과 같다
}

myFc().then(alert);
```

function 앞에 예약어 async를 붙여준다. 이제 이 함수는 항상 Promise를 반환하게 된다.
Promise를 명시하지 않더라도 반환값은 항상 promise가 된다.

```javascript
async function myFc() {
  console.log('async await!');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('2초 후에 실행돼요.');
      resolve();
    }, 2000);
  });
}

myFc().then(function () {
  console.log('2초후 실행이 완료되면 이게 출력될 거예요.');
});
```

![](https://velog.velcdn.com/images/reasonz/post/59e22ac8-0d31-4a39-a555-fe1ce526c359/image.png)

<br>

## await 사용법

async 함수 안에서 작성되야한다.
async 함수 바깥에서 사용시 `'await' is only allowed within async functions`에러가 발생한다.
await은 이름에서도 알 수 있듯이 기다린다는 의미인데 Promise가 처리 완료될 때까지 기다리는 예약어이다.

```javascript
async function myFc() {
  const promise = new Promise((res) => {
    setTimeout(() => {
      res('완료되면 이 문구가 전달돼요');
    }, 1000);
  });

  let result = await promise;
  let withoutAwait = promise;
  console.log(withoutAwait); //Promise {<pending>}
  console.log(result); // 완료되면 이 문구가 전달돼요
}

myFc();
```

await 키워드로 받은 promise값과 await 키워드 없는 promise값을 console에 출력해보았다.
`await` 키워드를 붙인 변수는 myFc에서 setTimeout완료 후 전달된 문구가 출력되는 것을 확인할 수 있었고 await 키워드가 붙지 않은 `withoutAwait` 변수의 경우 Promise 객체값이 출력되었다.
promise에서 pending상태는 비동기처리의 성공, 실패 여부가 결정되지 않았을 때 나타나는 값이다.
즉, await는 promise의 결과값을 기다렸다가 완료되면 그 값을 받아오게 된다.

<br>

## 그렇다면 실패를 보내면 어떨까?

reject를 보냈을 때 await의 결과를 확인해보자.

```javascript
async function myFc() {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      rej('실패☹');
    }, 1000);
  });

  let result = await promise;
  console.log(result);
  console.log('이거 출력안됩니까');
}

myFc();
```

실패처리되면 에러가 발생한다. console에는 에러가 출력됐다. (Uncaught (in promise) 실패☹)
또, 에러가 발생하면 코드 실행이 멈추기 때문에 이후 작성된 코드는 실행되지 않는다.
위에 작성된 `console.log('이거 출력안됩니까');`라는 코드는 실행되지 않는다는 의미이다.
이렇게 에러가 발생하는 것이 싫다면 try..catch문을 함께 사용하면 된다.

```javascript
async function myFc() {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      rej('실패☹');
    }, 1000);
  });

  try {
    let result = await promise;
    console.log(result);
  } catch {
    console.log('실패하면 이거 출력해주세용!');
  }
}

myFc();
```

try, catch문을 사용해서 try 안의 코드가 실패했을 때 처리할 코드를 catch문에 적으면 된다.

```javascript
async function myFc() {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      rej('실패');
    }, 1000);
  });

  let result = await promise;
  return result;
}

myFc()
  .then((result) => {
    console.log(result);
  })
  .catch(() => {
    console.log('실패하면 이거 출력해주세용!');
  });
```

에러처리 할 때 `then, catch`를 사용해도 try...catch와 동일하게 사용할 수 있다.

> 모던 자바스크립트 설명에선 놀라울 정도로 이해하기 쉽다고 했는데 처음 접한 나에겐 너무 어려웠다.ㅋㅋㅋ
> 비동기처리를하는데 콜백, promise, async/await을 사용할 수 있다는 정도와 각 비동기처리 방식의 사용방법 정도만 숙지해놓고 찾아보면서 익혀야될 것 같다.

<br>

---

> 참고 자료

> [MDN AsyncFunction 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

> [MDN async function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

> [모던 자바스크립트 async와 await](https://ko.javascript.info/async-await)
