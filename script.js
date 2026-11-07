
$(document).ready(function() {
  var envelope = $('#envelope');
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var heartInterval = null;
  var bgm = document.getElementById("bgm");

  envelope.click(function() {
    openEnvelope();
  });

  btn_open.click(function() {
    openEnvelope();
  });

  btn_reset.click(function() {
    closeEnvelope();
  });

  function openEnvelope() {
    // 已经打开时，不重复触发
    if (envelope.hasClass("open")) return;

    envelope.addClass("open").removeClass("close");

    // 原有特效
    createConfetti();
    heartInterval = setInterval(createHeart, 1500);

    // 新增：播放背景音乐
    if (bgm) {
      bgm.volume = 0.35;
      bgm.play().catch(function(error) {
        console.log("音乐暂时无法播放：", error);
      });
    }

    // 新增：烤串雨！
    createSkewerRain();
  }

  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");

    clearInterval(heartInterval);
    heartInterval = null;

    document.querySelector('.hearts').innerHTML = '';

    // 关闭音乐
    if (bgm) {
      bgm.pause();
      bgm.currentTime = 0;
    }
  }

  function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = [
      '#ffe6f0', '#ffd6e0', '#ffc0cb',
      '#ffb6c1', '#ff9bb9'
    ];

    for (let i = 0; i < 250; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = (Math.random() * -150 - 50) + 'px';
      confetti.style.animationDuration =
        (Math.random() * 1 + 1) + 's';
      confetti.style.animationDelay =
        (Math.random() * 0.5) + 's';
      confetti.style.transform =
        `rotate(${Math.random() * 360}deg)`;

      container.appendChild(confetti);

      confetti.addEventListener('animationend', function() {
        confetti.remove();
      });
    }
  }

  function createHeart() {
    const heartsContainer = document.querySelector('.hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = (Math.random() * 80 + 10) + '%';

    const classes = ['a1', 'a2', 'a3'];
    const randomClass =
      classes[Math.floor(Math.random() * classes.length)];

    heart.classList.add(randomClass);
    heartsContainer.appendChild(heart);

    setTimeout(function() {
      heart.remove();
    }, 7000);
  }

  // 新增：生成漫天烤串
  function createSkewerRain() {
    const skewers = ['🍢', '🍖', '🌽', '🥓', '🍡'];

    for (let i = 0; i < 35; i++) {
      const skewer = document.createElement('div');
      skewer.classList.add('skewer');
      skewer.textContent =
        skewers[Math.floor(Math.random() * skewers.length)];

      skewer.style.left = Math.random() * 100 + 'vw';
      skewer.style.fontSize = (24 + Math.random() * 24) + 'px';
      skewer.style.animationDuration = (3 + Math.random() * 3) + 's';
      skewer.style.animationDelay = Math.random() * 1.5 + 's';

      document.body.appendChild(skewer);

      skewer.addEventListener('animationend', function() {
        skewer.remove();
      });
    }
  }
});
