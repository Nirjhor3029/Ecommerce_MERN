# [Class - 4](https://www.youtube.com/watch?v=WGmCnynA4fw&list=PLFcwiScIb5d_GlLhASRpk6jctj6AoK87L&index=5)

- [ ] *clean up project*
    - [ ] `delete` unnecessary files
- [ ] *install `redux` & some helpers packages for redux*
    - [ ] redux
    - [ ] react-redux
    - [ ] redux-devtools-extension
    - [ ] redux-thunk
    > yarn add redux react-redux redux-devtools-extension redux-thunk
- [ ] **Setup Redux/ Redux init:**
    - [ ] create `src > data > store.js`
        - [ ] Config `redux` code: `redux boilerplate code`
    - [ ] create `src > data > reducers > index.js`
        - [ ] `rootReducer` for combine all reducers in app
        - [ ] import `combineReducers` from `redux` & export default `combineReducers`
    - [ ] `src > index.js` 
        - [ ] import `Provider` from `react-redux` & 
        - [ ] wrap `<App/>` component with `<Provider> <Provider/>` component
    `Redux Store setup done.!!! now test it by redux-devtools extension`
- [ ] **Setting Up Tailwind CSS In A React Project** [blog](https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/)
    - [ ] install some packages
        - [ ] `tailwindcss`
        - [ ] `postcss-cli`
        - [ ] `autoprefixer`
    - [ ] Create Tailwind CSS config file: tailwind.js by command
    - [ ] create `postcss.config.js` by command

    > yarn add tailwindcss postcss-cli autoprefixer -D

    > npx tailwind init tailwind.js --full

    > touch postcss.config.js
    
    *postcss.config.js:*
    ```
    const tailwindcss = require('tailwindcss');
    module.exports = {
        plugins: [
            tailwindcss('./tailwind.js'),
            require('autoprefixer')
        ],
    };

    ```
    - [ ] Create `src/assets >`
        - [ ] `main.css`
        - [ ] `tailwind.css`
        *Code:*
            
            `@import "tailwindcss/base";`
            `@import "tailwindcss/components";`
            `@import "tailwindcss/utilities";`
            
    - [ ] `package.json`
        - [ ] add 2 more `commands` into `scripts`
            > "build:css": "postcss src/assets/tailwind.css -o src/assets/main.css",
            > "watch:css": "postcss src/assets/tailwind.css -o src/assets/main.css"
        - [ ] Edit: `start` & `build` commands
            > "start": "npm run watch:css && react-scripts start",
            > "build": "npm run build:css && react-scripts build",

        > yarn start
        - [ ] import `src > assets > main.css` into `index.js`

--- 
---
# [Class - 5](https://www.youtube.com/watch?v=SHFY73QEjEo&list=PLFcwiScIb5d_GlLhASRpk6jctj6AoK87L&index=6)

> yarn add react-router-dom