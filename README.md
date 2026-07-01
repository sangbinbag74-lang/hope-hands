# 희망손잡이 (익산) 홈페이지

> 손을 맞잡아 희망을 잇고, 함께 만드는 따뜻한 세상

전북 익산의 나눔 봉사단체 **희망손잡이**의 한 페이지 소개 사이트입니다.
설치가 필요 없는 순수 정적 웹사이트(HTML/CSS/JS)라 그대로 열거나 배포할 수 있습니다.

## 폴더 구조

```
index.html            ← 사이트 본문(모든 내용)
assets/
  css/style.css       ← 디자인/색상
  js/main.js          ← 동작(메뉴, 애니메이션, 신청 폼)
  img/logo.png        ← 로고
vercel.json           ← Vercel 배포 설정
```

## 미리보기 (내 컴퓨터에서)

`index.html` 파일을 더블클릭하면 브라우저에서 바로 열립니다.

## ✏️ 실제 정보로 바꿔야 할 곳 (체크리스트)

`index.html`에서 `✏️` 표시가 있는 부분과 아래 항목을 채워주세요.

- [ ] **연락처** — 전화번호 `010-XXXX-XXXX`, 이메일, 카카오 채널, 주소(익산 ○○로)
- [ ] **후원 계좌** — 은행/계좌번호/예금주
- [ ] **통계 숫자** — `data-count` 값(봉사자 수 등)을 실제 수치로
- [ ] **활동 사진** — 갤러리의 색상 칸을 실제 사진으로 교체
      (`<div class="gallery__ph g1">...</div>` → `<img src="assets/img/사진.jpg" alt="설명">`)
- [ ] **공지·소식** — 최신 소식으로 갱신
- [ ] **신청 폼 받는 이메일** — `assets/js/main.js` 맨 위 `CONTACT_EMAIL`

> 신청 폼은 기본적으로 방문자의 **이메일 작성 창**을 열어 위 주소로 보내도록 되어 있습니다.
> 서버 없이 폼을 바로 받고 싶다면 [Formspree](https://formspree.io) 같은 무료 서비스로
> 바꿀 수 있어요(요청 주시면 연결해 드립니다).

## 🚀 Git + Vercel로 배포하기

이미 로컬 Git 저장소로 커밋되어 있습니다. 아래 순서로 올리면 됩니다.

### 1) GitHub에 올리기
```bash
# GitHub에서 빈 저장소(예: hope-hands)를 하나 만든 뒤
git remote add origin https://github.com/<내계정>/<저장소이름>.git
git branch -M main
git push -u origin main
```

### 2) Vercel에 연결 (가장 쉬움)
1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. **Add New… → Project** → 방금 올린 저장소 선택
3. 프레임워크: **Other (정적 사이트)** 그대로 두고 **Deploy** 클릭
4. 잠시 뒤 `https://<프로젝트>.vercel.app` 주소가 생성됩니다 ✅

### (대안) Vercel CLI로 바로 배포
```bash
npm i -g vercel
vercel        # 안내에 따라 로그인 후 배포
vercel --prod # 실제 도메인에 반영
```

> 이후 코드를 수정하고 `git push` 하면 Vercel이 **자동으로 다시 배포**합니다.
