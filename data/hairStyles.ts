
import { Gender, HairStyleDefinition, HairLength, HairTexture } from '../types';

// Helper to keep urls clean
const getUrl = (id: string, q: string) => `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop&${q}`;

export const HAIR_STYLES: Record<Gender, HairStyleDefinition[]> = {
  [Gender.MALE]: [
    // --- CUTS (剪发) ---
    { 
      id: 'm-texture-crop', 
      label: '微分碎盖 (Texture Crop)', 
      prompt: 'Texture Crop hairstyle (Wei Fen Sui Gai), textured fringe with undercut sides, fluffy top, clean modern asian style', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1617135091569-82bc1ef2797e', 'face')
    },
    { 
      id: 'm-american-spikes', 
      label: '美式前刺 (American Spikes)', 
      prompt: 'American Spikes hairstyle, aggressive textured spiky quiff, sharp fade, sporty look, defined structure', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1620387084617-e8544f80c611', 'face')
    },
    { 
      id: 'm-two-block', 
      label: '韩式两边铲 (Two Block)', 
      prompt: 'Korean Two Block haircut, thick top layer covering undercut sides, k-pop style, clean and modern', 
      gender: Gender.MALE, category: 'haircut', length: 'Medium', texture: 'Straight',
      previewUrl: getUrl('1633332755192-727a05c4013d', 'face')
    },
    { 
      id: 'm-buzz', 
      label: '寸头 (Buzz Cut)', 
      prompt: 'Buzz Cut hairstyle, very short uniform length, masculine military style, clean lines', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1506794778202-cad84cf45f1d', 'face')
    },
    { 
      id: 'm-side-part', 
      label: '经典侧分 (Side Part)', 
      prompt: 'Classic Gentleman Side Part hairstyle, sleek, professional, gelled texture, suit and tie vibe', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1519085360753-af0119f7cbe7', 'face')
    },
    { 
      id: 'm-french-crop', 
      label: '法式栗子头 (French Crop)', 
      prompt: 'French Crop hairstyle, short textured top with blunt fringe, high fade, low maintenance', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1504257432398-4694d084315d', 'face')
    },
    { 
      id: 'm-ivy-league', 
      label: '常春藤头 (Ivy League)', 
      prompt: 'Ivy League haircut, short, neat, tapered sides, slightly long top styled to the side, preppy', 
      gender: Gender.MALE, category: 'haircut', length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1492562080023-ab3db95bfbce', 'face')
    },
    { 
      id: 'm-slick-back', 
      label: '大背头 (Slicked Back)', 
      prompt: 'Slicked Back hairstyle, hair brushed completely back, glossy finish, sharp and dominant', 
      gender: Gender.MALE, category: 'haircut', length: 'Medium', texture: 'Straight',
      previewUrl: getUrl('1521119989659-a83ed48aef0d', 'face')
    },
    { 
      id: 'm-mullet', 
      label: '现代狼尾 (Modern Mullet)', 
      prompt: 'Modern Mullet hairstyle, shorter front and sides with longer back, edgy texture, fashion forward', 
      gender: Gender.MALE, category: 'haircut', length: 'Medium', texture: 'Wavy',
      previewUrl: getUrl('1621648602685-680c29f64923', 'face')
    },
    
    // --- PERMS (塑型烫) ---
    { 
      id: 'm-leslie-curls', 
      label: '莱斯利卷 (Leslie Curls)', 
      prompt: 'Leslie Curls hairstyle, retro 90s Hong Kong style vibe, voluminous textured curls with heavy bangs dropped down covering forehead, romantic and artistic', 
      gender: Gender.MALE, category: 'perm', length: 'Medium', texture: 'Curly',
      previewUrl: getUrl('1499540027783-6a9578619623', 'face')
    },
    { 
      id: 'm-curly-perm', 
      label: '日系纹理烫 (Texture Perm)', 
      prompt: 'Japanese Texture Perm, loose chaotic waves, messy but styled, artistic look, medium length', 
      gender: Gender.MALE, category: 'perm', length: 'Medium', texture: 'Wavy',
      previewUrl: getUrl('1596392927818-23f421685495', 'face')
    },
    { 
      id: 'm-steel-wool', 
      label: '锡纸烫 (Twist Perm)', 
      prompt: 'Textured Twist Perm, high volume, frizzy definition, streetwear style, trendy', 
      gender: Gender.MALE, category: 'perm', length: 'Short', texture: 'Curly',
      previewUrl: getUrl('1623337672265-27464d255d64', 'face')
    },
    { 
      id: 'm-shadow-perm', 
      label: '韩式摩根烫 (Shadow Perm)', 
      prompt: 'Korean Shadow Perm, soft waves, voluminous roots, c-curl bangs, romantic vibe', 
      gender: Gender.MALE, category: 'perm', length: 'Medium', texture: 'Wavy',
      previewUrl: getUrl('1620553199831-27464d255d64', 'face')
    },
    { 
      id: 'm-afro', 
      label: '爆炸头/卷发 (Afro/Curls)', 
      prompt: 'Natural Afro or tight curls, high volume, round silhouette, distinct character', 
      gender: Gender.MALE, category: 'perm', length: 'Medium', texture: 'Curly',
      previewUrl: getUrl('1500648767791-00dcc994a43e', 'face')
    },
    { 
      id: 'm-long-wavy', 
      label: '艺术中长卷 (Long Wavy)', 
      prompt: 'Shoulder length wavy hair for men, artistic, flowy, musician vibe, grunge', 
      gender: Gender.MALE, category: 'perm', length: 'Long', texture: 'Wavy',
      previewUrl: getUrl('1618641986552-c8d746ec16b8', 'face')
    }
  ],
  [Gender.FEMALE]: [
    // --- SHORT (短发) ---
    { 
      id: 'f-pixie', 
      label: '精灵短发 (Pixie Cut)', 
      prompt: 'Chic Pixie Cut, very short, cropped layers, elegant, highlights facial features', 
      gender: Gender.FEMALE, length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1595769816263-9b910be24d5f', 'face')
    },
    { 
      id: 'f-bob', 
      label: '经典波波头 (Classic Bob)', 
      prompt: 'Classic Chin-length Bob haircut, even cut, sleek silhouette, sharp and modern', 
      gender: Gender.FEMALE, length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1580618672591-eb180b1a973f', 'face')
    },
    { 
      id: 'f-wavy-bob', 
      label: '法式微卷Bob (Wavy Bob)', 
      prompt: 'French Wavy Bob, chin length, messy texture, effortless chic, romantic', 
      gender: Gender.FEMALE, length: 'Short', texture: 'Wavy',
      previewUrl: getUrl('1608252276939-c5c8309d9361', 'face')
    },
    { 
      id: 'f-boyish', 
      label: '日系少年感 (Boyish Short)', 
      prompt: 'Japanese Boyish Short Hair, airy texture, semi-long bangs, youthful and fresh', 
      gender: Gender.FEMALE, length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1508214751196-bcfd4ca60f91', 'face')
    },
    { 
      id: 'f-ear-length', 
      label: '齐耳短发 (Ear Length)', 
      prompt: 'Ear-length short haircut, tucked behind ears, neat, clean and preppy', 
      gender: Gender.FEMALE, length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1560505187-573562a04944', 'face')
    },
    // New Short Styles
    {
      id: 'f-tassel-cut',
      label: '韩式一刀切 (Tassel Cut)',
      prompt: 'Korean Tassel Cut (Yi Dao Qie), sharp blunt bob ending at chin level, sleek straight texture, modern and chic, minimalist aesthetic, k-pop style',
      gender: Gender.FEMALE, length: 'Short', texture: 'Straight',
      previewUrl: getUrl('1512258909890-4e3230e7041a', 'face')
    },
    {
      id: 'f-retro-perm',
      label: '复古小卷 (Retro Perm)',
      prompt: 'Short Vintage Curls, chin length, tight bouncy curls, french girl aesthetic, playful and voluminous, amélie vibe',
      gender: Gender.FEMALE, length: 'Short', texture: 'Curly',
      previewUrl: getUrl('1625089332560-496a32721046', 'face')
    },
    {
      id: 'f-short-shag',
      label: '高层次短碎 (Short Shag)',
      prompt: 'Short Shag Haircut, heavy layers, textured fringe, messy cool girl aesthetic, rock chic, wolf cut lite',
      gender: Gender.FEMALE, length: 'Short', texture: 'Wavy',
      previewUrl: getUrl('1603570387532-61b7dfb36b56', 'face')
    },

    // --- MEDIUM (中发) ---
    { 
      id: 'f-lob', 
      label: '锁骨发 (Textured Lob)', 
      prompt: 'Long Bob (Lob), shoulder grazing length with textured ends, versatile and chic', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Straight',
      previewUrl: getUrl('1523264626694-8a18357a792a', 'face')
    },
    { 
      id: 'f-wolf', 
      label: '狼尾鲻鱼头 (Wolf Cut)', 
      prompt: 'Wolf Cut, heavy shaggy layers, mullet-hybrid, voluminous and edgy, trend', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Wavy',
      previewUrl: getUrl('1605497788044-5a32c7078486', 'face')
    },
    { 
      id: 'f-clavicle-perm', 
      label: '初恋头/内扣 (C-Curl Lob)', 
      prompt: 'Clavicle length hair with C-curl ends (inward curl), soft bangs, sweet and innocent style', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Straight',
      previewUrl: getUrl('1512413366763-8cb4986b610c', 'face')
    },
    { 
      id: 'f-layered-shoulder', 
      label: '高层次锁骨发 (Layered)', 
      prompt: 'High Layered Shoulder Length hair, lots of movement, face framing, lightweight', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Straight',
      previewUrl: getUrl('1575005933682-1d5427181f3b', 'face')
    },
    { 
      id: 'f-hershey', 
      label: '赫希切 (Hershey Cut)', 
      prompt: 'Hershey Cut, korean style, very light ends, airy layers, see-through bangs', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Wavy',
      previewUrl: getUrl('1611175691062-8438466d3a6c', 'face') // Placeholder
    },
    { 
      id: 'f-shoulder-waves', 
      label: '中发蛋卷 (Egg Roll Waves)', 
      prompt: 'Shoulder length uniform waves (Egg Roll Perm), cute, voluminous, vintage vibe', 
      gender: Gender.FEMALE, length: 'Medium', texture: 'Curly',
      previewUrl: getUrl('1589156229687-496a32721046', 'face')
    },

    // --- LONG (长发) ---
    { 
      id: 'f-long-layers', 
      label: '层次长发 (Long Layers)', 
      prompt: 'Long hair with face-framing layers, soft and flowing, feminine classic', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Straight',
      previewUrl: getUrl('1517841905240-472988babdf9', 'face')
    },
    { 
      id: 'f-hime', 
      label: '姬发式 (Hime Cut)', 
      prompt: 'Hime Cut, straight bangs with cheek-length sidelocks and long back, japanese royal style', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Straight',
      previewUrl: getUrl('1534528741775-53994a69daeb', 'face')
    },
    { 
      id: 'f-beach-waves', 
      label: '法式慵懒卷 (Beach Waves)', 
      prompt: 'Long Beach Waves, loose natural curls, messy texture, romantic and effortless', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Wavy',
      previewUrl: getUrl('1582095133179-bfd08e2fc6b3', 'face')
    },
    { 
      id: 'f-straight', 
      label: '黑长直 (Sleek Straight)', 
      prompt: 'Waist length, pin straight, shiny glass hair look, elegant and sharp', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Straight',
      previewUrl: getUrl('1552699611-e2c208d5d9cf', 'face')
    },
    { 
      id: 'f-big-waves', 
      label: '大波浪 (Big Waves)', 
      prompt: 'Voluminous Big Waves, glamourous, hollywood style, side part, bouncy', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Curly',
      previewUrl: getUrl('1516975080664-ed2fc6a32937', 'face')
    },
    { 
      id: 'f-mermaid', 
      label: '人鱼卷 (Mermaid Curls)', 
      prompt: 'Mermaid Curls, uniform deep waves from root to tip, ethereal and fantasy-like', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Curly',
      previewUrl: getUrl('1605980776566-030a47d21c32', 'face')
    },
    { 
      id: 'f-wool-roll-long', 
      label: '长发羊毛卷 (Wool Roll)', 
      prompt: 'Long Wool Roll Perm, tight fluffy curls, vintage retro aesthetic, high volume', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Curly',
      previewUrl: getUrl('1597223557154-721db9978508', 'face')
    },
    { 
      id: 'f-butterfly', 
      label: '蝴蝶切 (Butterfly Cut)', 
      prompt: 'Butterfly Cut, 90s blowout style, heavy face framing layers, voluminous and bouncy', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Wavy',
      previewUrl: getUrl('1588669527961-9c6001092a18', 'face')
    },
    { 
      id: 'f-hippie', 
      label: '嬉皮士卷 (Hippie Perm)', 
      prompt: 'Hippie Perm, messy boho waves, center part, carefree and artistic', 
      gender: Gender.FEMALE, length: 'Long', texture: 'Curly',
      previewUrl: getUrl('1588600160273-c15c0e18987b', 'face')
    }
  ]
};

export const PRESET_COLORS = [
  // Naturals
  { label: '自然黑', value: '#1a1a1a' },
  { label: '柔和黑', value: '#2c2c2c' },
  { label: '深棕色', value: '#3b2417' },
  { label: '巧克力', value: '#4a3728' },
  { label: '摩卡棕', value: '#594034' },
  { label: '栗棕色', value: '#633824' },
  { label: '暖铜棕', value: '#78472f' },
  { label: '焦糖色', value: '#8b5a2b' },
  { label: '亚麻棕', value: '#8a7f70' },
  { label: '冷棕色', value: '#5e5349' },
  
  // Blonds / Light
  { label: '亚麻金', value: '#e6c288' },
  { label: '白金色', value: '#f0f0f0' },
  { label: '蜂蜜茶', value: '#cba170' },
  { label: '米金色', value: '#dcd0ba' },
  
  // Reds
  { label: '酒红色', value: '#6e1919' },
  { label: '复古红', value: '#8d2b2b' },
  { label: '脏橘色', value: '#b5582a' },
  { label: '粉棕色', value: '#9c6b6b' },
  
  // Fashion
  { label: '奶奶灰', value: '#aeb3b8' },
  { label: '雾霾蓝', value: '#36485e' },
  { label: '北极蓝', value: '#7caec7' },
  { label: '薄荷绿', value: '#88bfac' },
  { label: '樱花粉', value: '#f4c2c2' },
  { label: '香芋紫', value: '#9b8dbf' },
];
