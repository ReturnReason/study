> 어제 [CRA 없이 리액트 환경을 구성하는 방법](https://velog.io/@reasonz/2022.07.06-create-react-app-%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)에 대해서 공부해보았다.
> 처음 접했을 때 웹팩 설정이 너무 복잡해 보여서 더 어렵게 느껴졌다.
> 많이 사용해서 익숙해질 필요가 있을듯 해서 어제에 이어 하나씩 차근차근 살펴보고자 한다.

![](https://velog.velcdn.com/images/reasonz/post/f6ebcaa8-f326-4268-9025-0d7c732a9e3b/image.png)

> ## 웹팩 공식문서 Getting Started - Basic Setup 실습해보기

**1. 폴더 생성 후 npm 초기화하기**

```
npm init
```

**2. 웹팩 사용을 위해 필요한 라이브러리 설치**

```
npm i webpack webpack-cli -d
```

**3. 만든 폴더 안에 `index.html` 파일 만들기
`src 폴더 생성 후 src 폴더 안에 index.js` 만들기 **
![](https://velog.velcdn.com/images/reasonz/post/f10ce4ed-a3c8-4649-9cc2-88387c29386b/image.png)

다음과 같은 프로젝트 디렉토리 구조를 가진다.
![](https://velog.velcdn.com/images/reasonz/post/d2544684-895e-4661-ad10-dc0ec2fe7042/image.png)

** 5. src폴더의 `index.js` 파일에서 다음과 같은 코드를 작성한다. **

```js
function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' '); // Lodash 라이브러리 필요

  return element;
}

document.body.append(component());
```

lodash 라이브러리가 필요한 코드가 포함되어 있다.
위 코드 실행을 위해 index.html 파일에서 lodash cdn 스크립트를 작성할 것이다.

** 6. index.html 파일에 다음과 같은 코드를 작성한다. **

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>웹팩 시작해보기</title>
    <script src="https://unpkg.com/lodash@4.17.20"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>

```

VSCODE의 확장 프로그램인 라이브 서버로 동작시켜보면 `Hello webpack` 문구가 나타난다.

> 여기까지는 그냥 흔한 자바스크립트, HTML 사용방법이나 마찬가지다.

** 7. package.json 파일 작성하기 **

```js
/* package.json */
{
  "name": "webpack-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0"
  }
}

```

웹팩 공식문서에 따르면 패키지를 private로 표기하고 main항목을 제거하기 위해서는 `"private": true` 를 package.json 파일에 추가해야 한다고 한다. (실수로 코드가 게시되는 것을 방지)
true값 일때는 퍼블리시 명령을 거부한다고 하는데 아직 이부분은 자세히 모르므로 일단 그렇구나 하고 넘어가기로 했다.

`5번`과 `6번` 과정을 보면 index.js 파일은 lodash 라이브러리가 필요하다.
이 부분이 `암시적 종속성`이 있다고 웹팩 공식문서에서는 서술하고 있다.

## 암시적 종속성이 뭘까?

`암시적` : 알지 못하는 사이에 어떤 관념이나 감각 따위를 일으키게 하는 것
`종속성` : 문장의 구성 성분으로서 다른 부분에 대하여 수식적, 조건적 접속 등의 관계를 가지는 성질

사전적 의미는 위와 같다.
즉, 알지 못하는 사이에 코드간에 서로 어떠한 관계를 가진다는 의미로 해석할 수 있을 것 같다.

> 그렇다면, 앞서 작성한 코드의 어떤 부분이 **암시적 종속성**이 있을까?

앞서 작성한 index.js 파일의 코드를 살펴보자

```js
/* index.js */
element.innerHTML = _.join(['Hello', 'webpack'], ' ');
```

위 코드는 Lodash 라이브러리가 필요한 코드이다.

```html
<!-- index.html -->
<script src="https://unpkg.com/lodash@4.17.20"></script>
```

그리고 Lodash 라이브러리를 설치하거나 cdn 키를 사용하는 방법과 같이 Lodash 라이브러리가 있어야 index.js 파일을 정상적으로 실행시킬 수 있을 것이다.

하지만 현재 js 파일을 살펴봐도 해당 스크립트가 외부 라이브러리에 `의존하는 코드`인지 알기 어렵다.
또, index.js 파일이 먼저 실행되고 이후 lodash 라이브러리가 불러와졌다면 프로그램이 정상적으로 작동하지 않을 것이다.

> 결론적으로 위와 같은 문제를 해결하기 위해 `웹팩을 사용하자!`라고.. 말하고 싶은 것 같다. 🤔🙄

** 8. 번들 생성하기 **
본격적으로 웹팩을 사용하여 앞서 작성했던 스크립트 코드를 관리해보도록 하자.

소스 코드와 배포 코드를 분리하여 디렉토리 구조를 조금 손봐야 한다.
이전에 작성한 `index.html` 파일을 `dist 폴더를 생성한 후 dist 폴더 안에` 집어 넣도록 하자.

> 배포 코드는 dist 폴더 (웹팩으로 빌드되는 코드)
> 소스 코드는 src 폴더 (개발자가 작성, 편집하는 코드들)

![](https://velog.velcdn.com/images/reasonz/post/34a91a2b-ddf4-4959-bac6-19fe2f6ecda4/image.png)

** 9. lodash 라이브러리 로컬에 설치하기 **
터미널에 lodash 라이브러리 설치 명령어를 작성한다.

```
npm install --save lodash
```

> 번들에 포함될 패키지를 설치할 때는 npm install --save
> 개발 목적으로 패키지를 설치할 때는 npm install -save-dev

** 10. 설치한 lodash 라이브러리 불러오기 **
`index.js` 파일에서 lodash 라이브러리를 import 하도록 한다.

```js
/* index.js */
import _ from 'lodash'; // import 코드 작성!

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.append(component());
```

** 11. cdn 으로 작성한 lodash script 태그 제거 및 번들을 불러오는 코드 작성 **
index.html 파일에서 다음과 같이 코드를 수정한다.

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>웹팩 시작해보기</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

기존에 작성했던 타이틀 태그 아래 script 태그(lodash)를 지우고 바디 태그가 끝나기 전에 작성한 script의 src 도 변경해주었다.

** 12. npx webpack 실행해보기 **

```
npx webpack
```

터미널에 npx webpack 명령어를 실행하면 index.js 파일이 엔트리 포인트로 사용되고 output으로 dist 폴더 안에 main.js 파일을 생성하게 된다.

![](https://velog.velcdn.com/images/reasonz/post/7757c282-e8c7-4c3f-afa5-e44df9ff4a6c/image.png)

** 13. index.html 실행해보기 **
라이브서버 확장 프로그램으로 index.html 파일을 열었을 때
![](https://velog.velcdn.com/images/reasonz/post/2a0f9432-1559-48b1-b44c-c011dba9b242/image.png)

이라고 나타나면 제대로 번들이 진행된 것이다.

> 웹팩은 import와 export 외에는 코드를 변경하지 않는다.
> 다른 기능이 필요하다면 `babel`을 사용해야 한다고 공식문서에서 설명하고 있다.

## webpack.config.js

위 파일이 있는 경우 웹팩은 기본적으로 webpack.config.js 파일을 따라가도록 동작한다.

`webpack.config.js` 파일 생성하기

![](https://velog.velcdn.com/images/reasonz/post/49d79260-7838-4e22-ba92-bf14a51b25d0/image.png)

프로젝트 폴더 안에 webpack.config.js 파일을 하나 만들어주었다.

```js
/* webpack.config.js */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

위와 같은 코드를 작성한 후 다시 터미널에 `npx webpack webpack.config.js` 명령어로 빌드를 실행해보면 webpack webpack.config.js에 작성한 코드를 기반으로 번들을 진행한다.

package.json 파일에 다음과 같이 작성해서 짧은 명령어로 번들 파일을 만들 수도 있다.

```js
{
  "name": "webpack-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bulid": "webpack" // 이거 추가
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0"
  }
}
```

```
npm run build
```

package.json 파일의 scripts 부분에 `"bulid": "webpack"`를 추가하면 터미널에 `npm run build` 명령어를 실행했을 때 webpack 빌드가 가능하다.

> 여기까지 웹팩 공식 문서의 Getting Started의 모든 부분을 실습해보았다.
> webpack.config.js 파일 작성 부분은 조금 더 추가적으로 적어줄 것들이 있어서 더 살펴봐야겠지만..ㅠㅠ

---

> 참고자료

> [웹팩 공식 사이트](https://webpack.kr/guides/getting-started)

> [모두 알지만 모두 모르는 package.json](https://programmingsummaries.tistory.com/385)
