import { IConfigData } from '@/src/entities';

export const configData: IConfigData = {
  title: '스토리메이크',
  description: '스토리메이크는 소설이나 만화 등등의 창작을 편하게 할 수 있는 도구입니다.',
  keywords: 'create,novel,comics,story,character,창작,소설,만화,설정,스토리,캐릭터',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://storymake.nihilapps.dev',
  image: {
    link: '/opengraph-image.png',
    alt: 'site image',
  },
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  isBaseUrl() {
    return `${this.url}/api`;
  },
};
