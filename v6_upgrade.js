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
function renderDashboard(c,sub,act) {
  if(sub)sub.textContent='\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u7d4c\u55b6\u6307\u6a19';
  if(act)act.innerHTML='<span style="font-size:12px;color:#888;">'+new Date().toLocaleString('ja-JP')+'</span><button onclick="window._hataraiku.switchTab(\'project\')" style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u65b0\u898f\u6848\u4ef6</button>';
  var stats=[{label:'\u53d7\u6ce8\u7dcf\u984d',value:'\u00a514,854\u4e07',sub:'\u25b2 \u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u96c6\u8a08',color:'#5B4FE8'},{label:'\u9032\u884cPJ',value:STATE.projects.filter(function(p){return p.step<4;}).length+'\u4ef6',sub:'\u25b2 \u5b9f\u30c7\u30fc\u30bf\u9023\u52d5',color:'#10B981'},{label:'\u7a3c\u50cd\u6642\u9593',value:'179h',sub:'\u4eca\u6708\u7d2f\u8a08',color:'#F59E0B'},{label:'\u54c1\u8cea\u30b9\u30b3\u30a2',value:'93.8%',sub:'\u25b2 \u627f\u8a8d\u30c7\u30fc\u30bf\u7b97\u51fa',color:'#EF4444'}];
  var grid='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">';
  stats.forEach(function(s){grid+='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:12px;color:#888;">'+s.label+'</div><div style="font-size:28px;font-weight:800;color:'+s.color+';margin:4px 0;">'+s.value+'</div><div style="font-size:11px;color:'+s.color+';">'+s.sub+'</div></div>';});
  grid+='</div>';
  c.innerHTML=grid;
  // Chart + Activity
  var row='<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:16px;margin-bottom:24px;">';
  var chart='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u6708\u6b21\u63a8\u79fb</h3><svg viewBox="0 0 500 200" style="width:100%;height:180px;"><line x1="50" y1="10" x2="50" y2="170" stroke="#e8e8ed"/><line x1="50" y1="170" x2="480" y2="170" stroke="#e8e8ed"/>';
  var pts=[[80,150],[150,130],[220,120],[290,100],[360,70],[430,40]];
  var mos=['10\u6708','11\u6708','12\u6708','1\u6708','2\u6708','3\u6708'];
  chart+='<polyline points="'+pts.map(function(p){return p[0]+','+p[1];}).join(' ')+'" fill="none" stroke="#5B4FE8" stroke-width="2.5"/>';
  pts.forEach(function(p,i){chart+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#5B4FE8"/><text x="'+p[0]+'" y="188" text-anchor="middle" font-size="11" fill="#888">'+mos[i]+'</text>';});
  ['0%','25%','50%','75%','100%'].forEach(function(l,i){chart+='<text x="40" y="'+(170-i*40)+'" text-anchor="end" font-size="10" fill="#aaa">'+l+'</text><line x1="50" y1="'+(170-i*40)+'" x2="480" y2="'+(170-i*40)+'" stroke="#f0f0f0" stroke-width="0.5"/>';});
  chart+='</svg></div>';
  var activity='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u76f4\u8fd1\u306e\u6d3b\u52d5</h3>';
  STATE.approvals.slice(0,5).forEach(function(a){var sc=a.status==='\u627f\u8a8d'?'#10B981':a.status==='\u5dee\u623b\u3057'?'#EF4444':'#F59E0B';activity+='<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f0f0;"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:10px;padding:2px 8px;border-radius:4px;background:'+sc+'20;color:'+sc+';font-weight:600;">'+a.status+'</span><span style="font-size:13px;color:#333;">'+a.title+'</span></div><span style="font-size:11px;color:#aaa;">'+a.date+'</span></div>';});
  activity+='</div>';
  row+=chart+activity+'</div>';
  c.innerHTML+=row;
  // Projects
  var ps='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u9032\u6357\u4e00\u89a7</h3>';
  STATE.projects.forEach(function(p){var pct=Math.round((p.step/4)*100);var scs={'\u6848\u4ef6\u76f8\u8ac7':'#F59E0B','\u73fe\u5730\u8abf\u67fb':'#3B82F6','\u898b\u7a4d\u63d0\u51fa':'#8B5CF6','\u767a\u6ce8\u5b8c\u4e86':'#10B981'};var sc=scs[p.status]||'#888';ps+='<div style="padding:14px 0;border-bottom:1px solid #f5f5f7;cursor:pointer;" onclick="window._hataraiku.switchTab(\'project\')"><div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:600;font-size:14px;color:#1a1a2e;">'+p.name+'</span><span style="font-size:11px;padding:3px 10px;border-radius:6px;background:'+sc+'18;color:'+sc+';font-weight:600;">'+p.status+'</span></div><div style="display:flex;align-items:center;gap:12px;margin-top:8px;"><div style="flex:1;height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden;"><div style="width:'+pct+'%;height:100%;background:'+sc+';border-radius:3px;transition:width 0.5s;"></div></div><span style="font-size:12px;color:'+sc+';font-weight:700;min-width:40px;text-align:right;">'+pct+'%</span></div><div style="font-size:11px;color:#888;margin-top:4px;">\u62c5\u5f53: '+p.manager+' | \u30a8\u30ea\u30a2: '+p.area+'</div></div>';});
  ps+='</div>';
  c.innerHTML+=ps;
}

// ============ MODULE 2: CHAT (\u5909\u66f4\u3057\u306a\u3044) ============
function renderChat(c,sub,act) {
  if(sub)sub.textContent='\u9023\u7d61\u3059\u308b\u76ee\u7684 \u2014 \u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u30b3\u30df\u30e5\u30cb\u30b1\u30fc\u30b7\u30e7\u30f3';
  if(act)act.innerHTML='';
  var origChat=document.getElementById('chat');
  if(origChat&&origChat.innerHTML.trim().length>50){c.innerHTML=origChat.innerHTML;return;}
  function chCh(nm,info,a){var bg=a?'background:#f0effe;border-left:3px solid #5B4FE8;':'border-left:3px solid transparent;';return '<div style="padding:12px 14px;cursor:pointer;'+bg+'transition:all 0.15s;" onmouseover="this.style.background=\'#f8f8fc\'" onmouseout="this.style.background=\''+(a?'#f0effe':'transparent')+'\'"><div style="font-size:13px;font-weight:'+(a?'600':'400')+';color:#1a1a2e;">'+nm+'</div><div style="font-size:11px;color:#888;">'+info+'</div></div>';}
  function chMsg(nm,msg,tm,clr){return '<div style="display:flex;gap:10px;margin-bottom:16px;"><div style="width:36px;height:36px;border-radius:50%;background:'+clr+'18;color:'+clr+';display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">'+nm.charAt(0)+'</div><div><div style="display:flex;align-items:baseline;gap:8px;"><span style="font-size:13px;font-weight:600;color:#1a1a2e;">'+nm+'</span><span style="font-size:10px;color:#aaa;">'+tm+'</span></div><div style="font-size:13px;color:#555;margin-top:3px;line-height:1.5;">'+msg+'</div></div></div>';}
  c.innerHTML='<div style="display:grid;grid-template-columns:240px 1fr;height:calc(100vh - 130px);background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="border-right:1px solid #e8e8ed;overflow-y:auto;"><div style="padding:12px;border-bottom:1px solid #e8e8ed;"><input placeholder="\u30c1\u30e3\u30f3\u30cd\u30eb\u691c\u7d22..." style="width:100%;padding:8px 12px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;"></div><div style="padding:4px 0;">'+chCh('\u5168\u4f53\u30c1\u30e3\u30c3\u30c8','6\u540d\u53c2\u52a0',true)+chCh('\u6885\u7530\u518d\u958b\u767a\u30d3\u30eb','3\u540d\u53c2\u52a0',false)+chCh('\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3','4\u540d\u53c2\u52a0',false)+chCh('\u4eac\u90fd\u753a\u5c4b','2\u540d\u53c2\u52a0',false)+'</div></div><div style="display:flex;flex-direction:column;"><div style="padding:14px 20px;border-bottom:1px solid #e8e8ed;font-weight:600;font-size:15px;color:#1a1a2e;">\u5168\u4f53\u30c1\u30e3\u30c3\u30c8 <span style="font-size:11px;color:#888;font-weight:400;">6\u540d\u53c2\u52a0</span></div><div style="flex:1;overflow-y:auto;padding:20px;" id="hk-chat-messages">'+chMsg('\u7530\u4e2d\u592a\u90ce','\u6885\u7530\u73fe\u5834\u306e\u9032\u6357\u5831\u544a\u3067\u3059\u3002\u672c\u65e5\u3001\u5185\u88c5\u5de5\u4e8b\u306e70%\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002','09:15','#5B4FE8')+chMsg('\u4f50\u85e4\u4e00\u90ce','\u4e86\u89e3\u3057\u307e\u3057\u305f\u3002\u5199\u771f\u3092\u30d5\u30a9\u30eb\u30c0\u306b\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u304a\u9858\u3044\u3057\u307e\u3059\u3002','09:22','#10B981')+chMsg('\u6a0b\u53e3\u6625\u9a0e','\u9032\u6357\u9806\u8abf\u3067\u3059\u306d\u3002\u6765\u9031\u306e\u6253\u5408\u305b\u306e\u65e5\u7a0b\u8abf\u6574\u3082\u304a\u9858\u3044\u3057\u307e\u3059\u3002','09:30','#F59E0B')+'</div><div style="padding:12px 20px;border-top:1px solid #e8e8ed;display:flex;gap:8px;"><input id="hk-chat-input" placeholder="\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u5165\u529b..." style="flex:1;padding:10px 14px;border:1px solid #e0e0e0;border-radius:8px;font-size:13px;outline:none;" onkeydown="if(event.key===\'Enter\')window._hataraiku.sendChat()"><button onclick="window._hataraiku.sendChat()" style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">\u9001\u4fe1</button></div></div></div>';
}
function sendChat(){var inp=document.getElementById('hk-chat-input');var msgs=document.getElementById('hk-chat-messages');if(!inp||!msgs||!inp.value.trim())return;msgs.innerHTML+='<div style="display:flex;gap:10px;margin-bottom:16px;"><div style="width:36px;height:36px;border-radius:50%;background:#F59E0B18;color:#F59E0B;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">\u6a0b</div><div><div style="display:flex;align-items:baseline;gap:8px;"><span style="font-size:13px;font-weight:600;color:#1a1a2e;">\u6a0b\u53e3\u6625\u9a0e</span><span style="font-size:10px;color:#aaa;">'+nowTime()+'</span></div><div style="font-size:13px;color:#555;margin-top:3px;line-height:1.5;">'+inp.value.trim()+'</div></div></div>';inp.value='';msgs.scrollTop=msgs.scrollHeight;}

// ============ MODULE 3: FOLDER ============
function renderFolder(c,sub,act) {
  if(sub)sub.textContent='\u30c7\u30fc\u30bf\u7ba1\u7406 \u2014 \u30d5\u30a1\u30a4\u30eb\u30fb\u66f8\u985e\u306e\u4e00\u5143\u7ba1\u7406';
  if(act)act.innerHTML='<button onclick="alert(\'\u30d5\u30a1\u30a4\u30eb\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u6a5f\u80fd\')" style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u30a2\u30c3\u30d7\u30ed\u30fc\u30c9</button>';
  var folders=[{name:'\u7269\u4ef6\u8cc7\u6599',icon:'\ud83d\udcc1',count:12,size:'45.2 MB'},{name:'\u898b\u7a4d\u66f8\u30fb\u8acb\u6c42\u66f8',icon:'\ud83d\udcc1',count:8,size:'12.8 MB'},{name:'\u5951\u7d04\u66f8',icon:'\ud83d\udcc1',count:5,size:'8.4 MB'},{name:'\u73fe\u5834\u5199\u771f',icon:'\ud83d\udcc1',count:156,size:'890 MB'},{name:'\u56f3\u9762\u30fbCAD',icon:'\ud83d\udcc1',count:22,size:'234 MB'},{name:'\u8b70\u4e8b\u9332',icon:'\ud83d\udcc1',count:18,size:'6.2 MB'}];
  var files=[{name:'\u6885\u7530\u518d\u958b\u767a_\u9032\u6357\u5831\u544a.pdf',type:'PDF',size:'2.4 MB',owner:'\u7530\u4e2d\u592a\u90ce'},{name:'\u6a2a\u6d5c\u30de\u30f3\u30b7\u30e7\u30f3_\u898b\u7a4dv3.xlsx',type:'Excel',size:'156 KB',owner:'\u4f50\u85e4\u4e00\u90ce'},{name:'\u4eac\u90fd\u753a\u5c4b_\u5b8c\u6210\u30a4\u30e1\u30fc\u30b8.png',type:'\u753b\u50cf',size:'4.8 MB',owner:'\u9ad8\u6a4b\u7f8e\u54b2'}];
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;"><div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:12px;color:#888;">\u4f7f\u7528\u5bb9\u91cf</div><div style="font-size:24px;font-weight:800;color:#5B4FE8;margin:4px 0;">1.2 GB</div><div style="font-size:11px;color:#888;">/ 50 GB</div><div style="height:4px;background:#f0f0f0;border-radius:2px;margin-top:8px;"><div style="width:2.4%;height:100%;background:#5B4FE8;border-radius:2px;"></div></div></div><div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:12px;color:#888;">\u7dcf\u30d5\u30a1\u30a4\u30eb\u6570</div><div style="font-size:24px;font-weight:800;color:#10B981;margin:4px 0;">221</div><div style="font-size:11px;color:#10B981;">6\u30d5\u30a9\u30eb\u30c0</div></div><div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:12px;color:#888;">\u6700\u7d42\u66f4\u65b0</div><div style="font-size:24px;font-weight:800;color:#F59E0B;margin:4px 0;">\u672c\u65e5</div><div style="font-size:11px;color:#F59E0B;">3\u30d5\u30a1\u30a4\u30eb\u66f4\u65b0</div></div></div>';
  var fg='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:24px;"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u30d5\u30a9\u30eb\u30c0</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">';
  folders.forEach(function(f){fg+='<div style="padding:16px;border:1px solid #e8e8ed;border-radius:10px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor=\'#5B4FE8\'" onmouseout="this.style.borderColor=\'#e8e8ed\'"><div style="font-size:28px;margin-bottom:8px;">'+f.icon+'</div><div style="font-size:13px;font-weight:600;color:#1a1a2e;">'+f.name+'</div><div style="font-size:11px;color:#888;margin-top:4px;">'+f.count+'\u30d5\u30a1\u30a4\u30eb \u30fb '+f.size+'</div></div>';});
  fg+='</div></div>';c.innerHTML+=fg;
  var rt='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u6700\u8fd1\u306e\u30d5\u30a1\u30a4\u30eb</h3><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #f0f0f0;"><th style="text-align:left;padding:8px 0;font-size:12px;color:#888;font-weight:500;">\u30d5\u30a1\u30a4\u30eb\u540d</th><th style="text-align:left;padding:8px 0;font-size:12px;color:#888;font-weight:500;">\u7a2e\u985e</th><th style="text-align:left;padding:8px 0;font-size:12px;color:#888;font-weight:500;">\u30b5\u30a4\u30ba</th><th style="text-align:left;padding:8px 0;font-size:12px;color:#888;font-weight:500;">\u4f5c\u6210\u8005</th></tr></thead><tbody>';
  files.forEach(function(f){var ic=f.type==='PDF'?'\ud83d\udcc4':f.type==='Excel'?'\ud83d\udcca':'\ud83d\uddbc\ufe0f';rt+='<tr style="border-bottom:1px solid #f5f5f7;"><td style="padding:10px 0;font-size:13px;color:#1a1a2e;">'+ic+' '+f.name+'</td><td style="padding:10px 0;font-size:12px;color:#888;">'+f.type+'</td><td style="padding:10px 0;font-size:12px;color:#888;">'+f.size+'</td><td style="padding:10px 0;font-size:12px;color:#888;">'+f.owner+'</td></tr>';});
  rt+='</tbody></table></div>';c.innerHTML+=rt;
}

// ============ MODULE 4: PROJECT (\u65e7\u6253\u5408\u305b\u30d5\u30ed\u30fc) ============
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
function renderApproval(c,sub,act) {
  if(sub)sub.textContent='\u78ba\u8a8d\u4e8b\u9805\u306e\u5171\u6709\u30fb\u5185\u90e8\u7d71\u5236\u30ed\u30b0 \u2014 KickFlow\u4ee3\u66ff';
  if(act)act.innerHTML='<button style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u65b0\u898f\u7533\u8acb</button>';
  var pend=STATE.approvals.filter(function(a){return a.status==='\u7533\u8acb\u4e2d';}).length;
  var appr=STATE.approvals.filter(function(a){return a.status==='\u627f\u8a8d';}).length;
  var rej=STATE.approvals.filter(function(a){return a.status==='\u5dee\u623b\u3057';}).length;
  c.innerHTML='<div style="display:flex;gap:8px;margin-bottom:20px;">'+['\u5168\u3066','\u7533\u8acb\u4e2d','\u627f\u8a8d','\u5dee\u623b\u3057'].map(function(f,i){var a=i===0;return '<button style="padding:6px 16px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid '+(a?'#5B4FE8':'#e0e0e0')+';background:'+(a?'#5B4FE8':'#fff')+';color:'+(a?'#fff':'#888')+';">'+f+'</button>';}).join('')+'</div>';
  c.innerHTML+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;"><div style="background:#FEF3C7;border-radius:12px;padding:16px;text-align:center;"><div style="font-size:24px;font-weight:800;color:#F59E0B;">'+pend+'</div><div style="font-size:12px;color:#92400E;">\u7533\u8acb\u4e2d</div></div><div style="background:#D1FAE5;border-radius:12px;padding:16px;text-align:center;"><div style="font-size:24px;font-weight:800;color:#10B981;">'+appr+'</div><div style="font-size:12px;color:#065F46;">\u627f\u8a8d\u6e08</div></div><div style="background:#FEE2E2;border-radius:12px;padding:16px;text-align:center;"><div style="font-size:24px;font-weight:800;color:#EF4444;">'+rej+'</div><div style="font-size:12px;color:#991B1B;">\u5dee\u623b\u3057</div></div></div>';
  var t='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #f0f0f0;"><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7533\u8acb\u5185\u5bb9</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7a2e\u985e</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7533\u8acb\u8005</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u91d1\u984d</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u30b9\u30c6\u30fc\u30bf\u30b9</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u64cd\u4f5c</th></tr></thead><tbody>';
  STATE.approvals.forEach(function(a){var sc=a.status==='\u627f\u8a8d'?'#10B981':a.status==='\u5dee\u623b\u3057'?'#EF4444':'#F59E0B';t+='<tr style="border-bottom:1px solid #f5f5f7;"><td style="padding:12px 0;font-size:13px;color:#1a1a2e;font-weight:500;">'+a.title+'<br><span style="font-size:10px;color:#aaa;">'+a.date+'</span></td><td style="padding:12px 0;font-size:12px;color:#888;">'+a.type+'</td><td style="padding:12px 0;font-size:12px;color:#888;">'+a.requester+'</td><td style="padding:12px 0;font-size:12px;color:#555;font-weight:500;">'+a.amount+'</td><td style="padding:12px 0;text-align:center;"><span style="font-size:11px;padding:3px 10px;border-radius:6px;background:'+sc+'18;color:'+sc+';font-weight:600;">'+a.status+'</span></td><td style="padding:12px 0;text-align:center;">'+(a.status==='\u7533\u8acb\u4e2d'?'<button style="background:#10B981;color:#fff;border:none;padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer;margin-right:4px;">\u627f\u8a8d</button><button style="background:#EF4444;color:#fff;border:none;padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer;">\u5dee\u623b</button>':'<span style="font-size:11px;color:#aaa;">\u5b8c\u4e86</span>')+'</td></tr>';});
  t+='</tbody></table></div>';c.innerHTML+=t;
}

// ============ MODULE 6: ATTENDANCE ============
function renderAttendance(c,sub,act) {
  if(sub)sub.textContent='\u52e4\u6020\u8a18\u9332\u30fbBluetooth\u9023\u643a \u2014 \u30af\u30ed\u30c3\u30b7\u30aa\u30f3\u4ee3\u66ff';
  if(act)act.innerHTML='<button style="background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\u6253\u523b\u3059\u308b</button>';
  var w=STATE.attendance.filter(function(a){return a.status==='\u51fa\u52e4'||a.status==='\u4f11\u61a9'||a.status==='\u5916\u51fa';}).length;
  var ab=STATE.attendance.filter(function(a){return a.status==='\u672a\u51fa\u52e4';}).length;
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;"><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u51fa\u52e4\u4e2d</div><div style="font-size:28px;font-weight:800;color:#10B981;">'+w+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u672a\u51fa\u52e4</div><div style="font-size:28px;font-weight:800;color:#EF4444;">'+ab+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u4eca\u65e5</div><div style="font-size:18px;font-weight:800;color:#5B4FE8;">'+today()+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u73fe\u5728</div><div style="font-size:18px;font-weight:800;color:#F59E0B;">'+nowTime()+'</div></div></div>';
  var t='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u672c\u65e5\u306e\u52e4\u6020\u72b6\u6cc1</h3><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #f0f0f0;"><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u6c0f\u540d</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u5f79\u5272</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u30b9\u30c6\u30fc\u30bf\u30b9</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u51fa\u52e4</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u9000\u52e4</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u73fe\u5834</th></tr></thead><tbody>';
  STATE.attendance.forEach(function(a){var sc={'\u51fa\u52e4':'#10B981','\u4f11\u61a9':'#F59E0B','\u5916\u51fa':'#3B82F6','\u672a\u51fa\u52e4':'#EF4444'}[a.status]||'#888';t+='<tr style="border-bottom:1px solid #f5f5f7;"><td style="padding:12px 0;font-size:13px;font-weight:500;color:#1a1a2e;">'+a.name+'</td><td style="padding:12px 0;font-size:12px;color:#888;">'+a.role+'</td><td style="padding:12px 0;text-align:center;"><span style="font-size:11px;padding:3px 10px;border-radius:6px;background:'+sc+'18;color:'+sc+';font-weight:600;">'+a.status+'</span></td><td style="padding:12px 0;text-align:center;font-size:13px;color:#555;">'+a.clockIn+'</td><td style="padding:12px 0;text-align:center;font-size:13px;color:#555;">'+a.clockOut+'</td><td style="padding:12px 0;font-size:12px;color:#888;">'+a.site+'</td></tr>';});
  t+='</tbody></table></div>';c.innerHTML+=t;
}

// ============ MODULE 7: INVOICE ============
function renderInvoice(c,sub,act) {
  if(sub)sub.textContent='\u898b\u7a4d\u66f8\u30fb\u8acb\u6c42\u66f8\u30fb\u30a4\u30f3\u30dc\u30a4\u30b9\u5bfe\u5fdc \u2014 freee\u4ee3\u66ff';
  if(act)act.innerHTML='<div style="display:flex;gap:8px;"><button style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u898b\u7a4d\u66f8</button><button style="background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u8acb\u6c42\u66f8</button></div>';
  var tE=STATE.invoices.filter(function(i){return i.type==='\u898b\u7a4d\u66f8';}).reduce(function(s,i){return s+i.total;},0);
  var tI=STATE.invoices.filter(function(i){return i.type==='\u8acb\u6c42\u66f8';}).reduce(function(s,i){return s+i.total;},0);
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;"><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:11px;color:#888;">\u898b\u7a4d\u7dcf\u984d</div><div style="font-size:22px;font-weight:800;color:#5B4FE8;margin:4px 0;">'+fmtYen(tE)+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:11px;color:#888;">\u8acb\u6c42\u7dcf\u984d</div><div style="font-size:22px;font-weight:800;color:#10B981;margin:4px 0;">'+fmtYen(tI)+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:11px;color:#888;">\u30a4\u30f3\u30dc\u30a4\u30b9\u756a\u53f7</div><div style="font-size:16px;font-weight:800;color:#F59E0B;margin:4px 0;">T1234567890123</div><div style="font-size:10px;color:#888;">\u9069\u683c\u8acb\u6c42\u66f8\u767a\u884c\u4e8b\u696d\u8005</div></div></div>';
  var t='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #f0f0f0;"><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u756a\u53f7</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7a2e\u985e</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u53d6\u5f15\u5148</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u6848\u4ef6</th><th style="text-align:right;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7a0e\u8fbc\u5408\u8a08</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u72b6\u614b</th></tr></thead><tbody>';
  STATE.invoices.forEach(function(inv){var tc=inv.type==='\u898b\u7a4d\u66f8'?'#5B4FE8':'#10B981';var sc={'\u9001\u4ed8\u6e08':'#3B82F6','\u672a\u9001\u4ed8':'#F59E0B','\u627f\u8a8d\u6e08':'#10B981'}[inv.status]||'#888';t+='<tr style="border-bottom:1px solid #f5f5f7;"><td style="padding:12px 0;font-size:12px;color:#555;">'+inv.id+'</td><td style="padding:12px 0;"><span style="font-size:11px;padding:2px 8px;border-radius:4px;background:'+tc+'18;color:'+tc+';font-weight:600;">'+inv.type+'</span></td><td style="padding:12px 0;font-size:13px;color:#1a1a2e;">'+inv.client+'</td><td style="padding:12px 0;font-size:12px;color:#888;">'+inv.project+'</td><td style="padding:12px 0;font-size:13px;font-weight:600;color:#1a1a2e;text-align:right;">'+fmtYen(inv.total)+'</td><td style="padding:12px 0;text-align:center;"><span style="font-size:11px;padding:3px 10px;border-radius:6px;background:'+sc+'18;color:'+sc+';font-weight:600;">'+inv.status+'</span></td></tr>';});
  t+='</tbody></table></div>';c.innerHTML+=t;
}

// ============ MODULE 8: FINANCE ============
function renderFinance(c,sub,act) {
  if(sub)sub.textContent='\u5165\u51fa\u91d1\u8a18\u9332\u30fb\u96fb\u5b50\u5e33\u7c3f\u4fdd\u5b58\u6cd5\u5bfe\u5fdc \u2014 \u30de\u30cd\u30fc\u30d5\u30a9\u30ef\u30fc\u30c9\u4ee3\u66ff';
  if(act)act.innerHTML='<div style="display:flex;gap:8px;"><button style="background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u5165\u91d1</button><button style="background:linear-gradient(135deg,#EF4444,#DC2626);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u51fa\u91d1</button></div>';
  var tIn=STATE.transactions.filter(function(t){return t.type==='\u5165\u91d1';}).reduce(function(s,t){return s+t.amount;},0);
  var tOut=STATE.transactions.filter(function(t){return t.type==='\u51fa\u91d1';}).reduce(function(s,t){return s+Math.abs(t.amount);},0);
  var bal=STATE.transactions.length?STATE.transactions[0].balance:0;
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;"><div style="background:linear-gradient(135deg,#10B981,#059669);border-radius:12px;padding:20px;color:#fff;"><div style="font-size:12px;opacity:0.8;">\u5165\u91d1\u5408\u8a08</div><div style="font-size:26px;font-weight:800;margin:6px 0;">'+fmtYen(tIn)+'</div></div><div style="background:linear-gradient(135deg,#EF4444,#DC2626);border-radius:12px;padding:20px;color:#fff;"><div style="font-size:12px;opacity:0.8;">\u51fa\u91d1\u5408\u8a08</div><div style="font-size:26px;font-weight:800;margin:6px 0;">'+fmtYen(tOut)+'</div></div><div style="background:linear-gradient(135deg,#5B4FE8,#3B30B8);border-radius:12px;padding:20px;color:#fff;"><div style="font-size:12px;opacity:0.8;">\u6b8b\u9ad8</div><div style="font-size:26px;font-weight:800;margin:6px 0;">'+fmtYen(bal)+'</div></div></div>';
  var t='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">\u53d6\u5f15\u5c65\u6b74</h3><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:2px solid #f0f0f0;"><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u65e5\u4ed8</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u7a2e\u5225</th><th style="text-align:left;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u6458\u8981</th><th style="text-align:right;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u91d1\u984d</th><th style="text-align:right;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u6b8b\u9ad8</th><th style="text-align:center;padding:10px 0;font-size:12px;color:#888;font-weight:500;">\u9818\u53ce\u66f8</th></tr></thead><tbody>';
  STATE.transactions.forEach(function(tx){var tc=tx.type==='\u5165\u91d1'?'#10B981':'#EF4444';t+='<tr style="border-bottom:1px solid #f5f5f7;"><td style="padding:12px 0;font-size:12px;color:#555;">'+tx.date+'</td><td style="padding:12px 0;text-align:center;"><span style="font-size:11px;padding:2px 8px;border-radius:4px;background:'+tc+'18;color:'+tc+';font-weight:600;">'+tx.type+'</span></td><td style="padding:12px 0;font-size:13px;color:#1a1a2e;">'+tx.description+'</td><td style="padding:12px 0;font-size:13px;font-weight:600;text-align:right;color:'+tc+';">'+(tx.amount>0?'+':'')+fmtYen(tx.amount)+'</td><td style="padding:12px 0;font-size:13px;text-align:right;color:#555;">'+fmtYen(tx.balance)+'</td><td style="padding:12px 0;text-align:center;">'+(tx.receipt?'<span style="color:#10B981;">\u2713</span>':'<span style="color:#ccc;">-</span>')+'</td></tr>';});
  t+='</tbody></table></div>';c.innerHTML+=t;
}

// ============ MODULE 9: CARD ============
function renderCard(c,sub,act) {
  if(sub)sub.textContent='\u540d\u523a\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u30fb\u691c\u7d22\u30fb\u30bf\u30b0\u7ba1\u7406 \u2014 Sansan\u4ee3\u66ff';
  if(act)act.innerHTML='<div style="display:flex;gap:8px;"><button style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u540d\u523a\u767b\u9332</button><button style="background:#f0f0f0;color:#555;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;">\ud83d\udcf7 \u30b9\u30ad\u30e3\u30f3</button></div>';
  c.innerHTML='<div style="margin-bottom:20px;"><input placeholder="\u540d\u524d\u30fb\u4f1a\u793e\u540d\u30fb\u30bf\u30b0\u3067\u691c\u7d22..." style="width:100%;padding:12px 16px;border:1px solid #e0e0e0;border-radius:10px;font-size:14px;outline:none;box-sizing:border-box;background:#fff;" onfocus="this.style.borderColor=\'#5B4FE8\'" onblur="this.style.borderColor=\'#e0e0e0\'"></div>';
  c.innerHTML+='<div style="display:flex;gap:8px;margin-bottom:20px;">'+['\u5168\u3066','\u9867\u5ba2','\u5354\u529b\u4f1a\u793e','\u8077\u4eba'].map(function(t,i){var a=i===0;return '<button style="padding:6px 14px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid '+(a?'#5B4FE8':'#e0e0e0')+';background:'+(a?'#5B4FE8':'#fff')+';color:'+(a?'#fff':'#888')+';">'+t+'</button>';}).join('')+'</div>';
  var g='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">';
  STATE.cards.forEach(function(cd){var tc=cd.tag==='\u9867\u5ba2'?'#5B4FE8':cd.tag==='\u5354\u529b\u4f1a\u793e'?'#10B981':'#F59E0B';g+='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border-left:4px solid '+tc+';"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;"><div><div style="font-size:16px;font-weight:700;color:#1a1a2e;">'+cd.name+'</div><div style="font-size:12px;color:#888;margin-top:2px;">'+cd.company+'</div><div style="font-size:11px;color:#555;">'+cd.title+'</div></div><span style="font-size:10px;padding:2px 8px;border-radius:4px;background:'+tc+'18;color:'+tc+';font-weight:600;">'+cd.tag+'</span></div><div style="display:grid;grid-template-columns:auto 1fr;gap:4px 8px;font-size:12px;"><span style="color:#888;">TEL:</span><span style="color:#555;">'+cd.phone+'</span><span style="color:#888;">\u643a\u5e2f:</span><span style="color:#555;">'+cd.mobile+'</span><span style="color:#888;">Email:</span><span style="color:#5B4FE8;">'+cd.email+'</span><span style="color:#888;">\u4f4f\u6240:</span><span style="color:#555;">'+cd.address+'</span></div><div style="margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0;font-size:11px;color:#888;">'+cd.note+'</div></div>';});
  g+='</div>';c.innerHTML+=g;
}

// ============ MODULE 10: MATCHING ============
function renderMatching(c,sub,act) {
  if(sub)sub.textContent='\u6c42\u4eba\u30fb\u6848\u4ef6\u30de\u30c3\u30c1\u30f3\u30b0 \u2014 \u304f\u3089\u3057\u306e\u30de\u30fc\u30b1\u30c3\u30c8\u4ee3\u66ff';
  if(act)act.innerHTML='<button style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;">\uff0b \u65b0\u898f\u52df\u96c6</button>';
  var active=STATE.matchings.filter(function(m){return m.status==='\u52df\u96c6\u4e2d';}).length;
  var tApp=STATE.matchings.reduce(function(s,m){return s+m.applicants;},0);
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;"><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u52df\u96c6\u4e2d</div><div style="font-size:28px;font-weight:800;color:#5B4FE8;">'+active+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u5fdc\u52df\u8005\u6570</div><div style="font-size:28px;font-weight:800;color:#10B981;">'+tApp+'</div></div><div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;"><div style="font-size:11px;color:#888;">\u30de\u30c3\u30c1\u7387</div><div style="font-size:28px;font-weight:800;color:#F59E0B;">78%</div></div></div>';
  var l='<div style="display:grid;gap:16px;">';
  STATE.matchings.forEach(function(m){var tc=m.type==='\u6c42\u4eba'?'#5B4FE8':'#10B981';var sc=m.status==='\u52df\u96c6\u4e2d'?'#10B981':'#F59E0B';l+='<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;"><div><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span style="font-size:11px;padding:2px 8px;border-radius:4px;background:'+tc+'18;color:'+tc+';font-weight:600;">'+m.type+'</span><span style="font-size:11px;padding:2px 8px;border-radius:4px;background:'+sc+'18;color:'+sc+';font-weight:600;">'+m.status+'</span></div><div style="font-size:16px;font-weight:700;color:#1a1a2e;">'+m.title+'</div></div><span style="font-size:11px;color:#aaa;">'+m.posted+'</span></div><div style="display:flex;gap:24px;font-size:12px;color:#888;margin-bottom:12px;"><span>\ud83d\udccd '+m.area+'</span><span>\ud83c\udfd7\ufe0f '+m.category+'</span><span>\ud83d\udcb0 '+m.budget+'</span><span>\ud83d\udcc5 '+m.period+'</span></div><div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid #f0f0f0;"><div style="font-size:13px;color:#555;">\u5fdc\u52df: <span style="font-weight:700;color:#5B4FE8;">'+m.applicants+'\u4ef6</span></div><div style="display:flex;gap:8px;"><button style="background:#f0f0f0;color:#555;border:none;padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;">\u8a73\u7d30</button><button style="background:linear-gradient(135deg,#5B4FE8,#8B5CF6);color:#fff;border:none;padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;font-weight:600;">\u5fdc\u52df\u8005\u4e00\u89a7</button></div></div></div>';});
  l+='</div>';c.innerHTML+=l;
}

// ============ MAIN API ============
function switchTab(tabId){STATE.currentTab=tabId;saveState();buildSidebar();buildMainArea();}
window._hataraiku={switchTab:switchTab,getState:function(){return STATE;},toggleFlowMode:toggleFlowMode,openProject:openProject,sendChat:sendChat};
window.sw=function(page){var map={dash:'dash',proj:'project',flow:'project',chat:'chat',team:'matching',data:'folder',ai:'dash',log:'approval'};switchTab(map[page]||page);};

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
