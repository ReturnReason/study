> 데브리님의 Sesav Vue 시리즈 강좌를 보며 정리하였다.

먼저, node설치 및 npm install로 [random](https://www.npmjs.com/package/random)을 설치하였다.

### npm - random 라이브러리 사용해보기

```javascript
const random = require('random');
console.log(random.int(0, 100));
```

node를 설치했기 때문에 vscode의 터미널에서 javascript 파일을 실행시켜볼 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/773bf160-63c2-4320-8ccf-4f9a96e848ff/image.png)

reuire로 random라이브러리를 불러와서 사용해보았다.
실행을 할 때마다 0부터 100사이의 정수값을 랜덤으로 반환해준다.

## vue 설치하기

[vue3 홈페이지](https://vuejs.org/guide/introduction.html)를 참고하여 vue를 설치하면 된다.
cli 통합환경을 통해 vue 환경도 구성하였다.

---

# vue 살펴보기

먼저, vscode로 만든 뷰 프로젝트를 오픈하였다.
README.md 파일을 먼저 살펴보면 아래와 같은 내용이 담겨있다.

### README.md

![](https://velog.velcdn.com/images/reasonz/post/fac1be77-0dc9-4ca8-990a-7598ff38bdbc/image.png)

README.md는 github와 같은 곳에 업로드 했을 때 설명문과 같은 형식으로 사용되는 파일이다.

### package.json

package.json에는 프로젝트의 이름이라던가 버전등의 다양한 내용들이 들어있다.

![](https://velog.velcdn.com/images/reasonz/post/9a7c2c70-4f56-429d-9c31-4448e3c96743/image.png)
script를 살펴보면 개발 서버 실행 명령어, 작성한 코드 빌드 명령어 설정도 할 수 있다.

dependencies에 있는 목록은 뷰를 사용할 때 필요한 라이브러리의 목록이다. npm을 통해 설치한 라이브러리들이 이곳에 정리된다.

프로젝트를 여러명과 함께 공유하여 만들 때, node_modules에 있는 라이브러리들도 함께 전달해야하는데 모든 파일을 압축해서 보내거나 하는 등의 방법은 오래걸리고 불편하다.
이때 사용할 수 있는 것이 dependencies와 devDependencies에 적힌 라이브러리 목록이다. 이 리스트를 주면 npm으로 다운받아서 사용할 수 있다.
즉, `package.json` 파일 하나만으로 동일한 환경(같은 버전의 라이브러리)에서 작업이 가능하다는 의미이다.

`dependencies`는 배포, 실제 서비스 사용할 때 필요한 라이브러리이며, `devDependencies`는 개발하는 동안 사용하는 라이브러리로 구분된다.

`eslintconfig` 코드의 보풀을 제거한다. 줄바꿈이 엉망이라던가, 띄어쓰기가 엉망이라던지 하는 불필요한 보풀을 제거하는 설정을 할 수 있다.

`briwserlist`는 인터넷 익스플로러 같은 구버전 엔진 브라우저들을 어디까지 맞춰서 코드를 바꿀 것인지 작성할 수 있다.
이 부분은 babel.config.js 파일과 연관되어 있다.

### package-lock.json

각각의 버전이 적혀있다.
보통 버전 체계는 3가지 숫자로 이루어져 있다.
0.0.0의 첫번째 숫자는 메이저 버전(어떠한 라이브러리의 중요한 기능이 있을 때마다 버전업), 두번째 숫자는 마이너 버전(작은 부분, 기능의 일부분 업그레이드), 마지막 세번째 숫자는 작은 버그 핫픽스 등에 이루어진다.
`^(캐럿)`, `~(틸드)` 기호는 나중에 살펴보자.

![](https://velog.velcdn.com/images/reasonz/post/bc4e2434-2daf-4803-b8fc-d8ad426253a4/image.png)

버전이 다름에 따라 오류가 발생할 수 있어서 버전을 픽스한다 정도로 알고 있으면 된다.

### .gitignore

git을 통해 관리하지 않을 파일을 명시하는 파일이다.

![](https://velog.velcdn.com/images/reasonz/post/d0a43bea-6bee-4497-8b16-c50ad0d803be/image.png)
협업을 하거나 저장소에 저장하는 과정에서 굳이 업데이트하지 않아도 되는(다른 사람과 공유할 필요 없는) 파일을 적어두면 된다. 예를 들면 노드 모듈스가 여기에 포함될 것이다.

### public

![](https://velog.velcdn.com/images/reasonz/post/e5d6ec3e-4b9a-4904-942f-fb3e07b00422/image.png)

index.html과 favicon.ico가 있다.
html파일을 살펴보면 아무것도 없고 div태그 안에 id="app"이라고 작성된 것을 확인할 수 있다.
이 div 태그 안에 모든 vue 스크립트가 이곳에서 화면을 구성하게 된다.
웹상에서 볼 때는 여러 페이지로 보이지만 사실 vue 코드를 배포를 위해 번들링을 하면 index.html의 div태그 안에 모든 코드가 들어간 채로 제작되어 싱글 페이지 어플리케이션(SPA)이 되는 것이다.

### src

App.vue, main.js, assets폴더, components 폴더가 있다.

![](https://velog.velcdn.com/images/reasonz/post/2cf4753b-bc78-4cdb-bee8-de87415f85fe/image.png)

compnents와 assets은 앞으로 뷰를 공부하면서 하나씩 알게될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/2da22d9f-d8d8-4ba4-9b2c-1aaf6ebd5488/image.png)

main.js는 vue에서 app을 만드는 기능을 불러오고 불러온 내용을 어딘가(id="app")에 적용(mount)시켰다.

여기까지 뷰의 프로젝트 구조를 간단히 살펴보았다.

## 개발서버 실행하기

`npm run serve`를 vscode 터미널에서 입력하면 vue 개발 서버를 실행할 수 있다.
package.json에 있는 "serve"명령어를 실행하는 것이다.

json파일의 scripts에 serve와 동일한 작업을 수행하는 내가 만든 명령어(go)를 추가하면 어떨까?

```javascript
"scripts": {
    "serve": "vue-cli-service serve",
    "go": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

vscode의 터미널에 "npm run go"를 입력하면 serve 명령어와 동일하게 개발 서버가 실행된다.
이런식으로 명령어를 직접 커스텀해서 사용할 수도 있다.

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #4] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=Fww3GFlx6js&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=4&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)
