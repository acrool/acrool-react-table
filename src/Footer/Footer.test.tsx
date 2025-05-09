import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';
import React from 'react';

import {ETableMode, TFooter,TTableTitle} from '../types';
import Footer from './Footer';

const title: TTableTitle<'name' | 'age'> = {
    name: {
        text: '姓名',
        isEnableSort: false,
        col: 1,
        sticky: undefined,
        className: '',
        titleAlign: 'left',
        dataVertical: undefined,
        isHidden: false,
    },
    age: {
        text: '年齡',
        isEnableSort: false,
        col: 1,
        sticky: undefined,
        className: '',
        titleAlign: 'left',
        dataVertical: undefined,
        isHidden: false,
    },
};

const data: TFooter<'name' | 'age'>[] = [
    {name: '合計', age: 100},
    {name: '平均', age: 50},
];

describe('Footer', () => {
    it('正常渲染 Footer 內容', () => {
        render(
            <table>
                <Footer title={title} data={data} tableMode={ETableMode.table} />
            </table>
        );
        expect(screen.getByText('合計')).toBeInTheDocument();
        expect(screen.getByText('平均')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('隱藏 isHidden 欄位', () => {
        const hiddenTitle = {
            ...title,
            age: {...title.age, isHidden: true},
        };
        render(
            <table>
                <Footer title={hiddenTitle} data={data} tableMode={ETableMode.table} />
            </table>
        );
        expect(screen.getByText('合計')).toBeInTheDocument();
        expect(screen.queryByText('100')).toBeNull();
    });
});
