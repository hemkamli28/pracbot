import pymongo
from bson import ObjectId
from flask import Flask, request, jsonify, render_template, send_file
import shutil
from datetime import datetime

# MongoDB connection details
DATABASE_URL = "mongodb+srv://hemkamli425:WhrsGjX8TBqmSI6g@cluster0.t3gtalu.mongodb.net/"
DATABASE_NAME = "practicalexam"
USER_COLLECTION_NAME = "users"
PDF_COLLECTION_NAME = "paper"
EXAM_COLLECTION_NAME = "exams"
SOLUTION_COLLECTION_NAME = "solutions"

# Initialize Flask app
app = Flask(__name__)

# Connect to MongoDB
try:
    # Connect to the MongoDB server
    client = pymongo.MongoClient(DATABASE_URL)
    
    # Access your database
    db = client[DATABASE_NAME]

    # Access your collections
    user_collection = db[USER_COLLECTION_NAME]
    solution_collection = db[SOLUTION_COLLECTION_NAME]
    exam_collection = db[EXAM_COLLECTION_NAME]
    pdf_collection = db[PDF_COLLECTION_NAME]
    
    print("Successfully connected to MongoDB!")
except pymongo.errors.ConnectionFailure as e:
    print("Could not connect to MongoDB:", e)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_data", methods=["POST"])
def get_data():
    data_type = request.form.get("data_type")
    if data_type == "user":
        return get_user_data()
    elif data_type == "pdf":
        return download_pdf()
    elif data_type == "predefined":
        predefined_message = request.form.get("predefined_message")
        # Handle predefined messages here
        response_message = handle_predefined_message(predefined_message)
        return jsonify({"message": response_message})
    elif data_type == "subject_enrollment_response":
        # Retrieve subject and enrollment from the response
        subject = request.form.get("subject")
        enrollment = request.form.get("enrollment")
        # Fetch the grade using subject and enrollment
        grade = fetch_grade(subject, enrollment)
        return jsonify({"message": grade})
    elif data_type == "sem_branch_response":
        sem = request.form.get("sem")
        branch= request.form.get("branch")
        # Call get_student_exams function to get exam information
        exam_info = get_student_exams(sem, branch)
        if isinstance(exam_info, list):
            # If exams are found, return the list of exam information
            return jsonify({"exams": exam_info})
        else:
            # If no exams are found, return the message
            return jsonify({"message": exam_info})
    else:
        return jsonify({"error": "Invalid data type."})

def fetch_grade(subject, enrollment):
    # Find the exam document based on the subject\ print("Subject:", subject)
    print("Enrollment:", enrollment)
    print("Subject:", subject)

    # Find the user document based on the enrollment number
    
    exam_document = exam_collection.find_one({"subject": subject})
    print("Exam Document:", exam_document)
    if not exam_document:
        return "Exam not found for this subject."

    # Find the user document based on the enrollment number
    user_document = user_collection.find_one({"enrollment": enrollment})
    print("User Document:", user_document)
    if not user_document:
        return "User not found."
    print("Exam ID:", exam_document['_id'])
    print("User ID:", user_document['_id']);
    # Find the solution document based on the user, exam, and uploadedBy fields
    solution_document = solution_collection.find_one({
        "uploadedBy": user_document["_id"],
        "exam": exam_document["_id"]
    })
    
    print("Solution Document:", solution_document)
    if solution_document:
        # Extract and return the grade from the solution document
        return solution_document.get("grade", "Grade not available.")
    else:
        return "Grade not found for this user and subject."

def get_user_data():
    user_id = request.form.get("user_id")
    user_data = user_collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        # Exclude the MongoDB document ID and any sensitive fields before returning
        user_data.pop('_id', None)
        user_data.pop('password', None)  # Example: If 'password' is a sensitive field
        user_data.pop('__v',None)
        user_data.pop('role',None)
        return jsonify(user_data)
    else:
        return jsonify({"error": "User ID not found in the database."})

def handle_predefined_message(predefined_message):
    # Implement logic to handle predefined messages
    if predefined_message == "Get exam Instructions":
        return "Here are the exam instructions: ..."
    elif predefined_message == "Check Score":
        # Ask for the subject
        return "Please enter the subject."
    elif predefined_message == "Get exam Details":
        return "Here are the exam details: ..."
    else:
        return "Unknown predefined message."

def download_pdf():
    pdf_name = request.form.get("pdf_name")
    document = pdf_collection.find_one({"filename": pdf_name})
    if document:
        # Extract the file path from the document
        fp = "E:\\Sem 8\\IBM_Project\\Hem\\pracbot\\backend\\"
        file_path = document.get("path")
        file_path = fp + file_path
        try:
            download_path = "E:\\Sem 8\\IBM_Project\\python_Chatbot\\downloaded_pdf11.pdf"
            with open(file_path, 'rb') as source, open(download_path, 'wb') as dest:
                shutil.copyfileobj(source, dest)  # Copy the file contents
            # Return a success message
            return jsonify({"message": "PDF file downloaded successfully."})
        except Exception as e:
            return jsonify({"error": f"Error downloading PDF: {e}"})
    else:
        return jsonify({"error": "PDF not found in the database."})
    

from datetime import datetime

def get_student_exams(sem, branch):
    print("semester:", sem)
    print("Branch:", branch)
    
    exam_documents = exam_collection.find({"sem": sem, "branch": branch})
    print("Exam Documents:", exam_documents)
    
    exams_info = []
    today = datetime.now().date()  # Get today's date
    
    for exam_document in exam_documents:
        date_str = exam_document.get("date")  # Get the date string from the document
        if date_str:
            # Convert the date string to a datetime object
            exam_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            if exam_date > today:
                subject = exam_document.get("subject", "Subject not available")
                exams_info.append({"date": date_str, "subject": subject})
    
    if exams_info:
        for exam in exams_info:
            print("Date:", exam["date"])
            print("Subject:", exam["subject"])
        return exams_info
    else:
        return "No upcoming exams found for the specified semester and branch."


if __name__ == "__main__":
    app.run(debug=True, port=5002)
