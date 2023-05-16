# 🛠️Firebase 를 사용한 간단한 SNS 만들기

<br/>
<p>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white" />
<p/>
<br/>

## 시작하기 전에...

- **Firebase** 는 **Google** 에서 제공하는 `back-end`
- 다만, 평소에 아는 `back-end` 가 아닌 편의성을 제공해주는 툴처럼 보는게 편함
- 사용하기 전 [Firebase](https://firebase.google.com/?hl=ko) 참고

<br/>
<hr/>

###### 202305014

> ## Firebase 연결하기

<br/>
<img src ="md_resources\resource_01.png" height="250"/>
<br/>

- `Firebase` 를 사용하기 위해선 [홈페이지](https://firebase.google.com/?hl=ko) 로 이동 후`Google` 로그인을 함
- `프로젝트 만들기` 를 클릭해 새 프로젝트를 생성
- `Firebase` 에서 제공하는 스크립트를 사용하기 위해 `npm install firebase` 설치
- 그 후 `firebase` 스크립트를 담아 둘 파일 생성

<br/>

```JS
//firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
}; // firebase 에서 제공하는 script

const app = initializeApp(firebaseConfig);

export default app;
```

<br/>
<img src ="md_resources\resource_02.png" height="250"/>
<br/>

설치 후 `console.log(firebase)` 로 찍어보면 정상 연결 된 것을 볼 수 있음

<br/>
<br/>
<hr/>

###### 202305016

> ## jsconfig.json 수정

<br/>

- `jsconfig.json` 파일 생성
- 해당하는 `baseUrl` 을 `src` 로 바꾸어 import 시 편리하게 변경
- `import` 기준 폴더 위치가 `src` 이므로 import 수정

<br/>

```JS
//App.js
import Router from "components/Router";
import fbase from "fbase";
import { authService } from "fbase";
```

<br/>

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

<br/>

> ## getAuth()

<br/>

- `authService` 를 사용하기 위해 `getAuth()` 함수로 `firebase` 에서 연동
- `authService.currentUser` 는 현재 유저 정보를 불러오며 **User | null type** [공식문서 참고](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#currentuser)

<br/>
<img src ="md_resources\resource_03.png" height="250"/>
<br/>

```JS
// App.js
export default function App() {
  //   console.log(authService.currentUser);
  // authService 의 currentUser var 는 현재 유저정보를 불러옴 User | null

  const [isLogin, setIsLogin] = useState(authService.currentUser);
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; {new Date().getFullYear()} Mwitter</footer>
    </>
  );
}
```

<br/>
<img src ="md_resources\resource_04.png" height="150"/>
<br/>

console.log() 를 찍어보면 아직 해당하는 유저값이 없으므로 null이 반환 되는 것을 볼 수 있음
