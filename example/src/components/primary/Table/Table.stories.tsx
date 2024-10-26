import type {Meta, StoryObj} from '@storybook/react';
import {useDarkMode} from 'storybook-dark-mode';

import Table from '@acrool/react-table';
import React from 'react';
import {calcAmount} from '../../utils';
import {CollapseButton, Name} from '../../Common';

import {getPageData, baseData} from '../../data';
import {fn} from '@storybook/test';


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
        ...baseData,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        return <Table
            {...args}
            isDark={isDark}

        />;
    },
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
