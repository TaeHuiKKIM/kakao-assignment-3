# 아키텍처 및 상태 흐름도 (Architecture)

## 1. 폴더 구조 및 분리 체계
```text
kakao-assignment-3/
├── backend/                  # FastAPI 기반 API 서버
│   ├── main.py               # 라우팅, DB 모델(SQLAlchemy), 스키마(Pydantic) 통합
│   └── todos.db              # SQLite 데이터베이스 파일
│
└── frontend/                 # Next.js 15 (App Router) 프론트엔드
    ├── app/
    │   ├── api/todos/route.ts# 백엔드 프록시 API (클라이언트 요청 우회)
    │   ├── actions.ts        # Server Actions (서버 렌더링 시 데이터 패칭)
    │   ├── todos/            # 페이지 라우팅
    │   └── components/       # Client/Server 컴포넌트 모음
    └── .env.local
```

## 2. 데이터 흐름 (Data Flow)

**1) 데이터 조회 (GET 요청)**
- 사용자 접속 ➡️ Next.js 서버(Server Component)에서 `actions.ts` 호출 ➡️ FastAPI로 직접 HTTP GET 요청 ➡️ 데이터 확보 후 HTML 조립 ➡️ 브라우저 전달

**2) 데이터 변경 (POST, PUT, DELETE 요청)**
- 사용자 버튼 클릭(Client Component) ➡️ Next.js 프록시(`app/api/todos/route.ts`)로 API 요청 ➡️ 백엔드(FastAPI) DB 업데이트 ➡️ `router.refresh()`로 최신화

## 3. Server Component vs Client Component
- **Server Component**: `app/todos/page.tsx` 등은 사용자와의 직접적인 상호작용(onClick 등)이 없으므로 서버에서 렌더링을 마쳐 클라이언트의 자바스크립트 번들 부담을 줄입니다.
- **Client Component**: `TodoPageClient`, `TodoItem`, 캘린더 등은 `useState`, `onClick` 이벤트를 처리하기 위해 파일 상단에 `"use client"`를 명시하여 상태를 가집니다.
