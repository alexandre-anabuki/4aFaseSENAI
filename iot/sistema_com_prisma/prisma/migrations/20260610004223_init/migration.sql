/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `agendamento` (
    `id_agendamento` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NULL,
    `data_horario` DATETIME(0) NULL,
    `bairro` VARCHAR(45) NULL,
    `rua` VARCHAR(45) NULL,
    `cep` INTEGER NULL,
    `numero` INTEGER NULL,
    `observacao` TINYTEXT NULL,
    `cliente_id` INTEGER NULL,
    `profissional_id` INTEGER NULL,

    INDEX `cliente_id`(`cliente_id`),
    INDEX `profissional_id`(`profissional_id`),
    PRIMARY KEY (`id_agendamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `cpf` VARCHAR(45) NULL,
    `telefone` VARCHAR(45) NULL,
    `senha` CHAR(64) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profissional` (
    `id_profissional` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `cpf` VARCHAR(45) NULL,
    `telefone` VARCHAR(45) NULL,
    `especializacao` VARCHAR(45) NULL,
    `senha` CHAR(64) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_profissional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marcas` (
    `id_marca` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `ano_modelo` VARCHAR(45) NOT NULL,
    `ano_fabricacao` VARCHAR(45) NOT NULL,
    `data_cadastro` VARCHAR(45) NOT NULL,
    `data_atualizacao` VARCHAR(45) NOT NULL,
    `ativo` INTEGER NOT NULL,

    PRIMARY KEY (`id_marca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissional`(`id_profissional`) ON DELETE NO ACTION ON UPDATE NO ACTION;
