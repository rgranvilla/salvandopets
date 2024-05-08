-- AlterTable
ALTER TABLE "roles_permissions" ADD COLUMN     "can_create" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_update" BOOLEAN NOT NULL DEFAULT false;
