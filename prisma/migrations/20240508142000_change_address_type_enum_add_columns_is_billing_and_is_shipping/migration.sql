/*
  Warnings:

  - The values [Billing,Shipping] on the enum `AddressType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AddressType_new" AS ENUM ('Home', 'Work', 'Other');
ALTER TABLE "addresses" ALTER COLUMN "type" TYPE "AddressType_new" USING ("type"::text::"AddressType_new");
ALTER TYPE "AddressType" RENAME TO "AddressType_old";
ALTER TYPE "AddressType_new" RENAME TO "AddressType";
DROP TYPE "AddressType_old";
COMMIT;

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "is_billing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shipping" BOOLEAN NOT NULL DEFAULT false;
