export function helpHandler() {
  console.log(`
Usage: npm create parcel-static [project-name] [options]

Description:      Create a static web project based Parcel.v2 bundler with ease! 
                  Choose your preferred template engine, style processing tool, 
                  JavaScript framework and сoding tools effortlessly.

Arguments:
  project-name    Name of the project/project directory (optional)

Options:
  --markup        Choose template engine:
                    'html' | 'pug' | 'ejs' | 'handlebars'
  --style         Choose style processing tool:
                    'css' | 'scss' | 'sass' | 'stylus' | 'less' | 'tailwind'
  --script        Choose JavaScript tool:
                    'javascript' | 'typescript' | 'jquery'
  --eslint        Add ESLint
  --stylelint     Add Stylelint
  --prettier      Add Prettier
  --help, --h     Display this help message

📦 Happy hacking! 
    `);
}
