'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LanguageSelectorProps = {
  defaultLanguage: 'en' | 'zh';
};

export default function LanguageSelector({ defaultLanguage }: LanguageSelectorProps) {
  const [language, setLanguage] = useState<'en' | 'zh'>(defaultLanguage);
  const router = useRouter();

  useEffect(() => {
    // 从 localStorage 读取保存的语言偏好
    const savedLang = localStorage.getItem('language') as 'en' | 'zh';
    if (savedLang && savedLang !== defaultLanguage) {
      setLanguage(savedLang);
      // 设置 cookie 以便服务端使用
      document.cookie = `language=${savedLang};path=/;max-age=31536000`;
      router.refresh();
    }
  }, [defaultLanguage, router]);

  const handleLanguageChange = (newLang: 'en' | 'zh') => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // 设置 cookie 以便服务端使用
    document.cookie = `language=${newLang};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded ${
          language === 'en'
            ? 'bg-zinc-900 text-white'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('zh')}
        className={`px-3 py-1 rounded ${
          language === 'zh'
            ? 'bg-zinc-900 text-white'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
        }`}
        aria-label="切换到中文"
      >
        中文
      </button>
    </div>
  );
}