"use client";
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListTodo, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card } from '../../../components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // Cek apakah user sudah pernah register
    const existingUser = localStorage.getItem('registeredUser');
    if (existingUser) {
      alert('Akun sudah terdaftar, silakan login.');
      router.push('/login');
      return;
    }

    // Simpan data register
    localStorage.setItem(
      'registeredUser',
      JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    );

    alert('Registrasi berhasil! Silakan login.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-2">
            <ListTodo className="w-12 h-12 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">MyTask</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Mulai kelola tugas Anda dengan lebih baik
          </h1>
          <p className="text-xl text-gray-600">
            Bergabung dengan ribuan pengguna yang sudah merasakan produktivitas maksimal
          </p>
        </div>

        {/* Right Side */}
        <Card className="p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h2>
            <p className="text-gray-600">Mulai perjalanan produktivitas Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  className="pl-10"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-semibold">
              Masuk di sini
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
