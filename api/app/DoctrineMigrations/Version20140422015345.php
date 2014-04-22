<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20140422015345 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE Device ADD scr_height INT DEFAULT NULL, ADD scr_width INT DEFAULT NULL, DROP scrHeight, DROP scrWidth, CHANGE title title VARCHAR(150) DEFAULT NULL, CHANGE os os VARCHAR(70) DEFAULT NULL, CHANGE browser browser VARCHAR(150) DEFAULT NULL, CHANGE type type VARCHAR(70) DEFAULT NULL, CHANGE ip ip INT DEFAULT NULL, CHANGE created created DATETIME DEFAULT NULL, CHANGE subtype subtype VARCHAR(30) DEFAULT NULL, CHANGE orientation orientation VARCHAR(30) DEFAULT NULL");
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE Device ADD scrHeight INT DEFAULT NULL, ADD scrWidth INT DEFAULT NULL, DROP scr_height, DROP scr_width, CHANGE title title VARCHAR(150) DEFAULT NULL, CHANGE os os VARCHAR(70) DEFAULT NULL, CHANGE browser browser VARCHAR(150) DEFAULT NULL, CHANGE type type VARCHAR(70) DEFAULT NULL, CHANGE subtype subtype VARCHAR(30) DEFAULT NULL, CHANGE orientation orientation VARCHAR(30) DEFAULT NULL, CHANGE ip ip INT DEFAULT NULL, CHANGE created created DATETIME DEFAULT NULL");
    }
}
