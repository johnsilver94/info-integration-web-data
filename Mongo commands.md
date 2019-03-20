//create admin user
```bash
use admin
db.createUser(
  {
    user: "mongo",
    pwd: "mongo",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

// create vehicles collection in mongo
```bash
db.createCollection('policy_vehicles',{autoIndexId:true})
```

//drop collection
```bash
db.policy_vehicles.drop()
```

//View data
```bash
db.policy_vehicles.find()
```

//insert vehicles in collection
```bash
db.policy_vehicles.insert({policyid:1,in_leasing:true,manufacturer:'Kia',model:'Rio',observations:'observations',security_system:true,type:'hatchback',year:2012,value:10000})
db.policy_vehicles.insert({policyid:2,in_leasing:true,manufacturer:'Volvo',model:'S90',security_system:true,type:'sedan',year:2018,value:47505})
db.policy_vehicles.insert({policyid:3,in_leasing:true,manufacturer:'Volvo',model:'V40',security_system:true,type:'estate',year:2016,value:20000})
db.policy_vehicles.insert({policyid:3,in_leasing:false,manufacturer:'Mazda',model:'Mazda3',security_system:true,type:'sedan',year:2017,value:21190})
db.policy_vehicles.insert({policyid:4,in_leasing:false,manufacturer:'Ford',model:'Mustang',observations:'second owner',security_system:true,type:'sedan',year:2018,value:34200})
db.policy_vehicles.insert({policyid:5,in_leasing:true,manufacturer:'Mazda',model:'Mazda6',security_system:true,type:'sedan',year:2019,value:25190})
db.policy_vehicles.insert({policyid:6,in_leasing:false,manufacturer:'Volvo',model:'XC60',security_system:true,type:'SUV',year:2016,value:41735})
```