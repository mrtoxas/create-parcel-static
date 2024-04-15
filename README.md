# create-parcel-static
## Scaffolding your static project based Parcel v2


> **Compatibility Note:**
> create-parcel-static requires [Node.js](https://nodejs.org/en/) version 14+. But it is recommended to use a newer version for best performance and security.

### Usage: 
> _You can use your preferred package manager - npm, yarn, pnpm, bun, ..._
```bash
npm create parcel-static
```
Then answer the constructor's questions:
```bash
? Project name: (parcel-project)

? Select template engine:
❯ HTML
  Pug
  EJS
  Handlebars

Select Style processing tool:
❯ CSS
  SASS (Indented Syntax)
  SASS (SCSS Syntax)
  Less
  Stylus
  Tailwind

? Select JavaScript tool:
❯ JavaScript
  TypeScript
  JQuery
  JQuery (TypeScript)

? Add Prettier?
? Add StyleLint?
? Add ESLint?
```
... and follow the final instructions in your terminal.



### Command line
You can use the command line to easily create projects. 
```bash
# Warning: npm requires a double dash before specifying options
$ npm create parcel-static [project-name] -- [options]
$ yarn create parcel-static [project-name] [options]
$ pnpm create parcel-static [project-name] [options]
$ bun create parcel-static [project-name] [options]
```
Arguments:
```bash
[project-name]    Name of the project/project directory (optional)
```
Options:
```bash
--markup       Choose template engine: 'html' | 'pug' | 'ejs' | 'handlebars'
--style        Choose style processing tool: 'css' | 'scss' | 'sass' | 'stylus' | 'less' | 'tailwind'
--script       Choose JavaScript tool: 'javascript' | 'typescript' | 'jquery'
--eslint       Add ESLint
--stylelint    Add Stylelint
--prettier     Add Prettier
--help, --h    Display help message
```
Examples:
```bash
$ npm create parcel-static
$ npm create parcel-static my-static-project
$ npm create parcel-static my-static-project -- --markup pug --style tailwind
$ npm create parcel-static -- --markup pug --style tailwind
$ yarn create parcel-static --script typescript --eslint --prettier
$ yarn create parcel-static my-static-project --markup html --style scss
$ yarn create parcel-static --markup html --style scss
$ yarn create parcel-static --eslint --prettier

```
### Project Structure
    .
    ├── src                 # Source files
    │   ├── assets          # Script files
    │   ├── scripts         # Script files
    │   ├── styles          # Style files
    │   └── templates       # Part of HTML files
    ├── dist                # Compiled files.
    ├── assets              # Asset files
    ├── public              # Public files (It will be building as is, without processing)
    └── ...

