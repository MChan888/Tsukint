from flask import Flask, send_from_directory, jsonify, insert
from models import db, Player, Weapon, Collection, Skin

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:1234@localhost:5432/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


@app.route('/', methods = ["POST"])
def add_player(player):
    return 

@app.route('/', methods = ["GET"])
def show_players():
    players = db.query('SELECT * FROM players')
    return jsonify(players)

@app.route('/', methods = ["PUT"])
def update_player():
    return

@app.route('/', methods = ["DELETE"])
def delete_player():
    return

if __name__ == '__main__':
    app.run(debug=True)