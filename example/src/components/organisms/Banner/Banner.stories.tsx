import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import Banner from './Banner';

const meta = {
    title: 'Banner',
    component: Banner,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {
        name: 'Acrool React Table',
        repositoryUrl: 'https://github.com/acrool/acrool-react-table',
    },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {},
};
