# Acrool React Table

<a href="https://acrool-react-table.pages.dev/" title="Acrool React Table - CSS Gird Of React Table Design">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-table/main/example/public/og.webp" alt="Acrool React Table Logo"/>
</a>

<p align="center">
    CSS Gird Of React Table Design
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-table.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-table)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-table?style=for-the-badge)](https://github.com/acrool/react-table/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-table?style=for-the-badge)](https://github.com/acrool/acrool-react-table/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-table.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-table)
[![npm](https://img.shields.io/npm/dt/@acrool/react-table.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-table)


</div>

`^5.1.12 support react >=18.0.0 <20.0.0`


## Documentation

- [Getting Started](https://acrool-react-table.pages.dev/docs/getting-started)
- [Faq](https://acrool-react-table.pages.dev/docs/category/faqs)
- [Components](https://acrool-react-table.pages.dev/docs/category/components)
- [Features](https://acrool-react-table.pages.dev/docs/category/features)


## Features

- Easier to use, help memory
- Separate theme styles, making it easier to customize styles
- Provide `Cell` Display Mode
- Support `Sticky`
- Support Header `Sort`
- Support `Paginate` and can be used independently
- Support `Detail`
- Support `Footer`
- Support `NextJS 14` (v5.0.3+)


## Installation

```bash
yarn add @acrool/react-table
```

## Usage

add in your main.tsx
```tsx
import '@acrool/react-table/dist/index.css';
import '@acrool/react-table/dist/theme/acrool.css'; // (Options theme) 
```

## Option theme

add in your main.tsx, after dist/index.css

- Acrool: @acrool/react-table/dist/theme/acrool.css
- Game: @acrool/react-table/dist/theme/game.css

then in your page
```tsx
import Table from '@acrool/react-table';


const Example = () => {
    return <Table
        title={{
            name:   {text: 'Title', col: 100},
            desc:   {text: 'Text', col: true},
        }}
        data={[
            {id: 1, field: {name: 'Image Chiu', desc: 'this is a frontend coder'}},
            {id: 2, field: {name: 'Gary Chien', desc: 'this is a backend coder'}},
        ]}
    />;
};
```

## Options

if need use `null` value, options type

```json
{
    "compilerOptions": {
        "strictNullChecks": false
    }
}
```


There is also a storybook that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-table/main/play-in-example-button.svg)](https://acrool-react-table-storybook.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
