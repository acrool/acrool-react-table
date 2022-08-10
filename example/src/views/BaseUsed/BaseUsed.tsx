import React, {useCallback, useState} from 'react';
import {Table, IPaginateMeta, IPaginateInfo} from 'bear-react-table';
import styled from 'styled-components/macro';
import dayjs from 'dayjs';
import {data, dataTotal, IPaginateData} from '../_components/data';




const BaseUsed = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(data[0]);
    const [paginateMeta, setPaginateMeta] = useState<IPaginateMeta>({
        currentPage: 1,
        pageLimit: 8,
        sort: {field: 'name', orderBy: 'DESC'},
    });
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo>({
        totalItems: dataTotal,
        totalPages: dataTotal / paginateMeta.pageLimit
    });



    /**
     * 查詢分頁
     */
    const handleFetchPaginate = useCallback((meta: IPaginateMeta) => {
        // 取得查詢項目
        setIsFetching(true);
        setPaginateMeta(meta);

        setTimeout(() => {
            setPaginateData(data[meta.currentPage]);
            setIsFetching(false);
        }, 400);
    }, []);



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
                    ]}
                    data={paginateData.map(row => {
                        const createdAt = dayjs(row.createdAt);

                        return {
                            ...row,
                            id: row.id,
                            disabled: !row.isJoined,
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
                        };
                    })}
                    dataFooterContent={<div>join member is {paginateData.length}</div>}
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