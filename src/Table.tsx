import React, {useEffect, useRef, CSSProperties, useCallback} from 'react';

import {TOnChangeSortField, TOnChangePage, ITableProps, TBodyDataFieldKey, TBodyDataID} from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TablePaginate from './TablePaginate';
import elClassNames from './el-class-names';
import {getTemplate, getColSpan} from './utils';

import './styles.css';
import {useWindowResizeEffect} from './hooks';
import clsx from 'clsx';




/**
 * Table
 */
const Table = <I extends TBodyDataID, K extends TBodyDataFieldKey>({
    className,
    style,
    isDark,
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

    renderNoData,
    renderFetching = 'Loading...',
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
        if(tableRef.current){
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
                <td {...getColSpan(Object.keys(title).length)}>
                    {!!renderNoData ?
                        renderNoData : <div className={elClassNames.notData}>
                            <div className={elClassNames.notDataTitle}>Not Found</div>
                            <div className={elClassNames.notDataDesc}>Choose a different filter to view results</div>
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
                        <td {...getColSpan(Object.keys(title).length)}>{renderFetching}</td>
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

        return <TablePaginate
            isDark={isDark}
            meta={meta}
            info={paginateInfo}
            onChangePage={handleOnChangePage}
            pageLimitOptions={pageLimitOptions}
        />;
    };


    return (
        <div className={clsx(
            elClassNames.root,
            className,
            {'dark-theme': isDark},
        )}
        ref={tableRef}
        data-mode="table"
        data-fetching={isFetching ? '': undefined}
        data-header={isVisibleHeader ? '': undefined}
        data-footer={!!footer ? '': undefined}
        data-hover={!!isEnableHover ? '': undefined}
        data-overflow={!!isOverflow ? '': undefined}
        data-sticky={!!isStickyHeader ? '': undefined}
        data-odd-even={!!isEnableOddEven ? '': undefined}
        data-border={!!isVisibleBorder ? '': undefined}
        data-vertical-border={!!isVisibleVerticalBorder ? '': undefined}
        style={{
            ...style,
            '--header-line-height': headerLineHeight,
            '--body-line-height': bodyLineHeight,
            '--cell-line-height': cellLineHeight,
            '--footer-line-height': footerLineHeight,
            ...getTemplate(title, gap),
        } as CSSProperties}>
            <table>
                {/* Header */}
                {renderHeader()}

                {/* Body */}
                {renderBody()}

                {/* Footer */}
                {renderFooter()}
            </table>

            {isFetching && data?.length > 0 && (
                <div className="bear-react-table__loading-text">
                    {renderFetching}
                </div>
            )}

            {/* Paginate */}
            {renderPaginate()}
        </div>

    );
};

export default Table;


