import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import SortTable from './SortTable';

const meta = {
    title: 'Primary/SortTable',
    component: SortTable,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Table component with sort'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof SortTable>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {}
};
