from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



app.config['MONGO_URI'] = 'mongodb://localhost:27017/sales_data'
mongo = PyMongo(app)

# Create the sales collection
sales_collection = mongo.db.sales
excel_data_collection = mongo.db.excel_data

@app.route('/api/sales', methods=['POST'])
def add_sales_data():
    try:
        data = request.get_json()
        name = data.get('name')
        product = data.get('product')
        date = data.get('date')
        quantity = data.get('quantity')

        sales_data = {
            'name': name,
            'product': product,
            'date': date,
            'quantity': quantity
        }

        sales_collection.insert_one(sales_data)

        return jsonify(message='Sales data added successfully'), 200
    except Exception as e:
        return jsonify(message=str(e)), 500

@app.route('/api/sales', methods=['GET'])
def get_all_sales_data():
    try:
        sales_data = list(sales_collection.find())
        for record in sales_data:
            record['_id'] = str(record['_id'])  # Convert ObjectId to string
        return jsonify(sales_data), 200
    except Exception as e:
        return jsonify(message=str(e)), 500

# Create the excel_data collection
excel_data_collection = mongo.db.excel_data

@app.route('/api/excels', methods=['POST'])
def add_excel_data():
    try:
        if 'file' not in request.files:
            return jsonify(message='No file provided'), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify(message='No file selected'), 400

        if not file.filename.endswith(('.xlsx', '.xls')):
            return jsonify(message='Invalid file format'), 400

        # Clear existing excel_data collection before inserting new data
        excel_data_collection.delete_many({})

        # Parsing Excel file
        df = pd.read_excel(file, engine='openpyxl')

        # Convert the data to a list of dictionaries
        excel_data = df.to_dict(orient='records')

        # Insert the data into the database
        excel_data_collection.insert_many(excel_data)

        return jsonify(message='Excel data added successfully'), 200
    except Exception as e:
        return jsonify(message=str(e)), 500 

@app.route('/api/excels', methods=['GET'])
def get_all_excel_data():
    try:
        excel_data = list(excel_data_collection.find())
        for record in excel_data:
            record['_id'] = str(record['_id'])  # Convert ObjectId to string
        return jsonify(excel_data), 200
    except Exception as e:
        return jsonify(message=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
