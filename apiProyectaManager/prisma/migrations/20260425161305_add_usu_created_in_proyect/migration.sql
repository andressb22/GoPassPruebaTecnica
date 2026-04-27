/*
  Warnings:

  - A unique constraint covering the columns `[pro_id,usu_id]` on the table `prm_project_members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usu_id_created` to the `pro_projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pro_projects" ADD COLUMN     "usu_id_created" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "prm_project_members_pro_id_usu_id_key" ON "prm_project_members"("pro_id", "usu_id");

-- AddForeignKey
ALTER TABLE "pro_projects" ADD CONSTRAINT "pro_projects_usu_id_created_fkey" FOREIGN KEY ("usu_id_created") REFERENCES "Usu_usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
