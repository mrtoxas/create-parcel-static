export function helpHandler() {
  console.log(`
Usage: 
  npm create parcel-static [project-name] -- [options]
  yarn create parcel-static [project-name] [options]
  pnpm create parcel-static [project-name] [options]
  bun create parcel-static [project-name] [options]

Arguments:
  project-name    Name of the project/project directory (optional)

Options:
  --markup          Choose template engine:
                     'html' | 'pug' | 'ejs' | 'handlebars'
  --style           Choose style processing tool:
                      'css' | 'scss' | 'sass' | 'stylus' | 'less' | 'tailwind'
  --script          Choose JavaScript tool:
                      'javascript' | 'typescript' | 'jquery'
  --eslint         Add ESLint
  --stylelint      Add Stylelint
  --prettier       Add Prettier
  --help, --h       Display this help message

Examples:
npm create parcel-static
npm create parcel-static my-static-app
npm create parcel-static my-static-app -- --markup pug --script javascript --eslint 
yarn create parcel-static my-static-app --style scss --markup html

📦 Happy hacking! 
    `);
}
