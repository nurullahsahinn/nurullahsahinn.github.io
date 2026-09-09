# Nurullah Şahin - Portfolio

Kişisel portfolio sitesi. Vanilla HTML/CSS/JavaScript ile geliştirilmiş, build adımı gerektirmeyen statik bir projedir.

## Geliştirme

```bash
python -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın. GitHub Pages ve Netlify doğrudan kök dizini yayınlayabilir; build adımı yoktur.

## Proje yapısı

```text
.
├── index.html
├── assets/
│   ├── animations/       # İzole görsel bileşenler
│   ├── css/              # Site stilleri
│   ├── cursors/          # Animasyonlu cursor frame'leri
│   ├── docs/             # Yayınlanan CV
│   ├── i18n/             # Türkçe / İngilizce içerik
│   ├── images/           # Profil, proje ve eğitim görselleri
│   ├── js/               # Site davranışları ve efektler
│   └── media/            # Video arka planlar
└── netlify.toml
```

## Notlar

- Kaynak dosyalar ASCII ve web-dostu dosya adlarıyla tutulur.
- Demo/deneme klasörleri ve kullanılmayan TypeScript/React iskeleti projeden çıkarılmıştır.
- Dil içerikleri yalnızca `assets/i18n/` altında tutulur; JavaScript içinde kopya çeviri sözlüğü bulunmaz.
- CV: `assets/docs/Nurullah_Sahin.pdf`.

## İletişim

- GitHub: https://github.com/nurullahsahinn
- LinkedIn: https://linkedin.com/in/nurullahsahinn
