import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9223
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
    send("Page.navigate", {"url": BASE + "#" + hash_path})
    time.sleep(wait)
    eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'})); location.reload();")
    time.sleep(wait)

send("Page.enable")
send("Runtime.enable")
send("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})

# 1. 登录页
send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
screenshot("01_login.png")

# 2. 首页
goto("/home")
screenshot("02_home.png")

# 3. 产品列表
goto("/products")
screenshot("03_products.png")

# 4. 产品详情
goto("/products/p001")
screenshot("04_product_detail.png")

# 5. 客户列表
goto("/customers")
screenshot("05_customers.png")

# 6. 客户详情
goto("/customers/c001")
screenshot("06_customer_detail.png")

# 7. AI 匹配助手
goto("/customers/c001/match")
screenshot("07_match.png")

# 8. 日程列表
goto("/schedules")
screenshot("08_schedule.png")

# 9. AI 助理
goto("/assistant")
screenshot("09_assistant.png")

ws.close()
chrome.terminate()
print("DONE")
