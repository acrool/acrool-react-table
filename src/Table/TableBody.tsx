import React, {Fragment, useMemo} from 'react';
import {isEmpty} from 'bear-jsutils/equal';
// Components
// import {Icon, Button} from '@bearests/atom';
// import {Checkbox} from '@bearests/form';
// import {FormControl, HeaderLi, ItemColumn, ItemUl} from './Common';
import {IData, TFooterData, ITitle} from './types';
import elClassNames from './el-class-names';
import cx from 'classnames';

interface IProps {
    // hookFormControl?: Control<{ checkedId: { [key: string]: boolean; }; }>,
    title: ITitle[],
    data: IData[],
    footerData?: TFooterData[],
    isEnableChecked?: boolean,
    isVisibleActions: boolean;
    height?: number;
    isNonLine?: boolean;
    trColor?: string;
    onEditRow?: (id: number, isOpen: boolean) => void;
    onDeleteRow?: (id: number) => void;
}


/**
 * Table
 */
const TableBody = ({
    // hookFormControl,
    title= [],
    data= [],
    footerData= [],
    isEnableChecked = true,
    onEditRow,
    onDeleteRow,
    isVisibleActions,
    height = 57,
    isNonLine = false,
    trColor,
}: IProps) => {


    const bodyData = () => {

        return data.map(dataRow => {
            if(typeof dataRow?.id === 'undefined'){
                throw new Error('TableBody error, `dataRow.id` can\'t is undefined!');
            }

            const fieldKey = `checkedId._${dataRow.id.toString()}` as any;
            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <li
                    className={elClassNames.bodyItemLi}
                    // noGutters
                    // height={height}
                    // isNonLine={isNonLine}
                    // trColor={trColor}
                    // isAppendData={!isEmpty(dataRow.appendData)}
                    onClick={dataRow.onClickRow}
                    // disabled={dataRow.disabled}
                >

                    {/* Checkbox 選取功能 */}
                    {/*{(isEnableChecked && hookFormControl) && (*/}
                    {/*    <ItemColumn style={{*/}
                    {/*        width: 48,*/}
                    {/*        flex: '0 0 48px'*/}
                    {/*    }}>*/}
                    {/*        <FormControl>*/}
                    {/*            <Controller*/}
                    {/*                control={hookFormControl}*/}
                    {/*                name={fieldKey}*/}
                    {/*                render={({field}) => {*/}
                    {/*                    return <Checkbox*/}
                    {/*                        {...field}*/}
                    {/*                        checked={field.value}*/}
                    {/*                        value={String(dataRow.id)}*/}
                    {/*                    />;*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </FormControl>*/}
                    {/*    </ItemColumn>*/}
                    {/*)}*/}

                    {/* 各欄位值 */}
                    {title.map(titleRow => {

                        return (<div
                            key={`tbodyTr_${dataRow.id}_${titleRow.field}`}
                            className={cx(elClassNames.itemColumn, titleRow.className)}
                            // col={titleRow.col ?? EColType.auto}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            style={titleRow.col === true ? {
                                flex: 1,
                            }:{
                                width: titleRow.width,
                                flex: `0 0 ${titleRow.width}px`
                            }}
                        >
                            {dataRow[titleRow.field] ?? ''}
                        </div>);
                    })}

                    {/*{isVisibleActions && (*/}
                    {/*    <ItemColumn*/}
                    {/*        align="right"*/}
                    {/*        style={{*/}
                    {/*            width: 100,*/}
                    {/*            flex: '0 0 100px'*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <ActionGroup>*/}
                    {/*            /!*編輯*!/*/}
                    {/*            {onEditRow && (*/}
                    {/*                <EditButton onClick={(event: any) => {*/}
                    {/*                    // metaKey: mac, ctrlKey: windows*/}
                    {/*                    onEditRow(dataRow.id, event.metaKey || event.ctrlKey);*/}
                    {/*                }}>*/}
                    {/*                    <Icon code="edit" color="#6435c9" size={22}/>*/}
                    {/*                </EditButton>*/}
                    {/*            )}*/}

                    {/*            /!*刪除*!/*/}
                    {/*            {onDeleteRow && (*/}
                    {/*                <DeleteButton onClick={() => onDeleteRow(dataRow.id)}>*/}
                    {/*                    <Icon code="trash" color="#dc3545" size={22}/>*/}
                    {/*                </DeleteButton>*/}
                    {/*            )}*/}
                    {/*        </ActionGroup>*/}

                    {/*    </ItemColumn>)*/}
                    {/*}*/}
                </li>

                {/*{dataRow.appendData && (*/}
                {/*    <AppendLine>*/}
                {/*        {dataRow.appendData}*/}
                {/*    </AppendLine>*/}
                {/*)}*/}

            </Fragment>);
        });


    };



    const tableFooterData = useMemo(() => {

        return footerData.map((dataRow, index) => {
            return ( <Fragment
                key={`tbodyTrFooter_${index}`}
            >
                <li
                    className={elClassNames.itemLi}
                    // height={30}
                    // isNonLine={true}
                    // isAppendData={false}
                    // trColor={trColor}
                >
                    <div
                        className={elClassNames.itemColumn}
                        data-align="right"
                        style={{
                            width: '100%',
                            flex: '0 0 100%'
                        }}
                    >
                        {dataRow}
                    </div>
                </li>

            </Fragment>);
        });


    }, [data]);




    return (<div
        className={elClassNames.bodyInnerContent}>
        <div className={elClassNames.bodySplitView}>
            <div className={elClassNames.bodySplitList}>
                <ul className={elClassNames.itemUl}>
                    {bodyData()}
                    {tableFooterData}
                </ul>
            </div>
        </div>
    </div>);
};

export default TableBody;

//
// const AppendLine = styled(ItemColumn)`
//     height: 34px;
//     background-color: transparent;
//     font-size: 13px;
//     margin-bottom: 20px;
//     z-index: 0;
// `;
//
//
// const ActionGroup = styled.div`
//  display: flex;
//  flex-direction: row;
//  justify-content: flex-end;
// `;
//
// const ActionButton = styled(Button)`
//   border-radius: 99em;
//   width: 30px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transition: background-color .1s;
//   margin-right: 5px;
//   margin-left: 5px;
//   padding: 0;
//
//   >svg {
//       transition: color .1s;
//   }
// `;
//
// const DeleteButton = styled(ActionButton)`
//   > svg{
//      color: #f35958;
//   }
//
//   :hover{
//      background: #f35958;
//
//      > svg{
//         color: #fff;
//      }
//   }
//
// `;
//
// const EditButton = styled(ActionButton)`
//   > svg{
//      color: #947eff;
//   }
//
//   :hover{
//      background: #7a43fd;
//
//      > svg{
//         color: #fff;
//      }
//   }
//
// `;
//
//
// const InnerContent = styled.div`
//   height: 100%;
//   margin-top: 0;
//   padding: 0;
//   //overflow: auto;
//   flex: 1 1 100%;
//   width: 100%;
// `;
//
//
//
//
// const ItemLi = styled(HeaderLi)<{
//     height: number,
//     isNonLine: boolean,
//     isAppendData: boolean,
//     trColor?: string,
//     noGutters?: boolean;
//     onClick?: () => void,
//     disabled?: boolean,
// }>`
//     //transition: background-color .1s, opacity .1s;
//     border-collapse: collapse;
//     border-top: 1px solid #343a40;
//     border-bottom: none;
//     height: ${props => props.height}px;
//     opacity: 1;
//     z-index: 2;
//
//
//
//     :first-child {
//         border-color: transparent;
//     }
//
//     :nth-of-type(2n) {
//         background-color: rgba(0,0,0,.04);
//     }
//
//     ${props => !props.isNonLine && css`
//         :hover{
//             background-color: rgba(57, 57, 130, .1);
//             color: #fff;
//             opacity: 1;
//         }
//     `}
//
//
//     &:last-child{
//         border: none;
//     }
//
//
//     ${props => props.isNonLine && css`
//         border-color: transparent;
//         //background-color:rgba(57, 57, 130, .1);
//         background-color: ${(props: any) => props.trColor ?? '#2b3035'};
//         margin-bottom: 2px;
//
//         :nth-of-type(2n), :hover {
//             background-color: ${(props: any) => props.trColor ?? '#2b3035'};
//         }
//
//
//         ${props.isAppendData && css`
//             margin-bottom: 0;
//         `}
//         //:hover{
//         //  background-color: rgba(57, 57, 130, .1);
//         //}
//     `}
//
//
//     ${props => props.disabled && css`
//       color: #6e6e6e;
//       background: #232323;
//
//       :nth-of-type(2n) {
//         color: #939393;
//         background: #232323;
//       }
//
//       :hover {
//         color: #fff;
//         background: rgb(45, 45, 45);
//       }
//     `};
//
// `;
//
//
// const SplitList = styled.div`
//     position: relative;
//     height: 100%;
//     //overflow-y: auto;
//     transition: all .5s ease;
// `;
//
//
//
// const SplitView = styled.div`
//     position: relative;
//     height: 100%;
// `;

