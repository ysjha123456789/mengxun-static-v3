const params = new URLSearchParams(location.search);
const allowedViews = new Set(["sky", "record", "me"]);

const dreamStars = [
  {
    id: "anchor",
    type: "mine",
    title: "纸船飞过星星河",
    meta: "我的匹配依据",
    x: "49%",
    y: "62%",
    size: "20px",
    text: "我坐在一只纸船里，旁边有一只兔子。我们沿着星星河往前，水面下游过一条蓝色的鲸鱼。远处有月亮，我觉得很惊奇，也很平静。",
    tags: ["纸船", "兔子", "蓝鲸", "星河"]
  },
  {
    id: "whale",
    type: "similar",
    relation: "mutual",
    title: "云海中的蓝鲸",
    meta: "与我的梦很接近",
    x: "36%",
    y: "38%",
    size: "13px",
    text: "我站在云层上方，一条蓝色鲸鱼从雾里游过来。它没有发出声音，只在离我很近的地方停了一会儿。远处漂着一艘小船。",
    reason: "两段文字都提到蓝鲸、漂浮感和缓慢前行。",
    tags: ["蓝鲸", "云海", "漂浮"]
  },
  {
    id: "river",
    type: "similar",
    relation: "stranger",
    title: "没有尽头的星光河",
    meta: "与我的梦较接近",
    x: "61%",
    y: "39%",
    size: "11px",
    text: "我沿着发亮的河一直走，身边没有人，却总能听见另一双脚步。河面上的星星慢慢向远处聚拢。",
    reason: "两段文字都出现星河、同行感和没有明确终点的旅程。",
    tags: ["星河", "旅途", "脚步"]
  },
  {
    id: "friend-light",
    type: "friend",
    relation: "authorized",
    title: "雨后的玻璃花园",
    meta: "星灯授权给我",
    x: "73%",
    y: "61%",
    size: "13px",
    text: "雨停后，花园里的每片叶子都亮着很小的光。我沿着一条以前没见过的路往里走，尽头是一间透明的房子。",
    reason: "这是梦友星灯明确授权给你查看的梦。",
    tags: ["花园", "雨", "微光"]
  },
  {
    id: "city",
    type: "public",
    relation: "stranger",
    title: "倒悬楼群",
    meta: "今夜亮起的梦",
    x: "83%",
    y: "31%",
    size: "9px",
    text: "街道走到一半忽然折向天空，楼房在头顶倒悬，暖色窗灯映在像水一样的地面上。",
    tags: ["城市", "倒悬建筑", "惊奇"]
  },
  {
    id: "station",
    type: "public",
    relation: "stranger",
    title: "海面上的旧车站",
    meta: "匿名公开梦",
    x: "76%",
    y: "20%",
    size: "7px",
    text: "站台漂在海上，列车没有来，广播却一直读着小时候的地名。",
    tags: ["车站", "海面", "旧时光"]
  },
  {
    id: "tree-note",
    type: "treehole",
    relation: "treehole",
    title: "河对岸的人",
    meta: "匿名树洞纸条",
    x: "23%",
    y: "70%",
    size: "9px",
    text: "我梦见自己站在一条很长的河边。对岸有人挥手，但我看不清是谁。我没有难过，只是一直听着水声。",
    tags: ["河流", "远方", "模糊身影"]
  },
  { id: "distant-a", type: "public", distant: true, title: "雨中的温室", meta: "匿名公开梦", x: "15%", y: "30%", size: "5px", text: "温室里落着雨。", tags: ["雨"] },
  { id: "distant-b", type: "public", distant: true, title: "会移动的月亮", meta: "匿名公开梦", x: "89%", y: "70%", size: "5px", text: "月亮沿着屋檐缓慢移动。", tags: ["月亮"] }
];

const ownDreams = [
  { id: "own-paper", type: "own-private", title: "纸船飞过星星河", meta: "今天 · 仅自己可见", x: "28%", y: "45%", text: dreamStars[0].text, scope: "仅自己可见", tags: ["纸船", "兔子", "星河"] },
  { id: "own-cloud", type: "own-public", title: "云层后的月亮", meta: "9 月 17 日 · 匿名公开", x: "20%", y: "61%", text: "我一直追着一轮躲进云里的月亮，走到山顶时，它忽然落进了湖里。", scope: "匿名公开", tags: ["月亮", "云层", "湖"] },
  { id: "own-road", type: "own-private", title: "那条没有尽头的小路", meta: "9 月 12 日 · 参加匹配", x: "33%", y: "74%", text: "每走过一个转角，都会回到原来的地方。我没有着急，只想看看路的尽头是什么。", scope: "去标识化匹配", tags: ["小路", "循环"] }
];

const dreamFriends = [
  { id: "friend-lamp", type: "friend", title: "星灯", meta: "有一条新授权梦境", x: "70%", y: "43%", news: true, authorized: true, sharedTitle: "雨后的玻璃花园", sharedText: "雨停后，花园里的每片叶子都亮着很小的光。", connection: "从「云海中的蓝鲸」开始互相回应" },
  { id: "friend-shore", type: "friend", title: "远岸", meta: "梦友 · 尚未授权梦境", x: "79%", y: "62%", news: false, authorized: false, connection: "从「没有尽头的星光河」建立共鸣" },
  { id: "friend-boat", type: "friend", title: "纸舟", meta: "有一条新回声", x: "67%", y: "76%", news: true, authorized: true, sharedTitle: "海面上的旧车站", sharedText: "站台漂在海上，列车没有来。", connection: "互相点亮了 3 场梦" }
];

const state = {
  view: allowedViews.has(params.get("view")) ? params.get("view") : "sky",
  selectedStarId: null,
  selectedMeNode: null,
  shareOpen: false,
  shareChoice: "private",
  recordText: "我坐在一只纸船里，旁边有一只兔子。我们沿着星星河往前，水面下游过一条蓝色的鲸鱼。远处有月亮，我觉得很惊奇，也很平静。",
  relations: Object.fromEntries(dreamStars.filter((item) => item.relation).map((item) => [item.id, item.relation])),
  liked: new Set(),
  echoed: new Set(),
  readNodes: new Set(),
  deletedDreams: new Set(),
  withdrawnAuthorizations: new Set(),
  confirmDeleteId: null,
  published: null,
  toast: ""
};

const demo = params.get("demo");
if (demo === "mutual") state.selectedStarId = "whale";
if (demo === "stranger") state.selectedStarId = "river";
if (demo === "pending") { state.selectedStarId = "whale"; state.relations.whale = "pending"; }
if (demo === "share") { state.view = "record"; state.shareOpen = true; }
if (demo === "friend") { state.view = "me"; state.selectedMeNode = "friend-lamp"; }
if (demo === "own") { state.view = "me"; state.selectedMeNode = "own-paper"; }

const app = document.getElementById("app");
const liveRegion = document.getElementById("live-region");
let toastTimer = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(value, length = 92) {
  const text = String(value).trim();
  return text.length > length ? `${text.slice(0, length)}……` : text;
}

function announce(message) {
  liveRegion.textContent = "";
  requestAnimationFrame(() => { liveRegion.textContent = message; });
}

function showToast(message) {
  state.toast = message;
  announce(message);
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    state.toast = "";
    render();
  }, 2200);
}

function setView(view) {
  if (!allowedViews.has(view)) return;
  state.view = view;
  state.selectedStarId = null;
  state.selectedMeNode = null;
  state.shareOpen = false;
  state.confirmDeleteId = null;
  history.replaceState({}, "", `?view=${view}`);
  render();
}

function topbar() {
  const nav = [["sky", "星空"], ["record", "记梦"], ["me", "我的"]];
  const unread = dreamFriends.some((item) => item.news && !state.readNodes.has(item.id));
  return `<header class="topbar">
    <button class="brand" type="button" data-view="sky" aria-label="返回共鸣星空">
      <span class="brand-mark">✦</span><span><strong>梦寻</strong><small>让梦与梦相遇</small></span>
    </button>
    <nav class="primary-nav" aria-label="主导航">
      ${nav.map(([id, label]) => `<button type="button" class="nav-item ${state.view === id ? "active" : ""}" data-view="${id}" ${state.view === id ? 'aria-current="page"' : ""}>${label}</button>`).join("")}
    </nav>
    <button type="button" class="profile-button ${unread ? "has-news" : ""}" data-view="me" aria-label="打开个人星图">林</button>
  </header>`;
}

function skyLines() {
  return `<svg class="sky-lines" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="near-line" x1="0" x2="1"><stop stop-color="#bbd7e2" stop-opacity=".06"/><stop offset=".5" stop-color="#bbd7e2" stop-opacity=".5"/><stop offset="1" stop-color="#bbd7e2" stop-opacity=".08"/></linearGradient>
      <linearGradient id="friend-line" x1="0" x2="1"><stop stop-color="#edc86e" stop-opacity=".08"/><stop offset=".5" stop-color="#edc86e" stop-opacity=".68"/><stop offset="1" stop-color="#edc86e" stop-opacity=".18"/></linearGradient>
    </defs>
    <path d="M490 438 Q420 346 360 266" fill="none" stroke="url(#near-line)" stroke-width="1"/>
    <path d="M490 438 Q555 350 610 273" fill="none" stroke="url(#near-line)" stroke-width="1"/>
    <path d="M490 438 Q620 405 730 427" fill="none" stroke="url(#friend-line)" stroke-width="1.3"/>
  </svg>`;
}

function starButton(item) {
  const relation = state.relations[item.id];
  const relationCopy = relation === "authorized" ? "梦友授权" : item.meta;
  return `<button type="button" class="dream-star ${item.type} ${item.distant ? "distant" : ""} ${state.selectedStarId === item.id ? "selected" : ""}" style="--x:${item.x};--y:${item.y};--size:${item.size}" data-star="${item.id}" aria-label="打开梦境：${item.title}">
    <span class="star-label"><strong>${item.title}</strong>${relationCopy}</span>
  </button>`;
}

function publishedStar() {
  if (!state.published || state.published === "private") return "";
  const treehole = state.published === "treehole";
  return starButton({
    id: "new-dream",
    type: treehole ? "treehole" : "mine",
    title: treehole ? "刚放下的树洞纸条" : "刚放入星空的梦",
    meta: treehole ? "匿名树洞纸条" : "我的匿名公开梦",
    x: "54%",
    y: "73%",
    size: treehole ? "9px" : "14px",
    text: state.recordText,
    tags: ["纸船", "星河", "平静"]
  });
}

function skyView() {
  return `<main class="view" data-screen="sky">
    <section class="sky-canvas" aria-label="共鸣星空">
      <div class="scene-heading"><h1>今夜，也有人梦见这里</h1><p>靠近你的，是文字里有相似片段的梦。暖黄色的光，来自已经彼此授权的梦友。</p></div>
      <div class="tonight-label"><strong>今夜亮起的梦</strong>远处的星，是用户主动匿名公开的梦</div>
      ${skyLines()}
      ${dreamStars.map(starButton).join("")}
      ${publishedStar()}
      <div class="sky-legend"><span><i></i>相似梦境</span><span><i class="public-dot"></i>匿名公开梦</span><span><i class="friend-dot"></i>梦友授权梦</span></div>
      <p class="hint">点开一颗星，先读一小段梦。关系会在彼此回应后慢慢出现。</p>
      <button class="light-button sky-cta" type="button" data-view="record">记下刚醒来的梦</button>
    </section>
  </main>`;
}

function relationAction(item) {
  const relation = state.relations[item.id] || "stranger";
  if (item.type === "treehole" || item.id === "anchor" || item.id === "new-dream") return "";
  if (relation === "mutual") return `<button class="paper-button" type="button" data-action="connect" data-id="${item.id}">建立共鸣</button>`;
  if (relation === "pending") return `<button class="paper-button" type="button" disabled>等待对方回应</button>`;
  if (relation === "friend" || relation === "authorized") return `<button class="paper-button" type="button" data-view="me">查看梦友关系</button>`;
  return "";
}

function relationNote(item) {
  const relation = state.relations[item.id] || "stranger";
  if (item.type === "treehole") return `<div class="relationship-note">树洞纸条不会显示作者身份，也不能直接建立好友关系。</div>`;
  if (item.id === "anchor" || item.id === "new-dream") return `<div class="relationship-note">这是你的梦。其他人只能看到你主动公开的匿名版本。</div>`;
  const labels = [
    ["读到梦", true],
    ["彼此回应", ["mutual", "pending", "friend", "authorized"].includes(relation)],
    ["成为梦友", ["friend", "authorized"].includes(relation)],
    ["授权梦境", relation === "authorized"]
  ];
  return `<div class="relationship-note">关系会随着双方主动互动逐步展开，不提供实时聊天。
    <div class="relation-path">${labels.map(([label, done], index) => `${index ? "<b></b>" : ""}<span class="${done ? "done" : ""}">${label}</span>`).join("")}</div>
  </div>`;
}

function selectedStarData() {
  if (state.selectedStarId === "new-dream") {
    return {
      id: "new-dream",
      type: state.published === "treehole" ? "treehole" : "mine",
      title: state.published === "treehole" ? "刚放下的树洞纸条" : "刚放入星空的梦",
      meta: state.published === "treehole" ? "匿名树洞纸条" : "我的匿名公开梦",
      text: state.recordText,
      tags: ["纸船", "星河", "平静"]
    };
  }
  return dreamStars.find((item) => item.id === state.selectedStarId);
}

function dreamSheet() {
  const item = selectedStarData();
  if (!item) return "";
  const liked = state.liked.has(item.id);
  const echoed = state.echoed.has(item.id);
  const own = item.id === "anchor" || item.id === "new-dream";
  const kind = item.type === "similar" ? "与你相似的匿名梦" : item.type === "friend" ? "梦友授权给你的梦" : item.type === "treehole" ? "匿名树洞纸条" : own ? "我的梦" : "匿名公开梦";
  return `<div class="modal-layer" role="dialog" aria-modal="true" aria-label="梦境详情">
    <button type="button" class="modal-backdrop" data-action="close-overlay" aria-label="关闭梦境详情"></button>
    <aside class="dream-sheet">
      <button type="button" class="close-button" data-action="close-overlay" aria-label="关闭">×</button>
      <div class="sheet-kind">${kind} · 演示数据</div>
      <h2>${item.title}</h2>
      <p class="dream-copy">${escapeHtml(item.text)}</p>
      <div class="tag-row">${(item.tags || []).map((value) => `<span class="tag">${value}</span>`).join("")}</div>
      ${item.reason ? `<div class="similar-reason"><strong>为什么靠近你</strong><br>${item.reason}<br><small>只依据双方主动输入的文字。</small></div>` : ""}
      <div class="sheet-actions">
        ${own ? `<button class="paper-button" type="button" data-view="me">在个人星图中查看</button>` : `<button class="${liked ? "light-button" : "paper-button"}" type="button" data-action="light" data-id="${item.id}">${liked ? "已点亮" : "点亮"}</button><button class="paper-button" type="button" data-action="echo" data-id="${item.id}">${echoed ? "已留下回声" : "留下回声"}</button>${relationAction(item)}`}
      </div>
      ${relationNote(item)}
      ${!own ? `<details class="more-menu"><summary>更多</summary><div class="more-actions"><button type="button" data-action="report">举报这场梦</button><button type="button" data-action="block">不再看此用户</button></div></details>` : ""}
    </aside>
  </div>`;
}

function recordView() {
  const count = state.recordText.length;
  return `<main class="view record-view" data-screen="record">
    <section class="record-paper" aria-label="记梦纸页">
      <div class="record-top"><span class="private-mark">默认仅自己可见</span><span class="quiet-label">内容不会自动公开</span></div>
      <h1 class="record-title">把还记得的，写下来</h1>
      <p class="record-intro">不必完整，也不需要解释。先从一个颜色、一个人，或醒来时的感受开始。</p>
      <textarea id="dream-input" class="dream-textarea" maxlength="600" aria-label="输入梦境" placeholder="例如：我坐在一只纸船里，旁边有一只兔子……">${escapeHtml(state.recordText)}</textarea>
      <div class="record-tools">
        <div class="record-tools-left"><button class="voice-button" type="button" data-action="voice" aria-label="语音入口静态示例">◉</button><span class="voice-copy">也可以用语音讲述 · 当前为静态示例</span></div>
        <div class="record-tools-left"><span id="char-count" class="char-count">${count} / 600</span><button class="light-button" type="button" data-action="finish-record" ${count ? "" : "disabled"}>完成记录</button></div>
      </div>
      <div class="record-hint">系统只会在完成后提供少量可修改的关键词，<strong>不会替你解释这场梦。</strong></div>
    </section>
  </main>`;
}

function shareDialog() {
  if (!state.shareOpen) return "";
  const choiceCopy = {
    private: ["收藏到私人梦册", "仅自己可见，之后可以随时修改范围"],
    public: ["匿名放入共鸣星空", "进入文字相似匹配，也可能被其他人从远处发现"],
    treehole: ["匿名放下树洞纸条", "不显示身份，不用于建立梦友关系"]
  };
  return `<div class="modal-layer share-layer" role="dialog" aria-modal="true" aria-label="保存梦境">
    <button type="button" class="modal-backdrop" data-action="close-share" aria-label="关闭保存选择"></button>
    <section class="share-dialog">
      <button type="button" class="close-button" data-action="close-share" aria-label="关闭">×</button>
      <h2>这场梦，要留在哪里？</h2>
      <p>默认只收藏给自己。公开前会先展示匿名内容。</p>
      <div class="summary-preview"><span class="quiet-label">轻量整理示例 · 可修改</span><div class="tag-row" style="margin-top:9px"><span class="tag">纸船</span><span class="tag">星河</span><span class="tag">平静</span></div><p>${escapeHtml(truncate(state.recordText, 105))}</p></div>
      <div class="share-options">
        ${Object.entries(choiceCopy).map(([id, [title, copy]]) => `<button type="button" class="share-option ${state.shareChoice === id ? "selected" : ""}" data-share-choice="${id}"><span class="radio"></span><span><strong>${title}</strong><small>${copy}</small></span><em>${id === "private" ? "默认" : "需确认"}</em></button>`).join("")}
      </div>
      ${state.shareChoice !== "private" ? `<div class="similar-reason"><strong>匿名预览</strong><br>${escapeHtml(truncate(state.recordText, 130))}<br><small>不显示真实姓名、头像、联系方式或私人原始语音。</small></div>` : ""}
      <div class="dialog-actions"><button class="paper-button" type="button" data-action="close-share">继续修改</button><button class="light-button" type="button" data-action="save-dream">${choiceCopy[state.shareChoice][0]}</button></div>
    </section>
  </div>`;
}

function meLines() {
  return `<svg class="sky-lines" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="own-path" x1="0" x2="1"><stop stop-color="#bbd7e2" stop-opacity=".15"/><stop offset=".5" stop-color="#bbd7e2" stop-opacity=".50"/><stop offset="1" stop-color="#bbd7e2" stop-opacity=".12"/></linearGradient><linearGradient id="friend-path" x1="0" x2="1"><stop stop-color="#edc86e" stop-opacity=".12"/><stop offset=".5" stop-color="#edc86e" stop-opacity=".62"/><stop offset="1" stop-color="#edc86e" stop-opacity=".13"/></linearGradient></defs>
    <path d="M500 365 Q385 315 280 315 Q205 390 205 500 Q255 565 330 520" fill="none" stroke="url(#own-path)" stroke-width="1.2"/>
    <path d="M500 365 Q610 298 700 301 Q790 365 790 435 Q725 520 675 535" fill="none" stroke="url(#friend-path)" stroke-width="1.2"/>
  </svg>`;
}

function meNode(item) {
  if (state.deletedDreams.has(item.id)) return "";
  const isRead = state.readNodes.has(item.id);
  return `<button type="button" class="map-node ${item.type}" style="--x:${item.x};--y:${item.y}" data-me-node="${item.target || item.id}" aria-label="打开${item.type === "friend" ? "梦友" : "梦境"}：${item.title}">
    ${item.news && !isRead ? '<i class="news-badge"></i>' : ""}
    <span class="node-label"><strong>${item.title}</strong>${item.meta}</span>
  </button>`;
}

function meView() {
  const privateNew = state.published === "private" ? [{ id: "own-new", type: "own-private", title: "刚收藏的梦", meta: "刚刚 · 仅自己可见", x: "39%", y: "31%", text: state.recordText, scope: "仅自己可见", tags: ["纸船", "星河"] }] : [];
  const outboundShared = state.withdrawnAuthorizations.has("friend-lamp") ? [] : [{ id: "shared-cloud", target: "own-cloud", type: "shared-outbound", title: "云层后的月亮", meta: "已授权给星灯", x: "60%", y: "37%" }];
  return `<main class="view" data-screen="me">
    <section class="me-canvas" aria-label="个人星图">
      <div class="me-heading"><h1>我的星图</h1><p>左边收藏梦境，右边保存关系。每一道光都来自明确的回应或授权。</p></div>
      <button class="ghost-button inbox-button compact" type="button" data-me-node="inbox">星光信箱 <b>1</b></button>
      <div class="map-group-label own-label"><strong>我的梦境轨迹</strong>私人、匹配与公开范围都由我控制</div>
      <div class="map-group-label friend-label"><strong>梦友关系</strong>回应、共鸣与授权逐渐展开</div>
      ${meLines()}
      <div class="self-star"><span class="self-core">林</span><strong>林间</strong><small>18 场梦 · 3 位梦友</small></div>
      ${[...ownDreams, ...privateNew, ...dreamFriends, ...outboundShared].map(meNode).join("")}
      <div class="me-legend"><span>左侧：自己的梦册</span><span>右侧：梦友与授权</span><span>发光圆点：有新的回应</span></div>
    </section>
  </main>`;
}

function ownDreamSheet(item) {
  const confirming = state.confirmDeleteId === item.id;
  return `<div class="modal-layer" role="dialog" aria-modal="true" aria-label="我的梦境详情"><button type="button" class="modal-backdrop" data-action="close-overlay" aria-label="关闭"></button><aside class="dream-sheet">
    <button type="button" class="close-button" data-action="close-overlay" aria-label="关闭">×</button>
    <div class="sheet-kind">我的梦境 · ${item.scope}</div><h2>${item.title}</h2><p class="dream-copy">${escapeHtml(item.text)}</p>
    <div class="tag-row">${item.tags.map((value) => `<span class="tag">${value}</span>`).join("")}</div>
    <div class="permission-row"><span><strong>当前范围</strong><small>${item.scope}</small></span><button class="paper-button compact" type="button" data-action="manage-permission">修改</button></div>
    <div class="sheet-actions"><button class="paper-button" type="button" data-action="export">导出这场梦</button><button class="danger-button" type="button" data-action="ask-delete" data-id="${item.id}">删除</button></div>
    ${confirming ? `<div class="confirm-panel"><h3>删除这场梦？</h3><p>删除后进入最近删除，30 天内可以恢复。</p><div class="sheet-actions"><button class="danger-button compact" type="button" data-action="confirm-delete" data-id="${item.id}">确认删除</button><button class="paper-button compact" type="button" data-action="cancel-delete">取消</button></div></div>` : ""}
  </aside></div>`;
}

function friendSheet(item) {
  const isSharing = !state.withdrawnAuthorizations.has(item.id);
  return `<div class="modal-layer" role="dialog" aria-modal="true" aria-label="梦友关系"><button type="button" class="modal-backdrop" data-action="close-overlay" aria-label="关闭"></button><aside class="dream-sheet">
    <button type="button" class="close-button" data-action="close-overlay" aria-label="关闭">×</button>
    <div class="sheet-kind">梦友关系 · 双方已同意</div><h2>${item.title}</h2>
    <div class="similar-reason"><strong>你们如何相遇</strong><br>${item.connection}</div>
    <div class="relation-path"><span class="done">彼此回应</span><b></b><span class="done">成为梦友</span><b></b><span class="${item.authorized ? "done" : ""}">授权梦境</span></div>
    ${item.authorized ? `<div class="info-block"><h3>${item.sharedTitle}</h3><p>${item.sharedText}</p><div class="tag-row" style="margin-top:10px"><span class="tag">对方主动授权</span><span class="tag">仅梦友可见</span></div></div>` : `<div class="info-block"><h3>暂时没有授权内容</h3><p>成为梦友不会自动开放私人梦境。等对方主动授权后，梦才会出现在这里。</p></div>`}
    <div class="permission-row"><span><strong>${isSharing ? `我分享给 ${item.title}` : `我暂未分享给 ${item.title}`}</strong><small>${isSharing ? "「云层后的月亮」会作为授权星点显示" : "撤回后，关系星图中的授权梦星点已消失"}</small></span><button class="paper-button compact" type="button" data-action="toggle-outbound-share" data-id="${item.id}">${isSharing ? "撤回授权" : "重新授权"}</button></div>
    <div class="relationship-note">梦友关系不包含实时聊天。双方仍分别控制每一场梦的可见范围。</div>
  </aside></div>`;
}

function inboxSheet() {
  return `<div class="modal-layer" role="dialog" aria-modal="true" aria-label="星光信箱"><button type="button" class="modal-backdrop" data-action="close-overlay" aria-label="关闭"></button><aside class="dream-sheet">
    <button type="button" class="close-button" data-action="close-overlay" aria-label="关闭">×</button><div class="sheet-kind">系统消息</div><h2>星光信箱</h2>
    <div class="info-block"><h3>匿名梦境已通过审核</h3><p>「云层后的月亮」现在已在共鸣星空中可见。</p></div>
    <div class="info-block"><h3>导出已准备好</h3><p>你导出的私人梦册包含原文、时间、关键词和权限说明。</p></div>
    <div class="relationship-note">梦友回应会附着在对应梦友或梦境星点上，不会堆进系统信箱。</div>
  </aside></div>`;
}

function meSheet() {
  if (!state.selectedMeNode) return "";
  if (state.selectedMeNode === "inbox") return inboxSheet();
  const own = [...ownDreams, ...(state.published === "private" ? [{ id: "own-new", type: "own-private", title: "刚收藏的梦", meta: "刚刚 · 仅自己可见", x: "39%", y: "31%", text: state.recordText, scope: "仅自己可见", tags: ["纸船", "星河"] }] : [])].find((item) => item.id === state.selectedMeNode);
  if (own) return ownDreamSheet(own);
  const friend = dreamFriends.find((item) => item.id === state.selectedMeNode);
  return friend ? friendSheet(friend) : "";
}

function render() {
  document.title = `梦寻 · ${state.view === "sky" ? "共鸣星空" : state.view === "record" ? "记梦" : "个人星图"} · 精简静态原型`;
  const view = state.view === "sky" ? skyView() : state.view === "record" ? recordView() : meView();
  app.innerHTML = `<div class="app-shell">${topbar()}${view}${state.view === "sky" ? dreamSheet() : ""}${state.view === "record" ? shareDialog() : ""}${state.view === "me" ? meSheet() : ""}${state.toast ? `<div class="toast" role="status">${state.toast}</div>` : ""}</div>`;
  bindEvents();
}

function focusDialog() {
  requestAnimationFrame(() => {
    const dialog = app.querySelector(".modal-layer");
    (dialog?.querySelector(".close-button") || dialog?.querySelector("button"))?.focus();
  });
}

function bindEvents() {
  app.querySelectorAll("[data-view]").forEach((element) => element.addEventListener("click", () => setView(element.dataset.view)));
  app.querySelectorAll("[data-star]").forEach((element) => element.addEventListener("click", () => {
    state.selectedStarId = element.dataset.star;
    render();
    focusDialog();
  }));
  app.querySelectorAll("[data-me-node]").forEach((element) => element.addEventListener("click", () => {
    state.selectedMeNode = element.dataset.meNode;
    state.readNodes.add(element.dataset.meNode);
    state.confirmDeleteId = null;
    render();
    focusDialog();
  }));
  app.querySelectorAll("[data-share-choice]").forEach((element) => element.addEventListener("click", () => {
    state.shareChoice = element.dataset.shareChoice;
    render();
    focusDialog();
  }));
  app.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", () => handleAction(element.dataset.action, element.dataset.id)));
  const input = document.getElementById("dream-input");
  if (input) {
    input.addEventListener("input", () => {
      state.recordText = input.value;
      const count = document.getElementById("char-count");
      if (count) count.textContent = `${input.value.length} / 600`;
      const finish = app.querySelector('[data-action="finish-record"]');
      if (finish) finish.disabled = !input.value.trim();
    });
  }
}

function handleAction(action, id) {
  if (action === "close-overlay") {
    state.selectedStarId = null;
    state.selectedMeNode = null;
    state.confirmDeleteId = null;
    render();
    return;
  }
  if (action === "finish-record") {
    if (!state.recordText.trim()) return;
    state.shareOpen = true;
    state.shareChoice = "private";
    render();
    focusDialog();
    return;
  }
  if (action === "close-share") {
    state.shareOpen = false;
    render();
    return;
  }
  if (action === "save-dream") {
    state.published = state.shareChoice;
    state.shareOpen = false;
    if (state.shareChoice === "private") {
      state.view = "me";
      history.replaceState({}, "", "?view=me");
      state.toast = "已收藏到私人梦册";
    } else {
      state.view = "sky";
      state.selectedStarId = "new-dream";
      history.replaceState({}, "", "?view=sky");
      state.toast = state.shareChoice === "treehole" ? "树洞纸条已进入匿名审核示例" : "匿名梦已放入共鸣星空";
    }
    announce(state.toast);
    render();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { state.toast = ""; render(); }, 2200);
    return;
  }
  if (action === "light") {
    state.liked.has(id) ? state.liked.delete(id) : state.liked.add(id);
    showToast(state.liked.has(id) ? "已点亮这场梦" : "已取消点亮");
    return;
  }
  if (action === "echo") {
    state.echoed.add(id);
    showToast("回声已留下；对方回应后，关系会继续展开");
    return;
  }
  if (action === "connect") {
    state.relations[id] = "pending";
    showToast("共鸣邀请已发出，等待对方回应");
    return;
  }
  if (action === "voice") {
    showToast("语音入口为静态示例，本轮不调用麦克风");
    return;
  }
  if (action === "report") {
    state.selectedStarId = null;
    showToast("举报已记录为演示状态，内容暂时隐藏");
    return;
  }
  if (action === "block") {
    state.selectedStarId = null;
    showToast("已隐藏该用户的公开梦境示例");
    return;
  }
  if (action === "manage-permission") {
    showToast("权限管理示例：每场梦都需单独授权");
    return;
  }
  if (action === "toggle-outbound-share") {
    if (state.withdrawnAuthorizations.has(id)) {
      state.withdrawnAuthorizations.delete(id);
      showToast("已重新授权，这场梦回到关系星图");
    } else {
      state.withdrawnAuthorizations.add(id);
      showToast("授权已撤回，对应梦星点已从关系星图消失");
    }
    return;
  }
  if (action === "export") {
    showToast("导出完成示例：包含原文、时间与权限说明");
    return;
  }
  if (action === "ask-delete") {
    state.confirmDeleteId = id;
    render();
    focusDialog();
    return;
  }
  if (action === "cancel-delete") {
    state.confirmDeleteId = null;
    render();
    return;
  }
  if (action === "confirm-delete") {
    state.deletedDreams.add(id);
    state.selectedMeNode = null;
    state.confirmDeleteId = null;
    showToast("梦境已移入最近删除，30 天内可恢复");
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (state.shareOpen) state.shareOpen = false;
  else if (state.selectedStarId) state.selectedStarId = null;
  else if (state.selectedMeNode) state.selectedMeNode = null;
  else return;
  state.confirmDeleteId = null;
  render();
});

window.addEventListener("popstate", () => {
  const next = new URLSearchParams(location.search).get("view");
  state.view = allowedViews.has(next) ? next : "sky";
  state.selectedStarId = null;
  state.selectedMeNode = null;
  state.shareOpen = false;
  render();
});

render();
