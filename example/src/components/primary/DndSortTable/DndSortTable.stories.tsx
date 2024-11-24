import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import DndSortTable from './DndSortTable';

const meta = {
    title: 'Primary/DndSortTable',
    component: DndSortTable,
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
} satisfies Meta<typeof DndSortTable>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {}
};
