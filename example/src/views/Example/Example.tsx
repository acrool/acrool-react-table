import {useCallback, useState} from 'react';
import {Col, Container, Row} from '@acrool/react-grid';
import styled from 'styled-components';
import Table, {genericsTitleData, IPaginateMeta, TOnChangePage} from '@acrool/react-table';
import {data, IPaginateData} from '../../config/data';
import {formatCurrency} from '@acrool/js-utils/number';
import dayjs from 'dayjs';





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


const Example = () => {


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
            no:     {text: 1, isRowSpan: true, col: 50,      titleAlign: 'center', dataAlign: 'center'},
            avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            name:     {text: <Name>Name</Name>,   col: 'auto',  isEnableSort: true},
            amount:   {text: 'Amount', col: '100px',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px', isHidden: true},
            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
        },
        paginateData.map(row => {
            return {
                id: row.id,
                detail: [
                    {
                        name: {value: 'Deposit', className: 'detail-css'},
                        amount: `$ ${formatCurrency(123456)}`
                    },
                    {name: 'Withdrawal', amount: `$ ${formatCurrency(row.subAmount)}`},
                ],
                onClickRow: collapse => collapse(),
                field: {
                    no: '',
                    avatar: <Avatar src={row.avatar}/>,
                    name: row.name,
                    amount: `$ ${formatCurrency(row.amount)}`,
                    role: row.role,
                    createdAt: dayjs(row.createdAt).format('MM/DD'),
                },
            };
        })
    );



    const renderLightTable = () => {
        return <Table
            isDark={false}
            locale="ja-JP"
            isFetching={isFetching}
            gap="8px"
            // isVisibleHeader={false}
            isStickyHeader
            // isVisibleBorder={true}
            // isEnableOddEven={false}
            title={tableData.title}
            tableCellMediaSize={768}
            // footer={[
            //     {
            //         name: 'Fax',
            //         amount: {value: 10, dataAlign: 'right', className: 'footer-css'},
            //     },
            //     {
            //         name: {value: 'Total'},
            //         amount: {value: calcAmount(data), dataAlign: 'right'},
            //     }
            // ]}
            data={tableData.data}
            onChangePage={handleFetchPaginate}
            paginateMeta={paginateMeta}
            paginateInfo={paginateInfo}
        />;
    };


    const renderTable = (isDark?: boolean, isVisibleHeader = false) => {
        return <>
            <Table
                style={{width: '100%', overflow: 'auto'}}
                // style={{width: '100%', '--header-top': 0, '--header-position': 'sticky'}}
                isDark={isDark}
                locale="zh-TW"
                isFetching={isFetching}
                gap="8px"
                isStickyHeader

                isVisibleHeader={isVisibleHeader}
                // isVisibleBorder={false}
                // isVisibleVerticalBorder
                // isOverflow
                // isEnableHover={false}
                title={{
                    plus:     {text: '=== Name (Merge) ===',       col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true, colSpan: 3},
                    avatar:   {text: '',      col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true},
                    name:     {text: '',   col: 150,  isEnableSort: true, titleAlign: 'center', isSticky: true, dataAlign: 'left'},
                    amount:   {text: 'Amount', col: 'auto',  titleAlign: 'right',  dataAlign: 'right'},
                    role:     {text: 'Role',   col: '120px'},
                    createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
                    joined:  {text: 'Joined',  col: '80px'},
                    // column1:     {text: 'Column1',   col: '120px'},
                    // column2:     {text: 'Column2',   col: '120px'},
                    // column3:     {text: 'Column3',   col: '120px'},
                }}
                // tableCellMediaSize={768}
                footer={[
                    {
                        // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
                        plus: {
                            colSpan: 3,
                            value: <div style={{color: '#fff', fontWeight: 700}}>Fax</div>
                        },
                        amount: {
                            dataAlign: 'right',
                            value: 10,
                        },
                    },
                    {
                        // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
                        plus: {
                            colSpan: 3,
                            value: <div style={{color: '#fff', fontWeight: 700}}>Total</div>
                        },
                        amount: {value: calcAmount(data), dataAlign: 'right'},
                    }
                ]}
                data={paginateData.map((row, index) => {
                    const isMergeColSpan = index === 0;


                    return {
                        id: row.id,
                        className: 'status-danger',
                        // detail: <>
                        //     <div>{row.name}, {row.amount}, {row.role}</div>
                        // </>,
                        detail:  [
                            {
                                avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
                                plus: {
                                    colSpan: 3,
                                    className: 'detail-css',
                                    value: <div style={{color: '#fff', fontWeight: 700}}>Fax</div>
                                },
                                amount: {
                                    dataAlign: 'right',
                                    value: 10,
                                },
                            },
                            {
                                // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
                                plus: {
                                    colSpan: 3,
                                    value: <div style={{color: '#fff', fontWeight: 700}}>Total</div>
                                },
                                amount: {value: calcAmount(data), dataAlign: 'right'},
                            }
                        ],
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
                            role: {
                                value: row.role,
                                className: 'my-role-css'
                            },
                            createdAt: dayjs(row.createdAt).format('MM/DD'),
                            joined: row.isJoined ? 'Y':'N',
                            amount: {
                                colSpan: isMergeColSpan ? 4: 1,
                                dataAlign: isMergeColSpan ? 'center': 'right',
                                value: `$ ${formatCurrency(row.amount)} ${isMergeColSpan ? '(Merge colspan)' : ''}`,
                            },
                            // column1: 'test',
                            // column2: 'test',
                            // column3: 'test',
                        },
                    };
                })}
                isVisiblePageInfo={false}
                isVisiblePageLimit={false}
                isVisiblePagePicker={false}
                onChangePage={handleFetchPaginate}
                paginateMeta={paginateMeta}
                paginateInfo={paginateInfo}
                renderPageButton={(args) => <button
                    {...args}
                >
                    <div className="decorate"/>
                    <span>{args.children}</span>
                </button>}
            />

            {/*Extend Paginate*/}

            {/*<Paginate*/}
            {/*    isDark*/}
            {/*    locale="zh-TW"*/}
            {/*    meta={paginateMeta}*/}
            {/*    info={paginateInfo}*/}
            {/*    onChangePage={handleFetchPaginate}*/}
            {/*/>*/}
        </>;
    };


    return <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', justifyContent: 'center', width: '100%'}}>
        <div className="App align-items-center justify-content-center d-flex flex-column">

            <Button type="button" onClick={() => setIsFetching(curr => !curr)}>isFetching</Button>

            <TableContainer fluid>

                {/*<Row>*/}
                {/*    <Col col>*/}
                {/*        <div style={{backgroundColor: '#fff', flex: 1, width: '100%', padding: '20px'}}>*/}
                {/*            {renderLightTable()}*/}
                {/*        </div>*/}

                {/*    </Col>*/}

                {/*    <Col col>*/}
                {/*        <div style={{backgroundColor: '#000', flex: 1, width: '100%', padding: '20px'}}>*/}
                {/*            {renderTable(true)}*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                {/*<Row>*/}
                {/*    <Col col>*/}
                {/*        <div style={{backgroundColor: '#000', flex: 1, width: '100%', padding: '20px'}}>*/}
                {/*            {renderTable(false,ETheme.acrool)}*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*    <Col col>*/}
                {/*        <div style={{backgroundColor: '#000', flex: 1, width: '100%', padding: '20px'}}>*/}
                {/*            {renderTable(true,ETheme.acrool)}*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                <Row>
                    <Col col>
                        <div style={{backgroundColor: '#3e5078', flex: 1, width: '100%', padding: '20px'}}>
                            {renderLightTable()}
                        </div>
                    </Col>
                    {/*<Col col>*/}
                    {/*    <div style={{backgroundColor: '#000', flex: 1, width: '100%', padding: '20px'}}>*/}
                    {/*{renderTable(true, true)}*/}
                    {/*</div>*/}
                    {/*</Col>*/}
                </Row>

            </TableContainer>




        </div>
    </div>;
};

export default Example;



const Name = styled.div`
    color: #e83e8c;
`;


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
    width: 35px;
    height: 35px;
`;

const TableContainer = styled(Container)`
    --primary-color: #17a254;

    //.status-danger{
    //    border-left-color: #e83e8c !important;
    //}

    table {
        //--vertical-border-color: var(--border-color);
        //--header-border-color: var(--border-color);
        //--tbody-th-bg-color: #4a63b6;
        //--tbody-th-color-color: #0a278a;
        //--border-color: rgba(66, 66, 66, 0.27);

        //--border-radius: 50px;
    }
`;

const Button = styled.button`
    color: #fff;
    background-color: #e83e8c;
    border-radius: 4px;
`;

const Title = styled.h1`
    color: #2b70b4;
    text-align: center;
    margin: 20px;
`;

