import React, {Fragment} from 'react';
import cx from 'classnames';

// Components
import {IData, TDataFooterContent, ITitle} from '../types';
import elClassNames from '../el-class-names';
import {getCol} from '../utils';


interface IProps {
    title: ITitle[],
    data: IData[],
    dataFooterContent?: TDataFooterContent,
}


/**
 * Table Body
 */
const TableBody = ({
    title = [],
    data = [],
    dataFooterContent,
}: IProps) => {


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        return data.map(dataRow => {
            if(typeof dataRow?.id === 'undefined'){
                throw new Error('TableBody error, `dataRow.id` can\'t is undefined!');
            }

            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <li
                    className={elClassNames.bodyItemLi}
                    onClick={dataRow.onClickRow}
                    data-disabled={dataRow.disabled}
                    role={dataRow.onClickRow ? 'button':undefined}
                >
                    {/* 各欄位值 */}
                    {title.map(titleRow => {
                        return (<div
                            key={`tbodyTr_${dataRow.id}_${titleRow.field}`}
                            className={cx(elClassNames.itemColumn, titleRow.className)}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            style={getCol(titleRow.col)}
                        >
                            {dataRow.field[titleRow.field] ?? ''}
                        </div>);
                    })}
                </li>

                {dataRow.appendData && (
                    <div className={elClassNames.bodyAppendLine}>
                        {dataRow.appendData}
                    </div>
                )}

            </Fragment>);
        });


    };


    /**
     * 產生表格底部顯示
     * ex: 額外顯示資訊 例如統計
     */
    const renderTableFooterData = () => {
        return <li className={elClassNames.bodyItemLi}>
            <div className={elClassNames.itemColumn} style={getCol(true)}>{dataFooterContent}</div>
        </li>;
    };




    return <div className={elClassNames.bodyInnerContent}>
        <div className={elClassNames.bodySplitView}>
            <div className={elClassNames.bodySplitList}>
                <ul className={elClassNames.itemUl}>
                    {renderBodyData()}
                    {dataFooterContent && renderTableFooterData()}
                </ul>
            </div>
        </div>
    </div>;
};

export default TableBody;
