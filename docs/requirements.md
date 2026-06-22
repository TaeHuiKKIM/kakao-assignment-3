# 요구사항 정의서 (Requirements)

## 1. 목적
기존 React(Vite) + 로컬스토리지 기반 Todo 앱을 Next.js(App Router)와 FastAPI 기반의 풀스택 구조로 분리하여 마이그레이션합니다. 이를 통해 서버/클라이언트 컴포넌트의 차이를 이해하고, 서버 API를 통한 데이터 영속성을 달성합니다.

## 2. 주요 기능 및 요구사항

### 2.1 Todo 생성/수정/삭제/조회 (CRUD)
- **조회**: Next.js 서버 컴포넌트 환경(`actions.ts`)에서 FastAPI(`GET /todos`)를 호출하여 초기 렌더링 시 데이터를 불러옵니다.
- **생성/수정/삭제**: 클라이언트 컴포넌트에서 Next.js의 API 프록시(`route.ts`)를 거쳐 FastAPI로 요청을 전달하여 보안과 CORS 이슈를 해결합니다.
- 사용자 인터랙션이 발생하면 데이터를 변경한 후 `router.refresh()`를 통해 서버로부터 최신 상태를 받아옵니다.

### 2.2 검색 (Search) 및 상태 필터링 (Filter)
- 필터 조건(`all`, `active`, `completed`)과 검색어 키워드는 URL 파라미터(`?filter=`, `?search=`)로 관리하여 공유 및 새로고침 시에도 유지됩니다.
- 필터링 연산 로직을 클라이언트가 아닌 백엔드(FastAPI)의 SQLAlchemy 쿼리 단계에서 처리하도록 위임합니다.

### 2.3 환경변수 분리
- API Base URL 등의 민감한 정보는 소스코드에 하드코딩하지 않고 `.env.local` 파일로 분리하여 관리합니다.
