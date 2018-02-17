### ESM
+ SQL statement to create seven ESM:
```sql
INSERT INTO `aliennor`.`ecocases_esm`
(`id`,`label`,`title`,`description`)
VALUES
(1,'stakeholders','Innovate with stakeholders',''),
(2,'biomimicry','Innovate through biomimicry',''),
(3,'consumption','Innovate through sustainable mode of consumption',''),
(4,'product service systems','Innovate through Product Service Systems',''),
(5,'territorial resources','Innovate through territorial resources',''),
(6,'circularity','Innovate through circularity',''),
(7,'new technologies','Innovate through new technologies','');
```
+ Create categories:
```sql
INSERT INTO `aliennor`.`ecocases_category`
(`id`,
`title`)
VALUES
(1, 'Energy'),
(2, 'Accommodation'),
(3, 'Equipment'),
(4, 'Transport'),
(5, 'Consumption mode');
```