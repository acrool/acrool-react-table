import {isEmpty} from '@acrool/js-utils/equal';
import {objectKeys} from '@acrool/js-utils/object';
import React, {JSX, ReactNode} from 'react';

import {
    getFooterClassNameConfig,
    getFooterColSpanConfig,
    getFooterConfig, getFooterRowSpanConfig,
    getFooterStickyLeftConfig
} from '../Footer/utils';
import styles from '../styles.module.scss';
import {ETableMode,TBodyDataDetail, TBodyDataField, TBodyDataFieldKey, TCollapseEvent, TTableTitle} from '../types';
import {getCalcStickyLeftStyles} from '../utils';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data: ReactNode | TBodyDataDetail<K>[]
    tableMode: ETableMode
}








/**
 * Table Body Detail
 * 額外顯示資訊 例如 詳細
 */
const BodyDetail = <K extends TBodyDataFieldKey>({
    title,
    data,
    tableMode,
}: IProps<K>) => {

    /**
     * 取得資料內容
     * @param field
     */
    const getBodyDetailData = (field: TBodyDataField<K>[K]) => {

        if(typeof field === 'boolean'){
            return String(field);
        }

        if(typeof field === 'object' && field !== null && 'value' in field){
            return field.value;
        }

        return field as ReactNode;
    };


    if(Array.isArray(data)){
        const content = data.map((dataRow, index) => {

            const rowSpanConfig = getFooterRowSpanConfig(title, data);
            const colSpanConfig = getFooterColSpanConfig(title, data);
            const stickyLeftConfig = getFooterStickyLeftConfig(title, data);

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const datDetailField = dataRow[titleKey];
                    const config = getFooterConfig(datDetailField);
                    const titleRow = title[titleKey];


                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };



                    const colSpan = colSpanConfig?.[index]?.[titleKey];
                    const rowSpan = rowSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }

                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];
                    // const children = datDetailField?.value;
                    const children = getBodyDetailData(datDetailField);

                    const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, titleRow.sticky);

                    const args = {
                        className: getFooterClassNameConfig(datDetailField),
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
                        'data-sticky': titleRow.sticky,
                        colSpan: colSpan > 1 ? colSpan: undefined,
                        rowSpan: rowSpan > 1 ? rowSpan: undefined,
                        style: {
                            ...stickyLeftStyles,
                        },
                        children: tableMode === ETableMode.cell ?
                            <div className={styles.cellTd}>{children}</div>:
                            children,
                    };

                    if(tableMode === ETableMode.cell && isEmpty(children)){
                        return [
                            ...curr,
                        ];
                    }
                    return [
                        ...curr,
                        <td
                            key={`tfootTd_${index}_${titleKey}`}
                            {...args}
                        />,
                    ];
                }, []);

            return (<tr
                key={`detailTr_${index}`}
                className={styles.cellDetailTr}
            >
                {tds}
            </tr>);
        });

        return <>
            {content}
        </>;
    }


    // 單純資料(非列表)
    const colSpan = objectKeys(title).length;
    return <tr>
        <td colSpan={colSpan}>
            {data as ReactNode}
        </td>
    </tr>;

};

export default BodyDetail;
