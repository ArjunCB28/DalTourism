from flask import Flask,request
from flask_cors import CORS, cross_origin

import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# 2-factor authentication part
def sendOTP(receiver_email):
	port = 465
	smtp_server = "smtp.gmail.com"
	sender_email = "daltourism@gmail.com"
	sender_password = "Daltourism@123"
	# receiver_email = "arjuncb28@gmail.com"
	otp = "847534"

	message = MIMEMultipart("alternative")
	message["Subject"] = "Dal Tourism email validation OTP"
	message["From"] = sender_email
	message["To"] = receiver_email

	text = """\
	Hi user,

	Your OTP for registering in Dalhousie Tourism is %s

	Thanks,
	Dalhousie Tourism""" % otp
	body = MIMEText(text, "plain")
	message.attach(body)

	context = ssl.create_default_context()

	with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
		try:
			server.login(sender_email, sender_password)
			server.sendmail(sender_email, receiver_email, message.as_string())
		except Exception as e:
			print("Exception",e)
			server.quit()
		finally:
			server.quit()
# 2-factor authentication ends here

# data encoding and decoding

public String decode(String str) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < str.length(); i += 2) {
        int count = Integer.valueOf("" + str.charAt(i + 1));
        for (int j = 0; j < count; j++) {
            sb.append(str.charAt(i));
        }
    }
    return sb.toString();
}


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# login success
loginSuccess = {}
loginSuccess['status'] = 200
loginSuccess['message'] = 'success'

loginFailure = {}

# login endpoint
@app.route('/login', methods = ['GET'])
@cross_origin()
def login():
    return loginSuccess

# signup endpoint
@app.route('/signup', methods = ['POST'])
@cross_origin()
def signup():
	print(request.data)
	data = request.get_json()
	print(data['emailId'])
	return loginSuccess

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

