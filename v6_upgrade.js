// ============================================================
// ã¯ãããã v6.0 â çµ±åãã©ãããã©ã¼ã 
// ã©ã¯ã¹ã»freeeã»ããã¼ãã©ã¯ã¼ãã»Sansan ä¸æ¬ä»£æ¿
// 10ã¢ã¸ã¥ã¼ã«æ§æ / ç¥è¡åä¸ â ç¥è­ã¨è¡åã®ä¸è´
// ============================================================
;(function(){
'use strict';

// === GLOBAL STATE ===
var STATE = {
  currentTab: 'dash',
  flowMode: 'client',
  flowStep: 0,
  projects: [],
  approvals: [],
  attendance: [],
  invoices: [],
  transactions: [],
  cards: [],
  matchings: [],
  files: []
};

// === ICON MAP ===
var ICONS = {
  dash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  approval: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  attendance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><line x1="7" y1="16" x2="10" y2="16"/></svg>',
  finance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="12" x2="12" y2="12"/><line x1="6" y1="15" x2="10" y2="15"/><circle cx="17" cy="10" r="2"/></svg>',
  matching: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
};

var TABS = [
  { id: 'dash',       label: '\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9', icon: 'dash' },
  { id: 'chat',       label: '\u30c1\u30e3\u30c3\u30c8',       icon: 'chat' },
  { id: 'folder',     label: '\u30d5\u30a9\u30eb\u30c0',       icon: 'folder' },
  { id: 'project',    label: '\u30d7\u30ed\u30b8\u30a7\u30af\u30c8',   icon: 'project' },
  { id: 'approval',   label: '\u8a31\u53ef\u9858\u3044',       icon: 'approval' },
  { id: 'attendance', label: '\u52e4\u52d9\u7ba1\u7406',       icon: 'attendance' },
  { id: 'invoice',    label: '\u898b\u7a4d\u30ba\u30fb\u8acb\u6c42\u66f8', icon: 'invoice' },
  { id: 'finance',    label: '\u5165\u51fa\u91d1\u7ba1\u7406',     icon: 'finance' },
  { id: 'card',       label: '\u540d\u523a\u7ba1\u7406',       icon: 'card' },
  { id: 'matching',   label: '\u30de\u30c3\u30c1\u30f3\u30b0',     icon: 'matching' }
];

// === SAMPLE DATA ===
var SAMPLE_PROJECTS = [
  { id:'PJ001',name:'\u6885\u7530\u518d\u958b\u767a\u30d3\u30eb',area:'\u5927\u962a\u5e02 \u5317\u533a',building:'\u533a\u5206\u30de\u30f3\u30b7\u30e7\u30f3',size:'120',budget:'1500',salePrice:'3000',step:2,status:'\u73fe\u5730\u8abf\u67fb',client:'\u7530\u4e2d\u592a\u90ce',manager:'\u4f50\u85e4\u4e00\u90ce',created:'2026-03-15' },
  { id:'PJ002',name:'\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3\u65b0\u7bc9',area:'\u6a2a\u6d5c\u5e02 \u4e2d\u533a',building:'\u6238\u5efa\u3066',size:'85',budget:'700',salePrice:'5000',step:1,status:'\u6848\u4ef6\u76f8\u8ac7',client:'\u9234\u6728\u82b1\u5b50',manager:'\u5c71\u7530\u6b21\u90ce',created:'2026-03-20' },
  { id:'PJ003',name:'\u4eac\u90fd\u753a\u5c4b\u30ea\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3',area:'\u4eac\u90fd\u5e02 \u6771\u5c71\u533a',building:'\u305d\u306e\u4ed6',size:'65',budget:'500',salePrice:'2500',step:3,status:'\u898b\u7a4d\u63d0\u51fa',client:'\u9ad8\u6a4b\u7f8e\u54b2',manager:'\u4f50\u85e4\u4e00\u90ce',created:'2026-03-10' }
];

var SAMPLE_APPROVALS = [
  { id:'AP001',title:'\u898b\u7a4d\u627f\u8a8d: \u3066\u3059\u3068',type:'\u898b\u7a4d\u627f\u8a8d',requester:'\u6a0b\u53e3\u6625\u9a0e',status:'\u7533\u8acb\u4e2d',date:'2026-03-31',priority:'\u9ad8',amount:'\u00a51,500,000' },
  { id:'AP002',title:'PJ\u5909\u66f4: \u6885\u7530\u518d\u958b\u767a\u30d3\u30eb',type:'PJ\u5909\u66f4',requester:'\u7530\u4e2d\u592a\u90ce',status:'\u7533\u8acb\u4e2d',date:'2026-03-31',priority:'\u4e2d',amount:'-' },
  { id:'AP003',title:'\u7740\u5de5\u7533\u8acb: \u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3\u65b0\u7bc9',type:'\u7740\u5de5\u7533\u8acb',requester:'\u4f50\u85e4\u4e00\u90ce',status:'\u627f\u8a8d',date:'2026-03-29',priority:'\u9ad8',amount:'-' },
  { id:'AP004',title:'\u5b8c\u4e86\u5831\u544a: \u4eac\u90fd\u753a\u5c4b\u30ea\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3',type:'\u5b8c\u4e86\u5831\u544a',requester:'\u9234\u6728\u56db\u90ce',status:'\u627f\u8a8d',date:'2026-03-28',priority:'\u4f4e',amount:'-' },
  { id:'AP005',title:'\u7d4c\u8cbb\u7cbe\u7b97: \u73fe\u5834\u4ea4\u901a\u8cbb',type:'\u7d4c\u8cbb\u7cbe\u7b97',requester:'\u5c71\u7530\u6b21\u90ce',status:'\u5dee\u623b\u3057',date:'2026-03-27',priority:'\u4f4e',amount:'\u00a535,200' }
];

var SAMPLE_ATTENDANCE = [
  { name:'\u7530\u4e2d\u592a\u90ce',role:'\u73fe\u5834\u76e3\u7763',status:'\u51fa\u52e4',clockIn:'08:15',clockOut:'-',site:'\u6885\u7530\u518d\u958b\u767a\u30d3\u30eb' },
  { name:'\u4f50\u85e4\u4e00\u90ce',role:'\u65bd\u5de5\u7ba1\u7406',status:'\u51fa\u52e4',clockIn:'07:50',clockOut:'-',site:'\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3' },
  { name:'\u9234\u6728\u82b1\u5b50',role:'\u4e8b\u52d9',status:'\u51fa\u52e4',clockIn:'09:00',clockOut:'-',site:'\u672c\u793e' },
  { name:'\u5c71\u7530\u6b21\u90ce',role:'\u8077\u4eba',status:'\u4f11\u61a9',clockIn:'08:00',clockOut:'-',site:'\u4eac\u90fd\u753a\u5c4b' },
  { name:'\u9ad8\u6a4b\u7f8e\u54b2',role:'\u55b6\u696d',status:'\u5916\u51fa',clockIn:'08:30',clockOut:'-',site:'\u5ba2\u5148\u8a2a\u554f' },
  { name:'\u6728\u6751\u4e09\u90ce',role:'\u8077\u4eba',status:'\u672a\u51fa\u52e4',clockIn:'-',clockOut:'-',site:'-' }
];

var SAMPLE_INVOICES = [
  { id:'INV-2026-001',type:'\u898b\u7a4d\u66f8',client:'\u7530\u4e2d\u4e0d\u52d5\u7523',project:'\u6885\u7530\u518d\u958b\u767a\u30d3\u30eb',amount:15000000,tax:1500000,total:16500000,status:'\u9001\u4ed8\u6e08',date:'2026-03-15',due:'2026-04-15',invoice_no:'T1234567890123' },
  { id:'INV-2026-002',type:'\u8acb\u6c42\u66f8',client:'\u9234\u6728\u5efa\u8a2d',project:'\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3\u65b0\u7bc9',amount:7000000,tax:700000,total:7700000,status:'\u672a\u9001\u4ed8',date:'2026-03-28',due:'2026-04-28',invoice_no:'T1234567890123' },
  { id:'INV-2026-003',type:'\u898b\u7a4d\u66f8',client:'\u9ad8\u6a4b\u958b\u767a',project:'\u4eac\u90fd\u753a\u5c4b\u30ea\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3',amount:5000000,tax:500000,total:5500000,status:'\u627f\u8a8d\u6e08',date:'2026-03-10',due:'-',invoice_no:'T1234567890123' }
];

var SAMPLE_TRANSACTIONS = [
  { id:'TX001',date:'2026-03-31',type:'\u5165\u91d1',category:'\u58f2\u4e0a',description:'\u6885\u7530\u518d\u958b\u767a\u30d3\u30eb \u4e2d\u9593\u91d1',amount:8250000,balance:15420000,method:'\u632f\u8fbc',receipt:true },
  { id:'TX002',date:'2026-03-30',type:'\u51fa\u91d1',category:'\u5916\u6ce8\u8cbb',description:'\u9234\u6728\u5efa\u8a2d \u5de5\u4e8b\u4ee3\u91d1',amount:-3500000,balance:7170000,method:'\u632f\u8fbc',receipt:true },
  { id:'TX003',date:'2026-03-28',type:'\u51fa\u91d1',category:'\u6750\u6599\u8cbb',description:'\u5efa\u6750\u8cfc\u5165 \u6a2a\u6d5c\u73fe\u5834',amount:-1200000,balance:10670000,method:'\u632f\u8fbc',receipt:true },
  { id:'TX004',date:'2026-03-25',type:'\u5165\u91d1',category:'\u58f2\u4e0a',description:'\u4eac\u90fd\u753a\u5c4b \u7740\u624b\u91d1',amount:2750000,balance:11870000,method:'\u632f\u8fbc',receipt:false },
  { id:'TX005',date:'2026-03-22',type:'\u51fa\u91d1',category:'\u7d66\u4e0e',description:'3\u6708\u5206\u7d66\u4e0e\u652f\u6255',amount:-4800000,balance:9120000,method:'\u632f\u8fbc',receipt:true }
];

var SAMPLE_CARDS = [
  { id:'C001',name:'\u7530\u4e2d \u592a\u90ce',company:'\u7530\u4e2d\u4e0d\u52d5\u7523\u682a\u5f0f\u4f1a\u793e',title:'\u4ee3\u8868\u53d6\u7de0\u5f79',email:'tanaka@tanaka-re.co.jp',phone:'06-1234-5678',mobile:'090-1111-2222',address:'\u5927\u962a\u5e02\u5317\u533a\u6885\u75301-1-1',tag:'\u9867\u5ba2',note:'\u6885\u7530\u518d\u958b\u767a\u6848\u4ef6\u306e\u4f9d\u983c\u4e3b',date:'2026-01-15' },
  { id:'C002',name:'\u4f50\u85e4 \u82b1\u5b50',company:'\u4f50\u85e4\u8a2d\u8a08\u4e8b\u52d9\u6240',title:'\u4e00\u7d1a\u5efa\u7bc9\u58eb',email:'sato@sato-arch.jp',phone:'03-9876-5432',mobile:'080-3333-4444',address:'\u6771\u4eac\u90fd\u6e0b\u8c37\u533a\u795e\u5bae\u524d2-2-2',tag:'\u5354\u529b\u4f1a\u793e',note:'\u8a2d\u8a08\u30d1\u30fc\u30c8\u30ca\u30fc',date:'2026-02-10' },
  { id:'C003',name:'\u9234\u6728 \u4e00\u90ce',company:'\u9234\u6728\u5efa\u8a2d\u682a\u5f0f\u4f1a\u793e',title:'\u5de5\u4e8b\u90e8\u9577',email:'suzuki@suzuki-con.co.jp',phone:'045-111-2222',mobile:'070-5555-6666',address:'\u6a2a\u6d5c\u5e02\u4e2d\u533a\u5c71\u4e0b\u753a3-3-3',tag:'\u5354\u529b\u4f1a\u793e',note:'\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3\u65bd\u5de5\u62c5\u5f53',date:'2026-03-01' },
  { id:'C004',name:'\u5c71\u7530 \u6b21\u90ce',company:'\u5c71\u7530\u5857\u88c5\u5de5\u696d',title:'\u4ee3\u8868',email:'yamada@yamada-paint.jp',phone:'075-333-4444',mobile:'090-7777-8888',address:'\u4eac\u90fd\u5e02\u6771\u5c71\u533a\u7947\u57124-4-4',tag:'\u8077\u4eba',note:'\u4eac\u90fd\u30a8\u30ea\u30a2\u306e\u5857\u88c5\u8077\u4eba',date:'2026-03-05' }
];

var SAMPLE_MATCHINGS = [
  { id:'M001',title:'\u6885\u7530\u30a8\u30ea\u30a2 \u5185\u88c5\u5de5\u4e8b \u8077\u4eba\u52df\u96c6',type:'\u6c42\u4eba',category:'\u5185\u88c5\u5de5\u4e8b',area:'\u5927\u962a\u5e02 \u5317\u533a',budget:'\u65e5\u5f53\u00a525,000\u301c',period:'2026/04/15\u301c2026/06/30',applicants:5,status:'\u52df\u96c6\u4e2d',posted:'2026-03-20' },
  { id:'M002',title:'\u6a2a\u6d5c \u96fb\u6c17\u5de5\u4e8b \u5354\u529b\u4f1a\u793e\u52df\u96c6',type:'\u6c42\u4eba',category:'\u96fb\u6c17\u5de5\u4e8b',area:'\u6a2a\u6d5c\u5e02 \u4e2d\u533a',budget:'\u4e00\u5f0f\u00a53,000,000',period:'2026/05/01\u301c2026/07/31',applicants:2,status:'\u52df\u96c6\u4e2d',posted:'2026-03-25' },
  { id:'M003',title:'\u30de\u30f3\u30b7\u30e7\u30f3\u30ea\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3\u8a2d\u8a08',type:'\u6848\u4ef6',category:'\u8a2d\u8a08',area:'\u4eac\u90fd\u5e02 \u6771\u5c71\u533a',budget:'\u00a5500,000\u301c',period:'2026/04/01\u301c2026/04/30',applicants:8,status:'\u9078\u8003\u4e2d',posted:'2026-03-10' }
];

// Load state
try {
  var saved = sessionStorage.getItem('hataraiku_state');
  if (saved) { var parsed = JSON.parse(saved); for (var k in parsed) { if (STATE.hasOwnProperty(k)) STATE[k] = parsed[k]; } }
} catch(e) {}
if (!STATE.projects.length) STATE.projects = SAMPLE_PROJECTS;
if (!STATE.approvals.length) STATE.approvals = SAMPLE_APPROVALS;
if (!STATE.attendance.length) STATE.attendance = SAMPLE_ATTENDANCE;
if (!STATE.invoices.length) STATE.invoices = SAMPLE_INVOICES;
if (!STATE.transactions.length) STATE.transactions = SAMPLE_TRANSACTIONS;
if (!STATE.cards.length) STATE.cards = SAMPLE_CARDS;
if (!STATE.matchings.length) STATE.matchings = SAMPLE_MATCHINGS;

function saveState() { try { sessionStorage.setItem('hataraiku_state', JSON.stringify(STATE)); } catch(e) {} }
function fmt(n) { return Number(n).toLocaleString('ja-JP'); }
function fmtYen(n) { return '\u00a5' + fmt(n); }
function today() { var d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function nowTime() { var d=new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function el(tag,cls,html) { var e=document.createElement(tag); if(cls)e.className=cls; if(html)e.innerHTML=html; return e; }

// ============ SIDEBAR ============
function buildSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  var logo = '<div style="padding:20px 16px 8px;font-size:20px;font-weight:800;color:#fff;letter-spacing:1px;">\u306f\u305f\u3089\u3044\u304f</div><div style="padding:0 16px 16px;font-size:11px;color:rgba(255,255,255,0.6);">\u77e5\u884c\u5408\u4e00 \u2014 AX\u9769\u547d</div>';
  var nav = '';
  TABS.forEach(function(tab) {
    var isA = STATE.currentTab === tab.id;
    var st = isA ? 'background:rgba(255,255,255,0.15);color:#fff;font-weight:600;' : 'color:rgba(255,255,255,0.75);';
    nav += '<div onclick="window._hataraiku.switchTab(\''+tab.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 16px;margin:2px 8px;border-radius:8px;cursor:pointer;transition:all 0.2s;font-size:13px;'+st+'" onmouseover="this.style.background=\'rgba(255,255,255,0.1)\'" onmouseout="if(\''+tab.id+'\'!==window._hataraiku.getState().currentTab)this.style.background=\'transparent\'"><span style="width:20px;height:20px;flex-shrink:0;">'+ICONS[tab.icon]+'</span><span>'+tab.label+'</span></div>';
  });
  var profile = '<div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px;border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:10px;"><div style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;">\u6a0b</div><div><div style="font-size:13px;color:#fff;font-weight:600;">\u6a0b\u53e3\u6625\u9a0e</div><div style="font-size:10px;color:rgba(255,255,255,0.5);">AX\u30ea\u30fc\u30c0\u30fc</div></div></div>';
  sidebar.innerHTML = logo + '<div style="padding-top:4px;">' + nav + '</div>' + profile;
  sidebar.style.cssText = 'position:fixed;left:0;top:0;bottom:0;width:180px;background:linear-gradient(180deg,#5B4FE8 0%,#3B30B8 100%);z-index:100;overflow-y:auto;overflow-x:hidden;';
}

// ============ MAIN AREA ============
function buildMainArea() {
  var main = document.querySelector('.main');
  if (!main) return;
  main.style.cssText = 'margin-left:180px;padding:0;min-height:100vh;background:#f5f5f7;';
  main.innerHTML = '';
  var topbar = el('div','','');
  topbar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px 28px;background:#fff;border-bottom:1px solid #e8e8ed;position:sticky;top:0;z-index:50;';
  topbar.id = 'hk-topbar';
  var tabDef = TABS.find(function(t){return t.id===STATE.currentTab;});
  topbar.innerHTML = '<div><h1 style="font-size:22px;font-weight:700;color:#1a1a2e;margin:0;">'+(tabDef?tabDef.label:'\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9')+'</h1><p style="font-size:12px;color:#888;margin:2px 0 0;" id="hk-subtitle"></p></div><div style="display:flex;align-items:center;gap:12px;" id="hk-topbar-actions"></div>';
  main.appendChild(topbar);
  var content = el('div','','');
  content.id = 'hk-content';
  content.style.cssText = 'padding:24px 28px;';
  main.appendChild(content);
  renderTab(STATE.currentTab);
}

function renderTab(tabId) {
  var c = document.getElementById('hk-content');
  if (!c) return;
  c.innerHTML = '';
  var sub = document.getElementById('hk-subtitle');
  var act = document.getElementById('hk-topbar-actions');
  var h1 = document.querySelector('#hk-topbar h1');
  var td = TABS.find(function(t){return t.id===tabId;});
  if (h1 && td) h1.textContent = td.label;
  switch(tabId) {
    case 'dash': renderDashboard(c,sub,act); break;
    case 'chat': renderChat(c,sub,act); break;
    case 'folder': renderFolder(c,sub,act); break;
    case 'project': renderProject(c,sub,act); break;
    case 'approval': renderApproval(c,sub,act); break;
    case 'attendance': renderAttendance(c,sub,act); break;
    case 'invoice': renderInvoice(c,sub,act); break;
    case 'finance': renderFinance(c,sub,act); break;
    case 'card': renderCard(c,sub,act); break;
    case 'matching': renderMatching(c,sub,act); break;
  }
}

// ============ MODULE 1: DASHBOARD ============
function renderDashboard(container) {
  var now = new Date();
  var dateStr = now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0') + ':' + String(now.getSeconds()).padStart(2,'0');
  var user = '';
  try { user = window['session'+'Storage'].getItem('hataraiku_user') || ''; } catch(e){}
  var greeting = now.getHours() < 12 ? 'おはようございます' : now.getHours() < 18 ? 'お疲れ様です' : 'お疲れ様です';

  container.innerHTML = '<div class="topbar"><div><h2>ダッシュボード</h2><span style="font-size:.85rem;color:var(--sub)">リアルタイム経営指標</span></div><div style="display:flex;align-items:center;gap:16px"><span style="color:var(--sub);font-size:.85rem">' + dateStr + '</span><button class="btn" onclick="window._hataraiku.openNewProject()">+ 新規案件</button></div></div>'
    + '<div style="padding:0 .5rem">'
    + '<div style="background:linear-gradient(135deg,var(--p),var(--s));border-radius:16px;padding:24px 32px;color:#fff;margin-bottom:24px;position:relative;overflow:hidden">'
    + '<div style="position:absolute;right:-20px;top:-20px;width:120px;height:120px;background:rgba(255,255,255,.1);border-radius:50%"></div>'
    + '<div style="position:absolute;right:40px;bottom:-30px;width:80px;height:80px;background:rgba(255,255,255,.08);border-radius:50%"></div>'
    + '<div style="font-size:1.1rem;opacity:.9">' + greeting + '</div>'
    + '<div style="font-size:1.5rem;font-weight:700;margin:4px 0">' + (user ? user.split('@')[0] : '樋口専務') + ' さん</div>'
    + '<div style="font-size:.85rem;opacity:.8;margin-top:8px">本日のタスク: 3件 / 承認待ち: 2件 / 未読メッセージ: 5件</div>'
    + '</div></div>'
    // KPI cards
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 .5rem;margin-bottom:24px">'
    + _kpi('受注総額', '￥14,854万', '+12.3%', '前月比', 'var(--p)')
    + _kpi('進行PJ', '3件', '+1', '新規獲得', '#f59e0b')
    + _kpi('稼働時間', '179h', '', '今月累計', '#10b981')
    + _kpi('品質スコア', '93.8%', '-0.2%', '深浦データ算出', '#ef4444')
    + '</div>'
    // Charts row
    + '<div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;padding:0 .5rem;margin-bottom:24px">'
    + '<div class="kp" style="padding:20px"><h3 style="font-size:.95rem;font-weight:700;margin-bottom:16px">月次推移</h3>' + _miniChart() + '</div>'
    + '<div class="kp" style="padding:20px"><h3 style="font-size:.95rem;font-weight:700;margin-bottom:12px">直近の活動</h3>' + _activityList() + '</div>'
    + '</div>'
    // Projects progress
    + '<div class="kp" style="padding:20px;margin:0 .5rem 24px">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h3 style="font-size:.95rem;font-weight:700">プロジェクト進捗一覧</h3><button class="btn2" onclick="window._hataraiku.switchTab(\'project\')">全てみる →</button></div>'
    + _projectBars()
    + '</div>'
    // Quick actions
    + '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding:0 .5rem;margin-bottom:24px">'
    + _quickAction('📝','新規申請','approval')
    + _quickAction('⏰','出勤打刻','attendance')
    + _quickAction('📄','見積作成','invoice')
    + _quickAction('💳','経費申請','finance')
    + _quickAction('👤','名刺登録','card')
    + '</div>';
}

function _kpi(label, value, change, sub, color) {
  var arrow = change.indexOf('+') === 0 ? '▲ ' : change.indexOf('-') === 0 ? '▼ ' : '';
  var cColor = change.indexOf('+') === 0 ? '#10b981' : change.indexOf('-') === 0 ? '#ef4444' : 'var(--sub)';
  return '<div class="kp" style="padding:20px;border-left:4px solid ' + color + '">'
    + '<div style="font-size:.8rem;color:var(--sub)">' + label + '</div>'
    + '<div style="font-size:1.75rem;font-weight:800;color:' + color + ';margin:4px 0">' + value + '</div>'
    + '<div style="font-size:.75rem;color:' + cColor + '">' + arrow + change + ' <span style="color:var(--sub)">' + sub + '</span></div>'
    + '</div>';
}

function _miniChart() {
  var data = [8,15,18,22,35,62,88];
  var labels = ['10月','11月','12月','1月','2月','3月','4月'];
  var max = 100;
  var w = 100 / data.length;
  var svg = '<svg viewBox="0 0 400 200" style="width:100%;height:200px">';
  svg += '<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--p)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--p)" stop-opacity="0"/></linearGradient></defs>';
  var points = data.map(function(d, i) { return (i * 400 / (data.length - 1)) + ',' + (180 - d * 1.7); });
  var areaPoints = '0,180 ' + points.join(' ') + ' 400,180';
  svg += '<polygon points="' + areaPoints + '" fill="url(#cg)"/>';
  svg += '<polyline points="' + points.join(' ') + '" fill="none" stroke="var(--p)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  data.forEach(function(d, i) {
    var x = i * 400 / (data.length - 1);
    var y = 180 - d * 1.7;
    svg += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#fff" stroke="var(--p)" stroke-width="2.5"/>';
    svg += '<text x="' + x + '" y="196" text-anchor="middle" font-size="11" fill="#888">' + labels[i] + '</text>';
    svg += '<text x="' + x + '" y="' + (y - 12) + '" text-anchor="middle" font-size="10" fill="var(--p)" font-weight="600">' + d + '%</text>';
  });
  svg += '</svg>';
  return svg;
}

function _activityList() {
  var items = [
    {sb:'sb-g',label:'申請中',text:'見積承認: テスト',date:'2026-03-31'},
    {sb:'sb-g',label:'申請中',text:'PJ変更: 梅田再開発ビル',date:'2026-03-31'},
    {sb:'sb-b',label:'承認',text:'着工申請: 横浜マンション新筑',date:'2026-03-29'},
    {sb:'sb-b',label:'承認',text:'完了報告: 京都町屋リノベーション',date:'2026-03-28'},
    {sb:'sb-r',label:'差戻し',text:'経費精算: 現場交通費',date:'2026-03-27'}
  ];
  var html = '';
  items.forEach(function(it) {
    html += '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">'
      + '<span class="sb ' + it.sb + '">' + it.label + '</span>'
      + '<span style="flex:1;font-size:.85rem">' + it.text + '</span>'
      + '<span style="font-size:.75rem;color:var(--sub)">' + it.date + '</span>'
      + '</div>';
  });
  return html;
}

function _projectBars() {
  var pjs = [
    {name:'梅田再開発ビル',pct:50,phase:'現地調査',mgr:'佐藤一郎',area:'大阪市 北区',color:'var(--p)'},
    {name:'横浜マンション新筑',pct:25,phase:'案件相談',mgr:'山田次郎',area:'横浜市 中区',color:'#f59e0b'},
    {name:'京都町屋リノベーション',pct:75,phase:'見積提出',mgr:'佐藤一郎',area:'京都市 東山区',color:'#10b981'}
  ];
  var html = '';
  pjs.forEach(function(p) {
    html += '<div style="margin-bottom:20px">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'
      + '<strong>' + p.name + '</strong>'
      + '<span class="sb sb-g" style="font-size:.7rem">' + p.phase + '</span>'
      + '</div>'
      + '<div class="pb"><div class="pf" style="width:' + p.pct + '%;background:' + p.color + '"></div></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--sub);margin-top:4px">'
      + '<span>担当: ' + p.mgr + ' | エリア: ' + p.area + '</span>'
      + '<span>' + p.pct + '%</span>'
      + '</div></div>';
  });
  return html;
}

function _quickAction(icon, label, tab) {
  return '<div class="kp" style="padding:16px;text-align:center;cursor:pointer;transition:all .2s" onclick="window._hataraiku.switchTab(\'' + tab + '\')" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,.1)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
    + '<div style="font-size:1.5rem;margin-bottom:6px">' + icon + '</div>'
    + '<div style="font-size:.8rem;font-weight:600">' + label + '</div>'
    + '</div>';
}


function renderChat(container) {
  var channels = [
    {name:'全体連絡',icon:'🏢',unread:3,last:'佐藤: 明日の会議資料を共有します',time:'14:30'},
    {name:'梅田PJチーム',icon:'🏗️',unread:1,last:'山田: 現場写真をアップしました',time:'13:15'},
    {name:'横浜PJチーム',icon:'🏠',unread:0,last:'鈴木: 設計図更新完了',time:'昨日'},
    {name:'経理部',icon:'💰',unread:2,last:'田中: 請求書の確認をお願いします',time:'11:00'},
    {name:'人事・総務',icon:'👥',unread:0,last:'小林: 勤務表の提出締切は月末です',time:'昨日'}
  ];

  var messages = [
    {user:'佐藤一郎',avatar:'S',time:'14:30',text:'明日の梅田PJ定例会議の資料を共有します。確認をお願いします。',file:'📎 梅田PJ_進捗報告_0402.pdf'},
    {user:'山田次郎',avatar:'Y',time:'14:25',text:'承知しました。現場の写真も共有します。',file:'📷 現場写真_03.jpg (3枚)'},
    {user:'樋口専務',avatar:'H',time:'14:20',text:'お疲れ様です。明日の会議では工程表の見直しも議題に入れてください。',file:''},
    {user:'佐藤一郎',avatar:'S',time:'14:15',text:'承知しました。工程表を更新して共有します。',file:''},
    {user:'鈴木美咲',avatar:'M',time:'13:50',text:'横浜PJの設計図を更新しました。最新版を確認してください。',file:'📎 横浜_設計図v3.pdf'}
  ];

  container.innerHTML = '<div class="topbar"><h2>チャット</h2><div style="display:flex;gap:8px"><button class="btn2">🔍 検索</button><button class="btn">+ 新規チャンネル</button></div></div>'
    + '<div style="display:grid;grid-template-columns:280px 1fr;height:calc(100vh - 120px);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin:.5rem">'
    // Channel list
    + '<div style="border-right:1px solid var(--border);overflow-y:auto;background:var(--card)">'
    + '<div style="padding:12px"><input class="inp" placeholder="チャンネル検索..." style="width:100%"></div>'
    + channels.map(function(ch, i) {
        return '<div style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);' + (i===0?'background:rgba(99,102,241,.08);border-left:3px solid var(--p)':'border-left:3px solid transparent') + '" onclick="this.parentNode.querySelectorAll(\'div[style*=border-left]\').forEach(function(d){d.style.background=\'\';d.style.borderLeftColor=\'transparent\'});this.style.background=\'rgba(99,102,241,.08)\';this.style.borderLeftColor=\'var(--p)\'">'
          + '<div style="display:flex;justify-content:space-between;align-items:center">'
          + '<span style="font-weight:600;font-size:.9rem">' + ch.icon + ' ' + ch.name + '</span>'
          + (ch.unread > 0 ? '<span style="background:var(--p);color:#fff;border-radius:10px;padding:1px 7px;font-size:.7rem;font-weight:700">' + ch.unread + '</span>' : '')
          + '</div>'
          + '<div style="font-size:.78rem;color:var(--sub);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + ch.last + '</div>'
          + '<div style="font-size:.7rem;color:var(--sub);margin-top:2px">' + ch.time + '</div>'
          + '</div>';
      }).join('')
    + '</div>'
    // Message area
    + '<div style="display:flex;flex-direction:column">'
    + '<div style="padding:12px 20px;border-bottom:1px solid var(--border);background:var(--card);display:flex;justify-content:space-between;align-items:center">'
    + '<div><strong>🏢 全体連絡</strong><span style="font-size:.8rem;color:var(--sub);margin-left:8px">12人のメンバー</span></div>'
    + '<div style="display:flex;gap:8px"><button class="btn2">📎</button><button class="btn2">⚙️</button></div>'
    + '</div>'
    // Messages
    + '<div style="flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:16px">'
    + messages.map(function(m) {
        var isMe = m.user === '樋口専務';
        return '<div style="display:flex;gap:10px;' + (isMe ? 'flex-direction:row-reverse' : '') + '">'
          + '<div style="width:36px;height:36px;border-radius:50%;background:' + (isMe ? 'var(--p)' : '#e5e7eb') + ';color:' + (isMe ? '#fff' : '#374151') + ';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0">' + m.avatar + '</div>'
          + '<div style="max-width:65%">'
          + '<div style="font-size:.75rem;color:var(--sub);margin-bottom:4px;' + (isMe ? 'text-align:right' : '') + '">' + m.user + ' ・ ' + m.time + '</div>'
          + '<div style="background:' + (isMe ? 'var(--p)' : 'var(--card)') + ';color:' + (isMe ? '#fff' : 'var(--text)') + ';padding:10px 14px;border-radius:12px;font-size:.9rem;line-height:1.5;border:' + (isMe ? 'none' : '1px solid var(--border)') + '">'
          + m.text
          + (m.file ? '<div style="margin-top:8px;padding:6px 10px;background:rgba(0,0,0,.05);border-radius:6px;font-size:.8rem">' + m.file + '</div>' : '')
          + '</div></div></div>';
      }).join('')
    + '</div>'
    // Input area
    + '<div style="padding:12px 20px;border-top:1px solid var(--border);background:var(--card)">'
    + '<div style="display:flex;gap:8px;align-items:center">'
    + '<button class="btn2" style="padding:8px">📎</button>'
    + '<input class="inp" placeholder="メッセージを入力..." style="flex:1" id="chatInput">'
    + '<button class="btn" onclick="var inp=document.getElementById(\'chatInput\');if(inp.value.trim()){alert(\'送信しました: \'+inp.value);inp.value=\'\'}">送信</button>'
    + '</div></div>'
    + '</div></div>';
}


function renderFolder(container) {
  var folders = [
    {name:'梅田再開発ビル',icon:'📁',items:24,updated:'2026-04-02',size:'156MB'},
    {name:'横浜マンション新筑',icon:'📁',items:18,updated:'2026-04-01',size:'89MB'},
    {name:'京都町屋リノベーション',icon:'📁',items:31,updated:'2026-03-30',size:'234MB'},
    {name:'社内規定・テンプレート',icon:'📂',items:12,updated:'2026-03-15',size:'45MB'},
    {name:'契約書・法務',icon:'📂',items:8,updated:'2026-03-20',size:'67MB'}
  ];
  var files = [
    {name:'梅田PJ_進捗報告_0402.pdf',type:'PDF',size:'2.4MB',updated:'2026-04-02',owner:'佐藤'},
    {name:'見積書_横浜_v3.xlsx',type:'Excel',size:'1.2MB',updated:'2026-04-01',owner:'樋口'},
    {name:'現場写真_03.zip',type:'ZIP',size:'45MB',updated:'2026-03-31',owner:'山田'},
    {name:'設計図_京都_final.dwg',type:'CAD',size:'12MB',updated:'2026-03-30',owner:'鈴木'},
    {name:'工程表_2026Q1.xlsx',type:'Excel',size:'890KB',updated:'2026-03-28',owner:'佐藤'},
    {name:'安全計画書_v2.docx',type:'Word',size:'3.1MB',updated:'2026-03-25',owner:'田中'}
  ];
  var typeColors = {PDF:'#ef4444',Excel:'#10b981',ZIP:'#f59e0b',CAD:'#8b5cf6',Word:'#3b82f6'};

  container.innerHTML = '<div class="topbar"><h2>フォルダ</h2><div style="display:flex;gap:8px"><button class="btn2">🔍 検索</button><button class="btn">+ アップロード</button></div></div>'
    // Breadcrumb
    + '<div style="padding:8px 20px;font-size:.85rem;color:var(--sub)">🏠 ホーム / プロジェクトファイル</div>'
    // Storage bar
    + '<div style="padding:0 20px;margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:4px"><span>使用容量</span><span>591MB / 10GB</span></div><div class="pb" style="height:6px"><div class="pf" style="width:5.9%;background:var(--p)"></div></div></div>'
    // Folders grid
    + '<div style="padding:0 20px;margin-bottom:24px"><h3 style="font-size:.9rem;font-weight:700;margin-bottom:12px">📁 フォルダ</h3>'
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">'
    + folders.map(function(f) {
        return '<div class="kp" style="padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor=\'var(--p)\'" onmouseout="this.style.borderColor=\'\'">'
          + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:1.3rem">' + f.icon + '</span><strong style="font-size:.9rem">' + f.name + '</strong></div>'
          + '<div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--sub)"><span>' + f.items + 'ファイル</span><span>' + f.size + '</span></div>'
          + '</div>';
      }).join('')
    + '</div></div>'
    // Files table
    + '<div style="padding:0 20px"><h3 style="font-size:.9rem;font-weight:700;margin-bottom:12px">📄 最近のファイル</h3>'
    + '<div class="kp" style="overflow:hidden">'
    + '<table style="width:100%;border-collapse:collapse;font-size:.85rem">'
    + '<thead><tr style="background:rgba(99,102,241,.05)"><th style="padding:10px 14px;text-align:left;font-weight:600">ファイル名</th><th style="padding:10px 14px;text-align:left;font-weight:600">種類</th><th style="padding:10px 14px;text-align:left;font-weight:600">サイズ</th><th style="padding:10px 14px;text-align:left;font-weight:600">更新日</th><th style="padding:10px 14px;text-align:left;font-weight:600">担当</th><th style="padding:10px 14px;text-align:center;font-weight:600">操作</th></tr></thead><tbody>'
    + files.map(function(f) {
        return '<tr style="border-top:1px solid var(--border);transition:background .15s" onmouseover="this.style.background=\'rgba(99,102,241,.03)\'" onmouseout="this.style.background=\'\'">'
          + '<td style="padding:10px 14px"><span style="font-weight:500">' + f.name + '</span></td>'
          + '<td style="padding:10px 14px"><span style="background:' + (typeColors[f.type]||'#888') + '20;color:' + (typeColors[f.type]||'#888') + ';padding:2px 8px;border-radius:4px;font-size:.75rem;font-weight:600">' + f.type + '</span></td>'
          + '<td style="padding:10px 14px;color:var(--sub)">' + f.size + '</td>'
          + '<td style="padding:10px 14px;color:var(--sub)">' + f.updated + '</td>'
          + '<td style="padding:10px 14px">' + f.owner + '</td>'
          + '<td style="padding:10px 14px;text-align:center"><button class="btn2" style="font-size:.75rem;padding:4px 10px">ダウンロード</button></td>'
          + '</tr>';
      }).join('')
    + '</tbody></table></div></div>';
}


function renderProject(c,sub,act) {
  if(sub)sub.textContent='\u30b9\u30c6\u30c3\u30d1\u30fc\u5f62\u5f0f \u2014 \u6848\u4ef6\u76f8\u8ac7\u304b\u3089\u767a\u6ce8\u5b8c\u4e86\u307e\u3067';
  if(act)act.innerHTML='<button onclick="alert(\'\u65b0\u898f\u6848\u4ef6\u4f5c\u6210\')" style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u65b0\u898f\u6848\u4ef6</button>';
  // Mode toggle
  var tg='<div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-bottom:20px;"><span style="font-size:13px;font-weight:600;color:'+(STATE.flowMode==='client'?'#5B4FE8':'#888')+';">\u4f9d\u983c\u5074</span><div onclick="window._hataraiku.toggleFlowMode();window._hataraiku.switchTab(\'project\')" style="width:48px;height:26px;border-radius:13px;background:'+(STATE.flowMode==='client'?'#5B4FE8':'#10B981')+';cursor:pointer;position:relative;transition:all 0.3s;"><div style="width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;'+(STATE.flowMode==='client'?'left:2px':'left:24px')+';transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></div></div><span style="font-size:13px;font-weight:600;color:'+(STATE.flowMode==='manager'?'#10B981':'#888')+';">\u65bd\u5de5\u7ba1\u7406\u5074</span></div>';
  c.innerHTML=tg;
  var steps=['\u6848\u4ef6\u76f8\u8ac7','\u73fe\u5730\u8abf\u67fb','\u898b\u7a4d\u63d0\u51fa','\u767a\u6ce8\u5b8c\u4e86'];
  var stepC=['#F59E0B','#3B82F6','#8B5CF6','#10B981'];
  var lh='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:24px;"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u6848\u4ef6\u4e00\u89a7</h3>';
  STATE.projects.forEach(function(p,idx){
    lh+='<div style="border:1px solid #e8e8ed;border-radius:10px;padding:16px;margin-bottom:12px;cursor:pointer;transition:all 0.15s;" onclick="window._hataraiku.openProject('+idx+')" onmouseover="this.style.borderColor=\'#5B4FE8\';this.style.boxShadow=\'0 2px 8px rgba(91,79,232,0.1)\'" onmouseout="this.style.borderColor=\'#e8e8ed\';this.style.boxShadow=\'none\'">';
    lh+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><div><span style="font-size:15px;font-weight:700;color:#1a1a2e;">'+p.name+'</span><span style="font-size:11px;color:#888;margin-left:8px;">'+p.id+'</span></div><span style="font-size:11px;padding:3px 10px;border-radius:6px;background:'+stepC[p.step-1]+'18;color:'+stepC[p.step-1]+';font-weight:600;">'+steps[p.step-1]+'</span></div>';
    lh+='<div style="display:flex;align-items:center;gap:4px;margin-bottom:10px;">';
    steps.forEach(function(s,si){var done=si<p.step;var bg=done?stepC[si]:'#e0e0e0';var tc=done?'#fff':'#aaa';lh+='<div style="flex:1;text-align:center;padding:6px 4px;border-radius:6px;background:'+bg+';font-size:10px;font-weight:'+(si===p.step-1?'700':'500')+';color:'+tc+';transition:all 0.3s;">'+s+'</div>';if(si<3)lh+='<div style="color:#ccc;font-size:10px;">\u2192</div>';});
    lh+='</div>';
    lh+='<div style="display:flex;gap:16px;font-size:11px;color:#888;"><span>\u30a8\u30ea\u30a2: '+p.area+'</span><span>\u4e88\u7b97: '+p.budget+'\u4e07</span><span>\u62c5\u5f53: '+(STATE.flowMode==='client'?p.client:p.manager)+'</span></div></div>';
  });
  lh+='</div>';c.innerHTML+=lh;
}

function openProject(idx) {
  var p=STATE.projects[idx];if(!p)return;
  var c=document.getElementById('hk-content');if(!c)return;
  var steps=['\u6848\u4ef6\u76f8\u8ac7','\u73fe\u5730\u8abf\u67fb','\u898b\u7a4d\u63d0\u51fa','\u767a\u6ce8\u5b8c\u4e86'];
  var stepC=['#F59E0B','#3B82F6','#8B5CF6','#10B981'];
  var isC=STATE.flowMode==='client';
  var h='<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;"><button onclick="window._hataraiku.switchTab(\'project\')" style="background:#f0f0f0;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;">\u2190 \u623b\u308b</button><h2 style="font-size:18px;font-weight:700;margin:0;">'+p.name+'</h2><span style="font-size:11px;color:#888;">'+p.id+'</span></div>';
  // Toggle
  h+='<div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-bottom:20px;"><span style="font-size:13px;font-weight:600;color:'+(isC?'#5B4FE8':'#888')+';">\u4f9d\u983c\u5074</span><div onclick="window._hataraiku.toggleFlowMode();window._hataraiku.openProject('+idx+')" style="width:48px;height:26px;border-radius:13px;background:'+(isC?'#5B4FE8':'#10B981')+';cursor:pointer;position:relative;transition:all 0.3s;"><div style="width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;'+(isC?'left:2px':'left:24px')+';transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></div></div><span style="font-size:13px;font-weight:600;color:'+(isC?'#888':'#10B981')+';">\u65bd\u5de5\u7ba1\u7406\u5074</span></div>';
  // Stepper
  h+='<div style="display:flex;align-items:center;margin-bottom:28px;background:#fff;border-radius:12px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">';
  steps.forEach(function(s,si){var done=si<p.step;var cur=si===p.step-1;var bg=done?stepC[si]:cur?stepC[si]+'40':'#f0f0f0';var tc=done?'#fff':cur?stepC[si]:'#aaa';var bd=cur?'2px solid '+stepC[si]:'none';h+='<div style="flex:1;text-align:center;padding:12px 8px;border-radius:8px;background:'+bg+';border:'+bd+';font-size:12px;font-weight:'+(cur?'700':'500')+';color:'+tc+';"><div style="font-size:10px;margin-bottom:2px;">STEP '+(si+1)+'</div>'+s+'</div>';if(si<3)h+='<div style="padding:0 4px;color:#ccc;">\u2192</div>';});
  h+='</div>';
  // Step content
  var sclr=isC?'#5B4FE8':'#10B981';
  var slbl=isC?'\u4f9d\u983c\u5074\u5165\u529b':'\u65bd\u5de5\u7ba1\u7406\u5074\u5165\u529b';
  h+='<div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:14px;font-weight:700;color:'+sclr+';margin-bottom:20px;padding-bottom:8px;border-bottom:2px solid '+sclr+'20;">\u21e9 '+slbl+'</div>';
  if(p.step===1){
    if(isC){
      h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">';
      h+=formField('1. \u65bd\u5de5\u6642\u671f','<div style="display:flex;gap:8px;align-items:center;"><input type="date" value="2026-04-15" style="flex:1;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;"><span style="color:#888;">\u301c</span><input type="date" value="2026-06-30" style="flex:1;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;"></div>',true);
      h+=formField('2-\u2460 \u30a8\u30ea\u30a2','<input type="text" value="'+p.area+'" placeholder="\u6771\u4eac\u90fd \u4e2d\u592e\u533a" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">');
      h+=formField('2-\u2461 \u5efa\u7269','<select style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;background:#fff;box-sizing:border-box;"><option'+(p.building==='\u533a\u5206\u30de\u30f3\u30b7\u30e7\u30f3'?' selected':'')+'>\u533a\u5206\u30de\u30f3\u30b7\u30e7\u30f3</option><option'+(p.building==='\u6238\u5efa\u3066'?' selected':'')+'>\u6238\u5efa\u3066</option><option'+(p.building==='\u305d\u306e\u4ed6'?' selected':'')+'>\u305d\u306e\u4ed6</option></select>');
      h+=formField('2-\u2462 \u5e83\u3055','<div style="position:relative;"><input type="number" value="'+p.size+'" placeholder="70" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;"><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#888;font-size:12px;">m\u00b2</span></div>');
      h+=formField('2-\u2463 \u9593\u53d6\u308a\u56f3','<div style="border:2px dashed #e0e0e0;border-radius:8px;padding:20px;text-align:center;cursor:pointer;" onmouseover="this.style.borderColor=\'#5B4FE8\'" onmouseout="this.style.borderColor=\'#e0e0e0\'"><div style="font-size:24px;margin-bottom:4px;">\ud83d\udcce</div><div style="font-size:12px;color:#888;">PDF\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9</div></div>');
      h+=formField('3-\u2460 \u5de5\u4e8b\u4e88\u7b97','<div style="position:relative;"><input type="text" value="'+fmt(p.budget)+'" placeholder="700" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;"><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#888;font-size:12px;">\u4e07\u5186</span></div>');
      h+=formField('3-\u2461 \u8ca9\u58f2\u4e88\u5b9a\u91d1\u984d','<div style="position:relative;"><input type="text" value="'+fmt(p.salePrice)+'" placeholder="5,000" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;"><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#888;font-size:12px;">\u4e07\u5186</span></div>');
      h+=formField('3-\u2462 \u8a04\u753b\u4ed5\u4e0a\u308a',tabButtons(['\u54c1\u8cea\u3068\u4ed8\u69d8\u304c\u5927\u5207','\u54c1\u8cea\u304c\u5927\u5207','\u5de5\u671f\u4e88\u7b97\u304c\u5927\u5207'],0));
      h+=formField('3-\u2463 \u5ba4\u5185\u306e\u4f7f\u7528\u72b6\u6cc1',tabButtons(['\u4f4f\u3093\u3067\u3044\u307e\u3059','\u4f4f\u3093\u3067\u3044\u307e\u305b\u3093'],0));
      h+=formField('3-\u2464 \u65bd\u5de5\u696d\u8005\u304b\u3089\u63d0\u6848',tabButtons(['\u6709','\u7121'],0));
      h+=formField('3-\u2465 \u76f8\u898b\u7a4d\u696d\u8005',tabButtons(['1\u793e','2\u793e'],0));
      h+=formField('3-\u2466 \u5ba4\u5185\u5199\u771f','<div style="border:2px dashed #e0e0e0;border-radius:8px;padding:20px;text-align:center;cursor:pointer;" onmouseover="this.style.borderColor=\'#5B4FE8\'" onmouseout="this.style.borderColor=\'#e0e0e0\'"><div style="font-size:24px;margin-bottom:4px;">\ud83d\udcf7</div><div style="font-size:12px;color:#888;">\u5199\u771f\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9</div></div>');
      h+=formField('3-\u2467 \u5ba4\u5185\u72b6\u6cc1\u30b3\u30e1\u30f3\u30c8','<textarea rows="3" placeholder="\u5ba4\u5185\u306e\u72b6\u6cc1\u306b\u3064\u3044\u3066\u8a73\u3057\u304f\u8a18\u5165\u3057\u3066\u304f\u3060\u3055\u3044..." style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;resize:vertical;box-sizing:border-box;"></textarea>',true);
      h+='</div>';
    } else {
      h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">';
      h+=formField('\u2460 \u898b\u7a4d\u308a\u56de\u7b54\u65e5','<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:13px;color:#555;">\u73fe\u5730\u8abf\u67fb\u65e5 +</span><select style="padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;background:#fff;"><option>1\u65e5</option><option>2\u65e5</option><option selected>3\u65e5</option><option>4\u65e5</option><option>5\u65e5</option><option>6\u65e5</option><option>7\u65e5</option><option>8\u65e5</option><option>9\u65e5</option><option>10\u65e5</option></select><span style="font-size:12px;color:#888;">(\u4f11\u307f\u9664\u304f)</span></div>');
      h+=formField('\u2461 \u6700\u77ed\u7740\u5de5\u65e5','<input type="date" value="2026-05-01" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">');
      h+=formField('\u2462 \u8abf\u67fb\u6240\u8981\u6642\u9593','<select style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;background:#fff;box-sizing:border-box;"><option>15\u5206</option><option>30\u5206</option><option selected>45\u5206</option><option>60\u5206</option><option>75\u5206</option><option>90\u5206</option></select>');
      h+='</div>';
    }
  } else if(p.step===2) {
    h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">';
    for(var i=1;i<=3;i++){
      h+='<div style="border:1px solid #e8e8ed;border-radius:10px;padding:16px;"><div style="font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:12px;">\u5019\u88dc\u65e5\u6642 '+i+'</div>';
      h+='<label style="font-size:11px;color:#888;display:block;margin-bottom:4px;">\u65e5\u4ed8</label><input type="date" style="width:100%;padding:8px 10px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px;outline:none;margin-bottom:8px;box-sizing:border-box;">';
      h+='<label style="font-size:11px;color:#888;display:block;margin-bottom:4px;">\u958b\u59cb\u6642\u9593</label><select style="width:100%;padding:8px 10px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px;outline:none;margin-bottom:8px;background:#fff;box-sizing:border-box;">';
      for(var hh=8;hh<=18;hh++){h+='<option>'+String(hh).padStart(2,'0')+':00</option><option>'+String(hh).padStart(2,'0')+':30</option>';}
      h+='</select><label style="font-size:11px;color:#888;display:block;margin-bottom:4px;">\u7d42\u4e86\u6642\u9593</label><select style="width:100%;padding:8px 10px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px;outline:none;background:#fff;box-sizing:border-box;">';
      for(var hh2=8;hh2<=18;hh2++){h+='<option>'+String(hh2).padStart(2,'0')+':00</option><option>'+String(hh2).padStart(2,'0')+':30</option>';}
      h+='</select></div>';
    }
    h+='</div>';
    h+='<div style="margin-top:16px;">'+formFieldInline(isC?'\u8abf\u67fb\u6642\u306e\u5171\u6709\u4e8b\u9805':'\u78ba\u8a8d\u4e8b\u9805\u30b3\u30e1\u30f3\u30c8','<textarea rows="3" placeholder="\u5171\u6709\u4e8b\u9805\u3092\u5165\u529b..." style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;resize:vertical;box-sizing:border-box;"></textarea>')+'</div>';
    h+='<div style="margin-top:16px;border-top:1px solid #f0f0f0;padding-top:16px;"><div style="font-size:13px;font-weight:600;color:#555;margin-bottom:8px;">\u7269\u4ef6\u8abf\u67fb\u6642\u306e\u5199\u771f\u8a18\u9332\uff08\u53cc\u65b9\uff09</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">';
    for(var ph=0;ph<4;ph++){h+='<div style="aspect-ratio:1;border:2px dashed #e0e0e0;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;" onmouseover="this.style.borderColor=\'#5B4FE8\'" onmouseout="this.style.borderColor=\'#e0e0e0\'"><div style="text-align:center;"><div style="font-size:20px;">\ud83d\udcf7</div><div style="font-size:10px;color:#aaa;">\u8ffd\u52a0</div></div></div>';}
    h+='</div></div>';
  } else if(p.step===3) {
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">';
    h+='<div style="grid-column:1/-1;border:1px solid #e8e8ed;border-radius:10px;padding:16px;"><div style="font-size:13px;font-weight:600;margin-bottom:8px;">\u898b\u7a4d\u66f8\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9</div><div style="border:2px dashed #e0e0e0;border-radius:8px;padding:24px;text-align:center;cursor:pointer;" onmouseover="this.style.borderColor=\'#8B5CF6\'" onmouseout="this.style.borderColor=\'#e0e0e0\'"><div style="font-size:28px;margin-bottom:4px;">\ud83d\udcc4</div><div style="font-size:12px;color:#888;">\u898b\u7a4d\u66f8\u3092\u30c9\u30e9\u30c3\u30b0&\u30c9\u30ed\u30c3\u30d7</div></div></div>';
    h+=formField('\u898b\u7a4d\u91d1\u984d','<div style="position:relative;"><input type="text" value="'+fmt(p.budget)+'0,000" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;"><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#888;font-size:12px;">\u5186</span></div>');
    h+=formField('\u5de5\u671f','<input type="text" value="\u7d042\u30f6\u6708" style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">');
    h+=formField('\u5099\u8003\u30fb\u7279\u8a18\u4e8b\u9805','<textarea rows="3" placeholder="\u898b\u7a4d\u306b\u95a2\u3059\u308b\u88dc\u8db3\u4e8b\u9805..." style="width:100%;padding:10px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;resize:vertical;box-sizing:border-box;"></textarea>',true);
    h+='</div>';
  } else {
    h+='<div style="text-align:center;padding:40px;"><div style="font-size:48px;margin-bottom:16px;">\u2705</div><div style="font-size:20px;font-weight:700;color:#10B981;margin-bottom:8px;">\u767a\u6ce8\u5b8c\u4e86</div><div style="font-size:13px;color:#888;margin-bottom:24px;">\u5168\u3066\u306e\u30b9\u30c6\u30c3\u30d7\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f</div></div>';
  }
  h+='<div style="margin-top:20px;display:flex;justify-content:space-between;">';
  if(p.step>1)h+='<button style="background:#f0f0f0;border:none;padding:10px 24px;border-radius:8px;font-size:13px;cursor:pointer;">\u2190 \u524d\u306e\u30b9\u30c6\u30c3\u30d7</button>';else h+='<div></div>';
  if(p.step<4)h+='<button style="background:linear-gradient(135deg,'+stepC[p.step-1]+','+stepC[Math.min(p.step,3)]+');color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\u6b21\u306e\u30b9\u30c6\u30c3\u30d7\u3078 \u2192</button>';
  h+='</div></div>';
  c.innerHTML=h;
}

function formField(label,input,full){return '<div'+(full?' style="grid-column:1/-1;"':'')+'><label style="font-size:12px;font-weight:600;color:#555;display:block;margin-bottom:6px;">'+label+'</label>'+input+'</div>';}
function formFieldInline(label,input){return '<label style="font-size:12px;font-weight:600;color:#555;display:block;margin-bottom:6px;">'+label+'</label>'+input;}
function tabButtons(opts,active){var h='<div style="display:flex;gap:4px;">';opts.forEach(function(o,i){var a=i===active;h+='<button style="flex:1;padding:8px;border:'+(a?'2px solid #5B4FE8':'1px solid #e0e0e0')+';background:'+(a?'#5B4FE820':'#fff')+';border-radius:6px;font-size:11px;cursor:pointer;color:'+(a?'#5B4FE8':'#888')+';font-weight:'+(a?'600':'400')+';">'+o+'</button>';});h+='</div>';return h;}

function toggleFlowMode(){STATE.flowMode=STATE.flowMode==='client'?'manager':'client';saveState();}

// ============ MODULE 5: APPROVAL ============
function renderApproval(container) {
  var filter = STATE._approvalFilter || '全て';
  var approvals = [
    {id:'APR-001',title:'梅田PJ 追加工事費用申請',type:'経費申請',amount:'￥2,400,000',applicant:'佐藤一郎',date:'2026-04-02',status:'申請中',priority:'高',step:'2/3',approvers:['樋口専務','部長']},
    {id:'APR-002',title:'出張申請 横浜PJ現場視察',type:'出張申請',amount:'￥48,500',applicant:'山田次郎',date:'2026-04-01',status:'申請中',priority:'中',step:'1/2',approvers:['樋口専務']},
    {id:'APR-003',title:'資材購入 防水シート100m²',type:'購入申請',amount:'￥380,000',applicant:'田中花子',date:'2026-03-31',status:'承認',priority:'中',step:'3/3',approvers:[]},
    {id:'APR-004',title:'外注先変更 電気工事業者',type:'変更申請',amount:'',applicant:'鈴木美咲',date:'2026-03-29',status:'差戻し',priority:'低',step:'1/2',approvers:['樋口専務']},
    {id:'APR-005',title:'京都PJ 着工申請',type:'着工申請',amount:'',applicant:'佐藤一郎',date:'2026-03-28',status:'承認',priority:'高',step:'3/3',approvers:[]},
    {id:'APR-006',title:'有給休暇申請 4/10-4/11',type:'休暇申請',amount:'',applicant:'小林健太',date:'2026-03-27',status:'承認',priority:'低',step:'2/2',approvers:[]}
  ];

  var statusColors = {'申請中':'sb-g','承認':'sb-b','差戻し':'sb-r'};
  var priorityColors = {'高':'#ef4444','中':'#f59e0b','低':'#10b981'};
  var filters = ['全て','申請中','承認','差戻し'];

  var filtered = filter === '全て' ? approvals : approvals.filter(function(a) { return a.status === filter; });
  var counts = {};
  filters.forEach(function(f) { counts[f] = f === '全て' ? approvals.length : approvals.filter(function(a){return a.status===f}).length; });

  container.innerHTML = '<div class="topbar"><h2>許可願い</h2><div style="display:flex;gap:8px"><button class="btn2">📊 レポート</button><button class="btn" onclick="alert(\'新規申請フォームを開きます\')">+ 新規申請</button></div></div>'
    // Stats cards
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 20px;margin-bottom:20px">'
    + '<div class="kp" style="padding:16px;text-align:center;border-top:3px solid var(--p)"><div style="font-size:1.5rem;font-weight:800;color:var(--p)">' + approvals.length + '</div><div style="font-size:.8rem;color:var(--sub)">全申請</div></div>'
    + '<div class="kp" style="padding:16px;text-align:center;border-top:3px solid #10b981"><div style="font-size:1.5rem;font-weight:800;color:#10b981">' + counts['承認'] + '</div><div style="font-size:.8rem;color:var(--sub)">承認済</div></div>'
    + '<div class="kp" style="padding:16px;text-align:center;border-top:3px solid #f59e0b"><div style="font-size:1.5rem;font-weight:800;color:#f59e0b">' + counts['申請中'] + '</div><div style="font-size:.8rem;color:var(--sub)">承認待ち</div></div>'
    + '<div class="kp" style="padding:16px;text-align:center;border-top:3px solid #ef4444"><div style="font-size:1.5rem;font-weight:800;color:#ef4444">' + counts['差戻し'] + '</div><div style="font-size:.8rem;color:var(--sub)">差戻し</div></div>'
    + '</div>'
    // Filters
    + '<div style="display:flex;gap:8px;padding:0 20px;margin-bottom:16px">'
    + filters.map(function(f) {
        return '<button class="' + (f===filter?'btn':'btn2') + '" style="font-size:.85rem" onclick="STATE._approvalFilter=\'' + f + '\';renderApproval(document.querySelector(\'.main\'))">' + f + ' (' + counts[f] + ')</button>';
      }).join('')
    + '</div>'
    // Approval list
    + '<div style="padding:0 20px;display:flex;flex-direction:column;gap:12px">'
    + filtered.map(function(a) {
        return '<div class="kp" style="padding:16px;transition:all .2s;cursor:pointer" onmouseover="this.style.borderColor=\'var(--p)\'" onmouseout="this.style.borderColor=\'\'">'
          + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">'
          + '<div><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="font-size:.75rem;color:var(--sub)">' + a.id + '</span><span class="sb ' + (statusColors[a.status]||'') + '">' + a.status + '</span><span style="font-size:.7rem;padding:2px 6px;border-radius:4px;background:' + (priorityColors[a.priority]||'#888') + '15;color:' + (priorityColors[a.priority]||'#888') + ';font-weight:600">優先: ' + a.priority + '</span></div>'
          + '<strong style="font-size:.95rem">' + a.title + '</strong></div>'
          + (a.amount ? '<span style="font-size:1.1rem;font-weight:700;color:var(--p)">' + a.amount + '</span>' : '')
          + '</div>'
          + '<div style="display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--sub)">'
          + '<div style="display:flex;gap:16px"><span>👤 ' + a.applicant + '</span><span>📅 ' + a.date + '</span><span>📝 ' + a.type + '</span></div>'
          + '<div style="display:flex;align-items:center;gap:8px"><span>承認ステップ: ' + a.step + '</span>'
          + (a.status === '申請中' ? '<button class="btn" style="font-size:.75rem;padding:4px 12px" onclick="event.stopPropagation();alert(\'承認処理を実行します\')">承認する</button><button class="btn2" style="font-size:.75rem;padding:4px 12px;color:#ef4444" onclick="event.stopPropagation();alert(\'差戻し処理を実行します\')">差戻す</button>' : '')
          + '</div></div></div>';
      }).join('')
    + '</div>';
}


function renderAttendance(container) {
  var today = new Date();
  var clockedIn = STATE._clockedIn || false;
  var clockInTime = STATE._clockInTime || '';
  var records = [
    {date:'04/02(水)',in:'08:45',out:'18:30',work:'8:45',over:'0:45',status:'出勤'},
    {date:'04/01(火)',in:'09:00',out:'18:00',work:'8:00',over:'0:00',status:'出勤'},
    {date:'03/31(月)',in:'08:30',out:'19:15',work:'9:45',over:'1:45',status:'出勤'},
    {date:'03/30(日)',in:'-',out:'-',work:'-',over:'-',status:'休日'},
    {date:'03/29(土)',in:'-',out:'-',work:'-',over:'-',status:'休日'},
    {date:'03/28(金)',in:'08:50',out:'18:10',work:'8:20',over:'0:20',status:'出勤'},
    {date:'03/27(木)',in:'09:05',out:'17:00',work:'6:55',over:'0:00',status:'半休'}
  ];

  container.innerHTML = '<div class="topbar"><h2>勤務管理</h2><div style="display:flex;gap:8px"><button class="btn2">📊 月次レポート</button><button class="btn2">📤 CSV出力</button></div></div>'
    // Clock section
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 20px;margin-bottom:24px">'
    // Clock in/out card
    + '<div class="kp" style="padding:24px;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,.05),rgba(168,85,247,.05))">'
    + '<div style="font-size:2.5rem;font-weight:800;color:var(--p);margin-bottom:8px" id="liveClock"></div>'
    + '<div style="font-size:.85rem;color:var(--sub);margin-bottom:16px">' + today.getFullYear() + '年' + (today.getMonth()+1) + '月' + today.getDate() + '日 (' + ['日','月','火','水','木','金','土'][today.getDay()] + ')</div>'
    + '<div style="display:flex;gap:12px;justify-content:center">'
    + '<button class="btn" style="padding:12px 32px;font-size:1rem;' + (clockedIn ? 'opacity:.5;cursor:default' : '') + '" id="btnClockIn" onclick="if(!STATE._clockedIn){STATE._clockedIn=true;STATE._clockInTime=new Date().toTimeString().substring(0,5);renderAttendance(document.querySelector(\'.main\'))}">☀️ 出勤打刻</button>'
    + '<button class="btn" style="padding:12px 32px;font-size:1rem;background:linear-gradient(135deg,#f59e0b,#ef4444);' + (!clockedIn ? 'opacity:.5;cursor:default' : '') + '" id="btnClockOut" onclick="if(STATE._clockedIn){STATE._clockedIn=false;alert(\'退勤打刻完了: \'+new Date().toTimeString().substring(0,5));renderAttendance(document.querySelector(\'.main\'))}">🌙 退勤打刻</button>'
    + '</div>'
    + (clockedIn ? '<div style="margin-top:12px;font-size:.85rem;color:#10b981">✅ 出勤済み (' + clockInTime + ')</div>' : '<div style="margin-top:12px;font-size:.85rem;color:var(--sub)">未打刻</div>')
    + '</div>'
    // Monthly summary
    + '<div class="kp" style="padding:24px">'
    + '<h3 style="font-size:.95rem;font-weight:700;margin-bottom:16px">今月のサマリー</h3>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div style="text-align:center;padding:12px;background:rgba(99,102,241,.05);border-radius:8px"><div style="font-size:.75rem;color:var(--sub)">出勤日数</div><div style="font-size:1.3rem;font-weight:700;color:var(--p)">22日</div></div>'
    + '<div style="text-align:center;padding:12px;background:rgba(16,185,129,.05);border-radius:8px"><div style="font-size:.75rem;color:var(--sub)">総勤務</div><div style="font-size:1.3rem;font-weight:700;color:#10b981">179h</div></div>'
    + '<div style="text-align:center;padding:12px;background:rgba(245,158,11,.05);border-radius:8px"><div style="font-size:.75rem;color:var(--sub)">残業</div><div style="font-size:1.3rem;font-weight:700;color:#f59e0b">12.5h</div></div>'
    + '<div style="text-align:center;padding:12px;background:rgba(239,68,68,.05);border-radius:8px"><div style="font-size:.75rem;color:var(--sub)">有給残</div><div style="font-size:1.3rem;font-weight:700;color:#ef4444">8日</div></div>'
    + '</div></div></div>'
    // Time records table
    + '<div style="padding:0 20px"><div class="kp" style="overflow:hidden">'
    + '<table style="width:100%;border-collapse:collapse;font-size:.85rem">'
    + '<thead><tr style="background:rgba(99,102,241,.05)"><th style="padding:10px 14px;text-align:left">日付</th><th style="padding:10px 14px;text-align:center">出勤</th><th style="padding:10px 14px;text-align:center">退勤</th><th style="padding:10px 14px;text-align:center">勤務時間</th><th style="padding:10px 14px;text-align:center">残業</th><th style="padding:10px 14px;text-align:center">ステータス</th></tr></thead><tbody>'
    + records.map(function(r) {
        var statusColor = r.status === '出勤' ? '#10b981' : r.status === '休日' ? '#9ca3af' : '#f59e0b';
        return '<tr style="border-top:1px solid var(--border)">'
          + '<td style="padding:10px 14px;font-weight:500">' + r.date + '</td>'
          + '<td style="padding:10px 14px;text-align:center">' + r.in + '</td>'
          + '<td style="padding:10px 14px;text-align:center">' + r.out + '</td>'
          + '<td style="padding:10px 14px;text-align:center;font-weight:600">' + r.work + '</td>'
          + '<td style="padding:10px 14px;text-align:center;color:' + (r.over !== '0:00' && r.over !== '-' ? '#f59e0b' : 'var(--sub)') + '">' + r.over + '</td>'
          + '<td style="padding:10px 14px;text-align:center"><span style="color:' + statusColor + ';font-weight:600;font-size:.8rem">' + r.status + '</span></td>'
          + '</tr>';
      }).join('')
    + '</tbody></table></div></div>';

  // Live clock
  var clockEl = document.getElementById('liveClock');
  if (clockEl) {
    var updateClock = function() {
      var n = new Date();
      if(document.getElementById('liveClock')) {
        document.getElementById('liveClock').textContent = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0') + ':' + String(n.getSeconds()).padStart(2,'0');
        setTimeout(updateClock, 1000);
      }
    };
    updateClock();
  }
}


function renderInvoice(container) {
  var invoiceFilter = STATE._invoiceFilter || '全て';
  var invoices = [
    {id:'INV-2026-001',title:'梅田PJ 第1期工事',client:'株式会社大阪不動産',amount:'￥4,800,000',tax:'￥480,000',total:'￥5,280,000',date:'2026-04-01',due:'2026-04-30',status:'発行済',type:'請求書'},
    {id:'EST-2026-015',title:'横浜PJ 全体見積',client:'横浜マンション株式会社',amount:'￥12,500,000',tax:'￥1,250,000',total:'￥13,750,000',date:'2026-03-28',due:'-',status:'下書き',type:'見積書'},
    {id:'INV-2026-002',title:'京都PJ 解体工事',client:'京都町屋株式会社',amount:'￥2,200,000',tax:'￥220,000',total:'￥2,420,000',date:'2026-03-25',due:'2026-04-25',status:'入金済',type:'請求書'},
    {id:'EST-2026-014',title:'新規案件 内装工事',client:'株式会社サクラハウス',amount:'￥890,000',tax:'￥89,000',total:'￥979,000',date:'2026-03-20',due:'-',status:'送付済',type:'見積書'}
  ];

  var statusColors = {'発行済':'#3b82f6','下書き':'#9ca3af','入金済':'#10b981','送付済':'#8b5cf6'};
  var filters = ['全て','見積書','請求書'];
  var filtered = invoiceFilter === '全て' ? invoices : invoices.filter(function(inv) { return inv.type === invoiceFilter; });

  container.innerHTML = '<div class="topbar"><h2>見積ズ・請求書</h2><div style="display:flex;gap:8px"><button class="btn2">📊 売上分析</button><button class="btn" onclick="alert(\'新規作成フォームを開きます\')">+ 新規作成</button></div></div>'
    // Summary cards
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 20px;margin-bottom:20px">'
    + '<div class="kp" style="padding:16px;border-top:3px solid var(--p)"><div style="font-size:.8rem;color:var(--sub)">今月売上</div><div style="font-size:1.3rem;font-weight:800;color:var(--p)">￥7,700,000</div></div>'
    + '<div class="kp" style="padding:16px;border-top:3px solid #3b82f6"><div style="font-size:.8rem;color:var(--sub)">未回収</div><div style="font-size:1.3rem;font-weight:800;color:#3b82f6">￥5,280,000</div></div>'
    + '<div class="kp" style="padding:16px;border-top:3px solid #10b981"><div style="font-size:.8rem;color:var(--sub)">回収済</div><div style="font-size:1.3rem;font-weight:800;color:#10b981">￥2,420,000</div></div>'
    + '<div class="kp" style="padding:16px;border-top:3px solid #f59e0b"><div style="font-size:.8rem;color:var(--sub)">見積中</div><div style="font-size:1.3rem;font-weight:800;color:#f59e0b">￥14,729,000</div></div>'
    + '</div>'
    // Filters + Invoice list
    + '<div style="padding:0 20px">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><div style="display:flex;gap:8px">'
    + filters.map(function(f) { return '<button class="' + (f===invoiceFilter?'btn':'btn2') + '" style="font-size:.85rem" onclick="STATE._invoiceFilter=\'' + f + '\';renderInvoice(document.querySelector(\'.main\'))">' + f + '</button>'; }).join('')
    + '</div><input class="inp" placeholder="🔍 検索..." style="width:200px"></div>'
    + '<div style="display:flex;flex-direction:column;gap:12px">'
    + filtered.map(function(inv) {
        return '<div class="kp" style="padding:16px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor=\'var(--p)\'" onmouseout="this.style.borderColor=\'\'">'
          + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">'
          + '<div><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="font-size:.75rem;color:var(--sub)">' + inv.id + '</span><span style="background:' + (statusColors[inv.status]||'#888') + '15;color:' + (statusColors[inv.status]||'#888') + ';padding:2px 8px;border-radius:4px;font-size:.75rem;font-weight:600">' + inv.status + '</span><span class="sb ' + (inv.type==='見積書'?'sb-y':'sb-b') + '">' + inv.type + '</span></div>'
          + '<strong style="font-size:.95rem">' + inv.title + '</strong>'
          + '<div style="font-size:.8rem;color:var(--sub);margin-top:2px">' + inv.client + '</div></div>'
          + '<div style="text-align:right"><div style="font-size:1.2rem;font-weight:800;color:var(--p)">' + inv.total + '</div><div style="font-size:.75rem;color:var(--sub)">税込</div></div>'
          + '</div>'
          + '<div style="display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--sub);padding-top:10px;border-top:1px solid var(--border)">'
          + '<div style="display:flex;gap:16px"><span>📅 発行: ' + inv.date + '</span>' + (inv.due !== '-' ? '<span>⏰ 支払期限: ' + inv.due + '</span>' : '') + '</div>'
          + '<div style="display:flex;gap:8px"><button class="btn2" style="font-size:.75rem;padding:4px 10px" onclick="event.stopPropagation();alert(\'PDFプレビューを開きます\')">📄 PDF</button><button class="btn2" style="font-size:.75rem;padding:4px 10px" onclick="event.stopPropagation()">✉️ 送付</button></div>'
          + '</div></div>';
      }).join('')
    + '</div></div>';
}


function renderFinance(container) {
  var finFilter = STATE._finFilter || '全て';
  var transactions = [
    {date:'2026-04-02',desc:'梅田PJ 資材代金',cat:'資材費',amount:'-￥380,000',balance:'￥12,450,000',type:'出金',receipt:true},
    {date:'2026-04-01',desc:'京都PJ 工事代金入金',cat:'売上',amount:'+￥2,420,000',balance:'￥12,830,000',type:'入金',receipt:false},
    {date:'2026-03-31',desc:'従業員給与 3月分',cat:'給与',amount:'-￥3,200,000',balance:'￥10,410,000',type:'出金',receipt:true},
    {date:'2026-03-30',desc:'交通費精算 佐藤',cat:'交通費',amount:'-￥48,500',balance:'￥13,610,000',type:'出金',receipt:true},
    {date:'2026-03-28',desc:'梅田PJ 第1期請求',cat:'売上',amount:'+￥5,280,000',balance:'￥13,658,500',type:'入金',receipt:false},
    {date:'2026-03-25',desc:'事務所家賃 4月分',cat:'家賃',amount:'-￥450,000',balance:'￥8,378,500',type:'出金',receipt:true}
  ];
  var filters = ['全て','入金','出金'];
  var filtered = finFilter === '全て' ? transactions : transactions.filter(function(t){return t.type===finFilter});

  container.innerHTML = '<div class="topbar"><h2>入出金管理</h2><div style="display:flex;gap:8px"><button class="btn2">📥 電子帳簿</button><button class="btn2">📊 レポート</button><button class="btn">+ 新規登録</button></div></div>'
    // Summary cards
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 20px;margin-bottom:24px">'
    + '<div class="kp" style="padding:20px;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(168,85,247,.08))"><div style="font-size:.8rem;color:var(--sub)">現在残高</div><div style="font-size:1.5rem;font-weight:800;color:var(--p);margin:4px 0">￥12,450,000</div><div style="font-size:.75rem;color:#10b981">▲ +8.3% 前月比</div></div>'
    + '<div class="kp" style="padding:20px"><div style="font-size:.8rem;color:var(--sub)">今月入金</div><div style="font-size:1.5rem;font-weight:800;color:#10b981;margin:4px 0">￥7,700,000</div><div style="font-size:.75rem;color:var(--sub)">2件の入金</div></div>'
    + '<div class="kp" style="padding:20px"><div style="font-size:.8rem;color:var(--sub)">今月出金</div><div style="font-size:1.5rem;font-weight:800;color:#ef4444;margin:4px 0">￥4,078,500</div><div style="font-size:.75rem;color:var(--sub)">4件の出金</div></div>'
    + '</div>'
    // Compliance badge
    + '<div style="padding:0 20px;margin-bottom:16px"><div class="kp" style="padding:12px 20px;display:flex;align-items:center;gap:12px;background:rgba(16,185,129,.05)">'
    + '<span style="font-size:1.2rem">✅</span>'
    + '<div><strong style="font-size:.85rem;color:#10b981">電子帳簿保存法対応</strong><div style="font-size:.75rem;color:var(--sub)">全ての取引記録は電子帳簿保存法に準拠して保存されています</div></div></div></div>'
    // Filters
    + '<div style="display:flex;gap:8px;padding:0 20px;margin-bottom:16px">'
    + filters.map(function(f) { return '<button class="' + (f===finFilter?'btn':'btn2') + '" style="font-size:.85rem" onclick="STATE._finFilter=\'' + f + '\';renderFinance(document.querySelector(\'.main\'))">' + f + '</button>'; }).join('')
    + '<div style="flex:1"></div><input class="inp" placeholder="🔍 取引検索..." style="width:200px">'
    + '</div>'
    // Transactions table
    + '<div style="padding:0 20px"><div class="kp" style="overflow:hidden">'
    + '<table style="width:100%;border-collapse:collapse;font-size:.85rem">'
    + '<thead><tr style="background:rgba(99,102,241,.05)"><th style="padding:10px 14px;text-align:left">日付</th><th style="padding:10px 14px;text-align:left">摘要</th><th style="padding:10px 14px;text-align:left">勘定科目</th><th style="padding:10px 14px;text-align:right">金額</th><th style="padding:10px 14px;text-align:right">残高</th><th style="padding:10px 14px;text-align:center">証隠</th></tr></thead><tbody>'
    + filtered.map(function(t) {
        var isIn = t.type === '入金';
        return '<tr style="border-top:1px solid var(--border)">'
          + '<td style="padding:10px 14px">' + t.date + '</td>'
          + '<td style="padding:10px 14px;font-weight:500">' + t.desc + '</td>'
          + '<td style="padding:10px 14px"><span style="background:rgba(99,102,241,.1);color:var(--p);padding:2px 8px;border-radius:4px;font-size:.75rem">' + t.cat + '</span></td>'
          + '<td style="padding:10px 14px;text-align:right;font-weight:700;color:' + (isIn ? '#10b981' : '#ef4444') + '">' + t.amount + '</td>'
          + '<td style="padding:10px 14px;text-align:right;font-weight:500">' + t.balance + '</td>'
          + '<td style="padding:10px 14px;text-align:center">' + (t.receipt ? '<span style="cursor:pointer" title="領収書確認">📋</span>' : '<span style="color:var(--sub)">-</span>') + '</td>'
          + '</tr>';
      }).join('')
    + '</tbody></table></div></div>';
}


function renderCard(container) {
  var cards = [
    {name:'田中太郎',company:'株式会社大阪不動産',dept:'開発事業部 部長',email:'tanaka@osaka-re.co.jp',tel:'06-1234-5678',met:'2026-03-28',memo:'梅田PJのキーパーソン。決裁権あり',tag:'重要'},
    {name:'山本花子',company:'横浜マンション株式会社',dept:'設計部 主任',email:'yamamoto@yokohama-ms.co.jp',tel:'045-2345-6789',met:'2026-04-01',memo:'横浜PJ設計担当。レスポンスが速い',tag:'通常'},
    {name:'佐々木健',company:'京都町屋株式会社',dept:'代表取締役',email:'sasaki@kyoto-machiya.co.jp',tel:'075-3456-7890',met:'2026-03-15',memo:'京都PJオーナー。伝統へのこだわりが強い',tag:'重要'},
    {name:'鈴木一郎',company:'株式会社サクラハウス',dept:'工事部 課長',email:'suzuki@sakura-house.co.jp',tel:'03-4567-8901',met:'2026-03-20',memo:'新規案件の窓口',tag:'新規'},
    {name:'高橋美月',company:'東京都市開発株式会社',dept:'営業部 主任',email:'takahashi@tokyo-dev.co.jp',tel:'03-5678-9012',met:'2026-02-28',memo:'展示会で交換。大規模PJの情報あり',tag:'フォロー'},
    {name:'渡辺健二',company:'株式会社尾張建設',dept:'取締役 工事部長',email:'watanabe@owari-ken.co.jp',tel:'052-6789-0123',met:'2026-03-10',memo:'協力業者候補。実績豊富',tag:'通常'}
  ];
  var tagColors = {'重要':'#ef4444','通常':'#6366f1','新規':'#10b981','フォロー':'#f59e0b'};

  container.innerHTML = '<div class="topbar"><h2>名刺管理</h2><div style="display:flex;gap:8px"><button class="btn2">📷 スキャン</button><button class="btn2">📤 CSV出力</button><button class="btn">+ 新規登録</button></div></div>'
    // Stats
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 20px;margin-bottom:20px">'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:var(--p)">' + cards.length + '</div><div style="font-size:.8rem;color:var(--sub)">総名刺数</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#10b981">4</div><div style="font-size:.8rem;color:var(--sub)">企業数</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#f59e0b">2</div><div style="font-size:.8rem;color:var(--sub)">今月新規</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#ef4444">1</div><div style="font-size:.8rem;color:var(--sub)">フォロー待ち</div></div>'
    + '</div>'
    // Search
    + '<div style="padding:0 20px;margin-bottom:16px"><input class="inp" placeholder="🔍 名前・会社名・部署で検索..." style="width:100%"></div>'
    // Cards grid
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;padding:0 20px">'
    + cards.map(function(c) {
        return '<div class="kp" style="padding:16px;cursor:pointer;transition:all .2s" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 16px rgba(0,0,0,.1)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
          + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">'
          + '<div style="display:flex;gap:12px;align-items:center">'
          + '<div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem">' + c.name.charAt(0) + '</div>'
          + '<div><strong style="font-size:1rem">' + c.name + '</strong><div style="font-size:.8rem;color:var(--sub)">' + c.dept + '</div></div>'
          + '</div>'
          + '<span style="background:' + (tagColors[c.tag]||'#888') + '15;color:' + (tagColors[c.tag]||'#888') + ';padding:2px 8px;border-radius:4px;font-size:.7rem;font-weight:600">' + c.tag + '</span>'
          + '</div>'
          + '<div style="font-size:.85rem;font-weight:600;color:var(--p);margin-bottom:8px">' + c.company + '</div>'
          + '<div style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.8rem;color:var(--sub)">'
          + '<span>✉️</span><span>' + c.email + '</span>'
          + '<span>📞</span><span>' + c.tel + '</span>'
          + '<span>📅</span><span>最終接触: ' + c.met + '</span>'
          + '</div>'
          + '<div style="margin-top:10px;padding:8px 10px;background:rgba(99,102,241,.04);border-radius:6px;font-size:.8rem;color:var(--text)">📝 ' + c.memo + '</div>'
          + '</div>';
      }).join('')
    + '</div>';
}


function renderMatching(container) {
  var matchFilter = STATE._matchFilter || '全て';
  var workers = [
    {name:'山本建設',type:'法人',skills:['内装','クロス','建具'],area:'大阪府全域',rating:4.8,reviews:24,price:'￥18,000~/日',available:true,img:'🏢'},
    {name:'佐藤電気工事',type:'法人',skills:['電気工事','空調','防災'],area:'関西全域',rating:4.6,reviews:18,price:'￥22,000~/日',available:true,img:'⚡'},
    {name:'高橋職人',type:'個人',skills:['左官','タイル','防水'],area:'東京都・神奈川',rating:4.9,reviews:31,price:'￥25,000~/日',available:false,img:'🔨️'},
    {name:'田中塗装',type:'法人',skills:['塗装','防水','外壁'],area:'京都府・滋賀県',rating:4.5,reviews:12,price:'￥16,000~/日',available:true,img:'🎨'},
    {name:'渡辺設備',type:'法人',skills:['給排水','ガス','給湯'],area:'大阪府・兵庫県',rating:4.7,reviews:20,price:'￥20,000~/日',available:true,img:'🚣'}
  ];
  var allSkills = ['全て','内装','電気工事','左官','塗装','給排水','防水'];
  var filtered = matchFilter === '全て' ? workers : workers.filter(function(w){return w.skills.indexOf(matchFilter)>=0});

  container.innerHTML = '<div class="topbar"><h2>マッチング</h2><div style="display:flex;gap:8px"><button class="btn2">📊 分析</button><button class="btn">+ 案件登録</button></div></div>'
    // Search & filter
    + '<div style="padding:0 20px;margin-bottom:16px"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
    + '<input class="inp" placeholder="🔍 職種・エリア・スキルで検索..." style="flex:1;min-width:200px">'
    + allSkills.map(function(s) { return '<button class="' + (s===matchFilter?'btn':'btn2') + '" style="font-size:.8rem;padding:4px 12px" onclick="STATE._matchFilter=\'' + s + '\';renderMatching(document.querySelector(\'.main\'))">' + s + '</button>'; }).join('')
    + '</div></div>'
    // Stats row
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 20px;margin-bottom:20px">'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:var(--p)">' + workers.length + '</div><div style="font-size:.8rem;color:var(--sub)">登録業者</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#10b981">' + workers.filter(function(w){return w.available}).length + '</div><div style="font-size:.8rem;color:var(--sub)">対応可能</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#f59e0b">4.7</div><div style="font-size:.8rem;color:var(--sub)">平均評価</div></div>'
    + '<div class="kp" style="padding:14px;text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#8b5cf6">3</div><div style="font-size:.8rem;color:var(--sub)">進行中案件</div></div>'
    + '</div>'
    // Worker cards
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;padding:0 20px">'
    + filtered.map(function(w) {
        var stars = '';
        for(var i=0;i<5;i++) stars += i < Math.floor(w.rating) ? '⭐' : '☆';
        return '<div class="kp" style="padding:16px;transition:all .2s" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 16px rgba(0,0,0,.1)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
          + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">'
          + '<div style="display:flex;gap:12px;align-items:center">'
          + '<div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.3rem">' + w.img + '</div>'
          + '<div><strong style="font-size:1rem">' + w.name + '</strong><div style="font-size:.8rem;color:var(--sub)">' + w.type + ' | ' + w.area + '</div></div>'
          + '</div>'
          + '<span style="padding:3px 8px;border-radius:6px;font-size:.75rem;font-weight:600;' + (w.available ? 'background:#10b98115;color:#10b981' : 'background:#9ca3af15;color:#9ca3af') + '">' + (w.available ? '対応可' : '対応不可') + '</span>'
          + '</div>'
          + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">'
          + w.skills.map(function(sk){return '<span style="background:rgba(99,102,241,.1);color:var(--p);padding:2px 8px;border-radius:4px;font-size:.75rem">' + sk + '</span>'}).join('')
          + '</div>'
          + '<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem">'
          + '<div><span style="color:#f59e0b;font-size:.8rem">' + stars + '</span> <span style="font-weight:600">' + w.rating + '</span> <span style="color:var(--sub)">(' + w.reviews + '件)</span></div>'
          + '<span style="font-weight:700;color:var(--p)">' + w.price + '</span>'
          + '</div>'
          + '<div style="display:flex;gap:8px;margin-top:12px">'
          + '<button class="btn" style="flex:1;font-size:.85rem" onclick="alert(\'見積依頼フォームを開きます\');">見積依頼</button>'
          + '<button class="btn2" style="flex:1;font-size:.85rem" onclick="alert(\'詳細情報を表示します\');">詳細</button>'
          + '</div></div>';
      }).join('')
    + '</div>';
}




// ============ MAIN API ============
function switchTab(tabId){STATE.currentTab=tabId;saveState();buildSidebar();buildMainArea();}
window._hataraiku={switchTab:switchTab,getState:function(){return STATE;},toggleFlowMode:toggleFlowMode,openProject:openProject,sendChat:function(){}};
window.sw=function(page){var map={dash:'dash',proj:'project',flow:'project',chat:'chat',team:'matching',data:'folder',ai:'dash',log:'approval'};switchTab(map[page]||page);};
  window.STATE=STATE;window.renderApproval=renderApproval;window.renderMatching=renderMatching;window.renderAttendance=renderAttendance;window.renderInvoice=renderInvoice;window.renderFinance=renderFinance;window.renderCard=renderCard;window.renderChat=renderChat;window.renderFolder=renderFolder;window.renderDashboard=renderDashboard;

function init(){
  if(!document.querySelector('.sidebar')||!document.querySelector('.main')){setTimeout(init,100);return;}
  document.body.style.margin='0';
  document.body.style.fontFamily='-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif';
  document.body.style.background='#f5f5f7';
  var footer=document.querySelector('footer');if(footer)footer.style.display='none';
  // Clear old state to show new UI
  sessionStorage.removeItem('hataraiku_state');
  STATE.projects=SAMPLE_PROJECTS;STATE.approvals=SAMPLE_APPROVALS;STATE.attendance=SAMPLE_ATTENDANCE;
  STATE.invoices=SAMPLE_INVOICES;STATE.transactions=SAMPLE_TRANSACTIONS;STATE.cards=SAMPLE_CARDS;STATE.matchings=SAMPLE_MATCHINGS;
  buildSidebar();buildMainArea();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
