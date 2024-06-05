# 📦 create-parcel-static
Project builder for creating static sites based Parcel v.2 creates a development environment and offers choices between HTML, Pug, EJS, CSS, SCSS, Sass, Less, Tailwind, JavaScript, TypeScript, jQuery, and integration with Prettier, ESLint, and Stylelint.

## Motivation
**For those who appreciate simplicity.** In the world of modern web development, it has become commonplace to use powerful frameworks, but sometimes you need something more classic and simple.
This builder provides an easy and efficient way to deploy a development environment to build lightweight, fast and simple static sites without relying on heavyweight tools.

### Usage: 
> _You can use your preferred package manager - npm, yarn, pnpm, bun, ..._
```bash
npm create parcel-static
```
Then answer the constructor's questions and follow instructions in your terminal.

#### Features
- **Project Name:** Assign a name to your project.
- **Template Engine:** Choose your preferred template engine (HTML, Pug, EJS).
- **Style Processor:** Select a styling tool (CSS, SASS - Indented Syntax, SASS - SCSS Syntax, Less, Stylus, Tailwind).
- **JavaScript Framework:** Pick a JavaScript framework or library (JavaScript, TypeScript, JQuery, JQuery with TypeScript).
- **Prettier:** Integrate Prettier for code formatting (optional).
- **StyleLint:** Incorporate StyleLint for style standardization (optional).
- **ESLint:** Include ESLint for JavaScript standard compliance (optional).

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
--markup       Choose template engine: 'html' | 'pug' | 'ejs'
--style        Choose style processing tool: 'css' | 'scss' | 'sass' | 'stylus' | 'less' | 'tailwind'
--script       Choose JavaScript tool: 'javascript' | 'typescript' | 'jquery'
--eslint       Add ESLint
--stylelint    Add Stylelint
--prettier     Add Prettier
--no-eslint    Exclude ESLint (works similarly with Stylelint and Prettier)
--help, --h    Display help message
```
Examples:
```bash
$ npm create parcel-static
$ npm create parcel-static my-static-project
$ npm create parcel-static my-static-project -- --markup pug --style tailwind
$ npm create parcel-static -- --markup pug --style tailwind --no-prettier
$ yarn create parcel-static --script typescript --eslint --prettier
$ yarn create parcel-static my-static-project --markup html --style scss
$ yarn create parcel-static --markup html --style scss
$ yarn create parcel-static --eslint --prettier

```
### Project Structure
    .
    ├── src                                   # Source files
    │   ├── assets                            # Project resources (favicons, etc.)
    │   ├── images                            # Image files
    │   ├── scripts                           # Script files
    |   |   └── main.[js,ts]                  # Main script file
    │   ├── styles                            # Style files
    |   |   └── main.[css,scss,sass,styl]     # Main style file    
    │   └── index.[html,pug,ejs]              # Main markup file
    ├── public                                # Public files that will be builded as is, without processing
    │   └── robot.txt                         # Instructions for search engine robots
    ├── .postcssrc                            # PostCSS config (optional)
    ├── .prettierrc                           # Prettier config (optional)
    ├── .stylelintrc                          # StyleLint config (optional)
    ├── tailwind.config.ts                    # Tailwind config (optional)    
    ├── tsconfig.json                         # TypeScript config (optional)    
    ├── dist                                  # Compiled files
    └── ...
### Startup scripts
> _Scripts are run depending on the package manager used - npm start [script], yarn [script], etc._
- **`start`** - Starting the development server 
- **`build`** - Building the project
- **`clear:dist`** - Cleaning the build directory
#### Optional scripts depending on project configuration:
- **`lint:scripts:check`** - Check scripts with ESLint
- **`lint:scripts:fix`** - Fix scripts issues with ESLint
- **`lint:styles:check`** - Check styles with StyleLint
- **`lint:styles:fix`** - Fix styles issues with StyleLint
- **`prettier:markup:check`** - Check markup files formatting with Prettier
- **`prettier:markup:fix`** - Fix markup files formatting with Prettier
- **`prettier:scripts:check`** - Check script files formatting with Prettier
- **`prettier:scripts:fix`** - Fix script-files formatting with Prettier
- **`prettier:styles:check`** - Check style files formatting with Prettier
- **`prettier:styles:fix`** - Fix style-files formatting with Prettier

### References
For more information about the Parcel bundler, visit its [repository](https://github.com/parcel-bundler/parcel).  

