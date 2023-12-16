import React, {useCallback} from 'react';
import {formatCurrency} from 'bear-jsutils/number';
import {AlignCenterIcon} from '../Icon';
import elClassNames from '../el-class-names';
import {IPage, IPaginateInfo, TOnChangePage} from '../types';
import Select from './_components/Select';
import clsx from 'clsx';
import useLocale from '../locales';


interface IProps {
    isDark?: boolean
    locale?: string
    meta: Required<IPage>
    info?: IPaginateInfo
    onChangePage: (paginateMeta: Required<IPage>) => void
    pageLimitOptions: number[]
}


/**
 * Table Footer
 */
const TablePaginate = ({
    isDark = false,
    locale,
    meta,
    info = {
        totalItems: 0,
        totalPages: 1,
    },
    onChangePage,
    pageLimitOptions = [8, 40, 72, 150],
}: IProps) => {
    const {i18n} = useLocale(locale);

    console.log('locale', locale);

    const end = meta.currentPage * meta.pageLimit;
    const paginateInfo = {
        start: ((meta.currentPage-1) * meta.pageLimit) + 1,
        end: end > info.totalItems ? info.totalItems : end,
    };


    /**
     * 切換頁面
     * @param targetPage
     */
    const handleChangePage = (targetPage: number) => {
        onChangePage({
            pageLimit: meta.pageLimit,
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
    const renderNav = () => {

        const buttonPageDom = [];

        const totalPages = Math.ceil(info?.totalPages) ?? 1;
        const pageGroup = 5;

        const startPage = ((Math.ceil(meta.currentPage / pageGroup)-1) * pageGroup) + 1;
        const tmpEndPage = (Math.ceil(meta.currentPage / pageGroup) * pageGroup);
        const endPage = tmpEndPage > totalPages ? totalPages : tmpEndPage;

        const pages = new Array(totalPages ?? 1).fill(0).map((currPage, index) => {
            return {text: String(index+1), value: String(index+1)};
        });


        for(let i = startPage; i <= endPage; i+=1){
            const isActive = i === meta.currentPage;
            buttonPageDom.push(<button
                className={elClassNames.paginatePageLi}
                key={`table-page-button-${i}`}
                data-active={isActive ? '': undefined}
                type="button"
                onClick={() => handleChangePage(i)}
                disabled={isActive}
            >
                {i}
            </button>);
        }



        return <div className={elClassNames.paginatePageUl}>

            <button
                className={elClassNames.paginatePageNav}
                type="button"
                disabled={meta.currentPage <= 1}
                onClick={() => handleChangePage(meta.currentPage - 1)}
            >
                {i18n('com.table.prev', {def: 'Prev'})}
            </button>

            {buttonPageDom}


            <button
                className={elClassNames.paginatePageNav}
                type="button"
                disabled={meta.currentPage >= totalPages}
                onClick={() => handleChangePage(meta.currentPage + 1)}
            >
                {i18n('com.table.next', {def: 'Next'})}
            </button>

            <button
                className={elClassNames.paginatePagePicker}
                type="button"
                disabled={totalPages <= 1}
            >
                <AlignCenterIcon/>
                <Select
                    options={pages}
                    value={meta.currentPage}
                    onChange={(value) => handleChangePage(Number(value))}
                />
            </button>
        </div>;
    };


    const renderInfo = () => {
        return <div className={elClassNames.paginateInfo}>
            {i18n('com.table.showPage', {args: {
                start: formatCurrency(paginateInfo.start),
                end: formatCurrency(paginateInfo.end),
            }})}

            {i18n('com.table.totalPage', {args: {
                totalItem: formatCurrency(info.totalItems),
                totalPage: formatCurrency(info?.totalPages),
            }})}
        </div>;
    };

    const renderLimit = () => {
        return <Select
            onChange={value => handleChangePageLimit(Number(value))}
            value={String(meta.pageLimit)}
            options={pageLimitOptions.map(item => {
                return {text: i18n('com.table.pageLimit', {args: {item: item}}), value: String(item)};
            })}
        />;
    };


    return (
        <div className={clsx(elClassNames.paginate, {'dark-theme': isDark} )}>
            {renderInfo()}
            {renderLimit()}
            {renderNav()}
        </div>
    );
};

export default TablePaginate;
