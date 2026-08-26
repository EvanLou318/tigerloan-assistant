import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PYTHON = r"C:/Users/madta/.workbuddy/binaries/python/envs/default/Scripts/python.exe"
PORT = 9226
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

# 预先登录（注入 token）
send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")

# 1. AI 助理页（chip 截断修复验证）
goto("/assistant", wait=2.0)
screenshot("fix_01_assistant.png")
# 把 chips 容器滚到最右，证明溢出后可完整看到（功能验证）
eval_js("document.querySelector('.quick-chips').scrollLeft = 9999")
time.sleep(0.5)
screenshot("fix_01b_assistant_scrolled.png")
# 回滚到起点：取一个适中的 scrollLeft 让「新增客户 王芳 13900139000」完整落在可视区
eval_js("document.querySelector('.quick-chips').scrollLeft = 160")
time.sleep(0.5)
screenshot("fix_01c_assistant_chip_revealed.png")

# 2. 客户详情页（折叠箭头方向 + plain 按钮对比度）
goto("/customers/c001", wait=2.0)
# 滚到折叠区位置（基础信息/收入信息）
time.sleep(0.5)
screenshot("fix_02_customer_detail_top.png")
# 滚到底部操作栏
eval_js("document.querySelectorAll('.section-title').forEach(el => { if (el.textContent.includes('推演记录')) el.scrollIntoView({block: 'center'}) })")
time.sleep(0.5)
screenshot("fix_03_customer_detail_action.png")

# 3. 首页（P0/P1/P2 优先级配色）
goto("/home", wait=2.0)
time.sleep(0.5)
screenshot("fix_04_home.png")

# 4. 日程页（时间块合并 + 优先级徽章独立行）
goto("/schedules", wait=2.0)
time.sleep(0.5)
screenshot("fix_05_schedule.png")

ws.close()
chrome.terminate()
print("DONE")