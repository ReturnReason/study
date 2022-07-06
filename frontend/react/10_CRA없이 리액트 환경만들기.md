> CRA는 어떻게 동작하는걸까?
> 제로초님 강의 영상을 기반으로 공식 문서를 일부 참고하여 작성하였다.

## creat-react-app (CRA)

Create React App(CRA)은 React 애플리케이션 환경을 세팅해주는 방법으로 webpack이나 babel같은 도구를 설치하고 구성할 필요가 없어서 편리하다는 장점이 있다.

> CRA는 매우 편리하지만 어떻게 동작하는지 알기 어렵기 때문에 이번에 CRA 없이 리액트 환경을 만들어 보며 공부해보고자 한다.

### webpack은 무엇일까?

웹팩 공식 홈페이지에 따르면 자바스크립트 애플리케이션을 위한 `정적 모듈 번들러` 라고 소개하고 있다.
하나 이상의 번들을 생성하는 Dependency Graph를 만든다고 하는데 번들과 Dependency Graph에 대해서도 살펴보자.

### 모듈(module) 🧶

하나의 파일을 의미한다. 예를 들어, 스크립트 파일 하나는 모듈 하나와 같다.

### 번들(bundle) 🎁

번역하면 `묶음`이라는 뜻을 가진 번들은 무언가 묶여있는(끼여있는) 패키지를 의미한다.
모든 모듈을 묶은 파일을 번들이라고 한다.

### Dependency Graph 🎭

직역하면 종속(의존) 그래프 정도로 해석할 수 있을듯 하다. 디펜던시 그래프는 하나의 파일이 다른 파일에 의존할 때마다 웹팩에서는 이것을 의존성으로 취급하여 한 개 이상의 번들을 생성하게 된다.

즉, 웹팩에서는 Dependency Graph를 만들어 bundle을 생성한다. 여러개의 정적 모듈을 하나의 파일로 만들어 주는 것이다.

웹팩에서 의미하는 번들은 여러개의 파일을 하나의 파일 안에서 사용할 수 있도록 하는 것을 의미한다.

## Webpack은 왜 쓸까?

하나의 html 태그에 스크립트 태그를 여러번 사용해서 여러개의 컴포넌트를 만들 수도 있을 것이다.
하지만, 하나의 파일에 많은 스크립트 코드가 들어가게 되면 유지보수가 힘들 뿐더러 코드 줄이 매우 길어지게 된다.

> 여러개의 자바스크립트 파일이 있더라도 하나의 자바스크립트 파일로 만들어주기 때문에 webpack을 사용한다.

webpack을 사용하면 파일을 하나로 합치면서 babel도 함께 사용할 수 있다거나, 중간에 필요없는 코드(console.log와 같은)도 삭제할 수 있다.

> Webpack을 하기 위해서는 node가 필요하다.

node는 자바스크립트 실행기(런타임)이다.
(서버가 아님! 🤔)

React에서 node를 알아야 한다는 것은 webpack을 돌리기 위핸 자바스크립트 런타임을 알아야 한다는 의미와 같다.

## 리액트 기본 환경 설정과 웹팩 사용해보기

웹팩을 사용해보기 전에 필요한 패키지들을 먼저 설치해보자.

### 1. 필요한 패키지 설치하기

폴더를 하나 만들고 해당 폴더 안에서 터미널로 아래 코드를 입력해보자.

```
npm init
```

npm init을 입력하면 package name을 원하는 이름으로 입력후 나머지는 스킵해도 된다. (필요한게 있다면 작성)
그러면 `package.json` 파일이 생성된다.

```js
/* package.json */
{
  "name": "webpack-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

이곳에 react 개발에 필요한 모든 패키지를 작성해주면 된다.

react 개발에 필요한 패키지를 설치해야 하므로 터미널에 아래 코드를 작성해준다.

```
npm i react react-dom
```

npm으로 react와 react DOM을 설치한다는 의미이다. 설치가 되면 json 파일에 dependencies 에 추가가 된다.

```js
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

이제 리액트 개발에 필요한 `webpack`도 설치해보자.

```
npm i -D webpack webpack-cli
```

-D 는 개발할 때만 필요하기 때문에 붙여준 명령어이다. webpack과 webpack-cli 를 모두 설치해주었다.

```js
"devDependencies": {
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0"
}
```

설치하면 devDependencies에 기록된다.
devDependencies에 적혀있는 것은 개발용 패키지들이다.

### 2. 리액트 환경 기본 설정하기

> create-react-app 없이 리액트 환경을 구성하는 방법이다.

`webpack.config.js` 파일을 하나 생성한다.

```js
/* webpack.config.js */
module.exports = {};
```

`client.jsx` 파일도 하나 생성한다.

```jsx
/* client.jsx */
const React = require('react');
const ReactDom = require('react-dom');
```

react와 react DOM을 불러오는 코드이다.
노드의 module 시스템을 불러오는 require 를 사용하여 불러올 수 있다.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/app.js"></script>
  </body>
</html>
```

html 파일을 만들고 기본 html 구조와 `id="root"` 를 가진 div 태그, script src에 `./dist/app.js` 를 작성해준다.
이게 리액트의 기본 설정 방법이다.

```jsx
/* client.jsx */
const React = require('react');
const ReactDom = require('react-dom');

/*class App extends React.Component {
  state = {
    
  };
  render(){

  }
}
여기에 써도 되기는 한다.
*/

ReactDom.render(<App />, document.querySelector('#root'));
```

client.jsx 파일에 `ReactDom.render(<App />, document.querySelector('#root'));` 을 작성해준다.
이 파일 안에서 App 컴포넌트를 작성하는 것도 가능하지만 컴포넌트가 많아지는 경우 관리하기 힘드므로 새로운 파일을 만들어서 코드를 작성하는 것이 좋다.

```jsx
/* App.jsx */
const React = require('react');
const { Component } = React;

class App extends Component {
  state = {};
  render() {}
}

module.exports = App;
```

App.js 파일을 만들고 필요한 코드를 작성해주었다.
const 로 선언한 부분은 패키지나 라이브러리와 같이 이 App.js에서 필요에 의해 사용해야 하는 파일이므로 작성해주어야 한다.

`module.exports = App;` 는 이 `App.jsx` 파일을 다른 컴포넌트 등에서도 불러올 수 있도록 하는 코드이다. (노드의 모듈 시스템)
예를 들면, 다른 jsx 파일 등에서 다음 코드를 작성하여 불러올 수 있게 된다.

```js
const App = require('./App');
// 쪼갠 파일을 불러올 수 있다.
```

이렇게 사용하면 예를 들어 100개의 파일 중 2개의 파일만 사용한다고 가정했을 때 2개만 불러오고 남은 98개의 파일은 사용하지 않을 수 있게 된다. (필요한 것만 사용할 수 있어 효율적이다.)

> 예전에는 100개의 파일 중 일부만 사용한다 하더라도 모든 파일을 다 불러와야 해서 비효율적이었다. 모듈 시스템으로 인해 필요한 파일만 불러와서 사용할 수 있게 되었다.

다음 스크립트 태그를 보면 src에 들어갈 수 있는 자바스크립트 파일은 1개뿐이다.

```html
<script src="./dist/app.js"></script>
```

코드들을 파일 단위로 쪼개놓으면 개발하기는 편해진다.
하지만 html에서 인식하는 것은 자바스크립트 파일이 많더라도 소스 안에는 딱 `1개의 자바스크립트 파일만`을 담을 수 있다.
그렇기 때문에 `여러개의 js 파일을 사용해야 한다면` 하나의 파일로 합쳐야 html 파일에서 인식이 될 것이다.
그렇지 않으면 옛날 방식처럼 하나의 파일에 모든 js 코드를 작성해야 한다.

> 이러한 문제를 해결하기 위해 등장한 것이 `webpack` 이다.

Webpack은 `webpack.config.js` 에서 모든 것을 설정할 수 있다.

## 웹팩의 entry와 output

현재 `App.jsx` 파일 하나만으로 필요한 jsx 을 모두 `index.html` 파일에서 실행할 수 있도록 하는 것이 필요하다.
즉, 필요한 jsx 파일을 하나의 js 파일로 합쳐서 App.js로 만들어야 한다.
이때 웹팩의 entry와 output을 설정해주면 위와 같은 문제를 해결할 수 있다.

```js
/* webpack.config.js */
const path = require('path'); // 노드에서 경로 조작을 위해 제공하는 모듈

module.exports = {
  name: '웹팩설정이름',
  mode: 'development', // 실서비스에서는 production으로 변경하면 된다.
  devtool: 'eval', // (성능) 빠르게

  /* 웹팩에서 가장 중요한 entry와 output */
  entry: {
    // 입력
    app: ['./client.jsx', 'App.jsx'], // 합칠 파일들
  },
  output: {
    // 출력
    path: path.join(__dirname, 'dist'), // 현재 폴더 경로와 dist를 합쳐준다. (파일 경로를 귀찮게 작성하지 않아도 된다.)
    filename: 'app.js',
  },
};
```

웹팩 파일에서 `entry`와 `output` 부분이 가장 중요하다.

entry는 `입력` 즉, 파일들을 하나의 파일로 만들기 위해 사용될 재료들을 작성하는 곳이라고 보면 된다.
위 코드에서는 client.jsx 파일과 App.jsx 파일을 합치기 위해 배열 형태로 `['./client.jsx', 'App.jsx']` 라고 작성해주었다.

output 부분은 `출력` 즉, 하나의 js 파일로 만들기 위한 내용을 적어주면 된다.

#### 그런데 client.jsx 파일에서는 이미 App.jsx 파일을 불러오는 코드가 있다.

```jsx
/* client.jsx */
const React = require('react');
const ReactDom = require('react-dom');

const App = require('./App'); // 이미 불러오고 있음.

ReactDom.render(<App />, document.querySelector('#root'));
```

webpack에서는 어떤 파일이 무엇을 불러오는지 파악을 한다. 이미 다른 파일이 불러오고 있는 파일은 적어줄 필요가 없다. 적지 않아도 웹팩이 알아서 불러오기 때문이다.

```js
/* webpack.config.js */
app: ['./client.jsx'];
```

그러므로 App.js는 작성하지 않아도 된다.
App.js를 불러오는 파일인 `client.jsx` 만 적어주어도 된다는 의미이다.

> webpack.config.js에 작성할 때 `.jsx` 확장자도 생략가능하다. `resolve` `extensions` 옵션에 작성해주면 된다.

```js
resolve: {
    extensions: ['.js', '.jsx'],
},

entry: {
    app: ['./client'],
},
```

extensions에 작성한 파일 확장자를 알아서 찾아준다. 예를 들어 client.js 파일이 있는지 확인하고 없으면 client.jsx 파일이 있는지 확인한다. 있으면 entry로 해당 파일을 사용하는 것이다.
웹팩은 entry에서 찾은 파일들을 output에 작성한 파일로 만들어준다.

## 웹팩 빌드하기

터미널에 webpack 명령어를 그냥 사용하면 `webpack: command not found` 와 같은 에러문구가 나타난다.

`npx webpack` 명령어를 사용하거나,
`package.json`에서 명령어 설정을 할 수 있다.

```js
/* package.json */
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development"
},
```

`npm run dev` 또는 `npx webpack`으로 웹팩 빌드를 할 수 있다.
그러면 dist 폴더에 웹팩으로 빌드된 jks 파일이 생성된다.

현재는 빌드하면 에러가 하나 발생한다.

```js
// 에러가 발생하는 부분
ReactDOM.render(<App />, document.querySelector('#root'));
```

jsx는 자바스크립트 문법이 아니기 때문에 babel을 사용해야 한다.
웹팩에서도 바벨을 추가로 세팅해야 jsx를 처리할 수 있다. (바벨 안에서도 jsx 설정을 해야 사용할 수 있다.)

## babel 설치하기

```
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

`@babel/core` 는 바벨의 기본적인 구성이 들어있는 라이브러리 이다.
`@babel/preset-env` 는 사용자의 브라우저에 맞게 알아서 최신 문법을 이전 문법으로 지원할 수 있도록 도와주는 라이브러리이다.
`@babel/preset-react`가 있어야 jsx를 지원할 수 있다.
`babel-loader`는 babel과 webpack을 연결해준다.

```js
/* package.json */
"devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^8.2.5",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0"
}
```

이제 `webpack.config.js` 파일에서 다음과 같은 코드를 추가해주면 된다.

## 다시 웹팩 빌드하기

```js
module: {
  rules: [
    {
      test: /\.jsx?/, // js, jsx 파일에
      loader: 'babel-loader', // 바벨을 적용해서 옛날 브라우저에서도 돌아갈 수 있게
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        // 바벨 옵션
      },
    },
  ],
  },

```

다시 `npx webpack`으로 빌드해보면 에러없이 웹팩으로 빌드가 완료된다.

> 웹팩에 대해서 무지했었는데 이번에 실습하면서 웹팩을 왜 사용하는지, 어떻게 사용하는지 방법을 조금이나마 알게된 것 같다.
> 아직은 작성해야되는 내용이 많아서 외워서 사용하지는 못하겠지만 다음에 봤을때 아 이건 이래서 사용하겠구나 정도 유추는 가능할 것 같다. ㅎㅎ 복습해야지..🤔

---

> 참고 자료

[Create React App](https://create-react-app.dev/docs/getting-started)

[Webpack](https://webpack.kr/concepts/dependency-graph/)

[코어 자바스크립트 - 모듈](https://ko.javascript.info/modules-intro)

[ 제로초 React 기본 강좌 2-3. 웹팩 설치하기](https://www.youtube.com/watch?v=66_D4RYpFqY&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=14&ab_channel=ZeroChoTV)
