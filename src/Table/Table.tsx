import React from 'react';
import {isEmpty} from 'bear-jsutils/equal';
import CSS from 'csstype';
import cx from 'classnames';

// Components
import {
    IData,
    TDataFooterContent,
    IPaginateMeta,
    ITitle,
    IPaginateInfo,
    IOrder,
    TOnChangeSortField,
    TOnChangePage,
} from './types';
import elClassNames from './el-class-names';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';

import './styles.css';
import './TableHeader/styles.css';
import './TableBody/styles.css';
import './TableFooter/styles.css';
import {NoDataImage} from './Icon';


interface IProps {
    className?: string;
    style?: CSS.Properties,
    isFetching?: boolean,
    title: ITitle[],
    data?: IData[],
    dataFooterContent?: TDataFooterContent, // ex: total...
    paginateInfo?: IPaginateInfo,
    paginateMeta?: IPaginateMeta,

    isVisibleHeader?: boolean,
    isStickyHeader?: boolean,
    isVisibleFooter?: boolean,
    onChangePage?: TOnChangePage,
    pageLimitOptions?: number[];
}


/**
 * Table
 */
const Table = ({
    className,
    style,
    isFetching = false,
    title,
    data = [],
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
}: IProps) => {
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
        if(isEmpty(data)){
            return <div className={elClassNames.notData}>
                <NoDataImage/>
                <div className={elClassNames.notDataText}>Not Found</div>
                <div className={elClassNames.notDataDesc}>Choose a different filter to view test results to you</div>
            </div>;
        }

        return <TableBody
            title={title}
            data={data}
            dataFooterContent={dataFooterContent}
        />;
    };


    return (
        <div className={cx(elClassNames.root, className)} style={style}>
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

                {/* Loading */}
                <div className={elClassNames.loadingBox} data-visible={isFetching}>
                    <div className={elClassNames.loadingPosition}>
                        {/*<div className={elClassNames.loadingImage} src={asset('/images/loading.gif')}/>*/}
                        <div className={elClassNames.loadingText}>讀取中...</div>
                    </div>
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


