import React, {CSSProperties, useCallback, useMemo, useRef, useState} from 'react';

import {ETableMode, ITableProps, TBodyDataFieldKey, TBodyDataID, TOnChangePage, TOnChangeSortField} from './types';
import TableHeader from './Header';
import TableBody from './Body';
import TableFooter from './Footer';
import Paginate from './Paginate';
import {getTemplate} from './utils';

import styles from './styles.module.scss';
import {useWindowResizeEffect} from './hooks';
import clsx from 'clsx';
import {objectKeys} from '@acrool/js-utils/object';


/**
 * Table
 */
const Table = <I extends TBodyDataID, K extends TBodyDataFieldKey>({
    id,
    className,
    style,
    isDark,
    locale = 'en-US',
    isFetching = false,
    title,
    data,
    onChangeSortable,
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
    isEnableOverflowX = false,
    isEnableOverflowY = false,
    isVisibleHeader = true,
    isVisiblePaginate = true,
    isEnableChangePageScrollTop = true,
    isEnableDragSortable = false,
    isEnableHover = true,
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



    useWindowResizeEffect(() => handleOnResize(), [tableCellMediaSize]);




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
        const colSpan = objectKeys(title).length;
        return <tbody className="acrool-react-table__content" data-no-data="">
            <tr>
                <td colSpan={colSpan}>
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
                const colSpan = objectKeys(title).length;
                return <tbody className="acrool-react-table__content" data-loading="">
                    <tr>
                        <td colSpan={colSpan}>{renderFetching}</td>
                    </tr>
                </tbody>;
            }

            return renderCustomNoData();
        }

        return <TableBody
            tableMode={tableMode}
            title={title}
            data={data}
            isEnableDragSortable={isEnableDragSortable}
            onChangeSortable={onChangeSortable}
        />;
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

        return (
            <table>
                {/* Header */}
                {tableMode === ETableMode.table && renderHeader()}

                {/* Body */}
                {renderBody()}

                {/* Footer */}
                {tableMode === ETableMode.table && renderFooter()}
            </table>
        );
    };


    const extendStyles = {
        '--header-line-height': headerLineHeight,
        '--body-line-height': bodyLineHeight,
        '--cell-line-height': cellLineHeight,
        '--footer-line-height': footerLineHeight,
        ...getTemplate(formatTitle, gap),
        ...style,
    } as CSSProperties;


    return (
        <div className={clsx(
            styles.root,
            {'dark-theme': isDark},
            className,
        )}
        id={id}
        style={extendStyles}
        data-mode={tableMode}
        data-hover={isEnableHover ? '': undefined}
        data-header={isVisibleHeader ? '': undefined}
        data-footer={!!footer ? '': undefined}
        data-overflow-x={isEnableOverflowX ? '': undefined}
        data-overflow-y={isEnableOverflowY ? '': undefined}
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


