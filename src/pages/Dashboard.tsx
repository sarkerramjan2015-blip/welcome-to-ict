import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, CheckCircle, Clock, Book, User as UserIcon, Edit2, Save, X, Camera, Plus, Trash2, ListTodo, BarChart3, Target, Percent, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLms } from '../context/LmsContext';

interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const { analytics, quizResults, tasks, addTask, toggleTaskCompletion: toggleStoredTaskCompletion, deleteTask: deleteStoredTask, challengeEnrollments, courseEnrollments } = useLms();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    institution: '',
    district: '',
    upazila: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || '',
        institution: user.institution || '',
        district: user.district || '',
        upazila: user.upazila || '',
        bio: user.bio || ''
      });
    }
    setLoading(false);
  }, [user]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, newTaskPriority);
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = async (task: Task) => {
    toggleStoredTaskCompletion(task.id);
  };

  const deleteTask = async (taskId: string) => {
    deleteStoredTask(taskId);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    
    // Bangladeshi Phone Number Validation
    if (editForm.phone) {
      const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
      if (!phoneRegex.test(editForm.phone)) {
        setPhoneError('Please enter a valid 11-digit Bangladeshi mobile number.');
        return;
      }
    }

    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        try {
          await updateProfile({ profileImage: dataUrl });
        } catch (err) {
          alert("Failed to upload image.");
        } finally {
          setUploadingImage(false);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };


  const isResultPublished = (updatedAt: string) => {
    const examTime = new Date(updatedAt).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - examTime) / (1000 * 60 * 60);
    return hoursPassed >= 12;
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-slate-900/10 dark:border-white/20">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Student Dashboard</h1>
          <p className="text-slate-600 dark:text-gray-300">Please login to view your dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-center text-slate-900 dark:text-white">Loading Dashboard...</div>;

  const hasPurchasedSuggestion = localStorage.getItem('hasPurchasedSuggestion') === 'true';
  const enrollments = challengeEnrollments;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      {/* Profile Header section */}
      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20 mb-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shrink-0 shadow-lg shadow-blue-500/25 overflow-hidden border-2 border-slate-900/10 dark:border-white/10 relative group cursor-pointer"
          >
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name || 'Student'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              user.name?.charAt(0)?.toUpperCase() || 'S'
            )}
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center backdrop-blur-sm transition-all duration-300">
               {uploadingImage ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Camera className="w-6 h-6 text-white" />}
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name || 'Anonymous Student'}</h1>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 border border-slate-900/10 dark:border-white/10 rounded-lg text-sky-400 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
            <p className="text-sky-300 mb-4">{user.email}</p>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="mt-6 bg-slate-900/5 dark:bg-white/5 p-6 rounded-xl border border-slate-900/10 dark:border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={editForm.phone} 
                      onChange={e => { setEditForm({...editForm, phone: e.target.value}); setPhoneError(''); }}
                      className={`w-full bg-slate-50/50 dark:bg-slate-900/50 border rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors ${phoneError ? 'border-red-500' : 'border-slate-900/10 dark:border-white/10'}`}
                      placeholder="+8801XXXXXXXXX"
                    />
                    {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">Institution</label>
                    <input 
                      type="text" 
                      value={editForm.institution} 
                      onChange={e => setEditForm({...editForm, institution: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                      placeholder="Your College Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">District</label>
                    <input 
                      type="text" 
                      value={editForm.district} 
                      onChange={e => setEditForm({...editForm, district: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">Upazila</label>
                    <input 
                      type="text" 
                      value={editForm.upazila} 
                      onChange={e => setEditForm({...editForm, upazila: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-500 dark:text-gray-400 mb-1">Bio</label>
                    <textarea 
                      value={editForm.bio} 
                      onChange={e => setEditForm({...editForm, bio: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-sky-500 min-h-[80px]"
                      placeholder="A short bio about yourself..."
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end mt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4">
                {user.bio && (
                  <p className="text-slate-600 dark:text-gray-300 italic mb-6 border-l-2 border-sky-500 pl-4">{user.bio}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                  <div className="bg-slate-900/5 dark:bg-white/5 p-3 rounded-lg border border-slate-900/5 dark:border-white/5">
                    <span className="text-slate-500 dark:text-gray-400 block mb-1 text-xs uppercase tracking-wider">Phone</span>
                    <span className="text-slate-900 dark:text-white">{user.phone || 'Not set'}</span>
                  </div>
                  <div className="bg-slate-900/5 dark:bg-white/5 p-3 rounded-lg border border-slate-900/5 dark:border-white/5 md:col-span-3">
                    <span className="text-slate-500 dark:text-gray-400 block mb-1 text-xs uppercase tracking-wider">Institution</span>
                    <span className="text-slate-900 dark:text-white">{user.institution || 'Not set'}</span>
                  </div>
                  <div className="bg-slate-900/5 dark:bg-white/5 p-3 rounded-lg border border-slate-900/5 dark:border-white/5 col-span-2">
                    <span className="text-slate-500 dark:text-gray-400 block mb-1 text-xs uppercase tracking-wider">District</span>
                    <span className="text-slate-900 dark:text-white">{user.district || 'Not set'}</span>
                  </div>
                  <div className="bg-slate-900/5 dark:bg-white/5 p-3 rounded-lg border border-slate-900/5 dark:border-white/5 col-span-2">
                    <span className="text-slate-500 dark:text-gray-400 block mb-1 text-xs uppercase tracking-wider">Upazila</span>
                    <span className="text-slate-900 dark:text-white">{user.upazila || 'Not set'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LMS Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-900/10 dark:border-white/20">
          <div className="flex items-center gap-3 mb-3 text-sky-400">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Chapters Read</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{analytics.totalChaptersRead}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Out of 6 HSC ICT chapters</p>
        </div>

        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-900/10 dark:border-white/20">
          <div className="flex items-center gap-3 mb-3 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Topic Progress</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{analytics.completedTopics}/{analytics.totalTopics}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{analytics.completionRate}% completed</p>
        </div>

        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-900/10 dark:border-white/20">
          <div className="flex items-center gap-3 mb-3 text-amber-400">
            <Target className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quiz Attempts</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{analytics.quizAttempts}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Topic and challenge quizzes</p>
        </div>

        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-900/10 dark:border-white/20">
          <div className="flex items-center gap-3 mb-3 text-pink-400">
            <Percent className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avg Accuracy</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{analytics.averageAccuracy}%</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Best: {analytics.bestAccuracy}%</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20 mb-8 mt-8 relative">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <ListTodo className="w-6 h-6 text-indigo-400" />
          My Tasks
        </h2>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as any)}
            className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-indigo-500 appearance-none min-w-[120px] cursor-pointer"
          >
            <option value="High" className="text-red-500 font-bold">🔴 High</option>
            <option value="Medium" className="text-yellow-500 font-bold">🟡 Medium</option>
            <option value="Low" className="text-green-500 font-bold">🟢 Low</option>
          </select>
          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-gray-400 border border-dashed border-slate-900/10 dark:border-white/10 rounded-xl">
              No tasks yet. Stay productive!
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed 
                    ? 'bg-slate-900/5 dark:bg-white/5 border-transparent opacity-60' 
                    : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-900/10 dark:border-white/10 hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => toggleTaskCompletion(task)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-slate-500 dark:border-gray-400 hover:border-indigo-500'
                    }`}
                  >
                    {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <span className={`text-lg transition-all ${task.completed ? 'line-through text-slate-500 dark:text-gray-500' : 'text-slate-900 dark:text-white'}`}>
                    {task.title}
                  </span>
                  
                  {/* Priority Badge */}
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                    task.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                    task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          My Quiz Exams
        </h2>

        {enrollments.length === 0 ? (
          <p className="text-slate-500 dark:text-gray-400">You haven't enrolled in any exams yet.</p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment: any) => (
              <div key={enrollment.id} className="bg-slate-900/5 dark:bg-white/5 rounded-xl p-6 border border-slate-900/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {enrollment.challenge.month} {enrollment.challenge.year} Quiz Exam
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      enrollment.paymentStatus === 'PAID' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {enrollment.paymentStatus}
                    </span>
                    <span className="text-slate-500 dark:text-gray-400">
                      Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  {enrollment.score !== null ? (
                    isResultPublished(enrollment.updatedAt) ? (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{enrollment.score}</div>
                        <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider">Marks</div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-sm">
                        <Clock className="w-4 h-4" /> Result Pending (12h)
                      </span>
                    )
                  ) : enrollment.paymentStatus === 'PAID' ? (
                    <span className="inline-flex items-center gap-1 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full text-sm">
                      <Clock className="w-4 h-4" /> Ready to take exam
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">Payment Required</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20 mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Book className="w-6 h-6 text-sky-400" />
          My Courses
        </h2>

        {courseEnrollments.length === 0 ? (
          <p className="text-slate-500 dark:text-gray-400">No premium courses purchased yet.</p>
        ) : (
          <div className="space-y-4">
            {courseEnrollments.map(course => (
              <div key={course.id} className="bg-slate-900/5 dark:bg-white/5 rounded-xl p-6 border border-slate-900/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {course.courseType === 'RECORDED' ? 'ICT Full Course Recorded' : 'HSC ICT Live Course'}
                  </h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
                    Purchased: {new Date(course.createdAt).toLocaleDateString()} · Fee: {course.fee} TK
                  </p>
                </div>
                <Link
                  to={course.courseType === 'RECORDED' ? '/course-player' : '/live-course-dashboard'}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold transition-colors"
                >
                  Continue Learning
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20 mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <History className="w-6 h-6 text-emerald-400" />
          Quiz History
        </h2>

        {quizResults.length === 0 ? (
          <p className="text-slate-500 dark:text-gray-400">No quiz results saved yet. Complete a topic quiz to start building your record.</p>
        ) : (
          <div className="space-y-3">
            {quizResults.slice(0, 8).map(result => (
              <div key={result.id} className="bg-slate-900/5 dark:bg-white/5 rounded-xl p-4 border border-slate-900/10 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{result.topicTitle}</h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                    {result.chapterTitle || (result.mode === 'mega' ? 'Monthly Challenge' : 'Topic Quiz')} · {new Date(result.completedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold">
                    {result.score}/{result.total}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-sm font-bold">
                    {result.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasPurchasedSuggestion && (
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-slate-900/10 dark:border-white/20 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Book className="w-6 h-6 text-pink-400" />
            My E-Books
          </h2>
          <div className="bg-slate-900/5 dark:bg-white/5 rounded-xl p-6 border border-slate-900/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">HSC ICT Master Suggestion</h3>
              <p className="text-slate-500 dark:text-gray-400">Complete guide for board exams</p>
            </div>
            <Link 
              to="/ebook-reader" 
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-500/25"
            >
              Read Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
