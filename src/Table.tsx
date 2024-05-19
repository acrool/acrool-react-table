import React, {useEffect, useRef, CSSProperties, useCallback} from 'react';

import {TOnChangeSortField, TOnChangePage, ITableProps, TBodyDataFieldKey, TBodyDataID} from './types';
import TableHeader from './Header';
import TableBody from './Body';
import TableFooter from './Footer';
import Paginate from './Paginate';
import {getTemplate, getColSpan} from './utils';

import styles from './table.module.scss';
import {useWindowResizeEffect} from './hooks';
import clsx from 'clsx';
import {objectKeys} from 'bear-jsutils/object';






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
    isVisibleBorder = true,
    isVisibleVerticalBorder = false,
    isVisiblePaginate = true,
    isEnableHover = true,
    isEnableOddEven = true,
    isEnableChangePageScrollTop = true,
    isOverflow = true,
    isStickyHeader = false,
    tableCellMediaSize,
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150],

    orderByType,
    renderNoData,
    renderFetching = 'Loading...',

    isVisiblePageLimitOptions,
    isVisiblePageInfo,
}: ITableProps<I, K>) => {

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
        if(tableRef.current && tableCellMediaSize){
            if(window.innerWidth <= tableCellMediaSize){
                if(tableRef.current.dataset['mode'] === 'table'){
                    tableRef.current.dataset['mode'] = 'cell';
                }
            }else{
                if(tableRef.current.dataset['mode'] === 'cell') {
                    tableRef.current.dataset['mode'] = 'table';
                }
            }
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
        return <tbody data-no-data="">
            <tr>
                <td {...getColSpan(objectKeys(title).length)}>
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
            title={title}
            onChangeSortField={handleOnOrderField}
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
                return <tbody data-loading="">
                    <tr>
                        <td {...getColSpan(objectKeys(title).length)}>{renderFetching}</td>
                    </tr>
                </tbody>;
            }

            return renderCustomNoData();
        }

        return <TableBody
            title={title}
            data={data}
        />;
    };

    /**
     * 產生表格內容
     */
    const renderFooter = () => {

        if(!!footer === false){
            return null;
        }

        return <TableFooter
            title={title}
            data={footer}
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
            isVisiblePageLimitOptions={isVisiblePageLimitOptions}
        />;
    };

    const extendStyles = {
        ...style,
        '--header-line-height': headerLineHeight,
        '--body-line-height': bodyLineHeight,
        '--cell-line-height': cellLineHeight,
        '--footer-line-height': footerLineHeight,
        ...getTemplate(title, gap),
    } as CSSProperties;

    return (
        <div className={clsx(
            styles.root,
            className,
        )}
        data-fetching={isFetching ? '': undefined}
        ref={tableRef}
        >
            <div className={clsx(
                styles.container,
                {[styles.darkTheme]: isDark},
            )}>
                <table
                    data-mode="table"
                    data-header={isVisibleHeader ? '': undefined}
                    data-footer={!!footer ? '': undefined}
                    data-hover={!!isEnableHover ? '': undefined}
                    data-overflow={!!isOverflow ? '': undefined}
                    data-sticky={!!isStickyHeader ? '': undefined}
                    data-odd-even={!!isEnableOddEven ? '': undefined}
                    data-border={!!isVisibleBorder ? '': undefined}
                    data-vertical-border={!!isVisibleVerticalBorder ? '': undefined}
                    style={extendStyles}
                >
                    {/* Header */}
                    {renderHeader()}

                    {/* Body */}
                    {renderBody()}

                    {/* Footer */}
                    {renderFooter()}
                </table>

                <div className={styles.loadingText}>
                    {renderFetching}
                </div>
            </div>

            <div className={styles.footerContainer}>
                {/* Paginate */}
                {renderPaginate()}
            </div>
        </div>

    );
};

export default Table;


