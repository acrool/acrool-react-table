import {render, screen} from '@testing-library/react';
import React from 'react';

import {ETableMode, TTableTitle} from '../types';
import BodyDetail from './BodyDetail';

// 假資料
const title: TTableTitle<string> = {
    name: {text: '姓名', col: 'auto', isHidden: false},
    age: {text: '年齡', col: 'auto', isHidden: false},
};

const data = [
    {name: '小明', age: 18},
    {name: '小華', age: 20},
];

describe('BodyDetail', () => {
    it('應該正確渲染多行資料', () => {
        render(
            <table>
                <tbody>
                    <BodyDetail title={title} data={data} tableMode={ETableMode.cell} />
                </tbody>
            </table>
        );
        expect(screen.getByText('小明')).toBeInTheDocument();
        expect(screen.getByText('小華')).toBeInTheDocument();
        expect(screen.getByText('18')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('應該正確渲染單一 ReactNode 資料', () => {
        render(
            <table>
                <tbody>
                    <BodyDetail title={title} data={<span>單一資料</span>} tableMode={ETableMode.cell} />
                </tbody>
            </table>
        );
        expect(screen.getByText('單一資料')).toBeInTheDocument();
    });
});
