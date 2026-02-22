---
title: "Lexical Environment와 Scope Chain"
date: 2026-02-11
subtitle: "변수 탐색의 핵심, 렉시컬 환경과 스코프 체인"
category: "JavaScript"
tags:
  - javascript
background: "javascript/ComputerScience.jpeg"
emoji: "🖥️"
draft: true
---

JavaScript를 공부하다 보면 이런 의문이 생긴다.

변수는 도대체 어디에 저장될까?

함수 안에서 왜 바깥 변수를 사용할 수 있을까?

JavaScript 엔진은 변수를 어떻게 찾아낼까?

그 답은 바로 Lexical Environment와 Scope Chain에 있다.

## Lexical Environment란?

현재 실행 컨텍스트의 변수 저장 공간 + 상위 스코프 참조 정보

JavaScript는 코드가 실행될 때 Execution Context를 생성한다.

그리고 Execution Context가 만들어질 때마다
새로운 Lexical Environment가 함께 생성된다.

### Execution Context 내부 구조

```
Execution Context
├─ Lexical Environment
├─ Variable Environment
└─ This Binding
```

여기서 변수 탐색의 핵심 역할을 하는 것이 바로 **Lexical Environment**다.

### Lexical Environment 내부 구조

```
Lexical Environment
├─ Environment Record
└─ Outer Reference
```

Lexical Environment는 두 가지 요소로 구성된다.

#### 1️⃣ Environment Record

현재 스코프에 선언된 변수와 함수가 저장되는 공간이다.

```js
function test() {
  let a = 10;
}
```

Environment Record: `a: 10`

즉,

👉 현재 실행 중인 스코프의 변수 목록이라고 보면 된다.

#### 2️⃣ Outer Reference

현재 스코프의 상위 스코프를 가리키는 참조다.

이 참조가 연결되면서 JavaScript의 가장 중요한 구조가 만들어진다.

👉 바로 Scope Chain이다.

## 왜 이름이 “Lexical”일까?

Lexical은 **“코드가 작성된 위치 기준”**이라는 의미다.

JavaScript의 스코프는 다음 기준으로 결정된다.

❌ 어디서 호출되었는가
✅ 어디서 선언되었는가

```js
function outer() {
  function inner() {}
}
```

inner 함수는 선언된 순간 이미 outer 스코프를 기억한다.

이것을 Lexical Scope(정적 스코프)라고 한다.

## Scope Chain이란?

변수를 찾기 위해 상위 스코프를 따라 올라가는 탐색 구조

JavaScript 엔진은 변수를 찾을 때 한 번에 전역을 보지 않는다.

현재 스코프부터 단계적으로 탐색한다.

### 예제 코드

```js
const a = 1;

function outer() {
  const b = 2;

  function inner() {
    console.log(a, b);
  }

  inner();
}

outer();
```

### 실행 흐름

1️⃣ Global Execution Context 생성
2️⃣ outer() 호출 → 새로운 Execution Context 생성
3️⃣ inner() 호출 → 또 새로운 Execution Context 생성

### inner에서 변수 찾는 과정

```js
console.log(a, b);
```

엔진의 탐색 순서:

b 찾기

inner 스코프 → 없음

outer 스코프 → 있음 ✅

a 찾기

inner → 없음

outer → 없음

global → 있음 ✅

이처럼 JavaScript는

현재 스코프 → 상위 스코프 → 전역 스코프

순서로 변수를 탐색한다.

이 연결 구조가 바로 Scope Chain이다.

## ⭐ Scope Chain의 중요한 특징

많이 오해하는 부분이 있다.

Scope Chain은 실행 중에 만들어지는 것이 아니다.

👉 함수가 선언되는 순간 이미 결정된다.

그래서 JavaScript는 동적 스코프(dynamic scope) 가 아니라
정적 스코프(lexical scope)를 사용한다.

## Execution Context와의 관계

지금까지 내용을 연결하면 이렇게 정리된다.

```
Execution Context 생성
↓
Lexical Environment 생성
↓
Outer Reference 연결
↓
Scope Chain 형성
↓
변수 탐색 가능
```

즉,

Execution Context → 실행 환경

Lexical Environment → 변수 저장 공간

Scope Chain → 변수 탐색 규칙

## 🎯 핵심 정리

JavaScript에서 변수를 찾는 과정은 다음과 같다.

1. Execution Context 생성
2. Lexical Environment 생성
3. Environment Record에 변수 저장
4. Outer Reference로 상위 스코프 연결
5. Scope Chain을 따라 변수 탐색

결국 JavaScript는 **가장 가까운 스코프부터 차례대로 변수를 찾는다.**
