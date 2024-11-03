// docker exec -it mongo1 mongo

rs.initiate({
  _id: "my-mongo-set",
  members: [
    { _id: 0, host: "172.18.0.2:27017" },
    { _id: 1, host: "172.18.0.3:27017" },
    { _id: 2, host: "172.18.0.4:27017" },
  ],
});

rs.status();

// создание dump

// mongodump --uri="mongodb://172.18.0.2:27017,172.18.0.3:27017,172.18.0.4:27017/?replicaSet=my-mongo-set" -d accel --out /home/nardo/bd/dump/replica

// Восстановление

// mongorestore --uri="mongodb://172.18.0.2:27017,172.18.0.3:27017/?replicaSet=my-mongo-set" --db accel --dir=/home/nardo/bd/dump/replica/accel
