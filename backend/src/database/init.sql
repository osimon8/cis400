--- CHATS
CREATE TABLE `User`.`CHATS` (
  `userId` VARCHAR(128) NOT NULL,
  `friendId` VARCHAR(128) NOT NULL,
  `text` VARCHAR(512) NULL,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`, `friendId`, `timestamp`),
  CONSTRAINT `friends`
    FOREIGN KEY (`userId`, `friendId`)
    REFERENCES `User`.`FRIENDS` (`userId`, `friendId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

--ONLINE
CREATE TABLE `User`.`ONLINE` (
  `id` VARCHAR(128) NOT NULL,
  `status` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idOnline_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk id`
    FOREIGN KEY (`id`)
    REFERENCES `User`.`USERS` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

---SHARING
CREATE TABLE `User`.`SHARING` (
  `userId` VARCHAR(128) NOT NULL,
  `friendId` VARCHAR(128) NOT NULL,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`, `friendId`),
  INDEX `uid-sharing` (`userId` ASC) INVISIBLE,
  INDEX `fid-sharing` (`friendId` ASC) VISIBLE,
  CONSTRAINT `uid-sharing`
    FOREIGN KEY (`userId`)
    REFERENCES `User`.`USERS` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fid-sharing`
    FOREIGN KEY (`friendId`)
    REFERENCES `User`.`USERS` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
