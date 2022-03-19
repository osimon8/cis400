--- CHATS
CREATE TABLE `User`.`CHATS` (
  `userId` VARCHAR(128) NOT NULL,
  `friendId` VARCHAR(128) NOT NULL,
  `text` VARCHAR(512) NULL,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`userId`, `friendId`, `timestamp`),
  CONSTRAINT `friends`
    FOREIGN KEY (`userId`, `friendId`)
    REFERENCES `User`.`FRIENDS` (`userId`, `friendId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
