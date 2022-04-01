# Specificity 💙

`Specificity` css 스타일을 적용하고자 하는 선택자의 점수에 따라 스타일이 우선된다.
<br><br>

### 우선 순위 계산 방법 📌

| 우선순위 |                                      선언 방식                                       | 점수   |
| -------- | :----------------------------------------------------------------------------------: | ------ |
| 1        |                    <span style="color:#91c2ef">!important</span>                     | 10,000 |
| 2        |    <span style="color:#91c2ef">style="" <br>(html 요소에 직접 스타일 넣기)</span>    | 1,000  |
| 3        |                        <span style="color:#91c2ef">#id</span>                        | 100    |
| 4        | <span style="color:#91c2ef">.class 또는 pseudo 클래스<br>(가상 클래스 선택자)</span> | 10     |
| 5        |                    <span style="color:#91c2ef">html 태그명</span>                    | 1      |

점수가 부여되는 선언 방식은 위 표와 같다.
그 외에는 전체선택자(\*)와 상속이 있으나 점수가 부여되지 않아 우선 순위가 매우 낮다.
<br><br>

### 선언방식별 특징

### 1. !important 🥇

```css
/* CSS */

p {
	color: aliceblue; !important
}
```

!important가 붙은 스타일은 당장 우선순위로 급하게 적용해야 할 때만 사용하고 가급적 사용하지 않는 것이 좋다.
<br><br>

### 2. 인라인 스타일 🥈

```html
<div style="color: aliceblue"></div>
```

!important 다음으로 높은 점수를 가졌다. html 요소 자체에 직접 style 속성을 부여하는 것인데 html이 지저분해질 뿐만 아니라 우선순위 또한 높아서 사용하지 않는 편이 좋다.
<br><br>

### 3. #id 🥉

```css
#reason {
    color: aliceblue;
}
```

id 선택자를 사용하여 스타일을 주는 방법이다. 자바스크립트나 제이쿼리에서 id를 가지고 조작하는 경우가 많아서 css에서는 피하는 것이 좋다.
<br><br>

### 4. .class 또는 pseudo클래스 (가장 보편적 ✨)

```css
.reason {
    color: aliceblue;
}

.reason:hover {
    color: blue;
}
```

class에 스타일을 넣는 방법이 가장 많이 사용되는 방법이다.
<br><br>

### 5. 태그 선택자

```css
p {
}
```

css reset 파일에서 자주 볼 수 있다.
가끔 스타일 지정할 때 class와 혼용하여 사용하기도 한다. 점수가 낮기 때문에 단독으로 사용할 때는 중첩된 스타일이 있는지 확인해야할 수도 있다.

---

## Specificity 점수 계산하는 방법

```css
.test.reason {
    color: red;
    /* 20점 */
}

p.reason {
    color: blue;
    /*이것은 11점*/
}
```

`reason`이라는 이름을 가진 `class`는 <span style="color:blue">blue</span>가 아닌 <span style="color:red">red</span>가 적용된다. css 작성 순서로만 보면 밑에 작성된 것이 더 우선적으로 적용되야 하지만, 우선순위 점수로 인해 class 2개(10+10=20)가 더 높은 토탈 점수로 인해 `color : red`가 적용된다.

```css
.test p.reason {
    color: aliceblue;
    /* 21점 */
}

#btn {
    /* 100점 */
}

div #btn {
    /* 101점 */
}

.reason {
    color: pink !important;
    /* 10,000점 🥇 */
}
```

어떤 스타일이 적용되어 있든 !important가 선언되는 순간 다른 스타일보다 높은 점수로 인해 css 스타일을 덮어써버린다.
그러므로 !important는 가급적 선언하지 않는 편이 좋다. (계속 !important를 사용해야 할지도 모른다. 😂)

<br>

## 주의사항

Specificity 점수를 높이고자 너무 많은 셀렉터를 사용하게 되면 어떤 요소에 스타일을 넣는 것인지 알아보기 힘들 뿐더러 추후 수정하는데 더 높은 Specificity 점수를 부여해야 하는 문제가 발생한다.
급하게 css를 수정해야하는 상황이 아니라면 css를 작성하기 전에 항상 이러한 문제가 발생하지 않도록 사전에 좋은 코드를 작성하는 것이 좋다.

> 재사용성이나 확장성, 유지보수를 고려한 코드를 작성하도록 하자.
