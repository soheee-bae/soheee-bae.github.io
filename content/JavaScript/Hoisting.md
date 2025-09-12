---
title: "호이스팅(Hoisting)이 뭘까?"
date: 2025-01-15
subtitle: "자바스크립트의 호이스팅(Hoisting) 이해하기"
category: "JavaScript"
tags:
  - javascript
background: "javascript/ComputerScience.jpeg"
emoji: "🖥️"
draft: true
---

</br>

## 호이스팅(Hoisting)이란?

<div style="width:100%; margin:auto;">

![platforms](../../assets/images/javascript/호이스트.png)

</div>

"Hoist"라는 단어는 단순히 끌어올리다 또는 들어올리다 라는 말을 뜻한다. 이 단어의 뜻처럼 JavaScript의 호이스팅은 함수, 변수 또는 클래스의 선언들을 모두 끌어올려서 유효 범위의 최상단에 선언하는 JavaScript의 개념 또는 동작이다.

여기서 Hoisting이란 직접 물리적으로 끌어올리는걸 의미하는게 아니라, 자바스크립트 엔진이 실행하기 전에 전체 코드를 한 번 스캔하여 변수와 함수 선언을 메모리에 저장하는데 이로 인해 코드 상에서 선언 전에 변수나 함수를 참조할 수 있게 되는걸 의미한다.

</br>

### 함수(Function) 호이스팅

```
printHello()
// hello

function printHello(){
    console.log('hello')
}
```

함수 선언문의 경우, 자바스크립트의 호이스팅으로 인해 코드를 구현한 위치와 관계없이 브라우저가 자바스크립트를 해석 할 때 맨 최상단으로 끌어 올려진다.

함수를 실행하는 `printHello()`가 함수를 할당하는 `function printHello() {...}` 보다 위에 작성되어 있으면 호이스팅 개념 없이 이론적으로 생각할 경우 `printHello()`는 실행되지 않아야 한다.

하지만 Hoisting 개념을 적용하게 되면 최상단의 `printHello()`도 정상적으로 실행된다.

</br>

### 변수(Variable) 호이스팅

JavaScript에서는 `var`, `let` 및 `const` 변수를 사용하여 선언할 수 있으며 각자 다른 호이스팅 개념이 적용된다.

#### var 변수
