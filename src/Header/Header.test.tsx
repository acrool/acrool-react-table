import '@testing-library/jest-dom';

import {fireEvent,render, screen} from '@testing-library/react';
import React from 'react';

import {TTableTitle} from '../types';
import Header from './Header';

const title: TTableTitle<any> = {
    name: {
        text: '姓名',
        isEnableSort: true,
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

describe('Header', () => {
    it('正常渲染標題', () => {
        render(<table><Header title={title} /></table>);
        expect(screen.getByText('姓名')).toBeInTheDocument();
        expect(screen.getByText('年齡')).toBeInTheDocument();
    });

    it('隱藏 isHidden 欄位', () => {
        const hiddenTitle = {
            ...title,
            age: {...title.age, isHidden: true},
        };
        render(<table><Header title={hiddenTitle} /></table>);
        expect(screen.getByText('姓名')).toBeInTheDocument();
        expect(screen.queryByText('年齡')).toBeNull();
    });

    it('點擊排序欄位會觸發 onChangeSortField', () => {
        const onChangeSortField = jest.fn();
        render(<table><Header title={title} onChangeSortField={onChangeSortField} order={{orderField: '', orderBy: 'asc'}} /></table>);
        fireEvent.click(screen.getByText('姓名'));
        expect(onChangeSortField).toHaveBeenCalledWith({orderField: 'name', orderBy: 'DESC'});
    });

    it('isStickyHeader 屬性渲染', () => {
        render(<table><Header title={title} isStickyHeader /></table>);
        expect(screen.getByRole('row')).toBeInTheDocument();
    });
});
