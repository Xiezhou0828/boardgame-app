from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# 桌遊資料
games_data = {
    "party": [
        {"name": "誰是臥底", "players": "4-12 人", "time": "30 分鐘"},
        {"name": "阿瓦隆", "players": "5-10 人", "time": "45 分鐘"},
        {"name": "卡坦島", "players": "3-4 人", "time": "90 分鐘"},
        {"name": "UNO", "players": "2-10 人", "time": "30 分鐘"},
        {"name": "吸爆鬆餅", "players": "2-8 人", "time": "15 分鐘"},
        {"name": "作弊飛蛾", "players": "3-5 人", "time": "15-25 分鐘"},
        {"name": "亡者神抽", "players": "2-10 人", "time": "30 分鐘"},
        {"name": "化裝舞會", "players": "4-12 人", "time": "30 分鐘"}
    ],
    "strategy": [
        {"name": "七大奇蹟", "players": "2-7 人", "time": "30 分鐘"},
        {"name": "Puerto Rico", "players": "2-5 人", "time": "120 分鐘"},
        {"name": "Agricola", "players": "1-5 人", "time": "60-120 分鐘"},
        {"name": "Terraforming Mars", "players": "1-5 人", "time": "120-150 分鐘"}
    ],
    "camp": [
        {"name": "狼人殺", "players": "6-18 人", "time": "30-60 分鐘"},
        {"name": "馬尼拉", "players": "3-5 人", "time": "60 分鐘"},
        {"name": "Dixit", "players": "3-6 人", "time": "30 分鐘"},
        {"name": "The Resistance", "players": "5-10 人", "time": "30 分鐘"},
        {"name": "乳酪大盜", "players": "4-8 人", "time": "10分鐘"}
    ]
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/games/<category>")
def get_games(category):
    games = games_data.get(category, [])
    return jsonify(games)



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # 默認使用 5000 端口，Render 提供時使用環境變數
    app.run(host="0.0.0.0", port=port, debug=True)
