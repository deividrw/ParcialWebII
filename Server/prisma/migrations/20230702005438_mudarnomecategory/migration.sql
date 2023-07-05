/*
  Warnings:

  - You are about to drop the column `produto` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `product` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `produto`,
    ADD COLUMN `product` VARCHAR(191) NOT NULL;
