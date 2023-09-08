import React, {Fragment} from 'react';
import cx from 'classnames';

// Components
import {IData, TDataFooterContent, ITitle, IFooter} from '../types';


interface IProps<T> {
    title: ITitle[],
    data?: IData<T>[],
    footer?: IFooter,
    dataFooterContent?: TDataFooterContent,
}


/**
 * Table Body
 */
const TableBody = <T extends string|number>({
    title,
    data,
    footer,
    dataFooterContent,
}: IProps<T>) => {


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        return data?.map(dataRow => {
            if(typeof dataRow?.id === 'undefined'){
                throw new Error('TableBody error, `dataRow.id` can\'t is undefined!');
            }

            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <tr
                    // className={elClassNames.bodyItemLi}
                    onClick={dataRow.onClickRow}
                    data-disabled={dataRow.disabled}
                    role={dataRow.onClickRow ? 'button':undefined}
                >
                    {/* 各欄位值 */}
                    {title?.map(titleRow => {
                        return (<td
                            key={`tbodyTr_${dataRow.id}_${titleRow.field}`}
                            className={titleRow.className}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            // style={getCol(titleRow.col)}
                            // colSpan={titleRow.colSpan}
                        >
                            {dataRow.field[titleRow.field] ?? ''}
                        </td>);
                    })}
                </tr>

                {/*{dataRow.appendData && (*/}
                {/*    <div className={elClassNames.bodyAppendLine}>*/}
                {/*        {dataRow.appendData}*/}
                {/*    </div>*/}
                {/*)}*/}

            </Fragment>);
        });


    };

    //
    // /**
    //  * 產生表格底部顯示
    //  * ex: 額外顯示資訊 例如統計
    //  */
    // const renderTableFooterData = () => {
    //     return <tr>
    //         <td style={getCol(true)}>{dataFooterContent}</td>
    //     </tr>;
    // };


    /**
     * 產生表格底部顯示
     * ex: 額外顯示資訊 例如統計
     */
    const renderFooterData = () => {
        if(footer){
            let ignore = 0;
            return title?.reduce((curr, titleRow) => {
                const field = footer[titleRow.field];
                const colSpan = field?.colSpan ?? 1;

                if(ignore > 0){
                    ignore -= 1;
                    return curr;
                }

                if(colSpan > 1){
                    ignore = colSpan - 1;
                }


                return [
                    ...curr,
                    <th
                        key={`tbodyTr_${footer}_${titleRow.field}`}
                        className={cx(titleRow.className)}
                        data-align={field?.dataAlign}
                        data-vertical={titleRow.dataVertical}
                        colSpan={colSpan}
                        style={{
                            gridColumn: colSpan ? `span ${colSpan}`: undefined,
                        }}
                    >
                        {field?.value ?? ''}
                    </th>
                ];
            }, []);


        }

    };



    return <>
        <tbody
            // className={elClassNames.itemUl}
        >
            {renderBodyData()}
            {/*{dataFooterContent && renderTableFooterData()}*/}
        </tbody>
        {footer && (
            <tfoot>
                <tr>
                    {renderFooterData()}
                </tr>
            </tfoot>
        )}
    </>;
};

export default TableBody;
