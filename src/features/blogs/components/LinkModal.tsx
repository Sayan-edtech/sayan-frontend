import React, { useState } from 'react';
import { X, Link, ExternalLink, Globe } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({ url: '', text: '' });

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?\$/;
    return urlPattern.test(url);
  };

  const handleSubmit = () => {
    const newErrors = { url: '', text: '' };
    
    if (!url.trim()) {
      newErrors.url = 'الرجاء إدخال رابط صحيح';
    } else if (!validateUrl(url)) {
      newErrors.url = 'الرجاء إدخال رابط صحيح';
    }
    
    if (!text.trim()) {
      newErrors.text = 'الرجاء إدخال نص الرابط';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.url && !newErrors.text) {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      onInsert(formattedUrl, text);
      setUrl('');
      setText('');
      setErrors({ url: '', text: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setUrl('');
    setText('');
    setErrors({ url: '', text: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Link className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              إضافة رابط
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              رابط الموقع
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 ${
                errors.url 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-400 bg-white'
              }`}
              dir="ltr"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.url}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              نص الرابط
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب النص الذي سيظهر للرابط"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 ${
                errors.text 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-400 bg-white'
              }`}
              dir="rtl"
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.text}
              </p>
            )}
          </div>
          
          {url && validateUrl(url) && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">معاينة الرابط:</p>
              <div className="flex items-center gap-2 text-blue-600">
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm break-all font-medium">{url.startsWith('http') ? url : `https://${url}`}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            إضافة الرابط
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;