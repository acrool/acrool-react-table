import React from 'react';
import {isEmpty} from 'bear-jsutils/equal';

// Components
import {IData, TDataFooterContent, IPaginateMeta, ITitle, IPaginateInfo} from './types';
import elClassNames from './el-class-names';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';
import config from './config';

import './styles.css';
import './TableHeader/styles.css';
import './TableBody/styles.css';
import './TableFooter/styles.css';


interface IProps {
    isFetching?: boolean,
    title: ITitle[],
    data?: IData[],
    dataFooterContent?: TDataFooterContent, // ex: total...
    paginateMeta?: IPaginateMeta,
    paginateInfo?: IPaginateInfo,
    isVisibleHeader?: boolean,
    onChangePage?: (meta: IPaginateMeta) => void;
}


/**
 * Table
 */
const Table = ({
    isFetching = false,
    title,
    data = [],
    dataFooterContent,
    paginateInfo = {
        totalItems: 0,
        totalPages: 1,
    },
    paginateMeta = {
        currentPage: 1,
        pageLimit: config.pageLimit,
        sort: {field: 'id', orderBy: 'DESC'},
    },
    isVisibleHeader = true,
    onChangePage
}: IProps) => {

    const handleOnChangePage = (meta: IPaginateMeta) => {
        window.scrollTo(0, 70);

        if(onChangePage){
            onChangePage(meta);
        }

    };


    /**
     * 產生表格內容
     */
    const renderBody = () => {
        if(isEmpty(data)){
            return <div className={elClassNames.notData}>
                {/*<NotDataImage src={asset('/images/no-email.svg')}/>*/}
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
        <div className={elClassNames.root}>
            <div className={elClassNames.container}>
                <div className={elClassNames.content}>
                    {isVisibleHeader && (<TableHeader
                        title={title}
                        onChangeSortField={onChangePage}
                        paginateMeta={paginateMeta}
                    />)}

                    {renderBody()}
                </div>

                <div className={elClassNames.loadingBox} data-visible={isFetching}>
                    <div className={elClassNames.loadingPosition}>
                        {/*<div className={elClassNames.loadingImage} src={asset('/images/loading.gif')}/>*/}
                        <div className={elClassNames.loadingText}>讀取中...</div>
                    </div>
                </div>
            </div>


            {/* 頁尾 */}
            <TableFooter meta={paginateMeta} info={paginateInfo} onChangePage={paginateMeta => handleOnChangePage(paginateMeta)}/>
        </div>

    );
};

export default Table;


