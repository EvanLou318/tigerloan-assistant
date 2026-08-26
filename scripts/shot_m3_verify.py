import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9224
BASE = "http://localhost:5176/"
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
    # 先设 token 再跳转，避免路由守卫拦截
    eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")
    send("Page.navigate", {"url": BASE + "#" + hash_path})
    time.sleep(wait)

send("Page.enable")
send("Runtime.enable")
send("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})

# 先进入目标站点并写入 token，避免 about:blank 的 localStorage 不共享
send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")

# 验证点：客户列表卡片颜色、客户创建输入框可见性、登录表单样式
goto("/customers")
screenshot("05_customers_v2.png")

goto("/customers/create")
screenshot("06_customer_create_v2.png")

goto("/login")
screenshot("01_login_v2.png")

ws.close()
chrome.terminate()
print("DONE")
