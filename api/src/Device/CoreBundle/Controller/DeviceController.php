<?php

namespace Device\CoreBundle\Controller;

use Device\ModelBundle\Entity\Device;
use Device\ModelBundle\Form\DeviceType;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
//use Symfony\Component\Validator\Tests\Fixtures\Entity;


/**
 * Class DeviceController
 */
class DeviceController extends Controller
{
    /**
     * Get list of devices
     * url: GET /api/v1/devices
     * @return mixed
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function getDevicesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $devices = $em->getRepository('DeviceModelBundle:Device')
            ->findAll();

        if(is_null($devices) || empty($devices)){
            throw $this->createNotFoundException();
        }
        return $devices;
    }

    /**
     * Get devices by id
     * url: GET /api/v1/devices/{id}
     * @param $id
     * @return mixed
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function getDeviceAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $device = $em->getRepository('DeviceModelBundle:Device')
            ->find($id);

        if(is_null($device) || empty($device)){
            throw $this->createNotFoundException();
        }
        return $device;
    }

    /**
     * Create device
     * url: POST /api/v1/devices
     */
    public function postDevicesAction()
    {
        return $this->processForm(new Device());
    }

    /**
     * Update device
     * url: PUT /api/v1/devices/{id}
     * @param $id
     */
    //TODO:: implement
    public function patchDevicesAction($id)
    {
        echo json_encode("Update device with {$id}");
    }

    /**
     * Delete device
     * url: DELETE /api/v1/devices/{id}
     * @param $id
     */
    //TODO:: implement
    public function deleteDevicesAction($id)
    {
        echo json_encode("Delete device with {$id}");
    }

    /**
     * Process form data
     * @param Device $device
     * @return Response
     */
    private function processForm(Device $device)
    {
        $form = $this->createForm(new DeviceType(), $device, array('method' => 'POST'));
        $form->handleRequest($this->get('request'));

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($device);
            $em->flush();

        //$response = new Response();
        //$response->setStatusCode(200);
            return new JsonResponse(['result' => true, 'message' => "Device has bin successfully saved"], 200);
        //);

        //return $response;
        }

        return 'TEST';
    }

    private function getErrorMessages(\Symfony\Component\Form\Form $form)
    {
        $errors = array();

        if ($form->count() > 0) {
            foreach ($form->all() as $child) {
                /**
                 * @var \Symfony\Component\Form\Form $child
                 */
                if (!$child->isValid()) {
                    $errors[$child->getName()] = $this->getErrorMessages($child);
                }
            }
        } else {
            /**
             * @var \Symfony\Component\Form\FormError $error
             */
            foreach ($form->getErrors() as $key => $error) {
                $errors[] = $error->getMessage();
            }
        }

        return $errors;
    }
}