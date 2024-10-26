import type {Meta, StoryObj} from '@storybook/react';

import Table, {genericsTitleData, IPaginateMeta, TOnChangePage} from '@acrool/react-table';
import React, {useCallback, useState} from 'react';
import {calcAmount} from './utils';
import {Avatar, CollapseButton, Name} from './Common';
import {formatCurrency} from '@acrool/js-utils/number';
// import {fn} from '@storybook/test';
// import {useArgs} from '@storybook/preview-api';
// import {generatorArray} from '@acrool/js-utils/array';
import dayjs from 'dayjs';
import {getPageData, baseData, data} from './data';
import {fn} from "@storybook/test";
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
        isVisiblePaginate: false,
        // paginateMeta: {
        //     currentPage: 1,
        //     pageLimit: 8,
        //     order: {
        //         orderField: 'id',
        //         orderBy: 'DESC',
        //     }
        // },
        ...baseData,
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



export const Primary: Story = {
    args: {}
};

export const WithTitleJSX: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: <Name>Name</Name>, col: 'auto'},
        }
    }
};
export const WithFieldCSSClass: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', className: 'justify-content-end'},
        }
    }
};
export const WithFieldSort: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', isEnableSort: true},
        }
    }
};
export const WithStickyHeader: Story = {
    args: {
        style: {maxHeight: '500px', overflow: 'auto'},
        isStickyHeader: true,
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', isSticky: true},
        }
    }
};



export const WithMergeField: Story = {
    args: {
        title: {
            ...baseData.title,
            id: {text: 'This Full Name (Merge Field)',   col: 50,  titleAlign: 'center', dataAlign: 'center', colSpan: 3},
        },
        data: baseData.data.map(row => {
            return {
                ...row,
                field: {
                    ...row.field,
                    plus: (args) => <CollapseButton
                        type="button" onClick={args.collapse}
                        data-active={args.isActive ? '':undefined}
                    >
                        {args.isActive ? '-': '+'}
                    </CollapseButton>,
                }
            };
        })
    }
};

export const WithDetail: Story = {
    args: {
        title: {
            plus: {text: '#', col: 40,   titleAlign: 'center', dataAlign: 'center'},
            ...baseData.title,
        },
        data: baseData.data.map(row => {
            return {
                ...row,
                detail:  [
                    {
                        plus: {colSpan: 4, className: 'detail-css', value: <div style={{color: '#000', fontWeight: 700}}>Fax</div>},
                        amount: {dataAlign: 'right', value: 10},
                    },
                    {
                        plus: {colSpan: 4, value: <div style={{color: '#000', fontWeight: 700}}>Total</div>},
                        amount: {value: calcAmount(paginateData), dataAlign: 'right'},
                    }
                ],
                field: {
                    ...row.field,
                    plus: (args) => <CollapseButton
                        type="button" onClick={args.collapse}
                        data-active={args.isActive ? '':undefined}
                    >
                        {args.isActive ? '-': '+'}
                    </CollapseButton>,
                }
            };
        })
    }
};

export const WithClickRow: Story = {
    args: {
        ...baseData,
        data: baseData.data.map(row => {
            return {
                ...row,
                onClickRow: fn((id, collapse) => {
                    collapse();
                }),
                detail: <div>
                    This is {row.field.name} info
                </div>,
                field: {
                    ...row.field,
                    plus: (args) => <CollapseButton
                        type="button" onClick={args.collapse}
                        data-active={args.isActive ? '':undefined}
                    >
                        {args.isActive ? '-': '+'}
                    </CollapseButton>,
                }
            };
        })
    }
};

export const WithFooter: Story = {
    args: {
        ...baseData,
        footer: [
            {
                id: {colSpan: 3, value: <div style={{color: '#000', fontWeight: 700}}>Fax</div>},
                amount: {dataAlign: 'right', value: 10},
            },
            {
                id: {colSpan: 3, value: <div style={{color: '#000', fontWeight: 700}}>Total</div>},
                amount: {value: calcAmount(paginateData), dataAlign: 'right'},
            }
        ]

    }
};




export const WithPaginate: Story = {
    args: {
        isVisiblePaginate: true,
    }
};



export const WithCell: Story = {
    args: {
        tableCellMediaSize: 1024,
    }
};
