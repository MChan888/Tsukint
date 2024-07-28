from flask import Flask, send_from_directory
from models import db, Player, Weapon, Skin

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:1234@localhost:5432/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False



@app.route('/frontend', methods = ["POST"])
def add_player(player):
    db.session.add(player)
    db.session.commit()
    return 

@app.route('/frontend', methods = ["GET"])
def show_players():
    return

@app.route('/frontend', methods = ["PUT"])
def update_player():
    return

@app.route('/frontend', methods = ["DELETE"])
def delete_player():
    db.session.delete(player)
    return

@app.route('/front/player')
def player():
    return send_from_directory(app.front + '/player', 'index.html')

@app.route('/front/skins')
def skins():
    return send_from_directory(app.front + '/skins', 'index.html')

@app.route('/front/weapons')
def weapons():
    return send_from_directory(app.front + '/weapons', 'index.html')

if __name__ == '__main__':
    app.run()