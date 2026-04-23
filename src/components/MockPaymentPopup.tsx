import React, { useState } from 'react';
import { X, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
  challengeId: string;
  fee: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MockPaymentPopup({ challengeId, fee, onClose, onSuccess }: Props) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const res = await fetch(`/api/challenges/${challengeId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      });
      if (res.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-pink-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            <span className="font-bold text-lg">bKash Payment Gateway</span>
          </div>
          <button onClick={onClose} className="hover:bg-pink-700 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" alt="bKash" className="h-16 mx-auto mb-2" />
            <h3 className="text-gray-800 font-semibold">HSC ICT Mega Challenge</h3>
            <p className="text-gray-500 text-sm">Invoice: INV-{Math.floor(Math.random() * 100000)}</p>
            <div className="text-3xl font-bold text-pink-600 mt-2">৳ {fee}</div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">Your bKash Account Number</label>
                <input 
                  type="text" 
                  placeholder="e.g 017XXXXXXXX" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={phone.length < 11}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                Proceed
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">Enter bKash PIN</label>
                <input 
                  type="password" 
                  placeholder="Enter PIN" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-center tracking-[0.5em] text-xl text-gray-900"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={5}
                />
              </div>
              <button 
                onClick={handlePay}
                disabled={pin.length < 4 || loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-3 text-center text-xs text-gray-500">
          This is a mock payment gateway for demonstration purposes.
        </div>
      </div>
    </div>
  );
}
