> 데브리님의 Sesac Vue 영상을 보고 정리하였다.
> 오늘은 vue나 react와 같은 프로젝트에서 번들링을 하는 방법을 공부해보았다.

# Webpack

webpack은 번들링(압축 및 요약)을 도와주는 도구이다.
번들링을 하는 이유는 용량이 적고 효율적이어야 하기 때문이다.
react나 vue같은 프레임워크에서 필수적으로 사용하는 라이브러리이다.
webpack 사용을 위해 npm을 통해 설치하면 된다.

1. 먼저 폴더를 하나 생성한 후 vscode에서 만든 폴더를 열고 터미널을 통해 라이브러리 다운로드를 받을 것이기 때문에 라이브러리 관리를 위해 package.json을 만들어준다.
   `npm init -y` 명령어를 사용하면 package.json 파일이 생성된다.

2. `npm install webpack webpack-cli --save-dev` 명령어를 사용한다.
   webpack과 webpack-cli를 함께 설치한다는 의미이다.
   --save-dev (또는 -D)는 개발할때만 필요한 라이브러리라는 것을 알려주도록 하였다.
   설치가 완료되면 package.json에 devDependencies 항목이 생긴 것을 확인할 수 있다.

```
"devDependencies": {
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2"
}
```

---

# 번들링 해보기

설치를 완료하고 src 폴더를 생성하고 app.js 파일을 하나 만들었다.

![](https://velog.velcdn.com/images/reasonz/post/69fbd1ce-9483-40a3-8a98-f8cd4622963f/image.png)

번들링을 시키기 위해서는 기본 세팅도 필요하다.
[webpack사이트](https://webpack.js.org/)에 보면 webpack.config.js 사용하는 방법을 확인할 수 있다.
하지만 지금은 파일명이 다르기 때문에 직접 설정해보기로 했다.

`webpack.config.js` 파일을 하나 만들고 그 안에 아래 코드를 작성하였다.

```javascript
const path = require('path'); // 노드js 코어 기능중 하나
module.exports = {
  mode: 'production', // production, development, none이 있는데 개발용인지 배포용인지 구분
  entry: './src/app.js', //번들링할 대상 파일
  output: {
    //번들링된 파일의 위치와 파일명 지정
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

`webpack.config.js`는 webpack 명령을 실행하면 자동으로
참고가 되어 사용된다.

그 다음에 npm이 아닌 npx 명령어를 사용한다.
`npx webpack`
npx는 npm을 설치하면 함께 설치되는 실행도구이다. npm을 다운로드를 받고 관리를 하는 것이라면 npx는 다운로드 받은 라이브러리를 좀 더 손쉽게 실행할 수 있도록 도와주는 도구이다.

![](https://velog.velcdn.com/images/reasonz/post/15080ac3-e8d2-4e19-aad4-b942d0755a20/image.png)

npx webpack이라는 명령을 실행하면 번들링이 됐다는 메시지를 확인할 수 있다.

bundle.js로 112bytes짜리 파일이 생성되었고 app.js 168bytes짜리를 번들js로 변환시켰다는 의미이다.
동시에 dist라는 폴더도 함께 생성되었는데 이것은 아까 webpack.config.js 파일에 적어놓은 output path에 적은 이름이다.

![](https://velog.velcdn.com/images/reasonz/post/e1526ccf-279a-4b56-bf13-3c721cb20148/image.png)

bundle.js를 확인해보면 minified된 것을 확인할 수 있다.

# babel 사용해보기

번들링을 할 때 바벨을 사용하면 구버전 코드로도 변환이 가능하다.

`npm install babel-loader @babel/core @babel/preset-env --save-dev`
babel-loader, @babel/core, @babel/preset-env을 추가로 설치해주었다.

![](https://velog.velcdn.com/images/reasonz/post/d64315c1-1a9b-4871-9f54-ca834599e4ff/image.png)

babel.config.js파일을 하나 만들고 코드를 작성하였다.

```javascript
const path = require('path'); // 노드js 코어 기능중 하나
module.exports = {
  mode: 'production', // production, development, none이 있는데 개발용인지 배포용인지 구분
  entry: './src/app.js', //번들링할 대상 파일
  output: {
    //번들링된 파일의 위치와 파일명 지정
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // 다양한 규칙 지정
      {
        test: /\.js$/, // 바벨에 대한 규칙! js로 끝나는 파일이 있으면
        use: ['babel-loader'], // babel-loader를 사용해라
        exclude: /node_modules/, // node_moudules에 있는 js 파일은 제외해서.
      },
    ],
  },
};
```

이제 webpack.config.js에서 바벨에 대한 설정을 추가해주면 된다.
영상을 따라하다보면 `babel.config.js` 부분에서 오류가 발생하는데 [바벨 공식문서](https://babeljs.io/docs/en/configuration)를 참고하여 다음과 같이 변경해서 오류를 수정하였다.

```javascript
module.exports = function (api) {
  api.cache(true);
  const presets = [['@babel/preset-env']];

  return {
    presets,
  };
};
```

vscode 터미널에서 `npx webpack` 명령을 사용하면 설정한 값으로 번들링이 된다.

# 파일 export하는 방법

src 폴더에 monkey.js 파일을 하나 만들었다.

```javascript
/* monkey.js */
module.exports = {
  name: 'monkey',
  food: ['banana', 'apple'],
};
```

이제 이 파일을 app.js에서 불러와서 확인해보자

```javascript
/* app.js */
const monkey = require('./monkey');
console.log(monkey);
```

app.js 상단에 코드를 추가해주고 `npx webpack` 명령어를 사용해서 번들링해주었다.

## minified된 파일이 정상적으로 동작하는지 확인하기

![](https://velog.velcdn.com/images/reasonz/post/2c8d614e-01d2-47ce-8316-88c7e705ad67/image.png)

bundle.js에 monkey 파일도 추가된 것을 확인했다.
이제 이 번들된 파일이 제대로 동작하는지 확인해보자.

`index.html` 만들기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

script태그 안에 번들한 js파일을 넣어준다.
그리고 index.html을 라이브서버로 열어서 확인해보면 된다.

![](https://velog.velcdn.com/images/reasonz/post/62737bee-e07f-419e-af92-def7de104a2f/image.png)

아까 작성한 monkey 오브젝트가 콘솔창에 출력되면 제대로 작동한 것이다.

app.js가 vue같은 파일을 작성할 때 사용하는 vue파일이 될 것이고 이러한 작성된 vue파일을 번들링해서 js파일로 변환시켜서 index.html에 넣어서 사용하게 되는 것이다.

### webpack watch

app.js를 수정할 때마다 webpack을 계속 돌리는 것은 힘드니
`npx webpack --watch` 라는 명령어를 사용하면 변경사항이 있을 때마다 실시간으로 번들링이 진행된다.

# css 변환하기

css를 webpack으로 번들링하기 위해서는 css-loader와 style-loader 라이브러리가 추가로 필요하다.
`npm install css-loader style-loader --save-dev`

src 폴더 안에 css 폴더를 만들고 css폴더에 main.css 파일을 만들어 주었다.

```css
h1 {
  color: #fff;
  background: pink;
}
```

보통 html에 style을 넣을 때 index.html에 link태그를 사용하여 연결하지만 그렇게 하지 않고 app.js파일에서 연결하도록 하였다.

```javascript
/* app.js */
require('./css/main.css');
```

지금은 사용할 수 없다. 번들링할 때 css도 함께 불러와서 사용할 수 있도록 webpack.config.js 파일에 rule을 추가해주어야 한다.

```javascript
/* webpack.config.js */

module: {
    rules: [
      // 다양한 규칙 지정
      {
        test: /\.js$/, // 바벨에 대한 규칙! js로 끝나는 파일이 있으면
        use: ['babel-loader'], // babel-loader를 사용해라
        exclude: /node_modules/, // node_moudules에 있는 js 파일은 제외해서.
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
```

rules 안에 css를 추가해주면 된다.
이후 npx webpack 명령어를 사용하고 라이브서버에서 확인해보면 css가 적용되는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/35389736-dc19-4c78-aad5-28e36084e819/image.png)

이렇게해도 적용되는 이유는 css파일을 app.js에 넣고 웹팩을 통해 번들링하여 html에서 불러왔기 때문이다.
vue나 react같은 프로젝트도 이러한 형태로 번들링되어 사용된다.

---

> 참고 자료

> [[ SeSac ] [VUE3 #6] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=g47cA19vVlg&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=6&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

> [babel](https://babeljs.io/docs/en/configuration)
