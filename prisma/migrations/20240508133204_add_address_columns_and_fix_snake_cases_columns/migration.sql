/*
  Warnings:

  - You are about to drop the column `whereItIs` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `whereItIsFound` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `whereItWasLost` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `isMain` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "whereItIs",
DROP COLUMN "whereItIsFound",
DROP COLUMN "whereItWasLost",
ADD COLUMN     "where_it_is" TEXT,
ADD COLUMN     "where_it_is_found" TEXT,
ADD COLUMN     "where_it_was_lost" TEXT;

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "isMain",
DROP COLUMN "zip",
ADD COLUMN     "is_main" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL;
