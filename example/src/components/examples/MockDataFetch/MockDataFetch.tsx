import {useState} from 'react';
import {Flex} from '@acrool/react-grid';
import styled from 'styled-components';
import Table, {genericsTitleData, IPaginateMeta, TOnChangePage} from '@acrool/react-table';
import {data, IPaginateData} from '../../data';
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


interface IProps {
    isDark?: boolean
}
const MockDataFetch = ({
    isDark
}: IProps) => {

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
        setPaginateMeta(meta);

        const {currentPage, pageLimit, order} = meta;

        setTimeout(() => {
            setPaginateData(getPageData(currentPage, pageLimit, order));
            setIsFetching(false);
        }, 400);
    };



    const tableData = genericsTitleData(
        {
            avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
            amount:   {text: 'Amount', col: '100px',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px', isHidden: true},
            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
        },
        paginateData.map(row => {
            return {
                id: row.id,
                field: {
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
            isDark={isDark}
            locale="ja-JP"
            isFetching={isFetching}
            gap="8px"
            title={tableData.title}
            tableCellMediaSize={768}
            data={tableData.data}
            onChangePage={handleFetchPaginate}
            paginateMeta={paginateMeta}
            paginateInfo={paginateInfo}
        />;
    };


    return <Flex column className="gap-2 align-items-center">
        <Button type="button" onClick={() => setIsFetching(curr => !curr)}>isFetching</Button>
        {renderLightTable()}
    </Flex>;
};

export default MockDataFetch;



const Name = styled.div`
    color: #e83e8c;
`;


const Avatar = styled.img`
   border-radius: 99em;
    overflow: hidden;
    width: 35px;
    height: 35px;
`;


const Button = styled.button`
    color: #fff;
    background-color: #e83e8c;
    border-radius: 4px;
`;

