import React, {Fragment, MouseEvent, ReactNode, useMemo, useState} from 'react';
import {removeByIndex} from '@acrool/js-utils/array';
import {objectKeys} from '@acrool/js-utils/object';

import {
    ETableMode,
    ITableBody,
    TBodyDataField,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent, TOnChangeSortable,
    TTableTitle
} from '../types';
import {getCalcStickyLeftStyles, getColSpanStyles} from '../utils';
import {getBodyColSpanConfig, getBodyConfig, getBodyStickyLeftConfig, getBodyStickyRightConfig} from './utils';
import BodyDetail from './BodyDetail';
import styles from '../styles.module.scss';
import BodyTr from './BodyTr';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';



interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
    tableMode: ETableMode
    isEnableDragSortable?: boolean
    onChangeSortable?: TOnChangeSortable
}


/**
 * Table Body
 */
const Body = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    title,
    data,
    tableMode,
    isEnableDragSortable,
    onChangeSortable,
}: IProps<K, I>) => {
    const items = useMemo<I[]>(() => {
        return data?.map(row => row.id) ?? [];
    }, [data]);

    const [collapseIds, setCollapse] = useState<I[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


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
     * 處理拖動
     * @param event
     */
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (onChangeSortable && over && active.id !== over?.id) {
            onChangeSortable(active.id as I, over.id as I);
        }
    };

    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        const colSpanConfig = getBodyColSpanConfig(title, data);
        const stickyLeftConfig = getBodyStickyLeftConfig(title, data);
        const stickyRightConfig = getBodyStickyRightConfig(title, data);


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
                ?.reduce((curr: any[], titleKey, idx) => {
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
                    const stickyRight = stickyRightConfig?.[index]?.[titleKey];



                    const nthType = cellTdIndex % 2 === 0 ? 'odd': 'even';


                    const children = getBodyData(field, collapseIds.includes(dataRow.id), collapseEvent);


                    const colSpanStyles = getColSpanStyles(colSpan);
                    const stickyLeftStyles = getCalcStickyLeftStyles(fieldConfig.sticky === 'left' ? stickyLeft.widths: stickyRight.widths, fieldConfig.sticky);


                    const args = {
                        key: `tbodyTd_${dataRow.id}_${titleKey}`,
                        className: fieldConfig.className,
                        'data-even': nthType === 'even' ? '': undefined,
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
                        'data-sticky': titleRow.sticky,
                        'data-first-sticky': (stickyLeft.isFirst || stickyRight.isFirst)? '':undefined,
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
                        args,
                    ];
                }, []);


            const isCollapse = collapseIds?.includes(dataRow.id);

            return (<React.Fragment
                key={dataRow.id}
            >
                <BodyTr
                    isEnableDragSortable={isEnableDragSortable}
                    isCollapse={isCollapse}
                    dataRow={dataRow}
                    isEven={index % 2 !== 0}
                    collapseEvent={collapseEvent}
                    tds={tds}
                />
                {(isCollapse && dataRow.detail) &&
                    <BodyDetail title={title} data={dataRow.detail} tableMode={tableMode}/>
                }

            </React.Fragment>);
        });
    };

    if(!isEnableDragSortable){
        return <tbody className="acrool-react-table__content">
            {renderBodyData()}
        </tbody>;
    }

    return <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        accessibility={{container: document.body}}
    >
        <tbody className="acrool-react-table__content">
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
                disabled={!isEnableDragSortable}
            >
                {renderBodyData()}
            </SortableContext>
        </tbody>
    </DndContext>;
};

export default Body;
