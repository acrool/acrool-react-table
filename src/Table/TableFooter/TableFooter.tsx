import React from 'react';
import {formatCurrency} from 'bear-jsutils/number';
import {AlignCenterIcon} from '../Icon';
import elClassNames from '../el-class-names';
import cx from 'classnames';
import {IPaginateInfo, IPaginateMeta} from '../types';
import Select from '../Select';


interface IProps {
    currentPage: number,
    pageLimit?: number,
    info: IPaginateInfo;
    onChangePage: (paginateMeta: IPaginateMeta) => void;
    pageLimitOptions?: number[];
}


/**
 * Table Footer
 */
const TableFooter = ({
    currentPage = 1,
    pageLimit = 8,
    info = {
        totalItems: 0,
        totalPages: 1,
    },
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150]
}: IProps) => {

    const end = currentPage * pageLimit;
    const paginateInfo = {
        start: ((currentPage-1) * pageLimit) + 1,
        end: end > info.totalItems ? info.totalItems : end,
    };



    /**
     * 切換頁面
     * @param targetPage
     */
    const handleChangePage = (targetPage: number) => {
        onChangePage({
            pageLimit,
            currentPage: targetPage,
        });
    };

    /**
     * 切換一頁顯示比數
     * @param targetPageLimit
     */
    const handleChangePageLimit = (targetPageLimit: number) => {
        onChangePage({
            currentPage: 1,
            pageLimit: targetPageLimit,
        });
    };



    /**
     * 產生頁面資訊
     */
    const renderPaginateInfo = () => {

        const buttonPageDom = [];

        const totalPages = Math.ceil(info?.totalPages) ?? 1;
        const pageGroup = 5;

        const startPage = ((Math.ceil(currentPage / pageGroup)-1) * pageGroup) + 1;
        const tmpEndPage = (Math.ceil(currentPage / pageGroup) * pageGroup);
        const endPage = tmpEndPage > totalPages ? totalPages : tmpEndPage;

        const pages = new Array(totalPages ?? 1).fill(0).map((currPage, index) => {
            return {text: String(index+1), value: String(index+1)};
        });


        for(let i = startPage; i <= endPage; i+=1){
            const isActive = i === currentPage;
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
                    onChange={value => handleChangePageLimit(Number(value))}
                    value={String(pageLimit)}
                    options={pageLimitOptions.map(page => {
                        return {text: `${page}/Page`, value: String(page)};
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
