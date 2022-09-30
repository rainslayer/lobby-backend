import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessagesTable1663442399012 implements MigrationInterface {
    name = 'UpdateMessagesTable1663442399012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ALTER COLUMN "authorId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ALTER COLUMN "authorId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
