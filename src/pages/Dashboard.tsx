import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, CheckCircle, Clock, Book, Edit2, Save, Camera, Plus, Trash2, ListTodo, BarChart3, Target, Percent, History, Award, Share2, Download, Loader2, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLms } from '../context/LmsContext';
import AdBanner from '../components/AdBanner';
import { fetchManualPayments, type ManualPaymentRecord } from '../services/manualPayment';
import { fetchLeaderboard, type StudentLeaderboard } from '../services/leaderboard';

interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

const PREMIUM_PENDING_KEY = 'ict-toppers:premium-payment-pending';

const readLocalPremiumPending = () => {
  try {
    return JSON.parse(localStorage.getItem(PREMIUM_PENDING_KEY) || 'null') as { paymentId?: string; plan?: string } | null;
  } catch {
    return null;
  }
};

const getPaymentType = (payment: ManualPaymentRecord) => {
  if (payment.paymentType) return payment.paymentType;
  if (payment.courseId.startsWith('premium-')) return 'premium';
  if (payment.courseId.startsWith('quiz-')) return 'quiz';
  return 'course';
};

const formatDashboardDate = (value?: string | null) => {
  if (!value) return 'Next day at 9:00 PM';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Next day at 9:00 PM';
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  });
};

const triggerCanvasDownload = (canvas: HTMLCanvasElement, fileName: string) => new Promise<void>((resolve, reject) => {
  canvas.toBlob(blob => {
    try {
      const url = blob ? URL.createObjectURL(blob) : canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    } catch (error) {
      reject(error);
    }
  }, 'image/png');
});

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

const createRankCardCanvas = async ({
  name,
  rank,
  score,
  total,
  challengeTitle,
}: {
  name: string;
  rank: number;
  score: number;
  total: number;
  challengeTitle: string;
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported.');

  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(0.5, '#1e1b4b');
  gradient.addColorStop(1, '#082f49');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.fillStyle = 'rgba(56,189,248,0.18)';
  ctx.beginPath();
  ctx.arc(1030, 80, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(251,191,36,0.16)';
  ctx.beginPath();
  ctx.arc(120, 600, 260, 0, Math.PI * 2);
  ctx.fill();

  try {
    const logo = await loadImage('/logo-256.webp');
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(74, 58, 112, 112, 26);
    ctx.clip();
    ctx.drawImage(logo, 74, 58, 112, 112);
    ctx.restore();
  } catch {
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(74, 58, 112, 112);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px Arial, sans-serif';
  ctx.fillText('ICT Toppers', 214, 104);
  ctx.fillStyle = '#93c5fd';
  ctx.font = '800 22px Arial, sans-serif';
  ctx.fillText('All Bangladesh Monthly Quiz Leaderboard', 214, 142);

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.roundRect(74, 210, 1052, 330, 42);
  ctx.fill();
  ctx.strokeStyle = 'rgba(125,211,252,0.28)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 132px Arial, sans-serif';
  ctx.fillText(`#${rank}`, 120, 375);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 54px Arial, sans-serif';
  ctx.fillText(name || 'ICT Student', 410, 325);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '800 28px Arial, sans-serif';
  ctx.fillText(challengeTitle, 410, 376);

  ctx.fillStyle = '#34d399';
  ctx.font = '900 60px Arial, sans-serif';
  ctx.fillText(`${score}/${total}`, 410, 462);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '800 24px Arial, sans-serif';
  ctx.fillText('Score', 410, 500);

  ctx.fillStyle = '#e0f2fe';
  ctx.font = '800 24px Arial, sans-serif';
  ctx.fillText('www.icttoppers.com', 74, 590);
  ctx.textAlign = 'right';
  ctx.fillText('Shared from Student Dashboard', 1126, 590);

  return canvas;
};

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const { analytics, quizResults, tasks, addTask, toggleTaskCompletion: toggleStoredTaskCompletion, deleteTask: deleteStoredTask, challengeEnrollments, courseEnrollments } = useLms();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [manualPayments, setManualPayments] = useState<ManualPaymentRecord[]>([]);
  const [localPremiumPending, setLocalPremiumPending] = useState(readLocalPremiumPending);
  const [leaderboard, setLeaderboard] = useState<StudentLeaderboard | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [sharingRank, setSharingRank] = useState(false);

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

  useEffect(() => {
    if (!user?.id) {
      setManualPayments([]);
      setLocalPremiumPending(null);
      return undefined;
    }

    let cancelled = false;
    let intervalId: any;

    const loadPayments = async () => {
      setLocalPremiumPending(readLocalPremiumPending());
      try {
        const payments = await fetchManualPayments({ userId: user.id });
        if (!cancelled) {
          setManualPayments(payments);
        }
      } catch (err: any) {
        if (!cancelled) {
          setManualPayments([]);
          // Stop polling on auth errors — the token is expired/invalid.
          // fetchWithTokenRefresh already tried to refresh once; if it still
          // fails there is nothing further we can do until the page reloads.
          const msg = String(err?.message || '');
          if (msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('session') || msg.toLowerCase().includes('login')) {
            if (intervalId !== undefined) {
              window.clearInterval(intervalId);
              intervalId = undefined;
            }
          }
        }
      }
    };

    void loadPayments();
    // Poll every 60 s instead of 15 s — payment status rarely changes that fast.
    intervalId = window.setInterval(loadPayments, 60000);

    return () => {
      cancelled = true;
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;

    const pendingPayments = manualPayments.filter(payment => payment.status === 'pending');
    const approvedPremium = manualPayments.find(payment =>
      payment.status === 'approved' && getPaymentType(payment) === 'premium'
    );

    if (approvedPremium && !user.isPremium) {
      void updateProfile({
        isPremium: true,
        premiumPlan: approvedPremium.courseId.includes('monthly') ? 'monthly' : 'yearly',
        premiumSince: approvedPremium.approvedAt || new Date().toISOString(),
      });
    }

    if (pendingPayments.length === 0 && approvedPremium) {
      localStorage.removeItem(PREMIUM_PENDING_KEY);
      setLocalPremiumPending(null);
    }
  }, [manualPayments, updateProfile, user]);

  useEffect(() => {
    if (!user?.id) {
      setLeaderboard(null);
      return;
    }

    let cancelled = false;
    const preferredChallengeId = challengeEnrollments.find(item => item.paymentStatus === 'PAID')?.challengeId || challengeEnrollments[0]?.challengeId;

    const loadLeaderboard = async () => {
      setLeaderboardLoading(true);
      try {
        const data = await fetchLeaderboard(preferredChallengeId);
        if (!cancelled) {
          setLeaderboard(data);
          setLeaderboardError('');
        }
      } catch (error: any) {
        if (!cancelled) {
          setLeaderboard(null);
          setLeaderboardError(error?.message || 'Failed to load leaderboard.');
        }
      } finally {
        if (!cancelled) setLeaderboardLoading(false);
      }
    };

    void loadLeaderboard();
    const intervalId = window.setInterval(loadLeaderboard, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [challengeEnrollments, user?.id]);

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


  const handleRankShare = async (openFacebook = false) => {
    if (!leaderboard?.myResult?.published || !leaderboard.myResult.rank || leaderboard.myResult.score === undefined) return;

    setSharingRank(true);
    try {
      if (openFacebook) {
        const siteOrigin = window.location.hostname.includes('localhost') ? 'https://www.icttoppers.com' : window.location.origin;
        const rankShareUrl = `${siteOrigin}/api/rankShare?challengeId=${encodeURIComponent(leaderboard.challenge?.id || '')}&uid=${encodeURIComponent(user?.id || '')}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(rankShareUrl)}`, '_blank', 'width=640,height=520');
      } else {
        const canvas = await createRankCardCanvas({
          name: user?.name || user?.email?.split('@')[0] || 'ICT Student',
          rank: leaderboard.myResult.rank,
          score: leaderboard.myResult.score,
          total: leaderboard.myResult.total || 0,
          challengeTitle: leaderboard.challenge?.title || 'HSC ICT Monthly Quiz Exam',
        });
        await triggerCanvasDownload(canvas, `ict-toppers-rank-${leaderboard.myResult.rank}.png`);
      }
    } catch (error) {
      alert('Failed to create leaderboard share image. Please try again.');
    } finally {
      setSharingRank(false);
    }
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
  const pendingManualPayments = manualPayments.filter(payment => payment.status === 'pending');
  const hasPendingPayment = pendingManualPayments.length > 0 || Boolean(localPremiumPending && !user.isPremium);

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
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="text-sky-300">{user.email}</p>
              <span className={`rounded-full border px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] ${user.isPremium ? 'border-amber-300/40 bg-amber-400/15 text-amber-300' : 'border-slate-400/20 bg-slate-900/5 text-slate-500 dark:bg-white/5 dark:text-slate-400'}`}>
                {user.isPremium ? 'Premium' : 'Free'}
              </span>
              {hasPendingPayment && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-amber-500 dark:text-amber-300">
                  <Clock className="h-3.5 w-3.5" />
                  Status: Pending
                </span>
              )}
            </div>

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

      <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-900/10 dark:border-white/20 mb-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <Award className="h-6 w-6 text-amber-400" />
              All Bangladesh Leaderboard
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {leaderboard?.challenge?.title || 'Monthly quiz rank will appear here after result publication.'}
            </p>
          </div>
          {leaderboardLoading && (
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/5 dark:text-slate-300">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Updating
            </span>
          )}
        </div>

        {leaderboardError && (
          <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-300">
            {leaderboardError}
          </div>
        )}

        {leaderboard?.myResult?.submitted && !leaderboard.myResult.published && (
          <div className="mb-5 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-5">
            <p className="font-black text-amber-500 dark:text-amber-300">Your exam has been submitted successfully.</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
              Result will be published after admin approval. Expected publication time: {formatDashboardDate(leaderboard.myResult.resultVisibleAt)}. After publication, your rank and score will appear here.
            </p>
          </div>
        )}

        {leaderboard?.myResult?.published && (
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-400/15 to-sky-400/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-500 dark:text-amber-300">Your Bangladesh Rank</p>
              <div className="mt-2 flex flex-wrap items-end gap-4">
                <div className="text-5xl font-black text-slate-900 dark:text-white">#{leaderboard.myResult.rank}</div>
                <div className="pb-1 text-sm font-bold text-slate-600 dark:text-slate-300">
                  Score {leaderboard.myResult.score}/{leaderboard.myResult.total}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
              <button
                type="button"
                onClick={() => void handleRankShare(false)}
                disabled={sharingRank}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-sky-950/20 transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60"
              >
                {sharingRank ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Rank Card
              </button>
              <button
                type="button"
                onClick={() => void handleRankShare(true)}
                disabled={sharingRank}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#166fe5] disabled:cursor-wait disabled:opacity-60"
              >
                <Share2 className="h-4 w-4" />
                Share FB
              </button>
            </div>
          </div>
        )}

        {leaderboard?.entries.length ? (
          <div className="overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10">
            <div className="grid grid-cols-[72px_1fr_88px] bg-slate-900/5 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <span>Rank</span>
              <span>Student</span>
              <span className="text-right">Score</span>
            </div>
            <div className="divide-y divide-slate-900/10 dark:divide-white/10">
              {leaderboard.entries.slice(0, 10).map(entry => (
                <div key={entry.id} className={`grid grid-cols-[72px_1fr_88px] items-center px-4 py-4 text-sm ${entry.userId === user.id ? 'bg-amber-400/10' : 'bg-white/40 dark:bg-slate-950/35'}`}>
                  <span className="inline-flex items-center gap-2 font-black text-amber-500 dark:text-amber-300">
                    <Medal className="h-4 w-4" />
                    #{entry.rank}
                  </span>
                  <span className="min-w-0 truncate font-bold text-slate-800 dark:text-slate-100">{entry.name}</span>
                  <span className="text-right font-black text-emerald-500 dark:text-emerald-300">{entry.score}/{entry.total}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-900/15 p-8 text-center text-sm font-semibold text-slate-500 dark:border-white/15 dark:text-slate-400">
            Leaderboard will unlock after admin publishes the monthly quiz result.
          </div>
        )}
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
            {enrollments.map((enrollment: any) => {
              const publishedResult = leaderboard?.challenge?.id === enrollment.challengeId ? leaderboard.myResult : null;

              return (
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
                    {publishedResult?.published ? (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{publishedResult.score}/{publishedResult.total}</div>
                        <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider">Rank #{publishedResult.rank}</div>
                      </div>
                    ) : publishedResult?.submitted || enrollment.resultStatus === 'pending' ? (
                      <span className="inline-flex items-center gap-1 text-yellow-500 dark:text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-sm">
                        <Clock className="w-4 h-4" /> Result pending - {formatDashboardDate(publishedResult?.resultVisibleAt || enrollment.resultVisibleAt)}
                      </span>
                    ) : enrollment.paymentStatus === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full text-sm">
                        <Clock className="w-4 h-4" /> Ready to take exam
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">Payment Required</span>
                    )}
                  </div>
                </div>
              );
            })}
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

      <AdBanner placement="dashboard" />
    </div>
  );
}
