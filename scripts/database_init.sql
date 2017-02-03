-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
<<<<<<< HEAD
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mentorshipapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mentorshipapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mentorshipapp` DEFAULT CHARACTER SET utf8 ;
USE `mentorshipapp` ;

=======
>>>>>>> refs/remotes/origin/master
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema odyssey_dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema odyssey_dev
-- -----------------------------------------------------
<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`meetings` (
  `meeting_id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = utf8;

=======
CREATE SCHEMA IF NOT EXISTS `odyssey_dev` DEFAULT CHARACTER SET latin1 ;
USE `odyssey_dev` ;
>>>>>>> refs/remotes/origin/master

-- -----------------------------------------------------
-- Table `odyssey_dev`.`lu_role`
-- -----------------------------------------------------
<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`organizations` (
  `org_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`org_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;
=======
DROP TABLE IF EXISTS `odyssey_dev`.`lu_role` ;

CREATE TABLE IF NOT EXISTS `odyssey_dev`.`lu_role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
>>>>>>> refs/remotes/origin/master


-- -----------------------------------------------------
-- Table `odyssey_dev`.`organizations`
-- -----------------------------------------------------
<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`people` (
  `person_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(250) NOT NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `date_joined` DATETIME NULL DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `org_id` INT(11) NOT NULL,
  PRIMARY KEY (`person_id`),
  INDEX `org_idx` (`org_id` ASC),
  CONSTRAINT `org_id`
    FOREIGN KEY (`org_id`)
    REFERENCES `mentorshipapp`.`organizations` (`org_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;
=======
DROP TABLE IF EXISTS `odyssey_dev`.`organizations` ;

CREATE TABLE IF NOT EXISTS `odyssey_dev`.`organizations` (
  `orgid` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`orgid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
>>>>>>> refs/remotes/origin/master


-- -----------------------------------------------------
-- Table `odyssey_dev`.`people`
-- -----------------------------------------------------
<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`meeting_persons` (
  `meeting_id` INT(11) NOT NULL,
  `person_id` INT(11) NOT NULL,
  `mentor` TINYINT(1) NOT NULL,
  `survey_status` INT(11) NOT NULL,
  `survey_blob` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_id`, `person_id`),
  INDEX `person_id_idx` (`person_id` ASC),
  INDEX `status_idx` (`survey_status` ASC),
  CONSTRAINT `meeting_id`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `mentorshipapp`.`meetings` (`meeting_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `person_id`
    FOREIGN KEY (`person_id`)
    REFERENCES `mentorshipapp`.`people` (`person_id`)
=======
DROP TABLE IF EXISTS `odyssey_dev`.`people` ;

CREATE TABLE IF NOT EXISTS `odyssey_dev`.`people` (
  `personid` INT(11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(150) NULL DEFAULT NULL,
  `lname` VARCHAR(150) NULL DEFAULT NULL,
  `email` VARCHAR(250) NULL DEFAULT NULL,
  `password` VARCHAR(64) NULL DEFAULT NULL,
  `role` INT(11) NULL DEFAULT NULL,
  `org` INT(11) NULL DEFAULT NULL,
  `active` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`personid`),
  INDEX `fk_role_idx` (`role` ASC),
  INDEX `fk_org_idx` (`org` ASC),
  CONSTRAINT `fk_org`
    FOREIGN KEY (`org`)
    REFERENCES `odyssey_dev`.`organizations` (`orgid`)
>>>>>>> refs/remotes/origin/master
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role`
    FOREIGN KEY (`role`)
    REFERENCES `odyssey_dev`.`lu_role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `odyssey_dev`.`relationships`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `odyssey_dev`.`relationships` ;

CREATE TABLE IF NOT EXISTS `odyssey_dev`.`relationships` (
  `relid` INT(11) NOT NULL AUTO_INCREMENT,
  `mentor` INT(11) NULL DEFAULT NULL,
  `mentee` INT(11) NULL DEFAULT NULL,
  `date_created` DATE NULL DEFAULT NULL,
  `rate` INT(11) NULL DEFAULT NULL,
  `date_start` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`relid`),
  INDEX `fk_mentor_idx` (`mentor` ASC),
  INDEX `fk_mentee_idx` (`mentee` ASC),
  CONSTRAINT `fk_mentee`
    FOREIGN KEY (`mentee`)
    REFERENCES `odyssey_dev`.`people` (`personid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mentor`
    FOREIGN KEY (`mentor`)
    REFERENCES `odyssey_dev`.`people` (`personid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
<<<<<<< HEAD
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;
=======
DEFAULT CHARACTER SET = latin1;
>>>>>>> refs/remotes/origin/master


-- -----------------------------------------------------
-- Table `odyssey_dev`.`meetings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `odyssey_dev`.`meetings` ;

CREATE TABLE IF NOT EXISTS `odyssey_dev`.`meetings` (
  `relationship_id` INT(11) NOT NULL,
  `meeting_date` DATE NOT NULL,
  `mentee_survey` MEDIUMTEXT NULL DEFAULT NULL,
  `mentor_survey` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`relationship_id`, `meeting_date`),
  CONSTRAINT `fk_relationship`
    FOREIGN KEY (`relationship_id`)
    REFERENCES `odyssey_dev`.`relationships` (`relid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/master
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
