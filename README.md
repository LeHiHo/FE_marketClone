# 맞왜틀조와 함께하는 당근마켓 클론 프로젝트

<br>
<div>
  <a href="https://fe-market-clone.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/배포 링크-ed234b?style=for-the-badge&logoColor=white" alt="example"/>
  </a>
</div>
<br>

### 0️⃣ Git convention

### ✅ Work Flow

1. [ 기능 명세](https://www.notion.so/6017bafc0aca4b7ba1d2854b208efe39?pvs=21) 를 기반으로 `Issue` 생성
2. 생성한 `Issue` 번호로 로컬에서 브랜치 생성(feature/#이슈번호)
3. `dev`의 최신변경사항을 pull 받아서 동기화
4. 구현완료후 `dev`로 push후 Pull Request 생성
5. 14:00에 팀원들과 함께 conflict 해결 후 `dev`로 merge
6. 브랜치 삭제후 1번으로

### ✅ Commit log

```
Feat : 새로운 기능 추가
Fix : 버그 수정
Env : 개발 환경 관련 설정
Style : 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만)
Refactor : 코드 리팩토링 (더 효율적인 코드로 변경 등)
Design : CSS 등 디자인 추가/수정
Comment : 주석 추가/수정
Docs : 내부 문서 추가/수정
Test : 테스트 추가/수정
Chore : 빌드 관련 코드 수정
Rename : 파일 및 폴더명 수정
Remove : 파일 삭제
```

### ✅ Branch Naming

```
feature/#이슈번호
```

### ✅ Branch strategy

### `main`

- 소비자가 사용하는 제품이 존재하는 (배포될 코드가 있는) 브랜치
  - PR받는 브랜치: `dev`
  - Pull Request merge 완료후 `dev` push 받기

### `dev(develop)`

- 개발 단계의 코드가 있는 (개발의 중심) 브랜치
- 개발 자체는 feature 브랜치에서 진행
  - PR받는 브랜치: `feature/#이슈번호`
  - 14:00에 다같이 Pull Request merge

### `feature/#이슈번호`

- 특정한 기능 (단위 기능) 을 구현하는 브랜치
- 기능 구현이 완료되면, `dev`로 pr
  - PR나가는 브랜치: dev
  - 구현완료시 Push후 Pull Request 생성

---

### 1️⃣ 초기설정

## ![image](https://github.com/EmploymentRescueTeam/FE_marketClone/assets/134940630/44bde4de-8c6d-4cda-ab1b-55e3256fe0d8)

### 2️⃣ 라우팅구조

```
📦src
┣ 📂app ➡️ 직접적인 라우팅 구조를 나타내는 폴더
┃ ┣ 📂category
┃ ┣ 📂login
┃ ┣ 📂main
┃ ┣ 📂mypage
┃ ┣ 📂product
┃ ┣ 📂search
┃ ┣ 📂signup
┃ ┣ 📂write
┃ ┣ 📜layout.tsx ➡️ 최상단 레이아웃(테마)
┃ ┗ 📜page.tsx ➡️ 시작페이지
┣ 📂components ➡️ 재사용이 가능한 코드
┣ 📂containers ➡️ 재사용이 곤란한 컴포넌트(하나의 기능이나 페이지에 주로사용)
┣ 📂services ➡️ API 요청 코드
┣ 📂styles ➡️ css 파일
┃ ┣ 📜globals.scss
┃ ┗ 📜reset.scss
┣ 📂types ➡️ 타입 지정 함수
┗ 📂utils ➡️ 데이터나 유틸관련 함수
```

---

### 3️⃣ 라이브러리

1.  Sass : 1.68.0

---
