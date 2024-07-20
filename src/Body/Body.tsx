import React, {Fragment, MouseEvent, ReactNode, useState} from 'react';
import {removeByIndex} from 'bear-jsutils/array';
import {objectKeys} from 'bear-jsutils/object';

import {
    ETableMode,
    ITableBody,
    TBodyDataField,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent,
    TTableTitle
} from '../types';
import {getCalcStickyLeftStyles, getColSpanStyles} from '../utils';
import {getBodyColSpanConfig, getBodyConfig, getBodyStickyLeftConfig} from './utils';
import BodyDetail from './BodyDetail';
import styles from '../styles.module.scss';


interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
    tableMode: ETableMode
}


/**
 * Table Body
 */
const Body = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    title,
    data,
    tableMode,
}: IProps<K, I>) => {

    const [collapseIds, setCollapse] = useState<I[]>([]);


    /**
     * 處理開關明細
     * @param id
     */
    const handleSetCollapse = (id: I): TCollapseEvent => {
        return (event?: MouseEvent) => {
            event?.stopPropagation();

            setCollapse(ids => {
                const index = ids.findIndex(rowId => rowId === id);
                if(index >= 0){
                    return removeByIndex(ids, index);
                }
                return [...ids, id];
            });
        };
    };


    /**
     * 取得資料內容
     * @param field
     * @param isActive
     * @param collapse
     */
    const getBodyData = (field: TBodyDataField<K>[K], isActive: boolean, collapse: TCollapseEvent) => {
        if(typeof field === 'function'){
            return field({isActive, collapse});
        }

        if(typeof field === 'boolean'){
            return String(field);
        }

        if(typeof field === 'object' && field !== null && 'value' in field){
            return field.value;
        }

        return field as ReactNode;
    };




    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        const colSpanConfig = getBodyColSpanConfig(title, data);
        const stickyLeftConfig = getBodyStickyLeftConfig(title, data);


        return data?.map((dataRow, index) => {
            if(typeof dataRow?.id === 'undefined'){
                throw new Error('TableBody error, `dataRow.id` can\'t is undefined!');
            }

            const collapseEvent = handleSetCollapse(dataRow.id);

            // 避免忽略行，CSS無法跳過，所以自行計算
            let cellTdIndex = 0;




            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const bodyField = dataRow.field[titleKey];
                    const config = getBodyConfig(bodyField);
                    const titleRow = title[titleKey];


                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };

                    const field = dataRow.field[titleKey];


                    const colSpan = colSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }
                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];



                    const nthType = cellTdIndex % 2 === 0 ? 'odd': 'even';


                    const children = getBodyData(field, collapseIds.includes(dataRow.id), collapseEvent);


                    const colSpanStyles = getColSpanStyles(colSpan);
                    const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, titleRow.isSticky);
                    const args = {
                        key: `tbodyTd_${dataRow.id}_${titleKey}`,
                        className: fieldConfig.className,
                        'data-even': nthType === 'even' ? '': undefined,
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
                        'data-sticky': titleRow.isSticky ? '': undefined,
                        colSpan: colSpan > 1 ? colSpan: undefined,
                        style: {
                            ...colSpanStyles,
                            ...stickyLeftStyles,
                        },
                        children: tableMode === ETableMode.cell ? <>
                            <div className={styles.cellTd}>{titleRow.text}</div>
                            <div className={styles.cellTd}>{children}</div>
                        </>:
                            children,
                    };
                    return [
                        ...curr,
                        <td {...args}/>,
                    ];
                }, []);


            const isCollapse = collapseIds?.includes(dataRow.id);

            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <tr
                    data-collapse={isCollapse ? '': undefined}
                    onClick={(event) => {
                        if(dataRow.onClickRow) {
                            dataRow.onClickRow(() => collapseEvent(event));
                        }
                    }}
                    data-disabled={dataRow.disabled}

                    data-even={index % 2 === 0 ? undefined: ''}
                    role={dataRow.onClickRow ? 'button': undefined}
                >
                    {tds}
                </tr>


                {(isCollapse && dataRow.detail) &&
                    <BodyDetail title={title} data={dataRow.detail} tableMode={tableMode}/>
                }

            </Fragment>);
        });
    };


    return <tbody className="acrool-react-table__content">
        {renderBodyData()}
    </tbody>;
};

export default Body;
