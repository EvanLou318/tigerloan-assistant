import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9227
BASE = "http://localhost:5173/"
OUT_DIR = r"C:/Users/madta/WorkBuddy/2026-08-19-12-24-26/.workbuddy/memory/m3"
os.makedirs(OUT_DIR, exist_ok=True)

chrome = subprocess.Popen([
    CHROME,
    "--headless=new",
    f"--remote-debugging-port={PORT}",
    "--remote-allow-origins=*",
    "--disable-gpu",
    "--no-first-run",
    "--window-size=390,844",
    "about:blank",
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(2.5)

tabs = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
page = next(t for t in tabs if t["type"] == "page")
ws_url = page["webSocketDebuggerUrl"]

ws = websocket.create_connection(ws_url, timeout=30)
msg_id = 0

def send(method, params=None):
    global msg_id
    msg_id += 1
    ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
    while True:
        data = json.loads(ws.recv())
        if data.get("id") == msg_id:
            return data

def eval_js(expr):
    res = send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
    return res.get("result", {}).get("result", {}).get("value")

def screenshot(name):
    res = send("Page.captureScreenshot", {"format": "png"})
    b64 = res["result"]["data"]
    path = os.path.join(OUT_DIR, name)
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    print("saved:", path)

def goto(hash_path, wait=2.0):
    eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")
    send("Page.navigate", {"url": BASE + "#" + hash_path})
    time.sleep(wait)

send("Page.enable")
send("Runtime.enable")
send("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})

send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")

# 1. 日程创建方式选择页：确认只有 文本+语音
goto("/schedules/create")
screenshot("f1_schedule_methods.png")

# 2. 客户详情：navbar 编辑按钮可见
goto("/customers/c001")
screenshot("f2_customer_nav_edit.png")

# 3. 客户详情：点击第一个材料项 → 查看弹层
goto("/customers/c001")
eval_js("document.querySelector('.material-item')?.click()")
time.sleep(1.0)
screenshot("f3_material_viewer.png")

# 4. 关闭材料弹层，点 navbar 编辑 → 编辑弹层
eval_js("document.querySelector('.mv-actions .van-button')?.click()")
time.sleep(0.5)
eval_js("document.querySelector('.nav-edit-btn')?.click()")
time.sleep(1.0)
screenshot("f4_edit_popup.png")

# 5. 直接通过 Pinia store 验证 updateCustomer 功能生效
name_after = eval_js("""
(function(){
  // 通过 __VUE_APP__ 或直接访问 Vue 3 app 找到 Pinia store
  const app = document.querySelector('#app').__vue_app__;
  if (!app) return 'no-app';
  const pinia = app.config.globalProperties.$pinia || app._context.config.globalProperties.$pinia;
  // 兜底：直接查 $store（如果通过 useStore 暴露在 prototype）
  let stores = [];
  if (app.config.globalProperties.$pinia) {
    app.config.globalProperties.$pinia._s.forEach((s, k) => stores.push({k, s}));
  }
  // 找到 customer store
  let cust = null;
  if (app.config.globalProperties.$pinia) {
    app.config.globalProperties.$pinia._s.forEach((s, k) => { if (k === 'customer') cust = s; });
  }
  if (!cust) return 'no-store';
  // 修改前
  const before = cust.getCustomerById('c001')?.name;
  cust.updateCustomer('c001', { name: '张明远', city: '深圳' });
  // 等响应式刷新
  return new Promise(r => setTimeout(() => r(JSON.stringify({
    before,
    after: cust.getCustomerById('c001')?.name,
    city: cust.getCustomerById('c001')?.city
  })), 100));
})();
""")
print("store update result:", name_after)
screenshot("f5_after_save.png")
name_now = eval_js("document.querySelector('.header-name')?.textContent")
print("header-name after save:", name_now)

ws.close()
chrome.terminate()
print("DONE")
