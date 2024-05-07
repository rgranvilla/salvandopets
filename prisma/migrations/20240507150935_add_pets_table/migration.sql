-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Small', 'Medium', 'Large', 'ExtraLarge');

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "birth_date" TIMESTAMP(3),
    "species" "Species",
    "breed" TEXT,
    "size" "Size" NOT NULL,
    "description" TEXT,
    "whereItIsFound" TEXT,
    "whereItWasLost" TEXT,
    "whereItIs" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pets_user_id_key" ON "Pets"("user_id");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
