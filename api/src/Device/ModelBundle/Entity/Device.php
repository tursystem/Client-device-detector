<?php

namespace Device\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
//use JMS\Serializer\Annotation\Groups;
//use JMS\Serializer\Annotation\VirtualProperty;

/**
 * Device
 *
 * @ORM\Table()
 * @ORM\Entity
 *
 * @ExclusionPolicy("all")
 */
class Device
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=150)
     * @Expose
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="os", type="string", length=70)
     * @Expose
     */
    private $os;

    /**
     * @var string
     *
     * @ORM\Column(name="browser", type="string", length=150)
     * @Expose
     */
    private $browser;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=70)
     * @Expose
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="subtype", type="string", length=30)
     * @Expose
     */
    private $subtype;

    /**
     * @var integer
     *
     * @ORM\Column(name="scrHeight", type="integer")
     * @Expose
     */
    private $scrHeight;

    /**
     * @var integer
     *
     * @ORM\Column(name="scrWidth", type="integer")
     * @Expose
     */
    private $scrWidth;

    /**
     * @var string
     *
     * @ORM\Column(name="orientation", type="string", length=30)
     * @Expose
     */
    private $orientation;

    /**
     * @var integer
     *
     * @ORM\Column(name="ip", type="integer")
     * @Expose
     */
    private $ip;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     * @Expose
     */
    private $created;

    /**
     * Construct
     */
    public function __construct() {
        $this->created = new \DateTime();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Device
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set os
     *
     * @param string $os
     * @return Device
     */
    public function setOs($os)
    {
        $this->os = $os;

        return $this;
    }

    /**
     * Get os
     *
     * @return string
     */
    public function getOs()
    {
        return $this->os;
    }

    /**
     * Set browser
     *
     * @param string $browser
     * @return Device
     */
    public function setBrowser($browser)
    {
        $this->browser = $browser;

        return $this;
    }

    /**
     * Get browser
     *
     * @return string
     */
    public function getBrowser()
    {
        return $this->browser;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return Device
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Get subtype
     *
     * @return string
     */
    public function getSubType()
    {
        return $this->subtype;
    }

    /**
     * Set subtype
     *
     * @param string $type
     * @return Device
     */
    public function setSubType($type)
    {
        $this->subtype = $type;

        return $this;
    }

    /**
     * Set scrHeight
     *
     * @param integer $scrHeight
     * @return Device
     */
    public function setScrHeight($scrHeight)
    {
        $this->scrHeight = $scrHeight;

        return $this;
    }

    /**
     * Get scrHeight
     *
     * @return integer
     */
    public function getScrHeight()
    {
        return $this->scrHeight;
    }

    /**
     * Set scrWidth
     *
     * @param integer $scrWidth
     * @return Device
     */
    public function setScrWidth($scrWidth)
    {
        $this->scrWidth = $scrWidth;

        return $this;
    }

    /**
     * Get scrWidth
     *
     * @return integer
     */
    public function getScrWidth()
    {
        return $this->scrWidth;
    }

    /**
     * Set orientation
     *
     * @param string $orientation
     * @return Device
     */
    public function setOrientation($orientation)
    {
        $this->orientation = $orientation;

        return $this;
    }

    /**
     * Get orientation
     *
     * @return string
     */
    public function getOrientation()
    {
        return $this->orientation;
    }

    /**
     * Set ip
     *
     * @param integer $ip
     * @return Device
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return integer
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Device
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }
}
