import React, {useCallback} from 'react';
import {anyToNumber} from 'bear-jsutils/convert';
import {isEmpty} from 'bear-jsutils/equal';
import {formatCurrency} from 'bear-jsutils/number';
import {AlignCenterIcon} from '../Icon';
import elClassNames from '../el-class-names';
import cx from 'classnames';
import {IPaginateInfo, IPaginateMeta} from '../types';
import Select from '../Select';


interface IProps {
    meta: IPaginateMeta;
    info: IPaginateInfo;
    onChangePage: (paginateMeta: IPaginateMeta) => void;
    pageLimitOptions?: number[];
}


/**
 * Table Footer
 */
const TableFooter = ({
    meta = {
        currentPage: 1,
        pageLimit: 8,
    },
    info = {
        totalItems: 0,
        totalPages: 1,
    },
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150]
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
                onChangePage({
                    ...meta,
                    currentPage: numberAns,
                });
            }else{
                window.alert('請輸入正確的頁數範圍');
            }
        }

    }, [meta]);


    /**
     * 切換頁面
     * @param targetPage
     */
    const handleChangePage = (targetPage: number) => {
        onChangePage({
            ...meta,
            currentPage: targetPage,
        })
    }



    /**
     * 產生頁面資訊
     */
    const renderPaginateInfo = () => {

        const buttonPageDom = [];

        const currentPage = meta?.currentPage ?? 1;
        // const pageLimit = meta?.pageLimit ?? 8;
        const totalPages = Math.ceil(info?.totalPages) ?? 1;
        const pageGroup = 5;

        const startPage = ((Math.ceil(currentPage / pageGroup)-1) * pageGroup) + 1;
        const tmpEndPage = (Math.ceil(currentPage / pageGroup) * pageGroup);
        const endPage = tmpEndPage > totalPages ? totalPages : tmpEndPage;

        const pages = new Array(totalPages ?? 1).fill(0).map((currPage, index) => {
            return {text: String(index+1), value: String(index+1)}
        });


        for(let i = startPage; i <= endPage; i+=1){
            const isActive = i===meta?.currentPage;
            buttonPageDom.push(<button
                className={cx(elClassNames.footerPaginateLi, {'is-active': isActive})}
                key={`table-page-button-${i}`}
                type="button"
                onClick={() => handleChangePage(i)}
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
                onClick={() => handleChangePage(currentPage - 1)}
            >
                Prev
            </button>

            {buttonPageDom}


            <button
                className={cx(elClassNames.footerPaginateLi, 'paginate-nav')}
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => handleChangePage(currentPage + 1)}
            >
                Next
            </button>

            <button
                className={cx(elClassNames.footerPaginateLi, 'paginate-nav')}
                type="button"
                disabled={totalPages <= 1}
            >
                <AlignCenterIcon/>
                <Select
                    options={pages}
                    value={currentPage}
                    onChange={(value) => handleChangePage(Number(value))}
                />
            </button>
        </React.Fragment>;


    };


    return (
        <div className={elClassNames.footerInner}>
            <div className={elClassNames.footerPaginateInfo}>
                Show {formatCurrency(paginateInfo.start)} - {formatCurrency(paginateInfo.end)} item, Total {formatCurrency(info.totalItems)} item / {formatCurrency(info?.totalPages)} Page
            </div>

            <div className={elClassNames.footerPageLimit}>
                <Select
                    onChange={value => handleChangePage(Number(value))}
                    value={String(meta.pageLimit)}
                    options={pageLimitOptions.map(page => {
                        return {text: `${page}/Page`, value: String(page)}
                    })}
                />
            </div>

            <div className={elClassNames.footerPaginateUl}>
                {renderPaginateInfo()}
            </div>

        </div>
    );
};

export default TableFooter;
