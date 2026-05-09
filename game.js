(function () {
  const verses = window.LIT_VERSES || [];
  const state = {
    verseIndex: 0,
    verse: verses[0],
    tokens: [],
    targetIndexes: [],
    currentTarget: 0,
    score: 0,
    running: false,
    finished: false,
    startedAt: 0,
    pausedOffset: 0,
    rafId: 0,
    trackStartX: 0,
    tokenCenters: []
  };

  const els = {
    score: document.getElementById("score"),
    level: document.getElementById("level"),
    targetWord: document.getElementById("target-word"),
    nextCount: document.getElementById("next-count"),
    track: document.getElementById("lyric-track"),
    avatar: document.getElementById("jthis-avatar"),
    judgement: document.getElementById("judgement"),
    hint: document.getElementById("hint"),
    start: document.getElementById("start-btn"),
    stop: document.getElementById("stop-btn"),
    reset: document.getElementById("reset-btn"),
    comfortMode: document.getElementById("comfort-mode")
  };

  function normalizeText(text) {
    return text
      .replace(/[.,!?;:"'()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function setupVerse() {
    state.verse = verses[state.verseIndex];

    if (!state.verse) {
      els.judgement.textContent = "데이터 없음";
      els.hint.textContent = "verses.js에 벌스 데이터를 추가하세요.";
      return;
    }

    state.tokens = normalizeText(state.verse.text).split(" ").filter(Boolean);
    state.targetIndexes = chooseRandomTargetIndexes(state.tokens, getTargetCount(state.tokens, state.verse));
    state.currentTarget = 0;
    state.running = false;
    state.pausedOffset = 0;
    state.startedAt = 0;
    els.track.innerHTML = "";

    state.tokens.forEach((token, index) => {
      const span = document.createElement("span");
      span.className = "token";
      span.dataset.index = String(index);
      span.textContent = token;
      if (state.targetIndexes.includes(index)) span.classList.add("target");
      els.track.appendChild(span);
    });

    updateHud();
    requestAnimationFrame(() => {
      measureTokens();
      resetTrackPosition();
    });
    els.judgement.textContent = "준비";
    els.hint.textContent = "스페이스 바 또는 멈춤 버튼으로 타이밍을 잡으세요.";
    els.stop.disabled = true;
    els.start.disabled = false;
    els.start.textContent = "시작";
  }

  function chooseRandomTargetIndexes(tokens, targetCount) {
    const count = Math.max(1, Math.min(targetCount, tokens.length));
    const indexes = tokens.map((_, index) => index);

    for (let index = indexes.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
    }

    return indexes.slice(0, count).sort((left, right) => left - right);
  }

  function getTargetCount(tokens, verse) {
    if (Number.isFinite(Number(verse.targetCount))) {
      return Number(verse.targetCount) + state.verseIndex;
    }

    return Math.max(5, Math.ceil(tokens.length / 8)) + state.verseIndex;
  }

  function resetTrackPosition() {
    const wrap = els.track.parentElement;
    const wrapRect = wrap.getBoundingClientRect();
    const avatarRect = els.avatar.getBoundingClientRect();
    const firstTokenCenter = state.tokenCenters[0] || 0;
    const mouthX = avatarRect.left - wrapRect.left + avatarRect.width * 0.14;
    state.trackStartX = mouthX - firstTokenCenter + 130;
    els.track.style.transform = `translate3d(${state.trackStartX}px, -50%, 0)`;
  }

  function measureTokens() {
    state.tokenCenters = [...els.track.children].map((node) => {
      return node.offsetLeft + node.offsetWidth / 2;
    });
  }

  function startGame() {
    if (state.finished) {
      resetGame();
      return;
    }

    if (!state.verse || state.running) return;
    measureTokens();
    state.running = true;
    state.startedAt = performance.now() - state.pausedOffset;
    els.start.disabled = true;
    els.stop.disabled = false;
    els.judgement.textContent = "진행";
    els.hint.textContent = "제시어가 중앙 빨간 라인에 오면 멈춤.";
    tick();
  }

  function tick() {
    if (!state.running) return;

    const elapsed = performance.now() - state.startedAt;
    const x = state.trackStartX - (elapsed / 1000) * getSpeed();
    els.track.style.transform = `translate3d(${x}px, -50%, 0)`;

    const lastCenter = state.tokenCenters[state.tokenCenters.length - 1] || 0;
    if (x + lastCenter < -80) {
      endGame();
      return;
    }

    state.rafId = requestAnimationFrame(tick);
  }

  function stopOnBeat() {
    if (!state.running) return;

    const targetIndex = state.targetIndexes[state.currentTarget];
    if (targetIndex === undefined) {
      endGame();
      return;
    }

    const wrapCenter = els.track.parentElement.getBoundingClientRect().width / 2;
    const currentX = getCurrentTrackX();
    const targetCenter = currentX + state.tokenCenters[targetIndex];
    const diff = Math.abs(targetCenter - wrapCenter);
    const result = judge(diff);
    const tokenNode = els.track.querySelector(`[data-index="${targetIndex}"]`);

    state.score += result.points;
    if (tokenNode) tokenNode.classList.add(result.points > 0 ? "hit" : "missed");

    els.judgement.textContent = result.label;
    els.hint.textContent = result.message;
    state.currentTarget += 1;
    updateHud();

    if (state.currentTarget >= state.targetIndexes.length) {
      setTimeout(completeLevel, 420);
    }
  }

  function getCurrentTrackX() {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(els.track).transform);
    return matrix.m41;
  }

  function judge(diff) {
    if (diff <= 22) {
      return { label: "PERFECT", points: 1000, message: "~~까지가 릿. 완전 중앙." };
    }
    if (diff <= 54) {
      return { label: "GREAT", points: 650, message: "거의 맞았습니다. 감이 살아있어요." };
    }
    if (diff <= 96) {
      return { label: "OK", points: 300, message: "살짝 밀렸지만 점수는 챙겼습니다." };
    }
    return { label: "MISS", points: 0, message: "타이밍이 빗나갔습니다." };
  }

  function completeLevel() {
    state.running = false;
    state.pausedOffset = 0;
    cancelAnimationFrame(state.rafId);
    els.stop.disabled = true;

    if (state.verseIndex < verses.length - 1) {
      els.start.disabled = true;
      els.judgement.textContent = "단계 완료";
      els.hint.textContent = `${state.verseIndex + 2}단계로 넘어갑니다.`;
      state.verseIndex += 1;
      setTimeout(setupVerse, 900);
      return;
    }

    els.start.disabled = false;
    els.start.textContent = "처음부터";
    els.judgement.textContent = "전체 완료";
    els.hint.textContent = `최종 점수 ${state.score}점`;
    state.finished = true;
  }

  function endGame() {
    state.running = false;
    state.pausedOffset = 0;
    cancelAnimationFrame(state.rafId);
    els.start.disabled = false;
    els.stop.disabled = true;
    els.judgement.textContent = "종료";
    els.hint.textContent = `최종 점수 ${state.score}점`;
  }

  function updateHud() {
    const total = state.targetIndexes.length;
    const targetIndex = state.targetIndexes[state.currentTarget];
    const isComplete = total > 0 && state.currentTarget >= total;
    const targetWord = targetIndex === undefined ? "-" : state.tokens[targetIndex];
    els.score.textContent = String(state.score);
    els.level.textContent = `${Math.min(state.verseIndex + 1, verses.length)} / ${verses.length}`;
    els.targetWord.textContent = isComplete ? "까지가 릿" : targetIndex === undefined ? "-" : `${targetWord}까지가`;
    els.nextCount.textContent = `${Math.min(state.currentTarget + 1, total)} / ${total}`;
  }

  function getSpeed() {
    const speed = (Number(state.verse.speed) || 680) + state.verseIndex * 45;
    return els.comfortMode.checked ? speed * 0.82 : speed;
  }

  function handleKeydown(event) {
    if (event.code !== "Space") return;
    event.preventDefault();
    if (state.running) {
      stopOnBeat();
    } else {
      startGame();
    }
  }

  function resetGame() {
    state.verseIndex = 0;
    state.score = 0;
    state.finished = false;
    setupVerse();
  }

  els.start.addEventListener("click", startGame);
  els.stop.addEventListener("click", stopOnBeat);
  els.reset.addEventListener("click", resetGame);
  els.comfortMode.addEventListener("change", () => {
    document.body.classList.toggle("comfort-mode", els.comfortMode.checked);
  });
  els.avatar.addEventListener("load", () => {
    measureTokens();
    resetTrackPosition();
  });
  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      measureTokens();
      resetTrackPosition();
    });
  });
  window.addEventListener("keydown", handleKeydown);

  setupVerse();
})();
