import json
import time
import subprocess
import websocket
import urllib.request
import os
import base64

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
PORT = 9223
BASE = "http://localhost:5173/"
OUT_DIR = r"C:/Users/madta/WorkBuddy/2026-08-19-12-24-26/.workbuddy/memory"
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
ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=30)
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
    path = os.path.join(OUT_DIR, name)
    with open(path, "wb") as f:
        f.write(base64.b64decode(res["result"]["data"]))
    print("saved:", path)

send("Page.enable")
send("Runtime.enable")
send("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})

# login
send("Page.navigate", {"url": BASE + "#/login"})
time.sleep(2.0)
eval_js("localStorage.setItem('token', 'mock-jwt-token-test'); localStorage.setItem('userInfo', JSON.stringify({name: '李经理', role: '贷款经理'}));")

# 1. home page - avatar entry
send("Page.navigate", {"url": BASE + "#/home"})
time.sleep(2.0)
screenshot("entry_home.png")
arrow = eval_js("document.querySelector('.user-arrow') ? 'ARROW_OK' : 'NO_ARROW'")
print("home avatar arrow:", arrow)

# click avatar row -> should go to /profile
eval_js("document.querySelector('.user-info').click()")
time.sleep(1.2)
hash_now = eval_js("location.hash")
print("after avatar click hash:", hash_now)
screenshot("entry_profile_new.png")

# 2. profile page - quick card removed?
card_gone = eval_js("!document.querySelector('.quick-card')")
print("quick-card removed:", card_gone)
tool_text = eval_js("document.body.innerText.includes('展业工具')")
print("展业工具 text still present:", tool_text)

# 3. stat cells clickable -> products
eval_js("document.querySelectorAll('.stat-cell')[0].click()")
time.sleep(1.2)
hash2 = eval_js("location.hash")
print("after stat click hash:", hash2)

# 4. schedule page - fab position & no navbar plus
send("Page.navigate", {"url": BASE + "#/schedules"})
time.sleep(2.0)
screenshot("entry_schedule.png")
fab_bottom = eval_js("(function(){ var el = document.querySelector('.fab'); if (!el) return 'NO_FAB'; var r = el.getBoundingClientRect(); return 'bottom=' + Math.round(window.innerHeight - r.bottom) + 'px'; })()")
print("fab offset from bottom:", fab_bottom)
nav_plus = eval_js("document.querySelector('.van-nav-bar__right') ? 'NAV_PLUS_STILL_EXISTS' : 'NAV_RIGHT_REMOVED'")
print("navbar right removed:", nav_plus)

ws.close()
chrome.terminate()
print("DONE")
