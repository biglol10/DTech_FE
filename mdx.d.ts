// nextjs typescript의 stories.tsx에서 md, mdx파일을 못 읽을 때 (import 못할 때) 이걸 추가
declare module '*.md';
declare module '*.mdx';
declare module '*.module.css';
declare module '*.module.scss';
