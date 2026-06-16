/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout, Heart, Layers, Sparkles, HelpCircle, Code, Settings } from 'lucide-react';
import SiteBuilder from './components/SiteBuilder';
import CardBuilder from './components/CardBuilder';
import SharedViewer from './components/SharedViewer';

export default function App() {
  const [shareId, setShareId] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<'site' | 'card'>('site');

  // Simple HTML5 Browser History Routing Interceptor
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/share/')) {
      const parts = path.split('/share/');
      const id = parts[1]?.trim().toUpperCase();
      if (id) {
        setShareId(id);
      }
    }
  }, []);

  // If a share ID exists, load the SharedViewer directly
  if (shareId) {
    return <SharedViewer shareId={shareId} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-slate-100 select-none overflow-hidden" style={{ fontFamily: '"Microsoft YaHei", "微软雅黑"' }}>
      
      {/* GLOBAL PLATFORM NAVIGATION HEADER */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center shrink-0 gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-600/20">
            <Layers className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-base font-bold flex items-center gap-2 tracking-tight">
              ModuleWeb 
              <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent text-xs font-semibold">
                Modular Studio v3.0
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">无代码拖拽 · 支持 MD 导入 · GIF视频粒子 · 域名 HTTPS 自动解析部署配置</p>
          </div>
        </div>

        {/* Primary Workspace Tab Switcher */}
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => setActiveWorkspace('site')}
            className={`py-2 px-5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer ${activeWorkspace === 'site' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Layout className="w-4 h-4" />
            🧩 拖拽式网页魔块建站
          </button>
          <button
            onClick={() => setActiveWorkspace('card')}
            className={`py-2 px-5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer ${activeWorkspace === 'card' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Heart className="w-4 h-4 text-rose-450 fill-rose-450" />
            ✉️ 动画个性祝福贺卡
          </button>
        </div>

        {/* Global info controls */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-450">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Code className="w-4 h-4 text-slate-550" />
            雅黑默认字库
          </span>
          <span className="bg-slate-850 py-1.5 px-3 rounded-lg border border-slate-800 text-slate-400">
            静态打包 · 安全免挂
          </span>
        </div>

      </header>

      {/* CORE WORKSPACE CONTENT PANEL */}
      <main className="flex-1 overflow-hidden">
        {activeWorkspace === 'site' ? <SiteBuilder /> : <CardBuilder />}
      </main>

    </div>
  );
}
