rs.initiate({
  _id: "my-mongo-set",
  members: [
    { _id: 0, host: "172.18.0.2:27017" },
    { _id: 1, host: "172.18.0.3:27017" },
    { _id: 2, host: "172.18.0.4:27017" },
  ],
});

rs.status();

rs.stepDown(); // если меняем конфиг

// docker exec -it mongo1 mongod

// Получаем IP адрес
// docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo1

// mongodb://172.18.0.2:27017,172.18.0.3:27017,172.18.0.4:27017/?replicaSet=my-mongo-set

// mongodb://localhost:27001,localhost:27002,localhost:30003/?replicaSet=my-mongo-set

rs.add("172.18.0.5:27017", true);
// or
rs.add({ host: "172.18.0.5:27017", priority: 1 });
