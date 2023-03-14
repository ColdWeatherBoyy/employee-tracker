INSERT INTO department (name)
VALUES
  ("eCommerce"),
  ("Operations"),
  ("Marketing"),
  ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
  ("eCommerce Coordinator", 41000, 1),
  ("eCommerce Manager", 79000, 1),
  ("Operations Coordinator", 410000, 2),
  ("Operations Manager", 79000, 2),
  ("Marketing Coordinator", 410000, 3),
  ("Marketing Manager", 79000, 3),
  ("Sales Coordinator", 410000, 4),
  ("Sales Manager", 79000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Julia", "Gribbins", 2, null),
  ("Jimmy", "Besancon", 1, 1),
  ("Michael", "Statler", 4, null),
  ("Roger", "Lundler", 3, 3),
  ("Luther", "Punchins", 6, null),
  ("Mikayla", "Prindle", 5, 5),
  ("Happy", "Bappletine", 8, null),
  ("Carter", "Lundquist", 7, 7);

