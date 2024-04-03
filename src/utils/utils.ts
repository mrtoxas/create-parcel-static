export enum FileExtensions {
  html = 'html',
  pug = 'pug',
  hbs = 'hbs',
  ejs = 'ejs',
  css = 'css',
  scss = 'scss',
  sass = 'sass',
  stylus = 'styl',
  javascript = 'js',
  typescript = 'ts',
}

export function getExtensions(tech: UserChoises[keyof UserChoises]) {
  return FileExtensions[tech as keyof typeof FileExtensions];
}