from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:1234@localhost:5432/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    CORS(app)

    with app.app_context():
        from models import Weapon, Skin, SkinModel, Player
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

    @app.route('/api/player/<id>', methods=['POST'])
    def add_player(id):
        
        return

    @app.route('/api/player/<id>', methods=['GET'])
    def show_players():
        return

    @app.route('/api/player/<id>', methods=['PUT'])
    def edit_player(pId, name, type, origin, age):
        # user = session.query()
        
        return

    @app.route('/api/player/<id>', methods=['DELETE'])
    def delete_player():
        return

    # ---------------------------SKIN MODELS-------------------------------------
    # Creates skin model
    @app.route('/api/skins/model', methods=['POST'])
    def create_skin_model():
        data = request.get_json()

        if not data or 'modelName' not in data or 'wId' not in data:
            return jsonify({"error": "Invalid input"}), 400
        
        weapon = Weapon.query.get(data['wId'])

        if not weapon:
            return jsonify({"error": "Weapon not found"}), 404
        
        new_skin_model = SkinModel(
            modelName=data['modelName'],
            wId=data['wId'],
        )

        db.session.add(new_skin_model)
        db.session.commit()

        return jsonify({
            "modelName": new_skin_model.modelName,
            "wId": new_skin_model.wId,
        }), 201

    #Gets all models
    @app.route('/api/skins/model', methods=['GET'])
    def get_skin_models():
        skin_model = SkinModel.query.all()
        weapons_list = [{"wId": skinmodel.wId, "modelName": skinmodel.modelName, "modelId": skinmodel.modelId} for skinmodel in skin_model]
        return jsonify(weapons_list)
    
    # ---------------------------SKINS-------------------------------------
    
    return app



if __name__ == '__main__':
    app = create_app()
    app.run(port=8080, debug=True)