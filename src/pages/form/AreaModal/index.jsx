import React from 'react';
import { Modal } from 'antd';
import Area from "../AreaModal/Area";
// import { chinaData } from './china-data.js';
import '../AreaModal/index.less';
// import { cityeCodes } from "../../../../utils/ChinaCityCode";
import { cityeCodes } from '../AreaModal/china-data'

const newCityCodes = [];
let totalArea = 0;
cityeCodes.forEach(areaitem => {
    const areaItem = {};
    areaItem.areaCode = areaitem.code;
    areaItem.areaName = areaitem.name;
    areaItem.total = 0;
    areaItem.children = [];

    areaitem.child instanceof Array &&
        areaitem.child.forEach(provinceitem => {
            const provinceItem = {};
            provinceItem.provinceCode = provinceitem.code;
            provinceItem.provinceName = provinceitem.name;
            provinceItem.areaCode = areaitem.code;
            provinceItem.areaName = areaitem.name;
            provinceItem.total = 0;
            provinceItem.children = [];

            provinceitem.child instanceof Array &&
                provinceitem.child.forEach(cityitem => {
                    const cityItem = {};
                    cityItem.cityCode = cityitem.code;
                    cityItem.cityName = cityitem.name;
                    cityItem.provinceName = provinceitem.name;
                    cityItem.provinceCode = provinceitem.code;
                    cityItem.areaCode = areaitem.code;
                    cityItem.areaName = areaitem.name;
                    cityItem.children = [];

                    cityitem.child instanceof Array && cityitem.child.forEach(countyitem => {
                        const countyItem = {};
                        countyItem.countyCode = countyitem.code;
                        countyItem.countyName = countyitem.name;
                        countyItem.cityCode = cityitem.code;
                        countyItem.cityName = cityitem.name;
                        countyItem.provinceName = provinceitem.name;
                        countyItem.provinceCode = provinceitem.code;
                        countyItem.areaCode = areaitem.code;
                        countyItem.areaName = areaitem.name;
                        cityItem.children.push(countyItem)
                    })
                    provinceItem.total = provinceItem.total + cityItem.children.length;
                    provinceItem.children.push(cityItem);
                });
                areaItem.total = areaItem.total + provinceItem.children.length;
                areaItem.children.push(provinceItem);
        })
    newCityCodes.push(areaItem);
    totalArea = totalArea + areaItem.total;
});
export default class AreaModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // new 新的参数
            allCityeCodes: null,
            areaOrigin: {},
            cateOrigin: {},
            checkAll: false,
            // newData: this.props.chinaCityInfoList,
            chinaCityInfoList: []
        }
    }

    componentDidMount() {
        this.formateData();
    }

    formateData = () => {
        // cityCodes 需要修改为正确的数值，此为本地开发测试
        const { type, data = cityeCodes } = this.props;
        const { checkAll } = this.state
        // console.log(this.props.chinaCityInfoList, 'formateData props')
        console.log(newCityCodes, 'formate newCityCodes')
        // if(type === 'area') {
            let areaOrigin = []
            if(checkAll) {
                areaOrigin = newCityCodes.reduce((curArea, areaItem) => {
                    const provinceObj = areaItem.child.reduce((curProvince, provinceItem) => {
                        const cityObj = provinceItem.child.reduce((curCity, cityItem) => {
                            // console.log(curCity, 'log cur City ')
                            const countyObj = cityItem.child.reduce((curCounty, countyItem) => {
                                curCounty[countyItem.code] = {
                                    countyCode: countyItem.code,
                                    countyName: countyItem.name,
                                    father: cityItem,
                                }
                                return curCounty;
                            }, {});
                            curCity[cityItem.code] = {
                                cityCode: cityItem.code,
                                cityName: cityItem.name,
                                countyObj,
                                father: provinceItem,
                            }
                            return curCity
                        }, {});
                        curProvince[provinceItem.code] = {
                            provinceCode: provinceItem.code,
                            provinceName: provinceItem.name,
                            cityObj,
                            father: areaItem,
                        }
                        return curProvince;
                    }, {});
                    curArea[areaItem.code] = {
                        areaCode: areaItem.code,
                        areaName: areaItem.name,
                        provinceObj
                    }
                    return curArea;
                }, {})
                console.log(areaOrigin, '11 areaOrigin')
            }else {
                console.log(data, Array.isArray(data), 'get data')
                areaOrigin = data.reduce((curArea, areaItem) => {
                    /*
                     areaItem = {
                         child: [],
                         name: '',
                         code: 0,
                        }
                    */
                    const provinceObj = areaItem.child.reduce((curProvince, provinceItem) => {
                        const cityObj = provinceItem.child.reduce((curCity, cityItem) => {
                            console.log(curCity, 'log cur City 2222')
                            const areaObj = cityItem.child.reduce((curCounty, countyItem) => {
                                curCounty[countyItem.code] = {
                                    countyCode: countyItem.code,
                                    countyName: countyItem.name,
                                    father: cityItem,
                                }
                                return curCounty;
                            }, {});
                            curCity[cityItem.code] = {
                                cityCode: cityItem.code,
                                cityName: cityItem.name,
                                areaObj,
                                father: provinceItem,
                            }
                            return curCity
                        }, {});
                        curProvince[provinceItem.code] = {
                            provinceCode: provinceItem.code,
                            provinceName: provinceItem.name,
                            cityObj,
                            father: areaItem,
                        }
                        return curProvince;
                    }, {});
                    curArea[areaItem.code] = {
                        areaCode: areaItem.code,
                        areaName: areaItem.name,
                        provinceObj
                    }
                    return curArea;
                }, {})
                console.log(areaOrigin, '22 areaOrigin')
            }
            
            this.setState(() => ({
                areaOrigin, checkAll
            }))
        // }
    }

    /**
     * 子组件更新父组件state
     */
    upDataParentState = (obj,cb) => {
        this.setState(obj,cb);
    };

    handleOK = () => {
        // const { areaOrigin, cateOrigin, checkAll } = this.state;
        // console.log(areaOrigin, 'areaOrigin')
        // const result = [];
        // if(!checkAll) {
        //     Object.keys(areaOrigin).forEach((areaKey) => {
        //         const { areaName, areaCode, provinceObj = {}} = areaOrigin[areaKey];
        //         const provinceList = [];
        //         Object.keys(provinceObj).forEach((provinceKey) => {
        //             const { provinceName, provinceCode, cityObj = {} } = provinceObj[provinceKey];
        //             const cityList = [];
        //             Object.keys(cityObj).forEach((cityKey) => {
        //                 const { cityName, cityCode, countyObj = {} } = provinceObj[cityKey];
        //                 const countyList = [];
        //                 Object.keys(countyObj).forEach((countyKey) => {
        //                     const { countyCode, countyName } = countyObj[countyKey];
        //                     countyCode && countyList.push({
        //                         countyCode,
        //                         countyName
        //                     })
        //                 })
        //                 cityCode && cityList.push({
        //                     cityCode,
        //                     cityName,
        //                     countyList
        //                 })
        //             })
        //             provinceCode && provinceList.push({
        //                 provinceCode,
        //                 provinceName,
        //                 cityList
        //             })
        //         })
        //         areaCode && areaList.push({
        //             areaCode,
        //             areaName,
        //             areaList
        //         })
        //     })
        // }
        // this.props.onOk(result,checkAll );
    }

    render () {
        // const { isShowAreaDialog, cancelArea, chinaCityInfoList } = this.props;
        const { type, isShowAreaDialog, cancelArea, groupID, loading } = this.props;
        const { areaOrigin, cateOrigin, checkAll, chinaCityInfoList } = this.state;
        // console.log(chinaCityInfoList, 'default chinaCityInfoList')
        return (
            <Modal
                title="地区选择"
                visible={isShowAreaDialog}
                onCancel={cancelArea}
                onOk={this.handleOK}
                width={680}
                // maskClosable={false}
                // confirmLoading={loading}
                okText="保存"
            >
                <div className="content_wrap">
                    <Area 
                        data={areaOrigin} 
                        upDataParentState={this.upDataParentState} 
                        checkAll={checkAll} 
                        newCityCodes={newCityCodes}
                    />
                </div>
            </Modal>
        )
    }
}