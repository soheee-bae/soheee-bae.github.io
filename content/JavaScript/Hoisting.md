---
title: "호이스팅(Hoisting)이 뭘까?"
date: 2025-01-15
subtitle: "자바스크립트의 호이스팅(Hoisting) 이해하기"
category: "JavaScript"
tags:
  - javascript
background: "javascript/ComputerScience.jpeg"
emoji: "🖥️"
draft: false
---

</br>

## 호이스팅 (Hoisting)

호이스팅은 함수, 변수 또는 클래스의 선언들을 모두 끌어올려서 유효 범위의 최상단에 선언하는 JavaScript의 개념 또는 동작이다. 자바스크립트 엔진이 실행하기 전에 코드를 스캔하여 변수와 함수 선언을 메모리에 저장한다. 이로 인해 코드 상에서 선언 전에 변수나 함수를 참조할 수 있게 된다.


# 함수(Function) 호이스팅
```
function printHello(){
    console.log('hello')
}

printHello()
// hello
```

함수 선언문의 경우, 자바스크립트의 호이스팅으로 인해 코드를 구현한 위치와 관계없이 브라우저가 자바스크립트를 해석 할 때 맨 최상단으로 끌어 올려진다. 

