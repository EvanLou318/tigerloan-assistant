import json
import time
import subprocess
import websocket
import urllib.request
import os
import sys

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9222
BASE = "http://localhost:5173/"
OUT_DIR = r"C:/Users/madta/WorkBuddy/2026-08-19-12-24-26/.workbuddy/memory"
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Launch headless chrome
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

# 2. Get the page target ws url
tabs = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
page = next(t for t in tabs if t["type"] == "page")
ws_url = page["webSocketDebuggerUrl"]

ws = websocket.create_connection(ws_url, timeout=30)
msg_id = 0

def send(method, params=None):
    global msg_id
    msg_id += 1
    ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
    # wait for matching response
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
        f.write(__import__("base64").b64decode(b64))
    print("saved:", path)

send("Page.enable")
send("Runtime.enable")
send("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})

# 3. Navigate to products list with token preset
send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'})); location.hash = '#/products';")
time.sleep(2.0)
screenshot("product_list.png")

# 4. Click the add button to open the method sheet
clicked = eval_js("(function(){ var el = document.querySelector('.add-btn'); if (!el) return false; el.click(); return true; })()")
print("add-btn clicked:", clicked)
time.sleep(1.2)
screenshot("method_sheet.png")

# 5. Verify voice option present in sheet
sheet_text = eval_js("document.querySelector('.van-action-sheet') ? document.querySelector('.van-action-sheet').innerText : ''")
print("sheet text preview:", sheet_text[:120].replace("\n", " | "))

# 6. Navigate directly to create with method=voice to verify skip
send("Page.navigate", {"url": BASE + "#/products/create?method=voice"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); location.reload();")
time.sleep(2.5)
screenshot("create_voice_step.png")
step_text = eval_js("document.body.innerText.includes('开始录音') ? 'VOICE_STEP_OK' : document.body.innerText.slice(0, 80)")
print("voice step check:", step_text)

# 7. Verify home page quick entry also opens the same sheet
send("Page.navigate", {"url": BASE + "#/home"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test');")
time.sleep(1.0)
# click the 录入产品 quick item (third one)
home_clicked = eval_js("(function(){ var items = document.querySelectorAll('.quick-item'); if (items.length < 3) return false; items[2].click(); return true; })()")
print("home entry clicked:", home_clicked)
time.sleep(1.2)
screenshot("home_method_sheet.png")
home_sheet_text = eval_js("document.querySelector('.van-action-sheet') ? document.querySelector('.van-action-sheet').innerText : ''")
print("home sheet text preview:", home_sheet_text[:120].replace("\n", " | "))

ws.close()
chrome.terminate()
print("DONE")
