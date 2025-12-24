class ProductCompare{constructor(){this.compareData=[],this.currentProductType=""}initComparePage(){document.getElementById("compareContent").innerHTML=`
            <div id="compareTableContainer" class="compare-table-container">
                <p class="no-data">暂无对比数据，请从筛选结果页面添加产品进行对比</p>
            </div>
        `,this.updateComparePage()}addToCompare(r,e){this.currentProductType&&this.currentProductType!==e&&(this.compareData=[]),this.currentProductType=e,-1===this.compareData.findIndex(e=>e.model===r.model)&&this.compareData.push(r),this.updateComparePage()}updateComparePage(){var e=document.getElementById("compareTableContainer");if(e)if(0===this.compareData.length)e.innerHTML='<p class="no-data">暂无对比数据，请从筛选结果页面添加产品进行对比</p>';else{let o=`
            
            <style>
                .compare-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 14px;
                    text-align: left;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    overflow-x: auto;
                    display: block;
                    transition: all 0.3s ease;
                }
                
                .compare-table th,
                .compare-table td {
                    padding: 12px 15px;
                    border: 1px solid var(--border-color);
                    min-width: 120px;
                    transition: all 0.3s ease;
                }
                
                .compare-table thead {
                    background-color: var(--card-bg);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                
                .compare-table th {
                    font-weight: 600;
                    color: var(--text-color);
                    background-color: var(--card-bg);
                    border-bottom: 2px solid var(--border-color);
                    white-space: nowrap;
                }
                
                .compare-table tr:nth-child(even) {
                    background-color: var(--card-bg);
                }
                
                .compare-table tr:hover {
                    background-color: var(--hover-bg);
                }
                
                .compare-table .param-name {
                    font-weight: 600;
                    background-color: var(--secondary-bg);
                    white-space: nowrap;
                    min-width: 150px;
                    color: var(--text-color);
                }
                
                .compare-table-container {
                    overflow-x: auto;
                    margin: 20px 0;
                }
                
                .compare-table td {
                    color: var(--text-color);
                }
                
                .no-data {
                    text-align: center;
                    padding: 40px 20px;
                    color: var(--text-color);
                    font-size: 16px;
                }
                
                /* 深色主题适配 */
                body.dark-mode .compare-table {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
                }
                
                body.dark-mode .compare-table th,
                body.dark-mode .compare-table td {
                    border-color: var(--border-color);
                }
                
                body.dark-mode .compare-table thead {
                    background-color: var(--card-bg);
                }
                
                body.dark-mode .compare-table th {
                    background-color: var(--card-bg);
                    color: var(--text-color);
                }
                
                body.dark-mode .compare-table tr:nth-child(even) {
                    background-color: var(--card-bg);
                }
                
                body.dark-mode .compare-table tr:hover {
                    background-color: var(--hover-bg);
                }
                
                body.dark-mode .compare-table .param-name {
                    background-color: var(--secondary-bg);
                    color: var(--text-color);
                }
                
                body.dark-mode .no-data {
                    color: var(--text-color);
                }
            </style>
        
            <div class="compare-table-wrapper">
                <table class="compare-table">
                    <thead>
                        <tr>
                            <th>参数</th>
        `;this.compareData.forEach(e=>{o+=`<th>${e.model}</th>`}),o+="</tr></thead><tbody>",this.getAllProperties().forEach(r=>{o+=`<tr>
                <td class="param-name">${this.getParamChineseName(r)}</td>`,this.compareData.forEach(e=>{e=e[r]||"-";o+=`<td>${e}</td>`}),o+="</tr>"}),o+=`</tbody></table>
            </div>`,e.innerHTML=o}}getParamNameMap(){return{model:"型号",name:"名称",price:"价格",description:"描述",screenSize:"屏幕尺寸",resolution:"分辨率",interface:"通讯接口",protection:"防护等级",inputPoints:"输入点数",outputPoints:"输出点数",cpuModel:"CPU型号",memory:"内存容量",localExpansionModules:"本地扩展模块数",programStorage:"程序存储空间",dataStorage:"数据存储空间",powerFailureDataSize:"掉电数据保存大小",motionControlAxes:"运动控制轴数",highSpeedIO:"高速I/O功能",softElementFeatures:"软元件特性",mainOutputType:"本体输出类型",ethercat:"EtherCAT",canOpenCanlink:"CANopen/CANlink",modbusTCP:"ModbusTCP",modbusSerial:"Modbus（串口）",etherNetIP:"EtherNet/IP",ratedPower:"额定功率",ratedVoltage:"额定电压",ratedTorque:"额定转矩",ratedSpeed:"额定转速",maxTorque:"最大转矩",maxSpeed:"最大转速",encoderPrecision:"编码器精度",rotorInertia:"转子转动惯量",frameSize:"机座号",hasBrake:"是否带刹车",torqueCoefficient:"力矩系数",inertiaCapacity:"惯量、容量",powerRange:"功率范围",voltage:"电压等级",controlMode:"控制方式",communication:"通讯功能"}}getAllProperties(){let r=new Set;return this.compareData.forEach(e=>{Object.keys(e).forEach(e=>{"id"!==e&&"type"!==e&&"image"!==e&&r.add(e)})}),Array.from(r).sort()}getParamChineseName(e){return this.getParamNameMap()[e]||e}clearCompare(){this.compareData=[],this.currentProductType="",this.updateComparePage()}getCompareData(){return this.compareData}getCurrentProductType(){return this.currentProductType}}let productCompare=new ProductCompare;document.addEventListener("click",e=>{let r=null;if(r=e.target.classList.contains("compare-btn")?e.target:e.target.closest(".compare-btn"))try{var o=r.dataset.product,a=o.replace(/&apos;/g,"'"),t=JSON.parse(a),c=r.dataset.type;productCompare.addToCompare(t,c),window.BOM&&"function"==typeof window.BOM.showSuccessMessage&&window.BOM.showSuccessMessage("产品已添加到对比")}catch(e){errorHandler.handleError(e,"compare.js",0,0,"处理对比按钮点击事件时出错"),alert("添加到对比失败: "+e.message)}}),document.addEventListener("pageChange",e=>{var r,o;"compare"===e.detail.page?(productCompare.initComparePage(),"function"==typeof window.setTopBarTitle&&window.setTopBarTitle("产品对比页面"),(e=document.querySelector(".top-bar-actions"))&&((r=document.getElementById("topbarClearCompareBtn"))&&r.remove(),(r=document.createElement("button")).id="topbarClearCompareBtn",r.className="clear-compare-btn",r.textContent="清空对比",r.style.marginRight="8px",r.addEventListener("click",()=>{productCompare.clearCompare()}),(o=document.getElementById("topbarBackBtn"))?e.insertBefore(r,o.nextSibling):e.insertBefore(r,e.firstChild))):(o=document.getElementById("topbarClearCompareBtn"))&&o.remove()}),"undefined"!=typeof module&&module.exports&&(module.exports=productCompare);