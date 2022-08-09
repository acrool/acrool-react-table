import React, {useCallback, useState, useTransition} from 'react';
import {Table, IPaginateMeta, IPaginateInfo} from 'bear-react-table';
import styled from 'styled-components/macro';
import {asset} from '../../config/utils';
import dayjs from 'dayjs';




const BaseUsed = () => {

    const [isFetching, startFetching] = useTransition();
    const [paginateMeta, setPaginateMeta] = useState<IPaginateMeta>();
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo>();

    const paginateData = [
        {id: 1, name: 'Jack Wu', email: 'jackUu@test.com', role: 'Admin', isJoined: true, createdAt: '2022-12-14 00:12:00',  avatar: asset('/images/avatar/female-1.jpg')},
        {id: 2, name: 'Imagine Chiu', email: 'imagineChiu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-15 11:02:00', avatar: asset('/images/avatar/female-2.jpg')},
        {id: 3, name: 'Jason Dinwiddie', email: 'jsonDinwiddie@test.com', role: 'Manage', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-3.jpg')},
        {id: 4, name: 'Gloria Lu', email: 'groriaLu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-11 10:12:00', avatar: asset('/images/avatar/female-4.jpg')},
    ];


    /**
     * 查詢分頁
     */
    const handleFetchPaginate = useCallback((meta: IPaginateMeta) => {
        // 取得查詢項目
        // const searchField = searchForm.getValues();
        // dispatch(onFetchPaginateAction({
        //     paginateMeta: meta,
        //     searchField: {...searchField, ...onFetchPaginateActionParams},
        // }));
    }, []);


    return (
        <div>
            <div className="d-flex flex-row my-2">

                <Table
                    isFetching={isFetching}
                    // hookForm={tableForm}
                    // isEnableChecked={isEnableChecked}
                    // isVisibleActions={isVisibleActions}
                    title={[
                        {text: '#', field: 'avatar', width: 60, titleAlign: 'center', dataAlign: 'center'},
                        {text: 'Name',     field: 'name' , col: true},
                        {text: 'Role',  field: 'role'        , width: 250  },
                        {text: 'Crated',   field: 'createdAt',width: 110},
                        {text: 'Joined',      field: 'isApplyJoin', dataAlign: 'center',width: 80},
                        {text: 'Status',      field: 'isEnable', dataAlign: 'center',width: 80},
                        {text: 'Actions',      field: 'actions', dataAlign: 'center',width: 80},
                    ]}
                    data={paginateData.map(row => {
                        const createdAt = dayjs(row.createdAt);

                        return {
                            ...row,
                            id: row.id,
                            disabled: !row.isJoined,
                            avatar: <Avatar style={{backgroundImage: `url(${row.avatar})`}}/>,
                            name: <>
                                <div>{row.name}</div>
                                <div>{row.email}</div>
                            </>,
                            isApplyJoin: row.isJoined ? '已加入':'等待同意',
                            createdAt: <div style={{fontSize: 12}}>
                                {createdAt.format('YYYY-MM-DD')}<br/>
                                {createdAt.format('HH:mm:ss')}
                            </div>,
                        };
                    })}
                    // footerData={tableFooterData}
                    // onEditRow={(id) => onEditRow ? onEditRow(id) : navigate([baseRoutePath, id].join('/'))}
                    // onDeleteRow={isEnableDelete ? handleDeleteRow : undefined}
                    onChangePage={handleFetchPaginate}
                    meta={paginateMeta}
                    info={paginateInfo}
                />

            </div>




        </div>
    );

};

export default BaseUsed;



const InputTable = styled.div`
    position: absolute;
  z-index: 50;
  top: 25px;
  left: 0;
  right: 0;
`;

const InputGroup = styled.div`
    position: relative;
`;

const Button = styled.button`
  background-color: rgba(0, 224, 112, 0.8);
  color: #fff;
`;


const Avatar = styled.div`
  display: flex;

  width: 22px;
  height: 22px;
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