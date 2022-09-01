import React, {useCallback, useState} from 'react';
import {Table, TPaginateMeta} from 'bear-react-table';
import styled from 'styled-components/macro';
import dayjs from 'dayjs';
import {removeByIndex} from 'bear-jsutils/array';

// Components
import Checkbox from 'views/_components/Checkbox';
import {data, IPaginateData} from '../_components/data';



const getPageData = (currentPage: number, pageLimit: number) => {
    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};


const CheckedUsed = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [isCheckedAll, setIsCheckAll] = useState<boolean>(false);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
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
     * 全選控制
     */
    const handleCheckedAllId = useCallback((isChecked: boolean) => {
        setIsCheckAll(isChecked);
        setCheckedIds(currIds => {
            if(isChecked){
                return paginateData.map(row => row.id);
            }
            return [];
        });

    }, [paginateData]);


    /**
     * 選取單一項目
     */
    const handleCheckedId = (isChecked: boolean, id?: string|number) => {
        const myId = Number(id);
        setCheckedIds(currIds => {
            if(!isChecked && currIds.includes(myId)) {
                const removeId = currIds.findIndex(rowId => rowId === myId);
                return removeByIndex(currIds, removeId);
            }
            return [...currIds, myId];
        });
    };

    /**
     * 查詢分頁
     */
    const handleFetchPaginate = useCallback((meta: TPaginateMeta) => {
        // 取得查詢項目
        setIsFetching(true);
        setPaginateMeta(meta);
        setCheckedIds([]);

        setTimeout(() => {
            setPaginateData(getPageData(meta.currentPage, meta.pageLimit));
            setIsFetching(false);
        }, 400);
    }, []);



    const handleEdit = (id: number) => {
    };

    return (
        <div>
            <Button type="button" color="primary" onClick={() => setIsFetching(curr => !curr)}>isFetching</Button>
            <div className="d-flex flex-row my-2">


                <Table
                    isFetching={isFetching}
                    title={[
                        {text: <Checkbox checked={isCheckedAll} onChange={handleCheckedAllId}/>, field: 'checked', col: 40, titleAlign: 'center', dataAlign: 'center'},
                        {text: '#', field: 'avatar', col: 60, titleAlign: 'center', dataAlign: 'center'},
                        {text: 'Name',     field: 'name' , col: true},
                        {text: 'Role',  field: 'role'        , col: 120},
                        {text: 'Crated',   field: 'createdAt', col: 110},
                        {text: 'Joined',      field: 'isApplyJoin', col: 80},
                    ]}
                    data={paginateData.map(row => {
                        const createdAt = dayjs(row.createdAt);

                        return {
                            id: row.id,
                            disabled: !row.isJoined,
                            field: {
                                role: row.role,
                                checked: <Checkbox value={row.id} checked={checkedIds.includes(row.id)} onChange={handleCheckedId}/>,
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
                                actions: <div style={{fontSize: 12}}>
                                    <Button color="primary" onClick={() => handleEdit(row.id)}>Edit</Button>
                                </div>,
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

export default CheckedUsed;




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