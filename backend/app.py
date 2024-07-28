from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:1234@localhost:5432/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    CORS(app)

    with app.app_context():
        from models import Weapon
        db.create_all()

        weapons = [
            {"wName": "AWP", "wType": "scopedRifle", "wPrice": 4750, "wOrigin": "UK"},
            {"wName": "M4A4", "wType": "rifle", "wPrice": 3100, "wOrigin": "US"},
            {"wName": "AK47", "wType": "rifle", "wPrice": 2700, "wOrigin": "RUS"},
            {"wName": "Karambit", "wType": "melee", "wPrice": 9999, "wOrigin": "ARG"},
            {"wName": "MP9", "wType": "submachinegun", "wPrice": 1350, "wOrigin": "US"},
        ]

        for weapon in weapons:
            exists = Weapon.query.filter_by(wName=weapon['wName'], wType=weapon['wType'], wPrice=weapon['wPrice'], wOrigin=weapon['wOrigin']).first()
            if not exists:
                db.session.add(Weapon(**weapon))

        db.session.commit()
    @app.route('/api/weapons', methods=['GET'])
    def get_weapons():
        weapons = Weapon.query.all()
        weapons_list = [{"wId": weapon.wId, "wName": weapon.wName, "wType": weapon.wType, "wPrice": weapon.wPrice, "wOrigin": weapon.wOrigin} for weapon in weapons]
        return jsonify(weapons_list)

    return app



if __name__ == '__main__':
    app = create_app()
    app.run(port=8080, debug=True)