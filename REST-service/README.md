
# node-mongo-service

## To run project

1. yarn install
2. yarn dev

## Project Description

REST service used to read, write, delete data from multiple tables from different databases.

### Database used

- Oracle
- Mongo
- Postgres

### REST service description

- Base url: <http://localhost:8080/>

#### Mongo

- Table(Collection) : policy_vehicles
  - Routers
    - /vehicles
      - GET: get all collection(with query)
    - /vehicles/:id
      - GET: get vehicle by id
      - PUT: update vehicle by id
      - DELETE: delete vehicle by id

#### Oracle

- Table(Collection) : TravelPolicy_Destinations
  - Routers
    - /destinations
      - GET: get all collection(with query)
    - /destinations/:id
      - GET: get destination by id

- Table(Collection) : AUTODATA
  - Routers
    - /autodata
      - GET: get all collection(with query)
      - POST: post into collection
    - /autodata/:id
      - GET: get autodata by id
      - PUT: update autodata by id
      - DELETE: delete autodata by id

- Table(Collection) : CUSTOMER
  - Routers
    - /customers
      - GET: get all collection(with query)
      - POST: post into collection
    - /customers/:id
      - GET: get customer by id
      - PUT: update customer by id
      - DELETE: delete customer by id

- Table(Collection) : PROFILE
  - Routers
    - /profiles
      - GET: get all collection(with query)
    - /profiles/:id
      - GET: get profile by id

- Table(Collection) : TRAVELDATA
  - Routers
    - /traveldata
      - GET: get all collection(with query)
    - /traveldata/:id
      - GET: get traveldata by id

#### Postgres

- Table(Collection) : AUTOPOLICY
  - Routers
    - /autopolicies
      - GET: get all collection(with query)
    - /autopolicies/:id
      - GET: get autopolicy by id

- Table(Collection) : TRAVELPOLICY
  - Routers
    - /travelpolicies
      - GET: get all collection(with query)
    - /travelpolicies/:id
      - GET: get travelpoly by id

- Table(Collection) : INSURANCEPOLICY
  - Routers
    - /insurancepolicies
      - GET: get all collection(with query)
      - POST: post into collection
    - /insurancepolicies/:id
      - GET: get insurancepolicy by id
      - PUT: update insurancepolicy by id
      - DELETE: delete insurancepolicy by id