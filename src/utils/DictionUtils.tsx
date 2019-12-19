import { Select } from 'antd';
import React from 'react';
import { isNullOrUndefined } from 'util';

interface Diction {
    id: string;
    name: string;
    items: DictItem[];
}

interface DictItem {
    k: string;
    v: string;
}

/**
 * 代码字典工具类
 */
export class DictionUtils {
    /**
     * 获取代码字典中条码数组
     * @param dict 代码字典
     */
    public static getDictOptions(dict: Diction) {
        const options: any = [];
        if (dict) {
            const items: DictItem[] = dict.items;
            items.forEach((item: DictItem) => {
                options.push(<Select.Option value={item.k} key={item.k}>{item.v}</Select.Option>);
            });
        }
        return options;
    }
    /**
     * 获取代码字典的初始值
     * @param value 
     */
    public static getDictInitValue(value: string) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        else {
            return '' + value;
        }
    }

    /**
     * 获取代码字典中条码数组
     * @param dict 代码字典
     */
    public static getDictCheckboxOptions(dict: Diction) {
        const options: any = [];
        if (dict) {
            const items: DictItem[] = dict.items;
            items.forEach((item: DictItem) => {
                options.push({ label: item.v, value: item.k });
            });
        }
        return options;
    }

    /**
     * 根据code，获取指定的代码字典中的mean值
     * @param dict 代码字典
     * @param code 代码
     */
    public static getItemValue(dict: Diction, code: string) {
        if (!isNullOrUndefined(dict)) {
            if (!isNullOrUndefined(dict.items)) {
                const dictItem = dict.items.find((value: DictItem) => {
                    if (value.k == code) {
                        return true;
                    }
                    return false;
                });
                if (!isNullOrUndefined(dictItem)) {
                    return dictItem.v;
                }
            }
        }
        return code;
    }
    /**
     * 构建JiaControl代码字典数组
     */
    public static buildJiaControlDictions(dictions: Diction[] = []): Diction[] {
        const dict: Diction[] = [] as Diction[];
        if (dictions.length > 0) {
            dictions.forEach((d: Diction) => {
                dict.push({ ...d, id: d.name });
            });
        }
        return dict;
    }
}