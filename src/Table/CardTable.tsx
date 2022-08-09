import {useCallback} from 'react';
import styled from 'styled-components/macro';

// Components
import Card from 'components/atoms/Card';
import TableFooter from './TableFooter';
import Table from './Table';

import {UseFormReturn} from 'react-hook-form';
import CSS from 'csstype';
import {IData, TFooterData, IPaginateInfo, IPaginateMeta, ITitle} from './types';



interface IProps {
    className?: string;
    style?: CSS.Properties;
    cardStyle?: CSS.Properties;
    hookForm?: UseFormReturn<{checkedId: {
        [key: string]: boolean
    }}>,
    title: ITitle[],
    data?: IData[],
    footerData?: TFooterData[],
    meta?: IPaginateMeta,
    info?: IPaginateInfo,
    bodyHeight?: number,
    mode?: 'default'|'nonLine',
    trColor?: string,
    isEnableChecked?: boolean,
    isVisibleHeader?: boolean,
    isVisibleActions?: boolean,
    isVisiblePaginate?: boolean,
    isFetching?: boolean,
    onChangePage?: (meta: IPaginateMeta) => void;
    onEditRow?: (id: number, isOpen: boolean) => void;
    onDeleteRow?: (id: number) => void;
}


/**
 * CardTable
 */
const CardTable = ({
    style,
    className,
    cardStyle,
    hookForm,
    data= [],
    footerData= [],
    title= [],
    info = {
        totalItems: 0,
        totalPages: 1,
    },
    meta= {
        currentPage: 1,
        pageLimit: 8,
    },
    bodyHeight,
    mode = 'default',
    trColor,
    isEnableChecked = true,
    isVisibleHeader = true,
    isVisibleActions = true,
    isVisiblePaginate = true,
    isFetching = false,
    onEditRow,
    onDeleteRow,
    onChangePage,
}: IProps) => {

    const handleOnChangePage = useCallback((meta: IPaginateMeta) => {

        window.scrollTo(0, 70);

        if(onChangePage){
            onChangePage(meta);
        }

    }, [onChangePage]);

    /**
     * 全選控制
     */
    const handleCheckedAll = useCallback((isChecked: boolean) => {
        if(hookForm){
            const keys = hookForm.getValues();
            for(const key of Object.keys(keys.checkedId)){
                hookForm.setValue(`checkedId.${key}` as const, isChecked as never);
            }
        }



    }, [hookForm]);


    return (
        <TableRoot style={style} className={className}>

            <Card
                style={cardStyle}
                direction="column" fluid isNonLine={mode === 'nonLine'} isFetching={isFetching}>
                <Table
                    onCheckedAll={handleCheckedAll}
                    isVisibleHeader={isVisibleHeader}
                    isVisibleActions={isVisibleActions}
                    hookForm={hookForm}
                    data={data}
                    footerData={footerData}
                    title={title}
                    bodyHeight={bodyHeight}
                    mode={mode}
                    isEnableChecked={isEnableChecked}
                    onEditRow={onEditRow}
                    onDeleteRow={onDeleteRow}
                    trColor={trColor}
                    sortField={meta?.sortField}
                    sortBy={meta?.sortBy}
                    onChangePage={handleOnChangePage}
                />
            </Card>

            {/* 頁尾 */}
            {(meta && info && isVisiblePaginate && onChangePage) && (
                <TableFooter meta={meta} info={info} onChangePage={(targetPage, pageLimit) => handleOnChangePage({currentPage: targetPage, pageLimit})}/>
            )}
        </TableRoot>
    );
};

export default CardTable;


const TableRoot = styled.div`
    margin-bottom: 20px;
`;
