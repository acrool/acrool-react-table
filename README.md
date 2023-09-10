# bear-react-table

> Table library based for Reactjs

[![NPM](https://img.shields.io/npm/v/bear-react-table.svg)](https://www.npmjs.com/package/bear-react-table)
[![npm](https://img.shields.io/npm/dm/bear-react-table.svg)](https://www.npmjs.com/package/bear-react-table)

<div align="center">
    <img src="https://github.com/imagine10255/bear-react-table/blob/main/docs/table.jpg" alt="Table library based for Reactjs" />
</div>



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


const getPageData = (currentPage: number, pageLimit: number) => {
    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
}


const BaseUsed = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [paginateMeta, setPaginateMeta] = useState<IPaginateMeta>({
        currentPage: 1,
        pageLimit: 8,
        sort: {field: 'name', orderBy: 'DESC'},
    });
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta.currentPage, paginateMeta.pageLimit));
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo>({
        totalItems: data.length,
        totalPages: Math.ceil(data.length / paginateMeta.pageLimit),
    });



    /**
     * 查詢分頁
     */
    const handleFetchPaginate = useCallback((meta: IPaginateMeta) => {
        // 取得查詢項目
        setIsFetching(true);
        setPaginateMeta(meta);

        setTimeout(() => {
            setPaginateData(getPageData(meta.currentPage, meta.pageLimit));
            setIsFetching(false);
        }, 400);
    }, []);



    return <TableContainer>
        <Table
            isDark={false}
            isFetching={isFetching}
            gap="8px"
            isStickyHeader
            title={{
                plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},
                avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
                name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
                amount:   {text: 'Amount', col: '80px',  titleAlign: 'right',  dataAlign: 'right'},
                role:     {text: 'Role',   col: '120px'},
                createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
                joined:  {text: 'Joined',  col: '80px'},
            }}
            footer={{
                plus: {value: 'Total'},
                name: {value: 'Total'},
                amount: {value: calcAmount(data), dataAlign: 'right'},
            }}
            data={data.map(row => {
                return {
                    id: row.id,
                    // detail: <>
                    //     <div>{row.name}</div>
                    //     <div>{row.amount}</div>
                    //     <div>{row.role}</div>
                    // </>,
                    detail: {
                        config: {plus: {colSpan: 2, dataAlign: 'right'}},
                        data: [
                            {plus: 'Deposit', amount: `$ ${formatCurrency(123456)}`},
                            {plus: 'Withdrawal', amount: `$ ${formatCurrency(row.subAmount)}`},
                        ],
                    },
                    field: {
                        plus: (args) => <CollapseButton
                            type="button" onClick={args.collapse}
                            data-active={args.isActive ? '':undefined}
                        >
                            {args.isActive ? '-': '+'}
                        </CollapseButton>,
                        avatar: <Avatar src={row.avatar}/>,
                        name: row.name,
                        role: row.role,
                        createdAt: dayjs(row.createdAt).format('MM/DD'),
                        joined: row.isJoined ? 'Y':'N',
                        amount: `$ ${formatCurrency(row.amount)}`,
                    },
                };
            })}
            onChangePage={handleFetchPaginate}
            paginateMeta={paginateMeta}
            paginateInfo={paginateInfo}
        />
    </TableContainer>
};



const CollapseButton = styled.button`
    width: 20px;
    height: 20px;
    background-color: #535bf2;
    border-radius: 4px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    &[data-active] {
        background-color: #f25353;
    }
`;


const Avatar = styled.img`
   border-radius: 99em;
    overflow: hidden;
    width: 20px;
    height: 20px;
`;

const TableContainer = styled.div`
    --primary-color: #17a254;

    .${elClassNames.root} {
        --header-line-height: 45px;
        --body-line-height: 45px;
    }
`;

```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-react-table-n0s8su?file=/src/App.tsx)


## License

MIT © [imagine10255](https://github.com/imagine10255)
