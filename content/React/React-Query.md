---
title: "React Query를 사용하는 이유"
date: 2023-08-11
subtitle: "리액트 쿼리를 사용하는 이유와 장점들을 나열해보았습니다."
category: "React"
tags:
  - react-query
background: "r3f/r3f-livingroom.jpeg"
emoji: "🖥️"
draft: false
---

</br>

## React Query를 사용하는 이유

React Query는 서버의 값 Fetching, Cashing, 동기화, 서버 값 업데이트, 에러 핸들링 등 비동기 과정을 직관적이고 효율적인 방법으로 할 수 있게 해주는 라이브러리입니다. 프론트엔드 개발자가 React를 사용하면서 마주하게 되는 여러 가지 문제점 중 제일 대표적인 하나가 state 상태 관리에 관한 부분인데요. 대표적으로 React의 전역 상태 관리 도구에는 `redux`나 `recoil` 같은 라이브러리들이 존재하지만, 이러한 라이브러리들은 클라이언트 쪽의 데이터들을 관리하기엔 적합할 순 있어도 서버 쪽의 데이터들을 관리하기엔 적합하지 않은 점들이 있습니다.

클라이언트 쪽 위주로 전역 상태를 관리하는 도구들을 사용하다 보면 어느 순간부터 클라이언트 상태와 서버 상태가 함께 공존하게 되고 그 데이터들이 서로 상호작용하면서 애매한 상태의 데이터가 되어 버립니다. 예를 들면 서버에는 이미 업데이트가 되 버린 데이터가 클라이언트에서는 업데이트 되기전 데이터로 유저에게 보이거나 사용되고 있는 상황을 뜻합니다. React query를 사용하여 서버 상태를 관리한다면 클라이언트 상태를 분리하여 관리할 수 있기 때문에 훨씬 효율적인 방법이 될 것입니다.

React Query를 사용하기 좋은 예로는 클라이언트의 전역 상태 데이터가 많이 필요하지 않은 admin 페이지와 같은 관리형 페이지가 있습니다. 만약 동시에 두 명의 관리자가 같은 화면을 보고 있는 상황에서 한 관리자가 데이터를 변경할 경우 다른 관리자도 변경된 데이터를 볼 수 있어야 합니다. 이러한 경우 변경된 데이터는 클라이언트 쪽보다는 서버 쪽에서 관리하는게 더 적합하다고 볼 수 있고 React Query를 적용한다면 이 구조를 더 단순화 시킬 수 있습니다.

</br>

## React Query의 장점

### Data Fetching 또는 업데이트 로직을 단순화 할수 있습니다.

```
const getServerData = async () => {
  const data = await fetch("...").then((response) => response.json());
  return data;
};

// Before
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData()
      .then((result) => setData(result))
      .catch((e) => ... );
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

// After
export default function App() {
  const { data } = useQuery(["dataKey"], getServerData);
  return <div>{JSON.stringify(data)}</div>;
}
```

`useState`과 `useEffect`를 사용한 상태 관리 과정을 React query를 통해서 단순화 시킬 수 있습니다. React query를 사용함과 동시에 코드 수를 줄일수 있고 `useEffect`로 인해서 발생하는 `Side Effect`를 제거할 수 있습니다. 특히 react query가 내장된 기능으로 데이터 관련 로직들을 전부 처리해주기에 팀 프로젝트안의 개발자들이 동일화 된 방식으로 코드를 작성할 수 있습니다. 이러한 경우 서로의 코드를 보며 전체적인 흐름을 파악하는 것이 쉬워지게 되고 수정하는 일이 좀 더 수월해 지게 됩니다.

### 캐싱

- Caching을 통해서 API 콜과 서버에 대한 부담을 줄여줌으로써 어플리케이션의 속도를 높여줍니다.
- 가져온 데이터를 업데이트 할 경우 자동으로 업데이트된 데이터를 가져올수 있습니다.
- 동일 데이터에 대한 중복 요청을 제거합니다.
- 비동기 과정을 관리할 수 있습니다.
- 데이터가 오래 되었다고 판단될시 데이터를 다시 가져오는 시스템이 지원됩니다.
- React Hooks와 유사한 인터페이스를 제공하기에 React를 주로 썼던 개발자들에겐 진입장벽이 낮습니다.

</br>

## React Query 기본 설치 및 세팅

```
npm i @tanstack/react-query
```

React Query를 사용하기 위해서는 QueryClient 인스턴스를 생성하여 컴포넌트들이나 app 전체가 접근할 수 있도록 QueryClientProvider로 감싸줘야 합니다. 여기서 client prop으로 QueryClient를 넘겨줘야 합니다.

```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
);
```
