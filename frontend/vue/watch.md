# Watch

watch는 데이터의 값이 변경이 일어나는 것을 감시, 인지하는 역할을 하는 속성이다.
watch는 값이 변경이 일어났을 때 특정 행위를 할 수 있도록 한다.

```html
<template>
  <div>
    <h1>Watchers</h1>
    <h2>current money :: {{ money }}</h2>

    <div>
      <button @click="money += 100">earn money</button>
      <button @click="money -= 100">spend money</button>
    </div>
  </div>
</template>
```

```javascript
data() {
  return {
    money: 0,
  };
},
```

먼저, watch를 사용하기 전에 간단하게 html 구조를 작성했다.
버튼을 클릭하면 money가 100씩 증가하거나 감소한다.

![](https://velog.velcdn.com/images/reasonz/post/8ee3af57-39c7-48a2-a655-c45c95cbb581/image.png)

여기에서 money의 값이 변경이 일어날 때마다 변경이 됐는지 안됐는지 감시할 수 있는 속성으로 watch를 사용할 수 있다.

## watch 사용하기

watch는 오브젝트 형태로 사용할 수 있고 선언한 변수를 가져와서 사용할 수 있다.
선언한 변수를 가져와서 사용할 때는 메서드 형태로 작성한다.

```javascript
data() {
    return {
      money: 0,
    };
  },
watch : {
  money(newValue, oldValue){
      console.log(newValue, oldValue);
  }
},
```

메서드에는 기본적으로 값을 넘겨받을 수 있다.
첫번째 인자는 바뀐 값, 두번째 인자는 바뀌기 전 값을 받아올 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/764708b3-a18e-412f-b195-f4f5c0762b31/image.gif)

바뀐 값과 이전 값을 확인할 수 있다.

```javascript
money(newValue) {
  if (newValue >= 2000) {
    console.log('mission complete!');
  }
},
```

newValue의 값이 2000이상이 되면 mission complete!라는 문구가 콘솔에 찍힌다.

현재는 콘솔에 로그를 찍어보는 정도로 확인했지만, watch를 사용하면 어떠한 함수를 실행시키거나 다른 데이터 값을 변화하는 등의 명령도 사용할 수 있다.

지금은 if문으로 인해 money가 2000이 넘어가면 계속 mission complete! 메시지가 출력되는데 spend money를 했을 때는 출력할 필요가 없기 때문에 `newValue >= 2000 && newValue > oldValue` 로 조건식을 변경해주면 된다.

```javascript
watch: {
  money(newValue, oldValue) {
    if (newValue >= 2000 && newValue > oldValue) {
      console.log('mission complete!');
    }
    if (oldValue < 1500 && newValue < oldValue) {
      console.log('save Money!');
    }
  },
},
```

또, money가 1500 미만이면서 이전 money보다 현재 가진 money가 작으면 save money 메시지를 출력한다.

![](https://velog.velcdn.com/images/reasonz/post/f29de0b4-f5c6-485e-a0b6-de2ca27dc1b3/image.gif)

데이터를 바로바로 감시해주지만 데이터가 오브젝트 형태이면 조금 달라질 수 있다.

## 데이터가 오브젝트 형태일 때

```html
<div>
  <h3>{{ receit }}</h3>
  <button @click="receit.food += 500">buy food</button>
</div>
```

버튼을 누르면 receit의 food가 500씩 증가한다.

```javascript
data() {
  return {
    money: 0,
    receit: {
      food: 3000,
      fee: 2000,
      fare: 10000,
    },
  };
},
```

```javascript
watch: {
    receit(newValue, oldValue) {
      console.log('영수증에 값 변화가 있음.', newValue, oldValue);
    },
}
```

receit이라는 오브젝트와 receit을 감지하는 watch를 만들었다.
이후, buy food 버튼을 눌러서 food의 값을 변화시켜보았다.

![](https://velog.velcdn.com/images/reasonz/post/10c871a9-82f7-4581-bb99-7ecbb1c263f5/image.png)

하지만, watch가 호출되지 않았는지 콘솔에는 아무런 출력이 없다.

## watch로 오브젝트 감시하기

watch가 오브젝트를 감지하지 못하고 있다는 것이다.
오브젝트 안에 있는 프로퍼티의 변화까지 감지하기 위해서는 추가적인 속성을 부여해야 한다.

watch를 메서드 형태로 선언하는 것이 아닌 오브젝트 형태로 선언해야 한다. 또, deep이라는 속성도 true값으로 설정해야 한다.

```javascript
watch: {
  receit: {
    handler(newValue, oldValue) {
      console.log('영수증에 값 변화가 있음.', newValue, oldValue);
    },
      deep: true,
  },
```

receit을 기존 함수 형태에서 객체 형태로 변경하고
receit안에 handler라는 함수를 작성하여 이전 watch 사용과 동일하게 newValue, oldValue를 받아올 수 있다.
여기서 오브젝트 안에 있는 프로퍼티 값을 감지하기 위해서는 `deep : true`를 작성해주어야 한다.

![](https://velog.velcdn.com/images/reasonz/post/fafaaa8a-d859-4fc2-bb8c-6b81b01f14f0/image.png)

이제 watch가 오브젝트의 값 변화를 인지할 수 있게 된다.

## 처음 렌더링 됐을 때 watch 실행하기

watch는 기본적으로 값이 들어있는 상태에서는 발동하지 않는다.
이후 값이 바뀔때만 감지를 하고 발동이 되는데 최초 렌더링 됐을 때도 watch가 발동되게 하고 싶다면 `immediate` 값을 true로 설정하면 된다.

```html
<input type="text" v-model="userName" />
```

```javascript
data() {
  return {
    userName: '아이유',
  };
},

```

```javascript
watch: {
  userName: {
    handler(newValue) {
      console.log(newValue);
    },
  },
},
```

userName이라는 변수를 하나 만들고 watch를 사용하여 변경된 값을 감지하도록 작성하였다.

![](https://velog.velcdn.com/images/reasonz/post/de11e4d7-9fa1-46c6-ac04-0fd02cbad60b/image.png)

현재는 값이 변경이 될 때마다 감지는 하고 있지만, 처음 화면이 렌더링 됐을 때도 감지하고 싶다면 immediate를 설정해주면 된다.

```javascript
userName: {
  handler(newValue) {
    console.log(newValue);
  },
    immediate: true,
},
```

immediate의 값이 true이면 처음 화면이 렌더링 됐을 때 userName이 콘솔에 찍히게 된다.

![](https://velog.velcdn.com/images/reasonz/post/c894b0b2-75cb-415d-9d30-c240e284b3c4/image.png)

이전과 달리 화면이 렌더링이 됐을 때 "아이유"라는 글자가 가장 먼저 찍혀있다. 이후 값을 변경해도 정상적으로 잘 동작한다.

![](https://velog.velcdn.com/images/reasonz/post/d8939b4a-f43e-4236-8c3e-37f957b63ebe/image.gif)

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #18] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=f9Nn4j9ieic&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=18&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)
