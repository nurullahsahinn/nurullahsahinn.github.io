document.addEventListener('DOMContentLoaded', function() {
      // Custom cursor elementini oluştur
      const customCursor = document.createElement('div');
      customCursor.id = 'customCursor';
      const cursorImg = document.createElement('img');
      customCursor.appendChild(cursorImg);
      document.body.appendChild(customCursor);

      // Her sayfa yüklendiğinde rastgele cursor seç
      const cursors = [
        { folder: "cursor1", frameCount: 3 },
        { folder: "cursor2", frameCount: 3 },
        { folder: "cursor3", frameCount: 4 },
        { folder: "cursor4", frameCount: 2 },
        { folder: "cursor5", frameCount: 4 },
        { folder: "cursor6", frameCount: 3 },
        { folder: "cursor7", frameCount: 3 }
      ];

      // Rastgele bir cursor seç
      const randomCursor = cursors[Math.floor(Math.random() * cursors.length)];
      const folder = "./assets/cursors/" + randomCursor.folder;
      const frameCount = randomCursor.frameCount;
      
      const frames = [];
      for (let i = 1; i <= frameCount; i++) {
        frames.push(`${folder}/frame${i}.png`);
      }

      let cursorIndex = 0;
      const fps = 8;

      // Cursor animasyonunu başlat
      function updateCursorFrame() {
        cursorImg.src = frames[cursorIndex];
        cursorIndex = (cursorIndex + 1) % frames.length;
      }

      // İlk frame'i yükle
      updateCursorFrame();
      
      // Animasyonu başlat
      setInterval(updateCursorFrame, 1000 / fps);

      // Mouse hareketini takip et
      document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
      });

      // Mouse sayfa dışına çıkarsa cursor'u gizle
      document.addEventListener('mouseenter', function() {
        customCursor.style.opacity = '1';
      });

      document.addEventListener('mouseleave', function() {
        customCursor.style.opacity = '0';
      });


    });
