from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)
DB = "database.db"


def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS queries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            user_agent TEXT,
            visited_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


init_db()


@app.route("/")
def home():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute(
        "INSERT INTO visitors (ip, user_agent, visited_at) VALUES (?,?,?)",
        (
            request.remote_addr,
            request.headers.get("User-Agent"),
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        ),
    )
    conn.commit()
    conn.close()
    return render_template("index.html")


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"status": "error", "msg": "All fields are required"}), 400

    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute(
        "INSERT INTO queries (name,email,subject,message,created_at) VALUES (?,?,?,?,?)",
        (name, email, subject, message, datetime.now().strftime("%Y-%m-%d %H:%M:%S")),
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "msg": "Message received. Thank you!"})


@app.route("/api/stats")
def stats():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM queries")
    q = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM visitors")
    v = c.fetchone()[0]
    conn.close()
    return jsonify({"queries": q, "visitors": v})


@app.route("/admin")
def admin():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT * FROM queries ORDER BY id DESC")
    queries = c.fetchall()
    c.execute("SELECT COUNT(*) FROM visitors")
    visits = c.fetchone()[0]
    conn.close()
    return render_template("admin.html", queries=queries, visits=visits)


if __name__ == "__main__":
    app.run(debug=True)