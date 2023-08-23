# Scarab Doc
#### Named after `Glorious Scarab`

<img src="./src/assets/scarab.png" width="45" style="margin:15px 0"/>

Scarab Doc is written in react typescript and is a colaborative editing tool. To use it is very easy just enter your username which must be unqiue and thats it, more functionalities will be comming soon

Architecturally, client-side code communicates via WebSocket with a central server that stores in-memory data structures. This makes the editor very fast, allows us to avoid provisioning a database, and makes testing much easier. The tradeoff is that documents are transient and lost between server restarts
