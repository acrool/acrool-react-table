import React from 'react';
// Components
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import {IData, TFooterData, IPaginateMeta, ITitle} from './types';
import elClassNames from './el-class-names';


interface IProps {
    title: ITitle[],
    data?: IData[],
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
    title,
    data= [],
    footerData= [],
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



    return (
        <>
            {isVisibleHeader && (<TableHeader
                title={title}
                isVisibleActions={isVisibleActions}
                // isEnableChecked={isEnableChecked && typeof hookForm !== 'undefined'}
                onCheckedAll={onCheckedAll}
                isNonLine={mode === 'nonLine'}

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
        </>
    );
};

export default Table;


