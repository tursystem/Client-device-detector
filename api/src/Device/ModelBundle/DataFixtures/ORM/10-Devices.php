<?php


namespace Device\ModelBundle\DataFixtrue\ORM;


use Device\ModelBundle\Entity\Device;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Fixtures for Device Entity
 */
class Devices extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 10;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $d1 = new Device();
        $d1->setType('computer');

        $d2 = new Device();
        $d2->setType('tablet');

        $d3 = new Device();
        $d3->setType('phone');

        $manager->persist($d1);
        $manager->persist($d2);
        $manager->persist($d3);

        $manager->flush();
    }
}