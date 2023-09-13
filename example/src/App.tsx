import {useState, useCallback} from 'react';
import dayjs from 'dayjs';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Table, {elClassName, TOnChangePage, IPaginateMeta, TTitle, TBodyDataID, TBodyDataFieldKey, IBodyData} from 'bear-react-table';
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


interface ITableTitleData<T extends TBodyDataID, K extends TBodyDataFieldKey> {
    title: TTitle<K>
    data: IBodyData<T, K>[]
}


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


    const tableTitleData: ITableTitleData<TBodyDataID, TBodyDataFieldKey> = {
        title: {
            plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},
            avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
            amount:   {text: 'Amount', col: '80px',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px'},
            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
            joined:   {text: 'Joined',  col: '80px'},
        },
        data: paginateData.map(row => {
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
                // onClickRow: collapse => collapse(),
                field: {
                    // plus: (args) => <CollapseButton
                    //     type="button" onClick={args.collapse}
                    //     data-active={args.isActive ? '':undefined}
                    // >
                    //     {args.isActive ? '-': '+'}
                    // </CollapseButton>,
                    plus: 'xxx',
                    avatar: <Avatar src={row.avatar}/>,
                    name: row.name,
                    amount: `$ ${formatCurrency(row.amount)}`,
                    role: row.role,

                    createdAt: dayjs(row.createdAt).format('MM/DD'),
                    // joined: row.isJoined ? 'Y':'N',

                },
            };
        })
    };



    return (
        <div className="App">

            <h1>Bear React Table</h1>
            <div>
                <button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</button>
                <TableContainer className="d-flex flex-row my-2">
                    <div style={{backgroundColor: '#fff', flex: 1, padding: '20px'}}>
                        <Table
                            isDark={false}
                            isFetching={isFetching}
                            gap="8px"
                            isStickyHeader
                            title={tableTitleData.title}
                            tableCellMediaSize={768}
                            footer={{
                                name: {value: 'Total'},
                                amount: {value: calcAmount(data), dataAlign: 'right'},
                            }}
                            data={tableTitleData.data}
                            onChangePage={handleFetchPaginate}
                            paginateMeta={paginateMeta}
                            paginateInfo={paginateInfo}
                        />
                    </div>

                    {/*<div style={{flex: 1, padding: '20px'}}>*/}
                    {/*    <Table*/}
                    {/*        isDark*/}
                    {/*        isFetching={isFetching}*/}
                    {/*        gap="8px"*/}
                    {/*        isStickyHeader*/}
                    {/*        title={{*/}
                    {/*            plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},*/}
                    {/*            avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},*/}
                    {/*            name:     {text: 'Name',   col: 'auto',  isEnableSort: true},*/}
                    {/*            amount:   {text: 'Amount', col: '80px',  titleAlign: 'right',  dataAlign: 'right'},*/}
                    {/*            role:     {text: 'Role',   col: '120px'},*/}
                    {/*            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},*/}
                    {/*            joined:  {text: 'Joined',  col: '80px'},*/}
                    {/*        }}*/}
                    {/*        tableCellMediaSize={768}*/}
                    {/*        footer={{*/}
                    {/*            // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},*/}
                    {/*            name: {value: 'Total'},*/}
                    {/*            amount: {value: calcAmount(data), dataAlign: 'right'},*/}
                    {/*        }}*/}
                    {/*        data={paginateData.map(row => {*/}
                    {/*            return {*/}
                    {/*                id: row.id,*/}
                    {/*                detail: <>*/}
                    {/*                    <div>{row.name}</div>*/}
                    {/*                    <div>{row.amount}</div>*/}
                    {/*                    <div>{row.role}</div>*/}
                    {/*                </>,*/}
                    {/*                onClickRow: () => console.log(`click row id: ${row.id}`),*/}
                    {/*                field: {*/}
                    {/*                    plus: (args) => <CollapseButton*/}
                    {/*                        type="button" onClick={args.collapse}*/}
                    {/*                        data-active={args.isActive ? '':undefined}*/}
                    {/*                    >*/}
                    {/*                        {args.isActive ? '-': '+'}*/}
                    {/*                    </CollapseButton>,*/}
                    {/*                    avatar: <Avatar src={row.avatar}/>,*/}
                    {/*                    name: row.name,*/}
                    {/*                    role: row.role,*/}
                    {/*                    createdAt: dayjs(row.createdAt).format('MM/DD'),*/}
                    {/*                    joined: row.isJoined ? 'Y':'N',*/}
                    {/*                    amount: `$ ${formatCurrency(row.amount)}`,*/}
                    {/*                },*/}
                    {/*            };*/}
                    {/*        })}*/}
                    {/*        onChangePage={handleFetchPaginate}*/}
                    {/*        paginateMeta={paginateMeta}*/}
                    {/*        paginateInfo={paginateInfo}*/}
                    {/*    />*/}

                    {/*</div>*/}
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

`;
