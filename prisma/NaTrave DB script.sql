CREATE TABLE User (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Definición de la tabla para juegos
CREATE TABLE Game (
  id VARCHAR(255) not null PRIMARY KEY ,
  homeTeam VARCHAR(255),
  awayTeam VARCHAR(255),
  gameTime DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY home_team_away_team_game_time (homeTeam, awayTeam, gameTime)
);

-- Definición de la tabla para predicciones
CREATE TABLE Hunch (
  id VARCHAR(255) not null PRIMARY KEY,
  userId VARCHAR(255),
  gameId VARCHAR(255),
  homeTeamScore INT,
  awayTeamScore INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (gameId) REFERENCES Game(id),
  UNIQUE KEY user_id_game_id (userId, gameId)
);
