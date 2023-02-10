
## Realtime Chatting Application (2023)



### Features 
- login and registration.
- user can see who are in currently online (activity status).
- user active status update when he/she leave site or login /logout
- user can create private room to send message one to one. like facebook chat.
- use can see their previous chat message.

### Database
- MySQL


### Model
User 
- username
- password
- email 
- isOnline (boolean)


Room
- roomId (unique)

Message
- text 
- senderId (User)
- receiverId (User)
- roomId (Room Table rootId ref)
- createdAt 
- seen (boolean)



### Packages 
- ReactJS
- Redux-toolKit
- Context
- Socket.io
- Prisma (ORM)
- ExpressJS
- MySql


### Previews 
Homepage list of users
![](thumbs/localhost_5173_messenger_14asd.webp)

Messenger
![](thumbs/localhost_5173_messenger_14ewrwerpy.webp)

![](thumbs/localhost_5173_mfdsf.webp)
