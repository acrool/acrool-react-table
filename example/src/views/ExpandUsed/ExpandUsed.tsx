import React, {useCallback, useState} from 'react';
import {Table, TPaginateMeta, IOrder} from 'bear-react-table';
import styled from 'styled-components/macro';
import dayjs from 'dayjs';
import {data, IPaginateData} from '../_components/data';




const getPageData = (currentPage: number, pageLimit = 8) => {
    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};

const ExpandUsed = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [expandId, setExpandId] = useState<number|undefined>();

    const [paginateMeta, setPaginateMeta] = useState<TPaginateMeta>({
        currentPage: 1,
        pageLimit: 8,
    });
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta.currentPage, paginateMeta.pageLimit));
    const paginateInfo = {
        totalItems: data.length,
        totalPages: Math.ceil(data.length / paginateMeta.pageLimit),
    };





    /**
     * 查詢分頁
     */
    const handleFetchPaginate = useCallback((meta: TPaginateMeta) => {
        // 取得查詢項目
        setIsFetching(true);
        setPaginateMeta(meta);

        setTimeout(() => {
            setPaginateData(getPageData(meta.currentPage, meta.pageLimit));
            setIsFetching(false);
        }, 400);
    }, []);



    const handleSetExpandId = (id: number) => {
        if(id === expandId){
            setExpandId(undefined);
        }else{
            setExpandId(id);
        }
    };


    return (
        <div>
            <Button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</Button>
            <div className="d-flex flex-row my-2">

                <Table
                    isFetching={isFetching}
                    title={[
                        {text: 'expand',          field: 'expand',      col: 60, titleAlign: 'center', dataAlign: 'center'},
                        {text: '#',          field: 'avatar',      col: 60, titleAlign: 'center', dataAlign: 'center'},
                        {text: 'Name',       field: 'name',        col: true, isEnableSort: true},
                        {text: 'Role',       field: 'role',        col: 120},
                        {text: 'Crated',     field: 'createdAt',   col: 110, isEnableSort: true},
                        {text: 'Joined',     field: 'isApplyJoin', col: 80},
                    ]}
                    data={paginateData.map(row => {
                        const createdAt = dayjs(row.createdAt);

                        return {
                            id: row.id,
                            disabled: !row.isJoined,
                            appendData: expandId === row.id ? `this is appendData ${row.id}`: undefined,
                            field: {
                                role: row.role,
                                expand: <Button onClick={() => handleSetExpandId(row.id)}>{expandId === row.id ? 'close':'open'}</Button>,
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
                            }
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

export default ExpandUsed;



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