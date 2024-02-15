import {useState, useCallback} from 'react';
import dayjs from 'dayjs';

import Table, {TablePaginate, TOnChangePage, IPaginateMeta, genericsTitleData} from 'bear-react-table';
import {data, IPaginateData} from './config/data';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-table/dist/index.css';
import styled from 'styled-components';
import {formatCurrency} from 'bear-jsutils/number';





const getPageData = (currentPage: number, pageLimit: number, order?: {orderField: string, orderBy: string}) => {

    if(order){
        data.sort((a, b) => mockSort(order.orderBy, order.orderField, a,b));
    }

    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};



const mockSort = (by: string, field: string, a: IPaginateData, b: IPaginateData) => {

    const fieldName = field as keyof IPaginateData;

    if (a[fieldName] < b[fieldName]) {
        return by.toLowerCase() === 'asc' ? -1 : 1;
    }else if (a[fieldName] > b[fieldName]) {
        return by.toLowerCase() === 'asc' ?  1: -1;
    }
    // a 必須等於 b
    return 0;
};




function App() {


    const [isFetching, setIsFetching] = useState(false);
    const [paginateMeta, setPaginateMeta] = useState<IPaginateMeta>({
        currentPage: 1,
        pageLimit: 8,
        order: {
            orderField: 'id',
            orderBy: 'DESC',
        }
    });
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta.currentPage, paginateMeta.pageLimit, paginateMeta.order));

    const paginateInfo = {
        totalItems: data.length,
        totalPages: Math.ceil(data.length / paginateMeta.pageLimit),
    };


    /**
     * 查詢分頁
     */
    const handleFetchPaginate: TOnChangePage = (meta) => {
        // 取得查詢項目
        setIsFetching(true);
        // console.log('meta', meta);
        setPaginateMeta(meta);

        const {currentPage, pageLimit, order} = meta;

        setTimeout(() => {
            setPaginateData(getPageData(currentPage, pageLimit, order));
            setIsFetching(false);
        }, 400);
    };


    const calcAmount = useCallback((rows: IPaginateData[]) => {
        return formatCurrency(rows.reduce((curr, row) => curr + row.amount,0));
    }, []);



    const tableData = genericsTitleData(
        {
            plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},
            avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
            amount:   {text: 'Amount', col: '100px',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px'},
            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
        },
        paginateData.map(row => {
            return {
                id: row.id,
                detail: {
                    config: {plus: {colSpan: 2, dataAlign: 'right'}},
                    data: [
                        {plus: 'Deposit', amount: `$ ${formatCurrency(123456)}`},
                        {plus: 'Withdrawal', amount: `$ ${formatCurrency(row.subAmount)}`},
                    ],
                },
                onClickRow: collapse => collapse(),
                field: {
                    plus: 'xxx',
                    avatar: <Avatar src={row.avatar}/>,
                    name: row.name,
                    amount: `$ ${formatCurrency(row.amount)}`,
                    role: row.role,
                    createdAt: dayjs(row.createdAt).format('MM/DD'),
                },
            };
        })
    );



    return (
        <div className="App">

            <h1>Bear React Table</h1>
            <div>
                <button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</button>
                <TableContainer className="d-flex flex-row my-2">
                    <div style={{backgroundColor: '#fff', flex: 1, padding: '20px'}}>
                        <Table
                            isDark={false}
                            locale="ja-JP"
                            isFetching={isFetching}
                            gap="8px"
                            // isVisibleHeader={false}
                            isStickyHeader
                            isVisibleBorder={true}
                            // isEnableOddEven={false}
                            title={tableData.title}
                            tableCellMediaSize={768}
                            footer={{
                                name: {value: 'Total'},
                                amount: {value: calcAmount(data), dataAlign: 'right'},
                            }}
                            data={tableData.data}
                            onChangePage={handleFetchPaginate}
                            paginateMeta={paginateMeta}
                            paginateInfo={paginateInfo}
                        />
                    </div>

                    <div style={{backgroundColor: '#000', flex: 1, padding: '20px'}}>

                        <Table
                            isDark
                            locale="zh-TW"
                            isFetching={isFetching}
                            gap="8px"
                            isStickyHeader
                            // isVisibleBorder={false}
                            isVisibleVerticalBorder
                            isOverflow
                            isEnableHover={false}
                            title={{
                                plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},
                                avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
                                name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
                                amount:   {text: 'Amount', col: '100px',  titleAlign: 'right',  dataAlign: 'right'},
                                role:     {text: 'Role',   col: '120px'},
                                createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
                                joined:  {text: 'Joined',  col: '80px'},
                            }}
                            tableCellMediaSize={768}
                            footer={{
                                // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
                                name: {value: <div style={{color: '#fff', fontWeight: 700}}>Total</div>},
                                amount: {value: calcAmount(data), dataAlign: 'right'},
                            }}
                            data={paginateData.map((row, index) => {
                                return {
                                    id: row.id,
                                    detail: <>
                                        <div>{row.name}</div>
                                        <div>{row.amount}</div>
                                        <div>{row.role}</div>
                                    </>,
                                    onClickRow: () => console.log(`click row id: ${row.id}`),
                                    field: {
                                        plus: (args) => <CollapseButton
                                            type="button" onClick={args.collapse}
                                            data-active={args.isActive ? '':undefined}
                                        >
                                            {args.isActive ? '-': '+'}
                                        </CollapseButton>,
                                        avatar: <Avatar src={row.avatar}/>,
                                        // name: {value: row.name, colSpan: 2, dataAlign: 'right'},
                                        name: row.name,
                                        role: row.role,
                                        createdAt: dayjs(row.createdAt).format('MM/DD'),
                                        joined: row.isJoined ? 'Y':'N',
                                        amount: {
                                            colSpan: index === 0 ? 4: 1,
                                            dataAlign: index === 0 ? 'center': 'right',
                                            value: `$ ${formatCurrency(row.amount)}`,
                                        },
                                    },
                                };
                            })}
                            isVisiblePaginate={false}
                            onChangePage={handleFetchPaginate}
                            paginateMeta={paginateMeta}
                            paginateInfo={paginateInfo}
                        />

                            extend Paginate
                        <TablePaginate
                            isDark
                            locale="zh-TW"
                            meta={paginateMeta}
                            info={paginateInfo}
                            onChangePage={handleFetchPaginate}
                        />

                    </div>
                </TableContainer>




                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>

        </div>
    );
}

export default App;

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

    outline: none;
    box-shadow: none;
    border: none;
    color: #fff;

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

    table {
        //--vertical-border-color: var(--border-color);
        --header-border-color: var(--border-color);
        --tbody-th-bg-color: #4a63b6;
        --tbody-th-color-color: #0a278a;
        --border-color: #9ca3af;
    }
`;
