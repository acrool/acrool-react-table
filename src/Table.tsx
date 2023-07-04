import React from 'react';
import cx from 'classnames';

// Components
import {TOnChangeSortField, TOnChangePage, ITableProps,} from './types';
import elClassNames from './el-class-names';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';

import './styles.css';
import './TableHeader/styles.css';
import './TableBody/styles.css';
import './TableFooter/styles.css';




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
    dataFooterContent,
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
     * 產生表格內容
     */
    const renderBody = () => {
        if(isFetching){
            return <div className={elClassNames.notData}>
                <div className={elClassNames.loadingText}>Loading...</div>
            </div>;
        }

        if(!data || data?.length === 0){
            if(renderNoDaa){
                return <div className={elClassNames.notData}>
                    {renderNoDaa()}
                </div>;
            }

            return <div className={elClassNames.notData}>
                <div className={elClassNames.notDataText}>Not Found</div>
                <div className={elClassNames.notDataDesc}>Choose a different filter to view results</div>
            </div>;

        }

        return <TableBody
            title={title}
            data={data}
            dataFooterContent={dataFooterContent}
        />;
    };


    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            <div className={elClassNames.container}>
                <div className={elClassNames.content}>
                    {/* Header */}
                    {isVisibleHeader && (<TableHeader
                        title={title}
                        isStickyHeader={isStickyHeader}
                        onChangeSortField={handleOnOrderField}
                        order={meta.order}
                    />)}

                    {/* Body */}
                    {renderBody()}
                </div>


            </div>


            {/* Footer */}
            {isVisibleFooter && (
                <TableFooter
                    meta={meta}
                    info={paginateInfo}
                    onChangePage={handleOnChangePage}
                    pageLimitOptions={pageLimitOptions}
                />
            )}
        </div>

    );
};

export default Table;


