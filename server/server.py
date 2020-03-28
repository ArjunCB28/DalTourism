from flask import Flask,request
from flask_cors import CORS, cross_origin
import json
import os

import smtplib

# 2-factor authentication part
fromEmail = "daltourism@gmail.com"
password = "ebsxnukedqyqzmrx"

def sendOTP(emailId, otp):
	with smtplib.SMTP('smtp.gmail.com',587) as smtp:
		smtp.ehlo()
		smtp.starttls()
		smtp.ehlo()

		smtp.login(fromEmail,password)
		subject = "DalTourism Signup OTP"
		body = "Your OTP is "+str(otp)
		msg = f'Subject:{subject}\n\n{body}'
		smtp.sendmail(fromEmail,emailId,msg)
# 2-factor authentication ends here

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# request success
requestSuccess = {}
requestSuccess['status'] = 200
requestSuccess['message'] = 'success'

# request success
requestFailed = {}
requestFailed['status'] = 401
requestFailed['message'] = 'failed'

loginFailure = {}

# login endpoint
@app.route('/login', methods = ['POST'])
@cross_origin()
def login():
	loginData = decodeData(request.json)
	print(loginData)
	# TODO loginData has username and password.
	# check it against database and return requestSuccess/requestFailed
	requestSuccess["userId"] = 1
	return requestSuccess

# signup endpoint
@app.route('/signup', methods = ['POST'])
@cross_origin()
def signup():
	signUpData = decodeData(request.json)
	print(signUpData)
	# TODO signUpData has firstname, lastname, email and password. store this in db
	# call 2 factor authentication
	requestSuccess["userId"] = 1
	# TODO replace the above value 0 with the rowId obtained after inserting the data into table
	return requestSuccess

# validate OTP
@app.route('/validateOTP', methods = ['POST'])
@cross_origin()
def validateOTP():
	optData = decodeData(request.json)
	print(optData)
	# TODO optData has otp
	# TODO replace the above value 0 with the rowId obtained after inserting the data into table
	return requestSuccess

# search for locations endpoint
@app.route('/locations', methods = ['GET'])
@cross_origin()
def locations():
	locationId = request.args.get('id')
	print(locationId)
	if locationId != None:
		# replace the below logic with db request
		#TODO replace the 
		with open('location.json') as json_file:
			location = json.load(json_file)
			location["locations"] = encodeObj(location["location"])
			data = {}
			data["data"] = location
			data["status"] = 200
			return data
	else:
		# replace the below logic with db request
		with open('locations.json') as json_file:
			locations = json.load(json_file)
			locations["locations"] = encodeArray(locations["locations"])
			data = {}
			data["data"] = locations
			data["status"] = 200
			return data

# validate OTP
@app.route('/bookTickets', methods = ['POST'])
@cross_origin()
def bookTickets():
	tickets = decodeData(request.json)
	print(tickets)
	# TODO optData has otp
	# TODO replace the above value 0 with the rowId obtained after inserting the data into table
	return requestSuccess

# validate OTP
@app.route('/getTickets', methods = ['GET'])
@cross_origin()
def getTickets():
	userId = request.args.get('userId')
	print(userId)
	# replace the below logic with db request
	#TODO replace the 
	with open('ticket.json') as json_file:
		ticket = json.load(json_file)
		ticket["ticket"] = encodeObj(ticket["ticket"])
		data = {}
		data["data"] = ticket
		data["status"] = 200
		return data



def encodeString(string):
	outputString = ""
	temp = string[0]
	count = 1
	for i in range(1,len(string)):
		currentChar = string[i]
		if currentChar == temp:
			count += 1
		else:
			outputString += temp + str(count)
			count = 1
		temp = currentChar
	outputString += temp + str(count)
	return outputString

def encodeObj(data):
	for key in data:
		data[key] = encodeString(str(data[key]))
	return data

def encodeArray(data):
	for i in range(0,len(data)):
		data[i] = encodeObj(data[i])
	return data

def decodeString(string):
	tempString = ""
	i = 0
	while i < len(string):
		count = int(string[i+1])
		for j in range(0,count):
			tempString += string[i]
		i += 2
	return tempString

def decodeData(data):
	for key in data:
		data[key] = decodeString(data[key])
	return data

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))


# url to be given in the util services