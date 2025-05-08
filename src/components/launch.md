<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animasi Roket Peluncuran</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #6a329f;
      font-family: Arial, sans-serif;
      overflow: hidden;
      position: relative;
    }

    .mission-card {
      background-color: white;
      border-radius: 24px;
      padding: 40px;
      text-align: center;
      width: 320px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 1;
      transition: opacity 0.3s ease;
    }

    .circle-container {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto 24px;
    }

    .main-circle {
      width: 100%;
      height: 100%;
      background-color: #7c4dff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: transform 0.5s ease;
      z-index: 2;
    }

    .rocket {
      width: 50px;
      height: 50px;
      fill: white;
      position: relative;
      z-index: 3;
      transition: transform 0.5s ease;
    }

    .decoration {
      position: absolute;
      background-color: #f0e4ff;
      border-radius: 50%;
      z-index: 1;
    }

    .star-blue {
      width: 24px;
      height: 24px;
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .star-purple {
      width: 32px;
      height: 32px;
      right: 0;
      top: 30%;
      transform: translateX(50%);
    }

    .planet {
      width: 40px;
      height: 40px;
      background-color: #ffe0a0;
      left: 0;
      top: 30%;
      transform: translateX(-50%);
    }

    .book {
      width: 28px;
      height: 28px;
      background-color: #a0ffe0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
    }

    h1 {
      font-size: 24px;
      color: #333;
      margin: 0 0 16px;
    }

    p {
      color: #666;
      margin: 0 0 24px;
    }

    .button {
      background-color: #7c4dff;
      color: white;
      border: none;
      border-radius: 32px;
      padding: 16px 32px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s;
      width: 100%;
      font-weight: bold;
    }

    .button:hover {
      background-color: #6a40e0;
    }

    /* Animasi */
    .explosion {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #7c4dff;
      border-radius: 50%;
      transform: scale(0);
      z-index: 10;
      opacity: 0;
      pointer-events: none;
    }

    .fire {
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 30px;
      background-color: #ff5722;
      border-radius: 0 0 12px 12px;
      clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 60% 60%, 50% 100%, 40% 60%, 20% 100%);
      opacity: 0;
      z-index: 1;
    }

    /* Animasi Roket Terbang */
    @keyframes rocketPrepare {
      0% { transform: translateY(0) rotate(0deg); }
      20% { transform: translateY(3px) rotate(-5deg); }
      40% { transform: translateY(-2px) rotate(5deg); }
      60% { transform: translateY(2px) rotate(-3deg); }
      80% { transform: translateY(-1px) rotate(3deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }

    @keyframes rocketLaunch {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-500px) scale(0.5); }
    }

    @keyframes fireStart {
      0% { opacity: 0; height: 0; }
      100% { opacity: 1; height: 30px; }
    }

    @keyframes circleExpand {
      0% { transform: scale(1); }
      100% { transform: scale(20); opacity: 0.9; }
    }

    @keyframes explosionEffect {
      0% { transform: scale(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: scale(3); opacity: 0; }
    }
  </style>
</head>
<body>
  <div class="mission-card" id="missionCard">
    <div class="circle-container">
      <div class="main-circle" id="mainCircle">
        <svg class="rocket" id="rocket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53Z"/>
        </svg>
        <div class="fire" id="rocketFire"></div>
      </div>
      <div class="decoration star-blue"></div>
      <div class="decoration star-purple"></div>
      <div class="decoration planet"></div>
      <div class="decoration book"></div>
    </div>
    <h1>Mission Ready</h1>
    <p>Mission ready! Click to begin your adventure.</p>
    <button class="button" id="beginButton">Begin Adventure</button>
  </div>

  <div class="explosion" id="explosion"></div>

  <script>
    const beginButton = document.getElementById('beginButton');
    const rocket = document.getElementById('rocket');
    const mainCircle = document.getElementById('mainCircle');
    const rocketFire = document.getElementById('rocketFire');
    const explosion = document.getElementById('explosion');
    const missionCard = document.getElementById('missionCard');

    beginButton.addEventListener('click', () => {
      // Disable button to prevent multiple clicks
      beginButton.disabled = true;

      // 1. Animasi persiapan roket
      rocket.style.animation = 'rocketPrepare 0.8s ease';

      setTimeout(() => {
        // 2. Tampilkan api roket
        rocketFire.style.animation = 'fireStart 0.5s forwards';

        // 3. Setelah api muncul, roket mulai terbang
        setTimeout(() => {
          rocket.style.animation = 'rocketLaunch 1s forwards';

          // 4. Lingkaran ungu membesar
          setTimeout(() => {
            mainCircle.style.animation = 'circleExpand 0.8s forwards';

            // 5. Efek ledakan
            setTimeout(() => {
              explosion.style.animation = 'explosionEffect 1s forwards';
              missionCard.style.opacity = '0';

              // 6. Redirect atau reset setelah animasi selesai
              setTimeout(() => {
                alert("Boom! Peluncuran berhasil! 🚀");
                // Uncomment baris berikut jika ingin reload halaman setelah animasi
                // location.reload();
              }, 1000);
            }, 600);
          }, 400);
        }, 500);
      }, 800);
    });
  </script>
</body>
</html>