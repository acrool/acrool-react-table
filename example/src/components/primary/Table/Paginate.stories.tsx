import type {Meta, StoryObj} from '@storybook/react';

import {Paginate} from '@acrool/react-table';



const meta = {
    title: 'Primary/Paginate',
    component: Paginate,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Paginate component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        isDark: false,
        locale: 'en-US',
        isVisiblePageInfo: true,
        isVisiblePageLimit: true,
        isVisiblePagePicker: true,
        info: {
            totalItems: 100,
            totalPages: 4
        },
        meta: {
            currentPage: 1,
            pageLimit: 8,
        },
    },
} satisfies Meta<typeof Paginate>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {}
};
