document.addEventListener("DOMContentLoaded",function(){document.addEventListener("pageChange",function(e){var t;e.detail&&"bom"===e.detail.page&&(e=x(),"function"==typeof window.setTopBarTitle)&&(t=e.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)),0),e=e.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||"1",10)||1),0),window.setTopBarTitle(`BOM管理 (数量: ${t}, 总价: ${l(e)})`))});let a=[];function x(){return[...a]}function p(e){try{var t;Array.isArray(e)&&(t=e.filter(e=>e&&"object"==typeof e),a=t)}catch(e){}}function h(e){var t;return null==e||""===e?0:(t=99999999,"number"==typeof e?isFinite(e)?Math.min(e,t):0:isFinite(e=parseFloat((""+e).replace(/[^0-9.]/g,"")))?Math.min(e,t):0)}function m(e){e.style.height="auto",e.style.height=Math.max(e.scrollHeight,32)+"px"}function n(){document.querySelectorAll(".inline-textarea").forEach(e=>{m(e)})}function o(e){var t=x();let a=e.id||"-",i=e.model||"-";var o=e.category||"",n=e.name||i||a,r=h(e.price),d=Math.max(0,parseInt(e.quantity||0,10)||0),e=e.description||"",l=t.findIndex(e=>e.id===a&&e.model===i);0<=l?(t[l].quantity=Math.max(0,parseInt((t[l].quantity||0)+d,10)),o&&(t[l].category=o),n&&(t[l].name=n),r&&(t[l].price=r),e&&(t[l].description=e)):t.push({id:a,model:i,category:o,name:n,description:e,price:r,quantity:d,addedAt:Date.now()}),p(t)}function i(t,a){p(x().filter(e=>!(e.id===t&&e.model===a)))}function u(){p([])}function b(e){var t=new Date;return e+`_${t.getFullYear()+`-${(""+(1+t.getMonth())).padStart(2,"0")}-${(""+t.getDate()).padStart(2,"0")}_${(""+t.getHours()).padStart(2,"0")}-${(""+t.getMinutes()).padStart(2,"0")}-`+(""+t.getSeconds()).padStart(2,"0")}.csv`}function g(t,a){try{let r=0,d=0,l=[],i=(l.push(["功率","序号","分类","型号","描述","单价","数量","总价"]),{}),s=(t.forEach((e,t)=>{var a=e.id.match(/(\d+(\.\d+)?KW)P\d+/),a=a?a[0]:"default-"+t;i[a]||(i[a]=[]),i[a].push(e)}),0);Object.entries(i).forEach(([e,t])=>{e=e.match(/(\d+(\.\d+)?KW)/);let n=e?e[1]:"";t.forEach((e,t)=>{var a=h(e.price),i=Math.max(0,parseInt(e.quantity||0,10)),o=a*i;r+=i,d+=o,l.push([0===t?n:"",s+1,e.category||"",e.model||"",e.description||"",parseFloat(a.toFixed(2)),i,parseFloat(o.toFixed(2))]),s++})}),l.push(["","","","","","","",""]),l.push(["","","","总计","","",r,parseFloat(d.toFixed(2))]);var o=l.map(e=>e.map(e=>"string"==typeof e&&(e.includes(",")||e.includes('"')||e.includes("\n"))?`"${e.replace(/"/g,'""')}"`:e).join(",")).join("\n"),n=b(a),c=new Blob([o],{type:"text/csv;charset=utf-8;"});let e=document.createElement("a");return e.href=URL.createObjectURL(c),e.download=n,e.click(),setTimeout(()=>{URL.revokeObjectURL(e.href)},100),!0}catch(e){return!1}}async function y(t=""){try{var a=x();if("undefined"==typeof ExcelJS||window.ExcelJS_LoadFailed){if(g(a,t))return void E(`${t||"BOM表"} 已成功导出为CSV格式`);throw Error("导出失败，请检查控制台获取详细信息")}let r=0,d=0,i={};a.forEach((e,t)=>{var a=e.id.match(/(\d+(\.\d+)?KW)P\d+/),a=a?a[0]:"default-"+t;i[a]||(i[a]=[]),i[a].push(e)});var o=b(t).replace(".csv",".xlsx"),n=new ExcelJS.Workbook;n.creator="ProSelectAI",n.lastModifiedBy="ProSelectAI",n.created=new Date,n.modified=new Date;let l=n.addWorksheet("BOM表"),s=(l.columns=[{header:"",key:"power",width:10},{header:"序号",key:"index",width:8},{header:"分类",key:"category",width:15},{header:"型号",key:"model",width:25},{header:"描述",key:"description",width:50},{header:"单价",key:"price",width:12},{header:"数量",key:"quantity",width:10},{header:"总价",key:"total",width:12}],l.getRow(1).font={name:"Arial",size:12,bold:!0},l.getRow(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:"CCCCCC"}},l.getRow(1).alignment={vertical:"middle",horizontal:"center",wrapText:!0},{top:{style:"thin",color:{argb:"E0E0E0"}},left:{style:"thin",color:{argb:"E0E0E0"}},bottom:{style:"thin",color:{argb:"E0E0E0"}},right:{style:"thin",color:{argb:"E0E0E0"}}}),c=(l.getRow(1).border=s,0),p=2;Object.entries(i).forEach(([e,t])=>{var e=e.match(/(\d+(\.\d+)?KW)/);let n=e?e[1]:"";t.forEach((e,t)=>{var a=h(e.price),i=Math.max(0,parseInt(e.quantity||0,10)),o=a*i,t=(r+=i,d+=o,l.addRow({power:0===t?n:"",index:c+1,category:e.category||"",model:e.model||"",description:e.description||"",price:parseFloat(a.toFixed(2)),quantity:i,total:parseFloat(o.toFixed(2))}));t.height=20,t.eachCell({includeEmpty:!0},(e,t)=>{e.border=s,1===t||2===t?e.alignment={vertical:"middle",horizontal:"center"}:6===t||8===t?(e.alignment={vertical:"middle"},e.numFmt="0.00"):e.alignment={vertical:"middle"}}),c++,p++}),1<t.length&&(e=p-t.length,t=p-1,l.mergeCells(`A${e}:A`+t),l.getCell("A"+e).alignment={vertical:"middle",horizontal:"center"})}),l.addRow([]);var m=l.addRow({description:"总计",quantity:r,total:parseFloat(d.toFixed(2))}),u=(m.font={bold:!0},m.fill={type:"pattern",pattern:"solid",fgColor:{argb:"EEEEEE"}},m.eachCell({includeEmpty:!0},(e,t)=>{e.border=s,5<=t&&t<=8&&(e.alignment={vertical:"middle",horizontal:"center"})}),await n.xlsx.writeBuffer()),y=new Blob([u],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});let e=document.createElement("a");e.href=URL.createObjectURL(y),e.download=o,e.click(),setTimeout(()=>{URL.revokeObjectURL(e.href)},100)}catch(e){g(x(),t)?alert("Excel格式导出失败，已使用CSV格式导出成功"):alert("导出失败: "+e.message)}}let f=document.getElementById("bomContent"),l=null;function e(o){o=o.target;if(o.classList.contains("inline-input")||o.classList.contains("inline-textarea")){o.classList.contains("inline-textarea")&&m(o);let a=o.dataset.id;o.dataset.model;var n=o.dataset.field;let i=o.value;"model"===n&&(o.dataset.model=i);var r,d=x();if("model"===n){let e=d.findIndex(e=>e.id===a);void(0<=e&&(d[e].model=i,c(d),r=o.closest("tr"))&&r.querySelectorAll('[data-id="'+a+'"]').forEach(e=>{e.dataset.model=i}))}else{let t=o.dataset.model,e=d.findIndex(e=>e.id===a&&e.model===t);0<=e&&("price"===n?d[e].price=h(i):"quantity"===n?d[e].quantity=Math.max(0,parseInt(i||"0",10)||0):d[e][n]=i,c(d),"price"!==n&&"quantity"!==n||(r=o.closest("tr"))&&(o=h("price"===n?i:d[e].price),n=Math.max(0,"quantity"===n?parseInt(i||0,10)||0:parseInt(d[e].quantity||0,10)||0),(r=r.querySelector(".total-cell"))&&(r.textContent=l(o*n)),"function"==typeof window.setTopBarTitle&&(r=d.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)||0),0),o=d.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||0,10)),0),window.setTopBarTitle(`BOM管理 (数量: ${r}, 总价: ${l(o)})`)),s(d)))}}}function t(e){e=e.target;if(e.classList.contains("inline-input")||e.classList.contains("inline-textarea")){let t=e.dataset.id;var a,i=e.dataset.field,o=e.value.trim(),n=x(),r=n.findIndex(e=>e.id===t);0<=r&&("price"===i?(a=h(o.replace(/[^\d.]/g,"")),n[r].price=a,e.value=a.toFixed(2)):"quantity"===i?(n[r].quantity=(a=Math.max(0,parseInt(o||"0",10)||0)).toString(),e.value=a.toString()):"description"===i?(n[r].description=o,e.classList.contains("inline-textarea")&&m(e)):n[r][i]=o,p(n),"price"!==i&&"quantity"!==i||(s(n),"function"==typeof window.setTopBarTitle&&(a=n.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)||0),0),e=n.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||0,10)),0),window.setTopBarTitle(`BOM管理 (数量: ${a}, 总价: ${l(e)})`))),E("数据已保存"))}}function r(e){var t,e=e.target.closest(".remove-item");e&&(t=e.closest("tr"),i(e.dataset.id,e.dataset.model),t&&t.remove(),s(e=x()),"function"==typeof window.setTopBarTitle)&&(t=e.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)||0),0),e=e.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||0,10)),0),window.setTopBarTitle(`BOM管理 (数量: ${t}, 总价: ${l(e)})`))}function v(){if(f){let o={};f.querySelectorAll(".inline-input, .inline-textarea").forEach(e=>{var t=e.dataset.id,a=e.dataset.field;t&&a&&(t=t+"-"+a,null!=e.value)&&(o[t]=e.value)});var e=x(),t=("function"==typeof window.setTopBarTitle&&(t=e.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)||0),0),i=e.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||0,10)),0),window.setTopBarTitle(`BOM管理 (数量: ${t}, 总价: ${l(i)})`)),document.querySelector(".top-bar-actions")),t=(t&&(i=document.getElementById("bomExport"),a=document.getElementById("bomClearAll"),i&&i.remove(),a&&a.remove(),"#bom"===window.location.hash||document.getElementById("bomContent"))&&((i=document.createElement("button")).id="bomClearAll",i.className="reset-btn",i.textContent="清空",i.style.marginRight="8px",t.insertBefore(i,t.firstChild),(a=document.createElement("button")).id="bomExport",a.className="primary-btn",a.textContent="导出BOM",a.style.marginRight="8px",t.insertBefore(a,t.firstChild),i=document.getElementById("bomExport"),a=document.getElementById("bomClearAll"),i&&(i._handleExport=t=()=>{{let a=document.getElementById("bomExportModal");if(!a){(a=document.createElement("div")).id="bomExportModal",a.className="bom-export-modal",a.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      `;var e=document.createElement("div"),i=(e.style.cssText=`
        background-color: white;
        border-radius: 8px;
        padding: 24px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      `,document.createElement("h3")),o=(i.textContent="导出BOM表",i.style.cssText=`
        margin: 0 0 16px 0;
        font-size: 18px;
        color: #333;
      `,document.createElement("p")),n=(o.textContent="请输入导出表格的名称，将自动添加当前时间戳。",o.style.cssText=`
        margin: 0 0 16px 0;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
      `,document.createElement("div")),r=(n.style.cssText=`
        margin: 0 0 24px 0;
      `,document.createElement("label"));r.textContent="表格名称：",r.style.cssText=`
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      `;let t=document.createElement("input");t.id="bomExportTableNameInput",t.type="text",t.placeholder="请输入表格名称",t.style.cssText=`
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      `,n.appendChild(r),n.appendChild(t);var r=document.createElement("div"),d=(r.style.cssText=`
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      `,document.createElement("button")),l=(d.textContent="取消",d.className="cancel-btn",d.style.cssText=`
        padding: 8px 16px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background-color: white;
        color: #666;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      `,d.addEventListener("click",()=>{a.style.opacity="0",a.style.visibility="hidden"}),document.createElement("button"));l.textContent="导出",l.className="export-btn",l.style.cssText=`
        padding: 8px 16px;
        border: 1px solid #1890ff;
        border-radius: 4px;
        background-color: #1890ff;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      `,l.addEventListener("click",async()=>{var e=t.value.trim();try{await y(e),a.style.opacity="0",a.style.visibility="hidden",E(`${e||"BOM表"} 已成功导出`)}catch(e){alert("导出失败: "+e.message)}}),r.appendChild(d),r.appendChild(l),e.appendChild(i),e.appendChild(o),e.appendChild(n),e.appendChild(r),a.appendChild(e),a.addEventListener("click",e=>{e.target===a&&(a.style.opacity="0",a.style.visibility="hidden")}),document.addEventListener("keydown",e=>{"Escape"===e.key&&"visible"===a.style.visibility&&(a.style.opacity="0",a.style.visibility="hidden")}),document.body.appendChild(a)}a.style.opacity="1",a.style.visibility="visible"}},i.addEventListener("click",t)),a)&&(a._handleClear=i=()=>{{let a=document.getElementById("bomClearConfirmationModal");if(!a){(a=document.createElement("div")).id="bomClearConfirmationModal",a.className="bom-confirmation-modal",a.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      `;var e=document.createElement("div"),i=(e.style.cssText=`
        background-color: white;
        border-radius: 8px;
        padding: 24px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      `,document.createElement("h3")),o=(i.textContent="确认清空BOM表",i.style.cssText=`
        margin: 0 0 16px 0;
        font-size: 18px;
        color: #333;
      `,document.createElement("p")),n=(o.textContent="确定要清空BOM表吗？此操作不可撤销。",o.style.cssText=`
        margin: 0 0 16px 0;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
      `,document.createElement("div")),r=(n.style.cssText=`
        margin: 0 0 24px 0;
      `,document.createElement("label"));r.textContent="表格名称：",r.style.cssText=`
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      `;let t=document.createElement("input");t.id="bomTableNameInput",t.type="text",t.placeholder="请输入表格名称（可选）",t.style.cssText=`
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      `,n.appendChild(r),n.appendChild(t);var r=document.createElement("div"),d=(r.style.cssText=`
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      `,document.createElement("button")),l=(d.textContent="取消",d.className="cancel-btn",d.style.cssText=`
        padding: 8px 16px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background-color: white;
        color: #666;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      `,d.addEventListener("click",()=>{a.style.opacity="0",a.style.visibility="hidden"}),document.createElement("button")),s=(l.textContent="直接删除",l.className="delete-btn",l.style.cssText=`
        padding: 8px 16px;
        border: 1px solid #ff4d4f;
        border-radius: 4px;
        background-color: white;
        color: #ff4d4f;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      `,l.addEventListener("click",()=>{var e=t.value.trim();u(),v(),a.style.opacity="0",a.style.visibility="hidden",E(`${e||"未命名"} BOM表已清空`)}),document.createElement("button"));s.textContent="导出BOM再删除",s.className="export-delete-btn",s.style.cssText=`
        padding: 8px 16px;
        border: 1px solid #1890ff;
        border-radius: 4px;
        background-color: #1890ff;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      `,s.addEventListener("click",async()=>{var e=t.value.trim();try{await y(e),u(),v(),a.style.opacity="0",a.style.visibility="hidden",E(`${e||"未命名"} BOM表已导出并清空`)}catch(e){alert("导出失败: "+e.message)}}),r.appendChild(d),r.appendChild(l),r.appendChild(s),e.appendChild(i),e.appendChild(o),e.appendChild(n),e.appendChild(r),a.appendChild(e),a.addEventListener("click",e=>{e.target===a&&(a.style.opacity="0",a.style.visibility="hidden")}),document.addEventListener("keydown",e=>{"Escape"===e.key&&"visible"===a.style.visibility&&(a.style.opacity="0",a.style.visibility="hidden")}),document.body.appendChild(a)}a.style.opacity="1",a.style.visibility="visible"}},a.addEventListener("click",i)),document.createDocumentFragment()),a=document.createElement("div");a.className="bom-table-container";let c=document.createElement("table");c.className="bom-table",c.style.tableLayout="fixed",c.style.width="100%",c.style.borderCollapse="collapse",c.style.borderSpacing="0";var i=document.createElement("thead");i.innerHTML=`
      <tr>
        <th style="width: 40px; box-sizing: border-box;">序号</th>
        <th style="width: 100px; box-sizing: border-box;">分类</th>
        <th style="width: 170px; box-sizing: border-box;">型号</th>
        <th style="width: 280px; box-sizing: border-box;">描述</th>
        <th style="width: 90px; box-sizing: border-box;">单价</th>
        <th style="width: 80px; box-sizing: border-box;">数量</th>
        <th style="width: 100px; box-sizing: border-box;">总价</th>
        <th style="width: 100px; box-sizing: border-box;">操作</th>
      </tr>
    `,c.appendChild(i);let r=document.createElement("tbody");e.forEach((e,t)=>{var a=h(e.price),i=a.toFixed(2),o=Math.max(0,parseInt(e.quantity||0,10)),n=document.createElement("tr"),t=(n.style.boxSizing="border-box",`
        <td style="box-sizing: border-box;">${t+1}</td>
        <td style="box-sizing: border-box;"><input class="inline-input" data-id="${e.id}" data-model="${e.model}" data-field="category" value="${e.category||""}" /></td>
        <td style="box-sizing: border-box;"><input class="inline-input" data-id="${e.id}" data-model="${e.model}" data-field="model" value="${e.model||""}" /></td>
        <td style="box-sizing: border-box;"><textarea class="inline-textarea" data-id="${e.id}" data-model="${e.model}" data-field="description">${e.description||""}</textarea></td>
        <td style="box-sizing: border-box;" class="price-cell"><input class="inline-input" data-id="${e.id}" data-model="${e.model}" data-field="price" value="${i}" /></td>
        <td style="box-sizing: border-box;" class="qty-cell"><input class="inline-input" data-id="${e.id}" data-model="${e.model}" data-field="quantity" value="${o}" /></td>
        <td style="box-sizing: border-box;" class="total-cell">${l(a*o)}</td>
        <td style="box-sizing: border-box;">
          <a href="https://www.inovance.com/portal/allResult?key=${e.model||""}" 
             class="bom-material-btn" 
             target="_blank" 
             rel="noopener noreferrer" 
             data-id="${e.id}" 
             data-model="${e.model}">资料</a>
          <button class="remove-item" data-id="${e.id}" data-model="${e.model}">移除</button>
        </td>
      `);n.innerHTML=t,r.appendChild(n)}),c.appendChild(r),a.appendChild(c),t.appendChild(a),f.innerHTML="",f.appendChild(t),setTimeout(()=>{{var d=c;let i=d.querySelectorAll("thead th"),a=!1,o=null,n=0,r=0;function l(e){if(a&&o){let a=r+(e.pageX-n);if(50<=a){o.style.width=a+"px";let t=Array.from(i).indexOf(o);d.querySelectorAll("tr").forEach(e=>{var e=e.querySelectorAll("td, th");e[t]&&(e[t].style.width=a+"px",e[t].style.overflow="hidden",e[t].style.textOverflow="ellipsis",e[t].style.whiteSpace="nowrap",e=e[t].querySelector("textarea.inline-textarea"))&&(e.style.whiteSpace="normal")})}}}function s(){a=!1,o=null,document.body.classList.remove("resizing"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",s)}i.forEach((t,e)=>{e!==i.length-1&&((e=document.createElement("div")).className="column-resizer",t.style.position="relative",t.appendChild(e),e.addEventListener("mousedown",e=>{e.preventDefault(),a=!0,o=t,n=e.pageX,r=t.offsetWidth,document.body.classList.add("resizing"),document.addEventListener("mousemove",l),document.addEventListener("mouseup",s)}))})}n();{var t=c,i;let n=null,r=null,o=-1,d=-1,l="",e=(document.getElementById("dragging-styles")||((i=document.createElement("style")).id="dragging-styles",i.textContent=`
      /* 拖拽时的光标样式 */
      [draggable="true"] {
        cursor: move;
      }
      
      /* 正在拖拽的行样式 - 移除可能导致布局变化的transform */
      tr.dragging {
        opacity: 0.5;
        background-color: var(--bg-tertiary) !important;
        /* 移除scale变换避免布局问题 */
      }
      
      /* 拖拽到行上方时的顶部边框指示 */
      tr.drag-over-top {
        border-top: 2px solid var(--primary-color);
        background-color: var(--bg-secondary) !important;
        /* 移除transition避免跳动 */
      }
      
      /* 拖拽到行下方时的底部边框指示 */
      tr.drag-over-bottom {
        border-bottom: 2px solid var(--primary-color);
        background-color: var(--bg-secondary) !important;
        /* 移除transition避免跳动 */
      }
      
      /* 拖拽时禁用文本选择 */
      .bom-table.dragging {
        user-select: none;
      }
      
      /* 拖拽过程中的其他视觉提示 */
      [draggable="true"]:hover {
        background-color: var(--bg-tertiary);
      }
      
      /* 输入框元素不继承拖拽光标 */
      .inline-input, .inline-textarea {
        cursor: text !important;
        user-select: text;
      }
      
      /* 增强插入位置的视觉反馈 */
      tr.drag-over-top {
        border-top: 3px solid var(--primary-color);
        box-shadow: none;
      }
      
      tr.drag-over-bottom {
        border-bottom: 3px solid var(--primary-color);
        box-shadow: none;
      }
    `,document.head.appendChild(i)),t.querySelectorAll("tbody tr")),s=Array.from(e),a=(e,t)=>{r===e&&l===t||(s.forEach(e=>e.classList.remove("drag-over-top","drag-over-bottom")),l=e?(e.classList.add("top"===t?"drag-over-top":"drag-over-bottom"),r=e,t):(r=null,""))};s.forEach((e,t)=>{e.draggable=!0,e.dataset.index=t,e.addEventListener("dragstart",function(e){let t=!1,a=e.target;for(;a&&a!==this;){var i=a.tagName;if("INPUT"===i||"TEXTAREA"===i||"SELECT"===i){t=!0;break}a=a.parentElement}"INPUT"===e.target.tagName||"TEXTAREA"===e.target.tagName||"SELECT"===e.target.tagName||t?(e.stopPropagation(),e.preventDefault()):(n=this,o=parseInt(this.dataset.index),this.classList.add("dragging"),e.dataTransfer.effectAllowed="move",e.dataTransfer.dropEffect="move",e.dataTransfer.setData("text/plain",o.toString()),e.dataTransfer.setData("text/html",""),e.dataTransfer.setDragImage(this,0,0))}),e.addEventListener("dragend",function(){this.classList.remove("dragging"),s.forEach(e=>e.classList.remove("drag-over-top","drag-over-bottom")),n=null,r=null,o=-1,d=-1,l=""}),e.addEventListener("dragover",function(e){var t;e.preventDefault(),e.dataTransfer.dropEffect="move",this!==n&&(t=this.getBoundingClientRect(),e=e.clientY-t.top<t.height/2?"top":"bottom",a(this,e))}),e.addEventListener("dragleave",function(e){e=e.relatedTarget;this.contains(e)||r!==this||setTimeout(()=>{r===this&&a(null,"")},20)}),e.addEventListener("drop",function(e){if(e.preventDefault(),n!==this){s.forEach(e=>e.classList.remove("drag-over-top","drag-over-bottom"));try{var t=parseInt(n.dataset.index),a=parseInt(this.dataset.index),i=x(),o=this.getBoundingClientRect();p(((t,a,i,o)=>{try{if(!Array.isArray(t))return errorHandler.handleError(Error("第一个参数必须是数组"),"bom.js",0,0,"reorderItems: 第一个参数必须是数组"),t;var n=[...t];if(!(a<0||n.length<=a||i<0||n.length<=i)){var[r]=n.splice(a,1);let e;e=Math.max(0,Math.min(e=o?a<i?i-1:i:a<i?i:i+1,n.length)),n.splice(e,0,r)}return n}catch(e){return errorHandler.handleError(e,"bom.js",0,0,"重新排序出错"),t}})(i,t,a,e.clientY-o.top<o.height/2)),setTimeout(()=>v(),10)}catch(e){errorHandler.handleError(e,"bom.js",0,0,"拖拽放置时出错"),setTimeout(()=>v(),10)}finally{n=null,r=null,d=-1,l=""}}})})}Object.entries(o).forEach(([e,t])=>{var e=e.split("-"),a=e[0],e=e[1],a=`.inline-input[data-id="${a}"][data-field="${e}"], .inline-textarea[data-id="${a}"][data-field="${e}"]`,e=f.querySelector(a);e&&t!==e.value&&(e.value=t,"textarea"==e.tagName.toLowerCase())&&m(e)})},0)}}function s(e){var t,a;Array.isArray(e)&&(t=e.reduce((e,t)=>e+Math.max(0,parseInt(t.quantity||0,10)||0),0),e=e.reduce((e,t)=>e+h(t.price)*Math.max(0,parseInt(t.quantity||0,10)||0),0),(a=document.getElementById("bom-total-quantity"))&&(a.textContent=t),a=document.getElementById("bom-total-price"))&&l&&(a.textContent=l(e))}document.addEventListener("pageChange",function(e){var t;e.detail&&"bom"===e.detail.page?v():(e=document.getElementById("bomExport"),t=document.getElementById("bomClearAll"),e&&e.remove(),t&&t.remove())});let c=((t,a)=>{let i;return function(...e){clearTimeout(i),i=setTimeout(()=>{clearTimeout(i),t(...e)},a)}})(e=>{try{p(e)}catch(e){errorHandler.handleError(e,"bom.js",0,0,"保存数据失败")}},200);function E(e){let t=document.getElementById("successToast"),a=(t||((t=document.createElement("div")).id="successToast",t.className="success-toast",t.style.cssText=`
        position: fixed;
        top: 20px;
        left: -300px;
        background-color: white;
        color: #333;
        padding: 12px 16px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transition: all 0.3s ease;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
      `,document.body.appendChild(t)),"");function i(){t.style.left="-300px",t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)}a="string"==typeof e?e:"object"==typeof e&&null!==e&&(e.model||e.name)?`成功: ${e.model||e.name} 已成功添加到BOM表`+(1<(e=e.quantity||1)?"，数量: "+e:""):"添加成功",t.innerHTML=`
      <div style="color: #52c41a; font-size: 18px;">✓</div>
      <div style="flex: 1;">${a}</div>
      <button id="toastCloseBtn" style="
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 16px;
        padding: 2px 6px;
        border-radius: 2px;
        transition: all 0.2s ease;
      ">×</button>
    `,document.getElementById("toastCloseBtn").onclick=function(){i()},t.style.left="-300px",t.style.opacity="0",setTimeout(()=>{t.style.left="20px",t.style.opacity="1"},10),setTimeout(()=>{i()},2e3)}f&&(l=e=>"¥"+h(e).toFixed(2),f.addEventListener("input",e),f.addEventListener("blur",t,!0),f.addEventListener("click",r)),window.BOMModals={openQuantityModal:function(i){var e;bomModal&&(e=i.model||i.name||i.id,bomTitle.textContent=`添加 ${e} 到BOM表`,bomBody.innerHTML=`
      <div class="form-group">
        <label>数量</label>
        <input type="number" id="bomQty" class="inline-input" min="0" value="1" />
      </div>
      <div class="form-group">
        <label>备注（可选）</label>
        <input type="text" id="bomRemark" class="inline-input" placeholder="请输入备注信息" />
      </div>
    `,bomConfirm.onclick=()=>{var e=document.getElementById("bomQty"),t=document.getElementById("bomRemark"),e=Math.max(0,parseInt(e&&e.value||"0",10)),t=t&&t.value?t.value.trim():"",a={...i,quantity:e};t&&(a.remark=t),o(a),hideModal(),E({model:a.model||a.name,quantity:e})},bomCancel.onclick=hideModal,bomClose.onclick=hideModal,showModal())}},window.BOM={load:x,addItem:o,removeItem:i,clearAll:u,render:v,showSuccessMessage:E},setTimeout(n,100)});