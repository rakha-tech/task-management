# Task Management Application

Aplikasi manajemen tugas modern yang dibangun dengan teknologi terkini. Aplikasi ini memungkinkan pengguna untuk membuat, mengelola, dan melacak tugas-tugas mereka dengan antarmuka yang intuitif dan responsif.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API Documentation](#api-documentation)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## ✨ Fitur Utama

- **Autentikasi Pengguna**: Sistem registrasi dan login yang aman dengan JWT
- **Manajemen Tugas**: Buat, baca, perbarui, dan hapus tugas
- **Dashboard**: Tampilan dashboard yang user-friendly untuk melihat semua tugas
- **Responsif**: Desain responsif yang bekerja di semua perangkat
- **Keamanan**: Implementasi autentikasi JWT dan hash password dengan BCrypt
- **Database Modern**: Menggunakan PostgreSQL dengan Entity Framework Core

## 🛠️ Teknologi yang Digunakan

### Backend

- **Framework**: ASP.NET Core 8.0
- **Bahasa**: C#
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core 8.0
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt.Net-Next
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Serilog

### Frontend

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS 4
- **Component Library**: Radix UI
- **Icons**: Lucide React

## 📦 Prasyarat

Pastikan Anda telah menginstal:

- **.NET 8.0 SDK** atau lebih tinggi - [Download](https://dotnet.microsoft.com/download)
- **Node.js 18.0** atau lebih tinggi - [Download](https://nodejs.org/)
- **npm** atau **yarn** (disertakan dengan Node.js)
- **PostgreSQL 12** atau lebih tinggi - [Download](https://www.postgresql.org/download/)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd task-management
```

### 2. Setup Backend

Navigasi ke folder backend:

```bash
cd backend
```

#### a. Konfigurasi Database

Edit file `appsettings.Development.json` dan sesuaikan connection string PostgreSQL:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=task_management;Username=postgres;Password=your_password"
  },
  "Jwt": {
    "Key": "your-secret-key-here-at-least-32-characters-long",
    "Issuer": "TaskApi",
    "Audience": "TaskApp"
  }
}
```

#### b. Install Dependencies dan Migration Database

```bash
# Restore NuGet packages
dotnet restore

# Apply migrations
dotnet ef database update
```

### 3. Setup Frontend

Navigasi ke folder frontend:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
# atau
yarn install
```

## 🎯 Menjalankan Aplikasi

### Menjalankan Backend

Dari folder `backend`:

```bash
dotnet run
```

Backend akan berjalan di `https://localhost:5043`

Dokumentasi API Swagger tersedia di: `https://localhost:5043/swagger`

### Menjalankan Frontend

Dari folder `frontend`:

```bash
npm run dev
# atau
yarn dev
```

Aplikasi frontend akan berjalan di `http://localhost:3000`

### Menjalankan Keduanya (Development)

Buka dua terminal:

**Terminal 1 (Backend):**

```bash
cd backend
dotnet run
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

## 📁 Struktur Proyek

```
task-management/
├── backend/                          # ASP.NET Core API
│   ├── Controllers/                  # API Controllers
│   │   ├── AuthController.cs         # Autentikasi (Register, Login)
│   │   └── TasksController.cs        # CRUD Tasks
│   ├── Data/
│   │   └── AppDbContext.cs           # Database Context
│   ├── Models/                       # Domain Models
│   │   ├── User.cs
│   │   └── TaskItem.cs
│   ├── DTOs/                         # Data Transfer Objects
│   │   ├── LoginRequest.cs
│   │   ├── RegisterRequest.cs
│   │   ├── CreateTaskRequest.cs
│   │   └── UpdateTaskRequest.cs
│   ├── Middleware/
│   │   └── ErrorHandlingMiddleware.cs
│   ├── Migrations/                   # Database Migrations
│   ├── appsettings.json              # Konfigurasi
│   ├── Program.cs                    # Startup Configuration
│   └── TaskApi.csproj               # Project File
│
└── frontend/                         # Next.js Application
    ├── src/
    │   ├── app/                      # Next.js App Router
    │   │   ├── (auth)/               # Auth Pages
    │   │   │   ├── login/
    │   │   │   └── register/
    │   │   ├── dashboard/            # Dashboard Page
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/               # React Components
    │   │   ├── sidebar.tsx
    │   │   └── ui/                   # UI Components (Radix UI)
    │   └── lib/
    │       ├── api.ts                # API Client
    │       └── utils.ts              # Utility Functions
    ├── package.json
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── next.config.ts
```

## 📡 API Documentation

### Authentication Endpoints

#### Register

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Registrasi berhasil"
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Task Endpoints

#### Get All Tasks (Requires JWT Token)

```
GET /api/tasks
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "isCompleted": false,
    "createdAt": "2026-01-12T10:30:00Z"
  }
]
```

#### Create Task

```
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description"
}

Response: 201 Created
{
  "id": 1,
  "title": "New Task",
  "description": "Task description",
  "isCompleted": false
}
```

#### Update Task

```
PUT /api/tasks/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "isCompleted": true
}

Response: 200 OK
```

#### Delete Task

```
DELETE /api/tasks/{id}
Authorization: Bearer {token}

Response: 200 OK
```

Untuk dokumentasi API lengkap, kunjungi Swagger UI: `https://localhost:5043/swagger`

## 🔧 Build untuk Production

### Backend

```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

## 💡 Variabel Lingkungan (Environment Variables)

### Backend (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-postgresql-connection-string"
  },
  "Jwt": {
    "Key": "your-secret-key-minimum-32-characters",
    "Issuer": "TaskApi",
    "Audience": "TaskApp",
    "ExpiryMinutes": 60
  }
}
```

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5043
```

## 🐛 Troubleshooting

### Database Connection Error

- Pastikan PostgreSQL running
- Verifikasi connection string di `appsettings.json`
- Jalankan `dotnet ef database update` untuk migrations

### CORS Error

- Pastikan backend berjalan di `http://localhost:5043` 
- Verifikasi CORS policy di `Program.cs`

### Frontend Cannot Connect to API

- Pastikan backend API sedang running
- Verifikasi `NEXT_PUBLIC_API_URL` environment variable
- Cek browser console untuk error messages

## 🤝 Kontribusi

Kami menerima kontribusi! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📝 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.

---

**Dibuat dengan ❤️ oleh Tim Sarastya**

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.
