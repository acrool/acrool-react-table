import React from 'react';
// Components
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import {IData, TFooterData, IPaginateMeta, ITitle, IPaginateInfo} from './types';
import elClassNames from './el-class-names';

import './styles.css';
import TableFooter from './TableFooter';

interface IProps {
    isFetching?: boolean,
    title: ITitle[],
    data?: IData[],
    paginateMeta?: IPaginateMeta,
    paginateInfo?: IPaginateInfo,
    footerData?: TFooterData[]
    bodyHeight?: number,
    mode?: 'default'|'nonLine',
    trColor?: string,
    isEnableChecked?: boolean,
    isVisibleHeader?: boolean,
    isVisibleActions?: boolean,
    onEditRow?: (id: number, isOpen: boolean) => void;
    onDeleteRow?: (id: number) => void;
    onCheckedAll?: (isChecked: boolean) => void;
    sortField?: string,
    sortBy?: 'DESC'|'ASC',
    onChangePage?: (meta: IPaginateMeta) => void;
}


/**
 * Table
 */
const Table = ({
    isFetching = false,
    title,
    data= [],
    footerData= [],
    paginateInfo = {
        totalItems: 0,
        totalPages: 1,
    },
    paginateMeta= {
        currentPage: 1,
        pageLimit: 8,
    },
    bodyHeight,
    mode = 'default',
    trColor,
    isEnableChecked = true,
    isVisibleHeader = true,
    isVisibleActions = false,
    onEditRow,
    onDeleteRow,
    onCheckedAll= () => {},
    sortField,
    sortBy,
    onChangePage
}: IProps) => {

    const handleOnChangePage = (meta: IPaginateMeta) => {

        window.scrollTo(0, 70);

        if(onChangePage){
            onChangePage(meta);
        }

    };


    return (
        <div className={elClassNames.root}>

            <div className={elClassNames.container}>

                <div className={elClassNames.content}>
                    {isVisibleHeader && (<TableHeader
                        title={title}
                        // isVisibleActions={isVisibleActions}
                        // isEnableChecked={isEnableChecked && typeof hookForm !== 'undefined'}
                        // onCheckedAll={onCheckedAll}
                        // isNonLine={mode === 'nonLine'}

                        sortField={sortField}
                        sortBy={sortBy}
                        onChangePage={onChangePage}
                    />)}

                    {/* 表格內容 */}
                    {data.length > 0 ? (
                        <TableBody
                            // hookFormControl={hookForm?.control}
                            isVisibleActions={isVisibleActions}
                            title={title}
                            data={data}
                            footerData={footerData}
                            height={bodyHeight}
                            trColor={trColor}
                            isEnableChecked={isEnableChecked}
                            onDeleteRow={onDeleteRow}
                            onEditRow={onEditRow}
                            isNonLine={mode === 'nonLine'}
                        />
                    ): (<div className={elClassNames.notData}>
                        {/*<NotDataImage src={asset('/images/no-email.svg')}/>*/}
                        <div className={elClassNames.notDataText}>Not Found</div>
                        <div className={elClassNames.notDataDesc}>Choose a different filter to view test results to you</div>
                    </div>)}
                </div>

                <div className={elClassNames.loadingBox} data-visible={isFetching}>
                    <div className={elClassNames.loadingPosition}>
                        {/*<div className={elClassNames.loadingImage} src={asset('/images/loading.gif')}/>*/}
                        <div className={elClassNames.loadingText}>讀取中...</div>
                    </div>
                </div>
            </div>


            {/* 頁尾 */}
            <TableFooter meta={paginateMeta} info={paginateInfo} onChangePage={(targetPage, pageLimit) => handleOnChangePage({currentPage: targetPage, pageLimit})}/>
        </div>

    );
};

export default Table;


