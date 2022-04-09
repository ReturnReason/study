

## SASS(SCSS)

<br>

CSS의 단점을 보완하여 확장하여 쓸 수 있는 CSS의 전처리기이다. 웹은 CSS로만 동작하기 때문에 SASS로 작성한 것을 CSS로 컴파일하여 작동시키는 방식이다.
CSS의 단점 중 프로젝트의 규모가 커져서 CSS가 길어지면 관리하기 힘들고 선택자나 변수, 함수 문법 등을 이용하여 좀 더 효율적인 코드 작성이 가능해진다.
이번 글에서는 자주 사용되는 SASS 위주로 작성해보았다.

<br>


**SASS(SCSS)가 CSS보다 좋은 점**
1. 변수
2. 조건문, 반복문
3. Nesting
4. Mixin
5. Extend
크게 위와 같은 특징이 존재한다.

<br>


## SASS와 SCSS의 차이점
문법에서 차이점이 존재한다.
SASS와 SCSS의 차이점은 `{} 중괄호` 사용과 `; 세미콜론` 의 유무로 나뉜다.
SASS 문법에서는 `{}`와 `;`을 사용하지 않는다거나, `@mixin`을 사용할 때 SASS에서는 `=`, `+`와 같은 기호를 사용하는 등의 차이점이 존재한다.
개인 취향에 따라 선택하면 되지만 개인적으로 SCSS가 편하기 때문에
이 게시글에서는 SCSS의 방식으로 작성하고자 한다.

<br>



# .sass


```css
div
	width : 500px
    p
    	color : pink
    
/*  SASS에서 mixin 사용하는 방법 */
=mixin-sass($var)
	color : $var
    
p
	+mixin-sass(skyblue)
```

# .scss
```css
div{
	width : 500px;
    p {
    	color : pink;
    }
}

/*  SCSS에서 mixin 사용하는 방법 */
@mixin mixin-scss($var){
	color : $var;
}

p {
	@include mixin-scss(skyblue);
}
```

<br>


## 변수
폰트 색상과 같이 자주 사용되는 것을 변수에 저장하여 사용하면 좋다. 
자주 사용하는데 이름이 기억이 안나는 것, 자주 사용하는 것을 변수에 담아서 사용하면 된다.

변수에는 유효 범위가 존재한다. `블록 스코프{}` 안에서 변수를 선언했다면
해당 블록에서만 사용할 수 있다는 점을 기억해두자.
전역 변수로 선언하고 싶다면 블록 바깥에서 선언하거나, `!global` 을 사용하여 블록 스코프 안에 선언한 변수를 전역 변수로 설정할 수 있다.
`!global`로 선언한 것의 주의사항은 기존에 같은 이름의 변수가 있다면 값이 덮어쓰기 될 수 있기 때문에 SASS 가이드라인에서는 `!global` 사용을 루트 레벨에서 사용하지 말라고 권고하고 있다.

<br>


```css
/* SCSS */
$my-color : #6388d5;
$size : 200px;

.container p {
	color : $my-color;
    width : $size;
    
    /* 이 블록에서만 사용할 수 있는 변수 */
    $only-this-area : #eee;
    background : $only-this-area;
}

p {
  color : $only-this-area; /* ERROR */ 
}
```

<br>


## 선택자 중첩 (Nesting)
SASS(SCSS)는 선택자 중첩이 가능하다. 기존 CSS와 어떤 식으로 차이가 있는지 확인해 보자.

<br>


```css
/* CSS */
div .container {
	background : skyblue;
}
```

```css
/* SCSS */
div {
	.container {
    	background : skyblue;
    }
}

```

<br>


상위 선택자 중괄호 안에 작성하는 방식으로 사용할 수 있다. 여러번 선택자를 작성하지 않아도 되서 간편하게 선택자(selector)를 중첩하여 사용할 수 있다. 
하지만, 이것도 너무 많이 사용하면 더 복잡해질 수 있기 때문에 적당히 사용하는 것이 좋다.

<br>


## 확장 (Extend)
mixin과 비슷하게 사용할 수 있는 문법이다. 둘의 차이점이라 하면 `@extend`는 파라미터를 넣을 수 없다는 점이 있다. 클래스 이름 앞에 `.` 대신 `%`를 붙이면 임시 클래스를 선언해서 사용할 수도 있다. 
`.class명` 과 `%class명`의 차이점은 `%`를 붙인 클래스는 SASS를 컴파일 할 때 CSS에 작성되지 않는다는 점이 다르다. CSS에 컴파일하고 싶지 않을 때 임시 클래스로 선언하여 사용하면 된다.

<br>


```css
    .skyblue {
    	color : skyblue;
    }
    
	button {
    	@extend .skyblue;
    }
```

<br>


확장하고자 하는 클래스의 `{}`안에 `@extend .클래스명`을 적어주면 된다.
만약 임시 클래스를 사용한다면 `@extend %클래스명`으로 적어야한다.

찾아보니 extend의 사용을 피하는 것이 좋다는 글도 있었다. 
가급적 extend 보다 mixin을 사용하는 것이 더 적합할 수도 있겠다.

[extend 사용을 피해야 하는 이유](https://www.sitepoint.com/avoid-sass-extend/)

<br>


## mixin
앞서 살펴본 `@extend`와 비슷하게 사용할 수 있다. SASS 전체에서 가장 많이 사용되는 기능이기도 하다.
`@mixin name(parameter){}`로 작성하여 사용할 때는 사용하고자 하는 선택자의 `{}` 안에 `@include name(parameter);`로 사용하면 된다. 파라미터는 필요에 따라 선택하여 사용하면 된다.
```css
@mixin col($width-size) {
  width: $width-size;
  padding: 15px;
  border: 1px solid rgb(100, 95, 102);
  background: rgb(255, 222, 222);
}

.col-6 {
  @include col(50%);
}
```
-- --

<br>


조건문과 반복문은 따로 정리하지 않았는데 일반적인 css작성에서는
조건문과 반복문을 사용할 일이 없어서이다. 
추후 SASS로 조건, 반복문을 사용할 일이 있다면 그때 다시 추가 작성하여 공부해보려 한다.

<br>


-- --
> 참고 자료

[SASS 가이드라인](https://sass-guidelin.es/ko/#sass-)

[HEROPY TECH - SASS 완전 정복!](https://heropy.blog/2018/01/31/sass/)