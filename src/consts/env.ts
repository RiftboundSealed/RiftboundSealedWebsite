const getEnv = (key: string) => {
  const value = import.meta.env[key as keyof ImportMetaEnv];

  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Environment variable ${key} not found`);
  }

  return value;
};

// App
export const VITE_CDN_BASE_URL = getEnv('VITE_CDN_BASE_URL');
