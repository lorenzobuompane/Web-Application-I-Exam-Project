# Students
|   id   |  name   | surname |          email           | type  |       salt       |                               hash                               | password(not in db) |
| :----: | :-----: | :-----: | :----------------------: | :---: | :--------------: | :--------------------------------------------------------------: | :-----------------: |
| 247756 | Lorenzo |  Rossi  | lorenzo.rossi@polito.it  |       | 06ba6455e869a84d | 6597a8b16a16d1816a7c622d2d94eb87df56b0165505ddb900ced4029e9fa3a2 |      password       |
| 263243 |  Marco  | Gialli  |  marco.gialli@polito.it  |       | 6a2ff5e77541e132 | dedeb609831900026a70ce11fe6c32e285719eb541e6953612d7ef62e366e111 |      password       |
| 274639 | Giacomo |  Verdi  | giacomo.verdi@polito.it  |       | 46cc75dfa1cb9187 | 4258a96289882a639e075421997ee9e60b129b0a7102c3eddeaf405e1d4b7d80 |      password       |
| 254364 | Simone  |   Blu   |   simone.blu@polito.it   |       | edc59fdabe066545 | a06a0b9cc324c116ed040ea738c276ea5a2c879d4a3abd9a6685b137322bf3e8 |      password       |
| 236346 |  Paolo  | Arancio | paolo.arancio@polito.it  |       | 42e6b6e742897a9f | 9d6024b2bdc3ecb54c6aa72a1f3a121ffd74425d783784073f1326dc53a1cea8 |      password       |
| 264355 | Chiara  | Bianchi | chiara.bianchi@polito.it |       | 50e72b5184e93852 | ade0297f537eed4d8f3a537090cb227f904b1883653828e7397d8372b160584e |      password       |


## salt
06ba6455e869a84d
6a2ff5e77541e132
46cc75dfa1cb9187
edc59fdabe066545
42e6b6e742897a9f
50e72b5184e93852

## password
6597a8b16a16d1816a7c622d2d94eb87df56b0165505ddb900ced4029e9fa3a2
dedeb609831900026a70ce11fe6c32e285719eb541e6953612d7ef62e366e111
4258a96289882a639e075421997ee9e60b129b0a7102c3eddeaf405e1d4b7d80
a06a0b9cc324c116ed040ea738c276ea5a2c879d4a3abd9a6685b137322bf3e8
9d6024b2bdc3ecb54c6aa72a1f3a121ffd74425d783784073f1326dc53a1cea8
ade0297f537eed4d8f3a537090cb227f904b1883653828e7397d8372b160584e

## insert
"247756", "Lorenzo",  "Rossi", "lorenzo.rossi@polito.it", "06ba6455e869a84d", "6597a8b16a16d1816a7c622d2d94eb87df56b0165505ddb900ced4029e9fa3a2" 
"263243",  "Marco", "Gialli",  "marco.gialli@polito.it", "6a2ff5e77541e132", "dedeb609831900026a70ce11fe6c32e285719eb541e6953612d7ef62e366e111" 
"274639", "Giacomo",  "Verdi", "giacomo.verdi@polito.it", "46cc75dfa1cb9187", "4258a96289882a639e075421997ee9e60b129b0a7102c3eddeaf405e1d4b7d80" 
"254364", "Simone",   "Blu",   "simone.blu@polito.it", "edc59fdabe066545", "a06a0b9cc324c116ed040ea738c276ea5a2c879d4a3abd9a6685b137322bf3e8" 
"236346",  "Paolo", "Arancio", "paolo.arancio@polito.it", "42e6b6e742897a9f", "9d6024b2bdc3ecb54c6aa72a1f3a121ffd74425d783784073f1326dc53a1cea8" 
"264355", "Chiara", "Bianchi", "chiara.bianchi@polito.it", "50e72b5184e93852", "ade0297f537eed4d8f3a537090cb227f904b1883653828e7397d8372b160584e" 



# Courses
## no max, no preparatory
"02GOLOV", "Architetture dei sistemi di elaborazione", 12
"02LSEOV", "Computer architectures", 12
"01SQJOV, "Data Science and Database Technology", 8
"01SQMOV", "Data Science e Tecnologie per le Basi di Dati" , 8
"01SQLOV", "Database systems" , 8
"01TYMOV", "Information systems security services" , 12
"01UDUOV", "Sicurezza dei sistemi informativi" , 12
"01UDFOV", "Applicazioni Web I" , 6
"02GRSOV", "Programmazione di sistema" , 6
"01SQOOV", "Reti Locali e Data Center", 6
"01TYDOV", "Software networking", 7
"03UEWOV", "Challenge", 5
"01URROV", "Computational intelligence", 6
"01OUZPD", "Model based software design", 4
## si max, no preparatory
"01OTWOV", "Computer network technologies and services" , 6, 3
"02KPNOV", "Tecnologie e servizi di rete" , 6, 3
"01TXYOV", "Web Applications I" , 6, 3
"01NYHOV", "System and device programming" , 6, 3
"01URSPD", "Internet Video Streaming", 6, 2
## no max, si preparatory
"05BIDOV", "Ingegneria del software" , 6, "02GOLOV" 
"04GSPOV", "Software engineering" , 6, "02LSEOV" 
"01TXSOV", "Web Applications II", 6, "01TXYOV"




## insert
### no max, no preparatory
INSERT INTO Courses (id, name, creditsNumber) VALUES ("02GOLOV", "Architetture dei sistemi di elaborazione", 12);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("02LSEOV", "Computer architectures", 12);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01SQJOV", "Data Science and Database Technology", 8);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01SQMOV", "Data Science e Tecnologie per le Basi di Dati" , 8);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01SQLOV", "Database systems" , 8);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01TYMOV", "Information systems security services" , 12);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01UDUOV", "Sicurezza dei sistemi informativi" , 12);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01UDFOV", "Applicazioni Web I" , 6);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("02GRSOV", "Programmazione di sistema" , 6);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01SQOOV", "Reti Locali e Data Center", 6);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01TYDOV", "Software networking", 7);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("03UEWOV", "Challenge", 5);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01URROV", "Computational intelligence", 6);
INSERT INTO Courses (id, name, creditsNumber) VALUES ("01OUZPD", "Model based software design", 4);

## si max, no preparatory
INSERT INTO Courses (id, name, creditsNumber, studentsNumberMAX) VALUES ("01OTWOV", "Computer network technologies and services" , 6, 3);
INSERT INTO Courses (id, name, creditsNumber, studentsNumberMAX) VALUES ("02KPNOV", "Tecnologie e servizi di rete" , 6, 3);
INSERT INTO Courses (id, name, creditsNumber, studentsNumberMAX) VALUES ("01TXYOV", "Web Applications I" , 6, 3);
INSERT INTO Courses (id, name, creditsNumber, studentsNumberMAX) VALUES ("01NYHOV", "System and device programming" , 6, 3);
INSERT INTO Courses (id, name, creditsNumber, studentsNumberMAX) VALUES ("01URSPD", "Internet Video Streaming", 6, 2);

## no max, si preparatory
INSERT INTO Courses (id, name, creditsNumber, preparatoryCourse) VALUES ("05BIDOV", "Ingegneria del software" , 6, "02GOLOV" );
INSERT INTO Courses (id, name, creditsNumber, preparatoryCourse) VALUES ("04GSPOV", "Software engineering" , 6, "02LSEOV");
INSERT INTO Courses (id, name, creditsNumber, preparatoryCourse) VALUES ("01TXSOV", "Web Applications II", 6, "01TXYOV");


# Incompatible Courses
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("02GOLOV", "02LSEOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("02LSEOV", "02GOLOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQJOV", "01SQMOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQJOV", "01SQLOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQMOV", "01SQJOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQMOV", "01SQLOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQLOV", "01SQJOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01SQLOV", "01SQMOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01OTWOV", "02KPNOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("02KPNOV", "01OTWOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01TYMOV", "01UDUOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01UDUOV", "01TYMOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("05BIDOV", "04GSPOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("04GSPOV", "05BIDOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01UDFOV", "01TXYOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01TXYOV", "01UDFOV");
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("02GRSOV", "01NYHOV");	
INSERT INTO IncompatibleCourses (courseId, incompatibleCourseId) VALUES ("01NYHOV", "02GRSOV");	


# Study Plan 

## default 
### 247756 lorenzo.rossi@polito.it
NO PLAN
### 263243 marco.gialli@polito.it
FULL-TIME 66 CREDITS
01TXYOV
01TXSOV
01UDUOV
02LSEOV
01SQJOV
01URSPD
01OUZPD
02GRSOV
01SQOOV

UPDATE Students SET type=0 WHERE id="263243";
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01TXYOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01TXSOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01UDUOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","02LSEOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01SQJOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01URSPD");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01OUZPD");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","02GRSOV");
INSERT INTO Plans (studentId, courseId) VALUES ("263243","01SQOOV");

### 274639 giacomo.verdi@polito.it
PART-TIME 23 CREDITS
01UDFOV
02GOLOV
03UEWOV

UPDATE Students SET type=1 WHERE id="274639";
INSERT INTO Plans (studentId, courseId) VALUES ("274639","01UDFOV");
INSERT INTO Plans (studentId, courseId) VALUES ("274639","02GOLOV");
INSERT INTO Plans (studentId, courseId) VALUES ("274639","03UEWOV");

### update student number of default courses
01TXYOV
01TXSOV
01UDUOV
02LSEOV
01SQJOV
01URSPD
01OUZPD
02GRSOV
01SQOOV
01UDFOV
02GOLOV
03UEWOV
UPDATE Courses SET studentsNumber=1 WHERE id="01TXYOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01TXSOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01UDUOV";
UPDATE Courses SET studentsNumber=1 WHERE id="02LSEOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01SQJOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01URSPD";
UPDATE Courses SET studentsNumber=1 WHERE id="01OUZPD";
UPDATE Courses SET studentsNumber=1 WHERE id="02GRSOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01SQOOV";
UPDATE Courses SET studentsNumber=1 WHERE id="01UDFOV";
UPDATE Courses SET studentsNumber=1 WHERE id="02GOLOV";
UPDATE Courses SET studentsNumber=1 WHERE id="03UEWOV";

### set 01NYHOV with 3 of 3 enrolled

