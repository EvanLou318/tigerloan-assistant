import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
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

send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")

# 1. 首页：右上角头像入口 + 3-tab 底栏
goto("/home")
screenshot("11_home_avatar_entry.png")

# 2. 个人中心：hero 顶部返回导航
goto("/profile")
screenshot("12_profile_nav.png")

# 3. 产品页底部 tabbar（确认无「我的」）
goto("/products")
screenshot("13_products_tabbar.png")

ws.close()
chrome.terminate()
print("DONE")
