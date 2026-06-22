# 트러블 슈팅 (Troubleshooting)

## ⚠️ 문제 상황 1: CORS 에러
프론트엔드(Client Component)에서 `axios.get('http://localhost:8000/todos')`로 백엔드에 직접 요청했을 때, 브라우저 콘솔에서 CORS (Cross-Origin Resource Sharing) 에러가 발생하며 데이터 조회가 막히는 현상을 겪었습니다.

### 💡 해결 과정
두 가지 방법을 적용하여 해결했습니다.
1. **백엔드단 CORS 미들웨어 적용**: `main.py`에 `CORSMiddleware`를 추가하여 `http://localhost:3000` 출처에서의 접근을 명시적으로 허용했습니다.
2. **Next.js 프록시(`route.ts`) 활용**: 보안 및 향후 확장을 고려하여 클라이언트가 백엔드로 직접 찌르지 않고, 같은 도메인인 `/api/todos`로 요청을 보낸 뒤 `route.ts`가 백엔드와 통신하도록 설계했습니다.

## ⚠️ 문제 상황 2: `params` 관련 Next.js 15 동기/비동기 에러
Next.js v15 환경에서 `app/api/todos/[id]/route.ts`나 수정 페이지에서 동적 라우팅 파라미터 `params.id`를 바로 참조하려 할 때 빌드/런타임 에러가 발생했습니다.

### 💡 해결 과정
Next.js 15에서는 동적 라우트 `params`가 `Promise` 형태로 반환되도록 변경되었습니다. 
해당 컴포넌트나 라우트 핸들러에서 `const { id } = await params;` 구문을 사용하거나 클라이언트 훅인 `use(params)`를 이용해 파라미터를 비동기적으로 해체 할당하여 해결했습니다.

## ⚠️ 문제 상황 3: 서버 상태와 클라이언트 URL 싱크
URL 기반의 검색어 및 필터 유지(`?filter=active&search=hi`) 로직을 도입했는데, 렌더링 시점에 검색창에 기존 검색어가 남아있지 않거나, 체크박스 토글 시 필터가 풀리는 이슈가 있었습니다.

### 💡 해결 과정
클라이언트의 `useSearchParams`를 읽어와 초기값을 `<input defaultValue={...} />` 에 반영하고, 상태 변경 시 빈 파라미터는 `delete` 시키는 방식의 유틸 함수를 작성하여 `router.push()` 하도록 최적화했습니다.
