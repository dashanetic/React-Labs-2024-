// Декларация для CSS модулей
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Декларации для изображений и SVG
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Декларация для Vite import.meta.env
interface ImportMeta {
  env: {
    DEV: boolean;
    PROD: boolean;
    MODE: string;
    BASE_URL: string;
    [key: string]: string | boolean | undefined;
  };
}