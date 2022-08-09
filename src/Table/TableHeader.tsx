import React, {useMemo} from 'react';
// Components
import {IPaginateMeta, ITitle} from './types';
import elClassNames from './el-class-names';
// import {EColType} from 'bear-styled-grid';
import {SortDownIcon, SortIcon, SortUpIcon} from './Icon';


interface IProps {
    title: ITitle[],
    isNonLine?: boolean,
    isEnableChecked?: boolean,
    isVisibleActions?: boolean;
    onCheckedAll: (isChecked: boolean) => void;
    sortField?: string,
    sortBy?: 'DESC'|'ASC',
    onChangePage?: (meta: IPaginateMeta) => void;
}


/**
 * Table
 */
const TableHeader = ({
    title= [],
    isNonLine= false,
    isEnableChecked = true,
    isVisibleActions = false ,
    onCheckedAll = () => {},
    sortField,
    sortBy = 'DESC',
    onChangePage = () => {}
}: IProps) => {

    // const {i18n} = useLocale();
    // const {control} = useForm<{
    //     checkedAll: boolean
    // }>();


    const memoTitle = () => {
        return title.map(titleRow => {
            return (
                <div
                    className={elClassNames.itemColumn}
                    key={`columnTitle_${titleRow.field}`}
                    // data-col={titleRow.col || EColType.auto}
                    data-align={titleRow.titleAlign}
                    style={titleRow.col === true ? {
                        flex: 1,
                    }:{
                        width: titleRow.width,
                        flex: `0 0 ${titleRow.width}px`
                    }}
                >
                    {titleRow.isSort ? (
                        <button
                        className={elClassNames.headerSortButton}
                            onClick={() => {
                            // onChangePage(1, undefined, titleRow.field, sortBy === 'DESC' ? 'ASC':'DESC')
                            onChangePage({
                                currentPage: 1,
                                pageLimit: 8,
                                sortBy: sortBy === 'DESC' ? 'ASC':'DESC',
                            });
                        }}>
                            {titleRow.text}

                            {sortField === titleRow.field ?
                                sortBy === 'ASC' ? <SortUpIcon/> : <SortDownIcon/> :
                                <SortIcon/>
                            }

                        </button>
                    ): titleRow.text}
                </div>
            );
        });


    };


    return (<React.Fragment>

        <div
            className={elClassNames.headerInner}
            // isNonLine={isNonLine}
        >
            <div className={elClassNames.itemUl}>
                <li className={elClassNames.itemLi}>
                    {/*/!* Checkbox 選取功能 *!/*/}
                    {/*{isEnableChecked && (*/}
                    {/*    <HeaderColumn */}
                    {/*        style={{*/}
                    {/*        width: 48,*/}
                    {/*        flex: '0 0 48px'*/}
                    {/*    }}>*/}
                    {/*        <FormControl>*/}
                    {/*            <Controller*/}
                    {/*                name="checkedAll"*/}
                    {/*                control={control}*/}
                    {/*                render={({field}) => {*/}
                    {/*                    // @ts-ignore*/}
                    {/*                    return <Checkbox*/}
                    {/*                        {...field}*/}
                    {/*                        checked={field.value}*/}
                    {/*                        onChange={isChecked =>{*/}
                    {/*                            field.onChange(isChecked);*/}
                    {/*                            onCheckedAll(isChecked);*/}
                    {/*                        }}/>;*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </FormControl>*/}
                    {/*    </HeaderColumn>*/}
                    {/*)}*/}

                    {memoTitle()}

                    {/*{isVisibleActions && (*/}
                    {/*    <HeaderColumn col style={{width: 100, flex: '0 0 100px'}}>*/}
                    {/*        {i18n('com.atom.table.field.action', {defaultMessage: 'Action'})}*/}
                    {/*    </HeaderColumn>*/}
                    {/*)}*/}
                </li>
            </div>
        </div>
    </React.Fragment>);
};

export default TableHeader;


//
// const SortButton = styled(Button)`
//   color: #9aa0ac;
//   padding: 0;
// `;
//
// const InnerHeader = styled.div<{
//     isNonLine ?: boolean,
// }>`
//     color: #9aa0ac;
//
//     position: sticky;
//     top: 0;
//     background-color: #2b3035;
//     flex: 1 1 100%;
//     width: 100%;
//     z-index: 5;
//
//
//     ${props => props.isNonLine && css`
//         margin-bottom: 10px;
//     `}
// `;
//
//
//
// export const HeaderColumn = styled(Col)<{
//     align?: 'left'|'center'|'right'
//     vertical?: 'top'|'center'|'bottom'
// }>`
//    text-transform: uppercase;
//     user-select: none;
//
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: flex-start;
//
//     height: 100%;
//     font-size: 14px;
//     padding: 0 10px;
//     flex-wrap: nowrap;
//
//     word-break: break-word;
//     transition: color .1s;
//     //overflow: hidden;
//     //*{
//     //  user-select: text;
//     //}
//
//     ${props => props.align === 'right' && css`
//         justify-content: flex-end;
//
//     `}
//     ${props => props.align === 'left' && css`
//         justify-content: flex-start;
//
//     `}
//     ${props => props.align === 'center' && css`
//         justify-content: center;
//
//     `}
//
//     ${props => props.vertical === 'top' && css`
//         align-items: flex-start;
//
//     `}
//     ${props => props.vertical === 'bottom' && css`
//         align-items: flex-end;
//
//     `}
//     ${props => props.vertical === 'center' && css`
//         align-items: center;
//
//     `}
// `;
//



