const welcomeMailTemplate=(sender:any):string=>`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Blogger.io</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            width: 250px;
            margin-bottom: 20px;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://i.ibb.co/7TmWyw9/logo.jpg" alt="logo" class="logo">
        <div class="header">Welcome to Blogger.io!</div>
        <p class="message">Hello ${sender.fullname},</p>
        <p class="message">We’re excited to have you onboard! Start exploring the latest blogs, write your own, and connect with amazing authors.</p>
        <a href="http://localhost:3000" class="button">Go to Home</a>
        <p class="footer">If you have any questions, feel free to contact our support team.</p>
        <p class="footer">Happy Blogging! 🚀</p>
    </div>
</body>
</html>`


export default welcomeMailTemplate;