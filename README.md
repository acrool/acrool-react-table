# bear-react-table

> Datepicker library based for Reactjs

[![NPM](https://img.shields.io/npm/v/bear-react-table.svg)](https://www.npmjs.com/package/bear-react-table)
[![npm](https://img.shields.io/npm/dm/bear-react-table.svg)](https://www.npmjs.com/package/bear-react-table)

<img src="./docs/table.jpg" width="700"/>



## Support Version Map

React | React Scripts | Bear React Grid | 
------|:--------------|----------------:|
18    | 5.0.1         |           2.0.0 |


## Install

```bash
yarn add bear-react-table
```

## Usage

add in your index.tsx
```tst
import "bear-react-table/dist/index.css";

```

then in your page
```tsx
import {Table} from 'bear-react-table';


const BaseUsed = () => {
    const options1 = [
        {text: 'Jack Wu', value: '1'},
        {text: 'Imagine Chiu', value: '2'},
        {text: 'Jason Dinwiddie', value: '3'},
        {text: 'Gloria Lu', value: '4'},
    ];
    const options2 = [
        {text: 'Select option item...', value: '', avatarUrl: ''},
        {text: 'Jack Wu', value: '1', avatarUrl: asset('/images/avatar/female-1.jpg')},
        {text: 'Imagine Chiu', value: '2', avatarUrl: asset('/images/avatar/female-2.jpg')},
        {text: 'Jason Dinwiddie', value: '3', avatarUrl: asset('/images/avatar/female-3.jpg')},
        {text: 'Gloria Lu', value: '4', avatarUrl: asset('/images/avatar/female-4.jpg')},
    ];
    
    return (
        <div>
            <Table value={value} onChange={setValue} options={options1} className="mr-3"/>
            <Table value={value} onChange={setValue} options={options2} isDark/>
        </div>
    );

};
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-react-table-1uvhiw)


## License

MIT © [imagine10255](https://github.com/imagine10255)
