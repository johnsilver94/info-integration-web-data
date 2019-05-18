--- DB LINKS
-- ORCL LINK
DROP DATABASE LINK oracleDB;
CREATE DATABASE LINK oracleDB
   CONNECT TO C##TEST IDENTIFIED BY test
   USING '//localhost:1521/ORCL';

---ORCL TEST
select * from customer@oracleDB;


--- PG LINK
DROP DATABASE LINK PostgresDB;
CREATE DATABASE LINK PostgresDB
   CONNECT TO "postgres" IDENTIFIED BY postgres
   USING 'PostgresDB';

--- PG Test
select * from "INSURANCEPOLICY"@PostgresDB;
select * from "AUTOPOLICY"@PostgresDB;


---Mongo LINK

DROP DATABASE LINK MongoDB;
CREATE DATABASE LINK MongoDB USING 'MONGODB';

SELECT * FROM "policy_vehicles"@MongoDB;



---EXTERNAL CSV
CREATE OR REPLACE DIRECTORY csv_ds
    AS 'C:\Users\silver_fang\Desktop\info-integration-web-data\csv_ds';
GRANT ALL ON DIRECTORY csv_ds TO PUBLIC;

DROP TABLE  "TravelPolicy_Destinations";

CREATE TABLE "TravelPolicy_Destinations" (
  "POLICY_ID" NUMBER(19,2) NOT NULL,
  "COUNTRY" VARCHAR2(255 CHAR) NOT NULL
)
ORGANIZATION EXTERNAL (
  TYPE ORACLE_LOADER
  DEFAULT DIRECTORY csv_ds
  ACCESS PARAMETERS (
    RECORDS DELIMITED BY NEWLINE
    FIELDS TERMINATED BY ','
    MISSING FIELD VALUES ARE NULL
  )
  LOCATION ('TravelPolicy_Destinations.csv')
)
REJECT LIMIT UNLIMITED;


SELECT * FROM "TravelPolicy_Destinations";


---------------------------------------------User privileges-------------------------------------------------

select * from dba_network_acls;



grant connect, resource to C##FDBASE;
grant CREATE VIEW to C##FDBASE;
grant CREATE ANY DIRECTORY to C##FDBASE;
grant create database link to C##FDBASE;
grant execute on utl_http to C##FDBASE;
grant execute on dbms_lob to C##FDBASE;
grant JAVAUSERPRIV to C##FDBASE;
call dbms_java.grant_permission( 'C##FDBASE', 'SYS:java.lang.RuntimePermission', '*', '' );

--- Permissions to invoke REST URLs on ports--------------------------------------------------------------------------------------------
begin
  DBMS_NETWORK_ACL_ADMIN.append_host_ace (
      host       => 'localhost',
      lower_port => 8080,
      upper_port => 8080,
      ace        => xs$ace_type(privilege_list => xs$name_list('http'),
                                principal_name => 'C##FDBASE',
                                principal_type => xs_acl.ptype_db));
  end;
/
---
begin
  dbms_network_acl_admin.append_host_ace (
      host       => 'localhost',
      lower_port => 8090,
      upper_port => 8090,
      ace        => xs$ace_type(privilege_list => xs$name_list('http'),
                                principal_name => 'C##FDBASE',
                                principal_type => xs_acl.ptype_db));
  end;
/

---
select dbms_xdb.gethttpport from dual;
begin DBMS_XDB.SETHTTPPORT(8080); end; --- wildfly rest services on 8080
/


---Mongo Service
CREATE OR REPLACE FUNCTION get_rest_data(pURL VARCHAR2, pMediaType VARCHAR2)
RETURN clob IS
  l_req   utl_http.req;
  l_resp  utl_http.resp;
  l_buffer clob;
begin
  l_req  := utl_http.begin_request(pURL,'GET');
  utl_http.set_header(l_req, 'content-type', pMediaType);

  l_resp := utl_http.get_response(l_req);
  UTL_HTTP.READ_TEXT(l_resp, l_buffer);
  utl_http.end_response(l_resp);
  return l_buffer;
end;
/
---Get REST json data
SELECT get_rest_data('http://localhost:8080/vehicles', 'application/json') from dual;

select JSON_QUERY(
    get_rest_data('http://localhost:8080/vehicles', 'application/json') ,
    '$.policy_vehicles[2]') doc from dual;
--- Direct Query to REST json data--------------------------------------------------------------------------------------------------
with
json as
    (select JSON_QUERY(
        get_rest_data('http://localhost:8080/vehicles', 'application/json'),
        '$.policy_vehicles') doc from dual)
SELECT policyid,in_leasing,manufacturer,model,observations,security_system,type,year,value
FROM  JSON_TABLE( (select doc from json) , '$[*]'
            COLUMNS (
              policyid NUMBER(19,2) PATH '$.policyid',
              in_leasing NUMBER(1,0) PATH '$.in_leasing',
              manufacturer  VARCHAR2(255 CHAR) PATH '$.manufacturer',
              model VARCHAR2(255 CHAR)  PATH '$.model',
              observations VARCHAR2(255 CHAR) PATH '$.observations',
              security_system NUMBER(1,0) PATH '$.security_system',
              type VARCHAR2(255 CHAR)  PATH '$.type',
              year  NUMBER(4,0) PATH '$.year',
              value NUMBER(6,2)  PATH '$.value')
);

--------------------------------------------------------------------------------------------------------------------------------
--Direct VIEW from REST json data -------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW vehicles_view AS
with json as
    (select JSON_QUERY(
            get_rest_data('http://localhost:8080/vehicles', 'application/json'),
        '$.policy_vehicles') doc from dual)
SELECT policyid,in_leasing,manufacturer,model,observations,security_system,type,year,value
FROM  JSON_TABLE( (select doc from json) , '$[*]'
            COLUMNS (
              policyid NUMBER(19,2) PATH '$.policyid',
              in_leasing NUMBER(1,0) PATH '$.in_leasing',
              manufacturer  VARCHAR2(255 CHAR) PATH '$.manufacturer',
              model VARCHAR2(255 CHAR)  PATH '$.model',
              observations VARCHAR2(255 CHAR) PATH '$.observations',
              security_system NUMBER(1,0) PATH '$.security_system',
              type VARCHAR2(255 CHAR)  PATH '$.type',
              year  NUMBER(4,0) PATH '$.year',
              value NUMBER(6,2)  PATH '$.value')
);
SELECT * FROM vehicles_view;

--------------------------------------------------------------------------------------------------------------------------------
-- Raw REST json data Table ----------------------------------------------------------------------------------------------------------
DROP TABLE vehicles_raw;
CREATE TABLE vehicles_raw AS
select JSON_QUERY(
            get_rest_data('http://localhost:8080/vehicles', 'application/json'),
        '$.policy_vehicles') doc from dual;

select * from vehicles_raw;

-- VIEWS from Raw REST json data Table --------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW vehicles_view AS
SELECT policyid,in_leasing,manufacturer,model,observations,security_system,type,year,value
FROM  JSON_TABLE( (select doc from vehicles_raw) , '$[*]'
            COLUMNS (
              policyid NUMBER(19,2) PATH '$.policyid',
              in_leasing NUMBER(1,0) PATH '$.in_leasing',
              manufacturer  VARCHAR2(255 CHAR) PATH '$.manufacturer',
              model VARCHAR2(255 CHAR)  PATH '$.model',
              observations VARCHAR2(255 CHAR) PATH '$.observations',
              security_system NUMBER(1,0) PATH '$.security_system',
              type VARCHAR2(255 CHAR)  PATH '$.type',
              year  NUMBER(4,0) PATH '$.year',
              value NUMBER(6,2)  PATH '$.value')
);

SELECT * FROM vehicles_view;



-------------------------------------------------------------------------------------------



