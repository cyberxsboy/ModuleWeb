/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Sparkles, AlertCircle, Heart, Star, 
  ExternalLink, Home, ArrowRight, CornerDownRight, Download
} from 'lucide-react';
import { SharedAsset, ParticleType } from '../types';
import { AudioEngine } from './AudioEngine';

interface SharedViewerProps {
  shareId: string;
}

export default function SharedViewer({ shareId }: SharedViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<SharedAsset | null>(null);
  
  // Interactive gesture overlay before playing procedural audio
  const [hasStarted, setHasStarted] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);

  useEffect(() => {
    async function loadShared() {
      try {
        const uppercaseId = shareId.toUpperCase();
        const response = await fetch(`/api/share/${uppercaseId}`);
        if (!response.ok) {
          throw new Error('找不到该分享页面，连接可能已失效。');
        }
        const resJson = await response.json();
        if (resJson.success) {
          setData(resJson);
        } else {
          throw new Error(resJson.error || '加载分享失败');
        }
      } catch (err: any) {
        setError(err.message || '网络通讯异常');
      } finally {
        setLoading(false);
      }
    }
    loadShared();
  }, [shareId]);

  // Clean-up synthesis on exit
  useEffect(() => {
    return () => {
      AudioEngine.stop();
    };
  }, []);

  const handleStartInteraction = () => {
    setHasStarted(true);
    if (data?.cardData && data.cardData.musicTheme !== 'silent') {
      AudioEngine.start(data.cardData.musicTheme);
      setPlayingMusic(true);
    }
  };

  const toggleMusic = () => {
    if (playingMusic) {
      AudioEngine.stop();
      setPlayingMusic(false);
    } else {
      if (data?.cardData) {
        AudioEngine.start(data.cardData.musicTheme);
        setPlayingMusic(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6" style={{ fontFamily: 'Microsoft YaHei' }}>
        <div className="w-12 h-12 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-slate-400">正在安全加载专属魔块分享内容...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center" style={{ fontFamily: 'Microsoft YaHei' }}>
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">加载失败 Error</h2>
        <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{error || '发生未知数据解析异常，请向作者核对网址。'}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
        >
          返回建站主控制台 Home
        </button>
      </div>
    );
  }

  // CASE 1: RENDER SHARED MODULAR WEBSITE
  if (data.type === 'site' && data.siteData) {
    const site = data.siteData;
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col w-full" style={{ fontFamily: 'Microsoft YaHei' }}>
        
        {/* Compact Admin Top Banner */}
        <div className="w-full bg-slate-900 border-b border-slate-800 text-white px-6 py-2 flex justify-between items-center z-50 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded">SHARED</span>
            <span className="font-semibold text-slate-300">魔块静态网站: {site.title}</span>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-indigo-400 font-bold hover:underline py-1"
          >
            我也要搭建新一网
          </button>
        </div>

        {/* Real site top bar */}
        <header className="sticky top-0 bg-white/95 border-b border-slate-200 px-6 py-4 flex justify-between items-center backdrop-blur-sm z-10 w-full shrink-0">
          <span className="text-lg font-bold" style={{ color: site.themeColor }}>{site.title}</span>
          <nav className="flex gap-4 text-xs font-bold text-slate-600">
            {site.blocks.filter(b => b.type !== 'footer').map((block) => (
              <a key={block.id} href={`#block_${block.id}`} className="hover:text-indigo-600 transition-colors uppercase">
                {block.title.substring(0, 6)}
              </a>
            ))}
          </nav>
        </header>

        {/* Custom blocks list scroll stack */}
        <main className="flex-1 w-full">
          {site.blocks.map((block) => {
            const isDark = block.theme === 'dark';
            const isBrand = block.theme === 'brand';
            const align = block.align;
            
            const textAlignment = align === 'center' ? 'text-center items-center justify-center' : align === 'right' ? 'text-right items-end justify-end' : 'text-left items-start justify-start';

            const customStyle: React.CSSProperties = {
              paddingTop: `${block.paddingTop ?? (block.type === 'hero' ? 100 : 70)}px`,
              paddingBottom: `${block.paddingBottom ?? (block.type === 'hero' ? 100 : 70)}px`,
              marginTop: `${block.marginTop ?? 0}px`,
              marginBottom: `${block.marginBottom ?? 0}px`,
              borderRadius: `${block.borderRadius ?? 0}px`,
              fontFamily: 'Microsoft YaHei, "微软雅黑", sans-serif',
            };

            // Background overrides
            if (block.useCustomBgGradient && block.bgGradientCustom) {
              customStyle.background = block.bgGradientCustom;
            } else if (block.bgColorCustom) {
              customStyle.backgroundColor = block.bgColorCustom;
            } else if (isBrand) {
              customStyle.backgroundColor = site.themeColor;
            }

            // Shadow overrides
            if (block.boxShadow === 'sm') {
              customStyle.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
            } else if (block.boxShadow === 'md') {
              customStyle.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
            } else if (block.boxShadow === 'lg') {
              customStyle.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
            } else if (block.boxShadow === 'all-glow') {
              customStyle.boxShadow = `0 0 35px 5px ${site.themeColor || '#6366f1'}33`;
            }

            // Animation class parsing
            const animationClass = block.entranceAnimation && block.entranceAnimation !== 'none'
              ? `elem-anim-${block.entranceAnimation}`
              : '';

            // Dynamic Title, Subtitle & Desc Color
            const titleStyle: React.CSSProperties = block.titleColor ? { color: block.titleColor } : {};
            const subtitleStyle: React.CSSProperties = block.subtitleColor ? { color: block.subtitleColor } : {};
            const descStyle: React.CSSProperties = block.descColor ? { color: block.descColor } : {};

            return (
              <section 
                key={block.id} 
                id={`block_${block.id}`}
                className={`relative transition-all duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : isBrand ? 'bg-indigo-600 text-indigo-50' : 'bg-white text-slate-800'} ${animationClass}`}
                style={customStyle}
              >
                <div className={`max-w-4xl mx-auto flex flex-col ${textAlignment}`}>
                  
                  {/* Category tag */}
                  <span 
                    className={`text-xs font-extrabold uppercase tracking-widest block mb-1.5 ${isDark ? 'text-indigo-400' : isBrand ? 'text-indigo-200' : 'text-slate-500'}`}
                    style={subtitleStyle}
                  >
                    {block.subtitle}
                  </span>

                  {/* Main Title */}
                  <h2 
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 leading-tight"
                    style={titleStyle}
                  >
                    {block.title}
                  </h2>

                  {/* Description */}
                  {block.description && (
                    <p 
                      className={`text-lg leading-relaxed max-w-3xl mb-8 ${isDark ? 'text-slate-300' : isBrand ? 'text-indigo-100' : 'text-slate-600'}`}
                      style={descStyle}
                    >
                      {block.description}
                    </p>
                  )}

                  {/* Feature presets */}
                  {block.type === 'features' && block.items && (
                    <div 
                      className="grid grid-cols-1 gap-6 w-full mt-6 text-left"
                      style={{
                        gridTemplateColumns: `repeat(${block.columns || 3}, minmax(0, 1fr))`
                      }}
                    >
                      {block.items.map(item => (
                        <div 
                          key={item.id} 
                          className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : isBrand ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200/65 hover:border-slate-300'}`}
                          style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs mb-3 shadow" style={{ backgroundColor: site.themeColor }}>
                            ★
                          </div>
                          <h4 className="text-base font-bold mb-2">{item.title}</h4>
                          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* About presets */}
                  {block.type === 'about' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6 items-center text-left">
                      <div className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-300" style={descStyle}>
                        {block.description}
                      </div>
                      {block.image && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                          <img src={block.image} alt="visual design" className="w-full h-auto object-cover max-h-72" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Gallery presets */}
                  {block.type === 'gallery' && block.items && (
                    <div 
                      className="grid grid-cols-1 gap-6 w-full mt-6"
                      style={{
                        gridTemplateColumns: `repeat(${block.columns || 3}, minmax(0, 1fr))`
                      }}
                    >
                      {block.items.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm flex flex-col text-left" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                          {item.image && <img src={item.image} alt="portfolio card" className="w-full h-44 object-cover" referrerPolicy="no-referrer" />}
                          <div className="p-5 flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  {block.type === 'hero' && (
                    <div className="flex gap-3 flex-wrap mt-2">
                      {block.primaryBtn && (
                        <a href={block.primaryBtn.url} className={`px-6 py-3 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow ${isBrand ? 'bg-white text-indigo-700 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`} style={!isBrand && site.themeColor ? { backgroundColor: site.themeColor } : {}}>
                          {block.primaryBtn.text}
                        </a>
                      )}
                      {block.secondaryBtn && (
                        <a href={block.secondaryBtn.url} className="px-6 py-3 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-100/50">
                          {block.secondaryBtn.text}
                        </a>
                      )}
                    </div>
                  )}

                  {block.type === 'cta' && (
                    <div className="flex gap-2 flex-wrap mt-4 justify-center">
                      <a href={block.primaryBtn?.url || '#'} className="px-10 py-3.5 rounded-full text-xs font-bold bg-white text-indigo-700 hover:bg-slate-100 shadow-xl" style={!isBrand && site.themeColor ? { backgroundColor: site.themeColor, color: '#ffffff' } : {}}>
                        {block.primaryBtn?.text || '了解详情'}
                      </a>
                    </div>
                  )}

                </div>
              </section>
            );
          })}
        </main>

        <footer className="bg-slate-950 text-slate-500 text-xs py-10 px-8 text-center border-t border-slate-900 mt-auto shrink-0 font-medium">
          <p className="font-bold text-slate-350 mb-1">{site.title}</p>
          <p>© 2026 二零二六 版权所有 · 本静态网站基于魔块自动平台快速编译生成</p>
        </footer>

      </div>
    );
  }

  // CASE 2: RENDER IMMERSIVE GREETING CARD
  const card = data.cardData!;
  
  // Falling particles engine representation
  const renderVisualParticles = () => {
    if (card.particles === 'none') return null;

    const items = Array.from({ length: 25 });
    return items.map((_, i) => {
      const left = (i * 5.7 * 7) % 100;
      const duration = 6 + (i % 5) * 3;
      const drift = -60 + (i % 4) * 40;
      const delay = -(i * 0.4);

      let content: React.ReactNode = '❄️';
      
      if (card.particles === 'hearts') {
        content = <Heart className="fill-rose-500 stroke-rose-450 opacity-60 w-5 h-5 animate-heartbeat" />;
      } else if (card.particles === 'stars') {
        content = <Star className="fill-yellow-300 stroke-yellow-250 opacity-50 w-4 h-4" />;
      } else if (card.particles === 'confetti') {
        const colors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-sky-400'];
        const randomColor = colors[i % colors.length];
        content = <div className={`w-3.5 h-3.5 rounded-full ${randomColor} opacity-70`} />;
      } else if (card.particles === 'leaves') {
        content = <span className="text-orange-500 font-bold">🍁</span>;
      }

      return (
        <div 
          key={i} 
          className="absolute text-xl pointer-events-none select-none z-10 animate-fall"
          style={{
            left: `${left}%`,
            top: `-20px`,
            '--duration': `${duration}s`,
            '--drift': `${drift}px`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties}
        >
          {content}
        </div>
      );
    });
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center overflow-hidden transition-all select-none"
      style={{
        background: card.bgType === 'gradient' ? card.bgGradient : card.bgColor,
        fontFamily: '"Microsoft YaHei", "微软雅黑"'
      }}
    >
      {/* 2.1 BEFORE STARTING GESTURE OVERLAY SCREEN (Autoplay solver) */}
      {!hasStarted && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl z-50 flex flex-col items-center justify-center text-white text-center p-6 select-all">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] max-w-sm flex flex-col items-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center animate-bounce mb-5">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <h1 className="text-xl font-bold mb-2">为您开启专属动画音乐贺卡</h1>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">您的好友特意为您定制了一张富含动态特效、定制背景、雅致词库与优美合成器自奏音乐的祝福贺卡。</p>

            <button 
              onClick={handleStartInteraction}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex justify-center items-center gap-2 cursor-pointer transition-colors shadow-lg active:scale-95"
            >
              开启幸福信件
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Float player button */}
      {hasStarted && card.musicTheme !== 'silent' && (
        <button 
          onClick={toggleMusic}
          className="absolute top-5 right-5 z-40 bg-black/45 hover:bg-black/85 text-white p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg cursor-pointer"
          title={playingMusic ? '静音' : '播放伴奏'}
        >
          {playingMusic ? <Volume2 className="w-5 h-5 animate-spin" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* Floating back button to platform home */}
      {hasStarted && (
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-5 left-5 z-40 bg-black/45 hover:bg-black/85 text-white/90 py-2 px-3.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg text-xs font-semibold flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          我也来制作一个
        </button>
      )}

      {/* Ambient floating particles */}
      {hasStarted && renderVisualParticles()}

      {/* Central Base64 Media component */}
      {hasStarted && card.mediaUrl && card.mediaType !== 'none' && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 z-0 pointer-events-none">
          <div className="w-full max-w-md max-h-[400px] overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center">
            {card.mediaType === 'video' ? (
              <video 
                src={card.mediaUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={card.mediaUrl} 
                alt="animated design component"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      )}

      {/* Greeting texts with responsive layout (using percentage of browser window) */}
      {hasStarted && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {card.textElements.map(txt => {
            let animStyle = 'animate-heartbeat';
            if (txt.animation === 'bounce') animStyle = 'animate-bounce';
            else if (txt.animation === 'fade') animStyle = 'animate-pulse';
            
            return (
              <div
                key={txt.id}
                style={{
                  left: `${txt.x}%`,
                  top: `${txt.y}%`,
                  transform: 'translate(-50%, -50%)',
                  color: txt.color,
                  fontSize: `${txt.fontSize * 1.15}px`,
                }}
                className={`absolute text-center max-w-lg px-4 leading-relaxed font-bold whitespace-pre-wrap select-all drop-shadow-[0_2.5px_5px_rgba(0,0,0,0.95)] ${animStyle}`}
              >
                {txt.text}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
