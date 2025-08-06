import React, { useState } from 'react';
import { X, Image, Eye, AlertCircle, ImageIcon } from 'lucide-react';

interface ImageUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, alt: string) => void;
}

const ImageUrlModal: React.FC<ImageUrlModalProps> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [errors, setErrors] = useState({ url: '', alt: '' });
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?\.(jpg|jpeg|png|gif|webp|svg)$/i;
    return urlPattern.test(url);
  };

  const handleSubmit = () => {
    const newErrors = { url: '', alt: '' };
    
    if (!url.trim()) {
      newErrors.url = 'الرجاء إدخال رابط الصورة';
    } else if (!validateUrl(url)) {
      newErrors.url = 'الرجاء إدخال رابط صورة صحيح';
    }
    
    if (!alt.trim()) {
      newErrors.alt = 'الرجاء إدخال وصف الصورة';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.url && !newErrors.alt) {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      onInsert(formattedUrl, alt);
      setUrl('');
      setAlt('');
      setErrors({ url: '', alt: '' });
      setImageError(false);
      onClose();
    }
  };

  const handleClose = () => {
    setUrl('');
    setAlt('');
    setErrors({ url: '', alt: '' });
    setImageError(false);
    onClose();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (newUrl && validateUrl(newUrl)) {
      setImageLoading(true);
      setImageError(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Image className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              إضافة صورة من رابط
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
              <ImageIcon className="w-4 h-4" />
              رابط الصورة
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 ${
                errors.url 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white'
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
              وصف الصورة (Alt Text)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="وصف مختصر للصورة"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 ${
                errors.alt 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white'
              }`}
              dir="rtl"
            />
            {errors.alt && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.alt}
              </p>
            )}
          </div>
          
          {/* معاينة الصورة */}
          {url && validateUrl(url) && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                معاينة الصورة:
              </p>
              <div className="relative bg-white rounded-lg p-2 border border-green-100">
                {imageLoading && (
                  <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <p className="text-sm text-gray-500">جاري تحميل الصورة...</p>
                    </div>
                  </div>
                )}
                {imageError && (
                  <div className="flex items-center justify-center h-32 bg-red-50 rounded-md border border-red-200">
                    <div className="text-center">
                      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-600 text-sm font-medium">فشل في تحميل الصورة</p>
                      <p className="text-red-500 text-xs mt-1">تأكد من صحة الرابط</p>
                    </div>
                  </div>
                )}
                <img
                  src={url.startsWith('http') ? url : `https://${url}`}
                  alt={alt || 'معاينة الصورة'}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`max-w-full h-auto max-h-48 rounded-md shadow-sm mx-auto ${
                    imageLoading ? 'hidden' : imageError ? 'hidden' : 'block'
                  }`}
                />
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
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            إضافة الصورة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUrlModal;