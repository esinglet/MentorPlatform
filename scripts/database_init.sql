SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mentorshipapp` DEFAULT CHARACTER SET utf8 ;
USE `mentorshipapp` ;

-- -----------------------------------------------------
-- Table `mentorshipapp`.`lu_survey_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`lu_survey_status` (
  `value` INT(11) NOT NULL,
  `status` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`value`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`meetings` (
  `meeting_id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`organizations` (
  `org_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`org_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`people` (
  `person_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(250) NOT NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `date_joined` DATETIME NULL DEFAULT NULL,
  `active` BIT(1) NOT NULL DEFAULT b'1',
  `org_id` INT(11) NOT NULL,
  PRIMARY KEY (`person_id`),
  INDEX `org_idx` (`org_id` ASC),
  CONSTRAINT `org_id`
    FOREIGN KEY (`org_id`)
    REFERENCES `mentorshipapp`.`organizations` (`org_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`meeting_persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`meeting_persons` (
  `meeting_id` INT(11) NOT NULL,
  `person_id` INT(11) NOT NULL,
  `mentor` BIT(1) NOT NULL,
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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `status`
    FOREIGN KEY (`survey_status`)
    REFERENCES `mentorshipapp`.`lu_survey_status` (`value`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`relationships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`relationships` (
  `rel_id` INT(11) NOT NULL AUTO_INCREMENT,
  `mentor` INT(11) NOT NULL,
  `mentee` INT(11) NOT NULL,
  `date_created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`rel_id`),
  INDEX `mentor_idx` (`mentor` ASC),
  INDEX `mentee_idx` (`mentee` ASC),
  CONSTRAINT `mentee`
    FOREIGN KEY (`mentee`)
    REFERENCES `mentorshipapp`.`people` (`person_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `mentor`
    FOREIGN KEY (`mentor`)
    REFERENCES `mentorshipapp`.`people` (`person_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mentorshipapp`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorshipapp`.`tokens` (
  `tok_id` INT(11) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(1000) NOT NULL,
  `person_id` INT(11) NOT NULL,
  `meeting_id` INT(11) NOT NULL,
  `mentor` BIT(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`tok_id`),
  INDEX `person_idx` (`person_id` ASC),
  CONSTRAINT `person`
    FOREIGN KEY (`person_id`)
    REFERENCES `mentorshipapp`.`people` (`person_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_SAFE_UPDATES = 0;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
