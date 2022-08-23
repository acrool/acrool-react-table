import React from 'react';

// Components
import {IPaginateMeta, ITitle} from '../types';
import elClassNames from '../el-class-names';
import {SortDownIcon, SortIcon, SortUpIcon} from '../Icon';
import {getCol} from '../utils';


interface IProps {
    title: ITitle[],
    onChangeSortField?: (meta: IPaginateMeta) => void;
    isStickyHeader?: boolean;
    paginateMeta: IPaginateMeta,
}


/**
 * Table Header
 */
const TableHeader = ({
    title= [],
    paginateMeta,
    isStickyHeader = false,
    onChangeSortField = () => {},
}: IProps) => {

    const renderTitle = () => {
        return title.map(titleRow => {
            return (
                <div
                    className={elClassNames.itemColumn}
                    key={`columnTitle_${titleRow.field}`}
                    data-align={titleRow.titleAlign}
                    style={getCol(titleRow.col)}
                >
                    {titleRow.isEnableSort ? (
                        <button
                            className={elClassNames.headerSortButton}
                            data-active={paginateMeta.sort?.field === titleRow.field}
                            onClick={() => {
                                onChangeSortField({
                                    ...paginateMeta,
                                    currentPage: 1,
                                    sort: {field: titleRow.field, orderBy: (paginateMeta.sort?.orderBy === 'DESC' && paginateMeta.sort?.field === titleRow.field) ? 'ASC':'DESC'},
                                });
                            }}>
                            {titleRow.text}

                            {paginateMeta.sort?.field === titleRow.field ?
                                paginateMeta.sort?.orderBy === 'ASC' ? <SortUpIcon/> : <SortDownIcon/> :
                                <SortIcon/>
                            }

                        </button>
                    ): titleRow.text}
                </div>
            );
        });

    };


    return <div className={elClassNames.headerInner} data-sticky={isStickyHeader}>
        <div className={elClassNames.itemUl}>
            <li className={elClassNames.itemLi}>{renderTitle()}</li>
        </div>
    </div>;
};

export default TableHeader;


