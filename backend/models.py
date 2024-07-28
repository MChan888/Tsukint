from app import db

class Player(db.Model):
    __tablename__ = 'players'
    pId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pName = db.Column(db.String, nullable=False)
    pType = db.Column(db.String, nullable=False)
    pOrigin = db.Column(db.String, nullable=False)
    pAge = db.Column(db.Integer, nullable=False)

class Weapon(db.Model):
    __tablename__ = 'weapons'
    wId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    wName = db.Column(db.String, nullable=False)
    wPrice = db.Column(db.Integer, nullable=False)
    wType = db.Column(db.String, nullable=False)
    wOrigin = db.Column(db.String, nullable=False)

class Skin(db.Model):
    __tablename__ = 'skins'
    sId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sName = db.Column(db.String, nullable=False)
    wId = db.Column(db.Integer, db.ForeignKey('weapons.wId'))
    sMPrice = db.Column(db.Integer, nullable=False)
    sFloat = db.Column(db.Integer, nullable=False)

class SkinModel(db.Model):
    __tablename__ = 'skinmodel'
    modelId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    modelName = db.Column(db.String, nullable=False)
    wId = db.Column(db.Integer, db.ForeignKey('weapons.wId'))