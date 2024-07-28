from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    pName = db.Column(db.String, nullable=False)
    pType = db.Column(db.String, nullable=False)
    pOrigin = db.Column(db.String, nullable=False)
    pAge = db.Column(db.Integer, nullable=False)
    pWeapons = db.relationship("Weapon")

class Weapon(db.Model):
    __tablename__ = 'weapons'
    id = db.Column(db.Integer, primary_key=True)
    wName = db.Column(db.String, nullable=False)
    wType = db.Column(db.String, nullable=False)
    wPrice = db.Column(db.Integer, nullable=False, default=0)
    wOrigin = db.Column(db.String, nullable=False)
    pName = db.Column(db.String, db.ForeignKey('players.id'))

class Skin(db.Model):
    __tablename__ = 'skins'
    id = db.Column(db.Integer, primary_key=True)
    sName = db.Column(db.String, nullable=False)
    sWeapon = db.Column(db.String, nullable=False)
    sPrice = db.Column(db.Integer, nullable=False)
    pName = db.Column(db.String, db.ForeignKey('players.id'))