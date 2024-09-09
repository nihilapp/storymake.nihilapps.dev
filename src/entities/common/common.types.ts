export type ApiResponse<T> = {
  resData: T;
  message: string;
}

export type ApiError = {
  resData: null;
  message: string;
}

export interface ISiteMeta {
  title: string;
  url?: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: string;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  image?: {
    link: string;
    alt: string;
  };
}

export interface IConfigData {
  title: string;
  description: string;
  url: string;
  type: string;
  image: {
    link: string;
    alt: string;
  };
  keywords: string;
  author: {
    name: string;
    url: string;
  };
  version: string;
  googleVerfi: string;
  googleAdSrc: string;
  googleAnalyticsId: string;
  isBaseUrl: () => string;
}

export interface QueryKeys<T> {
  getAll: string[];
  getById: (id: T) => [string, T];
  getByName?: (name: string) => [string, string];
  getByEmail?: (email: string) => [string, string];
}

export interface CharacterNames {
  label: string;
  value: string;
}
