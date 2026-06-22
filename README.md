# 3차 과제 - Next.js & FastAPI로 Todo 앱 만들기

이 레포지토리는 Kakaotech Campus 3차 과제 결과물입니다. 
기존 React(Vite) + LocalStorage 기반의 프로젝트를 Next.js(App Router) + FastAPI 풀스택 구조로 마이그레이션 하였습니다.

## 📷 결과물 미리보기

(여기에 완성된 Todo 앱 스크린샷 이미지 링크를 삽입하세요.)

---

## 🚀 실행 방법

본 프로젝트는 Frontend와 Backend 서버를 각각 구동해야 합니다.

### 1. Backend (FastAPI) 실행
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate  # (Windows 환경 기준)
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
> 서버 가동 후 `http://localhost:8000/docs`에서 Swagger API 문서를 확인할 수 있습니다.

### 2. Frontend (Next.js) 실행
```bash
cd frontend
npm install
npm run dev
```
> 서버 가동 후 브라우저에서 `http://localhost:3000`으로 접속합니다.

---

## 📂 주요 변경 사항 및 과제 목표 달성 현황

### 필수 미션 달성 내용
- **Next.js & FastAPI 분리**: 디렉토리 분리 및 독립적 구동 성공.
- **API 연동**: FastAPI 기반 CRUD 로직과 Next.js 서버 컴포넌트(`actions.ts`), 라우트 핸들러(`route.ts`) 완벽 연동.
- **Server vs Client 컴포넌트**: `page.tsx`는 서버 렌더링, `TodoItem`, 캘린더 등 인터랙션이 잦은 영역은 `"use client"` 분리.
- **환경 변수 관리**: `.env.local` 파일 분리 완료.

### 도전 미션 달성 내용
- **서버 기반 필터링 및 검색**: 클라이언트의 배열 처리가 아닌 URL 파라미터(`?filter=...&search=...`)를 바탕으로 백엔드의 SQLAlchemy 쿼리로 데이터를 직접 제어하여 반환합니다. 새로고침해도 필터 상태가 완벽히 유지됩니다.

---

## 📝 개발 일지 및 기획 문서

기획부터 트러블슈팅까지의 개발 과정은 `docs/` 폴더 내에 정리되어 있습니다.
- [요구사항 정의서 (requirements.md)](docs/requirements.md)
- [아키텍처 및 상태 흐름도 (architecture.md)](docs/architecture.md)
- [트러블 슈팅 내역 (troubleshooting.md)](docs/troubleshooting.md)
