import {
    MobileNamed,
    MobileObjectReference,
    MobileTarget
} from "./index";

// Structural stand-in for the CLU-side DIn wrapper (io-module-din-8):
// just enough members to accept DIn-backed registry entries and reject other
// device types, without referencing CLU wrapper code from the mobile module.
export interface DInLike {
    setInertion: (inertion: number) => void;
    setHoldDelay: (holdDelay: number) => void;
    setHoldInterval: (holdInterval: number) => void;
    readonly value: boolean;
}

// Feature id of the DIN object (io-module-din-8), same numbering as
// PropertyType in the CLU-side wrapper.
const ValueFeature = 0;

// Mobile-side counterpart of the DIn wrapper: builds references for MyGrenton
// widgets (serialized to data.json) instead of touching the device.
export class MobileDIn {
    private readonly cluName: string;
    private readonly objectName: string;

    constructor(required: { clu: MobileNamed; din: MobileNamed<DInLike> }) {
        this.cluName = required.clu.name;
        this.objectName = required.din.name;
    }

    // Reference to the Value feature - displays the current input state.
    get value(): MobileObjectReference {
        return this.target().attribute();
    }

    private target(): MobileTarget {
        return new MobileTarget(this.cluName, this.objectName, ValueFeature);
    }
}
