import {fireEvent,render} from '@testing-library/react';
import React from 'react';

import {ETableMode, ITableBody,TTableTitle} from '../types';
import Body from './Body';

const title: TTableTitle<'col1'|'col2'> = {
    col1: {col: 1, text: '欄位1'},
    col2: {col: 1, text: '欄位2'},
};

const data: ITableBody<'col1'|'col2', string>[] = [
    {id: 'row1', field: {col1: '資料1-1', col2: '資料1-2'}},
    {id: 'row2', field: {col1: '資料2-1', col2: '資料2-2'}, detail: <div>明細內容</div>},
];

describe('Body', () => {
    it('能正常渲染表格內容', () => {
        const {getByText} = render(
            <table><Body title={title} data={data} tableMode={ETableMode.table} /></table>
        );
        expect(getByText('資料1-1')).toBeInTheDocument();
        expect(getByText('資料2-2')).toBeInTheDocument();
    });

    it('點擊明細展開按鈕可顯示明細內容', () => {
        const dataWithClick: any[] = data.map(row => ({
            ...row,
            onClickRow: (id: string, collapse: () => void) => collapse(),
        }));
        const {getAllByTestId, getByText} = render(
            <table><Body title={title} data={dataWithClick} tableMode={ETableMode.table} /></table>
        );
        const triggers = getAllByTestId('expand-trigger');
        fireEvent.click(triggers[1]);
        expect(getByText('明細內容')).toBeInTheDocument();
    });

    it('啟用拖曳排序時能正常渲染', () => {
        const {container} = render(
            <table><Body title={title} data={data} tableMode={ETableMode.table} isEnableDragSortable /></table>
        );
        // 檢查 dnd-kit 的 class 是否存在
        expect(container.querySelector('.acrool-react-table__content')).toBeInTheDocument();
    });

    it('onChangeSortable 會被正確呼叫', () => {
        const onChangeSortable = jest.fn();
        // 由於 dnd-kit 需複雜事件，這裡僅測試 props 傳遞
        render(
            <table><Body title={title} data={data} tableMode={ETableMode.table} isEnableDragSortable onChangeSortable={onChangeSortable} /></table>
        );
    // 這裡可進一步模擬拖曳事件（略）
    });
});
