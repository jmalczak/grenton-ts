import {
    MobileAction,
    MobileActionType,
    MobileActionTypes,
    MobileNamed,
    MobileObjectReference,
    MobileTarget
} from "../../index";

// Structural stand-in for the CLU-side DOut wrapper (io-module-din-8 fv02_02):
// just enough members to accept DOut-backed registry entries and reject other
// device types, without referencing CLU wrapper code from the mobile module.
export interface DOutLike {
    switch: (miliseconds: number) => void;
    switchOn: (miliseconds: number) => void;
    switchOff: (miliseconds: number) => void;
    readonly value: boolean;
}

// Feature id of the DOUT object (io-module-din-8 fv02_02), same numbering as
// PropertyType in the CLU-side wrapper.
const ValueFeature = 0;

// Mobile-side counterpart of the DOut wrapper: builds references/actions for
// MyGrenton widgets (serialized to data.json) instead of touching the device.
export class MobileDOut {
    private readonly cluName: string;
    private readonly objectName: string;

    constructor(clu: MobileNamed, dout: MobileNamed<DOutLike>) {
        this.cluName = clu.name;
        this.objectName = dout.name;
    }

    // Reference to the Value feature - displays the current output state.
    get value(): MobileObjectReference {
        return this.target().attribute();
    }

    // Sets Value to 1/0 via pseudo method, as OM does for DOUT on/off widgets.
    on(type: MobileActionType = MobileActionTypes.On): MobileAction {
        return this.target().pseudoMethod(1, type);
    }

    off(type: MobileActionType = MobileActionTypes.Off): MobileAction {
        return this.target().pseudoMethod(0, type);
    }

    private target(): MobileTarget {
        return new MobileTarget(this.cluName, this.objectName, ValueFeature);
    }
}
