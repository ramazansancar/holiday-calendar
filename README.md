# Holiday Calendar

Bu proje, farklı ülkelerin resmi tatil günlerini gösteren bir takvim uygulamasıdır.

Frontend için Next.js v15 kullanılarak Ant Design ve Rsuite UI kütüphaneleri kullanılmıştır.

Backend için Node.js v20 kullanılarak Express.js kullanılmıştır.

## Kullanılan Teknolojiler

Bu projede kullanılan teknolojiler aşağıdaki gibidir:

Her iki alan içinde Node 20.x için kontrol edilmiştir.

- Frontend
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Ant Design
  - Rsuite UI
  - Pdf-lib (Henüz entegre edilmedi)
  - XLSX
  - File-Saver
  - DayJS
  - SWR
  - PostCSS
  - ESLint
  - Iconify

- Backend
  - Node.js
  - Express.js
  - Express-Async-Handler
  - Axios
  - Cors
  - Nodemon
  - EsLint
  - swagger-ui-express (Henüz entegre edilmedi)

## Kurulum

Bu projeyi çalıştırmak için aşağıdaki adımları takip edebilirsiniz:
**Not:** Proje için Node.js ve npm yüklü olmalıdır. Her iki alan içinde ayrı olarak terminalde komutların çalıştırılması gerekmektedir.

```bash
git clone https://github.com/ramazansancar/holiday-calendar.git
cd holiday-calendar

# Frontend
npm install
npm run build
npm run start

# Backend
cd server
npm install
npm run start
```

## Kullanım

Uygulama çalıştırıldıktan sonra, uygulama üzerindeki ülkelerin resmi tatil günlerini görebilirsiniz.

Görüntülemek için [http://localhost:3000](http://localhost:3000) adresine gidin.

Api üzerinden veri çekmek için [http://localhost:3001](http://localhost:3001) adresine gidin.

## Bilinen Sorunlar

- Lokasyonlarından veri gelmemektedir:
  - DE-MV (Sorun kullanılan api kaynaklıdır.)

### Lisans

[./LICENSE](./LICENSE)
