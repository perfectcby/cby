function ErrorHandler(){this.errors=[],this.init()}ErrorHandler.prototype.init=function(){var r=this;window.addEventListener("error",function(e){r.handleError(e.error,e.filename,e.lineno,e.colno,e.message)}),window.addEventListener("unhandledrejection",function(e){r.handleError(e.reason,"Promise",0,0,"Unhandled Promise Rejection")}),window.addEventListener("error",function(e){e.target instanceof HTMLElement&&("SCRIPT"===e.target.tagName||"LINK"===e.target.tagName)&&r.handleResourceError(e.target)},!0),this.errorCleanupInterval=setInterval(function(){r.clearOldErrors()},18e5),this.diagnosticInterval=setInterval(function(){r.runDiagnostics()},36e5),this.memoryMonitoringInterval=setInterval(function(){r.monitorMemory()},3e5),this.beforeUnloadListener=function(){r.cleanupResources()},window.addEventListener("beforeunload",this.beforeUnloadListener)},ErrorHandler.prototype.handleResourceError=function(e){var r=e.tagName.toLowerCase(),e=e.src||e.href,r="script"==r?"脚本加载失败: "+e:"样式表加载失败: "+e,n=Error(r);n.name="ResourceLoadError",this.handleError(n,e,0,0,r),this.showUserError({type:"ResourceLoadError",message:"资源加载失败: "+e})},ErrorHandler.prototype.cleanupResources=function(){this.errorCleanupInterval&&(clearInterval(this.errorCleanupInterval),this.errorCleanupInterval=null),this.diagnosticInterval&&(clearInterval(this.diagnosticInterval),this.diagnosticInterval=null),this.memoryMonitoringInterval&&(clearInterval(this.memoryMonitoringInterval),this.memoryMonitoringInterval=null),this.beforeUnloadListener&&window.removeEventListener("beforeunload",this.beforeUnloadListener)},ErrorHandler.prototype.clearOldErrors=function(){var r=Date.now()-864e5,e=this.errors.filter(function(e){e=new Date(e.timestamp).getTime();return r<e}),n=this.errors.length-e.length;0<n&&(this.errors=e)},ErrorHandler.prototype.monitorMemory=function(){var e,r,n,t=null;try{"undefined"!=typeof performance&&performance.memory?t=performance.memory:"undefined"!=typeof navigator&&navigator.deviceMemory&&(t={deviceMemory:navigator.deviceMemory,usedJSHeapSize:0,totalJSHeapSize:0,jsHeapSizeLimit:1024*navigator.deviceMemory*1024*1024}),t&&(r=e=0,t.usedJSHeapSize?(e=Math.round(t.usedJSHeapSize/1024/1024),t.totalJSHeapSize,r=Math.round(t.jsHeapSizeLimit/1024/1024)):t.deviceMemory&&(e=Math.round(Math.random()*(r=1024*t.deviceMemory)*.5),0),.8<(n=e/r))&&(this.logWarning("High memory usage: "+(100*n).toFixed(1)+"% of limit","Memory Monitor"),this.clearOldErrors(),this.triggerMemoryCleanup())}catch(e){}},ErrorHandler.prototype.triggerMemoryCleanup=function(){try{var e;"function"==typeof CustomEvent?e=new CustomEvent("memoryCleanup",{detail:{timestamp:Date.now()}}):(e=document.createEvent("CustomEvent")).initCustomEvent("memoryCleanup",!0,!0,{timestamp:Date.now()}),document.dispatchEvent(e)}catch(e){}},ErrorHandler.prototype.handleError=function(e,r,n,t,o){e=e||Error("未知错误"),r=r||"Unknown",n=n||0,t=t||0;var o=(o=o||"")||e.message||"Unknown error",i=e.name||"Error",e=e.stack||"No stack trace available",r={id:Date.now()+Math.random().toString(36).substr(2,9),timestamp:(new Date).toISOString(),source:r,lineno:n,colno:t,message:o,stack:e,type:i};this.errors.push(r),50<this.errors.length&&this.errors.shift(),this.showUserError(r)},ErrorHandler.prototype.showUserError=function(e){var r=document.getElementById("error-notification"),n=(r&&r.remove(),document.createElement("div"));n.id="error-notification",n.style.cssText="\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background-color: #ef4444;\n        color: white;\n        padding: 12px 16px;\n        border-radius: 8px;\n        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n        z-index: 10000;\n        max-width: 350px;\n        font-size: 14px;\n        line-height: 1.5;\n        transition: all 0.3s ease;\n        word-wrap: break-word;\n      ",n.innerHTML='\n      <div style="display: flex; flex-direction: column;">\n        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">\n          <strong style="color: #fff;">'+e.type+':</strong>\n          <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; margin-left: 10px; line-height: 1;">&times;</button>\n        </div>\n        <div style="color: rgba(255, 255, 255, 0.9); font-size: 13px;">'+e.message+"</div>\n      </div>\n    ",document.body.appendChild(n);setTimeout(function(){n.parentNode&&(n.style.opacity="0",n.style.transform="translateY(-10px)",setTimeout(function(){n.parentNode&&n.remove()},300))},5e3)},ErrorHandler.prototype.logInfo=function(e,r){0},ErrorHandler.prototype.logWarning=function(e,r){0},ErrorHandler.prototype.getErrors=function(){return this.errors.slice()},ErrorHandler.prototype.clearErrors=function(){this.errors=[]},ErrorHandler.prototype.showDiagnostics=function(){var t,e,r,n=document.getElementById("diagnostics-panel");n?n.style.display="block":((n=document.createElement("div")).id="diagnostics-panel",n.style.cssText=`
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      background-color: var(--bg-primary);
      border-left: 1px solid var(--border-color);
      box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 10001;
      overflow-y: auto;
      padding: 16px;
      font-family: monospace;
      font-size: 12px;
    `,(e=document.createElement("div")).style.cssText=`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-color);
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    `,e.innerHTML=`
      <span>诊断信息</span>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: none;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        cursor: pointer;
        color: var(--text-secondary);
      ">关闭</button>
    `,n.appendChild(e),(e=document.createElement("div")).style.cssText=`
      margin-bottom: 16px;
      padding: 8px;
      background-color: var(--bg-secondary);
      border-radius: 4px;
    `,e.innerHTML=`
      <div style="margin-bottom: 4px;"><strong>环境信息:</strong></div>
      <div>URL: ${window.location.href}</div>
      <div>User Agent: ${navigator.userAgent}</div>
      <div>屏幕尺寸: ${window.innerWidth}x${window.innerHeight}</div>
      <div>时间: ${(new Date).toLocaleString()}</div>
    `,n.appendChild(e),(t=document.createElement("div")).style.cssText="margin-bottom: 16px;",t.innerHTML=`<div style="margin-bottom: 8px;"><strong>错误列表 (${this.errors.length}):</strong></div>`,0===this.errors.length?t.innerHTML+='<div style="color: var(--text-tertiary); padding: 8px;">暂无错误记录</div>':(r=this).errors.forEach(function(e,r){var n=document.createElement("div");n.style.cssText=`
          margin-bottom: 8px;
          padding: 8px;
          background-color: var(--bg-secondary);
          border-radius: 4px;
          border-left: 3px solid #ef4444;
        `,n.innerHTML=`
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600; color: #ef4444;">${e.type}</span>
            <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(e.timestamp).toLocaleTimeString()}</span>
          </div>
          <div style="margin-bottom: 4px;">${e.message}</div>
          <div style="font-size: 10px; color: var(--text-tertiary);">${e.source}:${e.lineno}:${e.colno}</div>
          <details style="margin-top: 4px;">
            <summary style="font-size: 10px; cursor: pointer;">查看堆栈</summary>
            <pre style="margin: 4px 0; padding: 4px; background-color: var(--bg-tertiary); border-radius: 2px; font-size: 10px; overflow-x: auto;">${e.stack}</pre>
          </details>
        `,t.appendChild(n)}),n.appendChild(t),(e=document.createElement("button")).textContent="清除错误记录",e.style.cssText=`
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 12px;
      color: var(--text-secondary);
    `,r=this,e.onclick=function(){r.clearErrors(),n.remove(),r.showDiagnostics()},n.appendChild(e),document.body.appendChild(n))},ErrorHandler.prototype.runDiagnostics=function(){var e={timestamp:(new Date).toISOString(),environment:{url:window.location.href,userAgent:navigator.userAgent,screenSize:window.innerWidth+"x"+window.innerHeight,localStorageAvailable:"undefined"!=typeof Storage,sessionStorageAvailable:"undefined"!=typeof sessionStorage},resources:{cssLoaded:0<document.querySelectorAll('link[rel="stylesheet"]').length,jsLoaded:0<document.querySelectorAll("script").length,fontAwesomeLoaded:"undefined"!=typeof FontAwesome||null!==document.querySelector('link[href*="font-awesome"]')},data:{productTypes:void 0!==window.productTypes,hmiData:void 0!==window.hmiData,plcData:void 0!==window.plcData,inverterData:void 0!==window.inverterData,servoSystemData:void 0!==window.servoSystemData,ioData:void 0!==window.ioData},dom:{appContainer:null!==document.querySelector(".app-container"),sidebar:null!==document.querySelector(".sidebar"),mainContent:null!==document.querySelector(".main-content"),resultsContainer:null!==document.getElementById("resultsContainer"),modals:0<document.querySelectorAll(".modal").length},errors:this.getErrors()},n="=== 应用诊断报告 ===\n",r=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=n+("时间: "+e.timestamp+"\n\n")+"环境信息:\n")+("- URL: "+e.environment.url+"\n"))+("- 用户代理: "+e.environment.userAgent+"\n"))+("- 屏幕尺寸: "+e.environment.screenSize+"\n"))+("- 本地存储: "+(e.environment.localStorageAvailable?"可用":"不可用")+"\n\n")+"资源加载:\n")+("- CSS文件: "+(e.resources.cssLoaded?"已加载":"未加载")+"\n"))+("- JS文件: "+(e.resources.jsLoaded?"已加载":"未加载")+"\n"))+("- FontAwesome: "+(e.resources.fontAwesomeLoaded?"已加载":"未加载")+"\n\n")+"数据可用性:\n")+("- 产品类型: "+(e.data.productTypes?"可用":"未定义")+"\n"))+("- HMI数据: "+(e.data.hmiData?"可用":"未定义")+"\n"))+("- PLC数据: "+(e.data.plcData?"可用":"未定义")+"\n"))+("- 变频器数据: "+(e.data.inverterData?"可用":"未定义")+"\n"))+("- IO模块数据: "+(e.data.ioData?"可用":"未定义")+"\n\n")+"DOM结构:\n")+("- 应用容器: "+(e.dom.appContainer?"存在":"不存在")+"\n"))+("- 侧边栏: "+(e.dom.sidebar?"存在":"不存在")+"\n"))+("- 主内容区: "+(e.dom.mainContent?"存在":"不存在")+"\n"))+("- 结果容器: "+(e.dom.resultsContainer?"存在":"不存在")+"\n"))+("- 弹窗数量: "+document.querySelectorAll(".modal").length+"\n\n"))+("错误记录: "+e.errors.length+"条\n"),0<e.errors.length&&(n+="最近的错误:\n",e.errors.slice(-3).forEach(function(e,r){n=(n=(n+=r+1+". "+e.type+": "+e.message+"\n")+"   来源: "+e.source+":"+e.lineno+":"+e.colno+"\n")+"   时间: "+new Date(e.timestamp).toLocaleString()+"\n\n"})),document.getElementById("diagnostics-results")),t=(r&&r.remove(),(r=document.createElement("div")).id="diagnostics-results",r.style.cssText="\n      position: fixed;\n      top: 20px;\n      left: 20px;\n      right: 20px;\n      bottom: 20px;\n      background-color: var(--bg-primary);\n      border: 1px solid var(--border-color);\n      border-radius: 8px;\n      box-shadow: var(--shadow-xl);\n      z-index: 10002;\n      padding: 16px;\n      overflow-y: auto;\n      font-family: monospace;\n      font-size: 12px;\n    ",document.createElement("div")),t=(t.style.cssText="\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 16px;\n      padding-bottom: 8px;\n      border-bottom: 1px solid var(--border-color);\n      font-size: 16px;\n      font-weight: 600;\n      color: var(--text-primary);\n    ",t.innerHTML="<span>应用诊断结果</span><button onclick='this.parentElement.parentElement.remove()' style='background:none;border:1px solid var(--border-color);border-radius:4px;padding:4px 8px;font-size:12px;cursor:pointer;color:var(--text-secondary);'>关闭</button>",r.appendChild(t),document.createElement("pre"));return t.textContent=n,t.style.cssText="margin: 0; white-space: pre-wrap; word-wrap: break-word;",r.appendChild(t),document.body.appendChild(r),e};var errorHandler=new ErrorHandler;window.showDiagnostics=function(){return errorHandler.showDiagnostics()},window.clearErrors=function(){return errorHandler.clearErrors()},window.runDiagnostics=function(){return errorHandler.runDiagnostics()},"undefined"!=typeof module&&module.exports?module.exports=errorHandler:window.errorHandler=errorHandler;