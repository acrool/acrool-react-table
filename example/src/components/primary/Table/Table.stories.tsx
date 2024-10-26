import type {Meta, StoryObj} from '@storybook/react';

import Table, {genericsTitleData, IPaginateMeta, TOnChangePage} from '@acrool/react-table';
import React, {useCallback, useState} from 'react';
import {calcAmount, getPageData} from './utils';
import {Avatar, CollapseButton} from './Common';
import {formatCurrency} from '@acrool/js-utils/number';
// import {fn} from '@storybook/test';
// import {useArgs} from '@storybook/preview-api';
// import {generatorArray} from '@acrool/js-utils/array';
import dayjs from 'dayjs';
import {tableData} from './data';
// import {formatCurrency} from '@acrool/js-utils/number';
// import styled from 'styled-components';
// import {data, mockSort} from './data';
// import {Avatar, CollapseButton} from "./Common";



//
//
// export interface IPaginateData {
//     id: number,
//     name: string,
//     email: string,
//     role: string,
//     isJoined: boolean,
//     createdAt: string,
//     avatar: string,
//     amount: number,
//     subAmount: number,
// }

const paginateData = getPageData(1, 10, {orderField: 'name', orderBy: 'DESC'});

const meta = {
    title: 'Primary/Table',
    component: Table,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Table component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        gap: '8px',
        isDark: false,
        isFetching: false,
        locale: 'en-US',
        isStickyHeader: false,
        isVisibleHeader: true,

        paginateMeta: {
            currentPage: 1,
            pageLimit: 8,
            order: {
                orderField: 'id',
                orderBy: 'DESC',
            }
        },
        ...tableData,
    },
    // render: function Render(args) {
    //     // const [{currentPage, pageLimit, order}, updatePaginateMeta] = useArgs<IPaginateMeta>();
    //     // const [{isFetching}, updateIsFetching] = useArgs<{ isFetching: boolean }>();
    //
    //     // const onChange = (value: string) => updateArgs({value});
    //
    //
    //
    //     const paginateMeta = args.paginateMeta;
    //     const paginateInfo = {
    //         totalItems: data.length,
    //         totalPages: Math.ceil(data.length / (paginateMeta?.pageLimit ?? 1)),
    //     };
    //
    //
    //     const calcAmount = useCallback((rows: IPaginateData[]) => {
    //         return formatCurrency(rows.reduce((curr, row) => curr + row.amount,0));
    //     }, []);
    //
    //
    //     /**
    //      * 查詢分頁
    //      */
    //     // const handleFetchPaginate: TOnChangePage = (meta) => {
    //     //     // 取得查詢項目
    //     //     // updateIsFetching({isFetching: true});
    //     //     // updatePaginateMeta(meta);
    //     //
    //     //     const {currentPage, pageLimit, order} = meta;
    //     //
    //     //     // setTimeout(() => {
    //     //     //     setPaginateData(getPageData(currentPage, pageLimit, order));
    //     //     //     updateIsFetching({isFetching: false});
    //     //     // }, 400);
    //     // };
    //
    //
    //     // const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta?.currentPage ?? 1, paginateMeta?.pageLimit ?? 1, paginateMeta?.order));
    //
    //     const paginateData = getPageData(paginateMeta?.currentPage ?? 1, paginateMeta?.pageLimit ?? 1, paginateMeta?.order);
    //
    //     return <Table
    //         {...args}
    //         gap="8px"
    //         title={{
    //             plus:     {text: '=== Name (Merge) ===',       col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true, colSpan: 3},
    //             avatar:   {text: '',      col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true},
    //             name:     {text: '',   col: 150,  isEnableSort: true, titleAlign: 'center', isSticky: true, dataAlign: 'left'},
    //             amount:   {text: 'Amount', col: 'auto',  titleAlign: 'right',  dataAlign: 'right'},
    //             role:     {text: 'Role',   col: '120px'},
    //             createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
    //             joined:  {text: 'Joined',  col: '80px'},
    //         }}
    //         footer={[
    //             {
    //                 // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
    //                 plus: {
    //                     colSpan: 3,
    //                     value: <div style={{color: '#fff', fontWeight: 700}}>Fax</div>
    //                 },
    //                 amount: {
    //                     dataAlign: 'right',
    //                     value: 10,
    //                 },
    //             },
    //             {
    //                 // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
    //                 plus: {
    //                     colSpan: 3,
    //                     value: <div style={{color: '#fff', fontWeight: 700}}>Total</div>
    //                 },
    //                 amount: {value: calcAmount(data), dataAlign: 'right'},
    //             }
    //         ]}
    //         data={paginateData.map((row, index) => {
    //             const isMergeColSpan = index === 0;
    //
    //             return {
    //                 id: row.id,
    //                 className: 'status-danger',
    //                 // detail: <>
    //                 //     <div>{row.name}, {row.amount}, {row.role}</div>
    //                 // </>,
    //                 detail:  [
    //                     {
    //                         avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
    //                         plus: {
    //                             colSpan: 3,
    //                             className: 'detail-css',
    //                             value: <div style={{color: '#fff', fontWeight: 700}}>Fax</div>
    //                         },
    //                         amount: {
    //                             dataAlign: 'right',
    //                             value: 10,
    //                         },
    //                     },
    //                     {
    //                         // avatar: {value: '12313', colSpan: 7, dataAlign: 'right'},
    //                         plus: {
    //                             colSpan: 3,
    //                             value: <div style={{color: '#fff', fontWeight: 700}}>Total</div>
    //                         },
    //                         amount: {value: calcAmount(data), dataAlign: 'right'},
    //                     }
    //                 ],
    //                 onClickRow: () => console.log(`click row id: ${row.id}`),
    //                 field: {
    //                     plus: (args) => <CollapseButton
    //                         type="button" onClick={args.collapse}
    //                         data-active={args.isActive ? '':undefined}
    //                     >
    //                         {args.isActive ? '-': '+'}
    //                     </CollapseButton>,
    //                     avatar: <Avatar src={row.avatar}/>,
    //                     // name: {value: row.name, colSpan: 2, dataAlign: 'right'},
    //                     name: row.name,
    //                     role: {
    //                         value: row.role,
    //                         className: 'my-role-css'
    //                     },
    //                     createdAt: dayjs(row.createdAt).format('MM/DD'),
    //                     joined: row.isJoined ? 'Y':'N',
    //                     amount: {
    //                         colSpan: isMergeColSpan ? 4: 1,
    //                         dataAlign: isMergeColSpan ? 'center': 'right',
    //                         value: `$ ${formatCurrency(row.amount)} ${isMergeColSpan ? '(Merge colspan)' : ''}`,
    //                     },
    //                 },
    //             };
    //         })}
    //         isVisiblePageInfo={false}
    //         isVisiblePageLimit={false}
    //         isVisiblePagePicker={false}
    //         // onChangePage={handleFetchPaginate}
    //         paginateMeta={paginateMeta}
    //         paginateInfo={paginateInfo}
    //         renderPageButton={(args) => <button
    //             {...args}
    //         >
    //             <div className="decorate"/>
    //             {/*<span>{args.children}</span>*/}
    //         </button>}
    //     />;
    // },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};



export const WithMergeCol: Story = {
    args: {
        gap: '8px',
        isDark: false,
        isFetching: false,
        locale: 'en-US',
        isStickyHeader: false,
        isVisibleHeader: true,

        paginateMeta: {
            currentPage: 1,
            pageLimit: 8,
            order: {
                orderField: 'id',
                orderBy: 'DESC',
            }
        },
        title: {
            plus:     {text: '=== Name (Merge) ===',       col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true, colSpan: 3},
            avatar:   {text: '',      col: 50,      titleAlign: 'center', dataAlign: 'center', isSticky: true},
            name:     {text: '',   col: 150,  isEnableSort: true, titleAlign: 'center', isSticky: true, dataAlign: 'left'},
            amount:   {text: 'Amount', col: 'auto',  titleAlign: 'right',  dataAlign: 'right'},
            role:     {text: 'Role',   col: '120px'},
            createdAt:{text: 'Crated', col: '110px', isEnableSort: true},
            joined:  {text: 'Joined',  col: '80px'},
        },
        data: paginateData.map((row, index) => {
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
                        amount: {value: calcAmount(paginateData), dataAlign: 'right'},
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
                },
            };
        })
    },
};




