# BookStore

**Deskripsi singkat**

BookStore adalah aplikasi Laravel (local) untuk manajemen toko buku. File README ini berisi panduan instalasi, konfigurasi lingkungan (.env), dan perintah penting untuk menjalankan proyek ini pada mesin development.

---

## Persyaratan (Prerequisites)

* PHP >= 8.2 (proyek ini ditujukan untuk PHP 8.2)
* Laravel 10
* Composer
* Node.js & npm (untuk build aset/Vite)
* MySQL (atau MariaDB)
* Git

---

## Langkah instalasi cepat

1. Clone repository:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependency PHP dan JS (**jangan lupa `npm install`**):

```bash
composer install
npm install    # atau yarn
```

3. Salin file environment dan generate key aplikasi:

```bash
cp .env.example .env
php artisan key:generate
```

> **Jika Anda sudah menerima salinan file `.env` dari tim/owner proyek (mis. file `.env` yang diberikan secara terpisah),** cukup rename/replace file tersebut menjadi `.env` di root project — jangan commit file `.env` ke repo publik.

4. Edit file `.env` sesuai konfigurasi lokal Anda. Contoh `.env` yang dipakai pada proyek ini ada di bawah.

5. Jalankan migrasi dan seeder (jika ingin menanam data contoh):

> **Catatan:** proyek ini menjalankan seeder dengan memory limit tinggi. Gunakan perintah berikut jika Anda menemui error memori pada saat seeding:

```bash
php -d memory_limit=2G artisan db:seed
```

Jika ingin menghapus semua tabel lalu migrate + seed dari awal:

```bash
php artisan migrate:fresh --seed
# atau, jika perlu memory_limit besar:
php -d memory_limit=2G artisan migrate:fresh --seed
```

6. Jalankan build aset dan server development:

```bash
npm run dev     # untuk development (Vite)
php artisan serve
```

Atau jika menggunakan Vite + hot reload, pastikan `Vite` berjalan: `npm run dev` dan buka `http://localhost:8000`.

---

## Perintah penting

* Install dependensi composer: `composer install`
* Install dependensi node: `npm install`
* Generate app key: `php artisan key:generate`
* Migrate: `php artisan migrate`
* Seed: `php artisan db:seed` atau dengan memory limit: `php -d memory_limit=2G artisan db:seed`
* Migrate fresh + seed: `php artisan migrate:fresh --seed`
* Clear cache config & route: `php artisan config:clear && php artisan route:clear && php artisan cache:clear`

---

## Mail

Mailing tidak digunakan pada proyek ini.

---

## Troubleshooting umum

* **Error koneksi DB**: pastikan MySQL berjalan dan kredensial di `.env` benar.
* **Error memory saat seeding**: gunakan `php -d memory_limit=2G artisan db:seed` (contoh sudah disediakan).
* **Assets tidak muncul / Vite error**: jalankan `npm run dev` dan refresh browser. Jika memakai `php artisan serve`, pastikan Vite juga jalan.
* **Permission**: beri permission tulis pada `storage/` dan `bootstrap/cache/` jika mengalami error permission.

---

## Keamanan & Catatan

* Jangan commit file `.env` ke repository publik — file ini berisi kredensial sensitif.
* Untuk produksi, ubah `APP_DEBUG=false` dan konfigurasi queue, cache, dan storage sesuai kebutuhan.

---

## Kontak

Untuk pertanyaan atau bantuan, silakan kunjungi domain berikut dan gunakan formulir kontak di sana:

[gufronardinugroho.my.id](https://gufronardinugroho.my.id)

---

*Selesai — README ini dibuat otomatis. Sesuaikan bagian yang diperlukan sebelum dibagikan ke tim.*
