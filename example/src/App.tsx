import {useState, useCallback} from 'react';
import dayjs from 'dayjs';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Table, {TOnChangePage, IPaginateMeta} from 'bear-react-table';
import {data, IPaginateData} from './config/data';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-table/dist/index.css';
import styled from 'styled-components';
import {formatCurrency} from 'bear-jsutils/number';






const getPageData = (currentPage: number, pageLimit: number, order?: {orderField: string, orderBy: 'DESC'|'ASC'}) => {

    if(order){
        data.sort((a, b) => mockSort(order.orderBy, order.orderField, a,b));
    }

    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};



const mockSort = (by: 'DESC'|'ASC', field: string, a: IPaginateData, b: IPaginateData) => {

    const fieldName = field as keyof IPaginateData;

    if (a[fieldName] < b[fieldName]) {
        return by === 'ASC' ? -1 : 1;
    }else if (a[fieldName] > b[fieldName]) {
        return by === 'ASC' ?  1: -1;
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
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta.currentPage, paginateMeta.pageLimit));

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



    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">


                <button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</button>
                <div className="d-flex flex-row my-2">
                    <Table
                        className="mr-2"
                        isDark={false}
                        isFetching={isFetching}
                        gap="8px"
                        isStickyHeader
                        title={[
                            {text: '',          field: 'plus',         col: 50, titleAlign: 'center', dataAlign: 'center'},
                            {text: '#',          field: 'avatar',      col: 50, titleAlign: 'center', dataAlign: 'center'},
                            {text: 'Name',       field: 'name',        col: 'auto', dataAlign: 'right', isEnableSort: true},
                            {text: 'Amount',     field: 'amount',      col: '80px', titleAlign: 'right', dataAlign: 'right'},
                            {text: 'Role',       field: 'role',        col: '120px'},
                            {text: 'Crated',     field: 'createdAt',   col: '110px', isEnableSort: true},
                            {text: 'Joined',     field: 'isApplyJoin', col: '80px'},
                        ]}
                        footer={{
                            // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
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
                                        type="button" onClick={() => args.collapse()}
                                        data-active={args.isActive ? '':undefined}
                                    >
                                        {args.isActive ? '-': '+'}
                                    </CollapseButton>,
                                    avatar: <Avatar src={row.avatar}/>,
                                    name: row.name,
                                    role: row.role,
                                    createdAt: dayjs(row.createdAt).format('MM/DD'),
                                    isApplyJoin: row.isJoined ? 'Y':'N',
                                    amount: `$ ${formatCurrency(row.amount)}`,
                                },
                            };
                        })}
                        onChangePage={handleFetchPaginate}
                        paginateMeta={paginateMeta}
                        paginateInfo={paginateInfo}
                    />

                    <Table
                        isDark
                        isFetching={isFetching}
                        gap="8px"
                        isStickyHeader
                        title={[
                            {text: '',          field: 'plus',      col: 50, titleAlign: 'center', dataAlign: 'center'},
                            {text: '#',          field: 'avatar',      col: 50, titleAlign: 'center', dataAlign: 'center'},
                            {text: 'Name',       field: 'name',        col: 'auto', isEnableSort: true},
                            {text: 'Amount',     field: 'amount',      col: '80px', titleAlign: 'right', dataAlign: 'right'},
                            {text: 'Role',       field: 'role',        col: '120px'},
                            {text: 'Crated',     field: 'createdAt',   col: '110px', isEnableSort: true},
                            {text: 'Joined',     field: 'isApplyJoin', col: '80px'},
                        ]}
                        footer={{
                            // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
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
                                        type="button" onClick={() => args.collapse()}
                                        data-active={args.isActive ? '':undefined}
                                    >
                                        {args.isActive ? '-': '+'}
                                    </CollapseButton>,
                                    avatar: <Avatar src={row.avatar}/>,
                                    name: row.name,
                                    role: row.role,
                                    createdAt: dayjs(row.createdAt).format('MM/DD'),
                                    isApplyJoin: row.isJoined ? 'Y':'N',
                                    amount: `$ ${formatCurrency(row.amount)}`,
                                },
                            };
                        })}
                        onChangePage={handleFetchPaginate}
                        paginateMeta={paginateMeta}
                        paginateInfo={paginateInfo}
                    />

                </div>



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
