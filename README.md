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

### ✅ 체크리스트 (과제 요구사항 및 추가 구현)
- [x] **React(Vite) 기반 Todo 앱을 Next.js App Router 구조로 마이그레이션** (`page.tsx`, `layout.tsx` 등 파일 기반 라우팅 적용)
- [x] **Server Component와 Client Component의 명확한 역할 분리**
- [x] **FastAPI로 Todo CRUD API 구현 및 Next.js `route.ts` 프록시 연동** (풀스택 흐름 구축)
- [x] **서버 API 기반 데이터 흐름으로 전환** (초기 렌더링 시 Server Actions 활용)
- [x] **환경 변수 관리** (`.env.local` 분리 완벽 적용)
- [x] **서버 기반 필터링 및 검색 로직 (도전 과제)**: 클라이언트 필터링이 아닌 URL 쿼리와 DB 쿼리를 연동하여 새로고침 시에도 상태 완벽 유지
- [x] **글래스모피즘(Glassmorphism) 및 반응형 UI/UX 고도화**: 그라데이션 및 CSS 필터를 활용한 프리미엄 디자인 적용, 데스크탑 스크롤 뷰 완벽 대응
- [x] **주간/월간 캘린더 토글 기능 구현**: 월별 전체 일정을 콤팩트하게 파악할 수 있는 기능 커스텀 추가
- [x] **Favicon 및 메타 정보 적용**: SEO 및 브라우저 탭 아이콘 사용자 정의 완료

---

## 📝 개발 일지 및 기획 문서

기획부터 트러블슈팅까지의 개발 과정은 `docs/` 폴더 내에 정리되어 있습니다.
- [요구사항 정의서 (requirements.md)](docs/requirements.md)
- [아키텍처 및 상태 흐름도 (architecture.md)](docs/architecture.md)
- [트러블 슈팅 내역 (troubleshooting.md)](docs/troubleshooting.md)
