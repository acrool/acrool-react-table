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
    TOnChangePage, TChangePage
} from './types';
import elClassNames from './el-class-names';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';
import config from './config';

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

    currentPage?: number,
    pageLimit?: number,

    order?: IOrder,

    isVisibleHeader?: boolean,
    isStickyHeader?: boolean,
    onChangePage?: (meta: IPaginateMeta) => void;
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
    currentPage = 1,
    pageLimit = config.pageLimit,
    order = {
        orderField: 'id',
        orderBy: 'DESC',
    },

    isVisibleHeader = true,
    isStickyHeader = false,
    onChangePage,
    pageLimitOptions,
}: IProps) => {

    const mergeParamChangePage: TOnChangePage = (pageMeta, orderMeta) => {
        window.scrollTo(0, 70);

        if(onChangePage){
            onChangePage({...pageMeta, ...orderMeta});
        }
    };

    const handleOnChangePage: TChangePage = (pageMeta) => {
        mergeParamChangePage({currentPage: pageMeta.currentPage, pageLimit: pageMeta.pageLimit}, order);
    };

    const handleOnOrderField: TOnChangeSortField = (params) => {
        mergeParamChangePage({currentPage: 1, pageLimit}, params);
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
                        order={order}
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
            <TableFooter
                currentPage={currentPage}
                pageLimit={pageLimit}

                info={paginateInfo}
                onChangePage={handleOnChangePage}
                pageLimitOptions={pageLimitOptions}
            />
        </div>

    );
};

export default Table;


