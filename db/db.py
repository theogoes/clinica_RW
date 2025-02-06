import os, pymongo
from dotenv import load_dotenv


async def insertInfos(data):
    load_dotenv()
    conection_string = os.getenv('MONGO_URL')
    client = pymongo.MongoClient(conection_string)
    db = client.get_database('clinica')
    print("data recebida: ", data)
    print("conectado com o baco de dados: ",db)
    collection = db["infos"]
    print("conectado com a coleção: ",collection)
    print("tentando inserir os dados...")
    resp = await collection.insert_one(data)
    return resp
    
