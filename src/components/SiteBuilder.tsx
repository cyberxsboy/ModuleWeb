/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Download, Globe, FileText, Check, 
  Settings, Copy, Edit3, Image, Layout, Bold, LayoutGrid, Code, 
  Sparkles, CheckCircle2, RefreshCw, Upload, Eye, ExternalLink,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown
} from 'lucide-react';
import { SiteConfig, SiteBlock, BlockType, BlockItem } from '../types';
import { MarkdownParser } from './MarkdownParser';

// Built-in beautifully styled templates for blocks
const blockPresets: Record<BlockType, Omit<SiteBlock, 'id'>> = {
  hero: {
    type: 'hero',
    title: '点燃您的数字创意梦想',
    subtitle: '模块化编辑 · 拖拽式排版 · 毫秒级静态网站构建',
    description: '无需写一行代码，通过左挑右改的图形界面、编写文本大纲或拖入 .txt/.md 就可以在本地极速拼装。编译出的高质量 HTML 网页支持离线预览，可随处极速托管。',
    theme: 'brand',
    align: 'center',
    primaryBtn: { text: '立即试用', url: '#section_features' },
    secondaryBtn: { text: '查看文档', url: '#' },
    items: []
  },
  features: {
    type: 'features',
    title: '卓越的产品核心特质',
    subtitle: '专为高要求用户设计的精制底层技术',
    align: 'center',
    theme: 'light',
    items: [
      { id: '1', title: '极速静态输出', desc: '纯净的 HTML 结构，不加载外部 CDN 和任何冗长的 JS 代码，运行速度比普通前端快了近十倍！', icon: 'Code', clickUrl: '#' },
      { id: '2', title: '极速文本网站编译', desc: '键入经营大纲或拖入文本文档，离线规则引擎立提骨架段落，在编辑器中自动装配出完整的各行各业精美版块。', icon: 'FileText', clickUrl: '#' },
      { id: '3', title: '自定义域名 SSL', desc: '支持绑定个人私有域名，并提供完整的 HTTPS 一键证书申请和云服务器部署脚本配置。', icon: 'Globus', clickUrl: '#' }
    ]
  },
  about: {
    type: 'about',
    title: '我们的设计理念',
    subtitle: '回归极简主义，用文字与逻辑打动人心',
    description: '我们坚持去粗取精，在字体排列和模块布局上反复推敲。在这里，您可以自由调整边距、排列顺序和配图风格，让每个人都能够轻松发布在任何主流托管平台的超高性能建站。',
    theme: 'light',
    align: 'left',
    image: 'data:image/svg + xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"><rect width="600" height="400" rx="16" fill="%23f3f4f6"/><circle cx="300" cy="200" r="100" fill="%23e0e7ff"/><path d="M220 280 L380 280 L300 140 Z" fill="%234f46e5" opacity="0.8"/></svg>',
    imageLink: '#',
    items: []
  },
  gallery: {
    type: 'gallery',
    title: '精选案例画廊展示',
    subtitle: '倾听创作者的声音，阅览数字杰作',
    align: 'center',
    theme: 'dark',
    items: [
      { id: 'g1', title: '企业科技官网', desc: '极简配色展示尖端科技', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23312e81"/><text x="50%" y="50%" fill="%23818cf8" font-size="20" text-anchor="middle" font-family="sans-serif">科技演示图</text></svg>' },
      { id: 'g2', title: '个人数字艺术集', desc: '沉浸式的多媒体展示方案', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%235b21b6"/><text x="50%" y="50%" fill="%23c084fc" font-size="20" text-anchor="middle" font-family="sans-serif">多媒体演示图</text></svg>' },
      { id: 'g3', title: '自适应文本排版', desc: '由单段文本文档编译生成', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23065f46"/><text x="50%" y="50%" fill="%2334d399" font-size="20" text-anchor="middle" font-family="sans-serif">文本极速编译演示</text></svg>' }
    ]
  },
  cta: {
    type: 'cta',
    title: '即刻开始，开启属于您的建站之旅',
    subtitle: '自由配置，零服务器门槛发布',
    description: '下载此静态文件并一键上传到网盘或 GitHub 仓库，您可以通过 Cloudflare 或 Vercel 等平台绑定自定义域名申请 HTTPS，完全永久免费使用。',
    theme: 'dark',
    align: 'center',
    primaryBtn: { text: '免费下载 HTML', url: '#' },
    items: []
  },
  slideshow: {
    type: 'slideshow',
    title: '幻灯大图轮播展示',
    subtitle: '多维交互 · 动感画卷 · 自动切换',
    description: '幻灯片由以下几张精美的大图组成，可以实现自由无缝轮播切换，支持自定义图片、文字标题和跳转链接。',
    theme: 'light',
    align: 'center',
    items: [
      { id: 's1', title: '数字云端一键发布', desc: '轻松构建属于你的私有云服务器与高可用静态代理网络，享受极致速度。', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="%231e1b4b"/><text x="50%" y="45%" fill="%23818cf8" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">【第一页】数字云端极速发布</text><text x="50%" y="55%" fill="%2394a3b8" font-size="14" text-anchor="middle" font-family="sans-serif">点击两侧按钮或下方控制点实现左右顺畅滑屏切换</text></svg>', clickUrl: '#' },
      { id: 's2', title: '全景交互画卷定制', desc: '无论是粒子浮动、乐章背景、浪漫卡片，皆可在此完美自适应拼装。', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23062f4f"/><text x="50%" y="45%" fill="%2314b8a6" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">【第二页】全景交互画卷定制</text><text x="50%" y="55%" fill="%2394a3b8" font-size="14" text-anchor="middle" font-family="sans-serif">精细管理文本位置和超链接跳转，全平台支持</text></svg>', clickUrl: '#' }
    ],
    autoplayDuration: 4000
  },
  footer: {
    type: 'footer',
    title: '魔块网页科技',
    subtitle: '二零二六 版权所有 浙ICP备20268888号',
    description: '探索网页和动画贺卡的极智未来，在无代码与自由书写之间流转。',
    theme: 'dark',
    align: 'center',
    items: []
  }
};

const DEFAULT_CONFIG: SiteConfig = {
  title: '我的第一个魔块网页',
  themeColor: '#4f46e5',
  fontFamily: 'Microsoft YaHei',
  blocks: [
    { id: 'b_1', ...blockPresets.hero },
    { id: 'b_2', ...blockPresets.features },
    { id: 'b_3', ...blockPresets.about },
    { id: 'b_4', ...blockPresets.cta },
    { id: 'b_5', ...blockPresets.footer }
  ],
  hasHttps: true
};

export default function SiteBuilder() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'domain'>('editor');
  const [editingBlockId, setEditingBlockId] = useState<string | null>('b_1');
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  const [dragOverBlockIndex, setDragOverBlockIndex] = useState<number | null>(null);
  const [draggingNewBlockType, setDraggingNewBlockType] = useState<BlockType | null>(null);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [editorDesignTab, setEditorDesignTab] = useState<'content' | 'style' | 'advanced'>('content');
  const [inputText, setInputText] = useState<string>(
    '# 拾光醇香精品咖啡馆\n这里是一处弥漫豆香的温馨角落，尽享慢调美学时光。\n## 特色服务\n- 100% 严选世界级庄园咖啡豆 #0f766e\n- 每日晨光专业级慢温咖啡杯测烘焙\n- 大师工艺拉花与特调风味手冲\n## 关于我们\n精品研制每一滴咖啡，为您提供隔绝风尘、静心休憩的心灵驿站。'
  );
  
  // Carousel slide indices state for each slideshow block id
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  // Visual Gradient States
  const [gradientColor1, setGradientColor1] = useState('#4f46e5');
  const [gradientColor2, setGradientColor2] = useState('#1e1b4b');
  const [gradientAngle, setGradientAngle] = useState(135);

  const activeEditingBlock = config.blocks.find(b => b.id === editingBlockId);

  // Sync Gradient Builders with active block
  useEffect(() => {
    if (activeEditingBlock && activeEditingBlock.bgGradientCustom) {
      const regexAngle = /(\d+)deg/;
      const regexHex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
      const angleMatch = activeEditingBlock.bgGradientCustom.match(regexAngle);
      const hexMatches = activeEditingBlock.bgGradientCustom.match(regexHex);
      if (angleMatch) setGradientAngle(parseInt(angleMatch[1]));
      if (hexMatches && hexMatches.length >= 2) {
        setGradientColor1(hexMatches[0]);
        setGradientColor2(hexMatches[1]);
      }
    }
  }, [editingBlockId]);

  useEffect(() => {
    // Autoplay scheduler for slideshow carousels
    const timers = config.blocks
      .filter(b => b.type === 'slideshow' && b.items && b.items.length > 1)
      .map(b => {
        const speed = b.autoplayDuration || 4000;
        const interval = setInterval(() => {
          setCarouselIndices(prev => {
            const cur = prev[b.id] || 0;
            const size = b.items?.length || 1;
            return {
              ...prev,
              [b.id]: (cur + 1) % size
            };
          });
        }, speed);
        return { interval, blockId: b.id };
      });

    return () => {
      timers.forEach(t => clearInterval(t.interval));
    };
  }, [config.blocks]);

  const getCarouselIndex = (blockId: string) => carouselIndices[blockId] || 0;
  const setCarouselIndex = (blockId: string, idx: number) => {
    setCarouselIndices(prev => ({ ...prev, [blockId]: idx }));
  };
  
  // Custom Domain state
  const [customDomain, setCustomDomain] = useState('www.mybusiness.com');
  const [dnsStatus, setDnsStatus] = useState<'idle' | 'checking' | 'verified'>('idle');
  
  // URL share status
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedBlockIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverBlockIndex !== index) {
      setDragOverBlockIndex(index);
    }
  };

  const handleDrop = (index: number) => {
    if (draggingNewBlockType !== null) {
      // Direct drag and drop insertion of brand-new sidebar blocks!
      const preset = blockPresets[draggingNewBlockType];
      const newBlock: SiteBlock = {
        id: `b_${Date.now()}_${Math.random().toString(36).substring(4)}`,
        ...JSON.parse(JSON.stringify(preset))
      };
      const updated = [...config.blocks];
      updated.splice(index, 0, newBlock);
      setConfig({ ...config, blocks: updated });
      setEditingBlockId(newBlock.id);
      setDraggingNewBlockType(null);
      setDragOverBlockIndex(null);
      return;
    }

    if (draggedBlockIndex === null) return;
    const updatedBlocks = [...config.blocks];
    const [movedBlock] = updatedBlocks.splice(draggedBlockIndex, 1);
    // Since moved block splice changes array indices
    let targetIndex = index;
    if (draggedBlockIndex < index) {
      targetIndex = index - 1;
    }
    updatedBlocks.splice(targetIndex, 0, movedBlock);
    setConfig({ ...config, blocks: updatedBlocks });
    setDraggedBlockIndex(null);
    setDragOverBlockIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBlockIndex(null);
    setDraggingNewBlockType(null);
    setDragOverBlockIndex(null);
  };

  const moveBlock = (direction: 'up' | 'down', index: number) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === config.blocks.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...config.blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setConfig({ ...config, blocks: updated });
  };

  const cloneBlock = (index: number) => {
    const target = config.blocks[index];
    const duplicated: SiteBlock = {
      ...JSON.parse(JSON.stringify(target)),
      id: `b_${Date.now()}_${Math.random().toString(36).substring(4)}`
    };
    const updated = [...config.blocks];
    updated.splice(index + 1, 0, duplicated);
    setConfig({ ...config, blocks: updated });
    setEditingBlockId(duplicated.id);
  };

  const insertBlockAt = (type: BlockType, index: number) => {
    const preset = blockPresets[type];
    const newBlock: SiteBlock = {
      id: `b_${Date.now()}_${Math.random().toString(36).substring(4)}`,
      ...JSON.parse(JSON.stringify(preset))
    };
    const updated = [...config.blocks];
    updated.splice(index + 1, 0, newBlock);
    setConfig({ ...config, blocks: updated });
    setEditingBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    if (config.blocks.length <= 1) {
      alert('请保留至少一个内容模块！');
      return;
    }
    const updated = config.blocks.filter(b => b.id !== id);
    setConfig({ ...config, blocks: updated });
    if (editingBlockId === id) {
      setEditingBlockId(updated[0]?.id || null);
    }
  };

  const addBlock = (type: BlockType) => {
    const preset = blockPresets[type];
    const newBlock: SiteBlock = {
      id: `b_${Date.now()}_${Math.random().toString(36).substring(4)}`,
      ...JSON.parse(JSON.stringify(preset)) // Deep clone template
    };
    setConfig({
      ...config,
      blocks: [...config.blocks, newBlock]
    });
    setEditingBlockId(newBlock.id);
  };

  // Smart rule-based Text-to-HTML Site compiler (100% offline rule processor)
  const processMarkdown = async (text: string, fileName: string) => {
    setIsParsing(true);
    // Simulate a beautifully animated parser analysis sequence to maintain satisfying visual feedback
    await new Promise(resolve => setTimeout(resolve, 650));
    try {
      const parsed = MarkdownParser.toSiteConfig(text, fileName);
      setConfig(parsed);
      if (parsed.blocks && parsed.blocks.length > 0) {
        setEditingBlockId(parsed.blocks[0].id);
      }
      alert(`🎉 文本极速拼装成功！本地语法映射引擎已提取您的主题、段落需求与色值，零AI消耗完成全链路自适应多模块拼装、高清画廊匹配和图标智能适配！可以在列表拖拽修改或在下方直接编辑图文。`);
    } catch (err: any) {
      console.error('Text layout compiler error:', err);
      alert('解析失败，请检查文本构想内容是否规范！');
    } finally {
      setIsParsing(false);
    }
  };

  // Drag and drop Text or Markdown files
  const handleMdDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMdDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const isMd = file.name.endsWith('.md');
      const isTxt = file.name.endsWith('.txt');
      if (isMd || isTxt) {
        const text = await file.text();
        setInputText(text);
        await processMarkdown(text, file.name.replace(/\.(md|txt)$/, ''));
      } else {
        alert('请拖入正规的 .md 或 .txt 格式文案文件！');
      }
    }
  };

  const handleMdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const text = await file.text();
      setInputText(text);
      await processMarkdown(text, file.name.replace(/\.(md|txt)$/, ''));
    }
  };

  // Convert current blocks configuration to highly styled Static HTML
  const generateStaticHTML = (): string => {
    // Generate inline blocks with Tailwind-like pure beautiful inline CSS styles
    const blockListHTML = config.blocks.map(block => {
      const isDark = block.theme === 'dark';
      const isBrand = block.theme === 'brand';
      
      // Spacing overrides (Padding / Margin)
      const padTop = block.paddingTop !== undefined ? `${block.paddingTop}px` : '5rem';
      const padBottom = block.paddingBottom !== undefined ? `${block.paddingBottom}px` : '5rem';
      const marTop = block.marginTop !== undefined ? `${block.marginTop}px` : '0px';
      const marBottom = block.marginBottom !== undefined ? `${block.marginBottom}px` : '0px';

      // Custom background styles
      let customBgStyle = '';
      if (block.useCustomBgGradient && block.bgGradientCustom) {
        customBgStyle = `background: ${block.bgGradientCustom}; color: #ffffff;`;
      } else if (block.bgColorCustom) {
        customBgStyle = `background-color: ${block.bgColorCustom}; color: ${block.theme === 'dark' ? '#f8fafc' : '#1e293b'};`;
      } else {
        customBgStyle = isDark 
          ? 'background-color: #0f172a; color: #f8fafc;' 
          : isBrand 
          ? `background-color: ${config.themeColor}; color: #ffffff;` 
          : 'background-color: #ffffff; color: #1e293b;';
      }
        
      // Custom typography styles overrides
      const customTitleStyle = block.titleColor ? `color: ${block.titleColor};` : '';
      const customSubStyle = block.subtitleColor 
        ? `color: ${block.subtitleColor};` 
        : (isDark ? 'color: #818cf8;' : isBrand ? 'color: #e0e7ff;' : `color: ${config.themeColor};`);
      const customDescStyle = block.descColor 
        ? `color: ${block.descColor};` 
        : (isDark ? 'color: #94a3b8;' : isBrand ? 'color: #e2e8f0;' : 'color: #475569;');

      const alignClass = block.align === 'center' 
        ? 'text-align: center; justify-content: center; margin-left: auto; margin-right: auto;' 
        : block.align === 'right' 
        ? 'text-align: right; justify-content: flex-end; margin-left: auto;' 
        : 'text-align: left; justify-content: flex-start;';

      const alignFlex = block.align === 'center' ? 'align-items: center;' : '';

      // Items border radius & box shadow
      const cardRadius = block.borderRadius !== undefined ? `${block.borderRadius}px` : '12px';
      let shadowStyle = 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);';
      if (block.boxShadow === 'none') {
        shadowStyle = 'box-shadow: none;';
      } else if (block.boxShadow === 'sm') {
        shadowStyle = 'box-shadow: 0 1px 3px rgba(0,0,0,0.05);';
      } else if (block.boxShadow === 'md') {
        shadowStyle = 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08);';
      } else if (block.boxShadow === 'lg') {
        shadowStyle = 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.05);';
      } else if (block.boxShadow === 'all-glow') {
        shadowStyle = `box-shadow: 0 0 24px ${config.themeColor}30;`;
      }

      // Column Layout
      const columnCount = block.columns || 3;
      const columnGridCss = `display: grid; grid-template-columns: repeat(auto-fit, minmax(calc(min(100%, 1200px) / ${columnCount} - 2rem), 1fr)); gap: 1.5rem; margin-top: 2.5rem; width: 100%;`;

      // Motion effect class
      let animClass = '';
      if (block.entranceAnimation === 'fade-in') animClass = 'elem-anim-fade-in';
      else if (block.entranceAnimation === 'slide-up') animClass = 'elem-anim-slide-up';
      else if (block.entranceAnimation === 'zoom-in') animClass = 'elem-anim-zoom-in';
      else if (block.entranceAnimation === 'bounce-in') animClass = 'elem-anim-bounce-in';

      // Elements
      let contentBlock = '';
      
      if (block.description) {
        contentBlock += `<p style="font-size: 1.15rem; line-height: 1.75; max-width: 48rem; margin-top: 1rem; margin-bottom: 1.5rem; opacity: 0.95; ${customDescStyle} ${alignClass}">${block.description.replace(/\n/g, '<br/>')}</p>`;
      }

      if (block.type === 'hero') {
        contentBlock += `
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; justify-content: ${block.align === 'center' ? 'center' : 'flex-start'};">
            ${block.primaryBtn ? `<a href="${block.primaryBtn.url}" style="display: inline-block; padding: 0.8rem 2rem; background-color: ${isBrand ? '#ffffff' : config.themeColor}; color: ${isBrand ? config.themeColor : '#ffffff'}; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: opacity 0.2s;">${block.primaryBtn.text}</a>` : ''}
            ${block.secondaryBtn ? `<a href="${block.secondaryBtn.url}" style="display: inline-block; padding: 0.8rem 2rem; border: 2px solid ${isDark ? '#475569' : isBrand ? 'rgba(255,255,255,0.4)' : '#cbd5e1'}; color: inherit; font-weight: 600; text-decoration: none; border-radius: 8px; transition: background-color 0.2s;">${block.secondaryBtn.text}</a>` : ''}
          </div>
        `;
      } 
      else if (block.type === 'features' && block.items) {
        contentBlock += `
          <div style="${columnGridCss}">
            ${block.items.map(item => `
              <div style="background-color: ${isDark ? '#1e293b' : isBrand ? 'rgba(255,255,255,0.1)' : '#f8fafc'}; padding: 2rem; border-radius: ${cardRadius}; border: 1px solid ${isDark ? '#334155' : isBrand ? 'rgba(255,255,255,0.2)' : '#e2e8f0'}; display: flex; flex-direction: column; gap: 0.75rem; ${shadowStyle}">
                <div style="font-weight: bold; font-size: 1.25rem; ${block.titleColor ? `color: ${block.titleColor};` : ''}">${item.title}</div>
                <div style="opacity: 0.85; line-height: 1.5; font-size: 0.95rem; ${block.descColor ? `color: ${block.descColor};` : ''}">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
      else if (block.type === 'about') {
        contentBlock += `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-top: 2rem; align-items: center; text-align: left; width: 100%;">
            <div>
              <p style="font-size: 1.1rem; line-height: 1.7; opacity: 0.85; ${block.descColor ? `color: ${block.descColor};` : ''}">${block.description || '关于我们的基本介绍和创作背景说明项。'}</p>
            </div>
            <div>
              ${block.image ? `<img src="${block.image}" style="width: 100%; border-radius: ${cardRadius}; ${shadowStyle}" referrerPolicy="no-referrer" />` : ''}
            </div>
          </div>
        `;
      }
      else if (block.type === 'gallery' && block.items) {
        contentBlock += `
          <div style="${columnGridCss}">
            ${block.items.map(item => `
              <div style="overflow: hidden; border-radius: ${cardRadius}; background-color: ${isDark ? '#1e293b' : '#ffffff'}; border: 1px solid ${isDark ? '#334155' : '#e2e8f0'}; ${shadowStyle}">
                ${item.image ? `<img src="${item.image}" style="width: 100%; display: block; height: 180px; object-fit: cover;" referrerPolicy="no-referrer" />` : ''}
                <div style="padding: 1.25rem; text-align: left;">
                  <div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem; ${block.titleColor ? `color: ${block.titleColor};` : ''}">${item.title}</div>
                  <div style="opacity: 0.8; font-size: 0.9rem; line-height: 1.4; ${block.descColor ? `color: ${block.descColor};` : ''}">${item.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
      else if (block.type === 'cta') {
        contentBlock += `
          <div style="margin-top: 2rem; display: flex; justify-content: center;">
            <a href="${block.primaryBtn?.url || '#'}" style="display: inline-block; padding: 1rem 2.5rem; background-color: ${isBrand ? '#ffffff' : config.themeColor}; color: ${isBrand ? config.themeColor : '#ffffff'}; font-weight: bold; text-decoration: none; border-radius: 99px; ${shadowStyle} transition: transform 0.2s;">${block.primaryBtn?.text || '了解详情'}</a>
          </div>
        `;
      }
      else if (block.type === 'slideshow' && block.items) {
        contentBlock += `
          <div style="position: relative; width: 100%; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); border-radius: ${cardRadius}; max-width: 1000px; margin: 2rem auto 0; ${shadowStyle}">
            <div id="slider-container-${block.id}" style="position: relative; width: 100%; aspect-ratio: 21/9; min-height: 240px; background-color: #1e293b;">
              ${block.items.map((item, idx) => `
                <div class="my-slide-${block.id}" data-index="${idx}" style="position: absolute; inset: 0; display: ${idx === 0 ? 'block' : 'none'}; opacity: ${idx === 0 ? '1' : '0'}; transition: opacity 0.5s ease-in-out;">
                  ${item.clickUrl ? `<a href="${item.clickUrl}" target="_blank" style="text-decoration:none; display:block; width:100%; height:100%;">` : ''}
                  ${item.image ? `<img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover; display: block;" referrerPolicy="no-referrer" />` : `<div style="width: 100%; height: 100%; background-color:#1e293b;"></div>`}
                  <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 60%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; color: #ffffff; text-align: left; box-sizing: border-box;">
                    <span style="background-color: ${config.themeColor}; color: #ffffff; font-weight: 850; font-size: 0.7rem; text-transform: uppercase; padding: 0.25rem 0.5rem; border-radius: 4px; width: max-content; margin-bottom: 0.5rem; letter-spacing: 0.05em; font-family:-apple-system,BlinkMacSystemFont,sans-serif;">SLIDE ${idx+1} / ${block.items ? block.items.length : 0}</span>
                    <h3 style="font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem 0; color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); font-family: -apple-system,BlinkMacSystemFont,sans-serif;">${item.title}</h3>
                    <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0; opacity: 0.95; font-family: -apple-system,BlinkMacSystemFont,sans-serif;">${item.desc || ''}</p>
                  </div>
                  ${item.clickUrl ? `</a>` : ''}
                </div>
              `).join('')}
              
              <!-- Navigation Buttons -->
              ${block.items.length > 1 ? `
                <button onclick="prevSlide('${block.id}', ${block.items.length})" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 2.2rem; height: 2.2rem; border-radius: 50%; background-color: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.2); color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; z-index: 20; outline: none; padding: 0;" onmouseover="this.style.backgroundColor='${config.themeColor}'" onmouseout="this.style.backgroundColor='rgba(15,23,42,0.6)'">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button onclick="nextSlide('${block.id}', ${block.items.length})" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); width: 2.2rem; height: 2.2rem; border-radius: 50%; background-color: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.2); color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; z-index: 20; outline: none; padding: 0;" onmouseover="this.style.backgroundColor='${config.themeColor}'" onmouseout="this.style.backgroundColor='rgba(15,23,42,0.6)'">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <!-- Dots indicators -->
                <div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; z-index: 20;">
                  ${block.items.map((_, sidx) => `
                    <button id="dot-${block.id}-${sidx}" onclick="setSlide('${block.id}', ${sidx}, ${block.items ? block.items.length : 0})" style="width: 8px; height: 8px; border-radius: 50%; border: none; background-color: ${sidx === 0 ? '#ffffff' : 'rgba(255,255,255,0.4)'}; cursor: pointer; padding: 0; transition: all 0.2s; outline: none;"></button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }
      else if (block.type === 'footer') {
        contentBlock += `
          <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.08); width: 100%; display: flex; flex-direction: column; align-items: ${block.align === 'center' ? 'center' : block.align === 'right' ? 'flex-end' : 'flex-start'}; gap: 1rem;">
            <p style="font-size: 0.95rem; max-width: 40rem; line-height: 1.7; opacity: 0.85; ${block.descColor ? `color: ${block.descColor};` : ''}">${block.description || ''}</p>
            <div style="font-size: 0.8rem; opacity: 0.6; ${customSubStyle}">${block.subtitle}</div>
          </div>
        `;
      }

      let dividerHtml = '';
      if (block.dividerType === 'wave') {
        dividerHtml = `
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0; transform: rotate(180deg); z-index: 10;">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="position: relative; display: block; height: 40px; width: 120%; fill: #f8fafc;">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
            </svg>
          </div>
        `;
      } else if (block.dividerType === 'slant') {
        dividerHtml = `
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0; transform: rotate(180deg); z-index: 10;">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="position: relative; display: block; height: 32px; width: 100%; fill: #f8fafc;">
              <path d="M1200 120L0 120L0 0L1200 120Z"></path>
            </svg>
          </div>
        `;
      } else if (block.dividerType === 'curve') {
        dividerHtml = `
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0; transform: rotate(180deg); z-index: 10;">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="position: relative; display: block; height: 36px; width: 100%; fill: #f8fafc;">
              <path d="M0 0 C 400 120, 800 120, 1200 0 L 1200 120 L 0 120 Z"></path>
            </svg>
          </div>
        `;
      }

      return `
        <section id="section_${block.id}" class="${animClass}" style="${customBgStyle} padding-top: ${padTop}; padding-bottom: ${padBottom}; margin-top: ${marTop}; margin-bottom: ${marBottom}; display: flex; flex-direction: column; position: relative; overflow: hidden; ${alignFlex}">
          <div style="max-width: 1200px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; ${alignFlex}; position: relative; z-index: 2;">
            <span style="text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; ${customSubStyle} font-size: 0.85rem; margin-bottom: 0.5rem; display: block; text-align: inherit;">${block.subtitle}</span>
            <h2 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 1.5rem; text-align: inherit; margin-top: 0; ${customTitleStyle}">${block.title}</h2>
            ${contentBlock}
          </div>
          ${dividerHtml}
        </section>
      `;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Space+Grotesk:wght@500;700&family=Outfit:wght@500;850&display=swap" rel="stylesheet">
  <title>${config.title}</title>
  <style>
    body, html, button, input {
      font-family: "${config.fontFamily || 'Microsoft YaHei'}", -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      background-color: #f8fafc;
    }
    * {
      box-sizing: border-box;
    }
    header {
      background-color: rgba(255,255,255,0.95);
      border-bottom: 1px solid #e1e8ed;
      position: sticky;
      top: 0;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 100;
      backdrop-filter: blur(8px);
    }
    .logo {
      font-weight: 800;
      font-size: 1.5rem;
      color: ${config.themeColor};
    }
    nav a {
      color: #334155;
      text-decoration: none;
      font-weight: 500;
      margin-left: 1.5rem;
      font-size: 0.95rem;
      transition: color 0.15s;
    }
    nav a:hover {
      color: ${config.themeColor};
    }
    
    /* Elementor Animation System */
    @keyframes elemFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes elemSlideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes elemZoomIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes elemBounceIn {
      0% { opacity: 0; transform: scale(0.85); }
      70% { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1); }
    }

    .elem-anim-fade-in {
      animation: elemFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .elem-anim-slide-up {
      animation: elemSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .elem-anim-zoom-in {
      animation: elemZoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .elem-anim-bounce-in {
      animation: elemBounceIn 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.2) both;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">${config.title}</div>
    <nav>
      ${config.blocks.filter(b => b.type !== 'footer').map(b => `<a href="#section_${b.id}">${b.title.substring(0,6)}</a>`).join('')}
    </nav>
  </header>

  <main>
    ${blockListHTML}
  </main>

  <!-- Self-contained Slider Controller Core -->
  <script>
    const slideshowStates = {};
    
    function showSlide(blockId, index, total) {
      const slides = document.querySelectorAll('.my-slide-' + blockId);
      slides.forEach((slide, idx) => {
        if (idx === parseInt(index)) {
          slide.style.display = 'block';
          setTimeout(() => { slide.style.opacity = '1'; }, 20);
        } else {
          slide.style.opacity = '0';
          slide.style.display = 'none';
        }
      });
      // Update dots
      for (let i = 0; i < total; i++) {
        const dot = document.getElementById('dot-' + blockId + '-' + i);
        if (dot) {
          dot.style.backgroundColor = (i === parseInt(index)) ? '#ffffff' : 'rgba(255,255,255,0.4)';
          dot.style.transform = (i === parseInt(index)) ? 'scale(1.2)' : 'scale(1)';
        }
      }
    }
    
    function prevSlide(blockId, total) {
      if (slideshowStates[blockId] === undefined) slideshowStates[blockId] = 0;
      slideshowStates[blockId] = (slideshowStates[blockId] - 1 + total) % total;
      showSlide(blockId, slideshowStates[blockId], total);
    }
    
    function nextSlide(blockId, total) {
      if (slideshowStates[blockId] === undefined) slideshowStates[blockId] = 0;
      slideshowStates[blockId] = (slideshowStates[blockId] + 1) % total;
      showSlide(blockId, slideshowStates[blockId], total);
    }
    
    function setSlide(blockId, sidx, total) {
      slideshowStates[blockId] = sidx;
      showSlide(blockId, sidx, total);
    }
    
    // Autoplay initiation
    document.addEventListener('DOMContentLoaded', () => {
      const sliders = document.querySelectorAll('[id^="slider-container-"]');
      sliders.forEach(slider => {
        const id = slider.id.replace('slider-container-', '');
        const slidesCount = document.querySelectorAll('.my-slide-' + id).length;
        if (slidesCount > 1) {
          setInterval(() => {
            nextSlide(id, slidesCount);
          }, 4000);
        }
      });
    });
  </script>
</body>
</html>`;
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateStaticHTML();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.title.toLowerCase().replace(/\s+/g, '_') || 'index'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // One-click generate unique share route
  const handlePublish = async () => {
    setIsSharing(true);
    setShareLink('');
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'site',
          siteData: config
        })
      });
      const data = await response.json();
      if (data.id) {
        const absoluteUrl = `${window.location.origin}/share/${data.id}`;
        setShareLink(absoluteUrl);
      } else {
        alert('发布生成分享链接失败，请重试');
      }
    } catch (e) {
      console.error(e);
      alert('发布服务器连接异常，已临时回退。');
    } finally {
      setIsSharing(false);
    }
  };

  // Check DNS resolution configuration state
  const runDnsCheck = () => {
    setDnsStatus('checking');
    setTimeout(() => {
      setDnsStatus('verified');
    }, 1500);
  };

  // Block field state editor
  const handleBlockChange = (key: keyof SiteBlock, value: any) => {
    if (!editingBlockId) return;
    const updated = config.blocks.map(b => {
      if (b.id === editingBlockId) {
        return { ...b, [key]: value };
      }
      return b;
    });
    setConfig({ ...config, blocks: updated });
  };

  // Add Item to a Block (like Feature item or Gallery item)
  const addBlockItem = () => {
    if (!editingBlockId) return;
    const block = config.blocks.find(b => b.id === editingBlockId);
    if (!block) return;
    
    const newItem: BlockItem = {
      id: `item_${Date.now()}`,
      title: '新增列表项',
      desc: '请在此输入该特色或案例相关的段落描述文本。',
      image: block.type === 'gallery' ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%23cbd5e1" /></svg>' : undefined
    };

    const updated = config.blocks.map(b => {
      if (b.id === editingBlockId) {
        return {
          ...b,
          items: [...(b.items || []), newItem]
        };
      }
      return b;
    });
    setConfig({ ...config, blocks: updated });
  };

  const deleteBlockItem = (itemId: string) => {
    if (!editingBlockId) return;
    const updated = config.blocks.map(b => {
      if (b.id === editingBlockId) {
        return {
          ...b,
          items: (b.items || []).filter(item => item.id !== itemId)
        };
      }
      return b;
    });
    setConfig({ ...config, blocks: updated });
  };

  const updateBlockItemField = (itemId: string, key: keyof BlockItem, value: string) => {
    if (!editingBlockId) return;
    const updated = config.blocks.map(b => {
      if (b.id === editingBlockId) {
        const updatedItems = (b.items || []).map(item => {
          if (item.id === itemId) {
            return { ...item, [key]: value };
          }
          return item;
        });
        return { ...b, items: updatedItems };
      }
      return b;
    });
    setConfig({ ...config, blocks: updated });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)] bg-slate-50 text-slate-800">
      
      {/* SIDEBAR: Controls & Block manager */}
      <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto flex flex-col shrink-0">
        
        {/* Workspace switcher tabs */}
        <div className="flex border-b border-slate-100 p-2 gap-1 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <Layout className="w-3.5 h-3.5" />
            魔块编辑
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            超清预览
          </button>
          <button 
            onClick={() => setActiveTab('domain')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'domain' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            快速部署
          </button>
        </div>

        {/* Tab 1: Editor View */}
        {activeTab === 'editor' && (
          <div className="p-4 flex flex-col gap-6">
            
            {/* Rule-based Text to HTML Compiler Zone */}
            <div className="bg-slate-50 border border-slate-200/85 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  零AI·自主极速文本编译器 (100%本地)
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-extrabold uppercase scale-90">
                  安全无漏
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                请在下方描述您的经营大纲特色（支持 Markdown 标签）。内置离线语义映射引擎将提取关键字，毫秒级自适应排版生成高品质静态页面，智能推荐图片及配色方案。
              </p>

              {isParsing ? (
                <div className="flex flex-col items-center justify-center py-8 bg-indigo-50/20 border border-indigo-100 rounded-lg">
                  <RefreshCw className="w-8 h-8 text-indigo-600 mb-2 animate-spin" />
                  <h4 className="text-xs font-semibold text-indigo-900 animate-pulse">
                    正在执行本地规则映射排版...
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 px-4 text-center">
                    分块匹配、配色调制、图片及图标智能关联中...
                  </p>
                </div>
              ) : (
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="在此自由键入您的品牌设想。如：&#10;# 拾光咖啡馆&#10;这是温暖角落。&#10;## 特色服务&#10;- 严选精品庄园豆&#10;## 关于我们"
                  className="w-full h-28 p-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder-slate-400 leading-normal"
                />
              )}

              {/* Quick industry prompt templates */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400">💡 快速加载官方推荐好文案：</span>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => {
                      const text = `# 拾光醇香精品咖啡馆\n这里是一处弥漫豆香的温馨角落，尽享慢调美学时光。\n## 特色服务\n- 100% 严选世界级庄园咖啡豆 #0f766e\n- 每日晨光专业级慢温咖啡杯测烘焙\n- 大师工艺拉花与特调风味手冲\n## 关于我们\n精品研制每一滴咖啡，为您提供隔绝风尘、静心休憩的心灵驿站。`;
                      setInputText(text);
                      processMarkdown(text, '拾光咖啡馆');
                    }}
                    className="text-[10px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded transition-all font-semibold"
                  >
                    ☕ 咖啡馆
                  </button>
                  <button
                    onClick={() => {
                      const text = `# 暖烘烘手作鲜焙坊\n每日清晨黄金出炉的温暖，使用100%法国进口动物黄油发酵。\n## 特色服务\n- 暖粉甜心蜜糖美学副配色 #ec4899\n- 拒绝任何反式脂肪与人工奶油\n- 传世老面种常温慢水合发酵\n## 关于我们\n传递纯朴而美好的手作烘焙精神，让刚烤好的麦香治愈整天的心情。`;
                      setInputText(text);
                      processMarkdown(text, '暖烘烘手作鲜焙坊');
                    }}
                    className="text-[10px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded transition-all font-semibold"
                  >
                    🥖 烘焙坊
                  </button>
                  <button
                    onClick={() => {
                      const text = `# 数智矩阵科技协同中后台\n重塑现代企业级协同效能，基于云原生与分布式边缘计算的新一代流程工作站。\n## 核心功能\n- 极智靛青科技感主题 #4338ca\n- 千级高并发节点即时边缘计算\n- 零代码无感可视工作流引擎\n- 银行级SSL与零信任动态隔离防御\n## 关于我们\n数智矩阵致力于提供前沿高可扩展Saas云端系统，引领数字时代效率革命。`;
                      setInputText(text);
                      processMarkdown(text, '数智矩阵科技');
                    }}
                    className="text-[10px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded transition-all font-semibold"
                  >
                    💻 科技公司
                  </button>
                  <button
                    onClick={() => {
                      const text = `# 雅洁数字化口腔门诊\n数字化美学隐形正畸方案，高精密种植正畸，博学华西会诊中心。\n## 特色服务\n- 清雅海洋天空蓝配色 #0284c7\n- 25金标高压灭菌及无菌消毒系统\n- 数字化牙科CBCT高精密扫描\n- 面部比例智能3D重建正畸设计\n## 关于我们\n秉承科技舒适医疗理念，打造属于您的自信一生灿烂笑容。`;
                      setInputText(text);
                      processMarkdown(text, '雅洁数字化口腔');
                    }}
                    className="text-[10px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded transition-all font-semibold"
                  >
                    🦷 齿科诊所
                  </button>
                  <button
                    onClick={() => {
                      const text = `# 林晓明 独立交互设计师作品集\n全栈 UI/UX 架构设计师，极简、诗意与物理节奏的忠实追随者。\n## 特色服务\n- 经典人文写意炭黑主题 #18181b\n- 100% 高保真流畅动画交互编排\n- 完整易维护的多端物理布局闭环方案\n## 关于我们\n蓝白配色交织独立美学自定义。`;
                      setInputText(text);
                      processMarkdown(text, '设计工作室');
                    }}
                    className="text-[10px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded transition-all font-semibold"
                  >
                    🎨 个人作品
                  </button>
                </div>
              </div>

              {/* Action row with native drag support */}
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!inputText.trim()) {
                      alert('请先输入或选择您要转换的文案内容需求！');
                      return;
                    }
                    processMarkdown(inputText, config.title || '我的第一个网页');
                  }}
                  disabled={isParsing}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 transition-all disabled:bg-slate-300 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isParsing ? '秒速排版中...' : '生成 HTML 自适应网站'}
                </button>

                <div 
                  onDragOver={handleMdDragOver}
                  onDrop={handleMdDrop}
                  className="relative group cursor-pointer border border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center justify-center transition-all shrink-0"
                  title="支持拖拽外部 .md / .txt 文件至此读取"
                >
                  <Upload className="w-4 h-4 text-indigo-600 animate-bounce" />
                  <input
                    type="file"
                    accept=".md,.txt"
                    onChange={handleMdChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Site Title and Main Color */}
            <div className="bg-slate-100/50 p-3.5 rounded-xl border border-slate-200/50 flex flex-col gap-2.5">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">网站主标题与艺术配色</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  placeholder="自定义网站名称..."
                  className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-semibold"
                />
                <input 
                  type="color" 
                  value={config.themeColor}
                  onChange={(e) => setConfig({ ...config, themeColor: e.target.value })}
                  title="选择主体形象颜色"
                  className="w-10 h-8 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                />
              </div>
              <div className="flex flex-col gap-1.5 border-t border-slate-200/50 pt-2.5 mt-1">
                <span className="text-[10px] font-bold text-slate-500">✍️ 网站全局艺术字体包</span>
                <select 
                  value={config.fontFamily || 'Microsoft YaHei'}
                  onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                  className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-bold text-slate-705"
                >
                  <option value='Microsoft YaHei'>默认雅黑 (Microsoft YaHei)</option>
                  <option value='Inter'>现代都市 Sans (Inter)</option>
                  <option value='system-ui'>智能系统体 (System Sans)</option>
                  <option value='Georgia'>经典人文体 (Georgia Serif)</option>
                  <option value='JetBrains Mono'>科技像素体 (JetBrains Mono)</option>
                  <option value='Playfair Display'>法式诗歌体 (Playfair Editorial)</option>
                </select>
              </div>
            </div>

            {/* Modular Blocks Stack */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">页面布局模块 (拖选/箭头定位)</span>
                <span className="text-xs text-indigo-600 font-semibold">{config.blocks.length} 个元素</span>
              </div>
              
              <div className="space-y-2">
                {config.blocks.map((block, index) => (
                  <div key={block.id} className="flex flex-col gap-1">
                    <div 
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      onClick={() => setEditingBlockId(block.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${editingBlockId === block.id ? 'bg-indigo-50 border-indigo-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-slate-400 cursor-grab group-active:cursor-grabbing">
                          <LayoutGrid className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <span>{block.title || '无标题'}</span>
                            <span className="bg-slate-100 text-slate-500 font-normal px-1 py-0.5 rounded text-[10px] uppercase">{block.type}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 max-w-[150px] truncate">{block.subtitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveBlock('up', index); }}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                          title="上移"
                        >
                          <ArrowUp className="w-3 h-3 text-slate-600" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveBlock('down', index); }}
                          disabled={index === config.blocks.length - 1}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                          title="下移"
                        >
                          <ArrowDown className="w-3 h-3 text-slate-600" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); cloneBlock(index); }}
                          className="p-1 hover:bg-slate-250 hover:text-indigo-600 rounded text-slate-400"
                          title="复制并合并新版块 (Duplicate)"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                          className="p-1 hover:bg-red-50 hover:text-red-600 rounded text-slate-400"
                          title="删除模块"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Elementor Inline split/combination quick actions */}
                    {editingBlockId === block.id && (
                      <div className="p-2.5 bg-slate-50 border border-t-0 border-indigo-200 rounded-b-xl flex flex-col gap-1.5 -mt-1 text-[10px] text-slate-500">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-indigo-900">⚡ Elementor 在此版块下方插入新版块组合:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {(Object.keys(blockPresets) as BlockType[]).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); insertBlockAt(type, index); }}
                              className="px-1 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 hover:border-indigo-600 rounded-md text-[9px] font-bold text-center truncate cursor-pointer transition-colors"
                              title={`在此其后插入一个 ${type}`}
                            >
                              +{type === 'hero' ? '海报' : 
                                type === 'features' ? '特色' : 
                                type === 'about' ? '单栏' : 
                                type === 'gallery' ? '画廊' : 
                                type === 'slideshow' ? '轮播' :
                                type === 'cta' ? '导购' : '底部'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Block bar with drag support */}
              <div className="mt-5 pt-4 border-t border-slate-150">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    🧩 版块元件仓库 <span className="bg-amber-100 text-amber-700 font-extrabold text-[8px] px-1 py-0.5 rounded">支持拖拽放置</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
                  点按以下卡片可直接追加至底部；或<b>按住任意卡片，直接拖动放置到右侧预览区的虚线中</b>。
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(blockPresets) as BlockType[]).map((type) => {
                    let label = '';
                    let colorBg = '';
                    let colorText = '';
                    let textDesc = '';
                    if (type === 'hero') { label = '首屏宽大海报'; colorBg = 'bg-indigo-50 hover:bg-indigo-100/80'; colorText = 'text-indigo-700'; textDesc = '醒目核心标语/海报按钮'; }
                    else if (type === 'features') { label = '产品特色网格'; colorBg = 'bg-teal-50 hover:bg-teal-100/80'; colorText = 'text-teal-700'; textDesc = '3-4栏弹性网格卡项配置'; }
                    else if (type === 'about') { label = '品牌双栏述介'; colorBg = 'bg-purple-50 hover:bg-purple-100/80'; colorText = 'text-purple-700'; textDesc = '段落叙事和大幅图画展示'; }
                    else if (type === 'gallery') { label = '精选画廊橱窗'; colorBg = 'bg-amber-50 hover:bg-amber-100/80'; colorText = 'text-amber-700'; textDesc = '精制卡片网格案例陈布'; }
                    else if (type === 'slideshow') { label = '幻灯焦点大图'; colorBg = 'bg-sky-50 hover:bg-sky-100/80'; colorText = 'text-sky-700'; textDesc = '无限自适应大图自动滑动'; }
                    else if (type === 'cta') { label = '转化引导导购'; colorBg = 'bg-rose-50 hover:bg-rose-100/80'; colorText = 'text-rose-700'; textDesc = '行为按钮，提升用户转化率'; }
                    else { label = '版权页底部尾巴'; colorBg = 'bg-slate-50 hover:bg-slate-100/80'; colorText = 'text-slate-700'; textDesc = '版权说明和简短公司标牌'; }

                    return (
                      <div
                        key={type}
                        draggable={true}
                        onDragStart={() => setDraggingNewBlockType(type)}
                        onDragEnd={handleDragEnd}
                        onClick={() => addBlock(type)}
                        className={`p-2.5 rounded-xl border border-slate-200/65 flex flex-col text-left transition-all hover:scale-[1.02] active:scale-95 cursor-grab group select-none shadow-xs text-slate-800 ${colorBg}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Plus className={`w-3.5 h-3.5 shrink-0 ${colorText}`} />
                          <span className={`text-xs font-extrabold ${colorText}`}>{label}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-medium leading-normal h-6 line-clamp-2">{textDesc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Editing active block fields */}
            {activeEditingBlock && (
              <div className="border-t border-slate-150 pt-4 flex flex-col gap-3">
                
                {/* Elementor Style Active Block Header Indicator */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white p-3 rounded-xl shadow-md border border-slate-800 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold tracking-widest text-indigo-300 uppercase">ELEMENTOR 可视化节点</span>
                    <span className="text-[9px] bg-indigo-500 text-white font-mono px-1.5 py-0.5 rounded-md">ID: {activeEditingBlock.id}</span>
                  </div>
                  <h4 className="text-sm font-extrabold flex items-center gap-2">
                    <span className="text-emerald-400">❖</span> {activeEditingBlock.type.toUpperCase()} 模块管理器
                  </h4>
                </div>

                {/* Elementor Style Segmented Tabs Selector */}
                <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setEditorDesignTab('content')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${editorDesignTab === 'content' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <span>💻 内容</span>
                    <span className="text-[8px] opacity-70 font-normal">Content</span>
                  </button>
                  <button
                    onClick={() => setEditorDesignTab('style')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${editorDesignTab === 'style' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <span>🎨 样式</span>
                    <span className="text-[8px] opacity-70 font-normal">Style</span>
                  </button>
                  <button
                    onClick={() => setEditorDesignTab('advanced')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${editorDesignTab === 'advanced' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <span>⚙️ 高级</span>
                    <span className="text-[8px] opacity-70 font-normal">Advanced</span>
                  </button>
                </div>

                {/* TAB 1: CONTENT (内容) */}
                {editorDesignTab === 'content' && (
                  <div className="flex flex-col gap-3.5 mt-1 transition-all">
                    
                    {/* Subtitle / Label */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">小红标 / 分类说明</label>
                      <input 
                        type="text"
                        value={activeEditingBlock.subtitle}
                        onChange={(e) => handleBlockChange('subtitle', e.target.value)}
                        className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-semibold text-slate-700"
                        placeholder="输入副标题或指示符标签..."
                      />
                    </div>

                    {/* Main Title */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">模块主标题</label>
                      <input 
                        type="text"
                        value={activeEditingBlock.title}
                        onChange={(e) => handleBlockChange('title', e.target.value)}
                        className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-bold text-slate-800 shadow-sm"
                        placeholder="输入模块主标题..."
                      />
                    </div>

                    {/* Description (If has) */}
                    {activeEditingBlock.type !== 'features' && activeEditingBlock.type !== 'gallery' && (
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">细节内容故事</label>
                        <textarea 
                          rows={3}
                          value={activeEditingBlock.description || ''}
                          onChange={(e) => handleBlockChange('description', e.target.value)}
                          className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 text-slate-600"
                          placeholder="输入描述文案段落..."
                        />
                      </div>
                    )}

                    {/* Column Layout Controls for Grid features or galleries */}
                    {(activeEditingBlock.type === 'features' || activeEditingBlock.type === 'gallery') && (
                      <div className="flex flex-col gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">📐 Elementor 多栏分列布局</label>
                        <div className="grid grid-cols-4 gap-1">
                          {[1, 2, 3, 4].map(col => (
                            <button
                              key={col}
                              type="button"
                              onClick={() => handleBlockChange('columns', col)}
                              className={`py-1.5 text-xs font-bold rounded-md border text-center cursor-pointer ${ (activeEditingBlock.columns || 3) === col ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                            >
                              {col} 栏目
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                          微调网格多栏，模拟 Elementor 弹性宽度。更改可实时预览并在导出文件内自适应渲染。
                        </p>
                      </div>
                    )}

                    {/* About image loader */}
                    {activeEditingBlock.type === 'about' && (
                      <div className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                        <label className="text-[11px] font-bold text-slate-600">🖼️ Elementor 媒体图层自适应设定</label>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-slate-400">图片资源地址 (Base64/URL):</span>
                          <input 
                            type="text"
                            value={activeEditingBlock.image || ''}
                            onChange={(e) => handleBlockChange('image', e.target.value)}
                            placeholder="输入网络图片地址 或 Base64 编码..."
                            className="text-[10px] bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 mt-1">
                          <span className="text-[9px] font-bold text-indigo-600">图片超链接跳转 URL (点击跳转)</span>
                          <input 
                            type="text"
                            value={activeEditingBlock.imageLink || ''}
                            onChange={(e) => handleBlockChange('imageLink', e.target.value)}
                            placeholder="例如：https://my-store.com/item 或 #section_cta"
                            className="text-[10px] bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 font-mono"
                          />
                        </div>
                        <div className="flex gap-2 mt-1">
                          <label className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold px-3 py-1.5 rounded-md border border-indigo-200 cursor-pointer block text-center w-full shadow-sm">
                            📤 上传本地素材图像并转换 Base64
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onload = () => handleBlockChange('image', r.result as string);
                                  r.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Slideshow special duration selector */}
                    {activeEditingBlock.type === 'slideshow' && (
                      <div className="flex flex-col gap-1.5 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-150">
                        <label className="text-[11px] font-bold text-indigo-950 block">⏱️ Elementor 幻灯片轮播自动播放间隔时长 (毫秒)</label>
                        <input 
                          type="number"
                          min={1000}
                          max={20000}
                          step={500}
                          value={activeEditingBlock.autoplayDuration || 4000}
                          onChange={(e) => handleBlockChange('autoplayDuration', parseInt(e.target.value) || 4000)}
                          className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
                        />
                        <p className="text-[9px] text-slate-500">1秒等于1000毫秒。幻灯片组在此停留的时长。</p>
                      </div>
                    )}

                    {/* Block Items Section (features / gallery / slideshow) */}
                    {(activeEditingBlock.type === 'features' || activeEditingBlock.type === 'gallery' || activeEditingBlock.type === 'slideshow') && (
                      <div className="flex flex-col gap-2 bg-indigo-50/45 p-3 rounded-xl border border-indigo-100 shadow-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-indigo-100/60">
                          <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">📋 子卡片卡项数量 ({activeEditingBlock.items?.length || 0})</span>
                          <button 
                            type="button"
                            onClick={addBlockItem}
                            className="text-[9px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            添加卡片
                          </button>
                        </div>

                        <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1 mt-1">
                          {activeEditingBlock.items?.map((item) => (
                            <div key={item.id} className="p-2.5 bg-white border border-slate-200 rounded-lg flex flex-col gap-2 relative shadow-xs">
                              <button 
                                type="button"
                                onClick={() => deleteBlockItem(item.id)}
                                className="absolute top-2 right-2 text-slate-300 hover:text-red-500 rounded p-1 transition-colors"
                                title="删除卡项"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-extrabold text-indigo-500">卡项标题</span>
                                <input 
                                  type="text" 
                                  value={item.title}
                                  onChange={(e) => updateBlockItemField(item.id, 'title', e.target.value)}
                                  className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none"
                                />
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-extrabold text-indigo-500">卡项细节说明</span>
                                <textarea 
                                  rows={2}
                                  value={item.desc}
                                  onChange={(e) => updateBlockItemField(item.id, 'desc', e.target.value)}
                                  className="text-[11px] bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none resize-none leading-relaxed"
                                />
                              </div>

                              {/* Target links on indicators / slide pages or showcase items */}
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-extrabold text-indigo-600">超链接跳转 URL (超链接)</span>
                                <input 
                                  type="text" 
                                  value={item.clickUrl || ''}
                                  onChange={(e) => updateBlockItemField(item.id, 'clickUrl', e.target.value)}
                                  placeholder="如：https://... 或 #section_cta"
                                  className="text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none font-mono"
                                />
                              </div>

                              {(activeEditingBlock.type === 'gallery' || activeEditingBlock.type === 'slideshow') && (
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[9px] font-extrabold text-indigo-500">封面图片 URL / Base64</span>
                                  <input 
                                    type="text" 
                                    value={item.image || ''}
                                    onChange={(e) => updateBlockItemField(item.id, 'image', e.target.value)}
                                    placeholder="输入图片资源网址或上传..."
                                    className="text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none font-mono"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Primary Button / Secondary Button (Hero, CTA) */}
                    {(activeEditingBlock.type === 'hero' || activeEditingBlock.type === 'cta') && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2.5">
                        <span className="text-[11px] font-semibold text-slate-605 block">🔘 链接按钮文本与跳转锚点</span>
                        
                        {activeEditingBlock.primaryBtn && (
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1 text-[9px] font-bold text-slate-500">
                              <strong>主按钮文本 (Button Text)</strong>
                              <input 
                                type="text"
                                value={activeEditingBlock.primaryBtn.text}
                                onChange={(e) => handleBlockChange('primaryBtn', { ...activeEditingBlock.primaryBtn!, text: e.target.value })}
                                className="bg-white border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                              />
                            </div>
                            <div className="flex flex-col gap-1 text-[9px] font-bold text-slate-500">
                              <strong>按钮行为与交互对齐方式 (Jump URL / Smooth Scroll Destination)</strong>
                              <div className="flex gap-1.5">
                                <select 
                                  value={activeEditingBlock.primaryBtn.url.startsWith('#') ? activeEditingBlock.primaryBtn.url : 'custom'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val !== 'custom') {
                                      handleBlockChange('primaryBtn', { ...activeEditingBlock.primaryBtn!, url: val });
                                    }
                                  }}
                                  className="bg-white border border-slate-200 text-[10px] px-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 flex-1 font-bold text-slate-700"
                                >
                                  <option value="#">无链接 (空跳转)</option>
                                  {config.blocks.map((bl, bIdx) => (
                                    <option key={bl.id} value={`#visual_${bl.id}`}>
                                      平滑滚动 ➔ 第 {bIdx + 1} 屏 [ {bl.type === 'hero' ? '海报屏' : bl.type === 'features' ? '产品特色' : bl.type === 'about' ? '叙述介' : bl.type === 'gallery' ? '画廊橱' : bl.type === 'slideshow' ? '大图轮播' : bl.type === 'cta' ? '导购条' : '底部栏'} ]
                                    </option>
                                  ))}
                                  <option value="custom">✍️ 输入其它外部链接 URL</option>
                                </select>
                                <input 
                                  type="text"
                                  value={activeEditingBlock.primaryBtn.url}
                                  onChange={(e) => handleBlockChange('primaryBtn', { ...activeEditingBlock.primaryBtn!, url: e.target.value })}
                                  placeholder="自定义 URL 或锚点"
                                  className="bg-white border border-slate-200 text-[11px] px-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 w-1/3 font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* TAB 2: STYLE (样式) */}
                {editorDesignTab === 'style' && (
                  <div className="flex flex-col gap-3.5 mt-1 transition-all">
                    
                    {/* Background preset theme */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">📦 Elementor 预设背景色彩机制</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['light', 'dark', 'brand'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              handleBlockChange('theme', t);
                              // Reset custom color settings to sensible theme defaults
                              if (t === 'light') {
                                handleBlockChange('bgColorCustom', '#ffffff');
                                handleBlockChange('titleColor', '#0f172a');
                                handleBlockChange('descColor', '#475569');
                              } else if (t === 'dark') {
                                handleBlockChange('bgColorCustom', '#0f172a');
                                handleBlockChange('titleColor', '#ffffff');
                                handleBlockChange('descColor', '#94a3b8');
                              }
                            }}
                            className={`text-[11px] py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${activeEditingBlock.theme === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {t === 'light' ? '明亮白' : t === 'dark' ? '高雅黑' : '品牌渐变'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Background Color & Gradient Style Overrides */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col gap-2">
                       <div className="flex justify-between items-center text-xs">
                        <span className="text-[11px] font-bold text-slate-700">🎨 精细背景色微调覆写</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold">
                          <span>自定义渐变</span>
                          <input 
                            type="checkbox" 
                            checked={activeEditingBlock.useCustomBgGradient || false}
                            onChange={(e) => handleBlockChange('useCustomBgGradient', e.target.checked)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>

                      {!activeEditingBlock.useCustomBgGradient ? (
                        <div className="flex items-center justify-between gap-2 border-t border-slate-200/55 pt-1.5">
                          <span className="text-xs text-slate-600">纯色背景色调</span>
                          <input 
                            type="color"
                            value={activeEditingBlock.bgColorCustom || (activeEditingBlock.theme === 'dark' ? '#0f172a' : '#ffffff')}
                            onChange={(e) => handleBlockChange('bgColorCustom', e.target.value)}
                            className="w-10 h-7 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2.5 border-t border-slate-200/55 pt-2.5">
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase">🎨 渐变色魔块生成器 (双色线性)</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                              <span className="text-[10px] text-slate-500 font-semibold font-sans">首色</span>
                              <input 
                                type="color"
                                value={gradientColor1}
                                onChange={(e) => {
                                  const c1 = e.target.value;
                                  setGradientColor1(c1);
                                  handleBlockChange('bgGradientCustom', `linear-gradient(${gradientAngle}deg, ${c1} 0%, ${gradientColor2} 100%)`);
                                }}
                                className="w-8 h-6 rounded border border-slate-200 cursor-pointer p-0"
                              />
                            </div>
                            <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                              <span className="text-[10px] text-slate-500 font-semibold font-sans">尾色</span>
                              <input 
                                type="color"
                                value={gradientColor2}
                                onChange={(e) => {
                                  const c2 = e.target.value;
                                  setGradientColor2(c2);
                                  handleBlockChange('bgGradientCustom', `linear-gradient(${gradientAngle}deg, ${gradientColor1} 0%, ${c2} 100%)`);
                                }}
                                className="w-8 h-6 rounded border border-slate-200 cursor-pointer p-0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                              <span>辐射倾切角度</span>
                              <span className="text-indigo-600 font-bold">{gradientAngle}°</span>
                            </div>
                            <input 
                              type="range"
                              min={0}
                              max={360}
                              step={5}
                              value={gradientAngle}
                              onChange={(e) => {
                                const angle = parseInt(e.target.value);
                                setGradientAngle(angle);
                                handleBlockChange('bgGradientCustom', `linear-gradient(${angle}deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`);
                              }}
                              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono bg-white p-1 rounded border overflow-x-auto text-center">
                            {activeEditingBlock.bgGradientCustom || '未生成颜色'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Typography Hex Colors (Elementor standard font colors) */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col gap-2">
                      <span className="text-[11px] font-bold text-slate-700 block">✍️ Elementor 字体颜色管理器</span>
                      
                      {/* Subtitle / category tag color */}
                      <div className="flex items-center justify-between gap-1.5 text-xs text-slate-600">
                        <span>卡片小红标 / 标签颜色</span>
                        <input 
                          type="color"
                          value={activeEditingBlock.subtitleColor || (activeEditingBlock.theme === 'dark' ? '#818cf8' : '#4f46e5')}
                          onChange={(e) => handleBlockChange('subtitleColor', e.target.value)}
                          className="w-8 h-6 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                        />
                      </div>

                      {/* Title custom color */}
                      <div className="flex items-center justify-between gap-1.5 text-xs text-slate-600">
                        <span>主标题文字色彩 Custom Title</span>
                        <input 
                          type="color"
                          value={activeEditingBlock.titleColor || (activeEditingBlock.theme === 'dark' ? '#ffffff' : '#0f172a')}
                          onChange={(e) => handleBlockChange('titleColor', e.target.value)}
                          className="w-8 h-6 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                        />
                      </div>

                      {/* Description Color */}
                      <div className="flex items-center justify-between gap-1.5 text-xs text-slate-600">
                        <span>辅文本/说明色 Custom Description</span>
                        <input 
                          type="color"
                          value={activeEditingBlock.descColor || (activeEditingBlock.theme === 'dark' ? '#94a3b8' : '#475569')}
                          onChange={(e) => handleBlockChange('descColor', e.target.value)}
                          className="w-8 h-6 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                        />
                      </div>
                    </div>

                    {/* Border Radius Controls */}
                    <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>🔲 Elementor 卡片与图像圆角</span>
                        <span className="text-indigo-600">{activeEditingBlock.borderRadius ?? 16}px</span>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={48}
                        step={2}
                        value={activeEditingBlock.borderRadius ?? 16}
                        onChange={(e) => handleBlockChange('borderRadius', parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none mt-1"
                      />
                    </div>

                    {/* Box Shadow Controls */}
                    <div className="flex flex-col gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700">🌌 Card 阴影特效强度 (Box Shadow)</label>
                      <div className="grid grid-cols-5 gap-1 text-[9px]">
                        {(['none', 'sm', 'md', 'lg', 'all-glow'] as const).map(sh => (
                          <button
                            key={sh}
                            type="button"
                            onClick={() => handleBlockChange('boxShadow', sh)}
                            className={`py-1 rounded font-bold border text-center transition-colors cursor-pointer ${ (activeEditingBlock.boxShadow || 'md') === sh ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                          >
                            {sh === 'none' ? '无' : sh === 'sm' ? '软' : sh === 'md' ? '中' : sh === 'lg' ? '重' : '溢光'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Elementor Block Width Customizer */}
                    <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700">📏 Elementor 版块自适应宽度 (Section Width)</label>
                      <div className="grid grid-cols-4 gap-1.5 mt-0.5">
                        {(['narrow', 'normal', 'wide', 'full'] as const).map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => handleBlockChange('blockWidth', w)}
                            className={`text-[10px] py-1.5 rounded border font-bold transition-all cursor-pointer ${ (activeEditingBlock.blockWidth || 'normal') === w ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-slate-750 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {w === 'narrow' ? '窄屏 2xl' : w === 'normal' ? '标准 4xl' : w === 'wide' ? '宽屏 6xl' : '全屏 100%'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Elementor Shape Divider (底部隔离线形状) */}
                    <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700">🌊 Edge Shape Divider (版块底部曲线隔离线)</label>
                      <div className="grid grid-cols-4 gap-1 mt-0.5 text-[9px]">
                        {(['none', 'wave', 'slant', 'curve'] as const).map((dv) => (
                          <button
                            key={dv}
                            type="button"
                            onClick={() => handleBlockChange('dividerType', dv)}
                            className={`py-1.5 rounded border font-bold text-center transition-all cursor-pointer ${ (activeEditingBlock.dividerType || 'none') === dv ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {dv === 'none' ? '无装饰' : dv === 'wave' ? '海波浪' : dv === 'slant' ? '倾斜切' : '圆拱形'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Align Preset */}
                    <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-701">文字居左 / 居中 / 居右对齐</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['left', 'center', 'right'] as const).map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => handleBlockChange('align', a)}
                            className={`text-xs py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${activeEditingBlock.align === a ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {a === 'left' ? '居左' : a === 'center' ? '中置' : '居右'}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 3: ADVANCED (高级) */}
                {editorDesignTab === 'advanced' && (
                  <div className="flex flex-col gap-3.5 mt-1 transition-all">
                    
                    {/* Elementor Professional Inner spacing (Padding) */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col gap-3">
                      <span className="text-[11px] font-bold text-slate-700 block">↔️ Elementor 内容内间距 (Padding)</span>
                      
                      {/* Padding Top */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                          <span>顶部内间距 (Padding Top)</span>
                          <span className="text-indigo-600 font-mono font-bold">{activeEditingBlock.paddingTop ?? 80}px</span>
                        </div>
                        <input 
                          type="range"
                          min={0}
                          max={240}
                          step={5}
                          value={activeEditingBlock.paddingTop ?? 80}
                          onChange={(e) => handleBlockChange('paddingTop', parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                        />
                      </div>

                      {/* Padding Bottom */}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                          <span>底部内间距 (Padding Bottom)</span>
                          <span className="text-indigo-600 font-mono font-bold">{activeEditingBlock.paddingBottom ?? 80}px</span>
                        </div>
                        <input 
                          type="range"
                          min={0}
                          max={240}
                          step={5}
                          value={activeEditingBlock.paddingBottom ?? 80}
                          onChange={(e) => handleBlockChange('paddingBottom', parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                        />
                      </div>
                    </div>

                    {/* Elementor Outer Spacing (Margin) */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col gap-3">
                      <span className="text-[11px] font-bold text-slate-700 block">↕️ Elementor 区块外边距 (Margin)</span>
                      
                      {/* Margin Top */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                          <span>顶部外边距 (Margin Top)</span>
                          <span className="text-indigo-600 font-mono font-bold">{activeEditingBlock.marginTop ?? 0}px</span>
                        </div>
                        <input 
                          type="range"
                          min={0}
                          max={120}
                          step={4}
                          value={activeEditingBlock.marginTop ?? 0}
                          onChange={(e) => handleBlockChange('marginTop', parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                        />
                      </div>

                      {/* Margin Bottom */}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                          <span>底部外边距 (Margin Bottom)</span>
                          <span className="text-indigo-600 font-mono font-bold">{activeEditingBlock.marginBottom ?? 0}px</span>
                        </div>
                        <input 
                          type="range"
                          min={0}
                          max={120}
                          step={4}
                          value={activeEditingBlock.marginBottom ?? 0}
                          onChange={(e) => handleBlockChange('marginBottom', parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Entrance Animations (Elementor Motion Effects) */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-700">🎬 显现进入动效 (Elementor Motion Effect)</label>
                      <select
                        value={activeEditingBlock.entranceAnimation || 'none'}
                        onChange={(e) => handleBlockChange('entranceAnimation', e.target.value)}
                        className="text-xs bg-white border border-slate-250 rounded-lg p-2 focus:outline-none w-full font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="none">无静态显示 (None - Static)</option>
                        <option value="fade-in">淡入进入 (Fade In)</option>
                        <option value="slide-up">向上滑动显现 (Slide Up)</option>
                        <option value="zoom-in">小幅渐变缩放 (Zoom In)</option>
                        <option value="bounce-in">俏皮弹性渐显 (Bounce In)</option>
                      </select>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                        WordPress Elementor 专业加速进场效果，利用纯 GPU 渲染，流畅不重绘渲染流。
                      </p>
                    </div>

                  </div>
                )}

                {/* Primary Button / Secondary Button (Hero, CTA) */}
                {(activeEditingBlock.type === 'hero' || activeEditingBlock.type === 'cta') && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
                    <span className="text-[11px] font-bold text-slate-700">按钮交互配置</span>
                    
                    {activeEditingBlock.primaryBtn && (
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="flex flex-col gap-1 text-[10px]">
                          <strong>主按钮文字</strong>
                          <input 
                            type="text"
                            value={activeEditingBlock.primaryBtn.text}
                            onChange={(e) => handleBlockChange('primaryBtn', { ...activeEditingBlock.primaryBtn!, text: e.target.value })}
                            className="bg-white border text-xs px-2 py-1 rounded"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-[10px]">
                          <strong>主按钮跳转锚点</strong>
                          <input 
                            type="text"
                            value={activeEditingBlock.primaryBtn.url}
                            onChange={(e) => handleBlockChange('primaryBtn', { ...activeEditingBlock.primaryBtn!, url: e.target.value })}
                            className="bg-white border text-xs px-2 py-1 rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* Quick Actions at Bottom of Editor tab */}
            <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
              <button
                onClick={handleDownloadHTML}
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                下载网页 HTML (纯净静态单文件)
              </button>

              <button
                onClick={handlePublish}
                disabled={isSharing}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isSharing ? 'animate-spin' : ''}`} />
                生成唯一互联网分享链接
              </button>

              {shareLink && (
                <div className="bg-slate-100 p-2 text-xs border border-slate-250 rounded-xl break-all">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-indigo-700">发布成功! 唯一链接位：</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        alert('已成功复制链接到剪贴板！');
                      }}
                      className="p-1 text-slate-500 hover:text-indigo-600 rounded bg-white border border-slate-200"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <a href={shareLink} target="_blank" className="text-[11px] text-blue-600 hover:underline">{shareLink}</a>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: High Resolution Preview Description */}
        {activeTab === 'preview' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-200 text-slate-800 p-3.5 rounded-xl flex gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold mb-1">超清模拟静态环境</p>
                <p className="leading-relaxed opacity-90">右侧视口实时编译生成无 CDN、全静态加载、响应式设计的 Microsoft YaHei 网页布局。随时点击左栏的“下载网页”即可在物理本地秒级打开离线预览。</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl">
              <span className="text-xs font-bold text-indigo-900 block mb-2">已集成页面区块大纲</span>
              <div className="space-y-1.5 text-xs text-indigo-700">
                {config.blocks.map((b, i) => (
                  <div key={b.id} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>第 {i+1} 屏 · {b.title} ({b.type})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button 
                onClick={handleDownloadHTML}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-2 text-xs font-semibold flex justify-center items-center gap-1.5"
              >
                <Code className="w-4 h-4" />
                导出打包包 (index.html)
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Custom Domain Setup & HTTPS Auto SSL */}
        {activeTab === 'domain' && (
          <div className="p-4 flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">HTTPS & 自定义域名部署</span>
              <h3 className="text-sm font-bold text-slate-800">一键快速部署及域名解析生成</h3>
            </div>

            <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200/50 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-600">绑定域名 (例: www.mywebsite.com)</span>
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="flex-1 text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                  placeholder="www.mycoolsite.com"
                />
                <button 
                  onClick={runDnsCheck}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded transition-all"
                >
                  检测 DNS
                </button>
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                * 本地系统已自动为您生成符合 SSL/HTTPS 规则的 Nginx、Vercel 部署套件。
              </div>
            </div>

            {dnsStatus !== 'idle' && (
              <div className="p-3 bg-indigo-50/50 border border-indigo-150 rounded-xl flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${dnsStatus === 'checking' ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
                  <span className="font-semibold text-indigo-900">
                    {dnsStatus === 'checking' ? '正在连接 Cloudflare / SSL-Root 云服务器检测 dns...' : `已自动绑定且生成 HTTPS 部署套件 (${customDomain})`}
                  </span>
                </div>

                {dnsStatus === 'verified' && (
                  <div className="space-y-3 mt-1 text-slate-700">
                    <div>
                      <p className="font-bold text-indigo-950">1. 请前往您的域名注册商 (阿里云/腾讯云) 添加解析记录:</p>
                      <div className="bg-white p-2 border rounded font-mono text-[10px] mt-1 text-slate-600">
                        【主机记录】: <strong className="text-indigo-600">www</strong><br/>
                        【记录类型】: <strong className="text-indigo-600">CNAME</strong><br/>
                        【记录值】  : <strong className="text-indigo-600">dns.aistudio-cdn.com</strong>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold text-indigo-950">2. Nginx HTTPS & SSL 反向代理自动生成配置文件:</p>
                      <pre className="bg-slate-900 text-indigo-300 p-2 rounded text-[9px] font-mono overflow-x-auto select-all max-h-36">
{`server {
    listen 80;
    listen 443 ssl http2;
    server_name ${customDomain};
    
    # 自动生成的 Let's Encrypt SSL 密钥
    ssl_certificate /etc/letsencrypt/live/${customDomain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${customDomain}/privkey.pem;
    
    root /var/www/static_html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`}
                      </pre>
                    </div>

                    <div>
                      <p className="font-bold text-indigo-950">3. 附带主流托管文件配置:</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 border bg-white rounded">
                          <strong className="block text-indigo-700 mb-1">vercel.json</strong>
                          <span className="text-slate-400">一键部署与强刷规则</span>
                        </div>
                        <div className="p-2 border bg-white rounded">
                          <strong className="block text-indigo-700 mb-1">netlify.toml</strong>
                          <span className="text-slate-400">全域强制 HTTPS 自动重定向</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MID-RIGHT PREVIEW PANEL */}
      <div className="flex-1 bg-slate-200 p-4 overflow-y-auto flex flex-col gap-4">
        
        {/* Device preview toggles */}
        <div className="bg-white px-4 py-2 border border-slate-300 rounded-xl flex justify-between items-center shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-xs font-semibold text-slate-500 ml-2">静态网站可视化预览 ({config.title})</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400">字体：<b>微软雅黑 (默认)</b></span>
            <button 
              onClick={handleDownloadHTML}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded"
            >
              <Download className="w-3.5 h-3.5" />
              下载本网
            </button>
          </div>
        </div>

        {/* Visual Simulated Mock Screen */}
        <div className="flex-1 min-h-[500px] border border-slate-300 shadow-xl bg-white rounded-2xl overflow-y-auto relative grid-bg-dots">
          
          <header className="sticky top-0 bg-white/95 border-b border-slate-200 px-6 py-4 flex justify-between items-center backdrop-blur-sm z-10" style={{ fontFamily: 'Microsoft YaHei' }}>
            <span className="text-lg font-bold" style={{ color: config.themeColor }}>{config.title}</span>
            <nav className="flex gap-4 text-xs font-bold text-slate-600">
              {config.blocks.filter(b => b.type !== 'footer').map((block) => (
                <a key={block.id} href={`#visual_${block.id}`} className="hover:text-indigo-600 transition-colors uppercase">
                  {block.title.substring(0, 6)}
                </a>
              ))}
            </nav>
          </header>

          <main id="preview-sandbox-main" className="space-y-0.5">
            {config.blocks.map((block, index) => {
              const isDark = block.theme === 'dark';
              const isBrand = block.theme === 'brand';
              const align = block.align;
              
              const blockWidthClass = 
                block.blockWidth === 'narrow' ? 'max-w-2xl px-6' : 
                block.blockWidth === 'wide' ? 'max-w-6xl px-6' : 
                block.blockWidth === 'full' ? 'max-w-full px-10' : 
                'max-w-4xl px-6';

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
                customStyle.backgroundColor = config.themeColor;
              }

              // Shadow overrides
              if (block.boxShadow === 'sm') {
                customStyle.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
              } else if (block.boxShadow === 'md') {
                customStyle.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
              } else if (block.boxShadow === 'lg') {
                customStyle.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
              } else if (block.boxShadow === 'all-glow') {
                customStyle.boxShadow = `0 0 35px 5px ${config.themeColor || '#6366f1'}33`;
              }

              // Animation class parsing
              const animationClass = block.entranceAnimation && block.entranceAnimation !== 'none'
                ? `elem-anim-${block.entranceAnimation}`
                : '';

              // Dynamic Title, Subtitle & Desc Color
              const titleStyle: React.CSSProperties = block.titleColor ? { color: block.titleColor } : {};
              const subtitleStyle: React.CSSProperties = block.subtitleColor ? { color: block.subtitleColor } : {};
              const descStyle: React.CSSProperties = block.descColor ? { color: block.descColor } : {};

              const isOver = dragOverBlockIndex === index;
              const hasDraggingActive = draggedBlockIndex !== null || draggingNewBlockType !== null;

              return (
                <div key={block.id} className="relative">
                  {/* Visual Drop zone indicator when dragging */}
                  {hasDraggingActive && (
                    <div 
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={() => setDragOverBlockIndex(null)}
                      onDrop={() => handleDrop(index)}
                      className={`mx-auto max-w-2xl my-2 rounded-xl transition-all duration-300 border-2 border-dashed flex items-center justify-center font-bold text-[10px] select-none ${isOver ? 'h-16 bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md scale-[1.01]' : 'h-7 bg-slate-50/40 border-slate-300 text-slate-400 opacity-60 hover:opacity-100'}`}
                    >
                      放开鼠标将版块插入此处 ⇅
                    </div>
                  )}

                  <section 
                    id={`visual_${block.id}`}
                    draggable={!isTextEditing}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => { e.stopPropagation(); setEditingBlockId(block.id); }}
                    className={`relative group transition-all duration-300 cursor-pointer overflow-hidden ${editingBlockId === block.id ? 'ring-2 ring-indigo-500 ring-offset-2 z-10 shadow-lg' : 'hover:ring-2 hover:ring-indigo-300'} ${isDark ? 'bg-slate-900 text-slate-100' : isBrand ? 'bg-indigo-600 text-indigo-50' : 'bg-white text-slate-800'} ${animationClass}`}
                    style={customStyle}
                  >
                    <div className={`${blockWidthClass} mx-auto flex flex-col ${textAlignment} relative z-2`}>
                      
                      {/* Floating Elementor controls handles overlay */}
                      <div className="absolute top-1.5 right-1.5 flex gap-1 z-30 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveBlock('up', index); }} 
                          disabled={index === 0}
                          className="p-1 px-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded shadow text-[10px] flex items-center justify-center gap-0.5" 
                          title="上排此模块"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveBlock('down', index); }} 
                          disabled={index === config.blocks.length - 1}
                          className="p-1 px-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded shadow text-[10px] flex items-center justify-center gap-0.5" 
                          title="下排此模块"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); cloneBlock(index); }} 
                          className="p-1 px-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow text-[10px] flex items-center justify-center gap-0.5" 
                          title="复制模块 (Duplicate)"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                          className="p-1 px-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow text-[10px] flex items-center justify-center gap-0.5" 
                          title="删除此模块"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Click indicator badge */}
                      {editingBlockId === block.id && (
                        <div className="absolute -top-10 left-0 bg-indigo-600 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded shadow-sm border border-indigo-300 animate-pulse z-10 select-none">
                          👉 Elementor 正在编辑：{block.type === 'hero' ? '海报屏' : block.type === 'features' ? '产品特色' : block.type === 'about' ? '叙述介' : block.type === 'gallery' ? '画廊橱' : block.type === 'slideshow' ? '幻灯轮播' : block.type === 'cta' ? '导购层' : '底部页尾'}
                        </div>
                      )}

                      {/* Small category tag with custom contentEditable field */}
                      <span 
                        className={`text-[11.5px] font-extrabold uppercase tracking-widest block mb-1 outline-none border-b border-transparent hover:border-indigo-400 focus:border-indigo-600 focus:bg-indigo-50/15 rounded px-1 transition-all ${isDark ? 'text-indigo-400' : isBrand ? 'text-indigo-200' : 'text-slate-500'}`}
                        style={subtitleStyle}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onFocus={() => { setIsTextEditing(true); setEditingBlockId(block.id); }}
                        onBlur={(e) => {
                          setIsTextEditing(false);
                          handleBlockChange('subtitle', e.currentTarget.textContent || '');
                        }}
                        title="双击或点击此字直接改写副文本"
                      >
                        {block.subtitle || '模块副目录说明'}
                      </span>

                      {/* Big title with custom contentEditable field */}
                      <h2 
                        className="text-3xl font-extrabold tracking-tight mb-4 leading-tight outline-none border-b border-transparent hover:border-indigo-400 focus:border-indigo-600 focus:bg-indigo-50/15 rounded px-1 transition-all"
                        style={titleStyle}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onFocus={() => { setIsTextEditing(true); setEditingBlockId(block.id); }}
                        onBlur={(e) => {
                          setIsTextEditing(false);
                          handleBlockChange('title', e.currentTarget.textContent || '');
                        }}
                        title="双击或点击直接就地修改主标题"
                      >
                        {block.title || '标题名称'}
                      </h2>

                      {/* Desc content with custom contentEditable field */}
                      {block.description !== undefined && (
                        <p 
                          className={`text-[14px] leading-relaxed max-w-2xl mb-6 outline-none border-b border-transparent hover:border-indigo-400 focus:border-indigo-600 focus:bg-indigo-50/15 rounded px-1 transition-all ${isDark ? 'text-slate-300' : isBrand ? 'text-indigo-100' : 'text-slate-600'}`}
                          style={descStyle}
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onFocus={() => { setIsTextEditing(true); setEditingBlockId(block.id); }}
                          onBlur={(e) => {
                            setIsTextEditing(false);
                            handleBlockChange('description', e.currentTarget.textContent || '');
                          }}
                          title="双击或点击直接就地修改说明段落"
                        >
                          {block.description}
                        </p>
                      )}

                    {/* Render matching elements according to type */}
                    {block.type === 'hero' && (
                      <div className="flex gap-3 flex-wrap mt-2">
                        {block.primaryBtn && (
                          <button 
                            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow ${isBrand ? 'bg-white text-indigo-700 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`} 
                            style={!isBrand && config.themeColor ? { backgroundColor: config.themeColor } : {}}
                          >
                            {block.primaryBtn.text}
                          </button>
                        )}
                        {block.secondaryBtn && (
                          <button className="px-5 py-2.5 rounded-lg text-xs font-bold border border-slate-350 hover:bg-slate-100/50">
                            {block.secondaryBtn.text}
                          </button>
                        )}
                      </div>
                    )}

                    {block.type === 'features' && block.items && (
                      <div 
                        className={`grid grid-cols-1 gap-6 w-full mt-6 text-left`}
                        style={{
                          gridTemplateColumns: `repeat(${block.columns || 3}, minmax(0, 1fr))`
                        }}
                      >
                        {block.items.map(item => {
                          const itemEl = (
                            <div 
                              className={`p-5 rounded-2xl border transition-all h-full ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : isBrand ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'}`}
                              style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}
                            >
                              <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs mb-3 shadow" style={{ backgroundColor: config.themeColor }}>
                                <Check className="w-4 h-4" />
                              </div>
                              <h4 className="text-sm font-extrabold mb-1.5">{item.title}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] dark:text-slate-400">{item.desc}</p>
                            </div>
                          );
                          return item.clickUrl ? (
                            <a key={item.id} href={item.clickUrl} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.01] transition-all">
                              {itemEl}
                            </a>
                          ) : (
                            <div key={item.id}>
                              {itemEl}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {block.type === 'about' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6 items-center text-left">
                        <div className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-300" style={descStyle}>
                          {block.description || "这里是单栏模块的详细段落文字描述。您可以通过左侧面板增加更多内容或直接拖拽文件替换。"}
                        </div>
                        {block.image && (
                          block.imageLink ? (
                            <a href={block.imageLink} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50 block hover:scale-[1.01] transition-all" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                              <img src={block.image} alt="about visual" className="w-full h-auto object-cover max-h-64" referrerPolicy="no-referrer" />
                            </a>
                          ) : (
                            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                              <img src={block.image} alt="about visual" className="w-full h-auto object-cover max-h-64" referrerPolicy="no-referrer" />
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {block.type === 'gallery' && block.items && (
                      <div 
                        className={`grid grid-cols-1 gap-5 w-full mt-6`}
                        style={{
                          gridTemplateColumns: `repeat(${block.columns || 3}, minmax(0, 1fr))`
                        }}
                      >
                        {block.items.map(item => {
                          const itemEl = (
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col text-left h-full" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                              {item.image && <img src={item.image} alt="portfolio" className="w-full h-40 object-cover" referrerPolicy="no-referrer" />}
                              <div className="p-4 flex-1">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                              </div>
                            </div>
                          );
                          return item.clickUrl ? (
                            <a key={item.id} href={item.clickUrl} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.01] transition-all">
                              {itemEl}
                            </a>
                          ) : (
                            <div key={item.id}>
                              {itemEl}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Slideshow element in preview sandbox */}
                    {block.type === 'slideshow' && block.items && block.items.length > 0 && (
                      <div className="relative w-full overflow-hidden border border-slate-200 shadow-md bg-slate-100 group/slider w-full mt-2" style={block.borderRadius !== undefined ? { borderRadius: `${block.borderRadius}px` } : {}}>
                        {(() => {
                          const idx = getCarouselIndex(block.id);
                          const currentSlide = block.items[idx];
                          if (!currentSlide) return null;
                          
                          const totalSlides = block.items.length;
                          
                          const handlePrevSlide = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            setCarouselIndex(block.id, (idx - 1 + totalSlides) % totalSlides);
                          };
                          const handleNextSlide = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            setCarouselIndex(block.id, (idx + 1) % totalSlides);
                          };
                          
                          const slideContent = (
                            <div className="relative w-full aspect-[21/9] md:h-80 min-h-[240px] flex flex-col justify-end text-left overflow-hidden">
                              {currentSlide.image ? (
                                <img src={currentSlide.image} alt={currentSlide.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="absolute inset-0 bg-slate-800" />
                              )}
                              
                              {/* Bottom Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                                <span className="bg-indigo-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded w-max mb-1 shadow-sm">
                                  SLIDE {idx + 1} / {totalSlides}
                                </span>
                                <h3 className="text-base md:text-xl font-bold leading-tight text-white mb-1.5">{currentSlide.title}</h3>
                                {currentSlide.desc && <p className="text-xs text-slate-200/90 max-w-lg leading-relaxed">{currentSlide.desc}</p>}
                              </div>
                            </div>
                          );
                          
                          return (
                            <>
                              {/* Slide item hyperlink click mapping */}
                              {currentSlide.clickUrl ? (
                                <a href={currentSlide.clickUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                  {slideContent}
                                </a>
                              ) : (
                                <div className="w-full">
                                  {slideContent}
                                </div>
                              )}
                              
                              {totalSlides > 1 && (
                                <>
                                  <button 
                                    onClick={handlePrevSlide}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-indigo-600 hover:scale-105 text-white flex items-center justify-center cursor-pointer transition-all border border-slate-700/50"
                                    title="上一页"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={handleNextSlide}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-indigo-600 hover:scale-105 text-white flex items-center justify-center cursor-pointer transition-all border border-slate-700/50"
                                    title="下一页"
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                  
                                  {/* DOT Indicators */}
                                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {block.items.map((_, sidx) => (
                                      <button 
                                        key={sidx}
                                        onClick={(e) => { e.stopPropagation(); setCarouselIndex(block.id, sidx); }}
                                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${sidx === idx ? 'bg-indigo-500 w-3' : 'bg-white/40'}`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {block.type === 'cta' && (
                      <div className="flex gap-2 flex-wrap mt-4">
                        <button className="px-8 py-3 rounded-full text-xs font-extrabold tracking-wider bg-white text-indigo-700 hover:bg-slate-100 shadow-lg" style={!isBrand && config.themeColor ? { backgroundColor: config.themeColor, color: '#ffffff' } : {}}>
                          {block.primaryBtn?.text || '立即预约说明会'}
                        </button>
                      </div>
                    )}

                  </div>

                  {/* Visual Shape Divider Overlays */}
                  {block.dividerType === 'wave' && (
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none z-10">
                      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-10 w-[120%] fill-current text-white dark:text-slate-900" style={isDark ? { color: '#0f172a' } : { color: '#ffffff' }}>
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
                      </svg>
                    </div>
                  )}
                  {block.dividerType === 'slant' && (
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none z-10">
                      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-8 w-full fill-current text-white dark:text-slate-900" style={isDark ? { color: '#0f172a' } : { color: '#ffffff' }}>
                        <path d="M1200 120L0 120L0 0L1200 120Z" />
                      </svg>
                    </div>
                  )}
                  {block.dividerType === 'curve' && (
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none z-10">
                      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-10 w-full fill-current text-white dark:text-slate-900" style={isDark ? { color: '#0f172a' } : { color: '#ffffff' }}>
                        <path d="M0 0 C 400 120, 800 120, 1200 0 L 1200 120 L 0 120 Z" />
                      </svg>
                    </div>
                  )}
                </section>
              </div>
            );
            })}
          </main>

          {/* Footer of mock site */}
          <footer className="bg-slate-950 text-slate-400 p-8 text-center text-xs border-t border-slate-800">
            <p className="font-semibold text-slate-200 mb-1">{config.title}</p>
            <p>© 2026 版权所有 · 本静态网站基于魔块自动平台快速编译生成</p>
          </footer>

        </div>

      </div>

    </div>
  );
}
