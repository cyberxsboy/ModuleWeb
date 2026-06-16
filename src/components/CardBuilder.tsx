/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, FileImage, Download, Plus, Trash2, Code, Copy, 
  Play, Square, Volume2, VolumeX, Move, Type, Palette, Sliders,
  RefreshCw, CheckCircle2, Heart, Trees as Tree, Star, ChevronRight
} from 'lucide-react';
import { GreetingCardConfig, GreetingText, ParticleType, CardMediaType } from '../types';
import { AudioEngine } from './AudioEngine';

// Pre-defined background gradient options
const GRADIENTS = [
  { name: '浪漫玫瑰 (爱心)', value: 'linear-gradient(to bottom, #f43f5e, #be123c)', particles: 'hearts' },
  { name: '冬日雪夜 (圣诞)', value: 'linear-gradient(to bottom, #0f172a, #1e3a8a)', particles: 'snow' },
  { name: '星空璀璨 (万能)', value: 'linear-gradient(to bottom, #1e1b4b, #311042)', particles: 'stars' },
  { name: '金穗祥瑞 (新年)', value: 'linear-gradient(to bottom, #7f1d1d, #b91c1c)', particles: 'confetti' },
  { name: '秋意浓浓 (枫叶)', value: 'linear-gradient(to bottom, #d97706, #78350f)', particles: 'leaves' }
];

const INITIAL_CARD: GreetingCardConfig = {
  id: 'card_demo',
  title: '我的生日快乐贺卡',
  bgType: 'gradient',
  bgGradient: 'linear-gradient(to bottom, #1e1b4b, #311042)',
  bgColor: '#000000',
  mediaType: 'none',
  mediaUrl: '',
  mediaName: '',
  particles: 'snow',
  musicTheme: 'silent',
  animationSpeed: 3,
  textElements: [
    { id: 't_1', text: '🎂 生日快乐 🎂', color: '#ffea00', fontSize: 28, x: 50, y: 30, animation: 'heartbeat' },
    { id: 't_2', text: '愿你往后余生，眼里含笑，手里有花！', color: '#ffffff', fontSize: 16, x: 50, y: 70, animation: 'bounce' }
  ]
};

export default function CardBuilder() {
  const [config, setConfig] = useState<GreetingCardConfig>({
    ...INITIAL_CARD,
    cardWidth: 365,
    cardHeight: 610,
    cardBorderRadius: 28,
    cardBoxShadow: 'soft',
    glassmorphism: false,
    buttons: []
  });
  const [selectedTextId, setSelectedTextId] = useState<string | null>('t_1');
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [cardEditorTab, setCardEditorTab] = useState<'content' | 'style' | 'advanced'>('content');
  
  const [playingMusic, setPlayingMusic] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  
  // Offline compiler states
  const [cardInputText, setCardInputText] = useState<string>(
    `🎉 祝你生日快乐！\n愿你眼里含笑，手里有花，往后余生，幸福常伴！\n🎂 心想事成，岁岁平安！ /theme:birthday\n[了解惊喜](https://ai.studio/build)`
  );
  const [isCompilingCardText, setIsCompilingCardText] = useState(false);

  // Heuristic rule-based offline text compilation engine
  const compileTextToCard = async (text: string) => {
    setIsCompilingCardText(true);
    // satisfying micro-delay for compiling response
    await new Promise(resolve => setTimeout(resolve, 550));
    try {
      if (!text.trim()) {
        alert('请在文本框中输入您的祝福词或大纲主旨！');
        return;
      }

      const lines = text.split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      if (lines.length === 0) {
        alert('未检测到有效的文本行，请在输入框中至少输入一行话！');
        return;
      }

      // Defaults
      let detectedGradient = GRADIENTS[2].value; // Starry Blue
      let detectedParticles: ParticleType = 'stars';
      let detectedMusic: GreetingCardConfig['musicTheme'] = 'ambient';
      let cardTitle = '极速编译祝福贺卡';

      const fullText = text.toLowerCase();

      // Check tags
      let customThemeTag = '';
      const themeMatch = fullText.match(/\/theme:([a-zA-Z0-9_\u4e00-\u9fa5]+)/);
      if (themeMatch) {
        customThemeTag = themeMatch[1];
      }

      let customParticlesTag: ParticleType | null = null;
      const particlesMatch = fullText.match(/\/particles:([a-z]+)/);
      if (particlesMatch && ['snow', 'hearts', 'stars', 'confetti', 'leaves', 'none'].includes(particlesMatch[1])) {
        customParticlesTag = particlesMatch[1] as ParticleType;
      }

      let customMusicTag: GreetingCardConfig['musicTheme'] | null = null;
      const musicMatch = fullText.match(/\/music:([a-z]+)/);
      if (musicMatch && ['silent', 'birthday', 'romantic', 'lullaby', 'ambient', 'christmas'].includes(musicMatch[1])) {
        customMusicTag = musicMatch[1] as GreetingCardConfig['musicTheme'];
      }

      // Theme Selection Heuristics
      if (customThemeTag === 'birthday' || fullText.includes('生日') || fullText.includes('蛋糕') || fullText.includes('寿') || fullText.includes('🎂')) {
        detectedGradient = GRADIENTS[3].value; // Golden New Year Red / Birthday Orange Glimmer (uses confetti)
        detectedParticles = 'confetti';
        detectedMusic = 'birthday';
        cardTitle = '🎂 祝你生日快乐';
      } else if (customThemeTag === 'romantic' || fullText.includes('爱') || fullText.includes('情') || fullText.includes('玫瑰') || fullText.includes('心') || fullText.includes('❤️') || fullText.includes('💖') || fullText.includes('表白') || fullText.includes('喜欢') || fullText.includes('亲爱的')) {
        detectedGradient = GRADIENTS[0].value; // Romantic Rose
        detectedParticles = 'hearts';
        detectedMusic = 'romantic';
        cardTitle = '💖 浪漫温馨祝福';
      } else if (customThemeTag === 'christmas' || fullText.includes('圣诞') || fullText.includes('雪') || fullText.includes('冬') || fullText.includes('❄️')) {
        detectedGradient = GRADIENTS[1].value; // Winter Snow
        detectedParticles = 'snow';
        detectedMusic = 'christmas';
        cardTitle = '🎄 圣诞冰雪奇缘';
      } else if (customThemeTag === 'newyear' || fullText.includes('新年') || fullText.includes('春节') || fullText.includes('大吉') || fullText.includes('恭喜发财') || fullText.includes('春节') || fullText.includes('元旦') || fullText.includes('喜庆') || fullText.includes('福')) {
        detectedGradient = GRADIENTS[3].value; // Golden Auspicious Red
        detectedParticles = 'confetti';
        detectedMusic = 'birthday'; // nice sounding bells
        cardTitle = '🧧 新春大吉大利';
      } else if (customThemeTag === 'autumn' || fullText.includes('秋') || fullText.includes('枫') || fullText.includes('思') || fullText.includes('远方') || fullText.includes('时光')) {
        detectedGradient = GRADIENTS[4].value; // Autumn Leaves
        detectedParticles = 'leaves';
        detectedMusic = 'ambient';
        cardTitle = '🍁 枫叶秋意思念';
      }

      // Explicit Tag override
      if (customParticlesTag) detectedParticles = customParticlesTag;
      if (customMusicTag) detectedMusic = customMusicTag;

      const extractedButtons: any[] = [];
      const wordLines: string[] = [];

      lines.forEach((line) => {
        let clean = line
          .replace(/\/theme:[^\s]+/g, '')
          .replace(/\/particles:[^\s]+/g, '')
          .replace(/\/music:[^\s]+/g, '')
          .replace(/\/color:[^\s]+/g, '')
          .replace(/\/anim:[^\s]+/g, '')
          .trim();

        // Check for button format [Button text](https://url)
        const btnRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/;
        const btnMatch = clean.match(btnRegex);
        if (btnMatch) {
          const btnText = btnMatch[1];
          const btnUrl = btnMatch[2];
          extractedButtons.push({
            id: `btn_gen_${Date.now()}_${extractedButtons.length}`,
            text: btnText,
            url: btnUrl,
            x: 50,
            y: 80 + extractedButtons.length * 8,
            color: '#ffffff',
            bgColor: '#db2777', // pink-600
            fontSize: 13,
            borderRadius: 18,
            animation: 'pulse'
          });
          clean = clean.replace(btnRegex, '').trim();
        }

        if (clean.length > 0) {
          wordLines.push(line);
        }
      });

      const textElements: GreetingText[] = [];
      const totalWords = wordLines.length;

      wordLines.forEach((rawLine, idx) => {
        let textVal = rawLine;

        // Color override via hex `#` or `/color:#hex`
        let itemColor = '#ffffff';
        const hexMatch = rawLine.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
        if (hexMatch) {
          itemColor = hexMatch[0];
          textVal = textVal.replace(hexMatch[0], '').trim();
        }
        const colorTagMatch = rawLine.match(/\/color:(#[0-9a-fA-F]{6})/);
        if (colorTagMatch) {
          itemColor = colorTagMatch[1];
          textVal = textVal.replace(colorTagMatch[0], '').trim();
        }

        // Animation tag override e.g., `/anim:zoom`
        let itemAnim: GreetingText['animation'] = 'fade';
        const animMatch = rawLine.match(/\/anim:(fade|bounce|slide|zoom|heartbeat)/);
        if (animMatch) {
          itemAnim = animMatch[1] as GreetingText['animation'];
          textVal = textVal.replace(animMatch[0], '').trim();
        } else {
          // Decent animated rhythms based on structure
          if (idx === 0) itemAnim = 'heartbeat';
          else if (idx === totalWords - 1) itemAnim = 'bounce';
          else itemAnim = 'fade';
        }

        // Clean out metadata tags from content displayed to user
        textVal = textVal
          .replace(/\/theme:[^\s]+/gi, '')
          .replace(/\/particles:[^\s]+/gi, '')
          .replace(/\/music:[^\s]+/gi, '')
          .replace(/[\/\s]+$/, '')
          .trim();

        if (!textVal) return;

        // Position alignment
        let calculatedY = 32;
        if (totalWords > 1) {
          const spaceStep = 45 / (totalWords - 1);
          calculatedY = Math.round(20 + idx * spaceStep);
        } else {
          calculatedY = 40;
        }

        // Sizing hierarchy
        let calculatedSize = 16;
        if (idx === 0) {
          calculatedSize = totalWords === 1 ? 24 : 26;
          if (itemColor === '#ffffff') itemColor = '#ffea00'; // high-contrast gorgeous yellow header
        } else if (idx === totalWords - 1 && totalWords > 2) {
          calculatedSize = 15;
          if (itemColor === '#ffffff') itemColor = '#a5f3fc'; // elegant soft cyan footer
        }

        textElements.push({
          id: `t_gen_${idx}_${Date.now()}`,
          text: textVal,
          color: itemColor,
          fontSize: calculatedSize,
          x: 50,
          y: calculatedY,
          animation: itemAnim
        });
      });

      const updatedConfig: GreetingCardConfig = {
        ...config,
        title: cardTitle,
        bgType: 'gradient',
        bgGradient: detectedGradient,
        bgColor: '#000000',
        particles: detectedParticles,
        musicTheme: detectedMusic,
        textElements: textElements.length > 0 ? textElements : [
          { id: 't_f1', text: '🎂 生日快乐 🎂', color: '#ffea00', fontSize: 28, x: 50, y: 30, animation: 'heartbeat' },
          { id: 't_f2', text: '心想事成，岁岁平安！', color: '#ffffff', fontSize: 16, x: 50, y: 65, animation: 'bounce' }
        ],
        buttons: extractedButtons
      };

      setConfig(updatedConfig);

      if (textElements.length > 0) {
        setSelectedTextId(textElements[0].id);
      }
      setSelectedButtonId(null);

      if (playingMusic) {
        AudioEngine.start(detectedMusic);
      }

      alert('🎉 零AI·文本生成贺卡成功！本地静态规则引擎已识别并编译您的大纲，自动为您匹配环境音轨、动态悬浮氛围并进行精细排版！');
    } catch (err: any) {
      console.error(err);
      alert('排版生成中发生错误，请检查文本格式！');
    } finally {
      setIsCompilingCardText(false);
    }
  };
  
  // DRAG STATE
  const [isDragging, setIsDragging] = useState(false);
  const dragTargetRef = useRef<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio start/stop on component unmount
  useEffect(() => {
    return () => {
      AudioEngine.stop();
    };
  }, []);

  const toggleMusic = () => {
    if (playingMusic) {
      AudioEngine.stop();
      setPlayingMusic(false);
    } else {
      AudioEngine.start(config.musicTheme);
      setPlayingMusic(true);
    }
  };

  const handleMusicThemeChange = (theme: typeof config.musicTheme) => {
    setConfig({ ...config, musicTheme: theme });
    if (playingMusic) {
      AudioEngine.start(theme);
    }
  };

  // Upload custom GIFs or Video files
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    let detectedType: CardMediaType = 'none';

    if (fileType.includes('gif')) {
      detectedType = 'gif';
    } else if (fileType.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
      detectedType = 'video';
    } else if (fileType.includes('image')) {
      detectedType = 'image';
    } else {
      alert('系统仅支持拖入或上传 GIF、常规图片（PNG/JPG）或者 MP4 格式的循环背景视频！');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setConfig({
        ...config,
        mediaType: detectedType,
        mediaUrl: reader.result as string,
        mediaName: file.name
      });
      alert(`已成功解析动画背景素材：${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Text Box Logic
  const addTextElement = () => {
    const id = `t_${Date.now()}`;
    const newText: GreetingText = {
      id,
      text: '请在此处键入祝福文字...',
      color: '#ffffff',
      fontSize: 18,
      x: 50,
      y: 50,
      animation: 'fade'
    };
    setConfig({
      ...config,
      textElements: [...config.textElements, newText]
    });
    setSelectedTextId(id);
    setSelectedButtonId(null);
  };

  const deleteTextElement = (id: string) => {
    if (config.textElements.length <= 1) {
      alert('请保留至少一处文本内容用于展示祝福！');
      return;
    }
    setConfig({
      ...config,
      textElements: config.textElements.filter(txt => txt.id !== id)
    });
    setSelectedTextId(config.textElements[0].id);
  };

  const updateTextElement = (id: string, key: keyof GreetingText, value: any) => {
    setConfig(prev => ({
      ...prev,
      textElements: prev.textElements.map(txt => {
        if (txt.id === id) {
          return { ...txt, [key]: value };
        }
        return txt;
      })
    }));
  };

  // Clickable Buttons Logic
  const addButtonElement = () => {
    const id = `b_${Date.now()}`;
    const newBtn = {
      id,
      text: '了解惊喜 💖',
      url: 'https://',
      x: 50,
      y: 80,
      color: '#ffffff',
      bgColor: '#e11d48',
      fontSize: 14,
      borderRadius: 12,
      animation: 'pulse' as const
    };
    setConfig(prev => ({
      ...prev,
      buttons: [...(prev.buttons || []), newBtn]
    }));
    setSelectedButtonId(id);
    setSelectedTextId(null);
  };

  const deleteButtonElement = (id: string) => {
    setConfig(prev => ({
      ...prev,
      buttons: (prev.buttons || []).filter(btn => btn.id !== id)
    }));
    setSelectedButtonId(null);
  };

  const updateButtonElement = (id: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      buttons: (prev.buttons || []).map(btn => {
        if (btn.id === id) {
          return { ...btn, [key]: value };
        }
        return btn;
      })
    }));
  };

  // Pointer/Mouse Drag coordinate computation
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    dragTargetRef.current = id;
    setIsDragging(true);
    
    if (id.startsWith('t_')) {
      setSelectedTextId(id);
      setSelectedButtonId(null);
    } else if (id.startsWith('b_')) {
      setSelectedButtonId(id);
      setSelectedTextId(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragTargetRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Compute current position relative coordinates as percentage (0-100)
    let px = ((e.clientX - rect.left) / rect.width) * 100;
    let py = ((e.clientY - rect.top) / rect.height) * 100;

    // Bounds checking
    px = Math.max(2, Math.min(98, px));
    py = Math.max(2, Math.min(98, py));

    const id = dragTargetRef.current;
    if (id.startsWith('t_')) {
      updateTextElement(id, 'x', Math.round(px));
      updateTextElement(id, 'y', Math.round(py));
    } else if (id.startsWith('b_')) {
      updateButtonElement(id, 'x', Math.round(px));
      updateButtonElement(id, 'y', Math.round(py));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragTargetRef.current = null;
  };

  // Trigger high-res vector picture compile and download
  const handleExportHighResImage = () => {
    setIsExportingImage(true);
    
    // Create an offline mega-canvas (1600x1600 px) for high definition
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      alert('离线画板编译失败！');
      setIsExportingImage(false);
      return;
    }

    // 1. Draw Background Graduate matching Selected preset
    const gradient = ctx.createLinearGradient(0, 0, 0, 1600);
    if (config.bgType === 'gradient') {
      // Parse hex colors from config.bgGradient using regex
      const colors = config.bgGradient.match(/#[a-fA-F0-9]{6}/g);
      if (colors && colors.length >= 2) {
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
      } else {
        // Fallbacks
        gradient.addColorStop(0, '#111827');
        gradient.addColorStop(1, '#030712');
      }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = config.bgColor || '#1e1b4b';
    }
    ctx.fillRect(0, 0, 1600, 1600);

    // 2. Draw Vector themed decorations to look incredibly high-quality
    if (config.particles === 'hearts') {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
      for (let i = 0; i < 18; i++) {
        const hx = Math.sin(i) * 500 + 800;
        const hy = Math.cos(i * 1.5) * 500 + 800;
        const size = 30 + (i % 4) * 20;
        drawVectorHeart(ctx, hx, hy, size);
      }
    } else if (config.particles === 'snow') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const sx = (i * 47) % 1600;
        const sy = (i * i * 31) % 1600;
        const r = 2 + (i % 4) * 2;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Draw minimal cute vector pines at bottom borders
      ctx.fillStyle = 'rgba(15, 118, 110, 0.25)';
      drawVectorPine(ctx, 300, 1400, 180);
      drawVectorPine(ctx, 1300, 1400, 160);
    } else if (config.particles === 'stars') {
      ctx.fillStyle = 'rgba(253, 224, 71, 0.4)';
      for (let i = 0; i < 35; i++) {
        const kx = (i * 59) % 1600;
        const ky = (i * 23 * i) % 1600;
        const r = 3 + (i % 3) * 3;
        drawVectorStar(ctx, kx, ky, r);
      }
    }

    // 3. Draw client uploaded media base64 illustration frame in center
    if (config.mediaUrl && config.mediaType !== 'none') {
      const img = new Image();
      img.onload = () => {
        // Draw centered and framed beautifully
        const frameW = 600;
        const frameH = 450;
        const fx = 800 - frameW / 2;
        const fy = 800 - frameH / 2;

        // Draw shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 30;
        ctx.fillStyle = '#ffffff';
        // Round card frame path
        ctx.beginPath();
        ctx.roundRect?.(fx - 15, fy - 15, frameW + 30, frameH + 30, 24);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Draw central image
        ctx.drawImage(img, fx, fy, frameW, frameH);
        
        // Complete print of text and trigger download down below inside the block
        completeTextAndTriggerDownload(ctx, canvas);
      };
      img.referrerPolicy = "no-referrer";
      img.src = config.mediaUrl;
    } else {
      // No image frame, directly write texts
      completeTextAndTriggerDownload(ctx, canvas);
    }
  };

  const completeTextAndTriggerDownload = (ctx: CanvasRenderingContext2D | any, canvas: HTMLCanvasElement) => {
    // 4. Draw texts cleanly with white strokes to ensure ultra readability
    config.textElements.forEach(txt => {
      // Set precise Font with defaults to 雅黑
      ctx.font = `bold ${txt.fontSize * 1.8}px "Microsoft YaHei", "微软雅黑"`;
      ctx.fillStyle = txt.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Map percentage to canvas width / height boundaries
      const tx = (txt.x / 100) * 1600;
      const ty = (txt.y / 100) * 1600;

      // Drop shadow stroke for optimal color contrast on gradient backgrounds
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.lineWidth = 10;
      ctx.strokeText(txt.text, tx, ty);
      ctx.fillText(txt.text, tx, ty);
    });

    // 5. Trigger download event
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${config.title || 'greetings'}_high_res.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExportingImage(false);
  };

  // Helper Vector Geometry printers to keep high scale vectors crisp
  const drawVectorHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0, -size / 4);
    ctx.bezierCurveTo(-size / 2, -size, -size, -size / 3, -size, 0);
    ctx.bezierCurveTo(-size, size / 2, -size / 4, size, 0, size * 1.1);
    ctx.bezierCurveTo(size / 4, size, size, size / 2, size, 0);
    ctx.bezierCurveTo(size, -size / 3, size / 2, -size, 0, -size / 4);
    ctx.fill();
    ctx.restore();
  };

  const drawVectorPine = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    // Draw trunk
    ctx.fillStyle = 'rgba(120, 53, 15, 0.3)';
    ctx.fillRect(-size * 0.1, 0, size * 0.2, size * 0.3);

    // Draw three pine rows
    ctx.fillStyle = 'rgba(20, 110, 120, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(-size / 2, -size / 3);
    ctx.lineTo(size / 2, -size / 3);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.lineTo(-size * 0.6, -size * 0.1);
    ctx.lineTo(size * 0.6, -size * 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.4);
    ctx.lineTo(-size * 0.7, 0);
    ctx.lineTo(size * 0.7, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawVectorStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
    const rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / 5;

    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    for (let i = 0; i < 5; i++) {
      x = cx + Math.cos(rot + i * step * 2) * r;
      y = cy + Math.sin(rot + i * step * 2) * r;
      ctx.lineTo(x, y);
      x = cx + Math.cos(rot + (i * 2 + 1) * step) * (r * 0.5);
      y = cy + Math.sin(rot + (i * 2 + 1) * step) * (r * 0.5);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Publish to database for persistent sharing link API
  const handlePublishCard = async () => {
    setIsPublishing(true);
    setShareLink('');
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'card',
          cardData: config
        })
      });
      const data = await response.json();
      if (data.id) {
        setShareLink(`${window.location.origin}/share/${data.id}`);
      } else {
        alert('发布生成贺卡链接失败，请重试');
      }
    } catch (e) {
      console.error(e);
      alert('保存错误，服务器已自动恢复本地模拟暂存。');
    } finally {
      setIsPublishing(false);
    }
  };

  // Generate falling particles lists visually in background
  const renderVisualParticles = () => {
    if (config.particles === 'none') return null;

    const items = Array.from({ length: 25 });
    return items.map((_, i) => {
      const left = (i * 5.7 * 7) % 100;
      const duration = 6 + (i % 5) * 3;
      const drift = -60 + (i % 4) * 40;
      const delay = -(i * 0.4);

      let content: React.ReactNode = '❄️';
      
      if (config.particles === 'hearts') {
        content = <Heart className="fill-rose-500 stroke-rose-400 opacity-60 w-5 h-5 animate-heartbeat" />;
      } else if (config.particles === 'stars') {
        content = <Star className="fill-yellow-400 stroke-yellow-300 opacity-50 w-4 h-4" />;
      } else if (config.particles === 'confetti') {
        const colors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-sky-400'];
        const randomColor = colors[i % colors.length];
        content = <div className={`w-3.5 h-3.5 rounded-full ${randomColor} opacity-70`} />;
      } else if (config.particles === 'leaves') {
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

  const activeText = config.textElements.find(txt => txt.id === selectedTextId);
  const activeButton = (config.buttons || []).find(btn => btn.id === selectedButtonId);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)] bg-slate-50 text-slate-800">
      
      {/* LEFT COLUMN: CONTROL SUITE (Elementor Three-Tab Design) */}
      <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col">
        
        {/* Elementor-style Tabs Header */}
        <div className="flex border-b border-slate-150 bg-slate-50 shrink-0 sticky top-0 z-10">
          {(['content', 'style', 'advanced'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCardEditorTab(tab)}
              className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${cardEditorTab === tab ? 'border-pink-600 text-pink-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'}`}
            >
              {tab === 'content' && <Sparkles className="w-3.5 h-3.5" />}
              {tab === 'style' && <Palette className="w-3.5 h-3.5" />}
              {tab === 'advanced' && <Sliders className="w-3.5 h-3.5" />}
              {tab === 'content' ? '内容 (Content)' : tab === 'style' ? '样式 (Style)' : '高阶 (Advanced)'}
            </button>
          ))}
        </div>

        {/* Tab content wrapper with generous padding */}
        <div className="p-4 flex flex-col gap-4.5 flex-1">
          
          {/* TAB 1: CONTENT (内容) */}
          {cardEditorTab === 'content' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              
              {/* Rule-based Text to Greeting Card Compiler Zone */}
              <div className="bg-gradient-to-br from-pink-50/70 to-indigo-50/70 border border-pink-100 rounded-xl p-3 flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-pink-700 flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
                    ✍️ 零AI·极速文本编译贺卡 (100%本地)
                  </span>
                  <span className="text-[9px] bg-pink-100 text-pink-700 font-extrabold tracking-wide px-1.5 py-0.5 rounded scale-90 uppercase">
                    安全高效
                  </span>
                </div>
                
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                  输入您的特色祝福语大纲（支持指定每行文字及主题标签）。本地编译引擎将在毫秒级重绘卡片，智能选择动效音轨与场景氛围。
                </p>

                {isCompilingCardText ? (
                  <div className="flex flex-col items-center justify-center py-6 bg-white/70 border border-pink-100 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-pink-600 mb-1.5 animate-spin" />
                    <h4 className="text-[11px] font-bold text-slate-700 animate-pulse">
                      正在极速映射与排版中...
                    </h4>
                    <p className="text-[9px] text-slate-400">智能推导背景粒子与音乐伴奏</p>
                  </div>
                ) : (
                  <textarea
                    value={cardInputText}
                    onChange={(e) => setCardInputText(e.target.value)}
                    placeholder="请输入祝福文本...&#10;第一行：主标题&#10;第二行及以后：副祝福语&#10;如：/theme:birthday"
                    className="w-full h-24 p-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 resize-none leading-normal"
                  />
                )}

                {/* Quick Templates List */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400">💡 快速载入精美祝福大纲：</span>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const txt = `🎉 祝你生日快乐！ #ffea00\n长路漫漫，愿你眼存星海，怀揣炽热！\n🎂 心想事成，岁岁平安！ /theme:birthday\n[点此了解惊喜](https://ai.studio/build)`;
                        setCardInputText(txt);
                        compileTextToCard(txt);
                      }}
                      className="text-[9px] bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-200 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer"
                    >
                      🎂 生日祝福
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = `💖 余生请多指教 #f43f5e\n遇见你是我这辈子最美好的意外！\n🌹 执子之手，与子偕老。 /theme:romantic\n[开启我们的故事](https://ai.studio/build)`;
                        setCardInputText(txt);
                        compileTextToCard(txt);
                      }}
                      className="text-[9px] bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-200 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer"
                    >
                      💖 浪漫告白
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = `🎄 圣诞平安祥瑞 #38bdf8\n愿晶莹雪花带去温暖的祝福！\n🔔 听到钟声了吗？那是我的思念。 /theme:christmas`;
                        setCardInputText(txt);
                        compileTextToCard(txt);
                      }}
                      className="text-[9px] bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-200 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer"
                    >
                      🎄 圣诞祝愿
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = `🧧 新岁启封，万事顺遂 #f43f5e\n前路浩浩荡荡，万事皆可期待！\n✨ 恭喜发财，大吉大利！ /theme:newyear`;
                        setCardInputText(txt);
                        compileTextToCard(txt);
                      }}
                      className="text-[9px] bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-200 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer"
                    >
                      🧧 新春贺喜
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = `🍁 岁序更替，时光安然 #f59e0b\n愿行你所行，爱你所爱，不虚此生！\n🍂 与你相约，在美好的明天。 /theme:autumn`;
                        setCardInputText(txt);
                        compileTextToCard(txt);
                      }}
                      className="text-[9px] bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-200 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer"
                    >
                      🍁 岁月温情
                    </button>
                  </div>
                </div>

                {/* Submitting compiled card */}
                <button
                  type="button"
                  onClick={() => compileTextToCard(cardInputText)}
                  disabled={isCompilingCardText}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-1 transition-all disabled:bg-slate-300 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  {isCompilingCardText ? '正在编译重映射中...' : '本地一键编译生成静态贺卡'}
                </button>

                {/* Advanced Compiling guide dropdown or note */}
                <div className="text-[9px] text-slate-400 bg-white/40 p-1.5 rounded-md border border-dashed border-slate-200 leading-relaxed">
                  <span className="font-bold text-slate-500 block">💡 编译高级语法糖：</span>
                  • <b className="text-slate-600 font-semibold">双向多行映射：</b>每一行生成一个祝福文字图层（首行自适应变大标题）<br />
                  • <b className="text-slate-600 font-semibold">色彩和动效：</b>包含 <code className="text-pink-600">#f43f5e</code> 手工配色，可用 <code className="text-pink-600">/anim:bounce</code> 关联动画律动<br />
                  • <b className="text-slate-600 font-semibold">快速关联按钮：</b>末尾写入 <code className="text-pink-600">[跳转文字](链接)</code> 即可自动插桩可跳转交互按钮<br />
                  • <b className="text-slate-600 font-semibold">指定物理主题：</b>使用 <code className="text-pink-650">/theme:birthday</code> 等指定烘托氛围。
                </div>
              </div>

              {/* Preset Background Gradients */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">📦 选择风格背景渐变</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g.name}
                      onClick={() => setConfig({
                        ...config,
                        bgType: 'gradient',
                        bgGradient: g.value,
                        particles: g.particles as ParticleType
                      })}
                      className={`text-[10px] py-1.5 px-2 rounded-lg border text-left font-semibold truncate transition-all cursor-pointer ${config.bgGradient === g.value && config.bgType === 'gradient' ? 'bg-pink-600 border-pink-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pure Color Fallback Option */}
              <div className="flex items-center justify-between gap-1 bg-slate-50 p-2 border border-slate-200 rounded-lg">
                <span className="text-xs text-slate-600 font-bold">🎯 或使用单色背景 (Solid Color)</span>
                <input 
                  type="color"
                  value={config.bgColor || '#000000'}
                  onChange={(e) => setConfig({ ...config, bgType: 'color', bgColor: e.target.value })}
                  className="w-8 h-6 rounded border border-slate-300 cursor-pointer p-0"
                />
              </div>

              {/* Falling Particles Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">✨ 添加氛围悬浮物粒子 (Particles)</label>
                <div className="grid grid-cols-3 gap-1 mt-0.5">
                  {(['snow', 'hearts', 'stars', 'confetti', 'leaves', 'none'] as ParticleType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setConfig({ ...config, particles: p })}
                      className={`text-[10px] py-1 rounded border font-semibold cursor-pointer transition-all ${config.particles === p ? 'bg-pink-600 text-white border-pink-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {p === 'snow' ? '❄️ 飘雪' : 
                       p === 'hearts' ? '❤️ 粉心' :
                       p === 'stars' ? '⭐️ 星海' :
                       p === 'confetti' ? '✨ 彩带' :
                       p === 'leaves' ? '🍁 枫叶' : '无粒子'}
                    </button>
                  ))}
                </div>
              </div>

              {/* GIF / Video background loader */}
              <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">🖼️ 拖入 动画GIF / 背景短视频 / 精美图片</span>
                  {config.mediaType !== 'none' && (
                    <button 
                      onClick={() => setConfig({ ...config, mediaType: 'none', mediaUrl: '', mediaName: '' })}
                      className="text-[10px] text-red-500 hover:underline font-bold cursor-pointer"
                    >
                      删除
                    </button>
                  )}
                </div>

                <div className="border border-indigo-100 rounded-xl p-2.5 bg-slate-50/50 flex flex-col gap-2">
                  <label className="border-2 border-dashed border-indigo-150 hover:border-pink-400 bg-white p-2.5 rounded-lg cursor-pointer text-center block transition-all">
                    <FileImage className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-indigo-700 block">上传本地 GIF 动画 / MP4视频</span>
                    <span className="text-[9px] text-slate-400 mt-0.5 block truncate max-w-full">
                      {config.mediaName ? `已载入: ${config.mediaName}` : '（支持拖放，大图视频中央填充）'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*,video/*" 
                      onChange={handleMediaUpload} 
                      className="hidden" 
                    />
                  </label>

                  {/* CUSTOM IMAGE HYPERLINK OVERLAY */}
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-[10px] font-extrabold text-slate-600">🔗 中央图片/GIF 跳转超链接 URL</label>
                    <input 
                      type="text"
                      placeholder="https://example.com/story-of-us"
                      value={config.mediaLink || ''}
                      onChange={(e) => setConfig({ ...config, mediaLink: e.target.value })}
                      className="text-xs bg-white border border-slate-200 px-2 py-1.5 rounded focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Web Audio Synthesizer */}
              <div className="bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> 
                    <span>Web Audio 合成伴奏伴音</span>
                  </span>
                  <button 
                    onClick={toggleMusic}
                    className={`px-2.5 py-1 rounded text-[10px] font-extrabold flex items-center gap-1 shadow-sm transition-colors cursor-pointer ${playingMusic ? 'bg-rose-500 text-white' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
                  >
                    {playingMusic ? '停止音乐' : '乐曲试听'}
                  </button>
                </div>
                <select
                  value={config.musicTheme}
                  onChange={(e) => handleMusicThemeChange(e.target.value as any)}
                  className="text-xs w-full bg-white border border-slate-200 p-1.5 rounded-lg font-semibold focus:outline-none focus:border-pink-500"
                >
                  <option value="silent">🔇 静音 (Silent)</option>
                  <option value="birthday">🎂 生日快乐金曲 (Bells)</option>
                  <option value="christmas">🎄 圣诞佳节礼赞 (Chimes)</option>
                  <option value="romantic">💖 浪漫竖琴大调 (Valentine)</option>
                  <option value="ambient">🌊 治愈疗愈心流 (Ambient)</option>
                </select>
              </div>

              {/* Text elements list */}
              <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">✍️ 祝福文字图层</span>
                  <button 
                    onClick={addTextElement}
                    className="px-2 py-0.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 rounded text-[9px] font-extrabold flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="w-2.5 h-2.5" /> 加祝福字
                  </button>
                </div>

                <div className="flex gap-1 overflow-x-auto max-w-full pb-1">
                  {config.textElements.map(txt => (
                    <button
                      key={txt.id}
                      onClick={() => { setSelectedTextId(txt.id); setSelectedButtonId(null); }}
                      className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border shrink-0 text-left cursor-pointer transition-all ${selectedTextId === txt.id ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                    >
                      T: &ldquo;{txt.text.substring(0, 5)}...&rdquo;
                    </button>
                  ))}
                </div>

                {activeText && (
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold text-slate-500">正在编辑当前选中文本图层</span>
                      <button 
                        onClick={() => deleteTextElement(activeText.id)}
                        className="text-red-500 text-[10px] font-bold hover:underline"
                      >
                        删除此段
                      </button>
                    </div>

                    <textarea
                      value={activeText.text}
                      onChange={(e) => updateTextElement(activeText.id, 'text', e.target.value)}
                      className="text-xs bg-white border border-slate-250 p-1.5 rounded w-full font-sans"
                      rows={2}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between">
                        <span>文字色彩</span>
                        <input 
                          type="color"
                          value={activeText.color}
                          onChange={(e) => updateTextElement(activeText.id, 'color', e.target.value)}
                          className="w-7 h-5 rounded cursor-pointer p-0 border border-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>字号: {activeText.fontSize}px</span>
                        <input 
                          type="range"
                          min={12}
                          max={38}
                          value={activeText.fontSize}
                          onChange={(e) => updateTextElement(activeText.id, 'fontSize', parseInt(e.target.value))}
                          className="w-20 accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <span className="text-[9px] text-slate-500">缓动入场特效</span>
                      <select
                        value={activeText.animation}
                        onChange={(e) => updateTextElement(activeText.id, 'animation', e.target.value as any)}
                        className="text-xs bg-white border p-1 rounded font-semibold"
                      >
                        <option value="fade">🌟 缓缓淡入 (Fade-In)</option>
                        <option value="bounce">篮球 弹性跳跃 (Bounce)</option>
                        <option value="slide">横向侧滑 (Slide-In)</option>
                        <option value="zoom">渐近放大 (Zoom-In)</option>
                        <option value="heartbeat">爱心膨胀 (Heartbeat)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* OVERLAY INTERACTIVE BUTTONS SECTION */}
              <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">🔳 贺卡交互动作按钮 Overlay</span>
                  <button 
                    onClick={addButtonElement}
                    className="px-2 py-0.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-750 rounded text-[9px] font-extrabold flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="w-2.5 h-2.5" /> 加跳转键
                  </button>
                </div>

                <div className="flex gap-1 overflow-x-auto max-w-full pb-1">
                  {(config.buttons || []).map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => { setSelectedButtonId(btn.id); setSelectedTextId(null); }}
                      className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border shrink-0 text-left cursor-pointer transition-all ${selectedButtonId === btn.id ? 'bg-amber-600 text-white border-amber-600 shadow' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                    >
                      B: &ldquo;{btn.text.substring(0, 5)}...&rdquo;
                    </button>
                  ))}
                  {(config.buttons || []).length === 0 && (
                    <span className="text-[10px] text-slate-400 font-medium py-1">当前没有交互按钮，点击加跳转键生成</span>
                  )}
                </div>

                {activeButton && (
                  <div className="bg-amber-50/50 border border-amber-200 p-2.5 rounded-lg flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold text-amber-800">正在定制选中的交互层按钮</span>
                      <button 
                        onClick={() => deleteButtonElement(activeButton.id)}
                        className="text-red-500 text-[10px] font-bold hover:underline"
                      >
                        删除
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-slate-500">按钮文字</span>
                        <input 
                          type="text"
                          value={activeButton.text}
                          onChange={(e) => updateButtonElement(activeButton.id, 'text', e.target.value)}
                          className="bg-white border p-1 rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-slate-500">跳转目标超链接 URL</span>
                        <input 
                          type="text"
                          placeholder="https://"
                          value={activeButton.url}
                          onChange={(e) => updateButtonElement(activeButton.id, 'url', e.target.value)}
                          className="bg-white border p-1 rounded font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between">
                        <span>文字色</span>
                        <input 
                          type="color"
                          value={activeButton.color}
                          onChange={(e) => updateButtonElement(activeButton.id, 'color', e.target.value)}
                          className="w-7 h-5 rounded cursor-pointer p-0 border border-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>背景色</span>
                        <input 
                          type="color"
                          value={activeButton.bgColor}
                          onChange={(e) => updateButtonElement(activeButton.id, 'bgColor', e.target.value)}
                          className="w-7 h-5 rounded cursor-pointer p-0 border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between">
                        <span>字号: {activeButton.fontSize}px</span>
                        <input 
                          type="range"
                          min={12}
                          max={26}
                          value={activeButton.fontSize}
                          onChange={(e) => updateButtonElement(activeButton.id, 'fontSize', parseInt(e.target.value))}
                          className="w-16 accent-amber-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>圆角: {activeButton.borderRadius}px</span>
                        <input 
                          type="range"
                          min={0}
                          max={30}
                          value={activeButton.borderRadius}
                          onChange={(e) => updateButtonElement(activeButton.id, 'borderRadius', parseInt(e.target.value))}
                          className="w-16 accent-amber-600"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <span className="text-[9px] text-slate-500">吸引眼球动画特效</span>
                      <select
                        value={activeButton.animation || 'none'}
                        onChange={(e) => updateButtonElement(activeButton.id, 'animation', e.target.value)}
                        className="text-xs bg-white border p-1 rounded font-semibold"
                      >
                        <option value="none">无静止 (Static)</option>
                        <option value="pulse">💓 呼吸膨胀 (Pulse)</option>
                        <option value="bounce">🏀 弹性上下跳跃 (Bounce)</option>
                        <option value="vibrate">📣 高频微震 (Vibrate)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: STYLE (样式管理) */}
          {cardEditorTab === 'style' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1.5">📳 手机视窗画布尺寸与形状</span>

              {/* Card Size Settings */}
              <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] font-extrabold text-slate-700 block">📐 贺卡卡片高宽剪裁 (Sizing)</span>
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>最大卡片横宽 (Width)</span>
                    <b className="text-pink-600">{config.cardWidth ?? 365}px</b>
                  </div>
                  <input 
                    type="range"
                    min={280}
                    max={480}
                    step={5}
                    value={config.cardWidth ?? 365}
                    onChange={(e) => setConfig({ ...config, cardWidth: parseInt(e.target.value) })}
                    className="w-full h-1.5 accent-pink-600 bg-slate-250 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>最大卡片纵高 (Height)</span>
                    <b className="text-pink-600">{config.cardHeight ?? 610}px</b>
                  </div>
                  <input 
                    type="range"
                    min={420}
                    max={720}
                    step={10}
                    value={config.cardHeight ?? 610}
                    onChange={(e) => setConfig({ ...config, cardHeight: parseInt(e.target.value) })}
                    className="w-full h-1.5 accent-pink-600 bg-slate-250 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Glassmorphism options toggle */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700">🔮 磨砂玻璃特效 (Glassmorphism)</span>
                  <span className="text-[10px] text-slate-400">开启后将有一层高阶背景磨砂阻挡毛玻璃浮层</span>
                </div>
                <input 
                  type="checkbox"
                  checked={config.glassmorphism || false}
                  onChange={(e) => setConfig({ ...config, glassmorphism: e.target.checked })}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 cursor-pointer"
                />
              </div>

              {/* Corner Radius customization */}
              <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs text-slate-700">
                  <span className="font-bold">🔳 手机视窗圆角 (Corner Radius)</span>
                  <span className="text-pink-600 font-mono">{config.cardBorderRadius ?? 36}px</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={48}
                  step={2}
                  value={config.cardBorderRadius ?? 36}
                  onChange={(e) => setConfig({ ...config, cardBorderRadius: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-pink-600 bg-slate-250 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Card Box Shadow & Glow border selections */}
              <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">🌌 卡片描边与环境光阴影 (Box Shadow Preset)</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'none', name: '无阴影' },
                    { id: 'soft', name: '雅致软影 (Soft)' },
                    { id: 'laser-glow', name: '极光闪耀 (Laser)' },
                    { id: 'gold-border', name: '至尊金框 (Royal)' },
                  ].map(sh => (
                    <button
                      key={sh.id}
                      onClick={() => setConfig({ ...config, cardBoxShadow: sh.id as any })}
                      className={`text-[10px] py-1.5 rounded border font-bold text-center cursor-pointer transition-all ${ (config.cardBoxShadow || 'soft') === sh.id ? 'bg-pink-600 text-white border-pink-600 shadow' : 'bg-white text-slate-705 border-slate-200 hover:bg-slate-50'}`}
                    >
                      {sh.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ADVANCED (高级精密调整) */}
          {cardEditorTab === 'advanced' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1.5">🎯 绝对定位与运动速率微调</span>

              {/* Selected component coordinate tuner */}
              <div className="flex flex-col gap-3.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Move className="w-3.5 h-3.5 text-pink-600" />
                  <span>活动坐标微调 (Precision Tuner)</span>
                </span>

                {/* Layer Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500">第一步：选择需要精密微调的图层</span>
                  <select
                    value={selectedTextId ? `txt_${selectedTextId}` : selectedButtonId ? `btn_${selectedButtonId}` : ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.startsWith('txt_')) {
                        setSelectedTextId(val.substring(4));
                        setSelectedButtonId(null);
                      } else if (val.startsWith('btn_')) {
                        setSelectedButtonId(val.substring(4));
                        setSelectedTextId(null);
                      }
                    }}
                    className="text-xs w-full bg-white border border-slate-200 p-1.5 rounded"
                  >
                    <option value="">-- 请选择微调组件 --</option>
                    {config.textElements.map(txt => (
                      <option key={txt.id} value={`txt_${txt.id}`}>祝福语：&ldquo;{txt.text.substring(0,10)}...&rdquo;</option>
                    ))}
                    {(config.buttons || []).map(btn => (
                      <option key={btn.id} value={`btn_${btn.id}`}>交互按钮：&ldquo;{btn.text.substring(0,10)}...&rdquo;</option>
                    ))}
                  </select>
                </div>

                {/* X and Y coordinate percentages */}
                {selectedTextId && activeText && (
                  <div className="flex flex-col gap-2.5 border-t border-slate-200/60 pt-2.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>水平 X 轴绝对定位</span>
                        <b>{activeText.x}%</b>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={100}
                        value={activeText.x}
                        onChange={(e) => updateTextElement(activeText.id, 'x', parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>垂直 Y 轴绝对定位</span>
                        <b>{activeText.y}%</b>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={100}
                        value={activeText.y}
                        onChange={(e) => updateTextElement(activeText.id, 'y', parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {selectedButtonId && activeButton && (
                  <div className="flex flex-col gap-2.5 border-t border-slate-200/60 pt-2.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>按钮水平 X 轴坐标</span>
                        <b>{activeButton.x}%</b>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={100}
                        value={activeButton.x}
                        onChange={(e) => updateButtonElement(activeButton.id, 'x', parseInt(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>按钮垂直 Y 轴坐标</span>
                        <b>{activeButton.y}%</b>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={100}
                        value={activeButton.y}
                        onChange={(e) => updateButtonElement(activeButton.id, 'y', parseInt(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Animation Float speed */}
              <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs text-slate-700">
                  <span className="font-bold">🛸 贺卡呼吸悬浮动效速率 (Float Speed)</span>
                  <span className="text-pink-600 font-mono">等级 {config.animationSpeed}</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={5}
                  value={config.animationSpeed}
                  onChange={(e) => setConfig({ ...config, animationSpeed: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-pink-600 bg-slate-250 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Drag drop guidelines */}
              <div className="text-[10px] text-slate-400 bg-slate-100 p-2.5 rounded-lg leading-relaxed font-sans border border-slate-200 border-dashed">
                💡 Elementor 自由模式提示：<br/>
                只需在右侧预览图上<b>按住鼠标或触控板</b>，便可直接移动任何祝福语图层以及交互按钮，位置百分比会自动同步！
              </div>

            </div>
          )}

        </div>

        {/* Outer bottom trigger commands */}
        <div className="mt-auto p-4 border-t border-slate-200 bg-slate-50 flex flex-col gap-2 shrink-0">
          <button
            onClick={handleExportHighResImage}
            disabled={isExportingImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 transition-all active:scale-97"
          >
            <Download className="w-4 h-4" />
            {isExportingImage ? '正在画制 1600x1600 超清中...' : '导出高分辨率图片文件 (超清)'}
          </button>

          <button
            onClick={handlePublishCard}
            disabled={isPublishing}
            className="w-full bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-97 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`} />
            一键分享：发布并生成唯一链接
          </button>

          {shareLink && (
            <div className="bg-white p-2.5 text-xs border border-pink-100 rounded-xl mt-1 break-all shadow-sm">
              <div className="flex justify-between items-center mb-1 border-b border-indigo-50 pb-1">
                <span className="font-extrabold text-indigo-700 text-[10px]">专属高雅贺卡专属分享网链:</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    alert('已复制该高雅贺卡专属分享链到剪贴板！');
                  }}
                  className="p-1 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <a href={shareLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-blue-600 hover:underline inline-block mt-0.5 leading-relaxed">{shareLink}</a>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT PREVIEW SCREEN */}
      <div className="flex-1 bg-slate-200 p-4 flex flex-col gap-3 overflow-y-auto items-center justify-center">
        
        {/* Helper info bar */}
        <div className="bg-white px-4 py-2 border border-slate-300 rounded-xl flex justify-between items-center text-xs text-slate-500 shrink-0 shadow-sm" style={{ width: `${config.cardWidth ?? 365}px` }}>
          <div className="flex items-center gap-1 font-semibold">
            <Move className="w-3.5 h-3.5 text-pink-500" />
            <span>自由拖拽文本或按钮</span>
          </div>
          <span className="opacity-60 text-[9px] font-mono">100% 雅黑矢向量渲染</span>
        </div>

        {/* PHONE EMULATOR CONTAINER STAGE */}
        <div 
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="rounded-[36px] overflow-hidden relative shadow-2xl flex flex-col border-[11px] border-slate-900 select-none cursor-pointer shrink-0 transition-all ease-out duration-200"
          style={{
            background: config.bgType === 'gradient' ? config.bgGradient : config.bgColor,
            width: `${config.cardWidth ?? 365}px`,
            height: `${config.cardHeight ?? 610}px`,
            borderRadius: `${config.cardBorderRadius ?? 36}px`,
            boxShadow: config.cardBoxShadow === 'soft' ? '0 20px 45px rgba(0,0,0,0.18)' :
                       config.cardBoxShadow === 'laser-glow' ? '0 0 45px 5px rgba(168, 85, 247, 0.6)' :
                       config.cardBoxShadow === 'gold-border' ? '0 0 0 5px #f59e0b, 0 10px 40px rgba(0,0,0,0.45)' :
                       '0 4px 6px -1px rgba(0,0,0,0.1)',
            fontFamily: '"Microsoft YaHei", "微软雅黑"'
          }}
        >
          
          {/* Glassmorphic overlay frost container */}
          {config.glassmorphism && (
            <div className="absolute inset-0 bg-white/10 dark:bg-black/15 backdrop-blur-md border border-white/20 rounded-[inherit] pointer-events-none z-[1]" />
          )}

          {/* Audio active pulse widget */}
          {playingMusic && (
            <div className="absolute top-5 right-5 z-20 bg-black/45 text-white/90 p-2 rounded-full backdrop-blur-md border border-white/10 animate-pulse flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            </div>
          )}

          {/* Interactive particles element overlay */}
          {renderVisualParticles()}

          {/* Central Media Asset */}
          {config.mediaUrl && config.mediaType !== 'none' && (
            <div className="w-full h-full flex items-center justify-center p-6 z-0 absolute inset-0">
              {config.mediaLink ? (
                <a 
                  href={config.mediaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full max-h-[290px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-lg flex items-center justify-center hover:scale-[1.01] transition-transform pointer-events-auto"
                >
                  {config.mediaType === 'video' ? (
                    <video 
                      src={config.mediaUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={config.mediaUrl} 
                      alt="animated config backdrop"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </a>
              ) : (
                <div className="w-full max-h-[290px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-lg flex items-center justify-center pointer-events-none">
                  {config.mediaType === 'video' ? (
                    <video 
                      src={config.mediaUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={config.mediaUrl} 
                      alt="animated config backdrop"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Text Labels with dragging handlers */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {config.textElements.map(txt => {
              const isSelected = txt.id === selectedTextId;
              
              // Map entry CSS transition properties based on config animation selections
              let animClass = '';
              if (txt.animation === 'heartbeat') animClass = 'animate-heartbeat';
              else if (txt.animation === 'bounce') animClass = 'animate-bounce';
              else if (txt.animation === 'fade') animClass = 'transition-all duration-700 animate-pulse';
              else if (txt.animation === 'slide') animClass = 'hover:translate-x-1 duration-1000';
              
              return (
                <div
                  key={txt.id}
                  onPointerDown={(e) => handlePointerDown(txt.id, e)}
                  style={{
                    left: `${txt.x}%`,
                    top: `${txt.y}%`,
                    transform: 'translate(-50%, -50%)',
                    color: txt.color,
                    fontSize: `${txt.fontSize}px`
                  }}
                  className={`absolute px-3 py-1.5 rounded-lg font-bold text-center whitespace-pre-wrap leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.92)] cursor-move border-2 pointer-events-auto transition-transform ${isSelected ? 'border-pink-500 bg-black/45 ring-2 ring-pink-500/50 scale-102' : 'border-transparent hover:border-white/40 hover:bg-black/10 active:scale-95'} ${animClass}`}
                >
                  {txt.text}
                </div>
              );
            })}
          </div>

          {/* Dynamic Interactive Overlaid Buttons */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {(config.buttons || []).map(btn => {
              const isSelected = btn.id === selectedButtonId;
              
              let animClass = '';
              if (btn.animation === 'pulse') animClass = 'animate-pulse';
              else if (btn.animation === 'bounce') animClass = 'animate-bounce';
              else if (btn.animation === 'vibrate') animClass = 'animate-pulse';
              
              const innerBtn = (
                <div
                  onPointerDown={(e) => handlePointerDown(btn.id, e)}
                  style={{
                    left: `${btn.x}%`,
                    top: `${btn.y}%`,
                    transform: 'translate(-50%, -50%)',
                    color: btn.color,
                    backgroundColor: btn.bgColor,
                    fontSize: `${btn.fontSize}px`,
                    borderRadius: `${btn.borderRadius}px`
                  }}
                  className={`absolute px-3.5 py-1.5 font-extrabold text-center select-none cursor-move whitespace-nowrap shadow-md border-2 pointer-events-auto transition-all ${isSelected ? 'border-amber-400 ring-2 ring-amber-500/40 scale-105 shadow-lg' : 'border-transparent hover:border-white/50 hover:opacity-95 active:scale-95'} ${animClass}`}
                >
                  {btn.text}
                </div>
              );

              // Render simple drag element in editor preview (actual user click takes them to url context)
              return (
                <div key={btn.id} className="pointer-events-none">
                  {innerBtn}
                </div>
              );
            })}
          </div>

          {/* Tiny Phone elements to resemble luxury card screens */}
          <div className="absolute bottom-5 inset-x-0 mx-auto w-32 h-1 bg-white/40 rounded-full z-10 pointer-events-none" />
          <div className="absolute top-2 inset-x-0 mx-auto w-24 h-4 bg-black rounded-b-xl z-20 pointer-events-none" />

        </div>

        {/* Play procedural musical chime notice */}
        <p className="text-[10px] text-slate-500 font-medium text-center max-w-[340px]">提示：导出超清 PNG 包含完整的矢量纹理背景与精制雅抗锯齿高比例文字印刷效果。</p>

      </div>

    </div>
  );
}
