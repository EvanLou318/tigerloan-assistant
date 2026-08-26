import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9228
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

# 1. 编辑弹层：基础信息组
goto("/customers/c001")
eval_js("document.querySelector('.nav-edit-btn')?.click()")
time.sleep(1.0)
screenshot("g1_edit_basic.png")

# 2. 滚动到收入信息组
eval_js("""
(function(){
  const titles = document.querySelectorAll('.ep-group-title');
  for (const t of titles) { if (t.textContent.includes('收入')) { t.scrollIntoView({block: 'center'}); break; } }
})();
""")
time.sleep(0.4)
screenshot("g2_edit_income.png")

# 3. 材料弹层：3 按钮操作区
goto("/customers/c001")
eval_js("document.querySelector('.material-item')?.click()")
time.sleep(1.0)
screenshot("g3_material_actions.png")

# 4. 点击「编辑类型」→ 弹出类型选择
eval_js("""
(function(){
  const btns = document.querySelectorAll('.mv-actions .van-button');
  if (btns[0]) btns[0].click();
})();
""")
time.sleep(0.8)
screenshot("g4_mat_type_edit.png")

# 5. 关闭类型弹层，点「删除材料」→ confirm 对话框
eval_js("""
(function(){
  const cancel = document.querySelectorAll('.mtp-actions .van-button')[0];
  if (cancel) cancel.click();
})();
""")
time.sleep(0.5)
eval_js("""
(function(){
  const btns = document.querySelectorAll('.mv-actions .van-button');
  if (btns[1]) btns[1].click();
})();
""")
time.sleep(0.8)
screenshot("g5_delete_confirm.png")

# 6. 确认删除 → 材料数量变化
before_count = eval_js("document.querySelectorAll('.material-item').length")
eval_js("""
(function(){
  const confirmBtn = document.querySelector('.van-dialog__confirm');
  if (confirmBtn) confirmBtn.click();
})();
""")
time.sleep(1.0)
after_count = eval_js("document.querySelectorAll('.material-item').length")
print(f"material count: {before_count} -> {after_count}")
screenshot("g6_after_delete.png")

ws.close()
chrome.terminate()
print("DONE")
