import type {Meta, StoryObj} from '@storybook/react';
import {useDarkMode} from 'storybook-dark-mode';
import MockDataFetch from './MockDataFetch';



const meta = {
    title: 'Examples/MockDataFetch',
    component: MockDataFetch,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Table component'
            },
        },
    },
    argTypes: {},
    render: function Render(args) {
        const isDark = useDarkMode();
        return <MockDataFetch
            isDark={isDark}

        />;
    },
} satisfies Meta<typeof MockDataFetch>;
export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {}
};
