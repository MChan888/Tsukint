from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'players'
    pId = db.Column(db.Integer, primary_key=True)
    pName = db.Column(db.String, nullable=False)
    pType = db.Column(db.String, nullable=False)
    pOrigin = db.Column(db.String, nullable=False)
    pAge = db.Column(db.Integer, nullable=False)

class Weapon(db.Model):
    __tablename__ = 'weapons'
    wId = db.Column(db.Integer, primary_key=True)
    wName = db.Column(db.String, nullable=False)
    wType = db.Column(db.String, nullable=False)
    wOrigin = db.Column(db.String, nullable=False)

class Collection():
    __talbename__ = 'collections'
    cId = db.Column(db.Integer, primary_key=True)
    cName = db.Column(db.String, nullable=False)

class Skin(db.Model):
    __tablename__ = 'players'
    sId = db.Column(db.Integer, primary_key=True)
    sName = db.Column(db.String, nullable=False)
    wId = db.Column(db.String, db.ForeignKey('weapons.id'))
    sMPrice = db.Column(db.Integer, nullable=False)
    sFloat = db.Column(db.String, nullable=False)
    pId = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    cId = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)