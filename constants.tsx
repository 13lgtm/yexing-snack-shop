
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '开口笑',
    price: 12,
    oldPrice: 18,
    description: '传统手工制作，满口芝麻香。酥脆香甜，地道广式风味。',
    category: '1', // 现做小吃
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx6rnLitFcRNSJRUJhz8Dv-KIlzKL58CWDkcBdN__X9gKf9dcZnFDkLghyea2tH9fUNkcH1CxRreRfvOyU1ZZBAvJq_pOZ_8T6qVoBBMKtcIF-p3DrECqTsHKnIXEiJ4XlfBZInoqvxrUfkZT9jpyZHyGWuljm7ofHAeXNV8WLnSFgpXwThDhnt_omK9bULt8LDkf0M0mlK2-IbyO_E_kbOZfxtHjlud-Qny2ciWg2uRzLUnVhwKY0gJOajJ420HJ1XKKflQ356oQ',
    tag: '热销',
    rating: 4.9,
    reviews: '2.5k',
    time: '10-15 分钟',
    calories: '320 千卡',
    ingredients: [
      { emoji: '🍚', name: '糯米粉' },
      { emoji: '🥜', name: '白芝麻' }
    ]
  },
  {
    id: '4',
    name: '麻通',
    price: 6,
    description: '空心酥脆，外层裹满白芝麻，口感轻盈，怀旧经典。',
    category: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx2Jxa952h29ntqCyTilcPYDPyFahUnsqqd9Fa_5A0NeQSlqDbapou7ha7BJDyGvUDn5MVJwwSGMmNxVay-XLKREbyKfNk7G0V6vWgxjzXee9esFqgQ-hw3IySy9BhXNeiE2PKK_noMdYpzVnE87cU3wIEsVfakYEA6ej7JP3ehfa608c0Cw9iBTcwKWfOEmLeNSP-ZZN3cu8jOnwZHMtyN8gXgAUBMvpjOiXfpdbSOR5qiMLONwg8_Q8DTkE77TWNQ8K8YkPqwhE',
    rating: 4.6,
    reviews: '1.2k',
    time: '5-10 分钟',
    calories: '120 千卡',
    ingredients: [
      { emoji: '🥖', name: '糯米胚' },
      { emoji: '🥜', name: '白芝麻' }
    ]
  },
  {
    id: '7',
    name: '芝麻饼',
    price: 8,
    description: '浓厚芝麻香气，饼底酥脆，越嚼越香的手工饼点。',
    category: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBZtmKPZOc2XxXkeweXkxwz2DjBv2ICNr5CA2_baNKWGCCGHgq52fRvOaU81Sp35LA-9-9MYFO79BQGC5gaGNdK54OBjdL4o9ycD1fvEaPZgx-7kcyvm7_D6vL44IzfFhpGdGYxavt9mEktR-3TxGtBjqGBIsvFI87yi2wxgw4cJHD4l9JnxZqjXrQXkb1H0q9gtNdrxjVoJ8wad4FgPclF1Vifp_cQrI2YOey_cDoZE4u_4ZWNyFMJoZBa89Dj6z_7BX4pfLvkE0',
    rating: 4.8,
    reviews: '800+',
    time: '5-8 分钟',
    calories: '150 千卡',
    ingredients: [
      { emoji: '🌾', name: '小麦粉' },
      { emoji: '🥜', name: '黑芝麻' }
    ]
  },
  {
    id: '8',
    name: '刻饼',
    price: 5,
    description: '造型古朴精致，口感扎实，淡淡的清甜回甘。',
    category: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSFnUrlRRwO5qvN8bjnVCBILRePkKFW1rH8BEeqnwPN0CmNRBtWy8qcT_WjPBJxD2SDfZNRkO8as3fM1BTvDqTx19n4K-_JtjP4STvsHkc1AE7BGloYaiRene6IX-4ieihMYZc_Yv0N-FetFt5hcb5GCzS0YFERCqcynTdLpHiLzFVryQHeEIH_52VcI0eT74vAJZzWPHv5WTCEGgaNj9x66NaY1dZ9IJFNjyFYSsZpnzo-_AFxElBFewVIw1I9_a58mkBzJTaVHo',
    rating: 4.5,
    reviews: '500+',
    time: '5 分钟',
    calories: '90 千卡',
    ingredients: [
      { emoji: '🍥', name: '面粉' },
      { emoji: '🍬', name: '白砂糖' }
    ]
  },
  {
    id: '5',
    name: '手磨芝麻糊',
    price: 15,
    description: '生磨芝麻，细腻顺滑，补血养颜，传统滋润佳品。',
    category: '2', // 手作糖水
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAwpSUniUOXSJAW9vchrPhUAotxcJ9WVoox-2zr_PYf-aPHQxx_j83BuYLyxf70Jhh4Lnc4vC2erj4_6ORgHiFpiDQag20Sjl7-ed4Qv98HXKDP4FB5H-p7Cl2PUyqU5s43Hkbf-f2yX0j32ORY0dqFubN9Yqq03i8ilSDoorBWwV3ub2PgNTbHZcgn0qpiKrUvU0OyMnMzOFIKEJljwBW1VhsM60ZSzgP-TmIHxwgpidJqw1qvcMxELZS8oJvXnP6MeWB5PUHbOE',
    rating: 4.9,
    reviews: '3.1k',
    time: '5 分钟',
    calories: '210 千卡',
    ingredients: [
      { emoji: '🥜', name: '黑芝麻' }
    ]
  },
  {
    id: '9',
    name: '特制蘸粉',
    price: 3,
    description: '秘制配方，提升小吃风味的最佳伴侣。',
    category: '3', // 自制配料
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClcvIVEJvNFa9wBp-7VZlDwuEYduSbOOSYT07L3F256thbEEP624NFzGUIV6ERSDlbe0uBTe12JCZ8z08UQmNuaPiuUeB9ChNTKzvuAiXuzqmYMI6QYv6dfU3LVzJvlHNlNniKhq6Hu-PLjfNcXCIZFSPnmH7uRpKl5a4ejy3y6O7RggWg8aSb2Srm63UzZmhtCTMpjG3zySswv12u0v1dPMkEdVVLxJEcOozxRaMVykJpGJE8zA-yTfuHfTKCzvgNP_91xpKLceQ',
    rating: 4.8,
    reviews: '200+',
    time: '1 分钟',
    calories: '20 千卡',
    ingredients: [
      { emoji: '🌶️', name: '调味料' }
    ]
  }
];

export const CATEGORIES = [
  { id: '1', name: '现做小吃', icon: 'verified' },
  { id: '2', name: '手作糖水', icon: 'soup_kitchen' },
  { id: '3', name: '自制配料', icon: 'auto_fix_high' }
];
