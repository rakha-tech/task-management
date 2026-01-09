"use client";
import { useState } from 'react';
import Link from "next/link";
import { ListTodo, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card } from '../../../components/ui/card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const registeredUser = localStorage.getItem('registeredUser');

    if (!registeredUser) {
      alert('Silakan daftar terlebih dahulu.');
      router.push('/register');
      return;
    }

    const user = JSON.parse(registeredUser);

    if (
      user.username !== formData.username ||
      user.password !== formData.password
    ) {
      alert('Username atau password salah.');
      return;
    }

    // Login berhasil
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem(
      'user',
      JSON.stringify({ username: user.username })
    );

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="hidden md:block space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <ListTodo className="w-12 h-12 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">MyTask</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Selamat datang kembali!
          </h1>
          <p className="text-xl text-gray-600">
            Masuk untuk melanjutkan mengelola tugas Anda
          </p>
        </div>

        {/* Right Side */}
        <Card className="p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk</h2>
            <p className="text-gray-600">Masukkan kredensial Anda</p>
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
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Masuk
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-semibold">
              Daftar sekarang
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
