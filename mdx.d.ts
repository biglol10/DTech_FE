// nextjs typescript의 stories.tsx에서 md, mdx파일을 못 읽을 때 (import 못할 때) 이걸 추가... 스토리북이 webpack 5를 사용하면서 파일 자체는 읽을 수 있지만 소스에서 빨간 줄 발생
declare module '*.md';
declare module '*.mdx';
declare module '*.module.css';
declare module '*.module.scss';
