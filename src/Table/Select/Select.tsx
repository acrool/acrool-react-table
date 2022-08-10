import React, {useCallback} from 'react';
import {IOption} from './types';
import elClassNames from '../el-class-names';
import CSS from 'csstype';
import cx from 'classnames';

import './styles.css';


interface IProps {
    className?: string;
    style?: CSS.Properties,
    title?: string;
    name?: string;
    value?: string|number;
    options?: IOption[];
    disabled?: boolean;
    onChange?: (value: string) => void;
}



/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param title 標題
 * @param name 控制項名稱
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param onChange
 */
const Select = ({
    style,
    className,
    name,
    options = [],
    disabled = false,
    value,
    onChange,
}:IProps) => {


    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }

    }, [onChange]);

    const renderOptions = () =>  {
        return options.map(row => (
            <option key={`option_${name}_${row.value}`}
                    value={String(row.value)}>
                {row.text}
            </option>
        ));
    }

    return (
        <select
            className={cx(elClassNames.select, className)}
            style={style}
            name={name}
            value={String(value)}
            onChange={handleOnChange}
            disabled={disabled}
            multiple={false}
        >
            {renderOptions()}
        </select>
    );
};


export default Select;



