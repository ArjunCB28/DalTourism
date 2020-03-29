from flask import Flask,request
from flask_cors import CORS, cross_origin
import json
import os
from random import randint

import smtplib
from flask_mysqldb import MySQL

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
app.config['MYSQL_HOST'] = 'database-1.cmr8tyiaftvb.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'cloudproject'
app.config['MYSQL_DB'] = 'daltourism'

mysql= MySQL(app)

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
    emailId=loginData['email']
    password=loginData['password']
    cursor=mysql.connection.cursor()
    cursor.execute('SELECT userId,emailId,password FROM users WHERE emailId= %s AND password = %s', (emailId, password))
    account=cursor.fetchone()
    print("account",account)
    if(account is not None):
        if(emailId==account[1] and password==account[2]):
            print("Login Successful")
            return requestSuccess
        else:
            print("Login Not successfull")
    else:
         print("Login Not successfull")
         return requestFailed
    # TODO loginData has username and password.
    # check it against database and return requestSuccess/requestFailed
    requestSuccess["userId"] = account[0]
    return requestSuccess

# signup endpoint
@app.route('/signup', methods = ['POST'])
@cross_origin()
def signup():
    signUpData = decodeData(request.json)
    print(signUpData)
    firstName = signUpData['firstName']
    lastName  = signUpData['lastName']
    emailId = signUpData['emailId']
    password=signUpData['password']
    print("type of password",type(password))
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users(firstName, lastName, emailId, password) VALUES (%s, %s, %s, %s)",(firstName,lastName,emailId,password))
    otp=randint(50000,70000)
    #cur.execute("INSERT INTO otp(userId, emailId, password) VALUES (%s, %s, %s)",(userId,emailId,password))
    sendOTP(emailId, otp)

    # TODO signUpData has firstname, lastname, email and password. store this in db
    # call 2 factor authentication
    userId= cur.lastrowid
    print("cursor last rowID",cur.lastrowid)
    requestSuccess["userId"] = userId
    cur.execute("INSERT INTO otp(userId, emailId, otp) VALUES (%s, %s, %s)",(userId,emailId,otp))
    mysql.connection.commit()
    cur.close()
    # TODO signUpData has firstname, lastname, email and password. store this in db
    # call 2 factor authentication
    #requestSuccess["userId"] = 1
    # TODO replace the above value 0 with the rowId obtained after inserting the data into table
    return requestSuccess

# validate OTP
@app.route('/validateOTP', methods = ['POST'])
@cross_origin()
def validateOTP():
     #userId = request.args.get('userId')
    #print("userid in validate otp fun",userId)
    optData = decodeData(request.json)
    print("otp in userID",optData)
    cur = mysql.connection.cursor()
    cur.execute("SELECT userId from otp WHERE rowId=(SELECT max(rowId) from otp)")
    user_id= cur.fetchall()
    cur.execute("SELECT otp from otp WHERE rowId=(SELECT max(rowId) from otp)")
    otp= cur.fetchall()
    print("userid from database table otp:",user_id)
    print("otp from database:",otp)
    for r in otp:
        if optData['otp']==r[0]:
            print("Success")
            return requestSuccess
        else:
            print("Wrong match")
            return requestFailed

# search for locations endpoint
@app.route('/locations', methods = ['GET'])
@cross_origin()
def locations():
    list_1=[]
    dict_items={}
    dict_items['locations']={}
    locationId = request.args.get('id')
    print(locationId)
    cur = mysql.connection.cursor()
    cur.execute("SELECT * from locations")
    locations= cur.fetchall()
    print("tuple",locations)
    
    for i in range(len(locations)):
       dict_items={
                   'id': locations[i][0],
                   'name':locations[i][1],
                   'description':locations[i][2],
                    'province':locations[i][3],
                    'distance':locations[i][4],
                     'price':locations[i][5]
             }
       list_1.append(dict_items)
    #print("list_1",list_1)
    #locations["locations"] = encodeArray(list_1)
    data = {}
    data["data"] = {"locations":encodeArray(list_1)}
    data["status"] = 200
    return data


# validate OTP
@app.route('/bookTickets', methods = ['POST'])
@cross_origin()
def bookTickets():
    val=[]
    tickets = decodeData(request.json)
    print(tickets)
    for i in tickets.values():
        val.append(i)
    userId = val[0]
    locationId = val[1]
    tickets= val[2]
    date= val[3]
    print(type(date))
    overallCost=val[4]
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO tickets(userId, locationId, tickets, date, overallCost) VALUES (%s, %s, %s, %s, %s)",(userId,locationId,tickets,date,overallCost))
    mysql.connection.commit()
    return requestSuccess

# validate OTP
@app.route('/getTickets', methods = ['GET'])
@cross_origin()
def getTickets():
    list_tickets=[]
    #userId = request.args.get('userId')
    cur = mysql.connection.cursor()
    cur.execute("select locations.name, locations.decription, locations.province, locations.distance, locations.price, tickets.overallCost,tickets.tickets,tickets.userId,tickets.date from locations join tickets on locations.id = tickets.locationId where tickets.userId= (SELECT max(userId) from tickets)")
          
    gettickets= cur.fetchall()
    for i in range(len(gettickets)):
        dict_items1={
            'userId': gettickets[i][7],
            'locationName':gettickets[i][0],
            'description': gettickets[i][1],
            'province': gettickets[i][2],
            'distance': gettickets[i][3],
            'date':gettickets[i][8],
            'price': gettickets[i][4],  
            'overallPrice':gettickets[i][5],
            'tickets':gettickets[i][6],
            'ticketCode': randint(50000,70000)
            
        }
        
        list_tickets.append(dict_items1)
    print("FInalList",list_tickets)    
    data = {}
    data["data"] = {"ticket":encodeObj(list_tickets[0])}
    data["status"] = 200
    print("data",data)
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