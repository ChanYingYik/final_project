(() => {
  "use strict";

  const PAGE = document.documentElement.dataset.page || "explore";
  const CATEGORY_ORDER = ["condensation", "explicitation", "transposition", "congruence"];
  const REALIZATION_ORDER = ["compact", "balanced", "expanded"];
  const REGISTER_ORDER = ["cantonese_colloquial", "mixed_register", "written_chinese"];
  const REVIEW_KEY = "nv-human-checks-v1";
  const PAGE_SIZE = 12;

  const I18N = {
    en: {
      "brand.subtitle": "Spider-Man subtitle explorer",
      "nav.explore": "Explore",
      "nav.report": "Learning report",
      "nav.codebook": "Codebook",
      "nav.review": "Quality check",
      "nav.ai": "AI use",
      "a11y.skip": "Skip to content",
      "home.eyebrow": "Spider-Man: Brand New Day · 502 subtitle pairs",
      "home.title": "Every line arrives twice.",
      "home.lede": "Compare 502 English-Cantonese subtitle cues from Spider-Man: Brand New Day, then follow compaction, explicitation, structural change and dialogue function across linked views.",
      "home.start": "Explore the corpus",
      "home.read": "Read the research",
      "home.questionLabel": "Research question",
      "home.question": "Which visible translation profiles recur across the supplied subtitle pairs?",
      "home.theory": "The analysis combines condensation, explicitation and transposition with dialogue function and length as explicit controls.",
      "stat.entries": "short cue pairs",
      "stat.terms": "dialogue functions",
      "stat.checked": "human checked",
      "home.sourceLabel": "Spider-Man source",
      "home.source": "Spider-Man: Brand New Day · 502 unique English-Cantonese subtitle pairs extracted from the supplied workbook.",
      "home.sourceDetails": "Read provenance and limitations",
      "quality.title": "Verification needed",
      "quality.body": "The seeded 50-entry review is complete. Continue checking further entries on the quality check page.",
      "quality.action": "Start 50-entry review",
      "explore.eyebrow": "Interactive corpus",
      "explore.title": "Follow a pattern across every view.",
      "explore.intro": "Search, filter and click any term. The charts and table update together, and the current view is kept in the URL.",
      "filter.search": "Search English, Chinese or feature",
      "filter.searchPlaceholder": "e.g. statement, 咩, expanded",
      "filter.category": "Translation profile",
      "filter.allCategories": "All categories",
      "filter.checked": "Human checked",
      "filter.allStatuses": "All statuses",
      "filter.yes": "Yes",
      "filter.no": "No",
      "filter.realization": "Length band",
      "filter.allPositions": "All length bands",
      "filter.register": "Chinese register",
      "filter.allRegisters": "All registers",
      "filter.reset": "Reset",
      "filter.copy": "Copy view link",
      "category.condensation": "Condensation",
      "category.explicitation": "Explicitation",
      "category.transposition": "Transposition",
      "category.congruence": "Congruence",
      "realization.compact": "Compact",
      "realization.balanced": "Balanced",
      "realization.expanded": "Expanded",
      "register.cantonese_colloquial": "Cantonese colloquial",
      "register.mixed_register": "Mixed register",
      "register.written_chinese": "Written Chinese",
      "function.statement": "Statement",
      "function.question": "Question",
      "function.command": "Command",
      "function.reaction": "Reaction",
      "results.matching": "matching cue pairs",
      "chart.relational": "Relational",
      "chart.hierarchical": "Hierarchical",
      "chart.distributional": "Distributional",
      "network.title": "Dialogue function network",
      "network.caption": "Which dialogue functions recur in each translation profile?",
      "network.top": "Top dialogue functions",
      "network.weight": "Minimum link weight",
      "network.resetZoom": "Reset",
      "network.help": "Drag the background to pan, scroll to zoom, drag nodes to arrange them, and double-click a node to pin it. Select a label to search it.",
      "treemap.title": "Profile × length band",
      "treemap.caption": "How are the four translation profiles distributed across compact, balanced and expanded target lengths?",
      "treemap.help": "Select a rectangle to apply its profile and length-band filters.",
      "heatmap.title": "Dialogue function by profile",
      "heatmap.caption": "Which English line functions concentrate in each translation profile?",
      "heatmap.help": "Select a populated cell to combine its profile and dialogue-function filters.",
      "registerChart.title": "Cantonese colloquial and written Chinese",
      "registerChart.caption": "How do Cantonese lexical markers and written-Chinese forms distribute across the corpus?",
      "registerChart.help": "Select a register to filter the corpus. This is a text-based lexical measure, not an audio judgment.",
      "table.title": "Corpus data",
      "table.caption": "Sort the current result set, inspect every field, or export it as CSV.",
      "table.export": "Export filtered CSV",
      "table.source": "English source",
      "table.target": "Cantonese subtitle",
      "table.term": "Dialogue function",
      "table.category": "Translation profile",
      "table.position": "Length band",
      "table.register": "Register",
      "table.checked": "Checked",
      "table.previous": "Previous",
      "table.next": "Next",
      "footer.project": "Spider-Man: Brand New Day corpus · Translation Technology final project",
      "footer.note": "A static bilingual subtitle explorer with no tracking.",
      "warning.label": "Content note",
      "warning.body": "Spider-Man: Brand New Day dialogue excerpts may include profanity, violence and mature themes.",
      "toast.copied": "View link copied.",
      "toast.reset": "Filters reset.",
      "toast.empty": "No entries match this view.",
      "page.of": "Page {page} of {pages}",
      "page.none": "No pages",
      "term.selected": "Searching: {term}",
      "review.checked": "checked / 50",
      "review.errors": "need correction",
      "review.remaining": "remaining",
      "review.export": "Export review results",
      "review.reset": "Reset local review",
      "detail.title": "Entry details",
      "detail.open": "View details",
      "detail.close": "Close entry details",
      "detail.why": "Why this profile",
      "detail.source": "Source",
      "detail.previous": "Previous entry",
      "detail.next": "Next entry",
      "detail.copy": "Copy entry link",
      "detail.copied": "Entry link copied.",
      "detail.markersEmpty": "None detected",
    },
    zh: {
      "brand.subtitle": "蜘蛛俠字幕探索器",
      "nav.explore": "探索語料",
      "nav.report": "學習報告",
      "nav.codebook": "編碼簿",
      "nav.review": "品質檢查",
      "nav.ai": "AI 使用",
      "a11y.skip": "跳至內容",
      "home.eyebrow": "《蜘蛛俠：全新的一天》· 五百零二組字幕",
      "home.title": "每句對白，都經歷兩次抵達。",
      "home.lede": "對照《蜘蛛俠：全新的一天》五百零二組英粵字幕，並沿著互相連動的圖表追蹤壓縮、明示、結構轉換與對白功能。",
      "home.start": "開始探索",
      "home.read": "閱讀研究報告",
      "home.questionLabel": "研究問題",
      "home.question": "提供的字幕句對中，哪些可見的翻譯剖面最常出現？",
      "home.theory": "本分析結合壓縮、明示與詞性轉換，並以對白功能及譯文長度作為明確控制項。",
      "stat.entries": "短句對",
      "stat.terms": "對白功能",
      "stat.checked": "人工核對",
      "home.sourceLabel": "蜘蛛俠字幕來源",
      "home.source": "《蜘蛛俠：全新的一天》· 從提供的 Excel 抽出五百零二組完整且不重複的英粵字幕句對。",
      "home.sourceDetails": "查看來源與限制",
      "quality.title": "仍需人工核對",
      "quality.body": "固定種子的五十筆核對已完成。你可在品質檢查頁繼續檢查更多資料。",
      "quality.action": "開始五十筆審核",
      "explore.eyebrow": "互動語料",
      "explore.title": "讓每個圖表一起說故事。",
      "explore.intro": "使用搜尋與篩選，或點擊圖表中的詞語。所有圖表與資料表會同步更新，目前檢視也會保存在網址中。",
      "filter.search": "搜尋英文、中文或分析特徵",
      "filter.searchPlaceholder": "例如 statement、咩、expanded",
      "filter.category": "翻譯剖面",
      "filter.allCategories": "全部類別",
      "filter.checked": "人工核對",
      "filter.allStatuses": "全部狀態",
      "filter.yes": "是",
      "filter.no": "否",
      "filter.realization": "長度區間",
      "filter.allPositions": "全部長度區間",
      "filter.register": "中文語域",
      "filter.allRegisters": "全部語域",
      "filter.reset": "重設",
      "filter.copy": "複製檢視連結",
      "category.condensation": "壓縮",
      "category.explicitation": "明示",
      "category.transposition": "轉換",
      "category.congruence": "對應",
      "realization.compact": "精簡",
      "realization.balanced": "均衡",
      "realization.expanded": "擴展",
      "register.cantonese_colloquial": "粵語口語",
      "register.mixed_register": "混合語域",
      "register.written_chinese": "書面中文",
      "function.statement": "陳述",
      "function.question": "提問",
      "function.command": "指令",
      "function.reaction": "短促反應",
      "results.matching": "筆符合的短句對",
      "chart.relational": "關聯",
      "chart.hierarchical": "層級",
      "chart.distributional": "分佈",
      "network.title": "對白功能網絡",
      "network.caption": "哪些對白功能常出現在各翻譯剖面中？",
      "network.top": "顯示對白功能",
      "network.weight": "最小連線權重",
      "network.resetZoom": "重設",
      "network.help": "拖曳背景可平移，滾輪可縮放，拖曳節點可調整位置，雙擊節點可固定。點擊詞語即可搜尋。",
      "treemap.title": "剖面 × 長度區間",
      "treemap.caption": "四種翻譯剖面如何在精簡、均衡及擴展的譯文長度中分佈？",
      "treemap.help": "點擊方格，同時套用該剖面與長度區間篩選。",
      "heatmap.title": "對白功能與翻譯剖面",
      "heatmap.caption": "哪些英文對白功能集中於各翻譯剖面？",
      "heatmap.help": "點擊有數字的方格，同時套用剖面與對白功能搜尋。",
      "registerChart.title": "粵語口語與書面中文",
      "registerChart.caption": "粵語詞彙標記與書面中文句式在語料中如何分佈？",
      "registerChart.help": "點擊語域可篩選語料。這是文字標記分析，不是語音判斷。",
      "table.title": "語料資料",
      "table.caption": "排序目前結果、檢視完整欄位，或匯出 CSV。",
      "table.export": "匯出目前結果",
      "table.source": "英文原文",
      "table.target": "粵語字幕",
      "table.term": "對白功能",
      "table.category": "翻譯剖面",
      "table.position": "長度區間",
      "table.register": "語域",
      "table.checked": "核對",
      "table.previous": "上一頁",
      "table.next": "下一頁",
      "footer.project": "《蜘蛛俠：全新的一天》語料 · 翻譯科技期末專題",
      "footer.note": "不含追蹤功能的靜態雙語字幕探索網站。",
      "warning.label": "內容提示",
      "warning.body": "《蜘蛛俠：全新的一天》字幕摘錄可能包含粗俗語言、暴力及成人主題。",
      "toast.copied": "已複製檢視連結。",
      "toast.reset": "已重設篩選。",
      "toast.empty": "目前檢視沒有符合資料。",
      "page.of": "第 {page} 頁，共 {pages} 頁",
      "page.none": "沒有頁面",
      "term.selected": "搜尋：{term}",
      "review.checked": "已核對／50",
      "review.errors": "需要修正",
      "review.remaining": "尚待核對",
      "review.export": "匯出核對結果",
      "review.reset": "清除本機核對紀錄",
      "detail.title": "詞條詳情",
      "detail.open": "查看詳情",
      "detail.close": "關閉詞條詳情",
      "detail.why": "為何歸入此類",
      "detail.source": "來源",
      "detail.previous": "上一筆",
      "detail.next": "下一筆",
      "detail.copy": "複製詞條連結",
      "detail.copied": "已複製詞條連結。",
      "detail.markersEmpty": "未偵測到",
    },
  };

  const PAGE_TITLES = {
    explore: {
      en: "S-Web of Words | Spider-Man: Brand New Day Subtitle Explorer",
      zh: "S-Web of Words｜《蜘蛛俠：全新的一天》字幕探索器",
    },
    report: {
      en: "Learning Report | S-Web of Words",
      zh: "學習報告｜S-Web of Words",
    },
    codebook: {
      en: "Codebook | S-Web of Words",
      zh: "編碼簿｜S-Web of Words",
    },
    review: {
      en: "Quality Check | S-Web of Words",
      zh: "品質檢查｜S-Web of Words",
    },
    about: {
      en: "AI Use & Data Notes | S-Web of Words",
      zh: "AI 使用與資料說明｜S-Web of Words",
    },
  };

  const DEFAULT_STATE = {
    lang: "en",
    q: "",
    category: "all",
    checked: "all",
    realization: "all",
    register: "all",
    entry: null,
    top: 12,
    weight: 1,
    sort: "id",
    dir: "asc",
    page: 1,
  };

  const state = { ...DEFAULT_STATE };
  let corpus = { meta: {}, entries: [] };
  let filteredRows = [];
  let reviewOverrides = readReviewOverrides();
  let networkView = {
    scale: 1,
    tx: 0,
    ty: 0,
    positions: new Map(),
    pinned: new Set(),
  };
  let toastTimer;
  let entryTrigger = null;

  function t(key, values = {}) {
    const language = state.lang === "zh" ? "zh" : "en";
    let text = I18N[language][key] || I18N.en[key] || key;
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
    return text;
  }

  function escapeCsv(value) {
    const string = String(value ?? "");
    return `"${string.replaceAll('"', '""')}"`;
  }

  function categoryLabel(category) {
    return t(`category.${category}`);
  }

  function realizationLabel(realization) {
    return t(`realization.${realization}`);
  }

  function registerLabel(register) {
    return t(`register.${register}`);
  }

  function functionLabel(feature) {
    return t(`function.${feature}`);
  }

  function readReviewOverrides() {
    try {
      const value = JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function persistReviewOverrides() {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewOverrides));
  }

  function checkedStatus(entry) {
    return reviewOverrides[entry.id] ?? entry.human_checked;
  }

  function entriesWithReviewStatus() {
    return corpus.entries.map((entry) => ({
      ...entry,
      human_checked: checkedStatus(entry),
    }));
  }

  function currentCheckedCount() {
    return corpus.entries.filter((entry) => checkedStatus(entry) === "yes").length;
  }

  function readStateFromUrl() {
    const params = new URLSearchParams(location.search);
    const storedLanguage = localStorage.getItem("nv-language") || "en";
    state.lang = params.get("lang") === "zh" || params.get("lang") === "zh-Hant"
      ? "zh"
      : params.get("lang") === "en"
        ? "en"
        : storedLanguage === "zh"
          ? "zh"
          : "en";
    state.q = params.get("q") || "";
    state.category = CATEGORY_ORDER.includes(params.get("category"))
      ? params.get("category")
      : "all";
    state.checked = ["yes", "no"].includes(params.get("checked"))
      ? params.get("checked")
      : "all";
    state.realization = REALIZATION_ORDER.includes(params.get("realization"))
      ? params.get("realization")
      : "all";
    state.register = REGISTER_ORDER.includes(params.get("register"))
      ? params.get("register")
      : "all";
    state.entry = Number(params.get("entry")) || null;
    state.top = clamp(Number(params.get("top")) || 12, 6, 20);
    state.weight = clamp(Number(params.get("weight")) || 1, 1, 8);
    state.sort = [
      "id",
      "source_text",
      "target_text",
      "key_term",
      "category",
      "realization",
      "language_register",
      "human_checked",
    ].includes(params.get("sort"))
      ? params.get("sort")
      : "id";
    state.dir = params.get("dir") === "desc" ? "desc" : "asc";
    state.page = Math.max(1, Number(params.get("page")) || 1);
  }

  function writeStateToUrl() {
    const params = new URLSearchParams();
    if (state.lang !== "en") params.set("lang", state.lang);
    if (state.q) params.set("q", state.q);
    if (state.category !== "all") params.set("category", state.category);
    if (state.checked !== "all") params.set("checked", state.checked);
    if (state.realization !== "all") params.set("realization", state.realization);
    if (state.register !== "all") params.set("register", state.register);
    if (state.entry) params.set("entry", String(state.entry));
    if (state.top !== DEFAULT_STATE.top) params.set("top", String(state.top));
    if (state.weight !== DEFAULT_STATE.weight) params.set("weight", String(state.weight));
    if (state.sort !== DEFAULT_STATE.sort) params.set("sort", state.sort);
    if (state.dir !== DEFAULT_STATE.dir) params.set("dir", state.dir);
    if (state.page !== 1) params.set("page", String(state.page));
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }

  function applyLanguage() {
    const htmlLang = state.lang === "zh" ? "zh-Hant" : "en";
    document.documentElement.lang = htmlLang;
    document.title = PAGE_TITLES[PAGE]?.[state.lang] || document.title;
    localStorage.setItem("nv-language", state.lang);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-lang-label]").forEach((node) => {
      node.classList.toggle("active", node.dataset.langLabel === state.lang);
    });
    const languageButton = document.querySelector("#language-switch");
    if (languageButton) {
      languageButton.setAttribute(
        "aria-label",
        state.lang === "en" ? "切換至繁體中文" : "Switch to English",
      );
    }
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function contains(entry, query) {
    if (!query) return true;
    const haystack = [
      entry.id,
      entry.source_text,
      entry.target_text,
      entry.key_term,
      entry.target_verb,
      entry.source_cue_ids,
      entry.target_cue_id,
      entry.category,
      entry.realization,
      entry.length_ratio,
      entry.language_register,
      entry.cantonese_markers,
      entry.written_chinese_markers,
    ].join(" ").toLocaleLowerCase();
    return haystack.includes(query.toLocaleLowerCase());
  }

  function applyFilters() {
    filteredRows = entriesWithReviewStatus().filter((entry) => {
      if (!contains(entry, state.q)) return false;
      if (state.category !== "all" && entry.category !== state.category) return false;
      if (state.checked !== "all" && entry.human_checked !== state.checked) return false;
      if (
        state.realization !== "all"
        && entry.realization !== state.realization
      ) return false;
      if (
        state.register !== "all"
        && entry.language_register !== state.register
      ) return false;
      return true;
    });
  }

  function sortRows(rows) {
    const direction = state.dir === "desc" ? -1 : 1;
    return [...rows].sort((left, right) => {
      if (state.sort === "id") {
        return (Number(left.id) - Number(right.id)) * direction;
      }
      const a = String(left[state.sort] ?? "");
      const b = String(right[state.sort] ?? "");
      return a.localeCompare(b, state.lang === "zh" ? "zh-Hant" : "en", {
        numeric: true,
        sensitivity: "base",
      }) * direction;
    });
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
  }

  function updateSummary() {
    const terms = new Set(corpus.entries.map((entry) => entry.key_term));
    const resultCount = document.querySelector("#result-count");
    const statEntries = document.querySelector("#stat-entries");
    const statTerms = document.querySelector("#stat-terms");
    const statChecked = document.querySelector("#stat-checked");
    if (resultCount) resultCount.textContent = String(filteredRows.length);
    if (statEntries) statEntries.textContent = String(corpus.entries.length);
    if (statTerms) statTerms.textContent = String(terms.size);
    if (statChecked) statChecked.textContent = String(currentCheckedCount());

    const termChip = document.querySelector("#active-term");
    if (termChip) {
      termChip.hidden = !state.q;
      termChip.textContent = state.q ? t("term.selected", { term: state.q }) : "";
    }

    const qualityBanner = document.querySelector("#quality-banner");
    if (qualityBanner) {
      qualityBanner.hidden = currentCheckedCount() >= corpus.meta.verification_target;
    }
  }

  function selectTerm(term) {
    if (!term) return;
    state.q = term;
    state.page = 1;
    const searchInput = document.querySelector("#search-input");
    if (searchInput) searchInput.value = term;
    syncControls();
    renderAll();
  }

  function syncControls() {
    const search = document.querySelector("#search-input");
    const category = document.querySelector("#category-filter");
    const checked = document.querySelector("#checked-filter");
    const realization = document.querySelector("#realization-filter");
    const register = document.querySelector("#register-filter");
    const top = document.querySelector("#network-top");
    const weight = document.querySelector("#network-weight");
    if (search && search.value !== state.q) search.value = state.q;
    if (category) category.value = state.category;
    if (checked) checked.value = state.checked;
    if (realization) realization.value = state.realization;
    if (register) register.value = state.register;
    if (top) top.value = String(state.top);
    if (weight) weight.value = String(state.weight);
    const topOutput = document.querySelector("#network-top-output");
    const weightOutput = document.querySelector("#network-weight-output");
    if (topOutput) topOutput.textContent = String(state.top);
    if (weightOutput) weightOutput.textContent = String(state.weight);
  }

  function renderNetwork(rows) {
    const svg = document.querySelector("#network-svg");
    if (!svg) return;
    svg.replaceChildren();

    if (!rows.length) {
      const message = document.createElementNS("http://www.w3.org/2000/svg", "text");
      message.setAttribute("x", "500");
      message.setAttribute("y", "260");
      message.setAttribute("text-anchor", "middle");
      message.setAttribute("fill", "#626977");
      message.textContent = t("toast.empty");
      svg.append(message);
      return;
    }

    const termCounts = new Map();
    const pairCounts = new Map();
    const termCategories = new Map();
    for (const entry of rows) {
      termCounts.set(entry.key_term, (termCounts.get(entry.key_term) || 0) + 1);
      const pairKey = `${entry.key_term}\u0000${entry.target_verb}`;
      pairCounts.set(pairKey, (pairCounts.get(pairKey) || 0) + 1);
      if (!termCategories.has(entry.key_term)) {
        termCategories.set(entry.key_term, entry.category);
      }
    }

    const selectedTerms = [...termCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, state.top)
      .map(([term]) => term);
    const termSet = new Set(selectedTerms);
    const links = [...pairCounts.entries()]
      .map(([key, weight]) => {
        const [source, target] = key.split("\u0000");
        return { source, target, weight };
      })
      .filter((link) => termSet.has(link.source) && link.weight >= state.weight);

    const activeTerms = new Set(links.map((link) => link.source));
    const graphTerms = selectedTerms.filter((term) => activeTerms.has(term));
    const targetCounts = new Map();
    for (const link of links) {
      targetCounts.set(link.target, (targetCounts.get(link.target) || 0) + link.weight);
    }
    const maxTargets = Math.min(16, Math.max(8, state.top));
    const targets = [...targetCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-Hant"))
      .slice(0, maxTargets)
      .map(([verb]) => verb);
    const targetSet = new Set(targets);
    const visibleLinks = links.filter((link) => targetSet.has(link.target));

    const categoryColors = {
      condensation: "#1b4f87",
      explicitation: "#bd1622",
      transposition: "#c15a1d",
      congruence: "#6b3551",
    };
    const positions = new Map();
    const placeColumn = (nodes, x) => {
      const top = 72;
      const bottom = 475;
      const step = nodes.length > 1 ? (bottom - top) / (nodes.length - 1) : 0;
      nodes.forEach((node, index) => {
        const key = `${x < 500 ? "source" : "target"}:${node.name}`;
        const old = networkView.positions.get(key);
        positions.set(key, old || {
          x,
          y: nodes.length > 1 ? top + step * index : (top + bottom) / 2,
        });
      });
    };
    placeColumn(graphTerms.map((name) => ({ name })), 275);
    placeColumn(targets.map((name) => ({ name })), 745);

    const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
    scene.id = "network-scene";
    const edgeLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const nodeLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    scene.append(edgeLayer, nodeLayer);

    for (const link of visibleLinks) {
      const source = positions.get(`source:${link.source}`);
      const target = positions.get(`target:${link.target}`);
      if (!source || !target) continue;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("class", "network-edge");
      path.dataset.source = `source:${link.source}`;
      path.dataset.target = `target:${link.target}`;
      path.dataset.weight = String(link.weight);
      path.setAttribute("stroke-width", String(0.8 + Math.min(link.weight, 12) * 0.55));
      if (state.q && (link.source === state.q || link.target === state.q)) {
        path.classList.add("active");
      }
      const sourceLabel = functionLabel(link.source);
      const targetLabel = categoryLabel(link.target);
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${sourceLabel} -> ${targetLabel}: ${link.weight}`;
      path.append(title);
      edgeLayer.append(path);
      updateNetworkEdge(path, positions);
    }

    const addNode = (name, type, positionKey, count, extra) => {
      const position = positions.get(positionKey);
      const radius = Math.max(5, Math.min(22, 6 + Math.sqrt(count) * 3.2));
      const displayName = type === "target" ? categoryLabel(name) : functionLabel(name);
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute(
        "class",
        `network-node ${type === "target" ? "target" : "source"}${networkView.pinned.has(positionKey) ? " pinned" : ""}`,
      );
      group.dataset.positionKey = positionKey;
      group.dataset.label = name;
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", `${displayName}: ${count}`);
      group.setAttribute("transform", `translate(${position.x} ${position.y})`);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", String(radius));
      circle.setAttribute("fill", type === "target" ? "#f6dde1" : categoryColors[extra] || "#bd1622");
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${displayName}: ${count}`;
      circle.append(title);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", type === "target" ? String(radius + 8) : String(-radius - 8));
      text.setAttribute("y", "4");
      text.setAttribute("text-anchor", type === "target" ? "start" : "end");
      text.textContent = displayName.length > 22 ? `${displayName.slice(0, 20)}...` : displayName;

      group.append(circle, text);
      let clickTimer;
      group.addEventListener("click", (event) => {
        if (group.dataset.dragged === "true") {
          group.dataset.dragged = "false";
          return;
        }
        event.stopPropagation();
        window.clearTimeout(clickTimer);
        clickTimer = window.setTimeout(() => {
          if (type === "target") {
            selectTerm(name);
          } else {
            selectTerm(name);
          }
        }, 240);
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (type === "target") {
            selectTerm(name);
          } else {
            selectTerm(name);
          }
        }
      });
      group.addEventListener("dblclick", (event) => {
        event.preventDefault();
        window.clearTimeout(clickTimer);
        if (networkView.pinned.has(positionKey)) {
          networkView.pinned.delete(positionKey);
        } else {
          networkView.pinned.add(positionKey);
        }
        group.classList.toggle("pinned", networkView.pinned.has(positionKey));
      });
      attachNodeDrag(group, svg, positions);
      nodeLayer.append(group);
    };

    for (const term of graphTerms) {
      addNode(
        term,
        "source",
        `source:${term}`,
        termCounts.get(term) || 0,
        termCategories.get(term),
      );
    }
    for (const target of targets) {
      addNode(
        target,
        "target",
        `target:${target}`,
        targetCounts.get(target) || 0,
        "congruence",
      );
    }

    const leftLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    leftLabel.setAttribute("class", "network-label");
    leftLabel.setAttribute("x", "70");
    leftLabel.setAttribute("y", "24");
    leftLabel.textContent = t("network.top");
    const rightLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    rightLabel.setAttribute("class", "network-label");
    rightLabel.setAttribute("x", "850");
    rightLabel.setAttribute("y", "24");
    rightLabel.textContent = t("table.category");
    scene.append(leftLabel, rightLabel);
    svg.append(scene);
    applyNetworkTransform();
    attachNetworkPan(svg);
  }

  function updateNetworkEdge(path, positions) {
    const source = positions.get(path.dataset.source);
    const target = positions.get(path.dataset.target);
    if (!source || !target) return;
    const bend = (target.x - source.x) * 0.48;
    path.setAttribute(
      "d",
      `M ${source.x} ${source.y} C ${source.x + bend} ${source.y}, ${target.x - bend} ${target.y}, ${target.x} ${target.y}`,
    );
  }

  function attachNodeDrag(group, svg, positions) {
    let drag = null;
    group.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      group.setPointerCapture(event.pointerId);
      const key = group.dataset.positionKey;
      const position = positions.get(key);
      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        x: position.x,
        y: position.y,
        key,
        moved: false,
      };
    });
    group.addEventListener("pointermove", (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const dx = (event.clientX - drag.startX) / networkView.scale;
      const dy = (event.clientY - drag.startY) / networkView.scale;
      if (Math.hypot(dx, dy) > 3) drag.moved = true;
      const next = {
        x: clamp(drag.x + dx, 45, 955),
        y: clamp(drag.y + dy, 45, 495),
      };
      positions.set(drag.key, next);
      group.setAttribute("transform", `translate(${next.x} ${next.y})`);
      svg.querySelectorAll(".network-edge").forEach((edge) => {
        updateNetworkEdge(edge, positions);
      });
    });
    group.addEventListener("pointerup", (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      networkView.positions.set(drag.key, positions.get(drag.key));
      group.dataset.dragged = drag.moved ? "true" : "false";
      drag = null;
    });
    group.addEventListener("pointercancel", () => {
      drag = null;
    });
  }

  function applyNetworkTransform() {
    const scene = document.querySelector("#network-scene");
    if (!scene) return;
    scene.setAttribute(
      "transform",
      `translate(${networkView.tx} ${networkView.ty}) scale(${networkView.scale})`,
    );
  }

  function attachNetworkPan(svg) {
    if (svg.dataset.panBound === "true") return;
    svg.dataset.panBound = "true";
    let pan = null;
    svg.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest(".network-node")) return;
      svg.setPointerCapture(event.pointerId);
      pan = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        tx: networkView.tx,
        ty: networkView.ty,
      };
      svg.style.cursor = "grabbing";
    });
    svg.addEventListener("pointermove", (event) => {
      if (!pan || pan.pointerId !== event.pointerId) return;
      networkView.tx = pan.tx + (event.clientX - pan.startX);
      networkView.ty = pan.ty + (event.clientY - pan.startY);
      applyNetworkTransform();
    });
    const endPan = () => {
      pan = null;
      svg.style.cursor = "";
    };
    svg.addEventListener("pointerup", endPan);
    svg.addEventListener("pointercancel", endPan);
    svg.addEventListener("wheel", (event) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.1 : 0.9;
      networkView.scale = clamp(networkView.scale * factor, 0.55, 2.8);
      applyNetworkTransform();
    }, { passive: false });
  }

  function renderTreemap(rows) {
    const stage = document.querySelector("#treemap-stage");
    if (!stage) return;
    stage.replaceChildren();
    if (!rows.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = t("toast.empty");
      stage.append(empty);
      return;
    }

    const counts = new Map();
    for (const entry of rows) {
      const key = `${entry.category}\u0000${entry.realization}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const grid = document.createElement("div");
    grid.className = "treemap-grid";
    for (const category of CATEGORY_ORDER) {
      const categoryTotal = rows.filter((entry) => entry.category === category).length;
      if (!categoryTotal) continue;
      const block = document.createElement("div");
      block.className = "treemap-category";
      block.style.flex = `${categoryTotal} 1 0`;
      const title = document.createElement("button");
      title.type = "button";
      title.className = "treemap-category-label";
      title.textContent = `${categoryLabel(category)} · ${categoryTotal}`;
      title.addEventListener("click", () => {
        selectTerm(category);
      });
      const cells = document.createElement("div");
      cells.className = "treemap-cells";
      for (const realization of REALIZATION_ORDER) {
        const count = counts.get(`${category}\u0000${realization}`) || 0;
        if (!count) continue;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "treemap-cell";
        button.style.flex = `${count} 1 0`;
        const label = document.createElement("span");
        label.textContent = realizationLabel(realization);
        const number = document.createElement("b");
        number.textContent = String(count);
        button.append(label, number);
        button.setAttribute(
          "aria-label",
          `${categoryLabel(category)}, ${realizationLabel(realization)}: ${count}`,
        );
        button.addEventListener("click", () => {
          state.category = category;
          state.realization = realization;
          state.q = category;
          state.page = 1;
          const search = document.querySelector("#search-input");
          if (search) search.value = category;
          syncControls();
          renderAll();
        });
        cells.append(button);
      }
      block.append(title, cells);
      grid.append(block);
    }
    stage.append(grid);
  }

  function renderHeatmap(rows) {
    const stage = document.querySelector("#heatmap-stage");
    if (!stage) return;
    stage.replaceChildren();
    if (!rows.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = t("toast.empty");
      stage.append(empty);
      return;
    }

    const termCounts = new Map();
    for (const entry of rows) {
      termCounts.set(entry.key_term, (termCounts.get(entry.key_term) || 0) + 1);
    }
    const terms = [...termCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([term]) => term);
    const counts = new Map();
    for (const entry of rows) {
      if (!terms.includes(entry.key_term)) continue;
      const key = `${entry.category}\u0000${entry.key_term}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const maximum = Math.max(...counts.values(), 1);
    const table = document.createElement("table");
    table.className = "heatmap";
    const caption = document.createElement("caption");
    caption.className = "sr-only";
    caption.textContent = t("heatmap.caption");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    const corner = document.createElement("th");
    corner.scope = "col";
    corner.textContent = "";
    headRow.append(corner);
    for (const term of terms) {
      const th = document.createElement("th");
      th.scope = "col";
      const label = document.createElement("button");
      label.type = "button";
      label.className = "heatmap-term";
      label.textContent = functionLabel(term);
      label.setAttribute("aria-label", `${functionLabel(term)}: search`);
      label.addEventListener("click", () => selectTerm(term));
      th.append(label);
      headRow.append(th);
    }
    thead.append(headRow);
    const tbody = document.createElement("tbody");
    for (const category of CATEGORY_ORDER) {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      const rowLabel = document.createElement("button");
      rowLabel.type = "button";
      rowLabel.className = "heatmap-row-term";
      rowLabel.textContent = categoryLabel(category);
      rowLabel.addEventListener("click", () => selectTerm(category));
      th.append(rowLabel);
      row.append(th);
      for (const term of terms) {
        const cell = document.createElement("td");
        const count = counts.get(`${category}\u0000${term}`) || 0;
        const alpha = count ? 0.12 + (count / maximum) * 0.73 : 0;
        cell.style.backgroundColor = `rgba(189, 22, 34, ${alpha})`;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = count ? String(count) : "";
        button.disabled = !count;
        button.style.color = alpha > 0.55 ? "#fffdfc" : "#171c27";
        button.setAttribute(
          "aria-label",
          `${categoryLabel(category)}, ${term}: ${count}`,
        );
        if (count) {
          button.addEventListener("click", () => {
            state.category = category;
            state.q = term;
            state.page = 1;
            const search = document.querySelector("#search-input");
            if (search) search.value = term;
            syncControls();
            renderAll();
          });
        }
        cell.append(button);
        row.append(cell);
      }
      tbody.append(row);
    }
    table.append(caption, thead, tbody);
    stage.append(table);
  }

  function renderRegisterChart(rows) {
    const stage = document.querySelector("#register-stage");
    if (!stage) return;
    stage.replaceChildren();
    if (!rows.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = t("toast.empty");
      stage.append(empty);
      return;
    }

    const counts = new Map(
      REGISTER_ORDER.map((register) => [
        register,
        rows.filter((entry) => entry.language_register === register).length,
      ])
    );
    const maximum = Math.max(...counts.values(), 1);
    const chart = document.createElement("div");
    chart.className = "register-bars";
    for (const register of REGISTER_ORDER) {
      const count = counts.get(register) || 0;
      const row = document.createElement("button");
      row.type = "button";
      row.className = `register-row ${register}`;
      row.setAttribute(
        "aria-label",
        `${registerLabel(register)}: ${count}`
      );
      const label = document.createElement("span");
      label.textContent = registerLabel(register);
      const track = document.createElement("span");
      track.className = "register-track";
      const fill = document.createElement("span");
      fill.className = "register-fill";
      fill.style.width = `${(count / maximum) * 100}%`;
      track.append(fill);
      const number = document.createElement("strong");
      number.textContent = String(count);
      row.append(label, track, number);
      row.addEventListener("click", () => {
        state.register = register;
        state.page = 1;
        syncControls();
        renderAll();
      });
      chart.append(row);
    }
    stage.append(chart);
  }

  function entryExplanation(entry) {
    const ratio = Number(entry.length_ratio).toFixed(2);
    if (entry.category === "condensation") {
      return state.lang === "zh"
        ? `標準化長度比為 ${ratio}，低於 0.70 的壓縮門檻。`
        : `The normalized length ratio is ${ratio}, below the 0.70 condensation threshold.`;
    }
    if (entry.category === "explicitation") {
      return state.lang === "zh"
        ? `標準化長度比為 ${ratio}，高於 1.30 的明示門檻。`
        : `The normalized length ratio is ${ratio}, above the 1.30 explicitation threshold.`;
    }
    if (entry.category === "transposition") {
      return state.lang === "zh"
        ? `標準化長度比為 ${ratio}，位於中間區間，而原文與譯文的言語行為不同。`
        : `The ratio is ${ratio}, inside the middle band, and the source and target speech acts differ.`;
    }
    return state.lang === "zh"
      ? `標準化長度比為 ${ratio}，位於中間區間，而原文與譯文的言語行為一致。`
      : `The ratio is ${ratio}, inside the middle band, and the source and target speech acts agree.`;
  }

  function openEntry(entryId) {
    const numericId = Number(entryId);
    if (!Number.isFinite(numericId)) return;
    if (document.activeElement instanceof HTMLElement) {
      entryTrigger = document.activeElement;
    }
    state.entry = numericId;
    renderEntryPanel();
    writeStateToUrl();
    const panel = document.querySelector("#entry-panel");
    const close = document.querySelector("#entry-panel-close");
    if (panel) panel.hidden = false;
    if (close) close.focus();
  }

  function closeEntry() {
    state.entry = null;
    const panel = document.querySelector("#entry-panel");
    const backdrop = document.querySelector("#entry-panel-backdrop");
    if (panel) panel.hidden = true;
    if (backdrop) backdrop.hidden = true;
    entryTrigger?.focus();
    entryTrigger = null;
    writeStateToUrl();
  }

  function stepEntry(direction) {
    const rows = sortRows(filteredRows.length ? filteredRows : corpus.entries);
    const index = rows.findIndex((entry) => entry.id === state.entry);
    if (index < 0) return;
    const next = rows[index + direction];
    if (!next) return;
    state.entry = next.id;
    renderEntryPanel();
    writeStateToUrl();
  }

  function renderEntryPanel() {
    const panel = document.querySelector("#entry-panel");
    const backdrop = document.querySelector("#entry-panel-backdrop");
    if (!panel || !backdrop) return;
    const entry = corpus.entries.find((item) => item.id === state.entry);
    if (!entry) {
      panel.hidden = true;
      backdrop.hidden = true;
      return;
    }

    panel.hidden = false;
    backdrop.hidden = false;
    const text = (id, value) => {
      const node = document.querySelector(id);
      if (node) node.textContent = value;
    };
    text("#entry-panel-kicker", `Workbook row ${entry.id}`);
    text("#entry-panel-help", t("detail.title"));
    text("#entry-source-text", entry.source_text);
    text("#entry-target-text", entry.target_text);
    text("#entry-category", categoryLabel(entry.category));
    text("#entry-function", functionLabel(entry.key_term));
    text("#entry-length", `${entry.length_ratio.toFixed(2)} · ${realizationLabel(entry.realization)}`);
    text("#entry-register", registerLabel(entry.language_register));
    text("#entry-checked", t(entry.human_checked === "yes" ? "filter.yes" : "filter.no"));
    text("#entry-reason", entryExplanation(entry));
    text(
      "#entry-markers",
      [
        entry.cantonese_markers,
        entry.written_chinese_markers,
      ].filter(Boolean).join(" · ") || t("detail.markersEmpty")
    );
    text("#entry-source", entry.source);

    const categoryLink = document.querySelector("#entry-category-link");
    if (categoryLink) categoryLink.href = `codebook.html#${entry.category}`;
    const close = document.querySelector("#entry-panel-close");
    if (close) close.setAttribute("aria-label", t("detail.close"));
    const markersLabel = document.querySelector("#entry-markers-label");
    if (markersLabel) {
      markersLabel.textContent = state.lang === "zh"
        ? "語域標記"
        : "Register markers";
    }
    const sourceLabel = document.querySelector("#entry-source-label");
    if (sourceLabel) sourceLabel.textContent = t("detail.source");
    const previous = document.querySelector("#entry-previous");
    const next = document.querySelector("#entry-next");
    const rows = sortRows(filteredRows.length ? filteredRows : corpus.entries);
    const index = rows.findIndex((item) => item.id === entry.id);
    if (previous) previous.disabled = index <= 0;
    if (next) next.disabled = index < 0 || index >= rows.length - 1;
  }

  function createTextCell(text, className) {
    const cell = document.createElement("td");
    if (className) cell.className = className;
    cell.textContent = text;
    return cell;
  }

  function renderTable(rows) {
    const body = document.querySelector("#table-body");
    if (!body) return;
    body.replaceChildren();
    const sorted = sortRows(rows);
    const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    state.page = clamp(state.page, 1, pages);
    const pageRows = sorted.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    if (!pageRows.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 8;
      cell.className = "empty-state";
      cell.textContent = t("toast.empty");
      row.append(cell);
      body.append(row);
    }

    for (const entry of pageRows) {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.className = "entry-id-cell";
      const idLabel = document.createElement("span");
      idLabel.textContent = `Row ${entry.id}\nLength ${entry.length_ratio.toFixed(2)}`;
      const details = document.createElement("button");
      details.type = "button";
      details.className = "entry-open";
      details.textContent = t("detail.open");
      details.addEventListener("click", () => openEntry(entry.id));
      idCell.append(idLabel, details);
      row.append(idCell);
      row.append(createTextCell(entry.source_text));
      row.append(createTextCell(entry.target_text));
      const termCell = document.createElement("td");
      const termButton = document.createElement("button");
      termButton.type = "button";
      termButton.className = "term-link";
      termButton.textContent = functionLabel(entry.key_term);
      termButton.addEventListener("click", () => selectTerm(entry.key_term));
      termCell.append(termButton);
      row.append(termCell);
      const categoryCell = document.createElement("td");
      const category = document.createElement("button");
      category.type = "button";
      category.className = `category-pill ${entry.category}`;
      category.textContent = categoryLabel(entry.category);
      category.addEventListener("click", () => selectTerm(entry.category));
      categoryCell.append(category);
      row.append(categoryCell);
      const lengthCell = document.createElement("td");
      const length = document.createElement("button");
      length.type = "button";
      length.className = "term-link";
      length.textContent = realizationLabel(entry.realization);
      length.addEventListener("click", () => selectTerm(entry.realization));
      lengthCell.append(length);
      row.append(lengthCell);
      const registerCell = document.createElement("td");
      const register = document.createElement("button");
      register.type = "button";
      register.className = "term-link";
      register.textContent = registerLabel(entry.language_register);
      register.addEventListener("click", () => {
        state.register = entry.language_register;
        state.page = 1;
        syncControls();
        renderAll();
      });
      registerCell.append(register);
      row.append(registerCell);
      const checkedCell = document.createElement("td");
      const checked = document.createElement("span");
      checked.className = `checked-pill ${entry.human_checked}`;
      checked.textContent = t(entry.human_checked === "yes" ? "filter.yes" : "filter.no");
      checkedCell.append(checked);
      row.append(checkedCell);
      body.append(row);
    }

    const pageStatus = document.querySelector("#page-status");
    const previous = document.querySelector("#previous-page");
    const next = document.querySelector("#next-page");
    if (pageStatus) {
      pageStatus.textContent = sorted.length
        ? t("page.of", { page: state.page, pages })
        : t("page.none");
    }
    if (previous) previous.disabled = state.page <= 1;
    if (next) next.disabled = state.page >= pages;

    document.querySelectorAll("[data-sort]").forEach((button) => {
      const marker = button.querySelector("span");
      if (!marker) return;
      marker.textContent = button.dataset.sort === state.sort
        ? state.dir === "asc" ? "↑" : "↓"
        : "↕";
    });
  }

  function renderAll() {
    applyFilters();
    updateSummary();
    renderNetwork(filteredRows);
    renderTreemap(filteredRows);
    renderHeatmap(filteredRows);
    renderRegisterChart(filteredRows);
    renderTable(filteredRows);
    renderEntryPanel();
    writeStateToUrl();
  }

  function renderReportSummary() {
    const categoryStages = [...document.querySelectorAll(".report-category-bars")];
    const realizationStages = [...document.querySelectorAll(".report-realization-bars")];
    const registerStages = [...document.querySelectorAll(".report-register-bars")];
    if (
      !categoryStages.length
      && !realizationStages.length
      && !registerStages.length
    ) return;
    const rows = entriesWithReviewStatus();
    const categoryCounts = new Map(CATEGORY_ORDER.map((category) => [category, 0]));
    const realizationCounts = new Map(REALIZATION_ORDER.map((item) => [item, 0]));
    const registerCounts = new Map(REGISTER_ORDER.map((item) => [item, 0]));
    for (const entry of rows) {
      categoryCounts.set(entry.category, (categoryCounts.get(entry.category) || 0) + 1);
      realizationCounts.set(entry.realization, (realizationCounts.get(entry.realization) || 0) + 1);
      registerCounts.set(
        entry.language_register,
        (registerCounts.get(entry.language_register) || 0) + 1
      );
    }
    categoryStages.forEach((stage) => {
      createBars(stage, categoryCounts, rows.length, categoryLabel);
    });
    realizationStages.forEach((stage) => {
      createBars(stage, realizationCounts, rows.length, realizationLabel);
    });
    registerStages.forEach((stage) => {
      createBars(stage, registerCounts, rows.length, registerLabel);
    });
  }

  function createBars(stage, counts, total, labeler) {
    if (!stage) return;
    stage.replaceChildren();
    const wrapper = document.createElement("div");
    wrapper.className = "report-bars";
    const maximum = Math.max(...counts.values(), 1);
    for (const [key, count] of counts.entries()) {
      const row = document.createElement("div");
      row.className = "report-bar";
      const label = document.createElement("span");
      label.textContent = labeler(key);
      const track = document.createElement("span");
      track.className = "report-bar-track";
      const fill = document.createElement("span");
      fill.className = "report-bar-fill";
      fill.style.display = "block";
      fill.style.width = `${(count / maximum) * 100}%`;
      track.append(fill);
      const number = document.createElement("strong");
      number.textContent = String(count);
      number.title = `${count} / ${total}`;
      row.append(label, track, number);
      wrapper.append(row);
    }
    stage.append(wrapper);
  }

  function renderReview() {
    const list = document.querySelector("#review-list");
    if (!list) return;
    const requestedIds = new Set(corpus.meta.review_sample_ids || []);
    const sample = requestedIds.size
      ? corpus.entries.filter((entry) => requestedIds.has(entry.id))
      : deterministicReviewSample(corpus.entries, 50);
    list.replaceChildren();
    let checked = 0;
    let errors = 0;
    for (const entry of sample) {
      const status = reviewOverrides[entry.id] ?? entry.human_checked ?? "";
      if (status) checked += 1;
      if (status === "no") errors += 1;
      const item = document.createElement("article");
      item.className = "review-item";
      item.dataset.status = status;
      item.dataset.id = entry.id;

      const meta = document.createElement("div");
      meta.className = "review-meta";
      const id = document.createElement("span");
      id.textContent = (
        `ID ${entry.id} · ${functionLabel(entry.key_term)} · `
        + `${categoryLabel(entry.category)} · ${realizationLabel(entry.realization)} · `
        + `${registerLabel(entry.language_register)}`
      );
      const source = document.createElement("span");
      source.textContent = `Workbook row ${entry.id}`;
      meta.append(id, source);

      const pair = document.createElement("div");
      pair.className = "review-pair";
      const sourceCell = document.createElement("div");
      const sourceLabel = document.createElement("small");
      sourceLabel.textContent = state.lang === "zh" ? "英文" : "English";
      const sourceText = document.createElement("p");
      sourceText.textContent = entry.source_text;
      sourceCell.append(sourceLabel, sourceText);
      const targetCell = document.createElement("div");
      const targetLabel = document.createElement("small");
      targetLabel.textContent = state.lang === "zh" ? "粵語字幕" : "Cantonese";
      const targetText = document.createElement("p");
      targetText.textContent = entry.target_text;
      targetCell.append(targetLabel, targetText);
      pair.append(sourceCell, targetCell);

      const buttons = document.createElement("div");
      buttons.className = "review-buttons";
      for (const [value, label] of [["yes", "Correct"], ["no", "Needs correction"]]) {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.value = value;
        button.classList.toggle("selected", status === value);
        button.classList.add(value);
        button.textContent = state.lang === "zh"
          ? value === "yes" ? "正確" : "需要修正"
          : label;
        button.addEventListener("click", () => {
          reviewOverrides[entry.id] = value;
          persistReviewOverrides();
          renderReview();
        });
        buttons.append(button);
      }
      item.append(meta, pair, buttons);
      list.append(item);
    }

    const checkedCount = document.querySelector("#review-checked");
    const errorCount = document.querySelector("#review-errors");
    const remainingCount = document.querySelector("#review-remaining");
    const progress = document.querySelector("#review-progress-bar");
    if (checkedCount) checkedCount.textContent = String(checked);
    if (errorCount) errorCount.textContent = String(errors);
    if (remainingCount) remainingCount.textContent = String(Math.max(0, 50 - checked));
    if (progress) progress.style.width = `${(checked / 50) * 100}%`;
  }

  function deterministicReviewSample(entries, size) {
    let seed = 2026;
    const random = () => {
      seed |= 0;
      seed = seed + 0x6d2b79f5 | 0;
      let value = Math.imul(seed ^ seed >>> 15, 1 | seed);
      value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
    const copy = [...entries];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy.slice(0, size);
  }

  function exportReview() {
    const rows = corpus.entries
      .filter((entry) => checkedStatus(entry) === "yes")
      .map((entry) => ({
        id: entry.id,
        source_cue_ids: entry.source_cue_ids,
        target_cue_id: entry.target_cue_id,
        key_term: entry.key_term,
        category: entry.category,
        length_band: entry.realization,
        human_checked: reviewOverrides[entry.id] ?? entry.human_checked ?? "no",
      }));
    downloadCsv(
      [
        "id",
        "source_cue_ids",
        "target_cue_id",
        "key_term",
        "category",
        "length_band",
        "human_checked",
      ],
      rows,
      "cue-shift-review-results.csv",
    );
  }

  function exportFiltered() {
    const rows = sortRows(filteredRows);
    const fields = [
      "id",
      "source_text",
      "target_text",
      "source",
      "category",
      "human_checked",
      "ai_screened",
      "unit",
      "key_term",
      "target_verb",
      "realization",
      "length_ratio",
      "language_register",
      "cantonese_markers",
      "written_chinese_markers",
      "genre",
      "corpus_version",
      "collection_date",
      "source_file_date",
      "source_cue_ids",
      "target_cue_id",
      "source_timecode",
      "target_timecode",
      "alignment_shift_ms",
      "alignment_gap_ms",
      "english_word_count",
      "cantonese_han_count",
      "notes",
    ];
    downloadCsv(fields, rows, "s-web-of-words-filtered-corpus.csv");
  }

  function downloadCsv(fields, rows, filename) {
    const lines = [
      fields.map(escapeCsv).join(","),
      ...rows.map((row) => fields.map((field) => escapeCsv(row[field])).join(",")),
    ];
    const blob = new Blob(["\ufeff", lines.join("\r\n")], {
      type: "text/csv;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  function bindExplorerEvents() {
    const search = document.querySelector("#search-input");
    const category = document.querySelector("#category-filter");
    const checked = document.querySelector("#checked-filter");
    const realization = document.querySelector("#realization-filter");
    const register = document.querySelector("#register-filter");
    const top = document.querySelector("#network-top");
    const weight = document.querySelector("#network-weight");
    const clear = document.querySelector("#clear-search");
    const termChip = document.querySelector("#active-term");
    const reset = document.querySelector("#reset-filters");
    const copy = document.querySelector("#copy-view");
    const exportButton = document.querySelector("#export-csv");
    const previous = document.querySelector("#previous-page");
    const next = document.querySelector("#next-page");

    search?.addEventListener("input", () => {
      state.q = search.value.trim();
      state.page = 1;
      renderAll();
    });
    category?.addEventListener("change", () => {
      state.category = category.value;
      state.page = 1;
      renderAll();
    });
    checked?.addEventListener("change", () => {
      state.checked = checked.value;
      state.page = 1;
      renderAll();
    });
    realization?.addEventListener("change", () => {
      state.realization = realization.value;
      state.page = 1;
      renderAll();
    });
    register?.addEventListener("change", () => {
      state.register = register.value;
      state.page = 1;
      renderAll();
    });
    top?.addEventListener("input", () => {
      state.top = Number(top.value);
      syncControls();
      renderAll();
    });
    weight?.addEventListener("input", () => {
      state.weight = Number(weight.value);
      syncControls();
      renderAll();
    });
    clear?.addEventListener("click", () => {
      state.q = "";
      state.page = 1;
      syncControls();
      renderAll();
      search?.focus();
    });
    termChip?.addEventListener("click", () => {
      state.q = "";
      state.page = 1;
      syncControls();
      renderAll();
    });
    reset?.addEventListener("click", () => {
      Object.assign(state, {
        q: "",
        category: "all",
        checked: "all",
        realization: "all",
        register: "all",
        entry: null,
        top: 12,
        weight: 1,
        sort: "id",
        dir: "asc",
        page: 1,
      });
      syncControls();
      renderAll();
      showToast(t("toast.reset"));
    });
    copy?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        showToast(t("toast.copied"));
      } catch {
        showToast(location.href);
      }
    });
    exportButton?.addEventListener("click", exportFiltered);
    previous?.addEventListener("click", () => {
      state.page = Math.max(1, state.page - 1);
      renderAll();
      document.querySelector("#data-grid")?.scrollIntoView({ behavior: "smooth" });
    });
    next?.addEventListener("click", () => {
      state.page += 1;
      renderAll();
      document.querySelector("#data-grid")?.scrollIntoView({ behavior: "smooth" });
    });
    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const field = button.dataset.sort;
        if (state.sort === field) {
          state.dir = state.dir === "asc" ? "desc" : "asc";
        } else {
          state.sort = field;
          state.dir = "asc";
        }
        state.page = 1;
        renderAll();
      });
    });
    document.querySelector("#zoom-in")?.addEventListener("click", () => {
      networkView.scale = clamp(networkView.scale * 1.15, 0.55, 2.8);
      applyNetworkTransform();
    });
    document.querySelector("#zoom-out")?.addEventListener("click", () => {
      networkView.scale = clamp(networkView.scale / 1.15, 0.55, 2.8);
      applyNetworkTransform();
    });
    document.querySelector("#zoom-reset")?.addEventListener("click", () => {
      networkView = {
        scale: 1,
        tx: 0,
        ty: 0,
        positions: new Map(),
        pinned: new Set(),
      };
      renderNetwork(filteredRows);
    });

    document.querySelector("#entry-panel-close")?.addEventListener("click", closeEntry);
    document.querySelector("#entry-previous")?.addEventListener("click", () => stepEntry(-1));
    document.querySelector("#entry-next")?.addEventListener("click", () => stepEntry(1));
    document.querySelector("#entry-copy-link")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        showToast(t("detail.copied"));
      } catch {
        showToast(location.href);
      }
    });
    document.querySelector("#entry-panel-backdrop")?.addEventListener("click", closeEntry);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.entry) closeEntry();
    });
  }

  function bindReviewEvents() {
    document.querySelector("#export-review")?.addEventListener("click", exportReview);
    document.querySelector("#reset-review")?.addEventListener("click", () => {
      reviewOverrides = {};
      persistReviewOverrides();
      renderReview();
    });
  }

  function bindLanguageSwitch() {
    document.querySelector("#language-switch")?.addEventListener("click", () => {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLanguage();
      syncControls();
      writeStateToUrl();
      if (PAGE === "explore") renderAll();
      if (PAGE === "report") renderReportSummary();
      if (PAGE === "review") renderReview();
    });
  }

  async function loadCorpus() {
    if (window.NVATLAS_CORPUS?.entries?.length) {
      corpus = window.NVATLAS_CORPUS;
      return;
    }
    const response = await fetch("data/corpus.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load corpus: ${response.status}`);
    corpus = await response.json();
  }

  function showLoadError(error) {
    const target = document.querySelector("main");
    const box = document.createElement("div");
    box.className = "callout warning";
    box.textContent = `The corpus could not be loaded. ${error.message}`;
    target?.prepend(box);
  }

  function addSpiderDecorations() {
    const positions = PAGE === "explore"
      ? ["spider-one", "spider-two", "spider-three"]
      : ["spider-three"];
    for (const className of positions) {
      const spider = document.createElement("div");
      spider.className = `spider-decoration ${className}`;
      spider.setAttribute("aria-hidden", "true");
      const image = document.createElement("img");
      image.src = "assets/spider.svg";
      image.alt = "";
      spider.append(image);
      document.body.append(spider);
    }
  }

  async function init() {
    readStateFromUrl();
    applyLanguage();
    addSpiderDecorations();
    bindLanguageSwitch();
    try {
      await loadCorpus();
    } catch (error) {
      showLoadError(error);
      return;
    }
    if (PAGE === "explore") {
      syncControls();
      bindExplorerEvents();
      renderAll();
    } else if (PAGE === "report") {
      renderReportSummary();
    } else if (PAGE === "review") {
      bindReviewEvents();
      renderReview();
    }
  }

  window.addEventListener("popstate", () => {
    readStateFromUrl();
    applyLanguage();
    syncControls();
    if (PAGE === "explore") renderAll();
    if (PAGE === "report") renderReportSummary();
    if (PAGE === "review") renderReview();
  });

  init();
})();
