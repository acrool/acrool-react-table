import '@testing-library/jest-dom';

import {fireEvent,render, screen} from '@testing-library/react';
import React from 'react';

import Paginate from './Paginate';

// mock 依賴
jest.mock('../locales', () => () => ({i18n: (key: string, {args, def}: any = {}) => def || key}));
jest.mock('../Icon', () => ({AlignCenterIcon: () => <span data-testid="icon" />}));
jest.mock('./_components/Select', () => (props: any) => (
    <select
        data-testid={props['data-testid'] || 'select'}
        aria-label={props['aria-label']}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
    >
        {props.options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
    </select>
));

const baseProps = {
    meta: {currentPage: 1, pageLimit: 8},
    info: {totalItems: 20, totalPages: 3},
    onChangePage: jest.fn(),
};

describe('Paginate', () => {
    beforeEach(() => { baseProps.onChangePage.mockClear(); });

    it('正常渲染', () => {
        render(<Paginate {...baseProps} />);
        expect(screen.getAllByTestId('select').length).toBe(2);
    });

    it('顯示分頁資訊', () => {
        render(<Paginate {...baseProps} />);
        expect(screen.getByText('Prev')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('點擊下一頁觸發 onChangePage', () => {
        render(<Paginate {...baseProps} />);
        fireEvent.click(screen.getByText('Next'));
        expect(baseProps.onChangePage).toHaveBeenCalledWith({currentPage: 2, pageLimit: 8});
    });

    it('點擊上一頁 disabled', () => {
        render(<Paginate {...baseProps} meta={{...baseProps.meta, currentPage: 1}} />);
        expect(screen.getByText('Prev')).toBeDisabled();
    });

    it('切換 pageLimit 觸發 onChangePage', () => {
        render(<Paginate {...baseProps} />);
        fireEvent.change(screen.getAllByTestId('select')[0], {target: {value: '40'}});
        expect(baseProps.onChangePage).toHaveBeenCalledWith({currentPage: 1, pageLimit: 40});
    });

    it('切換頁碼觸發 onChangePage', () => {
        render(<Paginate {...baseProps} />);
        fireEvent.change(screen.getAllByTestId('select')[1], {target: {value: '2'}});
        expect(baseProps.onChangePage).toHaveBeenCalledWith({currentPage: 2, pageLimit: 8});
    });

    it('自訂上一頁/下一頁文字', () => {
        render(<Paginate {...baseProps} prevPageText="上一頁" nextPageText="下一頁" />);
        expect(screen.getByText('上一頁')).toBeInTheDocument();
        expect(screen.getByText('下一頁')).toBeInTheDocument();
    });
});
