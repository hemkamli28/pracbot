import pymongo
from bson import ObjectId
from flask import Flask, request, jsonify, render_template

# MongoDB connection details
DATABASE_URL = "mongodb+srv://hemkamli425:WhrsGjX8TBqmSI6g@cluster0.t3gtalu.mongodb.net/"
DATABASE_NAME = "practicalexam"
COLLECTION_NAME = "users"

# Initialize Flask app
app = Flask(__name__)

# Connect to MongoDB
try:
    # Connect to the MongoDB server
    client = pymongo.MongoClient(DATABASE_URL)
    
    # Access your database
    db = client[DATABASE_NAME]

    # Access your collection
    collection = db[COLLECTION_NAME]
    
    print("Successfully connected to MongoDB!")
except pymongo.errors.ConnectionFailure as e:
    print("Could not connect to MongoDB:", e)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_user_data", methods=["POST"])
def get_user_data():
    user_id = request.form.get("user_id")
    user_data = collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        # Exclude the MongoDB document ID and any sensitive fields before returning
        user_data.pop('_id', None)
        user_data.pop('password', None)  # Example: If 'password' is a sensitive field
        user_data.pop('__v',None)
        user_data.pop('role',None)
        return jsonify(user_data)
    else:
        return jsonify({"error": "User ID not found in the database."})


if __name__ == "__main__":
    app.run(debug=True, port=5002)
