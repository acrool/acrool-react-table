import React, {CSSProperties, useCallback, useMemo, useRef, useState} from 'react';

import {ETableMode, ITableProps, TBodyDataFieldKey, TBodyDataID, TOnChangePage, TOnChangeSortField} from './types';
import TableHeader from './Header';
import TableBody from './Body';
import TableFooter from './Footer';
import Paginate from './Paginate';
import {getColSpanStyles, getTemplate} from './utils';

import styles from './styles.module.scss';
import {useWindowResizeEffect} from './hooks';
import clsx from 'clsx';
import {objectKeys} from '@acrool/js-utils/object';
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';

import {
    closestCenter,
    DndContext, DragEndEvent, DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {Props} from "@dnd-kit/core/dist/components/DndContext/DndContext";


/**
 * Table
 */
const Table = <I extends TBodyDataID, K extends TBodyDataFieldKey>({
    className,
    style,
    isDark,
    locale = 'en-US',
    isFetching = false,
    title,
    data,
    onChangeData,
    footer,
    headerLineHeight,
    bodyLineHeight,
    cellLineHeight,
    footerLineHeight,
    gap = '5px',
    paginateInfo = {
        totalItems: 0,
        totalPages: 1,
    },
    paginateMeta,
    isVisibleHeader = true,
    isVisiblePaginate = true,
    isEnableChangePageScrollTop = true,
    isEnableDragSortable = false,
    // isOverflow = true,
    isStickyHeader = false,
    tableCellMediaSize,
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150],

    orderByType,
    renderNoData,
    renderFetching = 'Loading...',

    nextPageText,
    prevPageText,
    renderPageButton,
    isVisiblePagePicker = true,
    isVisiblePageLimit = true,
    isVisiblePageInfo = true,
}: ITableProps<I, K>) => {
    const [tableMode, setTableMode] = useState<ETableMode>(ETableMode.table);
    const items = useMemo<I[]>(() => {
        return data?.map(row => row.id) ?? [];
    }, [data]);

    const formatTitle = isEnableDragSortable ?
        {
            drag:   {text: '', col: 35,      titleAlign: 'center', dataAlign: 'center'},
            ...title,
        }
        : title;


    const meta = {
        currentPage: paginateMeta?.currentPage ?? 1,
        pageLimit: paginateMeta?.pageLimit ?? pageLimitOptions[0] ?? 8,
        order: paginateMeta?.order
    };
    const tableRef = useRef<HTMLDivElement>(null);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    useWindowResizeEffect(() => handleOnResize(), [tableCellMediaSize]);


    /**
     * 處理拖動
     * @param event
     */
    const handleDragEnd: Props['onDragEnd'] = (event) => {
        const {active, over} = event;
        if (onChangeData && over && active.id !== over?.id) {
            onChangeData((data) => {
                const oldIndex = items.indexOf(active.id as I);
                const newIndex = items.indexOf(over.id as I);
                return arrayMove(data, oldIndex, newIndex);
            });
        }
    };


    /**
     * 更新尺寸時是否改為 cell 模式
     */
    const handleOnResize = () => {
        if(tableCellMediaSize){
            setTableMode(curr => {
                if(window.innerWidth <= tableCellMediaSize && tableMode === ETableMode.table){
                    return ETableMode.cell;
                }
                return ETableMode.table;
            });
        }
    };


    /**
     * 切換頁面
     * @param pageMeta
     */
    const handleOnChangePage: TOnChangePage = useCallback((pageMeta) => {
        if(isEnableChangePageScrollTop && tableRef.current){
            globalThis.window.scrollTo(0, tableRef.current?.offsetTop);
        }

        if(onChangePage){
            const paramsMeta = {
                currentPage: pageMeta.currentPage,
                pageLimit: pageMeta.pageLimit,
                order: meta.order,
            };

            onChangePage(paramsMeta, true);
        }
    }, [isEnableChangePageScrollTop, onChangePage, meta.order]);


    const handleOnOrderField: TOnChangeSortField = (params) => {

        if(onChangePage){
            const paramsMeta = {
                currentPage: 1,
                pageLimit: meta.pageLimit,
                order: {
                    orderBy: params.orderBy,
                    orderField: params.orderField,
                },
            };

            onChangePage(paramsMeta, true);
        }
    };


    /**
     * 產生沒資料時的顯示
     */
    const renderCustomNoData = () => {
        const colSpanStyles = getColSpanStyles(objectKeys(title).length);
        return <tbody className="acrool-react-table__content" data-no-data="">
            <tr>
                <td style={colSpanStyles}>
                    {!!renderNoData ?
                        renderNoData : <div className={styles.notData}>
                            <div className={styles.notDataTitle}>Not Found</div>
                            <div className={styles.notDataDesc}>Choose a different filter to view results</div>
                        </div>
                    }
                </td>
            </tr>
        </tbody>;
    };

    /**
     * 產生表格內容
     */
    const renderHeader = () => {
        if(!isVisibleHeader){
            return null;
        }

        return <TableHeader
            title={formatTitle}
            onChangeSortField={handleOnOrderField}
            isStickyHeader={isStickyHeader}
            order={meta.order}
            orderByType={orderByType}
        />;
    };


    /**
     * 產生表格內容
     */
    const renderBody = () => {


        if(!data || data?.length === 0){
            if(isFetching){
                const colSpanStyle = getColSpanStyles(objectKeys(title).length);
                return <tbody className="acrool-react-table__content" data-loading="">
                    <tr>
                        <td style={colSpanStyle}>{renderFetching}</td>
                    </tr>
                </tbody>;
            }

            return renderCustomNoData();
        }

        return <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <TableBody
                tableMode={tableMode}
                title={title}
                data={data}
                isEnableDragSortable={isEnableDragSortable}
            />
        </SortableContext>;
    };


    /**
     * 產生表格內容
     */
    const renderFooter = () => {

        if(!footer){
            return null;
        }

        return <TableFooter
            title={title}
            data={footer}
            tableMode={tableMode}
        />;
    };


    /**
     * 產生分頁資訊
     */
    const renderPaginate = () => {
        if(!isVisiblePaginate){
            return null;
        }


        return <Paginate
            isDark={isDark}
            locale={locale}
            meta={meta}
            info={paginateInfo}
            onChangePage={handleOnChangePage}
            pageLimitOptions={pageLimitOptions}

            isVisiblePageInfo={isVisiblePageInfo}
            isVisiblePageLimit={isVisiblePageLimit}
            isVisiblePagePicker={isVisiblePagePicker}
            nextPageText={nextPageText}
            prevPageText={prevPageText}
            renderPageButton={renderPageButton}
        />;
    };


    const renderMain = () => {

        const tableNode = (
            <table
                style={style}
            >
                {/* Header */}
                {tableMode === ETableMode.table && renderHeader()}

                {/* Body */}
                {renderBody()}

                {/* Footer */}
                {tableMode === ETableMode.table && renderFooter()}
            </table>
        );

        if(isEnableDragSortable){
            return <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                {tableNode}
            </DndContext>;
        }

        return tableNode;
    };


    const extendStyles = {
        '--header-line-height': headerLineHeight,
        '--body-line-height': bodyLineHeight,
        '--cell-line-height': cellLineHeight,
        '--footer-line-height': footerLineHeight,
        ...getTemplate(formatTitle, gap),
    } as CSSProperties;


    return (
        <div className={clsx(
            styles.root,
            {'dark-theme': isDark},
            className,
        )}
        style={extendStyles}
        data-mode={tableMode}
        data-header={isVisibleHeader ? '': undefined}
        data-footer={!!footer ? '': undefined}
        // data-overflow={!!isOverflow ? '': undefined}
        data-fetching={isFetching ? '': undefined}
        ref={tableRef}
        >
            {renderMain()}

            <div className={styles.loadingMaskWrapper}>
                {renderFetching}
            </div>

            {renderPaginate()}
        </div>
    );
};

export default Table;


