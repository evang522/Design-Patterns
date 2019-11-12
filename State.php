<?php


class HelicopterState extends SplEnum
{
    const IN_AIR = 'IN_AIR';
    const PARKED = 'PARKED';
    const IN_REPAIR = 'IN_REPAIR';
}


class Helicopter
{

    /** @var altitude */
    private $altitude;

    /** @var string */
    private $tailNumber;

    /** @var string */
    private $model;

    /** @var HelicopterState */
    private $state;

    public function __construct(
        int $altitude,
        string $tailNumber,
        string $model,
        HelicopterState $state
    )
    {
        $this->altitude = $altitude;
        $this->tailNumber = $tailNumber;
        $this->model = $model;
        $this->state = $state;
    }

    public function increaseAltitude(int $increaseBy) : void
    {
        $this->altitude += $increaseBy;
    }

    public function openControlBay() : void
    {
        echo 'Opened Control Bay';
    }

    public function getState(): HelicopterState
    {
        return $this->state;
    }
}

interface HelicopterStateChanger {
    public function increaseAltitude(int $increaseBy): void;
    public function openControlBay(): void;
}

class HelicopterInFlightStateChanger implements HelicopterStateChanger
{
    /** @var Helicopter */
    private $helicopter;

    public function __construct(
        Helicopter $helicopter
    )
    {
        $this->helicopter = $helicopter;
    }

    public function increaseAltitude(int $increaseBy): void
    {
        $this->helicopter->increaseAltitude($increaseBy);
    }

    public function openControlBay(): void
    {
        throw new Error('Control Bay cannot be opened while in flight.');
    }
}




class HelicopterStateMachine
{
    /** @var HelicopterInFlightStateChanger */
    private $helicopterInFlightStateChanger;

    public function getStateChanger(Helicopter $helicopter): HelicopterStateChanger
    {
        switch($helicopter->getState())
        {
            case 'IN_FLIGHT':
                return new HelicopterInFlightStateChanger($helicopter);
        }
    }
}

$copter = new Helicopter(10000, 'N197265', 'MD500', new HelicopterState(HelicopterState::IN_AIR));

$helicopterStateMachine = new HelicopterStateMachine();

$chopperStateChanger =  $helicopterStateMachine->getStateChanger($copter);
$chopperStateChanger->increaseAltitude(2000);