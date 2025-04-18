import {TFooter, TTableTitle, TBodyDataFieldKey, TBodyDataField, TCollapseEvent, ETableMode} from '../types';
import {getCalcStickyLeftStyles} from '../utils';
import {objectKeys} from '@acrool/js-utils/object';
import {getFooterClassNameConfig, getFooterColSpanConfig, getFooterConfig, getFooterStickyLeftConfig} from './utils';
import React, {JSX, ReactNode} from 'react';
import styles from '../styles.module.scss';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data: TFooter<K>[]
    tableMode: ETableMode
}








/**
 * Table Footer
 * 額外顯示資訊 例如統計
 */
const Footer = <K extends TBodyDataFieldKey>({
    title,
    data,
    tableMode,
}: IProps<K>) => {


    /**
     * 取得資料內容
     * @param field
     * @param isActive
     * @param collapse
     */
    const getFooterData = (field: TBodyDataField<K>[K]) => {
        if(typeof field === 'boolean'){
            return String(field);
        }

        if(typeof field === 'object' && field !== null && 'value' in field){
            return field.value;
        }

        return field as ReactNode;
    };


    /**
     * 產生表格內容
     */
    const renderFooterData = () => {


        return data.map((dataRow, index) => {

            const colSpanConfig = getFooterColSpanConfig(title, data);
            const stickyLeftConfig = getFooterStickyLeftConfig(title, data);

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const footerField = dataRow[titleKey];
                    const config = getFooterConfig(footerField);
                    const titleRow = title[titleKey];


                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };


                    const colSpan = colSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }

                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];
                    const children = getFooterData(footerField);

                    const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, titleRow.sticky);

                    const args = {
                        className: getFooterClassNameConfig(footerField),
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
                        'data-sticky': titleRow.sticky,
                        colSpan: colSpan > 1 ? colSpan: undefined,
                        style: {
                            ...stickyLeftStyles,
                        },
                        children: tableMode === ETableMode.cell ? <>
                            <div className={styles.cellTd}>{titleRow.text}</div>
                            <div className={styles.cellTd}>{children}</div>
                        </>:
                            children,
                    };
                    return [
                        ...curr,
                        <td
                            key={`tfootTd_${index}_${titleKey}`}
                            {...args}
                        />,
                    ];
                }, []);

            return (<tr
                key={`tfootTr_${index}`}
            >
                {tds}
            </tr>);
        });
    };

    return <tfoot className="acrool-react-table__content">
        {renderFooterData()}
    </tfoot>;
};

export default Footer;
