-- Script para PostgreSQL

-- Tabla carrera
CREATE TABLE carrera (
  id_carrera SERIAL PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL
);

-- Tabla bloque
CREATE TABLE bloque (
  id_bloque SERIAL PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  id_carrera INTEGER REFERENCES carrera(id_carrera)
);

-- Tabla piso
CREATE TABLE piso (
  id_piso SERIAL PRIMARY KEY,
  Numero_piso VARCHAR(50) NOT NULL,
  id_bloque INTEGER NOT NULL REFERENCES bloque(id_bloque)
);

-- Tabla departamento
CREATE TABLE departamento (
  id_departamento SERIAL PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Tipo VARCHAR(50) NOT NULL,
  Piso INTEGER NOT NULL REFERENCES piso(id_piso),
  imagen_mapa VARCHAR(255)
);

-- Insertar carreras
INSERT INTO carrera (Nombre) VALUES
  ('Sistemas de información'),
  ('Ingenería Industrial');

-- Insertar bloques
INSERT INTO bloque (Nombre, id_carrera) VALUES
  ('Bloque A', 1),
  ('Bloque B', 1),
  ('Bloque C', 1),
  ('Bloque D', 2);

-- Insertar pisos
INSERT INTO piso (Numero_piso, id_bloque) VALUES
  ('Planta baja', 1),
  ('Primer Piso', 1),
  ('Segundo Piso', 1),
  ('Planta baja', 2),
  ('Primer Piso', 2),
  ('Segundo Piso', 2),
  ('Planta baja', 3),
  ('Primer Piso', 3),
  ('Segundo Piso', 3),
  ('Planta baja', 4),
  ('Primer Piso', 4);

-- Insertar departamentos
INSERT INTO departamento (Nombre, Tipo, Piso, imagen_mapa) VALUES
('Decanato','Departamento',1,'/img/imagenes_PB/Decanato.png'),
('Vicedecanato','Departamento',1,'/img/imagenes_PB/VICEDECANATO.png'),
('Sala de titulación','Departamento',1,'/img/imagenes_PB/Sala de Individuales de Titulación.png'),
('Administración','Departamento',1,'/img/imagenes_PB/Administración.png'),
('Bodega','Departamento',1,'/img/imagenes_PB/Bodega.png'),
('Dirección de ingenería industrial','Departamento',1,'/img/imagenes_PB/Dirección de Ing. Industrial.png'),
('Sala de profesores industrial','Departamento',1,'/img/imagenes_PB/Sala de Profesores Industrial.png'),
('Talento Humano','Departamento',1,'/img/imagenes_PB/Talento Humano.png'),
('Departamento de doctorado','Departamento',1,'/img/imagenes_PB/DEP. _ Doctorado.png'),
('Secretaria General','Departamento',1,'/img/imagenes_PB/Secretaría General.png'),
('Lab especial 14B-001','Laboratorio',4,'/img/imagenes_PB/Lab. ESP 14B-001.png'),
('Auditorio 14B-201','Auditorio',4,'/img/imagenes_PB/Auditorio 14B-201.png'),
('Laboratorio especial 14B-002','Laboratorio',4,'/img/imagenes_PB/Lab. ESP 14B-002.png'),
('Coordinación de nivelación','Departamento',4,'/img/imagenes_PB/Coordinación de Nivelación.png'),
('Baño','Zona de higiene',4,'/img/imagenes_PB/Baños.png'),
('Aula 14C-006','Aula',7,'/img/imagenes_PB/Aula 14C-006.png'),
('Aula 14C-007','Aula',7,'/img/imagenes_PB/Aula 14C-007.png'),
('Aula 14C-005','Aula',7,'/img/imagenes_PB/Aula 14C-005.png'),
('Aula 14C-004','Aula',7,'/img/imagenes_PB/Aula  14C-004.png'),
('Aula 14C-003','Aula',7,'/img/imagenes_PB/Aula 14C-003.png'),
('Aula 14C-002','Aula',7,'/img/imagenes_PB/Aula 14C-002.png'),
('Aula 14C-001','Aula',7,'/img/imagenes_PB/Aula 14C-001.png'),
('Lab de ardouino','Laboratorio',7,'/img/imagenes_PB/Lab. de Arduino.png'),
('Asociación de estudiantes','Departamento',7,'/img/imagenes_PB/Asociación de Estudiantes.png'),
('Baño','Zona de higiene',7,'/img/imagenes_PB/Baños Bloque C.png'),
('Instituto de investigación','Departamento',2,'/img/imagenes_Primer_Piso/A.-INSTITUTO DE INVESTIGACION.png'),
('Coordinación de investigación','Departamento',2,'/img/imagenes_Primer_Piso/A.-COORDINACION DE INVESTIGACION.png'),
('Departamento de titulación','Departamento',2,'/img/imagenes_Primer_Piso/A.-DEPARTAMENTO DE TITULACION.png'),
('Biblioteca de la facultad','Zona de estudio',2,'/img/imagenes_Primer_Piso/A-.BIBLIOTECA DE LA FACULTAD.png'),
('Lab de computo 14A-101','Laboratorio',2,'/img/imagenes_Primer_Piso/A.-LAB. COMP. 14 A - 101.png'),
('Baños','Zona de higiene',2,'/img/imagenes_Primer_Piso/Baños bloque A primer piso.png'),
('Lab de computo 14B-101','Laboratorio',5,'/img/imagenes_Primer_Piso/B.-LAB. COMP. 14 B - 101.png'),
('Lab de computo 14B-103','Laboratorio',5,'/img/imagenes_Primer_Piso/B-.LAB. COMP. 14 B - 103.png'),
('Lab Esp. 14B-101','Laboratorio',5,'/img/imagenes_Primer_Piso/B.-LAB. ESP. 14 B - 101.png'),
('Coordinación de internacionalización','Departamento',5,'/img/imagenes_Primer_Piso/B.-COOR. DE INTERNACIONALIZACION.png'),
('Aula de postgrado','Aula',5,'/img/imagenes_Primer_Piso/B.-AULA DE POSTGRADO.png'),
('Lab de computo 14C-102','Laboratorio',8,'/img/imagenes_Primer_Piso/C.-LAB. COMP. 14 C - 102.png'),
('Lab de computo 14C-101','Laboratorio',8,'/img/imagenes_Primer_Piso/C.-LAB. COMP. 14 C - 101.png'),
('Aula 14C-101','Aula',8,'/img/imagenes_Primer_Piso/C.-AULA 14 C - 101.png'),
('Aula 14C-102','Aula',8,'/img/imagenes_Primer_Piso/C.-AULA 14 C - 102.png'),
('Aula 14C-103','Aula',8,'/img/imagenes_Primer_Piso/C_Aula_14C-103.png.jpeg'),
('Coordinación de acreditación','Departamento',8,'/img/imagenes_Primer_Piso/C.-COORDINACION DE ACREDITACION.png'),
('Sala de profesores','Departamento',8,'/img/imagenes_Primer_Piso/C.-SALA DE PROFESORES SISTEMAS.png'),
('Departamento de vinculación con la sociedad','Departamento',8,'/img/imagenes_Primer_Piso/C.-DEP. DE VINCULACION CON LA SOCIEDAD.png'),
('Dirección de carrera de sistemas','Departamento',8,'/img/imagenes_Primer_Piso/C.-DIRECCION DE CARRERA DE SISTEMAS.png'),
('Baño','Zona de higiene',8,'/img/imagenes_Primer_Piso/Baño bloque c primer piso.png'),
('Lab de computo 14A-201','Laboratorio',3,'/img/imagenes_Segundo_piso/A_Lab.Comp_14A-201.png'),
('Lab de computo 14A-202','Laboratorio',3,'/img/imagenes_Segundo_piso/A_Lab.Comp_14A-202.png'),
('Aula 14A-201','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-201.png'),
('Aula 14A-202','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-202.png'),
('Aula 14A-203','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-203.png'),
('Baños','Zona de higiene',3,'/img/imagenes_Segundo_piso/A_Baños.png'),
('Direccion de telematica','Departamento',3,'/img/imagenes_Segundo_piso/A_departamento_telematica.png'),
('Aula 14A-204','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-204.png'),
('Aula 14A-205','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-205.png'),
('Aula 14A-206','Aula',3,'/img/imagenes_Segundo_piso/A_Aula_14A-206.png'),
('Sala de profesores de telematica','Departamentos',3,'/img/imagenes_Segundo_piso/A_Sala_Profesores_Telematica.png'),
('Sala de tutorías','Departamento',3,'/img/imagenes_Segundo_piso/A_Dep.Tutorias.png'),
('Aula 14B-201','Aula',6,'/img/imagenes_Segundo_piso/B_Aula_14B-201.png'),
('Aula 14B-202','Aula',6,'/img/imagenes_Segundo_piso/B_Aula_14B-202.png'),
('Lab de computo 14B-201','Laboratorio',6,'/img/imagenes_Segundo_piso/B_Lab.Comp_14B-201.png'),
('Lab de computo 14B-202','Laboratorio',6,'/img/imagenes_Segundo_piso/B_Lab.Comp_14B-202.png'),
('Bodega','Zona de almacenamiento',6,'/img/imagenes_Segundo_piso/B_Bodega.png'),
('Aula 14C-201','Aula',9,'/img/imagenes_Segundo_piso/C_Aula_14C-201.png'),
('Aula 14C-202','Aula',9,'/img/imagenes_Segundo_piso/C_Aula_14C-202.png'),
('Aula 14C-203','Aula',9,'/img/imagenes_Segundo_piso/C_Aula_14C-203.png'),
('Aula 14C-204','Aula',9,'/img/imagenes_Segundo_piso/C_Aula_14C-204.png'),
('Lab de computo 14C-201','Laboratorio',9,'/img/imagenes_Segundo_piso/C_Lab.Comp_14C-201.png'),
('Lab de computo 14C-202','Laboratorio',9,'/img/imagenes_Segundo_piso/C_Lab.Comp_14C-202.png'),
('Lab de computo 14C-203','Laboratorio',9,'/img/imagenes_Segundo_piso/C_Lab.Comp_14C-203.png'),
('Lab de computo 14C-204','Laboratorio',9,'/img/imagenes_Segundo_piso/C_Lab.Comp_14C-204.png'),
('Bodega','Zona de almacenamiento',9,'/img/imagenes_Segundo_piso/C_Bodega.png'),
('Baños','Zona de higiene',9,'/img/imagenes_Segundo_piso/C_Baño.png'),
('Aula 14D-001','Aula',10,'/'),
('Aula 14D-002','Aula',10,'/'),
('Aula 14D-003','Aula',10,'/'),
('Aula 14D-004','Aula',10,'/'),
('Aula 14D-005','Aula',10,'/'),
('Aula 14D-006','Aula',10,'/'),
('Aula 14D-007','Aula',10,'/'),
('Aula 14D-008','Aula',10,'/'),
('Baños','Zona de higiene',10,'/'),
('Aula 14D-101','Aula',11,'/'),
('Aula 14D-102','Aula',11,'/'),
('Aula 14D-103','Aula',11,'/'),
('Aula 14D-104','Aula',11,'/'),
('Aula 14D-105','Aula',11,'/'),
('Aula 14D-106','Aula',11,'/'),
('Aula 14D-107','Aula',11,'/'),
('Aula 14D-108','Aula',11,'/');
