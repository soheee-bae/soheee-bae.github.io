---
title: "Three.js VS React Three Fiber"
date: 2023-06-07
subtitle: "Three.js와 React Three Fiber을 비교해 정리해 보았습니다."
category: "React Three Fiber"
tags:
  - r3f
  - threejs
background: "r3f/r3f-livingroom.jpeg"
emoji: "⚔️"
draft: false
---

<br/>

## Three.js와 React Three Fiber은 뭐가 다를까?

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

이렇게 몇개의 코드를 두고 비교해 봐도 확실한 차이점을 볼수가 있는데요. 리액트와 친한 저 같은 개발자들에겐 React Three Fiber이 훨씬더 친근하게 느껴지는 것 같습니다.

이렇게 나열해서 비교를 해보다가 궁금증이 하나 생겼는데요. 위에 Three.js에서는 mesh마다 geometry과 material을 각각 지정해서 정해주는데 왜 R3F에서는 그걸 안해도 될까? 였습니다. 사실 아래와 같이 attach 라는 걸 써서 mesh에 geometry과 material을 정해줘도 됩니다. 하지만 여기서 R3F가 컴포넌트의 이름을 제일 먼저 확인 하기 때문이다.

- If it ends with **`"Material"`**, it’ll automatically assign it to the **`material`** property.
- If it ends with **`"Geometry"`**, it’ll automatically assign it to the **`geometry`** property.

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
