-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema odyssey_dev
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `odyssey_dev` ;

-- -----------------------------------------------------
-- Schema odyssey_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `odyssey_dev` DEFAULT CHARACTER SET latin1 ;
USE `odyssey_dev` ;

-- -----------------------------------------------------
-- Table `odyssey_dev`.`lu_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odyssey_dev`.`lu_role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `odyssey_dev`.`organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odyssey_dev`.`organizations` (
  `orgid` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`orgid`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `odyssey_dev`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odyssey_dev`.`people` (
  `personid` INT(11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(150) NULL DEFAULT NULL,
  `lname` VARCHAR(150) NULL DEFAULT NULL,
  `email` VARCHAR(250) NULL DEFAULT NULL,
  `password` VARCHAR(64) NULL DEFAULT NULL,
  `role` INT(11) NULL DEFAULT NULL,
  `org` INT(11) NULL DEFAULT NULL,
  `active` INT(11) NULL DEFAULT NULL,
  `admin` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`personid`),
  INDEX `fk_role_idx` (`role` ASC),
  INDEX `fk_org_idx` (`org` ASC),
  CONSTRAINT `fk_org`
    FOREIGN KEY (`org`)
    REFERENCES `odyssey_dev`.`organizations` (`orgid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role`
    FOREIGN KEY (`role`)
    REFERENCES `odyssey_dev`.`lu_role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `odyssey_dev`.`relationships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odyssey_dev`.`relationships` (
  `relid` INT(11) NOT NULL AUTO_INCREMENT,
  `mentor` INT(11) NULL DEFAULT NULL,
  `mentee` INT(11) NULL DEFAULT NULL,
  `date_created` DATE NULL DEFAULT NULL,
  `rate` INT(11) NULL DEFAULT NULL,
  `date_start` DATE NULL DEFAULT NULL,
  `date_met` DATE NULL DEFAULT NULL,
  `email_count` INT(11) NULL DEFAULT '0',
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
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `odyssey_dev`.`meetings`
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- Table `odyssey_dev`.`surveys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odyssey_dev`.`surveys` (
  `sid` VARCHAR(100) NOT NULL,
  `rid` INT(11) NULL DEFAULT NULL,
  `date_sent` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
