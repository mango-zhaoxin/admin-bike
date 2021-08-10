import React, { Component } from "react";
import { Checkbox } from "antd";

export default class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeArea: 0,
            activeAreaCode: 1,
            activeAreaName: '华东',
            activeProvince: 0,
            activeProvinceCode: 31,
            activeProvinceName: '上海市',
            activeCity: 0,
            activeCityCode: 3101,
            activeCityName: '上海市',
        };
    }


    /**
    * 点击行
    */
    onclickItem = (type, index, code, name) => {
        const { newCityCodes = [] } = this.props;
        if (type === "area") {
            // console.log( index, code, name)
            console.log('area')
            this.setState(() => ({
                activeArea: index + 1, // 加1是因为 activeArea 索引从1开始
                activeAreaCode: code,
                activeAreaName: name,
                activeProvince: 0,
                activeProvinceCode: newCityCodes[index].children[0].provinceCode,
                activeProvinceName: newCityCodes[index].children[0].provinceCode,
                activeCity: 0,
                activeCityCode: newCityCodes[index].children[0].children[0].cityCode,
                activeCityName: newCityCodes[index].children[0].children[0].cityName
            }))
        } else if (type === 'province') {
            console.log('province')
            // console.log(newCityCodes[index].children[0], 'child info')
            this.setState(() => ({
                activeProvince: index,
                activeProvinceCode: code,
                activeProvinceName: name,
                activeCity: 0,
                activeCityCode: newCityCodes[index].children[0].children[0].cityCode,
                activeCityName: newCityCodes[index].children[0].children[0].cityName
            }))
        } else if (type === 'city') {
            // console.log( index, code, name)
            console.log(newCityCodes, code, name, 'new CityCodes ')
            this.setState(() => ({
                activeCity: index,
                activeCityCode: code,
                activeCityName: name
            }))
        }
    }

    /**
     * 选择全国
     */
    checkAll = (e) => {
        e.stopPropagation();
        const checked = e.target.checked;
        console.log('checked fired', checked)
        this.props.upDataParentState((state) => {
            let { areaOrigin } = state
            if (checked) {
                // 选择全国的话，newCityCodes 取的是包含所有大区的数组
                const { newCityCodes = [] } = this.props;
                areaOrigin = newCityCodes.reduce((curArea, areaItem) => {
                    // provinceObj 取的是包含所有省份的数组
                    const provinceObj = areaItem.children.reduce((curProvince, provinceItem) => {
                        // cityObj 包含该省份下的所有城市的数组
                        const cityObj = provinceItem.children.reduce((curCity, cityItem) => {
                            // countyObj 包含该城市下的所有区域的数组
                            const countyObj = cityItem.children.reduce((curCounty, countyItem) => {
                                curCounty[countyItem.countyCode] = countyItem
                                return curCounty;
                            }, {});
                            curCity[cityItem.cityCode] = {
                                cityCode: cityItem.cityCode,
                                cityName: cityItem.cityName,
                                countyObj
                            }
                            return curCity
                        }, {});
                        curProvince[provinceItem.provinceCode] = {
                            provinceCode: provinceItem.provinceCode,
                            provinceName: provinceItem.provinceName,
                            cityObj
                        }
                        return curProvince;
                    }, {});
                    curArea[areaItem.areaCode] = {
                        areaCode: areaItem.areaCode,
                        areaName: areaItem.areaName,
                        provinceObj
                    }
                    return curArea;
                }, {})

            } else {
                areaOrigin = {}
            }
            console.log('全国：areaOrigin', areaOrigin)
            return Object.assign(state, { areaOrigin, checkAll: checked })
        })

    }

    /**
     *  选择大区 
     */
    checkArea = (e, item, index) => {
        console.log(e, item, index, '点中的大区信息')
        // console.log('大区')
        e.stopPropagation();
        const checked = e.target.checked;
        console.log(checked, 'checked')

        this.props.upDataParentState(({ areaOrigin }) => {
            if (checked) {
                const { newCityCodes = [] } = this.props;
                console.log( newCityCodes[index].children, 'get infos')
                const provinceObj = newCityCodes[index].children.reduce((curProvince, provinceItem) => {
                    const cityObj = provinceItem.children.reduce((curCity, cityItem) => {
                        const countyObj = cityItem.children.reduce((curCounty, countyItem) => {
                            curCounty[countyItem.countyCode] = countyItem;
                            // console.log(curCounty, 'county')
                            return curCounty;
                        }, {});
                        curCity[cityItem.cityCode] = {
                            cityCode: cityItem.cityCode,
                            cityName: cityItem.cityName,
                            countyObj
                        }
                        // console.log(curCity, 'city')
                        return curCity;
                    }, {});
                    curProvince[provinceItem.provinceCode] = {
                        provinceCode: provinceItem.provinceCode,
                        provinceName: provinceItem.provinceName,
                        cityObj
                    }
                    // console.log(curProvince, 'province')
                    return curProvince
                }, {});
                areaOrigin[item.areaCode] = {
                    areaCode: item.areaCode,
                    areaName: item.areaName,
                    provinceObj
                }
            } else {
                console.log('大区勾选取消')
                // console.log(areaOrigin[item.areaCode], 'info-kk')
                delete areaOrigin[item.areaCode];
            }
            console.log('大区：areaOrigin', areaOrigin)
            return { areaOrigin, checkAll: false }
        })
    }

    /**
     * 选择省份 
     */
    checkProvince = (e, item, index) => {
        // console.log('省份')
        e.stopPropagation();
        const checked = e.target.checked;
        const { activeArea, activeAreaCode, activeAreaName, activeProvince, activeProvinceCode, activeProvinceName } = this.state;
        this.props.upDataParentState(({ areaOrigin }) => {
            console.log(item, index, areaOrigin, 'log check province all data')
            if (checked) {
                const { newCityCodes = [] } = this.props;
                const cityList = newCityCodes[activeArea].children[index].children;

                if (areaOrigin[activeAreaCode]) {
                    if (areaOrigin[activeAreaCode].provinceObj[item.provinceCode]) {
                        areaOrigin[activeAreaCode].provinceObj[item.provinceCode].cityObj = cityList.reduce((curCity, cityItem) => {
                            console.log(cityItem, 'log city item 1111')
                            curCity[cityItem.cityCode] = cityItem
                            return curCity;
                        }, {})
                    } else {
                        const cityObj = cityList.reduce((curCity, cityItem) => {
                            curCity[cityItem.cityCode] = cityItem
                            return curCity;
                        }, {});
                        areaOrigin[activeAreaCode].provinceObj[item.provinceCode] = {
                            provinceCode: item.provinceCode,
                            provinceName: item.provinceName,
                            cityObj
                        }
                    }
                } else {
                    const cityObj = cityList.reduce((curCity, cityItem) => {
                        curCity[cityItem.cityCode] = cityItem
                        return curCity;
                    }, {})
                    areaOrigin[activeAreaCode] = {
                        areaName: activeAreaName,
                        areaCode: activeAreaCode,
                        provinceObj: {
                            [item.provinceCode]: {
                                provinceCode: item.provinceCode,
                                provinceName: item.provinceName,
                                cityObj
                            }
                        }
                    }
                }
            } else {
                console.log('省份勾选取消')
                const provinceObj = areaOrigin[activeAreaCode].provinceObj;
                delete provinceObj[item.provinceCode];
                if (Object.keys(provinceObj).length === 0) {
                    delete areaOrigin[activeArea];
                }
            }
            console.log('省份：areaOrigin', areaOrigin)
            return { areaOrigin, checkAll: false }
        });
    }

    /**
     * 选择城市 
     */
    checkCity = (e, item, index) => {
        // console.log('城市', e, item , index)
        // console.log(areaOrigin[activeAreaCode], 'areaOrigin[activeAreaCode]')
        const checked = e.target.checked;
        const { activeArea, activeAreaCode, activeAreaName, activeProvince, activeProvinceCode, activeProvinceName } = this.state;
        this.props.upDataParentState((state) => {
            let { areaOrigin } = state

            if (checked) {
                const { newCityCodes = [] } = this.props;
                console.log(item, 'log city all data')
                const countyList = newCityCodes[activeArea].children[activeProvince].children[index].children;

                console.log( areaOrigin, areaOrigin, areaOrigin, activeProvinceCode,'get city111')

                if (areaOrigin[areaOrigin]) {
                    if (areaOrigin[activeAreaCode].provinceObj) {
                        if (areaOrigin[activeAreaCode].areaOrigin[activeProvinceCode]) {
                            if(areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj) {
                                areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj[item.cityCode].countyObj = countyList.reduce((curCounty,countyItem) => {
                                    curCounty[countyItem.countyCode] = countyItem;
                                    return curCounty;
                                }, {})
                            } else {
                                const countyObj = countyList.reduce((curCounty,countyItem) => {
                                    curCounty[countyItem.countyCode] = countyItem;
                                    return curCounty;
                                }, {})
                                areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj[item.cityCode] = {
                                    cityCode: item.cityCode,
                                    cityName: item.cityName,
                                    countyObj
                                }
                            }
                            
                        } else {
                            areaOrigin[activeAreaCode].provinceObj[activeProvinceCode] = {
                                provinceName: activeProvinceName,
                                provinceCode: activeProvinceCode,
                                cityObj: {
                                    [item.cityCode]: item
                                }
                            }
                        }
                    } else {
                        areaOrigin[activeAreaCode].provinceObj = {
                            areacode: activeAreaCode,
                            areaName: activeAreaName,
                            provinceObj: {
                                [item.provinceCode]: item
                            }
                        }
                    }
                } else {
                    // 作用是当areaOrigin 没有数据时赋予新的数值
                    console.log(countyList, 'county item bbbbbbbbb hhhh')
                    const countyObj = countyList.reduce((curCounty, countyItem, index) => {
                        curCounty[countyItem.countyCode] = countyItem;
                        return curCounty;
                    }, {})
                    // TODO hack 此处加1是因为activeArea索引是从0开始 与数据不符
                    areaOrigin[activeArea + 1] = {
                        areaName: activeAreaName,
                        areaCode: activeAreaCode,
                        provinceObj: {
                            [activeProvince]: {
                                provinceCode: activeProvinceCode,
                                provinceName: activeProvinceName,
                                cityObj: {
                                    [item.cityCode]: {
                                        cityCode: item.cityCode,
                                        cityName: item.cityName,
                                        countyObj,
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                console.log('城市勾选取消')
                // todo 没有勾选城市的处理
                const cityObj = areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj;
                console.log(cityObj, 'get cityObj')
                delete cityObj[item.cityCode];
                if (Object.keys(cityObj).length === 0) {
                    delete areaOrigin[activeAreaCode].provinceObj[activeProvinceCode];
                    if (Object.keys(areaOrigin[activeAreaCode].provinceObj).length === 0) {
                        delete areaOrigin[activeAreaCode]
                    }
                }
            }
            console.log(areaOrigin, checked, 'area origin is what')
            return Object.assign(state, { areaOrigin, checkAll: checked });
        });
    }

    /**
     * 选择区域 
     */
    checkCounty = (e, item, index) => {
        // console.log('区域')
        const checked = e.target.checked;
        const { activeAreaCode, activeAreaName, activeProvinceCode, activeProvinceName, activeCityCode, activeCityName } = this.state;
        this.props.upDataParentState(({ areaOrigin }) => {
            if (checked) {
                if (areaOrigin[activeAreaCode]) {
                    if (areaOrigin[activeAreaCode].provinceObj) {
                        if (areaOrigin[activeAreaCode].provinceObj[activeProvinceCode]) {
                            if(areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj) {
                                if(areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj[activeCityCode]) {
                                    areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj[activeCityCode].areaObj[item.areaCode] = item;
                                }else {
                                    areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj[activeCityCode] = {
                                        cityCode: activeCityCode,
                                        cityName: activeCityName,
                                        areaObj: {
                                            [item.areaCode]: item
                                        }
                                    }
                                }
                            }else {
                                areaOrigin[activeAreaCode].provinceObj[activeProvinceCode].cityObj = {
                                    [activeCityCode]: {
                                        cityCode: activeCityCode,
                                        cityName: activeCityName,
                                        areaObj: {
                                            [item.areaCode]: item
                                        }
                                    }
                                }
                            }
                        } else {
                            areaOrigin[activeProvinceCode] = {
                                provinceName: activeProvinceName,
                                provinceCode: activeProvinceCode,
                                cityObj: {
                                    [activeCityCode]: {
                                        cityCode: activeCityCode,
                                        cityName: activeCityName,
                                        areaObj: {
                                            [item.areaCode]: item
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        areaOrigin[activeAreaCode].provinceObj = {
                            [activeProvinceCode]: {
                                provinceName: activeProvinceName,
                                provinceCode: activeProvinceCode,
                                cityObj: {
                                    [activeCityCode]: {
                                        cityCode: activeCityCode,
                                        cityName: activeCityName,
                                        areaObj: {
                                            [item.areaCode]: item
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    areaOrigin[activeAreaCode] = {
                        [activeAreaCode]: {
                            areaCode: activeAreaCode,
                            areaName: activeAreaName,
                            provinceObj: {
                                [activeProvinceCode]: {
                                    provinceName: activeProvinceName,
                                    provinceCode: activeProvinceCode,
                                    cityObj: {
                                        [activeCityCode]: {
                                            cityCode: activeCityCode,
                                            cityName: activeCityName,
                                            areaObj: {
                                                [item.areaCode]: item
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return { areaOrigin }
            } else {
                //todo 没处理
                const areaObj = areaOrigin[activeProvinceCode].cityObj[activeCityCode].areaObj;
                delete areaObj[item.areaCode];
                if (Object.keys(areaObj).length === 0) {
                    delete areaOrigin[activeProvinceCode].cityObj[activeCityCode];
                    if (Object.keys(areaOrigin[activeProvinceCode].cityObj).length === 0) {
                        delete areaOrigin[activeProvinceCode];
                    }
                }
            }
            return { areaOrigin, checkAll: false };
        });
    }

    render() {
        const { data = {}, checkAll, newCityCodes = [] } = this.props;
        // console.log(this.props, 'inner props')
        // console.log(data, 'data =>', checkAll, 'checkAll=>')
        const { activeArea, activeProvince, activeCity, activeAreaCode, activeProvinceCode, activeCityCode, chinaCityInfoList } = this.state;

        const areaObj = data[activeAreaCode] || {}
        const provinceObj = areaObj.provinceObj || {}
        const city = provinceObj[activeProvinceCode] || {}
        const cityObj = city.cityObj || {}
        const county = cityObj[activeCityCode] || {}
        console.log(county, 'log county 00000')
        const countyObj = county.countyObj || {}
        return (
            <div className="area_wrap">

                <div className="area_zero">
                    <div>
                        <Checkbox
                            checked={checkAll}
                            onChange={e => this.checkAll(e)}
                            // indeterminate={selectAreaTotal > 0 && totalArea !== selectAreaTotal}
                        >
                            全国
                        </Checkbox>
                    </div>
                
                    {/* 大区勾选 */}
                    <div style={{ marginLeft: 10 }}>
                        {console.log(newCityCodes, '大区勾选')}
                        {
                            newCityCodes.map(({ areaName, areaCode, total }, index) => {
                                console.log({ areaName, areaCode, total }, 'info---')

                                let selectTotal = 0;
                                if (data[areaCode] && data[areaCode].provinceObj) {
                                    const provinceObj = data[areaCode].provinceObj;
                                    Object.keys(provinceObj).forEach((key) => {
                                        if (typeof provinceObj[key] === 'object' && typeof provinceObj[key].cityObj === 'object') {
                                            selectTotal = selectTotal + Object.keys(provinceObj[key].cityObj).length
                                        }
                                    })
                                }
                                let provinceNum = 0;
                                if (data[areaCode] && data[areaCode].provinceObj) {
                                    const provinceArr = Object.keys(data[areaCode].provinceObj);
                                    provinceNum = provinceArr.length;
                                }
                                const active = index == activeArea;
                                console.log(total, selectTotal, areaName,'get num info')
                                return (
                                    <div key={areaCode} className={active ? "p_item_active" : "p_item"} onClick={() => { this.onclickItem('area', index, areaCode, areaName) }}>
                                        <Checkbox
                                            checked={total === selectTotal}
                                            onChange={e => this.checkArea(e, { areaName, areaCode }, index)}
                                            indeterminate={selectTotal > 0 && total !== selectTotal}
                                        />
                                        <span className={"name_normal"}>
                                            <span className={!active ? "title" : 'title_active'}>{areaName}</span><span className={!active ? "area_num" : "area_num_active"}>{`(${provinceNum})`}</span>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* 省份勾选 */}
                <div className="area_second">
                    {console.log(newCityCodes[activeArea].children, '省份内容')}
                    {/* {newCityCodes[activeArea].children[activeProvince].children[activeCity]} */}
                    {
                        newCityCodes[activeArea].children.map(( { provinceName, provinceCode, children }, index ) => {
                            console.log(areaObj,provinceObj, data, 'cityObj==')
                            const provinceArr = provinceObj ? Object.keys(provinceObj) : [];
                            const indeterminate = provinceArr.length > 0 && provinceArr.length !== children.length

                            const active = index == activeProvince;

                            return (
                                <div key={provinceCode}  className={active ? "c_item_active" : "c_item"}>
                                    <Checkbox 
                                        checked={provinceArr.length === children.length}
                                        onChange={e => this.checkProvince(e, { provinceName, provinceCode }, index)}
                                        indeterminate={indeterminate}
                                    />
                                    <span className={"name_normal"} onClick={() => { this.onclickItem('province', index, provinceCode, provinceName) }}>
                                        <span className={!active ? "title" : 'title_active'}>{provinceName}</span><span className={!active ? "area_num" : "area_num_active"}>{`(${provinceArr.length || 0})`}</span>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>

                {/* 市勾选 */}
                <div className="area_third">
                    {/* {console.log(newCityCodes[activeArea].children[activeProvince].children, '第三')} */}
                    {/* {newCityCodes[activeArea].children[activeProvince].children.map} */}
                    {
                        newCityCodes[activeArea].children[activeProvince].children.map(({ cityCode, cityName, children }, index,) => {
                            const areaArr = countyObj ? Object.keys(countyObj) : [];
                            console.log(areaArr, children, countyObj, 'children area arr')
                            // 根据areaArr.length 和 children.length判断是否checked方式不准确
                            const indeterminate = areaArr.length > 0 && areaArr.length !== children.length;
                            const active = index == activeCity;
                            return (
                                <div key={cityCode} className={active ? "c_item_active" : "c_item"} >
                                    <Checkbox
                                        checked={areaArr.length === children.length}
                                        onChange={e => this.checkCity(e, { cityCode, cityName, provinceObj }, index)}
                                        indeterminate={indeterminate}
                                    />
                                    <span className={"name_normal"} onClick={() => { this.onclickItem('city', index, cityCode, cityName) }}>
                                        <span className={!active ? "title" : 'title_active'}>{cityName}</span><span className={!active ? "area_num" : "area_num_active"}>{`(${areaArr.length || 0})`}</span>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>

                {/* 区勾选 */}
                <div className="area_third">
                    {
                        // newCityCodes[activeArea].children[activeProvince].children[activeCity].children
                        newCityCodes[activeArea].children[activeProvince].children[activeCity].children.map(({ countyCode, countyName, }, index) => {
                            // console.log('%c 🍆 countyObj: ', 'font-size:20px;background-color: #B03734;color:#fff;', countyObj);
                            // console.log( newCityCodes, 'info')

                            console.log(countyObj, countyCode, 'log county info')
                            const checked = countyObj ? Object.keys(countyObj).includes(countyCode + '') : false;
                            return (
                                <div key={countyCode} className="c_item">
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => this.checkCounty(e, { countyCode, countyName }, index)}
                                    />
                                    <span className={"name_normal"}>
                                        <span className="title">{countyName}</span>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

