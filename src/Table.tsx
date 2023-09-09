import React from 'react';
import cx from 'classnames';

import {TOnChangeSortField, TOnChangePage, ITableProps,} from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TablePaginate from './TablePaginate';
import elClassNames from './el-class-names';
import {getTemplate, getColSpan} from './utils';

import './styles.css';
import './TableHeader/styles.css';
import './TableBody/styles.css';
import './TablePaginate/styles.css';




/**
 * Table
 */
const Table = <T extends string|number>({
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
    isStickyHeader = false,
    isVisibleFooter = true,
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150],

    renderNoDaa,
}: ITableProps<T>) => {
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
                <td {...getColSpan(title.length)}>Loading...</td>
            </tr>
        </tbody>;
    };

    /**
     * 產生沒資料時的顯示
     */
    const renderNoData = () => {

        return <tbody data-no-data="">
            <tr>
                <td {...getColSpan(title.length)}>
                    {!!renderNoDaa ?
                        renderNoDaa() : <div className={elClassNames.notData}>
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
            return renderNoData();
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
        if(!isVisibleFooter || !!footer === false){
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
        if(!isVisibleFooter){
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
        data-footer={!!isVisibleFooter ?? ''}
        data-header={!!isVisibleHeader ?? ''}
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


