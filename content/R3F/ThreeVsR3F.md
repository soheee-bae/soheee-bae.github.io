---
title: "3D 개발을 위해 Three.js가 아닌 React Three Fiber을 쓰려는 이유"
date: 2023-06-07
subtitle: "Three.js와 React Three Fiber중 R3F를 선택한 이유와 장점을 적어 보았습니다."
category: "React Three Fiber"
tags:
  - r3f
  - threejs
background: "r3f/r3f-livingroom.jpeg"
emoji: "⚔️"
draft: false
---

<br/>

## Three.js와 React Three Fiber(R3F)은 뭐가 다를까?

#### 기본적인 Scene 만드는 방법

```
const mesh = new THREE.Mesh()
mesh.geometry = new THREE.BoxGeometry(1, 1, 1)
mesh.material = new THREE.MeshBasicMaterial({ color: 'red' })

scene.add(mesh)
```

<div style="width:100%; text-align:center;">

##### Three.js

</div>

```
<mesh>
    <boxGeometry />
    <meshBasicMaterial color="red" />
</mesh>
```

<div style="width:100%; text-align:center;">

##### React Three Fiber

</div>

#### 위치 및 회전 설정하는 방법

```
const mesh = new THREE.Mesh()
mesh.position.set(1, 2, 3)
mesh.rotation.x = 0.5
mesh.geometry = new THREE.BoxGeometry(1, 1, 1)
mesh.material = new THREE.MeshBasicMaterial({ color: 'red' })

scene.add(mesh)
```

<div style="width:100%; text-align:center;">

##### Three.js

</div>

```
<mesh position={ [ 1, 2, 3 ] } rotation-x={ 0.5 }>
    <boxGeometry />
    <meshBasicMaterial color="red" />
</mesh>
```

<div style="width:100%; text-align:center;">

##### React Three Fiber

</div>

#### 여러개의 물체 표현하는 방법

```
const group = new THREE.Group()
scene.add(group)

const mesh1 = new THREE.Mesh()
mesh1.geometry = new THREE.BoxGeometry(1, 1, 1)
mesh1.material = new THREE.MeshBasicMaterial({ color: 'red' })

const mesh2 = new THREE.Mesh()
mesh2.geometry = new THREE.SphereGeometry(0.5)
mesh2.material = new THREE.MeshBasicMaterial({ color: 'orange' })

group.add(mesh1, mesh2)
```

<div style="width:100%; text-align:center;">

##### Three.js

</div>

```
<group>
    <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red" />
    </mesh>
    <mesh>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
    </mesh>
</group>
```

<div style="width:100%; text-align:center;">

##### React Three Fiber

</div>

이렇게 몇 개의 코드를 두고 비교해 봐도 확실한 차이점을 볼 수가 있는데요. 리액트에 익숙한 저 같은 개발자들에겐 React Three Fiber이 훨씬 더 친근하게 느껴지는 것 같습니다. 제목과 같이 저는 3D 개발을 위해서 Threejs가 아닌 React Three Fiber을 쓰려고 하는데요. 그 이유로는 React에 대해 충분한 지식이 있고 똑같은 기능들을 좀 더 보다 쉽게 사용할 수 있기 때문입니다.

<br/>

### Mesh에 Geometry과 Material을 직접 지정해주지 않아도 됩니다.

이렇게 나열해서 비교를 해보다가 궁금증이 하나 생겼는데요. 위에 Three.js에서는 mesh마다 geometry과 material을 각각 지정해서 정해주는데 왜 R3F에서는 그걸 안 해도 될까? 였습니다. 사실 아래와 같이 `attach`를 써서 mesh에 geometry과 material을 정해줘도 됩니다. 하지만 이게 꼭 필요하지 않은 이유는 R3F가 mesh를 확인할 때 그 안에 있는 컴포넌트의 이름을 제일 먼저 확인하는데요. 만약 `Material`이라는 단어로 끝나는 컴포넌트를 사용할 경우 자동으로 Material로 인식하고 `Geometry`이라는 단어로 끝나는 컴포넌트를 사용할 경우 자동으로 Geometry라고 인식합니다. 이때 대부분의 구성요소에 기본값 매개변수를 제공함으로 <boxGeometry> 같은 Geometry를 사용할 때 특정 값을 제공할 필요가 없습니다.

```
<group>
    <mesh>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color="red" />
    </mesh>
    <mesh>
        <sphereGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color="orange" />
    </mesh>
</group>
```

<br/>

### Three.js의 모든 클래스들을 자동으로 구현합니다.

React Three Fiber은 Three.js의 다양한 구성 요소들을 카멜 표기법(`Camel case`)으로 표현합니다. 위 코드에서 확인할 수 있듯이 `THREE.BoxGeometry`를 `<boxGeometry>`로, `THREE.Mesh`를 `<mesh>`로 표현합니다. 더 나아가서 모든 Three.js 클래스들을 자동으로 구현하기 때문에 Three.js가 업데이트되거나 클래스가 추가되거나 변경될 때 React Three Fiber 또한 같이 업데이트가 되어 아무 작업 없이 지원되는 클래스들을 유지하거나 사용할 수 있습니다.

<br/>

### 선언형 코딩 방식을 지원합니다.

```
<mesh>
    <boxGeometry />
    <meshBasicMaterial color="red" />
</mesh>
```

선언형 코딩 방식라고 부르는 이유는 `boxGeometry`라는 태그와 `meshBasicMaterial`이라는 태그를 사용해서 mesh를 만들 때 태그들을 따로 `import` 하지 않아도 되기 때문입니다. React Three Fiber은 해단 인스턴스를 자동으로 생성하고 장면에 추가합니다.

<br/>

### 새로고침 (Reloading)이 필요 없습니다.

Three.js에서 코드를 변경하고 결과물을 볼 때 페이지 새로고침아 핑요했었다면 React Three Fiber에서는 React과 비슷하게 대부분의 경우 페이지를 다시 로드할 필요가 없습니다. 이 말은 즉, 응용 프로그램이 실행되는 동안 객체를 장면에 추가하거나 변경사항을 줄 수 있습니다.

<br/>

### 이외의 장점들

- Scene과 WebGLRenderer을 만들 필요가 없습니다

- Perspective Camera를 배치할 필요가 없습니다.

- 뷰포트 크기를 조정하면 크기 조정이 필요한 모든 항목이 자동으로 처리됩니다.
