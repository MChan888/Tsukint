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

    @app.route('/api/player/<int:id>', methods=['POST'])
    def add_player(id):
        
        return

    @app.route('/api/player/<int:id>', methods=['GET'])
    def get_players():
        players = Player.query.all()
        player_list = [{"pId": player.pId, "pName": player.pName, "pType": player.pType, "pOrigin":player.pOrigin, "pAge":player.pAge} for player in players]
        return jsonify(player_list)

    @app.route('/api/player/<int:id>', methods=['PUT'])
    def edit_player(pId, name, type, origin, age):
        # user = session.query()
        
        return

    @app.route('/api/player/<int:id>', methods=['DELETE'])
    def delete_player(id):
        player = Player.query.get(id)
        
        if player:
            db.session.delete(player)
            db.session.commit()
            return jsonify({f'Persona con ID igual a {id} eliminada.'}), 200
        else:
            return jsonify({f'Error: no se ha encontrado a un jugador con ID {id}.'}), 404

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

    @app.route('/api/skins', methods=['POST'])
    def create_skin():
        data = request.get_json()

        if not data or 'pId' not in data:
            return jsonify({"error": "Invalid input"}), 400
        

        player = Player.query.get(data['pId'])

        if not player:
            return jsonify({"error": "Player not found"}), 404
        
        randomSkinModels = SkinModel.query.all()
        randomSkinModelId = random.randint(1, len(randomSkinModels)-1)

        randomFloat = random.randint(1,5)

        new_skin = Skin(
            sName=randomSkinModels[randomSkinModelId].modelName,
            wId=randomSkinModels[randomSkinModelId].wId,
            pId=data['pId'],
            sFloat=randomFloat,
            sMPrice=randomFloat*1000
        )

        db.session.add(new_skin)
        db.session.commit()

        return jsonify({
            "sName": new_skin.sName,
            "wId": new_skin.wId,
            "pId": new_skin.pId,
            "sFloat": new_skin.sFloat,
            "sMPrice": new_skin.sMPrice,
        }), 201
    
    @app.route('/api/skins/<int:pId>', methods=['GET'])
    def get_player_skins(pId):
        player = Player.query.get(pId)
        if not player:
            return jsonify({"error": "Player not found"}), 404
            
        skins = Skin.query.filter_by(pId=pId).all()
        skins_list = [{"sId": skin.sId, "sName": skin.sName, "wId": skin.wId, "sMPrice": skin.sMPrice, "sFloat": skin.sFloat, "pId": skin.pId} for skin in skins]
        return jsonify(skins_list)

    
    return app



if __name__ == '__main__':
    app = create_app()
    app.run(port=8080, debug=True)