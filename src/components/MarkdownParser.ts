/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteBlock, SiteConfig, BlockItem, BlockType } from '../types';

interface IndustryTemplate {
  themeColor: string;
  fontFamily: string;
  presets: Record<BlockType, {
    title: string;
    subtitle: string;
    description: string;
    theme: 'light' | 'dark' | 'brand';
    align: 'left' | 'center' | 'right';
    image?: string;
    primaryBtn?: { text: string; url: string };
    secondaryBtn?: { text: string; url: string };
    items?: BlockItem[];
    columns?: number;
    borderRadius?: number;
    boxShadow?: 'none' | 'sm' | 'md' | 'lg' | 'all-glow';
    entranceAnimation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'bounce-in';
    dividerType?: 'none' | 'wave' | 'slant' | 'curve';
  }>;
}

// Built-in Premium Industry Templates with high-quality Copywriting and targeted Unsplash Images
const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  coffee: {
    themeColor: '#78350f', // Warm rich amber-brown
    fontFamily: 'Microsoft YaHei',
    presets: {
      hero: {
        title: '一缕醇香，拾光而聚',
        subtitle: '匠心手工冲煮 · 单一纯境原产地豆 · 慢生活美学空间',
        description: '在喧嚣都市与静谧午后之间，我们为您留存一处弥漫麦香与豆香的风味角落。严选全球生态庄园特级熟豆，经黄金火候精心控温焙火，只为在您的杯中绽放出饱满成熟的浆果酸甜与温润甘醇。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '浏览吧台菜单', url: '#section_gallery' },
        secondaryBtn: { text: '了解创始故事', url: '#section_about' },
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'curve'
      },
      slideshow: {
        title: '全景风味巡礼',
        subtitle: '让每一帧光影，伴随浓郁气息悠长流转',
        description: '从遥远火山高地庄园的赤道微风，到清晨吧台磨豆器流淌的第一缕蒸汽。我们坚持全手工温杯与精准毫秒控流，以绝对纯粹还原咖啡与茶的灵魂本色。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 's1', title: '单一原产地手冲 (Single Origin Pour Over)', desc: '精准控制92度微泡水温与细流注水，层层激发来自非洲高地柠檬草本与明亮甜橙气息。', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 's2', title: '经典丝滑拉花拿铁 (Silk Foam Caffè Latte)', desc: '新西兰高品质动物鲜牛乳，经蒸汽旋转碰撞，产生绵密天鹅绒奶泡，与意式浓缩水乳交融。', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 's3', title: '主理人手作季节烘焙 (Seasonal Artisan Pastry)', desc: '清晨当日出炉。法式起酥可颂外焦内层层松软，是风味浓缩咖啡的完美伴侣。', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 20,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '一杯初心：我们对咖啡与生活美学的执念',
        subtitle: 'THE STORY: FROM SEED TO CUP',
        description: '两名热爱旅行和美学的烘焙师，为了寻找一颗完美的单一果香种子，曾横跨三大半球和十余个赤道海拔庄园。我们认为咖啡不应是一剂速成提神的工业溶剂，而是一个鲜活生命的载体。回到家乡，我们亲手砌暖金砖瓦，设置木质长台，只期望为您提供一处隔绝风尘、静心读书、呼吸麦浪与享受慢格调的温馨港湾。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
        borderRadius: 16,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'wave'
      },
      features: {
        title: '卓越的核心特质',
        subtitle: '三个维度的严苛坚持，浇灌一杯精品',
        description: '我们拒绝任何工业添加剂，追求风味的极致平衡，用品质构建与千万读者的舌尖契合。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '100% 严选精品庄园豆', desc: '坚持杯测分（Q-Grader）85分以上精品熟豆，拒绝瑕疵，原豆追溯到具体庄园与海拔。', icon: 'Award', clickUrl: '#' },
          { id: 'f2', title: '小锅精控中轻度烘焙', desc: '德国Giesen烘焙机每周定量鲜磨。精准记录烘焙曲线，锁存优雅明亮的浆果花果调。', icon: 'Sparkles', clickUrl: '#' },
          { id: 'f3', title: '大师温箱手调手做', desc: '全线配置行业顶配Slayer拉霸意式机、精准电子秤，每一滴油脂都饱含温情。', icon: 'Check', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '风味美学橱窗',
        subtitle: '手作日常，在每一次呼吸中与美好不期而遇',
        description: '探索我们极美的手工制作甜点与手绘拿铁作品，在这里艺术与口感得到深度融合。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '琥珀焦糖玛奇朵', desc: '纯手工熬制黄金焦糖，温热流沙覆盖在细密厚奶泡上，馥郁醇香。', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '宇治抹茶浮云卷', desc: '进口丸久小山园抹茶，蛋糕坯卷入法国铁塔动物淡奶油，微苦爆浆。', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '冰滴耶加雪菲', desc: '常温冰水混合液长达8小时慢速浸润滴滤，酒香发酵度饱满，清甜似蜜。', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '香气正浓，寻个温热座位',
        subtitle: '立即开启您的味蕾惊喜之旅',
        description: '我们备好了温热的陶杯与悠扬的黑胶唱片。无论是一个人抱本看书，还是三五知己谈天说地，都在这里等您。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '一键预约吧台好座', url: '#' },
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '精品香氛咖啡馆',
        subtitle: '浙ICP备20268888号-1 · © 2026 慢拾光咖啡餐饮管理集团',
        description: '用纯粹的风味连接每一个有趣的灵魂。营业时间：周一至周日 08:30 - 21:30。',
        theme: 'dark',
        align: 'center'
      }
    }
  },
  bakery: {
    themeColor: '#db2777', // Rose Pink or sweet amber
    fontFamily: 'system-ui',
    presets: {
      hero: {
        title: '手作鲜焙，蓬松治愈',
        subtitle: '100%法国进口动物黄油 · 每日清晨黄金出炉 · 天然麦芽低糖配方',
        description: '在麦香与黄油碰撞交融的烤箱里，锁存一份专属于生活仪式感的法式浪漫。清晨第一批起酥可颂的外壳微焦，在手指轻捏之下发出令人愉悦的蓬松声响。我们致力于用天然纯真原材，唤醒您一整天的轻盈好心情。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '浏览今日出炉', url: '#section_gallery' },
        secondaryBtn: { text: '探访烘焙理念', url: '#section_about' },
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'wave'
      },
      slideshow: {
        title: '法式面点艺术大赏',
        subtitle: '每一款，都是烘焙艺术家匠心雕琢的作品',
        description: '法国铁塔动物奶油的丝滑、日式宇治抹茶的幽香、日本昭和面粉的水合弹性。不仅是美味的载体，更是一份献给岁月的精致礼盒。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'b1', title: '法式起酥蜂巢可颂 (Classic Honeycomb Croissant)', desc: '精选法国AOP认证黄油，层层折叠。折射出绝妙金黄光泽与完美内部蜂巢孔隙，空气感十足。', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'b2', title: '星级翻糖草莓舒芙蕾 (Dream Strawberry Shortcake)', desc: '新鲜草莓爆浆果酱与滑嫩戚风蛋糕融合，每一口都是宛如浮云融化般的恋爱气味。', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'b3', title: '香草燕麦手作曲奇 (Artisan Vanilla Cookies)', desc: '坚持全低温慢速烘干，保留丰富颗粒感燕麦，嚼劲十足，咸甜交织不甜腻。', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 20,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '让面包会唱歌：微甜烘焙物语',
        subtitle: 'OUR MISSION: NATURE & LOVE',
        description: '我们的烘焙坊曾是一家古旧木器社。店长毕业于蓝带国际学院，因为念念不忘幼年时外婆烤盘上那股纯正的牛油焦香，义无反顾专注于传统古法低温天然发酵，每一块面包从水合反应到出炉都需要经过24小时以上的深度呵护。我们相信，加入了善意、时间与黄油的面团，在烘制时连蒸汽都会歌唱。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
        borderRadius: 16,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'curve'
      },
      features: {
        title: '我们的健康宣言',
        subtitle: '三个维度捍卫全家人的胃部舒适',
        description: '从源头拒绝添加剂，用科学的揉捏工艺锁住小麦活性，保障麦香淳朴生动。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '坚持 100% 拒绝反式黄油', desc: '完全剔除人工合成玛琳油或保鲜剂，只使用大牧场天然牧草草饲动物淡奶油。', icon: 'Shield', clickUrl: '#' },
          { id: 'f2', title: '老酵母长温中水合发酵', desc: '自研培育纯天然野生果木酵母。漫长的低温唤醒链可以充分水解麸质，不胀气。', icon: 'Smile', clickUrl: '#' },
          { id: 'f3', title: '每日晨光纯手工揉捣', desc: '坚持清晨4点全手工揉按面团，配合石板恒温专业烤炉，让温热麦香完美盛开。', icon: 'Layers', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '今日鲜焙陈列橱窗',
        subtitle: '精美手作系列，感受每一缕甜美生活的自然脉动',
        description: '我们的烤箱永不歇步。点击可查看配方用料及健康能量指标表。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '盐之花巧克力可颂', desc: '法国顶级盖朗盐之花调和黑巧克力，酥皮在黄油折叠下流淌奢华微咸香味。', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '玫瑰莓果戚风裸蛋糕', desc: '手摘重瓣玫瑰自酿花蜜，点缀当日鲜摘森林草莓、树莓，唯美翻糖花饰。', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '全麦坚果乡村健康大面包', desc: '石磨高筋全麦面粉，揉入精选加州核桃碎与蔓越莓干，饱腹低GI健身首选。', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '今天，给自己放一颗糖',
        subtitle: '麦香溢满，甜度刚好，极速送达',
        description: '我们配备了专业保温冰袋和顺丰冷链专送。无论是生日庆贺、午后下午茶还是派对狂欢，只需轻松一点即可送抵府上。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '立即领取甜点满减礼包', url: '#' },
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '暖烘烘面包甜点社',
        subtitle: '闽ICP备20261122号-2 · © 2026 甜心物语烘焙连锁集团',
        description: '让天然麦香与温柔甜度，抚平您生活的一切褶皱。欢迎商务下午茶团建订购。',
        theme: 'dark',
        align: 'center'
      }
    }
  },
  tech: {
    themeColor: '#2563eb', // Cool Electric Blue
    fontFamily: 'Inter',
    presets: {
      hero: {
        title: '重塑企业级数智协同效能',
        subtitle: '全自适应无码引擎 · 全链路敏捷工作流管线 · 亿级数据高并发冗余灾备',
        description: '打破部门壁垒，释放澎湃数据潜能。我们通过新一代智能微服务云原生架构，为您企业搭建极简流畅、业务流自闭环的数字化总控台，助您轻松驾驭复杂的全球混合协作环境。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '获取 14 天免费尊享试用', url: '#section_features' },
        secondaryBtn: { text: '开发者开放 API 文档', url: '#section_about' },
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'slant'
      },
      slideshow: {
        title: '高维数智协同控制中心',
        subtitle: '多端弹性同步，支撑无限业务触点扩容',
        description: '聚合日常流动、开发、质检与运维报表。支持全球数据节点毫秒级多主副本同步，以严苛的军工级硬核盾牌防御任何异常风险。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 't1', title: '多维度敏捷数字看板 (Intuitive Data Panel)', desc: '图表在50毫秒内无卡顿响应，提供深度数据钻取与智能异常告警，团队生产力一目了然。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 't2', title: '自适应终端无界访问 (Adaptive Native Core)', desc: '完全兼容 iOS、Android、小程序及各类平板，底层采用轻量原生代码，省电30%且秒开。', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 't3', title: '万物互联全球边缘网 (Global Scalable Gateway)', desc: '部署于全球52个顶级边缘机房。支持全自动链路智能加速计算，高可用的多机房异地容灾。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '对逻辑与交互美学的偏执：数智起源',
        subtitle: 'OUR PRINCIPLE: LOGIC & ELEGANCE',
        description: '面对传统陈旧复杂的流转系统，我们决定用高维度的代码逻辑与极简 UI 重塑协作规则。我们是由前硅谷知名极客和先锋视觉指导联合创立的科技独角兽，多年来深耕于分布式数据系统和轻量级状态共享算法。我们坚信：好的协同系统本身不该喧宾夺主，而应像流水一样，无形、无声、敏捷且无阻地穿透团队屏障。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        borderRadius: 12,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'wave'
      },
      features: {
        title: '三大核心效能飞轮',
        subtitle: '颠覆陈旧系统，为生产力赋能',
        description: '我们通过分布式响应架构与高可用无代码底层设计，让复杂配置彻底告别开发成本。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '极速边缘智能加速渲染', desc: '全线利用新一代状态树共享算法，多人在线毫秒级无冲突协同，低网络抖动秒级流转。', icon: 'Cpu', clickUrl: '#' },
          { id: 'f2', title: '无码可视拖拽流程链', desc: '业务分析师可通过纯拖拽逻辑块零门槛拼装业务逻辑，支持数百款第三方企业API生态绑定。', icon: 'Target', clickUrl: '#' },
          { id: 'f3', title: '军工防爆极隔离安全防线', desc: '符合国际SOC2/3数据最高级别保密体系，多地多活智能容灾，核心敏感流双重硬件卡密钥。', icon: 'Shield', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 8,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '核心应用落地场景',
        subtitle: '见证领先品牌在复杂的场景中的极致数智飞跃',
        description: '服务于金融、生命科学与现代智造等高危高密行业。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '敏捷研发多维度总控', desc: '覆盖万名开发多维合并分支（PR）、全自动化热部署（CI/CD）集成，效率跃升近70%。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '云端分布式智造产链流', desc: '传感器采集实时监测分析、物流一物一码无阻溯源及设备生命周期自动预测预警。', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '全景数字金融合规安全防壁', desc: '毫秒级自动欺诈交易检测拦截、大宗多币种分布式抗重放交易验证和全加密财务合规。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 8,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '迎接效率裂变的新纪元',
        subtitle: '开启您的14天无条件试用，重塑协作想象力',
        description: '无需繁琐部署。填写公司邮箱，我们的技术专家将会在3小时内为您专属配置一个全功能的私有测试网络。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '免费定制专属解决方案', url: '#' },
        borderRadius: 8,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '数智矩阵科技有限公司',
        subtitle: '京ICP备20269999号-5 · © 2026 数智协同研发集团',
        description: '以优雅的逻辑，重构生产力边界。开发者支持：support@techgrid-core.com。',
        theme: 'dark',
        align: 'center'
      }
    }
  },
  dental: {
    themeColor: '#0d9488', // Medical Calm Teal
    fontFamily: 'Microsoft YaHei',
    presets: {
      hero: {
        title: '齿健康，绽放优雅自信笑容',
        subtitle: '博硕联合会诊体系 · 数字化美学正畸方案 · 3D亲骨微创低痛种植领航者',
        description: '秉承“以患者关怀为尊”的温情诊疗理念，引进行业顶级声波消音系统与极细微针配流技术。我们旨在打破传统医院刺鼻难闻的药水味道，为您及家人营造无惧、无忧、舒适如家的高品质齿科美学体验。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '在线预约挂号/挂号', url: '#section_gallery' },
        secondaryBtn: { text: '了解数字化优势', url: '#section_about' },
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'curve'
      },
      slideshow: {
        title: '全景数字化齿科诊治空间',
        subtitle: '严苛的院感控制与无菌科技保障安全舒适',
        description: '采用欧美数字化3D排齐微笑美学线分析系统，让正畸不盲目；使用定制亲骨钛植体联合导板种植，当天即可舒适下箸进食。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'd1', title: '博硕学术医生联合会诊 (Elite Specialist Team)', desc: '名牌医大讲师、华西副主任级医师长期驻诊。我们从根源追求严谨的生物力学设计。', image: 'https://images.unsplash.com/photo-1504813184591-01552661c88c?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'd2', title: '数字微笑美学隐形矫治 (Digital Aesthetic Link)', desc: '引入美学微笑比率数据，通过全息口扫3分钟内呈现未来各阶段排齐动画，矫正更自信。', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'd3', title: '低侵入3D立体微创种植 (Advanced 3D Implant)', desc: '基于精确的锥形束CT（CBCT），微孔极速植入，无需大切口与深缝合，恢复时间缩短70%。', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 20,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '看牙是一次惬意的会所水疗之旅',
        subtitle: 'OUR MISSION: SMILE WITH LOVE',
        description: '我们坚持舒适无痛与温情医学。彻底摒弃刺耳的电钻摩擦感和传统医院药味，全院覆盖柔和香氛、蓝调轻慢爵士背景音乐。我们的导诊团队会为您端上温热花茶与定制点心，更配备专业的解压按摩座椅。我们深信，高维度的医学不应该冷若冰霜，它必须充满对疼痛的悲悯和对生活的热忱。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
        borderRadius: 16,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'wave'
      },
      features: {
        title: '诊疗安心屏障',
        subtitle: '全面执行顶尖医疗安全规范，让舒适伴您左右',
        description: '我们严格落实一对一无缝诊室消毒、二十五道洗消工艺，全力隔断交叉风险。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '25道高压重消毒工艺', desc: '严格对标前沿国际消毒实验室标准。一客一用一消毒，一封条一打开，绝无敷衍。', icon: 'Shield', clickUrl: '#' },
          { id: 'f2', title: '全程数字全景CT扫描', desc: '配置高分辨率、超低暴露辐射量的颌骨CBCT，医生能够精准识别复杂的齿沟骨壁。', icon: 'Cpu', clickUrl: '#' },
          { id: 'f3', title: '温和声波消噪治疗技术', desc: '引进无痛微针注射药流控与水声消音高频手机，全过程无刺耳电鸣声与紧张心跳。', icon: 'Smile', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '齿美诊疗综合项目',
        subtitle: '一站式关爱，为您和全家人的微笑撑起舒心伞',
        description: '医保定点机构，所有收费合理透明，绝无任何隐性隐形推销。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '牙齿隐形矫正', desc: '隐形透明牙套。告别“钢牙时代”，在隐形中自适应排齐微笑美线，社交不尴尬。', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '3D数字化微创种植', desc: '采用亲骨纯钛植体，微调应力传导。创口极其细微，保留天然牙根般的咬重力度。', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '超声多维洁牙与冷光美白', desc: '气流喷砂微纳米抛光。去除烟茶斑渍，辅以深层低温美白蓝光，安全亮白不酸软。', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '笑容新生，从一客精心会诊开始',
        subtitle: '前50位新注册预约免费尊享全景数智口扫CT与博硕方案设计（限时福利）',
        description: '看牙不用焦虑和奔波。点击下方按钮，专属齿科客服将在5分钟内帮您锁定博硕专家的专属面诊名额，省去繁复排队。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '预约专家 5分钟快捷会诊', url: '#' },
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '雅洁数智口腔门诊部',
        subtitle: '粤ICP备20263531号-1 · 医保二级合作中心',
        description: '让每一次真诚微笑，都因健康齿根而璀璨夺目。急诊咨询热线：400-888-2026。',
        theme: 'dark',
        align: 'center'
      }
    }
  },
  portfolio: {
    themeColor: '#18181b', // Slate black
    fontFamily: 'JetBrains Mono',
    presets: {
      hero: {
        title: '留白、韵律与交互美学偏执狂',
        subtitle: '资深全栈 UI/UX 架构设计师 · 现代前沿交互编码 · 品牌美学视觉顾问',
        description: '我致力于用极简主义的手指梳理琐碎复杂的业务，追寻极客式的代码逻辑与大师级平面排版在物理像素上的完美融汇。每一个动效阻尼、每一个边框阴影、每一款英文字重，都是我深思熟虑、对设计理想的绝对致敬。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '浏览我的作品橱窗', url: '#section_gallery' },
        secondaryBtn: { text: '来杯咖啡吧！来信谈合作', url: '#section_cta' },
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 8,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'slant'
      },
      slideshow: {
        title: '前沿项目交互手稿',
        subtitle: '每一个像素，都在深思熟虑中自由跳跃',
        description: '在平面留白、多端绝对自适应布局、流畅的矢量微动效与干净轻质的配色中，重构复杂商业逻辑的易读性。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'p1', title: '分布式微卡片数字钱包界面 (Digital Wallet Design)', desc: '精心调校了32组微动效过渡和渐进发光卡片。让多资产流转既有仪式感，又低负荷运行。', image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'p2', title: '智能运动手环全套VI与UI (IoT Smart Wearable)', desc: '一站式打造极轻拟物风，建立包含数百组手势触控和响应圆环。荣获数项设计大奖。', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '好设计应该像空气，不可或缺却又大音希声',
        subtitle: 'WHO I AM: MINIMALSIT GEEK',
        description: '我毕业于著名艺术设计高等学院。在过去的8年里，我以主设计师身份领衔了过千万级日活App的改版重构，协助30余家跨国硬核科技公司完成了品牌视觉冷启动。我不只停留在产出漂亮的蓝图草案，更热衷于直接用原生现代语法对动态逻辑进行精准的数字演绎。设计与工程不应割裂，它们是一枚精制徽章的主反两面。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1541462608141-27b2c7452d66?q=80&w=800&auto=format&fit=crop',
        borderRadius: 8,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'curve'
      },
      features: {
        title: '我的严苛工作哲学',
        subtitle: '在艺术与工业流水线之间，锚定高品质的重心',
        description: '从不套用现成的死板模版，每一个像素和阴影都必须符合品牌最底层的情绪调性。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '100% 独立美学家定制', desc: '拒绝雷同插画和千人一面的蓝绿渐变。通过严密字重层级和负空间设计流淌出高级调。', icon: 'Sparkles', clickUrl: '#' },
          { id: 'f2', title: '现代动画过渡完美物理感', desc: '纯代码打磨非线性弹性阻尼曲线，让用户每一次侧滑、卡片收缩都宛如实体滑块般优雅。', icon: 'Code', clickUrl: '#' },
          { id: 'f3', title: '完整工程无缝交付闭环', desc: '不仅输出 Figma，更有完备且通过多终端严密测试的前端代码，保障方案落地不走样。', icon: 'Check', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 6,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '入选与精选设计实盘案例',
        subtitle: '让数据和商业闭环，成为视觉形式的完美注脚',
        description: '包含移动客户端、中后台数据罗盘、以及先锋数字展示海报等作品大集。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '科技智能汽车控制面板 UI', desc: '全息暗色发光仪表，基于粒子动画的多态路况模拟，获得数千万年轻用户的狂热好评。', image: 'https://images.unsplash.com/photo-1541462608141-27b2c7452d66?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '元宇宙数字藏品美术展 App', desc: '黑白高 contrast 极致艺术海报，集成动态无限画廊轮播，为数字艺术收藏者提供极致沉浸。', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '智核AI模型深度交互界面', desc: '基于节点关联拓扑图，提供优雅的可视化神经网络演化链路追踪，助开发者理清黑箱。', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 8,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '让我们聊聊您的下一个先锋创意',
        subtitle: '如果您有一个复杂的业务痛点，或者是富于张力的独立点子 —— 我们相聚已近',
        description: '我习惯于在工作日24小时内给信件予以详尽答复，并安排一次高效好玩的云端白板设计茶会。让我们为世界留下不一样的像素印记。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '点击发送邮件或加微信预约', url: '#' },
        borderRadius: 6,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '林晓明 | 独立交互设计师工作室',
        subtitle: '粤ICP备20251122号-12 · © 2026 MINIMAL DESIGN STUDIO',
        description: '基于精密逻辑。用艺术抚平纷乱，用美照亮代码。微信：XiaomingMinimalist。',
        theme: 'dark',
        align: 'center'
      }
    }
  },
  general: {
    themeColor: '#4f46e5', // Royal Indigo default
    fontFamily: 'Microsoft YaHei',
    presets: {
      hero: {
        title: '为卓越构筑信任，为未来创造超额价值',
        subtitle: '全球领先的数智商业战略转型与全方位数字化落地服务专家',
        description: '汇聚前瞻性的敏捷商业洞察、先进的大数据治理架构与卓越的行业落地执行力。我们协助全球头部金融、能源及新零售品牌打破传统技术孤岛，打磨核心竞争飞轮，实现稳健高效的市场份额重塑。',
        theme: 'brand',
        align: 'center',
        primaryBtn: { text: '获取综合解决方案手册', url: '#section_features' },
        secondaryBtn: { text: '预约专家 1对1 免费会诊', url: '#section_about' },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
        columns: 1,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'slide-up',
        dividerType: 'wave'
      },
      slideshow: {
        title: '全景赋能方案展示',
        subtitle: '高维透视商业流动，科学应对激烈竞争',
        description: '全链路打通战略分析、产品重构、云边缘分发和企业保密。我们用严谨的量化数字让生产力飙升不再是一句空话。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'g1', title: '数智大数据中心控制舱 (Strategic Cockpit)', desc: '全维度可视化中控台，实时展示运营、流动资金与市场反馈，风险决策在数秒内智享。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' },
          { id: 'g2', title: '高可用全天候云服务器多租户 (Enterprise Multi-cloud Host)', desc: '兼容多云平台、秒级自动负载均衡、全备份防爆系统，为每一笔核心保密交易保驾护航。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop', clickUrl: '#' }
        ],
        borderRadius: 16,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      about: {
        title: '三十载深耕，用数据与口碑构建全球声誉',
        subtitle: 'ABOUT OUR GROUP: INTEGRITY & EXCELLENCE',
        description: '我们坚持诚信、前瞻、落地、严谨的核心价值观。自上世纪九十年代设立以来，已在全球建立了超过12个大型战略科研中心和超过500名博硕领衔的顶尖行业精英舰队。我们不仅提供高屋建瓴的思维风暴、定制路线，更坚持“交钥匙式”的完备工程支持，确保再复杂的构想也能扎根开花，成为引领您行业蓬勃长青的压舱石。',
        theme: 'light',
        align: 'left',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
        borderRadius: 12,
        boxShadow: 'all-glow',
        entranceAnimation: 'fade-in',
        dividerType: 'curve'
      },
      features: {
        title: '为什么众多领先品牌首选我们',
        subtitle: '三大卓越优势，定义高规格数字化底座',
        description: '提供行业顶配的抗险级性能与咨询、研发一体化的落地专家力量。',
        theme: 'light',
        align: 'center',
        items: [
          { id: 'f1', title: '严谨的科学量化决策模型', desc: '不走捷径，不讲空话。完全基于完备大样本、金融仿真等前沿数理模型辅助分析和布局。', icon: 'Target', clickUrl: '#' },
          { id: 'f2', title: '智核一站式研发落地团队', desc: '配备由资深博士架构师、行业领队、云研发专家组成的联合开发团队，全生命周期质量巡航。', icon: 'Cpu', clickUrl: '#' },
          { id: 'f3', title: '全球合规保密认证安全墙', desc: '完全获得多维合规执照，严格控制异地安全沙箱，拒绝任何信息泄露风险。', icon: 'Shield', clickUrl: '#' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'md',
        entranceAnimation: 'slide-up'
      },
      gallery: {
        title: '行业先锋改造成效',
        subtitle: '看前沿行业巨擘和科技黑马如何实现生产力裂变',
        description: '为零售巨头、港口物流与新金融集团打造的数字化灯塔。',
        theme: 'dark',
        align: 'center',
        items: [
          { id: 'g1', title: '万家新商超多级智脑供应链', desc: '智能缺货自动补货、智能拼团路线调度和跨省高可用物流系统搭建，库销率大幅重挫。', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop' },
          { id: 'g2', title: '深水自动化大港多线程高并发中控', desc: '千万标准箱位在云端智能合流指挥，实现24小时无人智慧桥吊，装载速率翻了一倍。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
          { id: 'g3', title: '跨境多维度合规大数据风壁', desc: '极速扫描跨洋贸易报关，提供跨国数字保密隔离沙箱及智能风险排查系统。', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' }
        ],
        columns: 3,
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'zoom-in'
      },
      cta: {
        title: '点击下方，立刻预约您的专属数智咨询',
        subtitle: '首个方案出具免费（限时赠送博硕联合会诊分析手册一份）',
        description: '您优秀的方案已被备好，由我们顶尖的合伙人顾问提供。点击即可在极速面谈中拨冗会晤，携手翻越未来挑战。',
        theme: 'dark',
        align: 'center',
        primaryBtn: { text: '免费定制专家会诊咨询', url: '#' },
        borderRadius: 12,
        boxShadow: 'lg',
        entranceAnimation: 'bounce-in'
      },
      footer: {
        title: '领航数智产业战略咨询集团',
        subtitle: '京ICP备20268832号-1 · © 2026 领航先锋集团有限公司',
        description: '为核心资产保驾护航，在瞬息万变的市场格局中锁死增长。急诊热线：400-666-8888。',
        theme: 'dark',
        align: 'center'
      }
    }
  }
};

export class MarkdownParser {
  /**
   * Translates raw markdown lines into standard human readable styled HTML strings.
   * Completely local regex engine to parse and render paragraphs, lists, pre blocks and inline codes safely.
   */
  public static toHTML(md: string): string {
    if (!md) return '';
    let html = md;

    // Remove any scripting and event behaviors to avoid runtime bugs in iframe
    html = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');

    html = html.replace(/\r\n/g, '\n');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre class="bg-gray-950 text-gray-200 p-4 rounded-xl font-mono text-sm overflow-x-auto my-4 border border-gray-800 shadow-inner">${code.trim()}</pre>`;
    });

    // Inline codes
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-xs text-red-500 border border-gray-200 dark:border-gray-800">$1</code>');

    // Blockquotes
    html = html.replace(/^\s*>\s+(.+)$/gm, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic my-4 text-gray-600 dark:text-gray-400">$1</blockquote>');

    // Headings
    html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2">$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-base font-bold text-gray-800 dark:text-gray-200 mt-5 mb-2">$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-5 mb-2">$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-6 mb-3">$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-8 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-10 mb-6">$1</h1>');

    // Horizontal rule
    html = html.replace(/^---\s*$/gm, '<hr class="border-t border-gray-200 dark:border-gray-800 my-8"/>');

    // Bold & italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em class="italic">$1</em>');
    html = html.replace(/~~([^~]+)~~/g, '<del class="line-through">$1</del>');

    // Images & Links
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full h-auto mt-4 mx-auto border border-gray-100 shadow-md" referrerPolicy="no-referrer" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-medium underline hover:text-indigo-500 transition-colors">$1</a>');

    // Lists
    html = html.replace(/^\s*[\-\*\+]\s+(.+)$/gm, '<li class="ml-4 list-disc text-gray-700 dark:text-gray-300">$1</li>');
    html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, (match) => {
      return `<ul class="space-y-1.5 my-3 pl-4">${match}</ul>`;
    });
    html = html.replace(/<\/ul>\s*<ul class="space-y-1\.5 my-3 pl-4">/g, '');

    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal text-gray-700 dark:text-gray-300">$1</li>');
    html = html.replace(/(<li class="ml-4 list-decimal[^>]*>[\s\S]*?<\/li>)/g, (match) => {
      return `<ol class="space-y-1.5 my-3 pl-4">${match}</ol>`;
    });
    html = html.replace(/<\/ol>\s*<ol class="space-y-1\.5 my-3 pl-4">/g, '');

    // Paragraphs
    const paragraphs = html.split('\n\n');
    const parsedParagraphs = paragraphs.map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<img')
      ) {
        return trimmed;
      }
      return `<p class="leading-relaxed text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">${trimmed}</p>`;
    });

    return parsedParagraphs.filter(Boolean).join('\n');
  }

  /**
   * Intelligently analyze the Markdown outline, headers, and bullet requirements,
   * detect the target theme/industry, and compile the configurations into exquisite
   * visual site-builder components without invoking ANY AI services.
   */
  public static toSiteConfig(md: string, defaultTitle: string = '精品魔块站'): SiteConfig {
    if (!md) {
      return {
        title: defaultTitle,
        themeColor: '#4f46e5',
        fontFamily: 'Microsoft YaHei',
        blocks: [],
        hasHttps: true
      };
    }

    const lowerText = md.toLowerCase();
    
    // 1. Detect Category/Industry based on structural keywords
    let industry = 'general';
    if (
      lowerText.includes('coffee') || lowerText.includes('咖啡') || 
      lowerText.includes('茶') || lowerText.includes('tea') || 
      lowerText.includes('饮品') || lowerText.includes('杯测') || 
      lowerText.includes('cafe') || lowerText.includes('吧台')
    ) {
      industry = 'coffee';
    } else if (
      lowerText.includes('cake') || lowerText.includes('烘焙') || 
      lowerText.includes('蛋糕') || lowerText.includes('面包') || 
      lowerText.includes('甜品') || lowerText.includes('起酥') || 
      lowerText.includes('可颂') || lowerText.includes('bakery') || 
      lowerText.includes('pastry') || lowerText.includes('奶油')
    ) {
      industry = 'bakery';
    } else if (
      lowerText.includes('dentist') || lowerText.includes('牙医') || 
      lowerText.includes('齿科') || lowerText.includes('门诊') || 
      lowerText.includes('诊所') || lowerText.includes('牙') || 
      lowerText.includes('种植牙') || lowerText.includes('正畸') || 
      lowerText.includes('clinic') || lowerText.includes('dental') || 
      lowerText.includes('医生')
    ) {
      industry = 'dental';
    } else if (
      lowerText.includes('portfolio') || lowerText.includes('设计师') || 
      lowerText.includes('designer') || lowerText.includes('作品集') || 
      lowerText.includes('摄影') || lowerText.includes('个人') || 
      lowerText.includes('简历') || lowerText.includes('resume') || 
      lowerText.includes('写意') || lowerText.includes('林晓明') || 
      lowerText.includes('交互')
    ) {
      industry = 'portfolio';
    } else if (
      lowerText.includes('tech') || lowerText.includes('科技') || 
      lowerText.includes('软件') || lowerText.includes('app') || 
      lowerText.includes('saas') || lowerText.includes('智能') || 
      lowerText.includes('平台') || lowerText.includes('并发') || 
      lowerText.includes('边缘计算') || lowerText.includes('互联网') || 
      lowerText.includes('极客')
    ) {
      industry = 'tech';
    }

    const template = INDUSTRY_TEMPLATES[industry] || INDUSTRY_TEMPLATES.general;

    // 2. Select elegant theme colors based on explicit hex codes or brand requests inside Markdown
    let themeColor = template.themeColor;
    const hexColorMatch = md.match(/#[a-fA-F0-9]{6}/);
    if (hexColorMatch) {
      themeColor = hexColorMatch[0];
    } else {
      // Named Chinese color keywords
      if (lowerText.includes('粉色') || lowerText.includes('草莓粉') || lowerText.includes('暖粉')) {
        themeColor = '#ec4899';
      } else if (lowerText.includes('深绿') || lowerText.includes('墨绿') || lowerText.includes('茶绿')) {
        themeColor = '#0f766e';
      } else if (lowerText.includes('蔚蓝') || lowerText.includes('天空蓝') || lowerText.includes('天蓝')) {
        themeColor = '#0284c7';
      } else if (lowerText.includes('明黄') || lowerText.includes('暖金') || lowerText.includes('金黄色')) {
        themeColor = '#d97706';
      } else if (lowerText.includes('深灰') || lowerText.includes('碳黑') || lowerText.includes('暗黑')) {
        themeColor = '#18181b';
      } else if (lowerText.includes('靛青') || lowerText.includes('皇家蓝') || lowerText.includes('深紫')) {
        themeColor = '#4338ca';
      }
    }

    // 3. Extract customized Brand Level Title
    let siteTitle = defaultTitle;
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        siteTitle = trimmed.replace('# ', '').trim();
        break;
      }
    }

    // 4. Parse layout outline & structural block requirements
    // We scan H2 or block lists to see what specific modules have been explicitly requested.
    const requestedBlocks: BlockType[] = [];
    
    // First, scan for headers or list identifiers specifying layout structure
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') || trimmed.startsWith('### ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.replace(/^(## |### |\-\s*|\*\s*)/, '').toLowerCase();
        
        if (itemText.includes('slideshow') || itemText.includes('轮播') || itemText.includes('大图') || itemText.includes('幻灯片')) {
          if (!requestedBlocks.includes('slideshow')) requestedBlocks.push('slideshow');
        }
        else if (itemText.includes('features') || itemText.includes('特色') || itemText.includes('功能') || itemText.includes('服务') || itemText.includes('优势') || itemText.includes('特点')) {
          if (!requestedBlocks.includes('features')) requestedBlocks.push('features');
        }
        else if (itemText.includes('about') || itemText.includes('关于') || itemText.includes('介绍') || itemText.includes('故事') || itemText.includes('背景')) {
          if (!requestedBlocks.includes('about')) requestedBlocks.push('about');
        }
        else if (itemText.includes('gallery') || itemText.includes('画廊') || itemText.includes('橱窗') || itemText.includes('案例') || itemText.includes('作品') || itemText.includes('产品展示')) {
          if (!requestedBlocks.includes('gallery')) requestedBlocks.push('gallery');
        }
        else if (itemText.includes('cta') || itemText.includes('联系') || itemText.includes('预约') || itemText.includes('加入') || itemText.includes('联系我们')) {
          if (!requestedBlocks.includes('cta')) requestedBlocks.push('cta');
        }
        else if (itemText.includes('footer') || itemText.includes('版权') || itemText.includes('底栏') || itemText.includes('页脚')) {
          if (!requestedBlocks.includes('footer')) requestedBlocks.push('footer');
        }
      }
    }

    // If no explicit visual block types were detected inside the outline, default to a complete gorgeous marketing flow
    if (requestedBlocks.length === 0) {
      requestedBlocks.push('hero', 'features', 'about', 'gallery', 'cta', 'footer');
    } else {
      // Always pre-mount hero at the top for satisfying product layout if not added but slideshow is present
      if (!requestedBlocks.includes('hero') && !requestedBlocks.includes('slideshow')) {
        requestedBlocks.unshift('hero');
      } else if (requestedBlocks.includes('slideshow') && !requestedBlocks.includes('hero')) {
        // slideshow acts as hero!
      } else if (requestedBlocks.includes('hero') && requestedBlocks.includes('slideshow')) {
        // Keep both, put hero first
        const hIdx = requestedBlocks.indexOf('hero');
        requestedBlocks.splice(hIdx, 1);
        requestedBlocks.unshift('hero');
      }
      
      // Always append footer to end
      if (!requestedBlocks.includes('footer')) {
        requestedBlocks.push('footer');
      }
    }

    // 5. Generate high-quality configured blocks with gorgeous thematic copywriting
    // We replace template placeholder entities with the matched actual title to yield highly custom copywriting!
    const generatedBlocks: SiteBlock[] = [];
    let blockCounter = 1;

    requestedBlocks.forEach(type => {
      const preset = template.presets[type];
      if (!preset) return;

      const id = `b_${Date.now()}_${blockCounter++}`;
      
      // Customize structural copywriting
      let finalTitle = preset.title;
      let finalSubtitle = preset.subtitle;
      let finalDescription = preset.description;

      // Scan H2 headers in markdown to see if we can use their customized titles!
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
          const rawHeader = trimmed.replace(/^(## |### )/, '').trim();
          const lowerHeader = rawHeader.toLowerCase();
          
          if (type === 'features' && (lowerHeader.includes('特色') || lowerHeader.includes('功能') || lowerHeader.includes('优势') || lowerHeader.includes('服务') || lowerHeader.includes('features'))) {
            finalTitle = rawHeader;
          } else if (type === 'about' && (lowerHeader.includes('关于') || lowerHeader.includes('我们') || lowerHeader.includes('介绍') || lowerHeader.includes('故事') || lowerHeader.includes('about'))) {
            finalTitle = rawHeader;
          } else if (type === 'gallery' && (lowerHeader.includes('作品') || lowerHeader.includes('展示') || lowerHeader.includes('案例') || lowerHeader.includes('画廊') || lowerHeader.includes('gallery'))) {
            finalTitle = rawHeader;
          } else if (type === 'cta' && (lowerHeader.includes('联系') || lowerHeader.includes('预约') || lowerHeader.includes('加入') || lowerHeader.includes('cta') || lowerHeader.includes('contact'))) {
            finalTitle = rawHeader;
          } else if (type === 'slideshow' && (lowerHeader.includes('幻灯') || lowerHeader.includes('大图') || lowerHeader.includes('轮播') || lowerHeader.includes('slideshow'))) {
            finalTitle = rawHeader;
          }
        }
      }

      // Merge custom brand title into template copy beautifully
      const replacer = (text: string): string => {
        if (!text) return '';
        return text
          .replace(/慢拾光/g, siteTitle)
          .replace(/暖烘烘面包甜点社/g, siteTitle)
          .replace(/甜心物语/g, siteTitle)
          .replace(/微甜烘焙/g, siteTitle)
          .replace(/精品香氛咖啡馆/g, siteTitle)
          .replace(/雅洁数智口腔门诊部/g, siteTitle)
          .replace(/雅洁数智口腔/g, siteTitle)
          .replace(/数智矩阵科技/g, siteTitle)
          .replace(/数智协同/g, siteTitle)
          .replace(/林晓明 | 独立交互设计师工作室/g, siteTitle)
          .replace(/林晓明/g, siteTitle)
          .replace(/领航数智产业战略咨询集团/g, siteTitle)
          .replace(/领航先锋集团/g, siteTitle)
          .replace(/精品魔块站/g, siteTitle)
          .replace(/我的第一个魔块网页/g, siteTitle);
      };

      const block: SiteBlock = {
        id,
        type,
        title: replacer(finalTitle),
        subtitle: replacer(finalSubtitle),
        description: replacer(finalDescription),
        theme: preset.theme,
        align: preset.align,
        image: preset.image,
        primaryBtn: preset.primaryBtn ? {
          text: replacer(preset.primaryBtn.text),
          url: preset.primaryBtn.url
        } : undefined,
        secondaryBtn: preset.secondaryBtn ? {
          text: replacer(preset.secondaryBtn.text),
          url: preset.secondaryBtn.url
        } : undefined,
        items: preset.items ? preset.items.map((it: BlockItem) => ({
          ...it,
          title: replacer(it.title),
          desc: replacer(it.desc)
        })) : [],
        columns: preset.columns,
        borderRadius: preset.borderRadius,
        boxShadow: preset.boxShadow,
        entranceAnimation: preset.entranceAnimation,
        dividerType: preset.dividerType || 'none'
      };

      generatedBlocks.push(block);
    });

    // Handle button link targeting (connect hero button click to features or gallery)
    generatedBlocks.forEach(b => {
      if (b.type === 'hero' && b.primaryBtn) {
        const featBlock = generatedBlocks.find(x => x.type === 'features');
        const galBlock = generatedBlocks.find(x => x.type === 'gallery');
        if (featBlock) {
          b.primaryBtn.url = `#section_${featBlock.id}`;
        } else if (galBlock) {
          b.primaryBtn.url = `#section_${galBlock.id}`;
        }
      }
    });

    return {
      title: siteTitle,
      themeColor,
      fontFamily: template.fontFamily,
      blocks: generatedBlocks,
      hasHttps: true
    };
  }
}
