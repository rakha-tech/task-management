"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ListTodo, 
  Plus, 
  Search,
  LogOut,
  CheckCircle2,
  MoreVertical,
  LayoutDashboard,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Checkbox } from '../../components/ui/checkbox';

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    router.push("/login");
  }
}, [router]);

  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Desain UI/UX Dashboard',
      description: 'Buat mockup untuk dashboard baru',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Implementasi API Backend',
      description: 'Develop REST API untuk fitur task management',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Testing & QA',
      description: 'Test semua fitur dan perbaiki bug',
      isCompleted: true,
    },
    {
      id: 4,
      title: 'Meeting dengan Client',
      description: 'Presentasi progress proyek',
      isCompleted: true,
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

 const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  const toggleTaskisCompleted = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, title: editTitle, description: editDescription }
        : task
    ));
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter(task => !task.isCompleted);
  const completedTasks = filteredTasks.filter(task => task.isCompleted);

  const stats = [
    { label: 'Total Tugas', value: tasks.length, icon: ListTodo, color: 'bg-blue-500' },
    { label: 'Belum Selesai', value: tasks.filter(t => !t.isCompleted).length, icon: TrendingUp, color: 'bg-yellow-500' },
    { label: 'Selesai', value: tasks.filter(t => t.isCompleted).length, icon: CheckCircle2, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <ListTodo className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </nav>
        
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Cari tugas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat datang kembali, {user.username?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-gray-600">Berikut adalah ringkasan tugas Anda hari ini</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Add New Task */}
          <Card className="p-4 mb-6">
            <div className="space-y-3">
              <Input
                placeholder="Tambah tugas baru..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                className="w-full"
              />
              <Input
                placeholder="Deskripsi tugas (opsional)..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                className="w-full"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddTask} className="gap-2">
                  <Plus className="w-5 h-5" />
                  Tambah Tugas
                </Button>
              </div>
            </div>
          </Card>

          {/* Tasks Section */}
          {/* Tugas Belum Selesai */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Tugas Belum Selesai</h2>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{incompleteTasks.length}</span>
            </div>
            <div className="space-y-3">
              {incompleteTasks.length > 0 ? (
                incompleteTasks.map((task) => (
                  <Card key={task.id} className="p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={task.isCompleted}
                        onCheckedChange={() => toggleTaskisCompleted(task.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        {editingTaskId === task.id ? (
                          <div className="space-y-3 mb-3">
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Judul tugas"
                              className="w-full"
                            />
                            <Input
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Deskripsi tugas"
                              className="w-full"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSaveEdit(task.id)} className="bg-green-600 hover:bg-green-700">
                                Simpan
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {task.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditTask(task)}>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            {task.description && (
                              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-3">
                              {task.isCompleted === false && (
                                <Badge variant="outline" className="text-blue-600 border-blue-600">
                                  Belum Selesai
                                </Badge>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center bg-blue-50">
                  <p className="text-gray-600">Tidak ada tugas yang belum selesai. Hebat! 🎉</p>
                </Card>
              )}
            </div>
          </div>

          {/* Tugas Selesai */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tugas Selesai</h2>
            <div className="space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <Card key={task.id} className="p-5 hover:shadow-md transition-shadow bg-green-50">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={task.isCompleted}
                        onCheckedChange={() => toggleTaskisCompleted(task.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        {editingTaskId === task.id ? (
                          <div className="space-y-3 mb-3">
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Judul tugas"
                              className="w-full"
                            />
                            <Input
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Deskripsi tugas"
                              className="w-full"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSaveEdit(task.id)} className="bg-green-600 hover:bg-green-700">
                                Simpan
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-semibold line-through text-gray-500">
                                {task.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditTask(task)}>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            {task.description && (
                              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                            )}
                            
                            <div className="flex flex-wrap items-center">
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Selesai
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-600">Belum ada tugas yang selesai</p>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}