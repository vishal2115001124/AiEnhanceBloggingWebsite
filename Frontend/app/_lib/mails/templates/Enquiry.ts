const enquiry=(sender:any):string=>`<!DOCTYPE html>
<html>
  <head>
    <title>Enquiry</title>
    <link rel="stylesheet" href="styles.css" />
    <style>
      body{
        background-color: #d4a373;
      }
      .details{
        font-family: system-ui;
        color:black;
        background-color: white;
        padding:5px;
        border-radius: 10px;
        padding-left:10px;
        margin: 10px;
        padding-bottom:20px;
      }
    </style>
  </head>
  
  <body>
      <div class="details">
        <h1>User Info</h1>
        <div>
          <div>
            <span>FullName :</span>
            <span>${sender.fullname}</span>
          </div>          
          <div>
            <span>Email :</span>
            <span>${sender.email}</span>
          </div>          
          <div>
            <span>Phone No. :</span>
            <span>${sender.phone}</span>
          </div>         
          <div>
            <span>subject :</span>
            <span>${sender.subject}</span>
          </div>
        </div>
      </div>
            <div class="details">
        <h1>Message</h1>
        <div>
          <div>
              <p>${sender.message}</p>
          </div>          
        </div>
      </div>
  </body>
</html>`;


export default enquiry;