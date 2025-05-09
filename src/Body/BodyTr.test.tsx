import {fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';

import BodyTr from './BodyTr';

const baseField = {col1: '資料1', col2: '資料2'};
const baseProps = {
    isCollapse: false,
    isEven: false,
    isEnableDragSortable: false,
    collapseEvent: jest.fn(),
    tds: [
        {key: 'col1', children: '資料1'},
        {key: 'col2', children: '資料2'},
    ],
    timeout: 0.1, // 減少等待時間
};

describe('BodyTr', () => {
    it('能正常渲染', () => {
        const dataRow = {id: 'row1', field: baseField};
        const {getByText} = render(
            <table><tbody><BodyTr {...baseProps} dataRow={dataRow} /></tbody></table>
        );
        expect(getByText('資料1')).toBeInTheDocument();
        expect(getByText('資料2')).toBeInTheDocument();
    });

    it('點擊行會觸發 onClickRow', () => {
        const onClickRow = jest.fn();
        const dataRow = {id: 'row2', field: baseField, onClickRow};
        const {getByRole} = render(
            <table><tbody><BodyTr {...baseProps} dataRow={dataRow} /></tbody></table>
        );
        fireEvent.click(getByRole('button'));
        expect(onClickRow).toHaveBeenCalledWith('row2', expect.any(Function));
    });

    it('hover 行為會觸發 onHoverRow/onLeaveRow', async () => {
        const onHoverRow = jest.fn();
        const onLeaveRow = jest.fn();
        const dataRow = {id: 'row3', field: baseField, onHoverRow, onLeaveRow};
        const {container} = render(
            <table><tbody><BodyTr {...baseProps} dataRow={dataRow} /></tbody></table>
        );
        const tr = container.querySelector('tr');
        fireEvent.mouseEnter(tr!);
        await waitFor(() => {
            expect(onHoverRow).toHaveBeenCalledWith('row3');
        });
        fireEvent.mouseLeave(tr!);
        expect(onLeaveRow).toHaveBeenCalled();
    });

    it('啟用拖曳時會渲染 DragHandle', () => {
        const dataRow = {id: 'row4', field: baseField};
        const {container} = render(
            <table><tbody><BodyTr {...baseProps} dataRow={dataRow} isEnableDragSortable /></tbody></table>
        );
        // 依據 DragHandle 結構尋找 dragHandle class
        expect(container.querySelector('.dragHandle')).toBeInTheDocument();
    });
});
