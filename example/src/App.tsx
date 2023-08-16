import {useState} from 'react';
import dayjs from 'dayjs';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Table, {TOnChangePage, IPaginateMeta} from 'bear-react-table';
import {data, IPaginateData} from './config/data';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-table/dist/index.css';






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
                        isDark
                        isFetching={isFetching}
                        title={[
                            {text: '#',          field: 'avatar',      col: 60, titleAlign: 'center', dataAlign: 'center'},
                            {text: 'Name',       field: 'name',        col: true, isEnableSort: true},
                            {text: 'Role',       field: 'role',        col: 120},
                            {text: 'Crated',     field: 'createdAt',   col: 110, isEnableSort: true},
                            {text: 'Joined',     field: 'isApplyJoin', col: 80},
                            {text: 'Amount',     field: 'amount', col: 80, titleAlign: 'right', dataAlign: 'right'},
                        ]}


                        data={undefined}
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
