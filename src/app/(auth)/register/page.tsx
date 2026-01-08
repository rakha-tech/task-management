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
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulasi registrasi
    if (formData.password === formData.confirmPassword) {
      // Simpan data user ke localStorage (simulasi)
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        passwword: formData.password
      }));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect ke login page
      navigate.push('/login');
    } else {
      alert('Password tidak cocok!');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
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

        {/* Right Side - Form */}
        <Card className="p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h2>
            <p className="text-gray-600">Mulai perjalanan produktivitas Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan username"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  placeholder="Minimal 8 karakter"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  placeholder="Ulangi password"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
           
            </div>
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
