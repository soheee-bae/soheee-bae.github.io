---
title: "React Three Fiber 연습하기"
date: 2023-06-09
subtitle: "React Three Fiber 기본적인 기능들을 정리했습니다."
category: "React Three Fiber"
tags:
  - r3f
background: "r3f/r3f-livingroom.jpeg"
emoji: "🔬"
draft: false
---

<br/>

## Setup

```jsx
npm install three @types/three @react-three/fiber
```

여기서 집중해서 봐야 할 것은 `@react-three/fiber` 앞에 `@`이라는 기호가 붙어있다는 건데요. 이 뜻은 `react-three`라는 더 큰 시스템의 일부에서 `/fiber`이라는 일부를 사용하려 한다는 걸 의미합니다. 여기서 하나 더 알 수 있는 건 `/fiber`이 아닌 다른 일부들도 존재한다는 겁니다. 이 글에서는 /fiber에 대한 글을 정리해서 적어보려고 합니다.

<br/>

## 기본적인 Scene 만들기

제일 기본 중에 기본인 `scene`을 만드는 것은 아주 간단합니다.

1. `canvas` 만들기
2. `mesh`안에 `geometry`과 `material`을 넣어주기

```
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
        <Canvas>
            <mesh>
                <sphereGeometry />
                <meshBasicMaterial />
            </mesh>
        </Canvas>
)
```

<br/>

## Resizing

기본적으로 canvas는 부모 컴포넌트 사이즈를 따라갑니다. 위의 코드에서 부모 컴포넌트는 #root인데요. 이것을 바꾸기 위해서는 css를 사용하여 #root, body, html 사이즈를 동일하게 만들어 #root의 뷰포트를 늘림과 동시에 사이즈를 조절할 수 있습니다.

```
html,
body,
#root
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
```

<br/>

## Mesh 더 알아보기

React Three Fiber을 사용해서 Mesh를 구현할때 무엇보다 중요한건 Three.js 문서를 잘 활용하면서 사용하는 방법 아는것이라고 생각합니다. 많은 geometry, material 및 기타 구성 요소들은 Three.js에서 그대로 가져와서 React Three Fiber에서 쓰이기 때문에 3D개발을 할때 유용하게 쓰일수 있는 정보들이 많습니다.

### Geometry (형상)

React Three Fiber은 모든 Geometry에 기본 매개변수를 제공합니다. 하지만 만약 그 값을 바꾸고 싶거나 바꾸어야 하는 상황이 온다면 Geometry의 자세한 정보나 사용가능한 매개변수를 보기 위해서 저는 Three.js의 [Geometries](https://threejs.org/docs/#api/ko/geometries/SphereGeometry "Geometries")사이트를 이용합니다.

여기서 sphereGeometry의 첫 세개의 매개변수를 확인할수 있습니다.

- radius
- widthSegments
- heightSegments

이 매개변수에 값을 주려면 args 속성에 array 형식으로 값을 지정해주면 사용할수 있습니다. args 속성에 보내는 값의 순서는 항상 Three.js 클래스와 동일한 순서입니다.

```
<mesh>
    <sphereGeometry args={ [ 1.5, 32, 32 ] } />
    <meshBasicMaterial />
</mesh>
```

### Material (재질)

위의 Geometry과 비슷합니다. 만약 meshBasicMaterial에 기능을 추가하고 싶다면 위와 같이 Three.js의 [Materials](https://threejs.org/docs/?q=mate#api/ko/constants/Materials "Materials") 사이트를 이용하면 됩니다.

여기서 Geometry과 조금 다른점은 object 형태인 하나의 매개변수만 필요로 하고 있다는겁니다. 이럴경우 물론 object로 보내서 값을 변경할수 있겠지만, 더 나은 방법으로 해당 특성을 사용하여 속성을 직접 설정하는 방법도 있습니다.

```
<meshBasicMaterial args={ [ { ... } ] } /> //object로


//더 좋은 방법
<mesh>
     <sphereGeometry args={[1.5, 32, 32]} />
     <meshBasicMaterial color="black" wireframe /> //material.color.set('black')
 </mesh>
```

wireframe과 색을 검정색으로 지정해주면 밑과 같은 화면이 나옵니다.

<div style="width:700px; margin:auto;">

![wireframeblack](../../assets/images/r3f/r3f-wireframeblack.png)

</div>

### Mesh

더 나아가서 mesh 자체에 scale(스케일), position(위치) 및 rotation(회전) 설정을 해줄수도 있습니다.

Scale(스케일)

```
<mesh scale={[3, 2, 1]}>.  //x, y, z 를 다른값으로 주고 싶을때
        <boxGeometry />
        <meshBasicMaterial color="black" wireframe />
</mesh>

<mesh scale={1.5}>   // x,y,z에 같은 값을 주고 싶을때
        <boxGeometry />
        <meshBasicMaterial color="black" wireframe />
</mesh>
```

Position(위치)

```
<>
      <mesh position={[-2, 0, 0]} scale={[3, 2, 1]}>
        <boxGeometry />
        <meshBasicMaterial color="black" wireframe />
      </mesh>
      <mesh position={[2, 0, 0]} scale={1.5}>
        <boxGeometry />
        <meshBasicMaterial color="black" wireframe />
      </mesh>
</>


<mesh position-x={2} scale={1.5}>  // x-axis에만 position을 설정할때

<mesh position-x="2" scale={1.5}>  // { } 없이 x-axis에만 position을 설정할때
```

<div style="width:100%; margin:auto;">

![wireframePosition](../../assets/images/r3f/r3f-wireframePosition.png)

</div>

Rotation(회전)

```
<mesh rotation-y={Math.PI * 0.25} position={[-2, 0, 0]} scale={[3, 2, 1]}>
    <boxGeometry />
    <meshBasicMaterial color="black" wireframe />
</mesh>
<mesh rotation-x={Math.PI * 0.25} position={[2, 0, 0]} scale={1.5}>
    <boxGeometry />
    <meshBasicMaterial color="black" wireframe />
</mesh>
```

<div style="width:100%; margin:auto;">

![wireframePosition](../../assets/images/r3f/r3f-wireframeRotation.png)

</div>

## 애니매이션

물론 장면을 만드는것도 좋지만 3D개발에서 애니매이션이 빠지면 안되죠. scene(장면)은 이미 각 프레임에 그려지고 있지만 아무것도 움직이지 않기 때문에 애니매이션 없이는 시각적으로 보이지 않습니다. 

Mesh를 회전시키거나 움직임을 주기위해서는 useFrame이라는 hook을 사용하고 이 hook은 <canvas> 내부에 있는 구성요소에서만 호출할수 있습니다. 
