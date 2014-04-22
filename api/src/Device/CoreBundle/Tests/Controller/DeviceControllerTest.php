<?php

namespace Device\CoreBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DeviceControllerTest extends WebTestCase
{
    public function setUp()
    {
        $this->server = array(
            'HTTP_CONTENT_TYPE' => 'application/json',
            'HTTP_ACCEPT'       => 'application/json',
        );
        $this->client = static::createClient();
    }

    public function testGetDevices()
    {
        $this->client->request('GET', '/api/v1/devices', array(), array(), $this->server);
        $this->assertTrue($this->client->getResponse()->isSuccessful(),'The response was not successful');
    }

    public function testPostDevices()
    {
        $this->client->request('POST', '/api/v1/devices', array('id'), array(), $this->server, '{"title":"title1"}');
        $this->assertTrue($this->client->getResponse()->isSuccessful(),'The response was not successful');
    }

    //TODO:: implement
    public function testPutDevices()
    {
    }

    //TODO:: implement
    public function testDeleteDevices()
    {
    }
}
