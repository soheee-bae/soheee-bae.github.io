---
title: "Execution Context와 Hoisting"
date: 2026-02-03
subtitle: "실행 컨텍스트와 호이스팅의 동작 원리"
category: "JavaScript"
tags:
  - javascript
background: "javascript/ComputerScience.jpeg"
emoji: "🖥️"
draft: false
---

## 💡 Execution Context란?

> 자바스크립트 코드가 실행되는 환경을 추상화한 객체이다. 코드가 실행될때 필요한 환경 정보들을 모아 놓은 객체라고 할 수 있다.

```
1. 실행 환경을 만든다
2. 그 안에서 코드를 실행한다
```

엔진은 코드를 그냥 실행하지 않고 “실행 환경”을 먼저 만든 다음 그 안에서 실행한다.

이 환경이 바로 **Execution Context**다.

<br/>

---

<br/>

## 📦 Execution Context 종류

- **Global Execution Context (전역 실행 컨텍스트)**
  - 코드가 처음 실행될 때 생성한다.
- **Function Execution Context (함수 실행 컨텍스트)**
  - 함수 호출될 때마다 생성한다.
- **Eval Execution Context (eval 실행 컨텍스트)**
  - eval 함수 내에서 실행된다.

### 실행 흐름

```
1. Global Execution Context 생성
2. 변수/함수 등록
3. 함수 호출 → Function Execution Context 생성
4. 실행 후 사라짐
```

<br/>

---

<br/>

## 🧠 Execution Context 내부 구조

**Lexical Environment**

- let / const
- 함수 선언
- 블록 스코프 정보 / 상위 스코프 참조

**Variable Environment**

- var 전용 저장소 (초기 JS 호환용 개념)

**This Binding**

- 현재 실행 컨텍스트에서의 this 값

<br/>

---

<br/>

## 🔥 Execution Context는 2단계로 생성된다

> Execution Context는 코드 실행을 위한 환경이며, 생성 단계에서 변수/함수 선언이 등록되고, 실행 단계에서 코드가 수행된다.

**Creation Phase (생성 단계)**

- 엔진이 아직 코드 실행 안 한 단계에서 변수 선언, 함수 선언, this 결정을 메모리에 등록한다.
- 이 단계 때문에 Hoisting이 생긴다.

**Execution Phase (실행 단계)**

- 코드를 한 줄씩 실행하고 변수에 값을 할당하고 함수를 호출한다.

<br/>

---

<br/>

## 💡 Hoisting이란?

> “선언이 위로 끌어올려진 것처럼 보이는 현상”

하지만 실제로는:

> **Creation Phase에서 선언이 미리 등록**되었기 때문에 그렇게 보이는 것이다.

<br/>

### 🔎 var의 경우: `undefined` 출력

```js
console.log(a);
var a = 10;
```

**1. Global Execution Context 생성**

Creation Phase를 실행하고 엔진은 `var a`를 Variable Environment에 등록하고 초기값을 `undefined`로 세팅한다.

```
// 메모리 상태
a: undefined
```

**2. Execution Phase 시작** : 코드가 한 줄씩 실행된다.

```js
// 첫번째 줄
console.log(a);
```

엔진은 Execution Context의 Variable Environment에서 값이 `undefined`인 `a`를 찾아서 `undefined`를 출력한다.

```js
// 두번째 줄
var a = 10;
```

이미 `a`는 존재했으므로 엔진은 `a` 에 `10` 이라는 값을 할당한다.

<br/>

### 🔎 let & const의 경우: `ReferenceError` 발생

**1. Global Execution Context 생성**

Creation Phase를 실행하고 엔진은 `let a`를 Lexical Environment에 등록하지만 초기화하지 않는다. 이 상태를 **TDZ (Temporal Dead Zone)** 라고 한다.

```
// 메모리 상태
a: <uninitialized>
```

**2. Execution Phase 시작** : 코드가 한 줄씩 실행된다.

```js
// 첫번째 줄
console.log(a);
```

엔진은 존재는 하지만 초기화 되지 않은 `a`로 인해서 에러를 발생시킵니다.

<br/>

| 구분                  | var                  | let                 |
| --------------------- | -------------------- | ------------------- |
| 등록 위치             | Variable Environment | Lexical Environment |
| Creation Phase 초기화 | undefined            | 초기화 안 됨        |
| 초기화 전 접근        | undefined 출력       | ReferenceError      |

<br/>

### 🔎 함수의 경우: 호출 가능

```js
foo();

function foo() {
  console.log("hello");
}
```

**1. Creation Phase 시작 :**

```
foo: function object
```

이미 함수가 메모리에 등록되기에 호출이 가능하다.

<br/>

### 🔎 함수 표현식의 경우: 에러 발생

```js
foo();

var foo = function () {
  console.log("hello");
};
```

**1. Creation Phase를 실행한다 :**

```
foo: undefined
```

**2. Execution Phase 시작** : 코드가 한 줄씩 실행된다.

```
// 첫번째 줄
foo(); → undefined is not a function ❌
```

왜냐면 함수 객체는 아직 할당 안 됐기 때문에 에러가 발생된다.

<br/>

---

<br/>

## 🔎 조금 더 복잡한 예제

```js
var a = 1;

function test() {
  console.log(a);
  var a = 2;
}

test();
```

<br/>

### 1. 프로그램 시작

JS는 코드를 실행하기 전에 먼저 **Global Execution Context**를 만든다.

```
a: undefined
test: function object
```

#### 1. Global Creation Phase

- `var a` 등록 → `a: undefined`
- `function test` 등록 → 함수 객체로 메모리에 저장

#### 2. Global Execution Phase (코드를 한 줄씩 실행한다)

- `var a = 1` :
  이미 a는 존재하므로 값만 변경한다

  ```
  a = 1
  ```

- `test()` 호출

<br/>

### 2. test() 호출

#### 1. Function Execution Context 생성

- `test()`가 호출되면 새로운 **Function Execution Context**가 만들어진다.

#### 2. test 함수의 Creation Phase

```
a: undefined
```

- 엔진이 먼저 내부 선언을 처리한다.
- `var a` 등록 → `a: undefined`
- 여기서 핵심은 이 `a`는 **global a와 다른 변수**라는 것이다.

#### 3. test 함수 Execution Phase (코드를 한 줄씩 실행한다)

- **`console.log(a)` :**

  - 엔진은 `a`를 찾는다
  - 탐색 순서:
    - test 함수 스코프에서 `a`를 발견한다 (`undefined`)
    - 그래서 global까지 가지 않는다
  - 출력: `undefined`

- **`var a = 2` :**

  ```
  a = 2
  ```

  이미 `a`는 존재하므로 값만 할당힌다

<br/>

### 3. test 종료

Function Execution Context가 Call Stack에서 제거된다.

<br/>

---

<br/>

## 🎯 전체 흐름 정리

```
GlobalExecutionContext 생성
   ↓GlobalCreationPhase
   -a:undefined
   -test:function
   ↓GlobalExecutionPhase
   - a =1
   -test() 호출
       ↓FunctionExecutionContext 생성
           ↓CreationPhase
           -a:undefined
           ↓ExecutionPhase
           -console.log(a) →undefined
           - a =2
       ↓
       함수 종료 → 제거
```
