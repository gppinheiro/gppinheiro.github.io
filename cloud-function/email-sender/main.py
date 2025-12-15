import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import functions_framework

@functions_framework.http
def send_email(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    if request.method != 'POST':
        return ('Method Not Allowed', 405, headers)

    request_json = request.get_json(silent=True)
    
    if not request_json:
        return ('Missing JSON body', 400, headers)

    subject = request_json.get('subject')
    text = request_json.get('text')

    if not subject or not text:
        return ('Missing subject or text in request body', 400, headers)

    email_user = os.environ.get('EMAIL_USER')
    email_pass = os.environ.get('EMAIL_PASS')

    if not email_user or not email_pass:
        return ('Server misconfiguration: Missing email credentials', 500, headers)

    try:
        # Create the email
        msg = MIMEMultipart()
        msg['From'] = email_user
        msg['To'] = email_user # Sending to yourself
        msg['Subject'] = subject
        msg.attach(MIMEText(text, 'plain'))

        # Connect to Gmail SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(email_user, email_pass)
        text = msg.as_string()
        server.sendmail(email_user, email_user, text)
        server.quit()

        return ('Email sent successfully', 200, headers)

    except Exception as e:
        print(f"Error sending email: {e}")
        return (f'Error sending email: {str(e)}', 500, headers)
