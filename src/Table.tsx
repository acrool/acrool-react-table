import React from 'react';
import cx from 'classnames';

import {TOnChangeSortField, TOnChangePage, ITableProps, ITitle,} from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TablePaginate from './TablePaginate';
import elClassNames from './el-class-names';
import {getTemplate, getColSpan} from './utils';

import './styles.css';




/**
 * Table
 */
const Table = <T extends string|number, D extends string>({
    className,
    style,
    isDark,
    isFetching = false,
    title,
    data,
    footer,
    gap = '5px',
    paginateInfo = {
        totalItems: 0,
        totalPages: 1,
    },
    paginateMeta,
    isVisibleHeader = true,
    isVisiblePaginate = true,
    isStickyHeader = false,
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150],

    renderNoData,
}: ITableProps<T, D>) => {
    const meta = {
        currentPage: paginateMeta?.currentPage ?? 1,
        pageLimit: paginateMeta?.pageLimit ?? pageLimitOptions[0] ?? 8,
        order: paginateMeta?.order
    };



    const handleOnChangePage: TOnChangePage = (pageMeta) => {
        window.scrollTo(0, 70);

        if(onChangePage){
            const paramsMeta = {
                currentPage: pageMeta.currentPage,
                pageLimit: pageMeta.pageLimit,
                order: meta.order,
            };

            onChangePage(paramsMeta, true);
        }
    };


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
     * 產生讀取中樣式
     */
    const renderLoading = () => {
        return <tbody data-loading="">
            <tr>
                <td {...getColSpan(Object.keys(title).length)}>Loading...</td>
            </tr>
        </tbody>;
    };

    /**
     * 產生沒資料時的顯示
     */
    const renderCustomNoData = () => {
        return <tbody data-no-data="">
            <tr>
                <td {...getColSpan(Object.keys(title).length)}>
                    {!!renderNoData ?
                        renderNoData() : <div className={elClassNames.notData}>
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
            isStickyHeader={isStickyHeader}
            onChangeSortField={handleOnOrderField}
            order={meta.order}
        />;
    };


    /**
     * 產生表格內容
     */
    const renderBody = () => {
        if(isFetching){
            return renderLoading();
        }

        if(!data || data?.length === 0){
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
        if(isFetching){
            return null;
        }
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
            meta={meta}
            info={paginateInfo}
            onChangePage={handleOnChangePage}
            pageLimitOptions={pageLimitOptions}
        />;
    };


    return (
        <div className={cx(
            elClassNames.root,
            className,
            {'dark-theme': isDark},
        )}
        data-header={!!isVisibleHeader ? '': undefined}
        data-footer={!!footer ? '': undefined}
        style={{
            ...style,
            ...getTemplate(title, gap)
        }}>
            <table>
                {/* Header */}
                {renderHeader()}

                {/* Body */}
                {renderBody()}

                {/* Footer */}
                {renderFooter()}
            </table>

            {/* Paginate */}
            {renderPaginate()}
        </div>

    );
};

export default Table;


