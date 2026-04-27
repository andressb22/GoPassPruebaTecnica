-- CreateTable
CREATE TABLE "Usu_usuario" (
    "usu_id" SERIAL NOT NULL,
    "usu_name" TEXT NOT NULL,
    "usu_email" TEXT NOT NULL,
    "usu_password" TEXT NOT NULL,
    "usu_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usu_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usu_usuario_pkey" PRIMARY KEY ("usu_id")
);

-- CreateTable
CREATE TABLE "pro_projects" (
    "pro_id" SERIAL NOT NULL,
    "pro_name" TEXT NOT NULL,
    "pro_description" TEXT NOT NULL,
    "pro_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pro_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pro_projects_pkey" PRIMARY KEY ("pro_id")
);

-- CreateTable
CREATE TABLE "rol_rol" (
    "rol_id" SERIAL NOT NULL,
    "rol_name" TEXT NOT NULL,

    CONSTRAINT "rol_rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "prm_project_members" (
    "prm_id" SERIAL NOT NULL,
    "usu_id" INTEGER NOT NULL,
    "pro_id" INTEGER NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "prm_project_members_pkey" PRIMARY KEY ("prm_id")
);

-- CreateTable
CREATE TABLE "stt_status_task" (
    "stt_id" SERIAL NOT NULL,
    "stt_name" TEXT NOT NULL,

    CONSTRAINT "stt_status_task_pkey" PRIMARY KEY ("stt_id")
);

-- CreateTable
CREATE TABLE "prt_priority_task" (
    "prt_id" SERIAL NOT NULL,
    "prt_name" TEXT NOT NULL,

    CONSTRAINT "prt_priority_task_pkey" PRIMARY KEY ("prt_id")
);

-- CreateTable
CREATE TABLE "tas_task" (
    "tas_id" SERIAL NOT NULL,
    "tas_title" TEXT NOT NULL,
    "tas_description" TEXT NOT NULL,
    "stt_id" INTEGER NOT NULL,
    "prt_id" INTEGER NOT NULL,
    "pro_id" INTEGER NOT NULL,
    "tas_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tas_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tas_task_pkey" PRIMARY KEY ("tas_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usu_usuario_usu_email_key" ON "Usu_usuario"("usu_email");

-- AddForeignKey
ALTER TABLE "prm_project_members" ADD CONSTRAINT "prm_project_members_usu_id_fkey" FOREIGN KEY ("usu_id") REFERENCES "Usu_usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prm_project_members" ADD CONSTRAINT "prm_project_members_pro_id_fkey" FOREIGN KEY ("pro_id") REFERENCES "pro_projects"("pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prm_project_members" ADD CONSTRAINT "prm_project_members_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol_rol"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tas_task" ADD CONSTRAINT "tas_task_stt_id_fkey" FOREIGN KEY ("stt_id") REFERENCES "stt_status_task"("stt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tas_task" ADD CONSTRAINT "tas_task_prt_id_fkey" FOREIGN KEY ("prt_id") REFERENCES "prt_priority_task"("prt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tas_task" ADD CONSTRAINT "tas_task_pro_id_fkey" FOREIGN KEY ("pro_id") REFERENCES "pro_projects"("pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;
