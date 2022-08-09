import React, {useCallback, useMemo} from 'react';
import {anyToNumber} from 'bear-jsutils/convert';
import {isEmpty} from 'bear-jsutils/equal';
import {formatCurrency} from 'bear-jsutils/number';
import {AlignCenterIcon} from './Icon';
import elClassNames from './el-class-names';
import cx from 'classnames';

// Components
// import {Select} from '@bearests/form';

interface IProps {
    meta: {
        currentPage: number,
        pageLimit: number,
    }
    info: {
        totalItems: number,
        totalPages: number,
    }
    onChangePage: (targetPage: number, pageLimit: number) => void;
}


/**
 * Footer
 */
const TableFooter = ({
    meta= {
        currentPage: 1,
        pageLimit: 8,
    },
    info = {
        totalItems: 0,
        totalPages: 1,
    },
    onChangePage,
}: IProps) => {

    const end = meta.currentPage * meta.pageLimit;
    const paginateInfo = {
        start: ((meta.currentPage-1) * meta?.pageLimit) + 1,
        end: end > info.totalItems ? info.totalItems : end,
    };


    const handleConfirmPage = useCallback(() => {
        const ans = window.prompt(`您想跳去第幾頁 (可輸入範圍 1-${info?.totalPages ?? 1}`, String(meta?.currentPage ?? 1));
        if(!isEmpty(ans)){
            const numberAns = anyToNumber(ans);
            if(numberAns > 0 && numberAns <= info?.totalPages){
                onChangePage(numberAns, meta?.pageLimit ?? 8);
            }else{
                window.alert('請輸入正確的頁數範圍');
            }
        }

    }, [meta]);


    /**
     * 產生頁面資訊
     */
    const renderPaginateInfo = () => {

        const buttonPageDom = [];

        const currentPage = meta?.currentPage ?? 1;
        const pageLimit = meta?.pageLimit ?? 8;
        const totalPages = info?.totalPages ?? 1;
        const pageGroup = 5;

        const startPage = ((Math.ceil(currentPage / pageGroup)-1) * pageGroup) + 1;
        const tmpEndPage = (Math.ceil(currentPage / pageGroup) * pageGroup);
        const endPage = tmpEndPage > totalPages ? totalPages : tmpEndPage;

        for(let i = startPage; i <= endPage; i+=1){
            const isActive = i===meta?.currentPage;
            buttonPageDom.push(<button
                className={cx(elClassNames.footerPaginateLi, {['is-active']: isActive})}
                key={`table-page-button-${i}`}
                type="button"
                onClick={() => {
                    onChangePage(i, meta?.pageLimit);
                }}
                disabled={isActive}
            >
                {i}
            </button>);
        }



        return <React.Fragment>
            <button
                className={cx(elClassNames.footerPaginateLi, 'paginate-nav')}
                type="button"
                disabled={currentPage <= 1}
                onClick={() => onChangePage(currentPage - 1, pageLimit)}
            >
                Prev
            </button>

            {buttonPageDom}


            <button
                className={cx(elClassNames.footerPaginateLi, 'paginate-nav')}
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => onChangePage(currentPage + 1, pageLimit)}
            >
                Next
            </button>

            <button
                className={cx(elClassNames.footerPaginateLi, 'paginate-nav')}
                type="button"
                disabled={totalPages <= 1}
                onClick={handleConfirmPage}
            >
                <AlignCenterIcon/>
            </button>
        </React.Fragment>;


    };


    return (
        <div className={elClassNames.footerInner}>
            <div className={elClassNames.footerPaginateInfo}>
                {/*{i18n('com.atom.table.showPage', {defaultMessage: 'show page..', params: {*/}
                {/*    start: formatCurrency(paginateInfo.start),*/}
                {/*    end: formatCurrency(paginateInfo.end),*/}
                {/*    totalItem: formatCurrency(info.totalItems),*/}
                {/*    totalPage: formatCurrency(info?.totalPages),*/}
                {/*}})}*/}
                Show {formatCurrency(paginateInfo.start)} - {formatCurrency(paginateInfo.end)} item, Total {formatCurrency(info.totalItems)} item / {formatCurrency(info?.totalPages)} Page
            </div>

            <div className={elClassNames.footerPageLimit}>
                {/*<Select*/}
                {/*    onChange={value => onChangePage(1, Number(value))}*/}
                {/*    value={String(meta?.pageLimit) ?? '72'}*/}
                {/*    options={[*/}
                {/*        {text: i18n('com.atom.table.page',{defaultMessage:'8/Page', params: {item: 8}}), value: '8'},*/}
                {/*        {text: i18n('com.atom.table.page',{defaultMessage:'20/Page', params: {item: 20}}), value: '20'},*/}
                {/*        {text: i18n('com.atom.table.page',{defaultMessage:'72/Page', params: {item: 72}}), value: '72'},*/}
                {/*        {text: i18n('com.atom.table.page',{defaultMessage:'150/Page',params:  {item: 150}}), value: '150'},*/}
                {/*    ]}*/}
                {/*/>*/}
            </div>

            <div className={elClassNames.footerPaginateUl}>
                {renderPaginateInfo()}
            </div>

        </div>
    );
};

export default TableFooter;
