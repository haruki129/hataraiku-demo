;(function(){ 'use strict';

/* ========================================
   STATE — Global application state
   ======================================== */
var STATE = {
  currentTab: 'dashboard',
  user: { name: '樋口専務', email: 'higuchi@hataraiku.jp', role: 'AXリーダー' },
  _approvalFilter: 'all',
  _matchFilter: 'all',
  _invoiceFilter: 'all',
  _folderPath: ['ホーム'],
  _cardSearch: '',
  _chatChannel: 'general',
  _financeFilter: 'all',
  _attendanceView: 'table',
  isWorking: false,
  clockInTime: null,

  kpiData: [
    { label: '受注総額', value: '¥14,854万', change: '+12.3%', up: true, color: '#667eea',
      points: '0,35 15,28 30,22 45,25 60,18 75,12 90,8 100,5' },
    { label: '進行PJ', value: '3件', change: '+1 新規獲得', up: true, color: '#f093fb',
      points: '0,30 20,25 40,20 60,22 80,15 100,10' },
    { label: '稼働時間', value: '179h', change: '今月累計', up: true, color: '#4facfe',
      points: '0,35 15,30 30,25 45,28 60,20 75,15 100,10' },
    { label: '品質スコア', value: '93.8%', change: '-0.2% 深層データ算出', up: false, color: '#43e97b',
      points: '0,20 20,18 40,15 60,12 80,10 100,8' }
  ],

  monthlyChart: [
    { month: '10月', value: 8 }, { month: '11月', value: 15 },
    { month: '12月', value: 18 }, { month: '1月', value: 22 },
    { month: '2月', value: 35 }, { month: '3月', value: 62 },
    { month: '4月', value: 88 }
  ],

  activities: [
    { type: '申請中', title: '見積承認: テスト', date: '2026-03-31', color: '#667eea' },
    { type: '申請中', title: 'PJ変更: 梅田再開発ビル', date: '2026-03-31', color: '#667eea' },
    { type: '承認', title: '着工申請: 横浜マンション新築', date: '2026-03-29', color: '#2ed573' },
    { type: '承認', title: '完了報告: 京都町屋リノベーション', date: '2026-03-28', color: '#2ed573' },
    { type: '差戻し', title: '経費精算: 現場交通費', date: '2026-03-27', color: '#ff4757' }
  ],

  projects: [
    { name: '梅田再開発ビル', manager: '佐藤一郎', area: '大阪市 北区', progress: 50, status: '現地調査', color: '#667eea' },
    { name: '横浜マンション新築', manager: '山田次郎', area: '横浜市 中区', progress: 25, status: '案件相談', color: '#2ed573' },
    { name: '京都町屋リノベーション', manager: '佐藤一郎', area: '京都市 東山区', progress: 75, status: '見積提出', color: '#ffa502' },
    { name: '福岡オフィスビル改修', manager: '田中三郎', area: '福岡市 博多区', progress: 90, status: '施工中', color: '#ff6b81' },
    { name: '名古屋商業施設', manager: '鈴木四郎', area: '名古屋市 中区', progress: 10, status: '企画段階', color: '#7bed9f' }
  ],

  channels: [
    { id: 'general', name: '全社連絡', unread: 3, icon: '📢' },
    { id: 'project-a', name: '梅田再開発PJ', unread: 5, icon: '🏗️' },
    { id: 'project-b', name: '横浜マンションPJ', unread: 0, icon: '🏢' },
    { id: 'keiri', name: '経理部', unread: 1, icon: '💰' },
    { id: 'random', name: '雑談', unread: 0, icon: '☕' }
  ],

  messages: {
    'general': [
      { user: '佐藤一郎', time: '09:15', text: 'おはようございます。本日の全体ミーティングは10:00からです。', avatar: '佐' },
      { user: '山田次郎', time: '09:20', text: '了解しました。資料準備します。', avatar: '山' },
      { user: '田中三郎', time: '09:32', text: '福岡のオフィスビル改修、進捗95%に�me:-olor: '#ff6b81' },
   a��週��: �予定, avatar: '佐' },
  ��' { user: '田中三鋙', email: 'hi32', text:4'おはよう�疲れ様, avatar:午後��〚費'視察���, c5%�, val�ジュ��グ�確e: ���願��本', avatar: '山' },
  ��' '�selflor: ' messssageal': , name: '�{ user: '佐藤一郎', time: '09:15', tex8:3'了解し㖋発ビル', ma��, c盤olor: ��〵�果がr: 6b81' },
    '佐' },
      { user: '山田次郎', area: '名15', tex8:4'おはよ�構造tru�亂��,��正版をe: ップロ��グ���。資料準� '佐' },
  ��' { user: '山田次郎', time: '09:15', text:0'了解し�確e: ��', avatar:午後���, ava���ル攳グ����ックr: 6b', avata��    '佐' },
      { essssageal': , name: b�{ user: '佐藤一郎', time: '09:20', te�で�おはよ��ションPJ', unreaa��gertru図���最終版がr�f6b���資料準� '佐' },
      { user: '田中三鋙', email: 'hi32', te�� 'おはよぃ���、���グングは10:00か����'週, tva�ger定, 。資斂����r: '山' },
  ��' '�selflor: ' messssageal': me: '�{ user: '佐藤一�, unre 太: '09:20', te�1���おはよ�ue: 分��〵: 現場亂�〷�め切#ff6b�ue: 5��ミavatar: '佐' },
  ��� { user: '田中三� unre 太: '09:20', te�1��'おはよ�領収書���電子保存���忘������lor: �願��本', avatar: '山' },
  ��� { essssageal': ame: '�{ user: '佐藤一郎', time: '09:20', te�2:3'了解し�近くlorana��', �ラ��グ�0:0��ミava������資料溂�！ '山' },
      { user: '田中三郎', time: '09:32', te�2:3'おはよう資�, avata��！��'度行6b���資斂����！ '山' },
  ��' { essssaess}ges: : ['� name: '梅田再�プロ���ェク: '��し�'���' },
    �'#7beunよ24#667eea' },
    { name: '横浜マ�契約書'���' },
    �'#7beunよ8#ffa502' },
    { name: '福岡オ�図� ・gertru書'���' },
    �'#7beunよ15#2ed573' },
    { name: '京都町�写�ン���費'記録'���' },
    �'#7beunよ156#ff6b81' },
    { name: '名古屋� unre書類'���' },
    { #7beunよ42#7bed9f' }
  ],

  cme: '名古屋僤�内�ヮ�'���' },
    � #7beunよ6#ff6b81' },a29bfe  messages: file name: '梅田再開発ビル', m_��', co��_v3.pdfお㈻し'PDF '�siz3-27'.4MB2026-03-28', color: '#2�' },
    �'#ff4757' }
  ],

  pme: '横浜マンション新築', m_gertru図.dwgお㈻し'CAD '�siz3-2715.8MB2026-03-28', color:5'���' },
    �'#7be573' },
    { name: '京都町�ue: 度_��: 現場�ime覧.xlsxお㈻し'Excel '�siz3-27845KB2026-03-31', color: '#6�' },
    �'#7be573' },
    { name: '京都町倚費'写��_0325.zipお㈻し'ZIP '�siz3-2748.2MB2026-03-28', color:5'���' },
   ��  { #ffa502' },
    { name: '福岡オ�安��',��nre��ン�����: ル.docxお㈻し'Wor: {�siz3-271.2MB2026-03-28', color:0'#6�' },
    � #ffa502' },3742f{ name: '横浜マ�工程表_ue: .xlsxお㈻し'Excel '�siz3-27520KB2026-03-31', col4-0 '#6�' },
    �'#7be573' },
    { name: '京都町�議事録_��テ�会議_0401.pdfお㈻し'PDF '�siz3-27380KB2026-03-31', col4-0 '#6�' },
    �'#ff4757' }
  ],

  projects: lter: 'a id: 'general',�田次郎', time: '09:6-03-28', color: '#2ameunよ4500☕c-03gory��まdate: '2026esc�� 北区'��張得'幹線代''施工中',tle: 待ち id: 'random', 2,�藤一郎', time: '09:6-03-29', color: '#2ameunよ1280☕c-03gory���消耗� �'#76esc�� ��費'用安��'靴���ヘル���0:�: '202��工中',tle: 待ち id: 'random', 3,�中三郎', time: '09:6-03-27', color: '#fameunよ38000☕c-03gory���外注: '2026esc�� 電気olor�� 協力会���支払, �202��工中',tle: 済 id: 'random', 4,�田次郎', area: '名6-03-27', color:6'#fameunよ850☕c-03gory��まda��: '2026esc�� 取引先と���,��食: '202��工中', title: 'id: 'random', 5��田次郎', time: '09:6-03-28', color:5'#2ameunよ15600☕c-03gory���備� �'#76esc�� 測量機器�����新�ル: '202��工中',tle: 済 id: 'random', 6,�藤一郎', time: '09:6-03-29', color3'了ameunよ2300☕c-03gory��まdate: '2026esc�� ��シ〚費' 往復��date: '202��工中',tle: 待ち id: 'random', 7,�中三郎', time: '09:6-03-27', color:4了ameunよ6700☕c-03gory���材���: '2026esc�� ��フ〚費' 塗���・g�そ�202��工中',tle: 済 id: 'random', 8,�田次郎', area: '名6-03-27', color: '#6ameunよ54000☕c-03gory���外注: '2026esc�� 構造tru�� 委託 現��202��工中',tle: 待ち idrojects: 32',Recor: id: 'gener6-03-31', col4-0 '#6e: null tex8:3'了e: nuOuよ�18� 'おhou� na9.: '�over32', t1.: '�not再開発〚費' id: 'rando6-03-31', color: '#66: null tex8:0'了e: nuOuよ�19:3'了hou� na11. '�over32', t3. '�not再閜�末処nre id: 'rando6-03-31', color: '#2e: null tex8: 'おe: nuOuよ�17:4'おhou� na9. '�over32', t1. '�not再閸�区'��張 id: 'rando6-03-31', color:7'#2e: null tex9:0'了e: nuOuよ�17:3'了hou� na8. '�over32', t0. '�not再郤�内業l: 'id: 'rando6-03-31', color:6'#66: null tex8:0'了e: nuOuよ�2で�おhou� na12.0'�over32', t4.0'�not再鱋リペ費' 立,��, �2id: 'rando6-03-31', color:5'#6e: null tex8:3'了e: nuOuよ�17���おhou� na8. '�over32', t0. '�not再�ate常勤l: 'id: 'rando6-03-31', color:4'#6e: null tex7:4'おe: nuOuよ�18�3'了hou� na10.: '�over32', t2.: '�not再閗�朝搬入 idrojects: ter: 'a name: '梅�o���INV-', col042おe:ienよ 北区'��ger株式会���'#2ameunよ4500�0☕6-03-31', color 'おdu3-31', col4- 'お��工中'送���済 ��㈻し'請求書'name: '京�o���INV-', col043おe:ienよ ���区不動産��', m了ameunよ2800�0☕6-03-31', color:0'#6du3-31', col4-:0'#6��工中',��送��� ��㈻し'請求書'name: '京�o���EST-', col018おe:ienよ ��リノヮ����生機構'#fameunよ8900�0☕6-03-31', color:'おdu3-31—'#6��工中'��d渉e: 'PJ刻し'�', co��'name: '京�o���INV-', col041おe:ienよ 博多商r��株式会���'#2ameunよ1250�0☕6-03-31', color0 '#6du3-31', color: '#6��工中',��金済 ��㈻し'請求書'name: '京�o���RCP-', col012おe:ienよ 博多商r��株式会���'#2ameunよ1250�0☕6-03-31', col4r0 '#6du3-31—'#6��工中', m行済 ��㈻し'領収書'name: '京�o���EST-', col019おe:ienよ � 中区山区��', m了ameunよ1250�0�☕6-03-31', col4r0 '#6du3-31—'#6��工中'作成e: 'PJ刻し'�', co��'name: '京�o���INV-', col040おe:ienよ ������'��築gertrur��l: 所'#fameunよ320�0�☕6-03-31', col2r: '#2du3-31', color: '#2��工中',��限超過 ��㈻し'請求書'narojects: 3ransause s id: 'gener6-03-31', col4-0 '#66esc�� 北区'��ger ,��金'#facbeunよ'売上高'#66ebiよ4500�0☕crediよ☕c-0�� 収入 id: 'rando6-03-31', color: '#66esc�� ue: 分 給与支払, �202acbeunよ'給与手当'#66ebiよ☕crediよ320�0�☕c-0�� 人件: '2id: 'rando6-03-31', color: '#66esc�� r��l: 所���賃'#facbeunよ'地代���賃'#f6ebiよ☕crediよ45�0�☕c-0�� ��: � id: 'rando6-03-31', color: '#26esc�� g�そ�購入 ��', t'�����202acbeunよ'材���: '2026ebiよ☕crediよ8900�0��c-0�� 原価2id: 'rando6-03-31', color:5'#66esc�� ��シ�不動産 ,��金'#facbeunよ'売上高'#66ebiよ2800�0☕crediよ☕c-0�� 収入 id: 'rando6-03-31', color:0'#6desc�� 通信: '202acbeunよ'通信: '2026ebiよ☕crediよ850�☕c-0�� ��: � id: 'rando6-03-31', color152026esc�� ��フ�商r�� ,��金'#facbeunよ'売上高'#66ebiよ1250�0☕crediよ☕c-0�� 収入 id: 'rando6-03-31', color10'#6desc�� 保険��� 支払, �202acbeunよ'保険���2026ebiよ☕crediよ12�0�☕c-0�� ��: � id: 'rando6-03-31', color05'#66esc�� 化注: ' 電気olor��'#facbeunよ'外注: '2026ebiよ☕crediよ3800�0��c-0�� 原価2idhannels: [ar: id: 'gener都町� ti�� 健ime'#ff4mpany�� 北区'��ger株式会���'#2�了報呏�締役 営業部長s: 1hon, tex6-1234-5678'higuchi@hatamura@osaka-kensetsu.co: 'AX�tag id:''��ger', 北区', 重要']'佐' },
  ��' { user: ��都町屸�i�� 美咲'#ff4mpany�� ���区不動産��', m了�了報僫', mr��業部 部長s: 1hon, tex45-987-6543おguchi@hanakamura@yokohama-dev.co: 'AX�tag id:'不動産', ���区']'佐' },
  e: 'name: '横浜マ�小林 誠'#ff4mpany�� ��リノヮ����生機構'#f�了報�代表nrer��'#f1hon, tex75-111-2222おguchi@hakobayashi@kyoto-machiya.orgAX�tag id:'NPO', ��リ�', ���化財']'佐' },
  小'name: '横浜マ�高橋 裕也'#ff4mpany�� 博多商r��株式会���'#2�費精箷�l: 部 課長s: 1hon, tex92-333-4444'higuchi@hatakahashi@fukuoka-s.co: 'AX�tag id:''�er��'# 博多']'佐' },
  高' pme: '横浜マヸ�辺 直人'#ff4mpany�� � 中区山区��', m了�積承�ertru部 主任s: 1hon, tex52-555-6666'higuchi@haw' }nabe@nagoya-urban.co: 'AX�tag id:'�ertru', � 中区']'佐' },
  ��� { user: ��都町屼�藤 綾香'#ff4mpany�� ������'��築gertrur��l: 所'#f�了報�主任'��築士s: 1hon, tex3-7777-8888'higuchi@haito@tokyo-  _c.co: 'AX�tag id:'�ertru', ������', ���級'��築士s]'佐' },
  e��2idhannels: work� name: '梅田再�山本'��ger', skilスゆ�装', yea� na1 '�rat,
  c4.8'佐'ilsWorlor: '#4tag id:''��装仕上げ', ク: �ス', 床s]'�cer3 id:'1級'��装仕上, colo技豱士s]name: '横浜マ��', a電工', skilス�電気', yea� na20'�rat,
  c4.9'佐'ilsWorloor: '#4tag id:'電気olor��'#'照明', 配電盤s]'�cer3 id:'第���種電気olor��士s]name: '横浜マ�佐々, ager備', skilス�配管', yea� na12'�rat,
  c4.5'佐'ilsWorlor: '#4tag id:'給排水'#'空調配管', ガス']'�cer3 id:'管olor��, colo,��nre技士s]name: '横浜マ�高��メ�装', skilスァ�装', yea� na18'�rat,
  c4.7'佐'ilsWorlor: '#4tag id:''��壁���装','防水'#'吹��� ]'�cer3 id:'1級'��装技豱士s]name: '横浜マ�, ai��鉄工', skilス�鉄骨', yea� na25'�rat,
  c4.9'佐'ilsWorloor: '#4tag id:'鉄骨組立'#'溶接'#'据��� ]'�cer3 id:'1級'��築, colo,��nre技士s]name: '横浜マヸ�辺olo業', skilス�電気', yea� na8'�rat,
  c4.3'佐'ilsWorlor: '#4tag id:''��電'#'LAN','通信s]'�cer3 id:'第���種電気olor��士s]name: '横浜マ�� t'�����装', skilスゆ�装', yea� na10'�rat,
  c4.6'佐'ilsWorlor: '#4tag id:''��装', タイger: '左官 ]'�cer3 id:'2級'��装仕上, colo技豱士s]name: '横浜マ�北西配管', skilス�配管', yea� na22'�rat,
  c4.8'佐'ilsWorloor: '#4tag id:'給排水'#'消防ger備','��修���シ�ク: ���� ]'�cer3 id:'消防ger備士s]nahann
}====================================
   STATE — ICONS================================== */
var STATE = {
ICONSrentTab,
  user:���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>ointsl: '���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><path d="M21a1 a2 2 0 0 1-2 2H7l-4 4V a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>oints: ['ヂ��<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>oints, name:���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline0,20 20="14 2 14 8a20 8"/></svg>ointslter: 'a���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>ointsliew: 'tab���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><circle cx="12" cy="12" r="10"/><polyline0,20 20="12 6a12a12a16a14"/></svg>ointster: 'a���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line0x1="2" y1="10" x2="22" y2="10"/></svg>oints:er: 'a���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><line0x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5t3.  0 0 0 0 7h5a3.5t3.  0 0 1 0 7H6"/></svg>ointsler:���<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line0x1="2" y1="10" x2="22" y2="10"/><circle cx="8" cy="15" r="2"/><path d="M22 15h-6"/></svg>ointsr: 'a,
  c�<svg width="20" height="20" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16t3.13a4 4 0 0 1 0 7.75"/></svg>o
}====================================
   STATE — TABS Configure
   ================================== */
var STATE = {
TABS =ame: dom', n,
  user: {��質ス�
  _a���築�ボ��グ�'#6�' },
ICONS.,
  user:name: dom', nl: ' {��質ス�
 �ャ0:�: '202�' },
ICONS.l: 'name: dom', n: ['� {��質ス�
 �ォル���202�' },
ICONS.: ['�name: dom', n, name: {��質ス�
 �ロ���ェク: '202�' },
ICONS., name:name: dom', nlter: 'a {��質ス�許可願���202�' },
ICONS.lter: 'aname: dom', nliew: 'tab {��質ス�勤l: ,��nre202�' },
ICONS.liew: 'tabname: dom', nter: 'a {��質ス��', cズ・g��求書'02�' },
ICONS.ter: 'aname: dom', n:er: 'a {��質ス�入出金,��nre202�' },
ICONS.:er: 'aname: dom', nler: {��質ス�� 䈺,��nre202�' },
ICONS.cer:name: dom', nr: 'a,
  {��質ス�
 �0:�: �0:00�202�' },
ICONS.r: 'a,
 nah]====================================
   STATE — CORE INFRASTRUCTURE================================== */
var STATE { 'use s buildSidebar()ntTab= {
sb =adocumash.querySelme:or('.sidebar');ntstf (!sb) return;Tab= {
logoH =a'<div
/*yle="padd,
  20pxa16pxa10px;"><div
/*yle="font-siz3-20px;font-weight:800;f4757'white;">��す溂���本�</div><div
/*yle="font-siz3-10px;f4757'rgba(25 75, 75, 70.6);margin-top:2px;">知行合一l appAX革命</div></div>';Tab= {
tabsH =aTABS.r:p){ 'use stt)neral':= {
ac =a  cur.: 'dashboa==== t.id ? 'background'rgba(25 75, 75, 70.15);f4757'white;' , nl4757'rgba(25 75, 75, 70.7);';Tab  returna'<div
onclick="window._jp', role:swi 'aboa(\''+t.id+'\')"
/*yle="display:flex;align-items:casher;gap-10px;padd,
  10pxa16px;margin:2px 8px;bor'�-radius:8px;: 's57',20 2er;3ransise s:all 0.2s;'+ac+'"
onmouseover="this./*yle.background=\'rgba(25 75, 75, 70.1)\'"
onmouseout="this./*yle.background=\''+(a  cur.: 'dashboa==== t.id ? 'rgba(25 75, 75, 70.15)' , n3ranspadash' )+'\'">'+t.i' }+�<span
/*yle="font-siz3-13px;">'+t.�質�+�</span></div>';Tab}).j20 ('');nts= {
田�H =a'<div
/*yle="posise s:absolute;bottom:0;left:0;right:0;padd,
  12pxa16px;bor'�-top:1pxasolid rgba(25 75, 75, 70.1);display:flex;align-items:casher;gap-10px;"><div
/*yle="width:32px;height:32px;bor'�-radius:50%;background'linear-gradiash(135deg,,
    {,#764ba2);display:flex;align-items:casher;justify-' }ten�casher;f4757'white;font-siz3-14px;font-weight:700;">樋</div><div><div
/*yle="f4757'white;font-siz3-12px;font-weight:600;">'+  cur.田�.浜�+�</div><div
/*yle="f4757'rgba(25 75, 75, 70.5);font-siz3-10px;">'+  cur.田�.���+�</div></div></div>';Tabsb.ten��HTML =alogoH +a'<div
/*yle="margin-top:8px;">'+tabsH+�</div>' +a田�H;
}
 { 'use s buildMainArea()ntTab= {
main =adocumash.querySelme:or('.main');ntstf (!main) return;Tabmain.ten��HTML =a'<div
/*yle="padd,
  0 0 8px;display:flex;align-items:casher;justify-' }ten�space-between;"><h2
/*yle="margin:0;font-siz3-18px;f4757'#1a1a2e;">' +a(TABS.:erd){ 'use stt){returnat.id===  cur.: 'dashboa;})||{}).�質� +a'</h2></div><div
clas0="tab-' }ten�"></div>';Tabreturnamain.querySelme:or('.tab-' }ten�');n}
 { 'use s das'�boa()ntTab= {
' }tain�n= buildMainArea();ntstf (!' }tain�) return;Tabswi 'a (  cur.: 'dashboa)neral':case n,
  user: : das'�D
  user:(' }tain�); break;ral':case nl: ' : das'�C: '(' }tain�); break;ral':case n: ['� : das'�F ['�(' }tain�); break;ral':case n, name: : das'�P name:(' }tain�); break;ral':case nlter: 'a : das'�Ater: 'a(' }tain�); break;ral':case nliew: 'tab : das'�Aiew: 'tab(' }tain�); break;ral':case nter: 'a : das'�Ier: 'a(' }tain�); break;ral':case n:er: 'a : das'�Fer: 'a(' }tain�); break;ral':case nler: : das'�Cer:(' }tain�); break;ral':case nr: 'a,
  : das'�M: 'a,
 (' }tain�); break;ral}n}
 =================================
   STATE — RENDER FUNCTIONSr(Upgraded v6.1)================================== */
var STATE //======================== //=D
  user: Ras'� F 'use s //======================== { 'use s das'�D
  user:(' }tain�)neralif(!' }tain�)return;Tral//=Get greet,
  based
on 32', of dayntslonst�hou�n= new=D
te().getHou� ();ntslonst�greet,
  =�hou�n<a12a?�うございます。本日�' , hou�n<a18a?�う�んlor: ����' , n���んlo�んlo�';ntslonst�emoji =�hou�n<a12a?��🌅' , hou�n<a18a?��☀  { i,
   ��';Trallonst�nown= new=D
te();ntslonst�6-03St�n= `${now.getFullYear()}年${now.getM�', ()n+ 1}月${now.getD
te()}日 ${now.getHou� ().toSt�,
 ().padS', t(2,'0')}:${now.getMinute ().toSt�,
 ().padS', t(2,'0')}`;Trallonst�htmln= `ral':<div
/*yle="padd,
  24px; background'linear-gradiash(135deg, ,
    { 0%, ,764ba2  ],%); f4757'white; bor'�-radius:12px; margin-bottom:24px;">ser: '�<div
/*yle="display:flex; justify-' }ten�space-between; align-items:casher;">ser: '�'�<div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; margin-bottom:8px;">${emoji} ${greet,
 }a��,�', t太: 'さん</div>ser: '�'�'�<div
/*yle="font-siz3-14px; opacity:0.9;">${6-03St�}</div>ser: '�'�</div>ser: '�'�<div
/*yle="は�-align:right;">ser: '�'�':<div
/*yle="posise s:relative; display:inline-b: nu; : 's57',20 2er; margin-right:16px;">ser: '�'�':':<svg width="24" height="24" viewBox="0 0 24 24" fill="non,"
/* oke=": 'dashC4757"
/* oke-width="2">ser: '�'�':':':<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>ser: '�'�':':':<path d="M13.73 21a2 2 0 0 1-3.46 0"/>ser: '�'�':':</svg>ser: '�'�':':<div
/*yle="posise s:absolute; top:-6px; right:-6px; background'
  ],

; f4757'white; bor'�-radius:50%; width-20px; height-20px; font-siz3-12px; display:flex; align-items:casher; justify-' }ten�casher; font-weight:b [';">3</div>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="display:inline-b: nu;">ser: '�'�':':<span
/*yle="font-weight:600;">��体ミ�タスク: 5件</span>ser: '�'�'�</div>ser: '�'�</div>ser: '�</div>ser: </div>s
'�'�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-16px; margin-bottom:24px;">ser: '�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">��', value: </div>ser: '�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#66   {; margin-bottom:12px;">¥8,450</div>ser: '�'�<svg viewBox="0 0  ], 40"
/*yle="width: ],%; height-30px;">ser: '�'�':<polyline0,20 20=" 40,210' },3 40,145 }
 2 90,8 108s: '12
    {"
/* oke="#66   {"
/* oke-width="2" fill="non,"/>ser: '�'�':<polyline0,20 20=" 44,210' },3 40,145 }
 2 90,8 108s: '12
    {
    40"
fill="rgba(102,a126, 234, 0.1)"/>ser: '�'�</svg>ser: '�</div>ser: '�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;"> value: </div>ser: '�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#764ba2; margin-bottom:12px;">12件</div>ser: '�'�<svg viewBox="0 0  ], 40"
/*yle="width: ],%; height-30px;">ser: '�'�':<polyline0,20 20=" 75,12 80,135100,5' }
 6590,88 },
95904"
/* oke="#764ba2"
/* oke-width="2" fill="non,"/>ser: '�'�':<polyline0,20 20="544,22 80,135100,5' }
 6590,88 },
95904
95940"
fill="rgba(118'�: '�162, 0.1)"/>ser: '�'�</svg>ser: '�</div>ser: '�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">��', value: </div>ser: '�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#00b894; margin-bottom:12px;">168h</div>ser: '�'�<svg viewBox="0 0  ], 40"
/*yle="width: ],%; height-30px;">ser: '�'�':<polyline0,20 20=" 75820 60013510,85 100,60' },8' }9
95906"
/* oke="#00b894"
/* oke-width="2" fill="non,"/>ser: '�'�':<polyline0,20 20="544,22 80013510,85 100,60' },8' }9
95906
95940"
fill="rgba(0'�184, 148, 0.1)"/>ser: '�'�</svg>ser: '�</div>ser: '�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">��ア', value: </div>ser: '�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#
    {; margin-bottom:12px;">94%</div>ser: '�'�<svg viewBox="0 0  ], 40"
/*yle="width: ],%; height-30px;">ser: '�'�':<polyline0,20 20=" 75,22 80213510585 18,60' 4,8' }
 95903"
/* oke="#
    {"
/* oke-width="2" fill="non,"/>ser: '�'�':<polyline0,20 20="544,22 80213510585 18,60' 4,8' }
 95903
95940"
fill="rgba(5, 7�16 7�2, 0.1)"/>ser: '�'�</svg>ser: '�</div>ser: </div>s
'�'�<div
clas0="kp"
/*yle="padd,
  20px; margin-bottom:24px;">ser: '�<h3
/*yle="margin-top:0; margin-bottom:16px; font-siz3-16px; font-weight:600;">���次推移</h3>ser: '�<svg viewBox="0 0 80,28 0"
/*yle="width: ],%; height-250px;">ser: '�'�<!-- Grid lines -->ser: '�'�<line0x1="60" y1="30" x2="60" y2="250"
/* oke="#ddd"
/* oke-width="1"/>ser: '�'�<line0x1="60" y1="250"
x2="780" y2="250"
/* oke="#ddd"
/* oke-width="1"/>ser: '�'�<line0x1="60" y1="190"
x2="780" y2="190"
/* oke="#eee"
/* oke-width="1"
/* oke-,
  array="5,5"/>ser: '�'�<line0x1="60" y1="130"
x2="780" y2="130"
/* oke="#eee"
/* oke-width="1"
/* oke-,
  array="5,5"/>ser: '�'�<line0x1="60" y1="70"
x2="780" y2="70"
/* oke="#eee"
/* oke-width="1"
/* oke-,
  array="5,5"/>sser: '�'�<!-- Y-axis��質�s -->ser: '�'�<は� x="40"
y="25{"
font-siz3="12" fill="#999">0</は�>ser: '�'�<は� x="40"
y="13{"
font-siz3="12" fill="#999">50M</は�>ser: '�'�<は� x="25"
y="7{"
font-siz3="12" fill="#999"> ],M</は�>sser: '�'�<!--    {  lines -->ser: '�'�<polyline0,20 20="10 800,210' }6,22  90,,220' }2,28 0' 40135' }
, 40' }1,145 180 50�90 55 17
 2  185,600,6,2700,75�:   {0"ser: '�'�':':':::::/* oke="#66   {"
/* oke-width="3" fill="non,"
onmouseover="this./*yle./* oke='#764ba2'"
onmouseout="this./*yle./* oke='#
    { "/>ser: '�'�<polyline0,20 20="10 801,210' }7522  9095220' }3528 0' 55135' }2, 40' }3,145 1}
, 50' }1,155 19
 2  1105,600,8,2700,95�:   70"ser: '�'�':':':::::/* oke="#764ba2"
/* oke-width="3" fill="non,"
opacity="0.6"
onmouseover="this./*yle.opacity='1'"
onmouseout="this./*yle.opacity='0.6 "/>ser: '�'�<polyline0,20 20="10 802,210' }9,22  901,220' }5,28 0' 70135' }4, 40' }5,145 1}2, 50' }3,155 111
 2  1125,600,}
, 70' }15�:   90"ser: '�'�':':':::::/* oke="#
   6b"
/* oke-width="3" fill="non,"
opacity="0.4"
onmouseover="this./*yle.opacity='1'"
onmouseout="this./*yle.opacity='0.4'"/>sser: '�'�<!-- X-axis��質�s -->ser: '�'�<は� x="90"
y="27{"
font-siz3="12" fill="#999"> ���</は�>ser: '�'�<は� x="190"
y="27{"
font-siz3="12" fill="#999">2���</は�>ser: '�'�<は� x="290"
y="27{"
font-siz3="12" fill="#999">3���</は�>ser: '�'�<は� x="390"
y="27{"
font-siz3="12" fill="#999">4���</は�>ser: '�'�<は� x="490"
y="27{"
font-siz3="12" fill="#999">5���</は�>ser: '�'�<は� x="590"
y="27{"
font-siz3="12" fill="#999">6���</は�>ser: '�'�<は� x="690"
y="27{"
font-siz3="12" fill="#999">7���</は�>ser: '�'�<は� x="740"
y="27{"
font-siz3="12" fill="#999">8���</は�>sser: '�'�<!-- Legend -->ser: '�'�<circle cx="1 0"
cy="25"
r="4" fill="#66   {"/>ser: '�'�<は� x="110"
y="30"
font-siz3="12">��', ve: </は�>ser: '�'�<circle cx="2 0"
cy="25"
r="4" fill="#764ba2"/>ser: '�'�<は� x="210"
y="30"
font-siz3="12">支r: e: </は�>ser: '�'�<circle cx="280"
cy="25"
r="4" fill="#
   6b"/>ser: '�'�<は� x="290"
y="30"
font-siz3="12">���益</は�>ser: '�</svg>ser: </div>s
'�'�<div
/*yle="display:grid; grid-template-' lumns:1fr 1fr; gap-24px; margin-bottom:24px;">ser: '�<div
clas0="kp"
/*yle="padd,
  20px;">ser: '�'�<h3
/*yle="margin-top:0; margin-bottom:16px; font-siz3-16px; font-weight:600;">���近の�: ク: は10:�: は1</h3>ser: '�'�<div
/*yle="space-y:8px;">ser: '�'�'�<div
/*yle="display:flex; align-items:casher; padd,
  12px; bor'�-left:4pxasolid #66   {; margin-bottom:8px; background'
 8f9ff;">ser: '�'�':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'
66   {; margin-right:12px;"></div>ser: '�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">��', u
 �ロ���ェク: ',tle: </div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:2px;">営業PJ - ', c/04/03 14:32</div>ser: '�'�'�'�</div>ser: '�'�'�'�<span
clas0="sb"
/*yle="background'
66   {; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px;">��', u</span>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="display:flex; align-items:casher; padd,
  12px; bor'�-left:4pxasolid #00b894; margin-bottom:8px; background'
 0fdf4;">ser: '�'�':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'
00b894; margin-right:12px;"></div>ser: '�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">���次��������グ�,tle: 済</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:2px;">', c/04/02
  :15</div>ser: '�'�'�'�</div>ser: '�'�'�'�<span
clas0="sb"
/*yle="background'
00b894; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px;">��: �</span>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="display:flex; align-items:casher; padd,
  12px; bor'�-left:4pxasolid #
    {; margin-bottom:8px; background'
 ffbf0;">ser: '�'�':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'

    {; margin-right:12px;"></div>ser: '�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">'��張 現���浜�待ち</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:2px;">', c/04/02
xt:4'</div>ser: '�'�'�'�</div>ser: '�'�'�'�<span
clas0="sb"
/*yle="background'

    {; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px;">���機</span>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="display:flex; align-items:casher; padd,
  12px; bor'�-left:4pxasolid #
   6b; margin-bottom:8px; background'
 ff5f5;">ser: '�'�':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'

   6b; margin-right:12px;"></div>ser: '�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">g��求書,��送���</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:2px;">INV-', col01 - ', c/04/01</div>ser: '�'�'�'�</div>ser: '�'�'�'�<span
clas0="sb"
/*yle="background'

   6b; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px;">要対応</span>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="display:flex; align-items:casher; padd,
  12px; bor'�-left:4pxasolid #66   {; margin-bottom:0; background'
 8f9ff;">ser: '�'�':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'
66   {; margin-right:12px;"></div>ser: '�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">営業提�u書��:成</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:2px;">', c/04/01 16 20</div>ser: '�'�'�'�</div>ser: '�'�'�'�<span
clas0="sb"
/*yle="background'
66   {; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px;">��: �</span>ser: '�'�'�</div>ser: '�'�</div>ser: '�</div>sser: '�<div
clas0="kp"
/*yle="padd,
  20px;">ser: '�'�<h3
/*yle="margin-top:0; margin-bottom:16px; font-siz3-16px; font-weight:600;"> value, tv �ロ���ェク: '</h3>ser: '�'�<div
/*yle="space-y:12px;">ser: '�'�'�<div
/*yle="margin-bottom:16px;">ser: '�'�':':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:6px;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">営業: </div>ser: '�'�':':':<div
/*yle="font-siz3-13px; f4757'#66   {;">75%</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
clas0="pb"
/*yle="height-8px; background'
eee; bor'�-radius:4px; overflow:hidden;">ser: '�'�':':':<div
clas0="pf"
/*yle="width:75%; height- ],%; background'
66   {; bor'�-radius:4px;"></div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="margin-bottom:16px;">ser: '�'�':':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:6px;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">��篹修�ム改善</div>ser: '�'�':':':<div
/*yle="font-siz3-13px; f4757'#764ba2;">52%</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
clas0="pb"
/*yle="height-8px; background'
eee; bor'�-radius:4px; overflow:hidden;">ser: '�'�':':':<div
clas0="pf"
/*yle="width:52%; height- ],%; background'
764ba2; bor'�-radius:4px;"></div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="margin-bottom:16px;">ser: '�'�':':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:6px;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">��ア'向上タスク</div>ser: '�'�':':':<div
/*yle="font-siz3-13px; f4757'#00b894;">88%</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
clas0="pb"
/*yle="height-8px; background'
eee; bor'�-radius:4px; overflow:hidden;">ser: '�'�':':':<div
clas0="pf"
/*yle="width:88%; height- ],%; background'
00b894; bor'�-radius:4px;"></div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�'�<div
/*yle="margin-bottom:16px;">ser: '�'�':':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:6px;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">� �0:�al��は10:00�</div>ser: '�'�':':':<div
/*yle="font-siz3-13px; f4757'#
    {;">43%</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
clas0="pb"
/*yle="height-8px; background'
eee; bor'�-radius:4px; overflow:hidden;">ser: '�'�':':':<div
clas0="pf"
/*yle="width:43%; height- ],%; background'

    {; bor'�-radius:4px;"></div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�'�<div>ser: '�'�':':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:6px;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:600;">���: �����: ン: '対応</div>ser: '�'�':':':<div
/*yle="font-siz3-13px; f4757'#
   6b;">'8%</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
clas0="pb"
/*yle="height-8px; background'
eee; bor'�-radius:4px; overflow:hidden;">ser: '�'�':':':<div
clas0="pf"
/*yle="width:28%; height- ],%; background'

   6b; bor'�-radius:4px;"></div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�</div>ser: '�</div>ser: </div>s
'�'�<div
/*yle="display:grid; grid-template-' lumns:repe '(5,1f�); gap-12px;">ser: '�<button
clas0="btn"
onclick="window._jp', role:swi 'aboa('C: '')"
/*yle="padd,
  12px; bor'�:non,; bor'�-radius:8px; background'
66   {; f4757'white; : 's57',20 2er; font-siz3-13px; font-weight:600;">💬 
 �ャ0:�: '</button>ser: '�<button
clas0="btn"
onclick="window._jp', role:swi 'aboa('F ['�')"
/*yle="padd,
  12px; bor'�:non,; bor'�-radius:8px; background'
764ba2; f4757'white; : 's57',20 2er; font-siz3-13px; font-weight:600;">📁 
 �ァイger</button>ser: '�<button
clas0="btn"
onclick="window._jp', role:swi 'aboa('Ater: 'a')"
/*yle="padd,
  12px; bor'�:non,; bor'�-radius:8px; background'
00b894; f4757'white; : 's57',20 2er; font-siz3-13px; font-weight:600;">✓ ,tle: </button>ser: '�<button
clas0="btn"
onclick="window._jp', role:swi 'aboa('Ier: 'a')"
/*yle="padd,
  12px; bor'�:non,; bor'�-radius:8px; background'

    {; f4757'white; : 's57',20 2er; font-siz3-13px; font-weight:600;">📋 g��求</button>ser: '�<button
clas0="btn"
onclick="window._jp', role:swi 'aboa('Fer: 'a )"
/*yle="padd,
  12px; bor'�:non,; bor'�-radius:8px; background'

   6b; f4757'white; : 's57',20 2er; font-siz3-13px; font-weight:600;">💰 財務</button>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n}
 //======================== //=C: ' Ras'� F 'use s //======================== { 'use s das'�C: '(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.:: 'M
    'g)neral':window.  cur.:: 'M
    'g =ame: 'random',1, [
    {: name: '全auth57'郎', t太: '09:��' },
'👨‍💼09:32', ext: 'おは�う�疲れ様, avatar:営業: �����melor: ���本�話し合��本日斂����r: '�isOwn:or: '{ user: '田m',2, [
    {: name: '全auth57'�あ: '#��09:��' },
'👤09:32', ext: 8おは��,tl知��。資料準�今月��ャ�上は95%達成��ava������まavatar: '�isOwn:r: ' muser: '田m',3, [
    {: name: '全auth57'郎', t花子09:��' },
'👩‍💼09:32', ext:2'おは��素晴�����', �！詳細: '報告書���: �願��本', avatar: '�isOwn:or: '{ user: '田m',4, [
    {: sales全auth57'��', aime: '09:��' },
'👨‍💻09:32', e�で'おは�ㅗ', u
��: �����: ン: '獲得���, c5 avata��、a��週の��ングは10:00か�相談��料溂本�vatar: '�isOwn:or: '{ user: '田m',5, [
    {: sales全auth57'�あ: '#��09:��' },
'👤09:32', e�で8おは�ました���の全�曜��ミ�13時: �大丈夫��avatar: '�isOwn:r: ' muser: ];ral':window.  cur.: 'dashC
    { =a'name: '�;ral':window.  cur.onlineUserg =a{ name: 'id:'�', t太: '09:郎', t花子09:�あ: '#��0], salesid:'�', aime: '09:�あ: '#��0] };ral}nrallonst�[
    {g =am name: '全 sales全'market,
 全'engineer,
 全'man  'mash'];ntslonst�m
    'g =awindow.  cur.:: 'M
    'g.fil2er(m => m.c
    { ===:window.  cur.: 'dashC
    {);ntslonst�onlineCeun� =awindow.  cur.onlineUserg[window.  cur.: 'dashC
    {]?.length || 0;Trallonst�htmln= `ral':<div
/*yle="display:flex; height- ],%; gap-0;">ser: '�<!-- Left Pa  {: C
    {g -->ser: '�<div
/*yle="width:280px; background'

5f7f{; bor'�-right- pxasolid #ddd; overflow-y:auto;">ser: '�'�<div
/*yle="padd,
  16px; bor'�-bottom:1pxasolid #ddd;">ser: '�'�'�<h3
/*yle="margin 0 0 12pxa0; font-siz3-14px; font-weight:700; f4757'#333;">� �ャ0:�: �ger</h3>ser: '�'�':<div
/*yle="display:flex; gap-8px;">ser: '�'�':':<input
clas0="inp"�㈻�="は�" placeh ['�="検索..."
/*yle="flex:�; padd,
  8pxa12px; bor'�: pxasolid #ddd; bor'�-radius:6px; font-siz3-13px;"/>ser: '�'�'�</div>ser: '�'�</div>ser: '�'�<div
/*yle="padd,
  8px;">ser: '�'�':${[
    {g.r:p)(ch'�idx) => {ser: '�'�':':lonst�unread =am1, 3, 5].tecludes(idx) ? Math.floor(Math.ame: '() * 5)n+ 1 : 0;Ter: '�'�':':lonst�isActive =ach ===:window.  cur.: 'dashC
    {;Ter: '�'�':':returna`ser: '�'�':':':<div
onclick="window.  cur.: 'dashC
    {='${[
}';:window.das'�C: '(documash.querySelme:or('[d' }-tab=C: ']'));"ser: '�'�':':':::::
/*yle="padd,
  12px; margin-bottom:4px; background'${isActive ? },
    { n' }
  f'}; f4757'${isActive ? },  f'n' }
333'}; bor'�-radius:8px; : 's57',20 2er; display:flex; justify-' }ten�space-between; align-items:casher; 3ransise s:all 0.3s;">ser: '�'�':':':'�<div
/*yle="display:flex; align-items:casher; gap-8px; flex:�;">ser: '�'�':':':':':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'${isActive ? },  f'n' }

    { };"></div>ser: '�'�'�'�'�':':<span
/*yle="font-siz3-13px; font-weight:600;">#:${[
}</span>ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�':${unread > 0 ? `<span
/*yle="background'

   6b; f4757'white; bor'�-radius:12px; width-20px; height-20px; display:flex; align-items:casher; justify-' }ten�casher; font-siz3-11px; font-weight:700;">${unread}</span>`n' }'}
: '�'�'�'�'�'�</div>ser: '�'�'�'�`;Ter: '�'�':}).j20 ('')}ser: '�'�</div>ser: '�'�<div
/*yle="padd,
  16px; bor'�-top:1pxasolid #ddd; margin-top:16px;">ser: '�'�':<h4
/*yle="margin 0 0 12pxa0; font-siz3-12px; font-weight:700; f4757'#999; は�-3ransform:uppercase;">��シ�� ������� (${onlineCeun�})</h4>ser: '�'�':<div
/*yle="space-y:8px;">ser: '�'�'�':${window.  cur.onlineUserg[window.  cur.: 'dashC
    {]?.r:p)田� => `
: '�'�':':':'�<div
/*yle="display:flex; align-items:casher; gap-8px; margin-bottom:8px;">
: '�'�':':':':':<div
/*yle="width:28px; height-28px; bor'�-radius:50%; background'linear-gradiash(135deg, ,
    {, ,764ba2); f4757'white; display:flex; align-items:casher; justify-' }ten�casher; font-siz3-12px; font-weight:700;">ser: '�'�'�'�'�':':${u���.[
 rAt(0)}ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�':<div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-12px; font-weight:600;">${u���}</div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-11px; f4757'#999;">��シ�� �������</div>ser: '�'�'�'�'�':</div>ser: '�'�'�'�'�':<div
/*yle="width:8px; height-8px; bor'�-radius:50%; background'
00b894; margin-left:auto;"></div>ser: '�'�':':':</div>ser: '�'�'�'�`).j20 ('') || }'}
: '�'�'�'�</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Right Pa  {: M
    'g -->ser: '�<div
/*yle="flex:�; display:flex; flex-directe s:' lumn; background'
 ff;">ser: '�'�<!-- Head�� -->ser: '�'�<div
/*yle="padd,
  16px 20px; bor'�-bottom:1pxasolid #ddd; background'
 8f9fa;">ser: '�'�':<h2
/*yle="margin:0; font-siz3-16px; font-weight:700;">#:${window.  cur.: 'dashC
    {}</h2>
'�'�'�':':<div
/*yle="font-siz3-12px; f4757'#999; margin-top:4px;">${onlineCeun�}人a���シ�� �������</div>ser: '�'�</div>sser: '�'�<!-- M
    'g Area -->ser: '�'�<div
/*yle="flex:�; overflow-y:auto; padd,
  20px; display:flex; flex-directe s:' lumn; gap-12px;">ser: '�':':${m
    'g.r:p)msg => `
: '�'�':':':<div
/*yle="display:flex; gap-12px; ${msg.isOwn ? }flex-directe s:row-reverse'n' }'}">ser: '�'�':':':<div
/*yle="width:36px; height-36px; bor'�-radius:50%; background'linear-gradiash(135deg, ,
    {, ,764ba2); f4757'white; display:flex; align-items:casher; justify-' }ten�casher; font-siz3-16px; flex-shrink:0;">ser: '�'�'�'�'�':${msg.��' },}
: '�'�'�'�'�'�</div>ser: '�'�'�'�':<div
/*yle="${msg.isOwn ? }align-self:flex-as''n' }'}; flex:�; max-width:60%;">ser: '�'�':':':'�<div
/*yle="display:flex; gap-8px; margin-bottom:4px; ${msg.isOwn ? }flex-directe s:row-reverse'n' }'}; align-items:casher;">ser: '�'�'�'�'�':':<span
/*yle="font-siz3-13px; font-weight:600;">${msg.�uth57}</span>ser: '�'�'�'�'�'�':<span
/*yle="font-siz3-11px; f4757'#999;">${msg.32',}</span>ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�':<div
/*yle="background'${msg.isOwn ? },
    { n' }
 0 0 0'}; f4757'${msg.isOwn ? },  f'n' }
333'}; padd,
  12px; bor'�-radius:12px; wor'-wrap-break-wor'; font-siz3-13px; line-height- .5;">ser: '�'�'�'�'�':':${msg.3���}ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>ser: '�'�'�`).j20 ('')}ser: '�'�'�<div
/*yle="は�-align:casher; f4757'#999; font-siz3-12px; margin-top:auto; padd,
 -top:12px; bor'�-top:1pxasolid #eee;">ser: '�'�':':<span
/*yle="posise s:relative;">ser: '�'�':':':<span
/*yle="display:inline-b: nu; width:8px; height-8px; bor'�-radius:50%; background'
66   {; margin 0 2px; anime
   :pu: '{1.4s infinite;"></span>ser: '�'�'�'�'�<span
/*yle="display:inline-b: nu; width:8px; height-8px; bor'�-radius:50%; background'
66   {; margin 0 2px; anime
   :pu: '{1.4s infinite 0.2s;"></span>ser: '�'�'�'�'�<span
/*yle="display:inline-b: nu; width:8px; height-8px; bor'�-radius:50%; background'
66   {; margin 0 2px; anime
   :pu: '{1.4s infinite 0.4s;"></span>ser: '�'�'�'�</span> 누군가 입력 중입니다...
: '�'�'�'�</div>ser: '�'�</div>sser: '�'�<!-- M
    ' Input
-->ser: '�'�<div
/*yle="padd,
  16px 20px; bor'�-top:1pxasolid #ddd; background'
 8f9fa;">ser: '�'�':<div
/*yle="display:flex; gap-12px;">ser: '�'�':':<input
id=":: 'Input"
clas0="inp"�㈻�="は�" placeh ['�="メ_a����0:�al����入力..."
/*yle="flex:�; padd,
  10pxa14px; bor'�: pxasolid #ddd; bor'�-radius:8px; font-siz3-13px;"/>ser: '�'�'�'�<button
clas0="btn"
onclick="window.sas'C: 'M
    '()"
/*yle="padd,
  10px 20px; background'
66   {; f4757'white; bor'�:non,; bor'�-radius:8px; : 's57',20 2er; font-weight:600;"> v�信</button>ser: '�'�'�</div>ser: '�'�</div>ser: '�</div>ser: </div>s
'�'�</*yle>ser: '�@keyfram
  pu: '{{ser: '�'�0%, 60%,  ],% { opacity: 0.3; }ser: '�'�3,% { opacity: 1; }ser: '�}ser: <//*yle>ser`;Trallontain�.ten��HTML =ahtml;nral//=Setup input

  dlerTabsetT2',out(() => {ser: lonst�input
=llontain�.querySelme:or('#:: 'Input');ntsalif(input){{ser: '�input.addEvashListame:('keypr
  ', (e) => {ser: '�'�if(e.key ===:'E 2er' && !e.shiftKey) {ser: '�'�':e.preventDefault();Ter: '�'�':window.sas'C: 'M
    '();Ter: '�'�}ser: '�});Ter: }ser}, 0);n}
 window.sas'C: 'M
    '
=l{ 'use st) {serlonst�input
=ldocumash.querySelme:or('#:: 'Input');ntsif(!input
|| !input.value.trim()) return;Trallonst�newMsg = {ser: m', (window.  cur.:: 'M
    'g?.length || 0)n+ 1user: [
    {::window.  cur.: 'dashC
    {user: auth57':�あ: '#��0user: a�' },
  👤09ser: 32',  new=D
te().getHou� ().toSt�,
 ().padS', t(2,'0') +a':' +anew=D
te().getMinute ().toSt�,
 ().padS', t(2,'0')9ser: 3��� input.value9ser: isOwn:or: 'ser};Tralif(!window.  cur.:: 'M
    'g)nwindow.  cur.:: 'M
    'g =am];ntswindow.  cur.:: 'M
    'g.push(newMsg);ntsinput.value =a'';Tralwindow.das'�C: '(documash.querySelme:or('[d' }-tab=C: ']'));
}====/======================== //=F ['� Ras'� F 'use s //======================== { 'use s das'�F ['�(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.: ['�D
ta)neral':window.  cur.: ['�D
ta = {ser:   : 'dashPath: ['ル��グ�']user: '�: ['� name: '�'random',1, 浜�'営業資料', ㈻�:n: ['� {�siz3-0,�6-03:'', c/03/ 'おitems:5{ user: '�'田m',2, 浜�'g��求書'02㈻�:n: ['� {�siz3-0,�6-03:'', c/03/20おitems:12{ user: '�'田m',3, 浜�'契約書'02㈻�:n: ['� {�siz3-0,�6-03:'', c/03/10おitems:8{ user: '�'田m',4, 浜�'会議資料', ㈻�:n: ['� {�siz3-0,�6-03:'', c/04/02おitems:3�}ser: '�]user: '�:ilesid:e: '�'random',10, 浜�'', c年度予算.xlsx', ㈻�:nexcel {�siz3-'2.4MB',�6-03:'', c/03/25'{ user: '�'田m',11, 浜�'���次��������グ�.pdf', ㈻�:npdf', siz3-'1.8MB',�6-03:'', c/04/01'{ user: '�'田m',12, 浜�'営業戦略.pptx', ㈻�:npr
 ashe
   ', siz3-'5.2MB',�6-03:'', c/03/28'{ user: '�'田m',13, 浜�'�ア'基準.docx', ㈻�:nwor'', siz3-'0.8MB',�6-03:'', c/03/20�{ user: '�'田m',14, 浜�'顧客一覧.csv', ㈻�:ncsv', siz3-'450KB',�6-03:'', c/04/02'�}ser: '�]user: '�s:or  'Use', 591user: '�s:or  'Tot 'id10240Ter: };ral}nrallonst�s:or  'Percash = (window.  cur.: ['�D
ta.s:or  'Use' / window.  cur.: ['�D
ta.s:or  'Tot ' *  ],).toFixed(1);Trallonst�getFileIlon = (㈻�) => {ser: lonst�ilons =a{ pdf
'🔴',�excel
'🟢',�pr
 ashe
   
'🔵',�wor'
'🟠',�csv:'⚪',�: ['ヂ'📁' };ral':returnailons[㈻�] || }📄';Tab};Trallonst�getFileC4757 = (㈻�) => {ser: lonst�f4757s =a{ pdf
'

   6b',�excel
'
00b894',�pr
 ashe
   
',
    { ,�wor'
'

    {',�csv:'#764ba2' };ral':returnaf4757s[㈻�] || }#999';Tab};Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- Breadcrumb -->ser: '�<div
/*yle="display:flex; align-items:casher; gap-8px; margin-bottom:20px; font-siz3-13px;">ser: '�'�${window.  cur.: ['�D
ta.: 'dashPath.r:p)(p'�idx) => `
: '�'�':':<span>${p}</span>ser: '�'�'�${idx < window.  cur.: ['�D
ta.: 'dashPath.length - 1 ? }<span
/*yle="f4757'#ccc;">›</span>'n' }'}
: '�'�'�`).j20 ('')}ser: '�</div>sser: '�<!-- S:or  ' -->ser: '�<div
clas0="kp"
/*yle="padd,
  16px; margin-bottom:20px;">ser: '�'�<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:8px;">ser: '�'�'�<span
/*yle="font-siz3-13px; font-weight:600;">��修�������al�使������況</span>ser: '�'�'�<span
/*yle="font-siz3-13px; f4757'#66   {; font-weight:600;">${window.  cur.: ['�D
ta.s:or  'Use'}MB / ${window.  cur.: ['�D
ta.s:or  'Tot '}MB</span>ser: '�'�</div>ser: '�'�<div
clas0="pb"
/*yle="height-10px; background'linear-gradiash(90deg, ,ddd 0%, ,ddd  ],%); bor'�-radius:5px; overflow:hidden;">ser: '�'�':<div
clas0="pf"
/*yle="width:${s:or  'Percash}%; height- ],%; background'linear-gradiash(90deg, ,
    { 0%, ,764ba2  ],%);"></div>ser: '�'�</div>ser: '�'�<div
/*yle="font-siz3-12px; f4757'#999; margin-top:8px;">${s:or  'Percash}% 使���中</div>ser: '�</div>sser: '�<!-- Search -->ser: '�<div
/*yle="margin-bottom:20px;">ser: '�'�<input
id=": ['�Search"
clas0="inp"�㈻�="は�" placeh ['�="ファイgerを検索..."
/*yle="width: ],%; padd,
  10pxa14px; bor'�: pxasolid #ddd; bor'�-radius:8px; font-siz3-13px;"/>ser: '�</div>sser: '�<!-- F ['�s Grid -->ser: '�<div
/*yle="margin-bottom:24px;">ser: '�'�<h3
/*yle="font-siz3-14px; font-weight:600; margin 0 0 12pxa0;">� �ォル���</h3>ser: '�'�<div
/*yle="display:grid; grid-template-' lumns:repe '(auto-fill, minmax(140px, 1fr)); gap-12px; margin-bottom:20px;">ser: '�'�'�${window.  cur.: ['�D
ta.: ['� .r:p){ => `
: '�'�':':':<div
onclick="window.  cur.: ['�D
ta.: 'dashPath.push('${f.浜�}');:window.das'�F ['�(documash.querySelme:or('[d' }-tab=F ['�]'));"ser: '�'�':':'::::clas0="kp"
/*yle="padd,
  16px; は�-align:casher; : 's57',20 2er; 3ransise s:all 0.3s; bor'�:2pxasolid 3ranspadash;"ser: '�'�':':'::::onmouseover="this./*yle.bor'�C4757='#
    { ; 3his./*yle.background='
 8f9ff';"ser: '�'�':':'::::onmouseout="this./*yle.bor'�C4757='3ranspadash'; 3his./*yle.background='
 ff';">ser: '�'�':':':<div
/*yle="font-siz3-48px; margin-bottom:8px;">📁</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; font-weight:600; margin-bottom:4px; wor'-break-break-wor';">${f.浜�}</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-11px; f4757'#999;">${f.items}, c5 ��: イ���ム</div>ser: '�'�'�'�</div>ser: '�'�'�`).j20 ('')}ser: '�'�</div>ser: '�</div>sser: '�<!-- Files Table -->ser: '�<div
/*yle="margin-bottom:20px;">ser: '�'�<h3
/*yle="font-siz3-14px; font-weight:600; margin 0 0 12pxa0;">� �ァイger</h3>ser: '�'�<div
/*yle="overflow-x:auto;">ser: '�'�'�<�able /*yle="width: ],%; bor'�-f47lapse:f47lapse; font-siz3-13px;">ser: '�'�'�'�<�head>ser: '�'�'�'�'�<tr
/*yle="background'

5f7f{; bor'�-bottom:2pxasolid #ddd;">ser: '�'�'�'�'�'�<�h
/*yle="padd,
  12px; は�-align:left; font-weight:600; f4757'#333; : 's57',20 2er;">� � </�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  12px; は�-align:left; font-weight:600; f4757'#333; : 's57',20 2er;">タイge�</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  12px; は�-align:left; font-weight:600; f4757'#333; : 's57',20 2er;">サ����:�</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  12px; は�-align:left; font-weight:600; f4757'#333; : 's57',20 2er;">更新日</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  12px; は�-align:casher; font-weight:600; f4757'#333;">操作</�h>ser: '�'�'�'�'�</�r>ser: '�'�'�'�</�head>ser: '�'�'�'�<tbody>ser: '�'�'�'�'�${window.  cur.: ['�D
ta.:iles.r:p){ => `
: '�'�':':':'�'�<tr
/*yle="bor'�-bottom:1pxasolid #eee; 3ransise s:all 0.3s;"
onmouseover="this./*yle.background='
 8f9ff';"
onmouseout="this./*yle.background='
 ff';">ser: '�'�':':':'�'�<td
/*yle="padd,
  12px; display:flex; align-items:casher; gap-8px;">ser: '�'�':':':'�'�'�<span
/*yle="font-siz3-20px;">${getFileIlon(f.㈻�)}</span>ser: '�'�'�'�'�'�':':<span
/*yle="font-weight:600;">${f.浜�}</span>ser: '�'�'�'�'�'�':</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  12px;">ser: '�'�':':':'�'�'�<span
/*yle="background'${getFileC4757(f.㈻�)}; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px; font-weight:600;">${f.㈻�.toUpperCase()}</span>ser: '�'�'�'�'�'�':</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  12px; f4757'#666;">${f.siz3}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  12px; f4757'#666;">${f.6-03}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  12px; は�-align:casher;">ser: '�'�er: '�'�'�'�<button
clas0="btn2"
onclick="alert('v �レ0:�: ����: ${f.浜�}')"
/*yle="padd,
  6pxa12px; background'non,; bor'�: pxasolid #ddd; bor'�-radius:4px; : 's57',20 2er; font-siz3-11px; f4757'#66   {;">👁️ v �レ0:�: ����</button>ser: '�'�'�'�'�'�':</td>ser: '�'�':':':'�</�r>ser: '�'�'�'�'�`).j20 ('')}ser: '�'�'�'�</�body>ser: '�'�'�</�able>ser: '�'�</div>ser: '�</div>sser: '�<!-- Upload Zon, -->ser: '�<div
clas0="kp"
/*yle="padd,
  32px; は�-align:casher; bor'�:2pxa,
  ed #66   {; bor'�-radius:8px; background'

8f9ff; : 's57',20 2er;"
onmouseover="this./*yle.background='
 0f2ff';"
onmouseout="this./*yle.background='
 8f9ff';">ser: '�'�<div
/*yle="font-siz3-40px; margin-bottom:12px;">📤</div>ser: '�'�<div
/*yle="font-siz3-14px; font-weight:600; margin-bottom:4px;">� �ァイger���:��� ��a����＆:��� �0:�: �</div>ser: '�'�<div
/*yle="font-siz3-12px; f4757'#999;">� ava���ざ�リ�a������料�選択</div>ser: '�</div>ser: </div>s
'�'�</*yle>ser: '��able th:hover {ser: '�'�background' #ee 0f8;ser: '�}ser: <//*yle>ser`;Trallontain�.ten��HTML =ahtml;nralsetT2',out(() => {ser: lonst�search =llontain�.querySelme:or('#: ['�Search');ntsalif(search) {ser: '�search.addEvashListame:('input', (e) => {ser: '�'�lonst�2erm =l�.target.value.toLowerCase();ser: '�'�lonst�rows =llontain�.querySelme:orAll('�body 3r');ser: '�'�rows.: rEach(rown=> {ser: '�'�':lonst�n��� =lrow.3���C }ten�.toLowerCase();ser: '�'�'�row./*yle.displayn= n���.tecludes(2erm) ? ''n' }non,';Ter: '�'�});ser: '�});Ter: }ser}, 0);n}
 =/======================== //=Ater: 'a Ras'� F 'use s //======================== { 'use s das'�Ater: 'a(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.lter: 'aD
ta)neral':window.  cur.lter: 'aD
ta = {ser:   fil2er: }all'user: '�ltelice
    name: '�'random',1, ltelicent:',�', t太: '09:�meun�:45000, ce
egory:'経費09:descrip
   
'営業会議���飲食代', status:'pas',
 全6-03:'', c/04/03',�company:'ABC Corp'{ user: '�'田m',2, ltelicent:'�', t花子09:�meun�:128000, ce
egory:''��張09:descrip
   
'大阪'��張交通費宿泊費09:status:'pas',
 全6-03:'', c/04/02',�company:'XYZ Ltd'{ user: '�'田m',3, ltelicent:'��', time: '09:�meun�:15000, ce
egory:'備品09:descrip
   
'�シ���10��用椅子09:status:'lter: ed',�6-03:'', c/04/01',�company:'ABC Corp'{ user: '�'田m',4, ltelicent:'�', a美咲09:�meun�:89000, ce
egory:'経費09:descrip
   
'展示会参加費09:status:'lter: ed',�6-03:'', c/03/31',�company:'Delta Inc'{ user: '�'田m',5, ltelicent:'�'々, a健太09:�meun�:52000, ce
egory:''��張09:descrip
   
'東京'��張（3日間）09:status:'rejme:ed',�6-03:'', c/03/30',�company:'Gamma Co'�}ser: '�]Ter: };ral}nrallonst�allAteg =awindow.  cur.lter: 'aD
ta.ltelice
    ;ntslonst�fil2eredAteg =awindow.  cur.lter: 'aD
ta.fil2er ===:'all'Ter: ?�allAtegTer: :�allAteg.fil2er(an=> a.s:atus ===:window.  cur.lter: 'aD
ta.fil2er);Trallonst�s:ats = {ser: tot 'idallAteg.lengthuser: pas',
 :�allAteg.fil2er(an=> a.s:atus ===:'pas',
 �).lengthuser: lter: ed:�allAteg.fil2er(an=> a.s:atus ===:'lter: ed').lengthuser: rejme:ed:�allAteg.fil2er(an=> a.s:atus ===:'rejme:ed').lengthTab};Trallonst�getS:atusC4757 = (s:atus) => {ser: lonst�f4757s =a{ pas',
 :'

    {',�lter: ed:'
00b894',�rejme:ed:'

   6b' };ral':returnaf4757s[s:atus] || }#
    { ;Tab};Trallonst�getS:atusT��� = (s:atus) => {ser: lonst�3���s =a{ pas',
 :',tle: 待ち',�lter: ed:',tle: 済',�rejme:ed:'差戻���' };ral':returna3���s[s:atus] || s:atus;Tab};Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- S:ats -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">����浜�</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#66   {;">${s:ats.tot '}</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">¥${(allAteg.reduce((s,a)=>s+a.lmeun�,0)/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,tle: 待ち</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
    {;">${s:ats.pas',
 }</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">¥${(allAteg.fil2er(a=>a.s:atus==='pas',
 �).reduce((s,a)=>s+a.lmeun�,0)/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,tle: 済</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#00b894;">${s:ats.lter: ed}</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">¥${(allAteg.fil2er(a=>a.s:atus==='lter: ed').reduce((s,a)=>s+a.lmeun�,0)/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">差戻���</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
   6b;">${s:ats.rejme:ed}</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">¥${(allAteg.fil2er(a=>a.s:atus==='rejme:ed').reduce((s,a)=>s+a.lmeun�,0)/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Filt�s -->ser: '�<div
/*yle="display:flex; gap-8px; margin-bottom:20px; flex-wrap-wrap;">ser: '�'�<button
clas0="btn"
onclick="window.  cur.lter: 'aD
ta.fil2er='all';:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.lter: 'aD
ta.fil2er==='all'?}#
    { :}
 0 0 0'}; f4757'${window.  cur.lter: 'aD
ta.fil2er==='all'?}# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':���て (${s:ats.tot '})ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.lter: 'aD
ta.fil2er='pas',
 �;:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.lter: 'aD
ta.fil2er==='pas',
 �?'

    {':}
 0 0 0'}; f4757'${window.  cur.lter: 'aD
ta.fil2er==='pas',
 �?'

 f':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':,tle: 待ち (${s:ats.pas',
 })ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.lter: 'aD
ta.fil2er='lter: ed';:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.lter: 'aD
ta.fil2er==='ater: ed'?'
00b894':}
 0 0 0'}; f4757'${window.  cur.lter: 'aD
ta.fil2er==='ater: ed'?'

 f':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':,tle: 済 (${s:ats.lter: ed})ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.lter: 'aD
ta.fil2er='rejme:ed';:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.lter: 'aD
ta.fil2er==='rejme:ed'?'

   6b':}
 0 0 0'}; f4757'${window.  cur.lter: 'aD
ta.fil2er==='rejme:ed'?'

 f':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':���戻��� (${s:ats.rejme:ed})ser: '�'�</button>ser: '�</div>sser: '�<!-- Atelice
     -->ser: '�<div
/*yle="display:grid; gap-12px;">ser: '�'�${fil2eredAteg.r:p)lte => `
: '�'�':':<div
clas0="kp"
/*yle="padd,
  16px; bor'�-left:4pxasolid ${getS:atusC4757)lte.s:atus)}; display:flex; justify-' }ten�space-between; align-items:casher; 3ransise s:all 0.3s;">ser: '�'�':':<div
/*yle="flex:�;">ser: '�'�':':':<div
/*yle="display:flex; align-items:casher; gap-12px; margin-bottom:8px;">
: '�'�':':':':':<div
/*yle="width:40px; height-40px; bor'�-radius:50%; background'linear-gradiash(135deg, ,
    {, ,764ba2); f4757'white; display:flex; align-items:casher; justify-' }ten�casher; font-weight:700; font-siz3-14px;">ser: '�'�'�'�'�':':${lte.ltelicent.[
 rAt(0)}ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�':<div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-14px; font-weight:600;">${lte.ltelicent}</div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-12px; f4757'#999;">${lte.company}</div>ser: '�'�'�'�'�':</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�'�<div
/*yle="display:flex; gap-12px; margin-top:8px; flex-wrap-wrap;">ser: '�'�'�':':':<div
/*yle="font-siz3-13px;">ser: '�'�'�'�'�':':<span
/*yle="font-weight:600;">¥${lte.lmeun�.toLocaleSt�,
 ()}</span>ser: '�'�'�'�'�'�':<span
/*yle="background'${getS:atusC4757)lte.s:atus)}; f4757'white; padd,
  2px 8px; bor'�-radius:4px; font-siz3-11px; margin-left:8px; font-weight:600;">${getS:atusT���)lte.s:atus)}</span>ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�':<div
/*yle="font-siz3-13px; f4757'#666;">ser: '�'�'�'�'�':':<span
/*yle="background'
 0f0f0; padd,
  2px 8px; bor'�-radius:4px; font-siz3-11px; font-weight:600;">${lte.ce
egory}</span>ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-top:8px;">${lte.descrip
   }</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
/*yle="display:flex; gap-8px; margin-left:16px;">ser: '�'�':':':${lte.s:atus ===:'pas',
 � ? `
'�'�er: '�'�'�'�<button
clas0="btn"
onclick="window.lter: eAtelice
   (${lte.id});:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::':':':::/*yle="padd,
  8px 16px; background'
00b894; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">✓ ,tle: </button>ser: '�: '�'�'�'�<button
clas0="btn"
onclick="window.rejme:Atelice
   (${lte.id});:window.das'�Ater: 'a(documash.querySelme:or('[d' }-tab=Ater: 'a]'));"ser: '�'�':':':::':':':::/*yle="padd,
  8px 16px; background'

   6b; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">✗ 却下</button>ser: '�: '�'�'�`n' `
'�'�er: '�'�'�'�<button
clas0="btn2"
onclick="alert('�浜�詳細::${lte.ltelicent}')"
/*yle="padd,
  8px 16px; background'non,; bor'�: pxasolid #ddd; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">詳細</button>ser: '�: '�'�'�`}ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�`).j20 ('')}ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n}
 window.lter: eAtelice
   
=l{ 'use stid) {serlonst�lte =awindow.  cur.lter: 'aD
ta.ltelice
    .find(an=> a.id ===:id);ntsif(lte) lte.s:atus =:'lter: ed';
}===window.rejme:Atelice
   
=l{ 'use stid) {serlonst�lte =awindow.  cur.lter: 'aD
ta.ltelice
    .find(an=> a.id ===:id);ntsif(lte) lte.s:atus =:'rejme:ed';
}====/======================== //=Attend: 'a Ras'� F 'use s //======================== { 'use s das'�Attend: 'a(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.lttend: 'aD
ta)neral':window.  cur.lttend: 'aD
ta = {ser:   isC: nued:�or: 'user: '�c: nuInT2',  nulluser: '�recor' name: '�'random',1, 6-03:'', c/04/03',�in ext:00',�out:'18:30',�hou� :9.5, over32', 0, �otes:'通常勤務'{ user: '�'田m',2, 6-03:'', c/04/02おin ex8:45',�out:'20: 'おhou� :11.5, over32', 2.0, �otes:'v �ロ���ェク: '会議'{ user: '�'田m',3, 6-03:'', c/04/01',�in ext:15',�out:'17:45',�hou� :8.5, over32', 0, �otes:'通常勤務'{ user: '�'田m',4,�6-03:'', c/03/31',�in ext:00',�out:'18:00',�hou� :9.0, over32', 0, �otes:'���末締切対応'{ user: '�'田m',5, 6-03:'', c/03/28'��in ex8:30',�out:'19:00',�hou� :10.5, over32', 1.0, �otes:'営業打ち合���せ'�}ser: '�]user: '�m }thlySummary:田workDay na18, tot 'Hou� na156, over32',Hou� na8,�remain,
 Vace
   na12�}ser: };ral}nrallonst�nown=anew=D
te();ntslonst�c: nuT2',n=anew=D
te().toLocaleT2',St�,
 ('ja-JP',�{�hou�: '2-digit', minute: '2-digit', second' '2-digit', hou�12:�or: '�});Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- Digital C: nu -->ser: '�<div
clas0="kp"
/*yle="padd,
  32px; は�-align:casher; margin-bottom:20px; background'linear-gradiash(135deg, ,
    { 0%, ,764ba2  ],%); f4757'white;">ser: '�'�<div
id="digitalC: nu"
/*yle="font-siz3-56px; font-weight:700; font-family:m }ospace; margin-bottom:16px; letter-spac,
  4px;">ser: '�'�':${[: nuT2',}ser: '�'�</div>ser: '�'�<div
/*yle="font-siz3-14px; opacity:0.9; margin-bottom:16px;">ser: '�'�'�${window.  cur.lttend: 'aD
ta.isC: nued ? '⏱️ 勤務中'n' }✓ 退勤済'}ser: '�'�</div>ser: '�'�<button
clas0="btn"
onclick="window.toggleC: nuInOut();"
/*yle="padd,
  12px 24px; background'${window.  cur.lttend: 'aD
ta.isC: nued?'

   6b':}
00b894'}; f4757'white; bor'�:non,; bor'�-radius:8px; : 's57',20 2er; font-siz3-14px; font-weight:700; margin-right-8px;">ser: '�'�'�${window.  cur.lttend: 'aD
ta.isC: nued ? '🛑 退勤'n' }🟢 '��勤'}ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="alert('休憩開始 )"
/*yle="padd,
  12px 24px; background'

    {; f4757'white; bor'�:non,; bor'�-radius:8px; : 's57',20 2er; font-siz3-14px; font-weight:700;">☕ 休憩</button>ser: '�</div>sser: '�<!-- M }thly Summary -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">���勤日数</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#66   {;">${window.  cur.lttend: 'aD
ta.m }thlySummary.workDay }</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">日</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">総労働時間</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#764ba2;">${window.  cur.lttend: 'aD
ta.m }thlySummary.tot 'Hou� }</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">時間</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,��業時間</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
    {;">${window.  cur.lttend: 'aD
ta.m }thlySummary.over32',Hou� }</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">時間</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher; background'
 ff5f5; bor'�:2pxasolid #
   6b;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,��休残</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
   6b;">${window.  cur.lttend: 'aD
ta.m }thlySummary.remain,
 Vace
   }</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">日</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- 36協定 Chenuer -->ser: '�<div
clas0="kp"
/*yle="padd,
  16px; margin-bottom:20px; background'
 ffbf0; bor'�-left:4pxasolid #
    {;">
'�':':':<div
/*yle="display:flex; align-items:casher; gap-8px; margin-bottom:8px;">
: '�'�':':<span
/*yle="font-siz3-16px;">⚠️</span>ser: '�'�'�<h3
/*yle="margin 0; font-siz3-14px; font-weight:700;">36協定� �ェ�a����</h3>ser: '�'�</div>ser: '�'�<div
/*yle="display:grid; grid-template-' lumns:1f� 1fr; gap-12px; margin-top:12px; font-siz3-12px;">ser: '�'�'�<div>ser: '�'�':':<div
/*yle="f4757'#666; margin-bottom:4px;">年間上限: 720時間</div>ser: '�'�'�'�<div
/*yle="display:flex; gap-8px; align-items:casher;">ser: '�'�'�'�'�<span
/*yle="font-weight:700; font-siz3-14px;">550h</span>ser: '�'�'�'�'�<div
clas0="pb"
/*yle="flex:�; height-6px; background'
eee; bor'�-radius:3px;">
: '�'�':':':':':<div
clas0="pf"
/*yle="width:${(550/720)* ],}%; height- ],%; background'#00b894;"></div>ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�'�<div>ser: '�'�':':<div
/*yle="f4757'#666; margin-bottom:4px;">当月上限:  ],時間</div>ser: '�'�'�'�<div
/*yle="display:flex; gap-8px; align-items:casher;">ser: '�'�'�'�'�<span
/*yle="font-weight:700; font-siz3-14px;">8h</span>ser: '�'�'�'�'�<div
clas0="pb"
/*yle="flex:�; height-6px; background'
eee; bor'�-radius:3px;">
: '�'�':':':':':<div
clas0="pf"
/*yle="width:${(8/100)* ],}%; height- ],%; background'#00b894;"></div>ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�</div>ser: '�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:8px;">建設業特例: 年間720時間、a��間 ],時間</div>ser: '�</div>sser: '�<!-- T2',nRecor'  -->ser: '�<div
/*yle="margin-bottom:20px;">ser: '�'�<h3
/*yle="font-siz3-14px; font-weight:600; margin 0 0 12pxa0;">勤務記録</h3>ser: '�'�<div
/*yle="overflow-x:auto;">ser: '�'�'�<�able /*yle="width: ],%; bor'�-f47lapse:f47lapse; font-siz3-12px;">ser: '�'�'�'�<�head>ser: '�'�'�'�'�<tr
/*yle="background'

5f7f{; bor'�-bottom:2pxasolid #ddd;">ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">日付</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">���勤</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">退勤</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">���働時間</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">,��業</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">���考</�h>ser: '�'�'�'�'�</�r>ser: '�'�'�'�</�head>ser: '�'�'�'�<tbody>ser: '�'�'�'�'�${window.  cur.lttend: 'aD
ta.recor' .r:p)r => `
: '�'�':':':'�'�<tr
/*yle="bor'�-bottom:1pxasolid #eee;">ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; font-weight:600;">${r.6-03}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#66   {; font-weight:600;">${�.te}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#
   6b; font-weight:600;">${�.out}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#666;">${�.hou� }h</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'${�.over32', > 0 ? '

    {'n' }
999'}; font-weight:${�.over32', > 0 ? '600'n' }400 };">${�.over32',}h</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#666;">${�.�otes}</td>ser: '�'�':':':'�</�r>ser: '�'�'�'�'�`).j20 ('')}ser: '�'�'�'�</�body>ser: '�'�'�</�able>ser: '�'�</div>ser: '�</div>sser: '�<!-- Weekly Summary Chart -->ser: '�<div
clas0="kp"
/*yle="padd,
  16px;">ser: '�'�<h3
/*yle="margin-top:0; margin-bottom:12px; font-siz3-14px; font-weight:600;">週間���働時間</h3>ser: '�'�<svg viewBox="0 0 400 150"
/*yle="width: ],%; height- 20px;">ser: '�'�'�<!-- Grid -->ser: '�'�'�<line x1="40"
y1=" 20" x2="380"
y2=" 20" stroke="#ddd" stroke-width=" "/>ser: '�'�'�<line x1="40"
y1="80" x2="380"
y2="80" stroke="#eee" stroke-width=" " stroke-,
  array="3,3"/>ser: '�'�'�<line x1="40"
y1="40" x2="380"
y2="40" stroke="#eee" stroke-width=" " stroke-,
  array="3,3"/>sser: '�'�'�<!-- Y-axis lab {g -->ser: '�'�'�<t��� x="30"
y=" 25" font-siz3=" 0"
fill="#999">0h</t���>ser: '�'�'�<t��� x="20"
y="85" font-siz3=" 0"
fill="#999">5h</t���>ser: '�'�'�<t��� x="15"
y="45" font-siz3=" 0"
fill="#999">10h</t���>sser: '�'�'�<!-- Barg -->ser: '�'�'�<rect x="50"
y=" 00"
width="30"
height="20"
fill="#66   {" rx="2"/>ser: '�'�'�<t��� x="65"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">a��</t���>sser: '�'�'�<rect x="95"
y="85" width="30"
height="35" fill="#66   {" rx="2"/>ser: '�'�'�<t��� x="110"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">火</t���>sser: '�'�'�<rect x="140"
y="75" width="30"
height="45" fill="#764ba2" rx="2"/>ser: '�'�'�<t��� x="155"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">a��</t���>sser: '�'�'�<rect x="185"
y="70"
width="30"
height="50"
fill="#66   {" rx="2"/>ser: '�'�'�<t��� x="200"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">a��</t���>sser: '�'�'�<rect x="230"
y="60"
width="30"
height="60"
fill="#
    {" rx="2"/>ser: '�'�'�<t��� x="245"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">金</t���>sser: '�'�'�<rect x="275"
y="110"
width="30"
height=" 0"
fill="#00b894" rx="2"/>ser: '�'�'�<t��� x="290"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">土</t���>sser: '�'�'�<rect x="320"
y="115" width="30"
height="5" fill="#ccc" rx="2"/>ser: '�'�'�<t��� x="335"
y="135" font-siz3=" 0"
は�-anchor="middle"
fill="#999">a��</は�>ser: '�'�</svg>ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;nral//=Up6-03�c: nu every secondralif(window.c: nuInterval)�c:earInterval(window.c: nuInterval);ntswindow.c: nuInterval =asetInterval(() => {ser: lonst�c: nu =llontain�.querySelme:or('#digitalC: nu');ntsalif(c: nu) {ser: '�lonst�nown=anew=D
te();nts: '�c: nu.3���C }ten�n=anow.toLocaleT2',St�,
 ('ja-JP',�{�hou�: '2-digit', minute: '2-digit', second' '2-digit', hou�12:�or: '�});Ter: }ser}, 1000);n}
 window.toggleC: nuInOut
=l{ 'use st) {serwindow.  cur.lttend: 'aD
ta.isC: nued = !window.  cur.lttend: 'aD
ta.isC: nued;ralif(window.  cur.lttend: 'aD
ta.isC: nued)neral':window.  cur.lttend: 'aD
ta.c: nuInT2',n=anew=D
te();nts}ralwindow.das'�Attend: 'a(documash.querySelme:or('[d' }-tab=Attend: 'a]'));
}====/======================== //=Invoi'a Ras'� F 'use s //======================== { 'use s das'�Invoi'a(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.invoi'aD
ta)neral':window.  cur.invoi'aD
ta = {ser:   fil2er: }all'user: '�invoi'a name: '�'random','INV-', c-001',�cliash:'ABC Corpore
   ', �meun�:450000, 6-03:'', c/04/03',�status:'unpaid', ㈻�:ninvoi'a',�6uaD
t3:'', c/04/20�{ user: '�'田m','INV-', c-002',�cliash:'XYZ Limi:ed',��meun�:280000,�6-03:'', c/04/02おstatus:'paid', ㈻�:ninvoi'a',�6uaD
t3:'', c/04/18'{ user: '�'田m','QT-', c-001',�cliash:'Delta Inc',��meun�:350000, 6-03:'', c/04/0109:status:'pas',
 全㈻�:nquote',�6uaD
t3:'', c/04/15�{ user: '�'田m','INV-', c-003',�cliash:'Gamma Co'9:�meun�:120000, 6-03:'', c/03/31',�status:'over6ua', ㈻�:ninvoi'a',�6uaD
t3:'', c/04/10�{ user: '�'田m','RCP-', c-001',�cliash:'ABC Corpore
   ', �meun�:450000, 6-03:'', c/03/30',�status:'issued', ㈻�:nreceipt',�6uaD
t3:null�}ser: '�]Ter: };ral}nrallonst�invoi'a  =awindow.  cur.invoi'aD
ta.invoi'a ;ntslonst�fil2ered =awindow.  cur.invoi'aD
ta.fil2er ===:'all'Ter: ?�invoi'a Ter: :�invoi'a .fil2er(i => i.㈻� ===:window.  cur.invoi'aD
ta.fil2er);Trallonst�s:ats = {ser: issued:�invoi'a .fil2er(i => i.㈻� ===:ninvoi'a').reduce((s,i) => s + (i.s:atus ===:'paid' || i.s:atus ===:'issued' ?�i.lmeun� :�0), 0)user: unpaid:�invoi'a .fil2er(i => i.㈻� ===:ninvoi'a' && i.s:atus !==:'paid').reduce((s,i) => s + i.lmeun�, 0)user: over6ua:�invoi'a .fil2er(i => new=D
te(i.6uaD
t3) <anew=D
te()).lengthuser:  ash:�invoi'a .fil2er(i => i.s:atus !==:'pas',
 �).lengthTab};Trallonst�getS:atusC4757 = (s:atus) => {ser: lonst�f4757s =a{ paid:'
00b894',�unpaid:'

    {',�pas',
 :'

    { ,�over6ua:'

   6b',�issued:'#764ba2' };ral':returnaf4757s[s:atus] || }#999';Tab};Trallonst�getS:atusT��� = (s:atus) => {ser: lonst�3���s =a{ paid:'入金済',�unpaid:'未入金',�pas',
 :'保留中',�over6ua:'期限超過',�issued:'発行済' };ral':returna3���s[s:atus] || s:atus;Tab};Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- S:ats -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">今月発行額</div>ser: '�'�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#66   {;">¥${(s:ats.issued/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,��収金</div>ser: '�'�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#
    {;">¥${(s:ats.unpaid/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">,��払期限近</div>ser: '�'�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#
   6b;">${s:ats.over6ua}</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:4px;">件</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;"> v�付済</div>ser: '�'�'�<div
/*yle="font-siz3-24px; font-weight:700; f4757'#00b894;">${s:ats. ash}</div>ser: '�'�'�<div
/*yle="font-siz3-11px; f4757'#999; margin-top:4px;">件</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Filt� Tabs -->ser: '�<div
/*yle="display:flex; gap-8px; margin-bottom:20px; flex-wrap-wrap;">ser: '�'�<button
clas0="btn"
onclick="window.  cur.invoi'aD
ta.fil2er='all';:window.das'�Invoi'a(documash.querySelme:or('[d' }-tab=Invoi'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.invoi'aD
ta.fil2er==='all'?}#
    { :}
 0 0 0'}; f4757'${window.  cur.invoi'aD
ta.fil2er==='all'?}# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':���てser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.invoi'aD
ta.fil2er='invoi'a';:window.das'�Invoi'a(documash.querySelme:or('[d' }-tab=Invoi'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.invoi'aD
ta.fil2er==='invoi'a'?'#764ba2':}
 0 0 0'}; f4757'${window.  cur.invoi'aD
ta.fil2er==='invoi'a'?'# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':g��求書ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.invoi'aD
ta.fil2er='quote';:window.das'�Invoi'a(documash.querySelme:or('[d' }-tab=Invoi'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.invoi'aD
ta.fil2er==='quote'?}#
    { :}
 0 0 0'}; f4757'${window.  cur.invoi'aD
ta.fil2er==='quote'?}# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':g��積書ser: '�'�</button>ser: '�'�<button
clas0="btn"
onclick="window.  cur.invoi'aD
ta.fil2er='receipt';:window.das'�Invoi'a(documash.querySelme:or('[d' }-tab=Invoi'a]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.invoi'aD
ta.fil2er==='receipt'?'
00b894':}
 0 0 0'}; f4757'${window.  cur.invoi'aD
ta.fil2er==='receipt'?'
 ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':領収書ser: '�'�</button>ser: '�</div>sser: '�<!-- Invoi'a Car'  -->ser: '�<div
/*yle="display:grid; gap-12px;">ser: '�'�${fil2ered.r:p)invn=> {ser: '�'�':lonst�isDu,n=ainv.6uaD
t3 && new=D
te(inv.6uaD
t3) <anew=D
te();ser: '�'�'�returna`
: '�'�':':':<div
clas0="kp"
/*yle="padd,
  16px; bor'�-left:4pxasolid ${getS:atusC4757)inv.s:atus)}; display:flex; justify-' }ten�space-between; align-items:casher;">ser: '�'�':':':<div
/*yle="flex:�;">ser: '�'�':':':':<div
/*yle="display:flex; align-items:casher; gap-12px; margin-bottom:8px;">
: '�'�':':':':':'�<div
/*yle="font-siz3-20px;">ser: '�'�':':':'�'�'�${inv.㈻� ===:ninvoi'a' ? }📄' :�inv.㈻� ===:nquote' ? }📋'n' }✓'}ser: '�'�'�'�'�'�':</div>ser: '�'�'�'�'�':':<div>ser: '�'�er: '�'�'�'�<div
/*yle="font-siz3-14px; font-weight:600;">${inv.id}</div>ser: '�'�'�'�'�':':':<div
/*yle="font-siz3-12px; f4757'#999;">${inv.cliash}</div>ser: '�'�'�'�'�':':</div>ser: '�'�'�'�'�':</div>ser: '�'�'�'�'�'�<div
/*yle="display:flex; gap-16px; margin-top:8px; flex-wrap-wrap;">ser: '�'�'�':':':'�<div
/*yle="font-siz3-14px; font-weight:700; f4757'#66   {;">¥${inv.lmeun�.toLocaleSt�,
 ()}</div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-12px; f4757'#666;">${inv.6-03}</div>ser: '�'�'�'�'�':':${inv.6uaD
t3 ? `<div
/*yle="font-siz3-12px; f4757'${isDu,?'

   6b':}
999'}; font-weight:${isDu,?'600':}400 };">期限::${inv.6uaD
t3}</div>`n' }'}
: '�'�'�'�'�'�'�'�<span
clas0="sb"
/*yle="background'${getS:atusC4757)inv.s:atus)}; f4757'white; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px; font-weight:600;">${getS:atusT���)inv.s:atus)}</span>ser: '�'�'�'�'�'�</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�'�<div
/*yle="display:flex; gap-8px; margin-left:16px;">ser: '�'�':':':'�<button
clas0="btn2"
onclick="alert('PDFv �レ0:�: ����: ${inv.id}')"
/*yle="padd,
  8px 12px; background'non,; bor'�: pxasolid #ddd; bor'�-radius:6px; : 's57',20 2er; font-siz3-11px; f4757'#66   {;">👁️</button>ser: '�: '�'�'�'�<button
clas0="btn"
onclick="alert(' v�信: ${inv.id}')"
/*yle="padd,
  8px 12px; background'#66   {; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-11px; font-weight:600;">📧</button>ser: '�: '�'�'�</div>ser: '�'�'�'�</div>ser: '�'�'�`;Ter: '�'�}).j20 ('')}ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n}
 =/======================== //=Fin: 'a Ras'� F 'use s //======================== { 'use s das'�Fin: 'a(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.fin: 'aD
ta)neral':window.  cur.fin: 'aD
ta = {ser:   bal: 'ana1245000,ser: '�inco',  2850000,ser: '�expensana1605000,ser: '�3ransac
    name: '�'random',1, 6-03:'', c/04/03',�descrip
   
'ABC Corp 売上', �cceun�:'売上', debi�:450000, credi�:0, bal: 'an1695000{ user: '�'田m',2, 6-03:'', c/04/02おdescrip
   
'給与,��払い', �cceun�:'給与', debi�:0, credi�:500000, bal: 'an1245000{ user: '�'田m',3, 6-03:'', c/04/01',�descrip
   
'�シ���10��家賃', �cceun�:'家賃', debi�:0, credi�:200000, bal: 'an1745000{ user: '�'田m',4,�6-03:'', c/03/31',�descrip
   
'XYZ Ltd 売上', �cceun�:'売上', debi�:280000,�credi�:0, bal: 'an1945000{ user: '�'田m',5, 6-03:'', c/03/30',�descrip
   
'消耗品費09:�cceun�:'消耗品', debi�:0, credi�:35000, bal: 'an1665000{ ser: '�]user: '�compli: 'aS:atus:田'電子帳簿保存'' }✓',�'青色申告'' }✓',�'仕訳� �ェ�a����'' }✓',�'バ�a�������0:�: �'' }✓'�}ser: };ral}nrallonst�d
ta = window.  cur.fin: 'aD
ta;Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- Bal: 'a Car'  -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(3,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  20px; は�-align:casher; background'linear-gradiash(135deg, ,
    { 0%, ,764ba2  ],%); f4757'white;">ser: '�'�':<div
/*yle="font-siz3-12px; opacity:0.9; margin-bottom:8px;">,��高</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; margin-bottom:4px;">¥${(d
ta.bal: 'a/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  20px; は�-align:casher; background'linear-gradiash(135deg, ,00b894 0%, ,00d084  ],%); f4757'white;">ser: '�'�':<div
/*yle="font-siz3-12px; opacity:0.9; margin-bottom:8px;">収入</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; margin-bottom:4px;">¥${(d
ta.inco',/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  20px; は�-align:casher; background'linear-gradiash(135deg, ,
   6b 0%, ,ff8787  ],%); f4757'white;">ser: '�'�':<div
/*yle="font-siz3-12px; opacity:0.9; margin-bottom:8px;">,��出</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; margin-bottom:4px;">¥${(d
ta.expensa/1000,).toFixed(1)}万</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Compli: 'a Badge -->ser: '�<div
clas0="kp"
/*yle="padd,
  16px; margin-bottom:20px; background'
 0fdf4; bor'�-left:4pxasolid #00b894;">
'�':':':<div
/*yle="display:flex; align-items:casher; gap-8px; margin-bottom:12px;">ser: '�'�'�<span
/*yle="font-siz3-20px;">✓</span>ser: '�'�'�<h3
/*yle="margin 0; font-siz3-14px; font-weight:700;">電子帳簿保存法対応</h3>ser: '�'�</div>ser: '�'�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-12px; font-siz3-12px;">ser: '�'�'�${Objme:.ashries(d
ta.compli: 'aS:atus).r:p)([n���,�status]) => `
: '�'�':':':<div
/*yle="display:flex; align-items:casher; gap-6px;">ser: '�'�':':':<span
/*yle="font-siz3-14px;">✓</span>ser: '�'�'�':':<span
/*yle="font-weight:600;">${浜�}</span>ser: '�'�'�'�</div>ser: '�'�'�`).j20 ('')}ser: '�'�</div>ser: '�</div>sser: '�<!-- Transac
     Table -->ser: '�<div
/*yle="margin-bottom:20px;">ser: '�'�<h3
/*yle="font-siz3-14px; font-weight:600; margin 0 0 12pxa0;">取引履歴</h3>ser: '�'�<div
/*yle="overflow-x:auto;">ser: '�'�'�<�able /*yle="width: ],%; bor'�-f47lapse:f47lapse; font-siz3-12px;">ser: '�'�'�'�<�head>ser: '�'�'�'�'�<tr
/*yle="background'

5f7f{; bor'�-bottom:2pxasolid #ddd;">ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">日付</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">説明</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:left; font-weight:600; f4757'#333;">科目</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:right; font-weight:600; f4757'#333;">���方</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:right; font-weight:600; f4757'#333;">貸方</�h>ser: '�'�'�'�'�'�<�h
/*yle="padd,
  10px; は�-align:right; font-weight:600; f4757'#333;">,��高</�h>ser: '�'�'�'�'�</�r>ser: '�'�'�'�</�head>ser: '�'�'�'�<tbody>ser: '�'�'�'�'�${d
ta.3ransac
    .r:p)t => `
: '�'�':':':'�'�<tr
/*yle="bor'�-bottom:1pxasolid #eee;">ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; font-weight:600; f4757'#66   {;">${t.6-03}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#333;">${t.6escrip
   }</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; f4757'#666;">${t.�cceun�}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; は�-align:right; font-weight:600; f4757'${t.6ebi� > 0 ? '
00b894'n' }
999'};">${t.6ebi� > 0 ? '¥' + t.6ebi�.toLocaleSt�,
 ()n' }-'}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; は�-align:right; font-weight:600; f4757'${t.credi� > 0 ? '

   6b' ' }
999'};">${t.credi� > 0 ? '¥' + t.credi�.toLocaleSt�,
 ()n' }-'}</td>ser: '�'�':':':'�'�<td
/*yle="padd,
  10px; は�-align:right; font-weight:700; f4757'#66   {;">¥${t.bal: 'a.toLocaleSt�,
 ()}</td>ser: '�'�':':':'�</�r>ser: '�'�'�'�'�`).j20 ('')}ser: '�'�'�'�</�body>ser: '�'�'�</�able>ser: '�'�</div>ser: '�</div>sser: '�<!-- Ause s Buttons -->ser: '�<div
/*yle="display:flex; gap-12px;">ser: '�'�<button
clas0="btn"
onclick="alert('新規仕訳���ントリ )"
/*yle="padd,
  10px 16px; background'
66   {; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">➕ 新規仕訳</button>ser: '�'�<button
clas0="btn"
onclick="alert('CSV���力 )"
/*yle="padd,
  10px 16px; background'
764ba2; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">📥 CSV���力</button>ser: '�'�<button
clas0="btn"
onclick="alert('���次サマリー )"
/*yle="padd,
  10px 16px; background'

    {; f4757'white; bor'�:non,; bor'�-radius:6px; : 's57',20 2er; font-siz3-12px; font-weight:600;">📊 レ0:�ート</button>ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n}
 =/======================== //=Busin�ss Car' Ras'� F 'use s //======================== { 'use s das'�Car'(' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.car'D
ta)neral':window.  cur.car'D
ta = {ser:   car' name: '�'random',1, 浜�:'山田太郎',�company:'ABC Corpore
   ', title:'営業部長', email:'yamada@abc.com',�phon, ext0-XXXX-1111', tags:['営業','IT']{ user: '�'田m',2, 浜�:'佐藤花子',�company:'XYZ Limi:ed',�title:'企画部長', email:'sato@xyz.com',�phon, ext0-XXXX-2222', tags:['企画','営業']{ user: '�'田m',3, 浜�:'田中次郎',�company:'Delta Inc',�title:'開発責任者', email:'tanaka@delta.com',�phon, ext0-XXXX-3333', tags:['IT','開発']{ user: '�'田m',4, 浜�:'鈴木美咲',�company:'Gamma Co'9:title:'営業員', email:'suzuki@gamma.com',�phon, ext0-XXXX-4444', tags:['営業']{ user: '�'田m',5, 浜�:'佐々木健太',�company:'ABC Corpore
   ', title:'企画員', email:'sasaki@abc.com',�phon, ext0-XXXX-5555', tags:['企画']{ user: '�'田m',6, 浜�:'中村雅美',�company:'XYZ Limi:ed',�title:'開発員', email:'nakamura@xyz.com',�phon, ext0-XXXX-6666', tags:['IT']{ ser: '�]user: '�selme:edFil2er: }all'ser: };ral}nrallonst�allCar'  =:window.  cur.car'D
ta.car' ;ntslonst�tot 'Compania  =a[...new=Set(allCar' .r:p)c => c.company))].length;ntslonst�newThisM }th =a2;ntslonst�f47lowingUe =aallCar' .length - 4;Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- S:ats -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(4,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">総名刺数</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#66   {;">${allCar' .length}</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">企業数</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#764ba2;">${tot 'Compania }</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">今月新規</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
    {;">${newThisM }th}</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">������ロ���待ち</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
   6b;">${f47lowingUe}</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Search -->ser: '�<div
/*yle="margin-bottom:20px;">ser: '�'�<input
id="car'Search"
clas0="inp" ㈻�="は�" placehol'�="名刺を検索（名前、企業、肩書）..."
/*yle="width: ],%; padd,
  10px 14px; bor'�: pxasolid #ddd; bor'�-radius:8px; font-siz3-13px;"/>ser: '�</div>sser: '�<!-- Busin�ss Car's Grid -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(auto-fill, minmax(240px, 1fr)); gap-16px;">ser: '�'�${allCar' .r:p)car' => `
: '�'�':':<div
clas0="kp"
/*yle="padd,
  16px; : 's57',20 2er; 3ransise s:all 0.3s; bor'�:2pxasolid 3ranspadast;"ser: '�'�':':'::onclick="alert('${car'.浜�} - ${car'.company}\\n${car'.title}\\n📧 ${car'.email}\\n📱 ${car'.phon,}')"ser: '�'�':':'::onmouseover="�his./*yle.bor'�C4757=}#
    { ; 3his./*yle.boxShadow='0 4px 12px rgba(102,126,234,0.2)';"ser: '�'�':':'::onmouseout="�his./*yle.bor'�C4757=}3ranspadast ; 3his./*yle.boxShadow='non,';">ser: '�'�':':<div
/*yle="display:flex; align-items:casher; gap-12px; margin-bottom:12px;">ser: '�'�'�'�':<div
/*yle="width:48px; height-48px; bor'�-radius:50%; background'linear-gradiash(135deg, ,
    {, ,764ba2); f4757'white; display:flex; align-items:casher; justify-' }ten�casher; font-weight:700; font-siz3-20px;">ser: '�'�':':':'�${car'.浜�.[
 rAt(0)}ser: '�'�'�'�'�</div>ser: '�'�'�'�'�<div
/*yle="flex:�;">ser: '�'�':':':':<div
/*yle="font-siz3-13px; font-weight:700;">${car'.浜�}</div>ser: '�'�'�'�'�':<div
/*yle="font-siz3-12px; f4757'#666;">${car'.company}</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>ser: '�'�'�'�<div
/*yle="font-siz3-11px; f4757'#66   {; font-weight:600; margin-bottom:8px;">${car'.title}</div>ser: '�'�'�'�<div
/*yle="display:flex; gap-6px; flex-wrap-wrap; margin-bottom:12px;">ser: '�'�'�'�':${car'.tags.r:p)t => `
: '�'�':':':'�'�<span
/*yle="background'
 0f0f0; padd,
  3px 6px; bor'�-radius:3px; font-siz3-10px; font-weight:600;">${t}</span>ser: '�'�'�'�'�`).j20 ('')}ser: '�'�'�'�</div>ser: '�'�'�'�<div
/*yle="display:flex; gap-6px; font-siz3-11px; f4757'#999; bor'�-top:1pxasolid #eee; padd,
 -top:8px;">ser: '�'�'�':':<span>📧</span>ser: '�'�'�':':<span>📱</span>ser: '�'�'�':':<span>📋</span>ser: '�'�'�'�</div>ser: '�'�'�</div>ser: '�'�`).j20 ('')}ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n
'�setT2',out(() => {ser: lonst�search =llontain�.querySelme:or('#car'Search');ntsalif(search) {ser: '�search.addEvashListener('input', (e)n=> {ser: '�'�lonst�3�rm =le.target.valua.toLow�Case();ser: '�'�lonst�far'  =:lontain�.querySelme:orAll('.kp');ser: '�'�lar' .forEach)car' => {ser: '�'�':lonst�t��� = car'.t���C }ten�.toLow�Case();ser: '�'�'�lar'./*yle.display = t���.includes(3�rm) ? '' ' }non,';Ter: '�'�});Ter: '�});Ter: }ser}, 0);n}
 =/======================== //=Match,
  Ras'� F 'use s //======================== { 'use s das'�Match,
 (' }tain�)neralif(!' }tain�)return;Tralif(!window.  cur.match,
 D
ta)neral':window.  cur.match,
 D
ta = {ser:   selme:edSkill: }all'user: '�worker name: '�'random',1, 浜�:'山田太郎',�skills:['電気','配管'],�experiasce:8,�rat,
  4.8,�availability:true,�workR-03:85{ user: '�'田m',2, 浜�:'佐藤花子',�skills:['内装','塗装'],�experiasce:5,�rat,
  4.6,�availability:true,�workR-03:92{ user: '�'田m',3, 浜�:'田中次郎',�skills:['電気','鉄骨'],�experiasce:12,�rat,
  4.9,�availability:or: 'u�workR-03:78{ user: '�'田m',4, 浜�:'鈴木美咲',�skills:['配管','内装'],�experiasce:6,�rat,
  4.5,�availability:true,�workR-03:88{ user: '�'田m',5, 浜�:'佐々木健太',�skills:['塗装','鉄骨'],�experiasce:10,�rat,
  4.7,�availability:true,�workR-03:81{ user: '�'田m',6, 浜�:'中村雅美',�skills:['電気'],�experiasce:9,�rat,
  4.4,�availability:or: 'u�workR-03:75�}ser: '�]Ter: };ral}nrallonst�skills =a['電気','配管','内装','塗装','鉄骨'];rallonst�allWorker  =:window.  cur.match,
 D
ta.worker ;ntslonst�fil2eredWorker  =:window.  cur.match,
 D
ta.selme:edSkill ===:'all'Ter: ?�allWorker Ter: :�allWorker .fil2er(w => w.skills.includes(window.  cur.match,
 D
ta.selme:edSkill));Trallonst�s:ats = {ser: available:�allWorker .fil2er(w => w.availability).lengthuser: avgRat,
   (allWorker .reduce((s,w) => s + w.rat,
 , 0) /�allWorker .length).toFixed(1)user: avgWorkR-03:=Math.round(allWorker .reduce((s,w) => s + w.workR-03, 0) /�allWorker .length)Tab};Trallonst�htmln= `ral':<div
/*yle="padd,
  20px;">ser: '�<!-- S:ats -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(3,1f�); gap-12px; margin-bottom:20px;">ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">���用可能</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#00b894;">${s:ats.available}名</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">平均評価</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#
    {;">⭐${s:ats.avgRat,
 }</div>ser: '�'�</div>ser: '�'�<div
clas0="kp"
/*yle="padd,
  16px; は�-align:casher;">ser: '�'�'�<div
/*yle="font-siz3-12px; f4757'#666; margin-bottom:8px;">平均稼働率</div>ser: '�'�'�<div
/*yle="font-siz3-28px; font-weight:700; f4757'#66   {;">${s:ats.avgWorkR-03}%</div>ser: '�'�</div>ser: '�</div>sser: '�<!-- Skill Filt� -->ser: '�<div
/*yle="display:flex; gap-8px; margin-bottom:20px; flex-wrap-wrap;">ser: '�'�<button
clas0="btn"
onclick="window.  cur.match,
 D
ta.selme:edSkill='all';:window.das'�Match,
 (documash.querySelme:or('[d' }-tab=Match,
 ]'));"ser: '�'�':':':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.match,
 D
ta.selme:edSkill==='all'?}#
    { :}
 0 0 0'}; f4757'${window.  cur.match,
 D
ta.selme:edSkill==='all'?}# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':���て (${allWorker .length})ser: '�'�</button>ser: '�'�${skills.r:p)skill => {ser: '�'�':lonst�ceun� =aallWorker .fil2er(w => w.skills.includes(skill)).length;nts: '�'�'�returna`
: '�'�':':':<button
clas0="btn"
onclick="window.  cur.match,
 D
ta.selme:edSkill='${skill}';:window.das'�Match,
 (documash.querySelme:or('[d' }-tab=Match,
 ]'));"ser: '�'�':':':::':::/*yle="padd,
  8px 16px; bor'�:non,; bor'�-radius:6px; background'${window.  cur.match,
 D
ta.selme:edSkill===skill?'#764ba2':}
 0 0 0'}; f4757'${window.  cur.match,
 D
ta.selme:edSkill===skill?'# ff':}
333'}; : 's57',20 2er; font-siz3-12px; font-weight:600;">ser: '�'�':'�'�${skill} (${ceun�})ser: '�'�'�'�</button>ser: '�: '�`;Ter: '�'�}).j20 ('')}ser: '�</div>sser: '�<!-- Worker Car'  -->ser: '�<div
/*yle="display:grid; grid-template-' lumns:repe '(auto-fill, minmax(280px, 1fr)); gap-16px;">ser: '�'�${fil2eredWorker .r:p)worker => `
: '�'�':':<div
clas0="kp"
/*yle="padd,
  16px; bor'�:2pxasolid ${worker.availability ? '
00b894'n' }
ddd'}; 3ransise s:all 0.3s;"ser: '�'�':':'::onmouseover="�his./*yle.boxShadow='0 4px 12px rgba(102,126,234,0.2)'; 3his./*yle.3ransform=}3ranslateY(-2px)';"ser: '�'�':':'::onmouseout="�his./*yle.boxShadow='non,'; 3his./*yle.3ransform=}3ranslateY(0)';">ser: '�'�':':<div
/*yle="display:flex; align-items:casher; justify-' }ten�space-between; margin-bottom:12px;">ser: '�'�'�'�':<div
/*yle="display:flex; align-items:casher; gap-12px;">ser: '�'�':':':':<div
/*yle="width:48px; height-48px; bor'�-radius:50%; background'linear-gradiash(135deg, ,
    {, ,764ba2); f4757'white; display:flex; align-items:casher; justify-' }ten�casher; font-weight:700; font-siz3-20px;">ser: '�'�':':':'�  ${worker.浜�.[
 rAt(0)}ser: '�'�'�'�'�':</div>ser: '�'�'�'�'�'�<div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-13px; font-weight:700;">${worker.浜�}</div>ser: '�'�'�'�'�':':<div
/*yle="font-siz3-11px; f4757'#999;">経験: ${worker.experiasce}年</div>ser: '�'�'�'�'�':</div>ser: '�'�'�'�'�</div>ser: '�'�'�'�'�<div
/*yle="width:24px; height-24px; bor'�-radius:50%; background'${worker.availability ? '
00b894'n' }
ddd'}; display:flex; align-items:casher; justify-' }ten�casher; font-siz3-12px;">ser: '�'�'�'�'�  ${worker.availability ? '✓'�' }✗'}ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>sser: '�'�'�'�<div
/*yle="display:flex; gap-6px; margin-bottom:12px; flex-wrap-wrap;">ser: '�'�'�':':${worker.skills.r:p)skill => `
: '�'�':':':'�'�<span
/*yle="background'
 0f0f0; padd,
  4px 8px; bor'�-radius:4px; font-siz3-11px; font-weight:600;">${skill}</span>ser: '�'�'�'�'�`).j20 ('')}ser: '�'�'�'�</div>sser: '�'�'�'�<div
/*yle="margin-bottom:12px;">ser: '�'�'�'�':<div
/*yle="display:flex; justify-' }ten�space-between; margin-bottom:4px;">ser: '�'�':':':':<span
/*yle="font-siz3-12px; f4757'#666;">稼働率</span>ser: '�'�'�'�'�'�<span
/*yle="font-siz3-12px; font-weight:600;">${worker.workR-03}%</span>ser: '�'�'�':':</div>ser: '�'�'�'�'�<div
clas0="pb"
/*yle="height-6px; background'
eee; bor'�-radius:3px;">
: '�'�':':':':':<div
clas0="pf"
/*yle="width:${worker.workR-03}%; height- ],%; background'#66   {;"></div>ser: '�'�'�'�'�</div>ser: '�'�'�'�</div>s
: '�'�'�'�':<div
/*yle="display:flex; justify-' }ten�space-between; align-items:casher; padd,
 -top:12px; bor'�-top:1pxasolid #eee;">ser: '�'�':':':<div
/*yle="font-siz3-13px; font-weight:700;">⭐${worker.rat,
 }</div>ser: '�'�: '�'�<button
clas0="btn"
onclick="alert('���案: ${worker.浜�}')"
/*yle="padd,
  6px 12px; background'#66   {; f4757'white; bor'�:non,; bor'�-radius:4px; : 's57',20 2er; font-siz3-11px; font-weight:600;">���案</button>ser: '�: '�'�</div>ser: '�'�'�</div>ser: '�'�`).j20 ('')}ser: '�</div>ser: </div>ser`;Trallontain�.ten��HTML =ahtml;n}


/*========================================= �'�res'�Projme: — PRESERVED (変更なし)ser:======================================== */ { 'use s das'�Projme:(' }tain�){
if(!' }tain�)return;Tlontain�.ten��HTML='<div
/*yle="padd,
  20px;"><div
/*yle="display:flex;justify-' }ten�space-between;align-items:casher;margin-bottom:20px;"><h3
/*yle="margin 0;f4757'#1a1a2e;">���ロ���ェクト管理</h3><button
clas0="btn"
onclick="alert(\'新規���ロ���ェクト作成\')">+ 新規���ロ���ェクト</button></div>'+  cur.projme:s.r:p){ 'use stp){returna'<div
clas0="kp"
/*yle="padd,
  16px;margin-bottom:12px;"><div
/*yle="display:flex;justify-' }ten�space-between;align-items:casher;margin-bottom:12px;"><div><div
/*yle="font-weight:700;font-siz3-15px;f4757'#1a1a2e;">'+p.浜�+'</div><div
/*yle="font-siz3-12px;f4757'#666;margin-top:4px;">担当: '+p.manager+' | ���リア: '+p.area+'</div></div><span
clas0="sb"
/*yle="background''+(p.progress>=75?}
d4edda;f4757'#155724':p.progress>=50?'# ff3cd;f4757'#856404':}
cce5ff;f4757'#004085')+';">'+p.status+'</span></div><div
/*yle="margin-top:8px;"><div
clas0="pb"
/*yle="height-8px;"><div
clas0="pf"
/*yle="width:'+p.progress+'%;background'linear-gradiash(90deg,'+p.f4757+','+p.f4757+'88);"></div></div><div
/*yle="は�-align:right;font-siz3-11px;f4757'#888;margin-top:4px;">'+p.progress+'%</div></div></div>';}).j20 ('')+'</div>';n}
 =*========================================= �'�switchTab + GLOBAL APIser:======================================== */ { 'use s switchTab(id){  cur.curdastTab=id;buildSidebar();das'�Tab();}
 window._hataraiku={switchTab:switchTab,getS:ate:{ 'use st){returna  cur;},toggleFlowMode:{ 'use st){},openProjme::{ 'use st){},sas'Chat:{ 'use st){}};Trwindow.sw={ 'use stid){switchTab(id);}====* Global scope�exports for inline onclick handler  */ window.  cur=  cur;window.das'�Approval=das'�Approval;window.das'�Match,
 =das'�Match,
 ;window.das'�Attend: 'a=das'�Attend: 'a;window.das'�Invoi'a=das'�Invoi'a;window.das'�Fin: 'a=das'�Fin: 'a;window.das'�Car'=das'�Car';window.das'�Chat=das'�Chat;window.das'�Fol'�=das'�Fol'�;window.das'�Dashboar'=das'�Dashboar';
 =*========================================= �'�INITser:======================================== */ { 'use s initt){buildSidebar();das'�Tab();}
if(documash.readyS:ate==='loa',
 �){documash.addEvashListener('DOMC }ten�Loa'ed',init);}else{initt);}
 })();s
