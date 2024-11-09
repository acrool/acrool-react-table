import styled from 'styled-components';
import {FCProps} from '@acrool/react-grid';
import React, {useState} from 'react';
import Table from '@acrool/react-table';
import {baseData, data as initData, getPageData} from '../../data';
import {Avatar} from '../../Common';
import {formatCurrency} from '@acrool/js-utils/number';

interface IProps extends FCProps {

}

const args = {
    gap: '8px',
    isDark: false,
    isFetching: false,
    locale: 'en-US',
    isStickyHeader: false,
    isVisibleHeader: true,
    isVisiblePaginate: false,
    isVisiblePageInfo: true,
    isVisiblePageLimit: true,
    isVisiblePagePicker: true,
    paginateInfo: {
        totalItems: baseData.data.length,
        totalPages: 1
    },
    paginateMeta: {
        currentPage: 1,
        pageLimit: 8,
        order: {
            orderField: 'id',
            orderBy: 'DESC',
        }
    },
};

console.log('initData', initData);

const SortTable = () => {

    const [data, setData] = useState<typeof initData>(initData);

    console.log('data', data, initData);

    return <Table
        {...args}
        isDark
        title={{
            id:   {text: 'No',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            avatar:   {text: 'Avatar',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
            name:     {text: 'Name',   col: 150,  titleAlign: 'center', dataAlign: 'left'},
            amount:   {text: 'Amount', col: 'auto',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px'},
            joined:  {text: 'Joined',  col: '80px'},
        }}
        data={data.map(row => {
            return {
                id: row.id,
                field: {
                    id: row.id,
                    avatar: <Avatar src={row.avatar}/>,
                    name: row.name,
                    amount: `$ ${formatCurrency(row.amount)}`,
                    role: row.role,
                    joined: row.isJoined
                },
            };
        })}
        // @ts-ignore
        onChangeData={setData}
    />;
};

export default SortTable;




