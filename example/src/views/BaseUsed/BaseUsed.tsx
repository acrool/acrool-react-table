import React, {useCallback, useState} from 'react';
import {Table, TOnChangePage, IPaginateMeta} from 'bear-react-table';
import styled from 'styled-components/macro';
import dayjs from 'dayjs';
import {data, IPaginateData} from '../_components/data';


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



const BaseUsed = () => {


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
        <div>
            <Button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</Button>
            <div className="d-flex flex-row my-2">
                <Table
                    isFetching={isFetching}
                    title={[
                        {text: '#',          field: 'avatar',      col: 60, titleAlign: 'center', dataAlign: 'center'},
                        {text: 'Name',       field: 'name',        col: true, isEnableSort: true},
                        {text: 'Role',       field: 'role',        col: 120},
                        {text: 'Crated',     field: 'createdAt',   col: 110, isEnableSort: true},
                        {text: 'Joined',     field: 'isApplyJoin', col: 80},
                        {text: 'Amount',     field: 'amount', col: 80, titleAlign: 'right', dataAlign: 'right'},
                    ]}
                    data={paginateData.map(row => {
                        const createdAt = dayjs(row.createdAt);

                        return {
                            id: row.id,
                            disabled: !row.isJoined,
                            onClickRow: () => console.log(row.id),
                            field: {
                                role: row.role,
                                avatar: <Avatar style={{backgroundImage: `url(${row.avatar})`}}/>,
                                name: <div className="d-flex flex-column">
                                    <div>{row.name}</div>
                                    <div>{row.email}</div>
                                </div>,
                                isApplyJoin: row.isJoined ? '已加入':'等待同意',
                                createdAt: <div style={{fontSize: 12}}>
                                    {createdAt.format('YYYY-MM-DD')}<br/>
                                    {createdAt.format('HH:mm:ss')}
                                </div>,
                                amount: `$ ${row.amount}`,
                            }
                        };
                    })}
                    onChangePage={handleFetchPaginate}
                    paginateMeta={paginateMeta}
                    paginateInfo={paginateInfo}
                />

            </div>




        </div>
    );

};

export default BaseUsed;



const Button = styled.button`
  background-color: rgba(0, 224, 112, 0.8);
  color: #fff;
`;


const Avatar = styled.div`
  display: flex;

  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  flex: 0 0 auto;
  border: 2px solid #343a40;
  background: rgb(70, 70, 70) center center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  margin: 0 2.5px;

`;