import React, {Fragment} from 'react';
import cx from 'classnames';

// Components
import {IData, TDataFooterContent, ITitle} from '../types';
import elClassNames from '../el-class-names';
import {getCol} from '../utils';


interface IProps {
    title: ITitle[],
    data: IData[],
    dataFooterContent?: TDataFooterContent,
}


/**
 * Table
 */
const TableBody = ({
    title = [],
    data = [],
    dataFooterContent,
}: IProps) => {


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

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
                    // isAppendData={!isEmpty(dataRow.appendData)}
                    onClick={dataRow.onClickRow}
                    data-disabled={dataRow.disabled}
                >
                    {/* 各欄位值 */}
                    {title.map(titleRow => {
                        return (<div
                            key={`tbodyTr_${dataRow.id}_${titleRow.field}`}
                            className={cx(elClassNames.itemColumn, titleRow.className)}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                            style={getCol(titleRow.col)}
                        >
                            {dataRow[titleRow.field] ?? ''}
                        </div>);
                    })}
                </li>

                {/*{dataRow.appendData && (*/}
                {/*    <AppendLine>*/}
                {/*        {dataRow.appendData}*/}
                {/*    </AppendLine>*/}
                {/*)}*/}

            </Fragment>);
        });


    };


    /**
     * 產生表格底部顯示
     * ex: 額外顯示資訊 例如統計
     */
    const renderTableFooterData = () => {

        return <li className={elClassNames.bodyItemLi}>
            <div className={elClassNames.itemColumn} style={getCol(true)}>{dataFooterContent}</div>
        </li>


    };




    return (<div
        className={elClassNames.bodyInnerContent}>
        <div className={elClassNames.bodySplitView}>
            <div className={elClassNames.bodySplitList}>
                <ul className={elClassNames.itemUl}>
                    {renderBodyData()}
                    {renderTableFooterData()}
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

