/*
  ~~까지가 릿 게임 벌스 템플릿

  새 벌스를 추가하는 방법:
  1. window.LIT_VERSES 배열 안에 객체 하나를 복사해서 붙여넣습니다.
  2. title에는 곡명이나 벌스 이름을 적습니다.
  3. text에는 지나가게 만들 가사를 그대로 붙여넣습니다.
  4. targetCount는 생략해도 됩니다.
     - 생략하면 벌스 길이에 비례해서 자동으로 제시어 개수가 정해집니다.
     - 최소 제시어 개수는 5개입니다.
     - 직접 숫자를 넣으면 그 숫자가 우선 적용됩니다.
     - 단계가 올라갈수록 제시어가 1개씩 추가됩니다.
  5. speed는 1단계 기준 속도입니다. 숫자가 클수록 빠릅니다.
     - 추천 범위: 520 쉬움, 680 보통, 840 빠름
     - 단계가 올라갈수록 속도가 조금씩 증가합니다.

  예시:
  {
    title: "곡 제목 - Verse 1",
    text: `
      여기에 벌스 전체를 붙여넣기
      줄바꿈은 그대로 둬도 됩니다
    `,
    speed: 245
  }
*/

window.LIT_VERSES = [
  {
    title: "[연습]애국가 1절",
    text: `
      동해물과 백두산이 마르고 닳도록
      하느님이 보우하사 우리나라 만세
      무궁화 삼천리 화려 강산
      대한 사람 대한으로 길이 보전하세
    `,
    speed: 720
  },
  {
    title: "Mr.RockLee",
    text: `
    Yeah JUSTHIS 12년 믹스테이프 랩 들어봄
이 새끼가 랩으로 돈 어케 벌어 했던 놈들
이제 내가 개처럼 버니 배깐치
허승 앨범에다가 태워버려 돈
쇼미 12 어때
JUSTHIS 없으니 재밌어, 효진 누나 어때요
휘민이 부르면 죽을 때까지 평생 (Let’s get it)
And it goes for all my 형제's
유승준, 군대에 긁힌 찬혁 맘들
영포티들, 악플 날 캔슬 못해
200억 없대도 여태 난 잘 냈어 세금
내 자유대한민국 색깔은 태극
타의적 음지
네 야마랑 내 야마는 달라, 단가
허승 할 말은 한다
인생사 새옹지마
세우처럼 울고 진효처럼 웃을 때도
나는 한 길만 팠다
노력까지 배신하면 정 없지
대한민국 정은 어디
K-Pop Demon Hunters money는
Columbia랑 Sony 거지
OKKK 좋은 게 좋은 거니
“이 벌스 하나가 릿보다 더 낫네” 까지가
'좀비딸' 부터 '어쩔수가없다' 평점까지가
쇼미더머니 치트키에서
쇼미에서 언급 Ch1tkey
까지 트립, 아니, 까지가 LIT
`,
    speed: 720
  },
  {
    title: "VVS",
    text: `
      Indigo carnival skrt, skrt, 목숨은 다 꺼내놓고
자판기 밑 먼지 덕지덕지 붙은 동전까지 털어, 털어
여기까지 왔지, what you know about me
내 속 이야기 털어놓으려 지갑 털어 차린 술상 위
넌 폰만 바라봤잖아
이제 그 스크린에서 날 봐라, I'ma
먹고서 fly, 너가 나갈 건 삔또지
악플들이 돈과 함께 쏟아지니
Got a nice ring to it
꼬우면 네 오빠인지 아저씨인지한테 일러바치고 한 판 더 뜨자 해, 빛이
나는 solo라니까 뭘 그렇게 재니
다 드루와, 내 패기
170에 60kg도 안 되지만 국보 1호 MC
The Q's certified new king in the rap
내가 TV에 쬐끔 나왔다고 연예인 된 줄 알았다는 이미 넌 패
Bigger stacks bigger schemes, do bigger thang
G+Jus like this team I'm blessed
모든 게 끝나고 홍대로 돌아가도 모든 건 변함없겠지
Like this VVS
    `,
    speed: 720
  },
  {
    title: "You",
    text: `
 알아
너도 나랑 같아
네 타임라인에 올라가는 남자들 봐봐
답 딱 나와 ㅎ
가봐
끝까지 가봐
거긴 아무것도 없어
너도 알고 나도 아는데
우린 밟아 부릉 밟아
Honestly 나 사실 기억도 안 나
Why we broke up
근데 다시 기억이 다 나
너는 바빠 또 바빠 ㅎ
돌아왔잖아
또 똑같은 이유
근데 이젠 싸우지도 않아
썩어가는 내 맘 누가 아는데
네 말대로면 우리 soulmates
그게 지금 무슨 의미가 있니
난 네 옆 fuckboy보다 있네 멀리
내가 잘한 것만은 아냐 절대로
그래도 부르고 있잖아 이 노래
내 눈엔 어떻게 될지가 다 뻔해
근데 넌 꼭 가봐야지만 알겠니 끝에
    `,
    speed: 720
  },
  {
    title: "Cooler than the Cool",
    text: `
     부끄러움은 익숙해져서 속옷에서 나체로
사랑은 일그러져, 징그러워
시선은 낮은데 시야만 넓어져
랩이랑 AV는 다른 점 없어
청춘을 팔아 돈을 사고 그 돈으로 감정을 팔어
엄마 손에 이끌려 학원에 가는 아이들은
보고 있어, 반대쪽 손에 든 폰 속에 아이돌을
타워팰리스 꼭대기의 view는 모두에게 공유됐지
자, 누가 차지하게 될지
기업은 사기를 치고 정부는 법 개정해
뉴스는 그걸 퍼 나르고 JUSTHIS 랩을 해
기본 뉴스 앱은 매일 알람 울려,
누가 사기를 쳤고 잡혔고 누가 누구를 죽였는지
근데 내 동네는 너무나도 평온해
저 사람들 마음속에 자살을 느끼지
공익광고는 웃는데 자살률 1위
누군가는 구라를 치고 누군가는 믿는 게 진실
근데 진실을 뱉음 사라지니?
아니라면 왜 내 TV엔 연예인만 비치지?
예시가 없으니 주장하긴 지치지
권하긴 미안해지지, 사랑은 무의미
나만 해도 내 동생들에게 권해, TV
허나 내 트랙에서만큼은 절대
인스타그램 DM엔 나랑 자려는 bitches
그게 자랑이 된 이 시대가 콘돔 벗기지
사람 죄가 없어, 상황이 더 큰 죄
근데 절대 안 바뀐다면 나만 누리지
모든 상황들은 계속 돌아가
그걸 발견한 이들도 다 돌아가
좋은 거 하나 남기겠단 너도 돈맛 봤더니 눈 돌아가
I’m just cooler than your cool
Fuck your 논리, fuck your money, fuck your 인기
Fuck your fashion, fuck your bitches, fuck your lyrics, fuck your errthang
모두 니 걸 원한다는 전제는
니가 모르는 새 이 나라가 묶어놨어
삶은 삶이지 경쟁이 아냐
삶은 사는 거지 싸우는 게 아냐
나는 그게 존재하는 사람들과 사랑
Real rappers don't die, only supply, motherfucker
    `,
    speed: 720
  },
  {
    title: "Diablo",
    text: `
Rap Diablo, Macho, when I drop flows
Rest in peace, Malcolm
어디던 장소 나는 뱉고픈 말로 보지
적들의 말로 그게 날 있게 해 왕으로
남자의 조건 챙기기 가족 Marlon Brando
주삿바늘 안 꽂아
마른 멸치로 살아도 머리 안 조아려
이 태도에 사내놈들이 반해 날 받들어
I'm the rap messiah
God이든 사탄이든 다 내 좆이나 빨어
내가 fuck인' pioneer
인정 못한다면 너 맛 좀 봐라
Shout out to 가리온 yeah
Veni vidi, bitch 말했어 이미 의미는 희미
남은 건 서른다섯 전 이민이니
인지 오류 피해 의식 끼리끼리 놀아
나는 선보이니 받지 박수 기립 기립 what
    `,
    speed: 720
  },
  {
    title: "INDIGO",
    text: `
      쟤네 회사 스튜디오 크기가
JUSTHIS 개인 스튜디오
영혼 팔았네 JUSTHIS도
좆까는 소리 마
Swings형이 말한 것처럼
This is Hyperreal
쩔어야 할 수 있는
Type of deal
오디션 안 보고
오디션으로만
가질 수 있는 걸
갖고 있는 이
삶이 멋없다 지랄 말고 걍 말해 내가 싫다
이건 시작이고 난 다 깰 거야 국힙 정치판
난 적어도 딴 래퍼들이
술자리에서만 하는 말
음악에서 보여줬지
이제 결과를 봤으니까
다 좆까라

난 Rihanna Eminem이랑
Friends될 거야 Monster
난 항상 본 모습
넌 빨아 남 똥꼬
난 태어났어 예술가로
야비한 새끼들은 전철 밟지
반면 난 내 좆대로 입지
yeah I'm on my worst behavior
Drake 전철 밟지 whoa

스튜디오에 계속
놀러 올 때마다 여자
Swings형에게 감사해야지
사드려야 해 돈까
근데 그럼 이 형은 말하지
승아 넌 채식주의자니까
딴 거 먹자 like this we one get it

비즈니스가 있어야 가족이 있는거야
이 좆밥 아마추어 새끼들아, ha
    `,
    speed: 720
  }
];
