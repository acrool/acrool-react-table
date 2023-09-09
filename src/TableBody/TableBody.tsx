import React, {Fragment, CSSProperties, useState} from 'react';
import cx from 'classnames';
import {removeByIndex} from 'bear-jsutils/array';

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
}: IProps<T>) => {

    const [collapseIds, setCollapse] = useState<T[]>([]);


    const handleSetCollapse = (id: T) => {
        setCollapse(ids => {
            const index = ids.findIndex(rowId => rowId === id);
            if(index >= 0){
                return removeByIndex(ids, index);
            }
            return [...ids, id];
        });
    };


    /**
     * 額外展開內容
     */
    const renderDetailData = (dataRow: IData<T>) => {
        if(!!dataRow.detail === false){
            return null;
        }

        if(!collapseIds?.includes(dataRow.id)){
            return null;
        }

        if('data' in dataRow.detail){
            const config = dataRow.detail.config;

            return dataRow.detail.data.map(detailFields => {
                let ignore = 0;

                const tds = title?.reduce((curr, titleRow) => {
                    const fieldConfig = {
                        ...titleRow,
                        ...config[titleRow.field],
                    };
                    console.log('fieldConfig', title);
                    const fieldValue = detailFields[titleRow.field];
                    const colSpan = fieldConfig?.colSpan ?? 1;

                    if(ignore > 0){
                        ignore -= 1;
                        return curr;
                    }

                    if(colSpan > 1){
                        ignore = colSpan - 1;
                    }


                    return [
                        ...curr,
                        <td
                            key={`tbodyTr_${footer}_${titleRow.field}`}
                            className={cx(titleRow.className)}
                            data-align={fieldConfig?.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            colSpan={colSpan}
                            style={{
                                '--grid-column-span': colSpan,
                            } as CSSProperties}
                        >
                            {fieldValue}
                        </td>
                    ];
                }, []);

                return <tr data-collapse="">
                    {tds}
                </tr>;


                // return <tr key={`tbodyTr_${dataRow.id}_detail_`}>
                //
                //     {/* 各欄位值 */}
                //     {title?.map(titleRow => {
                //         console.log('field', detailFields);
                //         const field = detailFields[titleRow.field];
                //         return (<td
                //             key={`tbodyTr_${dataRow.id}_detail_${titleRow.field}`}
                //             className={titleRow.className}
                //             data-align={titleRow.dataAlign}
                //             data-vertical={titleRow.dataVertical}
                //             colSpan={field?.colSpan}
                //             style={{
                //                 gridColumn: colSpan ? `span ${colSpan}`: undefined,
                //             }}
                //         >
                //             {
                //                 typeof field === 'function' ?
                //                     field({isActive: collapseIds.includes(dataRow.id), collapse: () => handleSetCollapse(dataRow.id)}):
                //                     field
                //             }
                //         </td>);
                //     })}
                // </tr>;
            });

        }

        return <tr data-collapse="">
            <td colSpan={title.length} style={{
                '--grid-column-span': title.length,
            } as CSSProperties}>
                {dataRow.detail}
            </td>
        </tr>;
    };


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        return data?.map((dataRow, index) => {
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
                    data-odd={index % 2 === 0 ? '': undefined}
                    role={dataRow.onClickRow ? 'button':undefined}
                >
                    {/* 各欄位值 */}
                    {title?.map(titleRow => {
                        const field = dataRow.field[titleRow.field];
                        return (<td
                            key={`tbodyTr_${dataRow.id}_${titleRow.field}`}
                            className={titleRow.className}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            // style={getCol(titleRow.col)}
                            // colSpan={titleRow.colSpan}
                        >
                            {
                                typeof field === 'function' ?
                                    field({isActive: collapseIds.includes(dataRow.id), collapse: () => handleSetCollapse(dataRow.id)}):
                                    field
                            }
                        </td>);
                    })}
                </tr>


                {renderDetailData(dataRow)}

            </Fragment>);
        });
    };


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
