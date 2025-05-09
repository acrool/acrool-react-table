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

export const WithTitleAlign: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', titleAlign: 'right'},
        }
    }
};
export const WithDataAlign: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', dataAlign: 'center'},
        }
    }
};
export const WithFieldCSSClass: Story = {
    args: {
        title: {
            ...baseData.title,
            name: {text: 'Name', col: 'auto', className: 'text-right'},
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

export const WithBodyTrHover: Story = {
    args: {
        isEnableHover: true,
    }
};

export const WithStickyHeader: Story = {
    args: {
        style: {maxHeight: '500px'},
        isEnableOverflowY: true,
        isStickyHeader: true,
        title: {
            ...baseData.title,
        }
    }
};

export const WithStickyLeft: Story = {
    args: {
        style: {maxWidth: '400px'},
        isEnableOverflowX: true,
        title: {
            ...baseData.title,
            id: {...baseData.title.id, sticky: 'left'},
            avatar: {...baseData.title.avatar, sticky: 'left'},
            name: {...baseData.title.name, sticky: 'left'},
        }
    }
};

export const WithSingleStickyLeft: Story = {
    args: {
        style: {maxWidth: '400px'},
        isEnableOverflowX: true,
        title: {
            ...baseData.title,
            id: {...baseData.title.id, col: 50, sticky: 'left'},
        }
    }
};



export const WithStickyRight: Story = {
    args: {
        style: {maxWidth: '400px', border: '1px solid red'},
        isEnableOverflowX: true,
        title: {
            ...baseData.title,
            createdAt: {...baseData.title.createdAt, sticky: 'right'},
            joined: {...baseData.title.joined, sticky: 'right'},
        }
    }
};

export const WithSingleStickyRight: Story = {
    args: {
        style: {maxWidth: '400px', border: '1px solid red'},
        isEnableOverflowX: true,
        title: {
            ...baseData.title,
            joined: {...baseData.title.joined, sticky: 'right'},
        }
    }
};



export const WithTitleColspanField: Story = {
    args: {
        title: {
            ...baseData.title,
            id: {text: 'This Full Name (Colspan 3)',   col: 50,  titleAlign: 'center', dataAlign: 'center', colSpan: 3},
        },
    }
};


export const WithBodyColspanField: Story = {
    args: {
        data: baseData.data.map((row, idx) => {

            if(idx === 1){
                return {
                    ...row,
                    field: {
                        ...row.field,
                        name: {
                            colSpan: 3,
                            className: 'text-center',
                            value: 'Name(ColSpan 3)'
                        }
                    }
                };
            }

            return row;
        })
    }
};


export const WithRowSpanField: Story = {
    args: {
        title: {
            ...baseData.title,
        },
        data: baseData.data.map((row, idx) => {
            if(idx === 1){
                return {
                    ...row,
                    field: {
                        ...row.field,
                        name: {
                            rowSpan: 2,
                            value: 'Name(RowSpan 2)'
                        }
                    }
                };
            }

            return row;
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
                        type="button"
                        onClick={args.collapse}
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
                    This is <>{row.field.name}</> info
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

export const WithHoverRow: Story = {
    args: {
        ...baseData,
        data: baseData.data.map(row => {
            return {
                ...row,
                onHoverRow: fn((id) => {
                    // collapse();
                    console.log('id',id);
                }),
                onLeaveRow: fn((evt) => {
                    // collapse();
                    console.log('id',evt.target);
                }),
                detail: <div>
                    This is <>{row.field.name}</> info
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
        tableCellMediaSize: 9999,
    }
};

export const WithHiddenHeader: Story = {
    args: {
        isVisibleHeader: false,
    }
};
