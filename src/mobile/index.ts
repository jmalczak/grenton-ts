export type MobileCallType = "ATTRIBUTE" | "METHOD" | "PSEUDO_METHOD" | "SCRIPT";
export type MobileActionType = "CLICK" | "ON" | "OFF";
export type MobileWidgetType =
    | "AUDIO_REMOTE_CONTROL"
    | "CAMERA"
    | "CONTACT_SENSOR"
    | "CONTACT_SENSOR_DOUBLE"
    | "COOL_MASTER"
    | "DIMMER_V2"
    | "EVENT_SCHEDULER"
    | "HEADER"
    | "INTERCOM"
    | "LED"
    | "LED_CCT"
    | "MULTISENSOR"
    | "ON_OFF"
    | "ON_OFF_DOUBLE"
    | "ROLLER_SHUTTER"
    | "ROLLER_SHUTTER_V3"
    | "SCENE"
    | "SCENE_DOUBLE"
    | "SCHEDULER"
    | "SLIDER"
    | "TEXT"
    | "THERMOSTAT_V2"
    | "TV_REMOTE_CONTROL"
    | "VALUE_DOUBLE"
    | "VALUE_V2";

export type MobileValueType = "FLOAT" | "STRING";
export type MobileUnit = "DEGREE" | "PERCENT" | "UNKNOWN";

import {
    MobileBackgroundImage,
    MobileBackgroundImages,
    MobileColor,
    MobileColors,
    MobileIcon,
    MobileIcons,
    MobileInterfaceIcon,
    MobileInterfaceIcons
} from "./assets";

export * from "./assets";


export interface MobileInterface {
    pages: MobilePage[];
    pushNotifications: null;
    lightLogoPath: string | null;
    icon: MobileInterfaceIcon;
    blockCloud: boolean;
    theme: MobileColor;
    id: string;
    label: string;
    cloudSharing: null;
    darkLogoPath: string | null;
}

export interface MobilePage {
    icon: MobileIcon;
    id: number;
    label: string;
    widgets: MobileWidget[];
    pageId: number;
}

export interface MobileObjectReference {
    cluId: string | null;
    objectName: string | null;
    index: string | null;
    callType: MobileCallType | null;
}

export interface MobileAction extends MobileObjectReference {
    valueFormattedForDto: string;
    type: MobileActionType;
    value: string;
}

export interface MobileBaseWidget<TType extends MobileWidgetType> {
    id: number;
    type: TType;
    dtoId: string | null;
}

export interface MobileLabeledWidget<TType extends MobileWidgetType> extends MobileBaseWidget<TType> {
    icon: MobileIcon;
    label: string;
}

export interface MobileBistableButton {
    image: MobileIcon;
    actionOff: MobileAction;
    label: string;
    indication?: string;
    offIndication: string;
    state: MobileObjectReference;
    type: "BUTTON_BISTABLE" | "BUTTON_BISTABLE_V2";
    actionOn: MobileAction;
    onIndication: string;
    rowId: number;
}

export interface MobileBistableClickButton {
    image: MobileIcon;
    actionClick: MobileAction;
    label: string;
    indication: string;
    state: MobileObjectReference;
    type: "BUTTON_BISTABLE_CLICK";
    rowId: number;
}

export interface MobileMonostableButton {
    actionClick: MobileAction;
    label: string;
    type: "BUTTON_MONOSTABLE";
    rowId: number;
}

export interface MobileBackground {
    image: MobileBackgroundImage;
    color: MobileColor;
}

export interface MobileSliderComponent {
    unit: MobileUnit;
    min: number;
    max: number;
    actionClick: MobileAction;
    label: string;
    state: MobileObjectReference;
    type: "SLIDER_BRIGHTNESS" | "SLIDER_COLOR_TEMP" | "SLIDER_HUE" | "SLIDER_SATURATION";
    rowId: number;
}

export interface MobileValueComponent {
    unit: MobileUnit;
    valueType: MobileValueType;
    precision: number;
    icon: MobileIcon;
    label: string;
    value: MobileObjectReference;
}

export interface MobileContactSensorComponent {
    icon: MobileIcon;
    label: string;
    offIndication: string;
    reverseState: boolean;
    onIndication: string;
    object: {
        value: MobileObjectReference;
        clickAction: MobileAction;
    };
}

export interface MobileDimmerV2Widget extends MobileLabeledWidget<"DIMMER_V2"> {
    min: number;
    max: number;
    precision: number;
    object: {
        onAction: MobileAction;
        offAction: MobileAction;
        setValueAction: MobileAction;
        value: MobileObjectReference;
    };
}

export interface MobileOnOffWidget extends MobileBaseWidget<"ON_OFF"> {
    buttonBistable: MobileBistableButton & { type: "BUTTON_BISTABLE" };
}

export interface MobileOnOffDoubleWidget extends MobileBaseWidget<"ON_OFF_DOUBLE"> {
    buttonBistableFirst: MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };
    buttonBistableSecond: MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };
}

export interface MobileRollerShutterV3Object {
    mechanicalOffset: MobileObjectReference;
    down: MobileObjectReference;
    setPosition: MobileAction;
    hold: MobileAction;
    overcurrent: MobileObjectReference | null;
    lamelStart: MobileAction;
    voltageType: MobileObjectReference | null;
    reversePosition: MobileObjectReference;
    state: MobileObjectReference;
    up: MobileObjectReference;
    calibration: MobileAction;
    moveUp: MobileAction;
    setMechanicalOffset: MobileAction;
    blindsUpMaxTime: MobileObjectReference;
    setRollerBlocked: MobileAction;
    setBlindsUpMaxTime: MobileAction;
    loadCurrent: MobileObjectReference | null;
    start: MobileAction;
    setLamelMoveTimeout: MobileAction;
    moveDown: MobileAction;
    lamelPosition: MobileObjectReference;
    setLamelPosition: MobileAction;
    stop: MobileAction;
    distributedLogicGroup: MobileObjectReference;
    blindsDownMaxTime: MobileObjectReference;
    holdDown: MobileAction;
    position: MobileObjectReference;
    lamelMoveTimeout: MobileObjectReference;
    holdUp: MobileAction;
    setBlindsDownMaxTime: MobileAction;
}

export interface MobileRollerShutterV3Widget extends MobileLabeledWidget<"ROLLER_SHUTTER_V3"> {
    object: MobileRollerShutterV3Object;
}

export interface MobileValueV2Widget extends MobileLabeledWidget<"VALUE_V2"> {
    unit: MobileUnit;
    valueType: MobileValueType;
    precision: number;
    value: MobileObjectReference;
}

export interface MobileSceneWidget extends MobileBaseWidget<"SCENE"> {
    background: MobileBackground;
    buttonMonostable: MobileMonostableButton;
}

export interface MobileHeaderWidget extends MobileBaseWidget<"HEADER"> {
    text: {
        image: string | null;
        label: string;
        type: "HEADER";
        rowId: number;
    };
}

export interface MobileValueDoubleWidget extends MobileBaseWidget<"VALUE_DOUBLE"> {
    componentLeft: MobileValueComponent;
    componentRight: MobileValueComponent;
}

export interface MobileSceneDoubleWidget extends MobileBaseWidget<"SCENE_DOUBLE"> {
    background: MobileBackground;
    buttonMonostableFirst: MobileMonostableButton;
    buttonMonostableSecond: MobileMonostableButton;
}

export interface MobileLedWidget extends MobileBaseWidget<"LED"> {
    buttonBistable: MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness: MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderHue: MobileSliderComponent & { type: "SLIDER_HUE" };
    sliderSaturation: MobileSliderComponent & { type: "SLIDER_SATURATION" };
}

export interface MobileLedCctWidget extends MobileBaseWidget<"LED_CCT"> {
    buttonBistable: MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness: MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderColorTemp: MobileSliderComponent & { type: "SLIDER_COLOR_TEMP" };
}

export interface MobileRollerShutterWidget extends MobileBaseWidget<"ROLLER_SHUTTER"> {
    buttonBistableClick: MobileBistableClickButton;
    status: null;
}

export interface MobileCameraWidget extends MobileBaseWidget<"CAMERA"> {
    cameraStream: {
        image: MobileIcon;
        label: string;
        type: "CAMERA_STREAM";
        url: string;
        rowId: number;
    };
}

export interface MobileSchedulerWidget extends MobileLabeledWidget<"SCHEDULER"> {
    setSchedule: MobileAction;
    setMax: MobileAction;
    max: MobileObjectReference;
    start: MobileAction;
    schedule: MobileObjectReference;
    setMin: MobileAction;
    min: MobileObjectReference;
    stop: MobileAction;
    state: MobileObjectReference;
    value: MobileObjectReference;
}

export interface MobileEventSchedulerWidget extends MobileLabeledWidget<"EVENT_SCHEDULER"> {
    object: {
        currentRule: MobileObjectReference;
        ruleList: MobileObjectReference;
        start: MobileAction;
        enableRule: MobileAction;
        ruleSpace: MobileObjectReference;
        nextRule: MobileObjectReference;
        deleteRule: MobileAction;
        disableRule: MobileAction;
        ruleCount: MobileObjectReference;
        stop: MobileAction;
        addRule: MobileAction;
        getRule: MobileAction;
        state: MobileObjectReference;
    };
}

export interface MobileTextWidget extends MobileLabeledWidget<"TEXT"> {
    iconVisible: boolean;
    text: MobileObjectReference;
}

export interface MobileMultisensorObject {
    minValue: MobileObjectReference;
    maxValue: MobileObjectReference;
    threshold: MobileObjectReference;
    sensitivity: MobileObjectReference;
    value: MobileObjectReference;
}

export interface MobileMultisensorWidget extends MobileLabeledWidget<"MULTISENSOR"> {
    labelVisible: boolean;
    objectAirCo2: MobileMultisensorObject;
    objectAirVco: MobileMultisensorObject;
    objectHumidity: MobileMultisensorObject;
    objectLight: MobileMultisensorObject;
    objectPressure: MobileMultisensorObject;
    objectSound: MobileMultisensorObject;
    objectTemperature: MobileMultisensorObject;
}

export interface MobileTvRemoteControlWidget extends MobileLabeledWidget<"TV_REMOTE_CONTROL"> {
    vodLabel: string;
    object: {
        play: MobileAction;
        init: MobileAction;
        previousChannel: MobileAction;
        fastRewind: MobileAction;
        back: MobileAction;
        mute: MobileAction;
        vod: MobileAction;
        right: MobileAction;
        menu: MobileAction;
        down: MobileAction;
        off: MobileAction;
        nextChannel: MobileAction;
        pause: MobileAction;
        volumeDown: MobileAction;
        left: MobileAction;
        volumeUp: MobileAction;
        up: MobileAction;
        ok: MobileAction;
        fastForward: MobileAction;
        guide: MobileAction;
        on: MobileAction;
    };
}

export interface MobileThermostatV2Widget extends MobileLabeledWidget<"THERMOSTAT_V2"> {
    noOfFanSpeeds: number;
    object: {
        maxTemperature: MobileObjectReference;
        setMaxTemperatureAction: MobileAction;
        fanControlOutValue: MobileObjectReference | null;
        currentTemperature: MobileObjectReference;
        fanMode: MobileObjectReference;
        setTargetTemperatureAction: MobileAction;
        setFanMode: MobileAction | null;
        controlDirection: MobileObjectReference;
        setModeAction: MobileAction;
        mode: MobileObjectReference;
        controlOutValue: MobileObjectReference;
        setMinTemperatureAction: MobileAction;
        targetTemperature: MobileObjectReference | null;
        minTemperature: MobileObjectReference;
        setScheduleDataAction: MobileAction;
        setStateAction: MobileAction;
        state: MobileObjectReference;
        setControlDirection: MobileAction;
        scheduleData: MobileObjectReference;
    };
}

export interface MobileContactSensorWidget extends MobileLabeledWidget<"CONTACT_SENSOR"> {
    offIndication: string;
    reverseState: boolean;
    onIndication: string;
    object: {
        value: MobileObjectReference;
        clickAction: MobileAction;
    };
}

export interface MobileContactSensorDoubleWidget extends MobileBaseWidget<"CONTACT_SENSOR_DOUBLE"> {
    componentLeft: MobileContactSensorComponent;
    componentRight: MobileContactSensorComponent;
}

export interface MobileSliderWidget extends MobileLabeledWidget<"SLIDER"> {
    unit: MobileUnit;
    min: number;
    max: number;
    precision: number;
    object: {
        setValueAction: MobileAction;
        value: MobileObjectReference;
        clickAction: MobileAction;
    };
}

export interface MobileCoolMasterWidget extends MobileLabeledWidget<"COOL_MASTER"> {
    minTargetTemp: number;
    maxTargetTemp: number;
    object: {
        louverPosition: MobileObjectReference;
        ambientTemp: MobileObjectReference;
        failureCode: MobileObjectReference;
        setFanSpeedAction: MobileAction;
        targetTemp: MobileObjectReference;
        supportedFanSpeeds: MobileObjectReference;
        supportedModes: MobileObjectReference;
        turnOnAction: MobileAction;
        setModeAction: MobileAction;
        supportedLouverPositions: MobileObjectReference;
        mode: MobileObjectReference;
        setSupportedLouverPositions: MobileAction;
        setSupportedFanSpeeds: MobileAction;
        turnOffAction: MobileAction;
        switchModeAction: MobileAction;
        uids: MobileObjectReference;
        setLouverPosition: MobileAction;
        setTargetTempAction: MobileAction;
        setSupportedModes: MobileAction;
        setStateAction: MobileAction;
        state: MobileObjectReference;
        fanSpeed: MobileObjectReference;
        coolMasterID: MobileObjectReference;
        status: MobileObjectReference;
    };
}

export interface MobileIntercomButton {
    label: string;
    type: "INTERCOM_BUTTON_1" | "INTERCOM_BUTTON_2";
    rowId: number;
    enabled?: boolean;
}

export interface MobileIntercomWidget extends MobileLabeledWidget<"INTERCOM"> {
    componentIntercomButton1: MobileIntercomButton & { type: "INTERCOM_BUTTON_1" };
    componentIntercomButton2: MobileIntercomButton & { type: "INTERCOM_BUTTON_2" };
    intercomSipNumber: string;
}

export interface MobileAudioRemoteControlWidget extends MobileLabeledWidget<"AUDIO_REMOTE_CONTROL"> {
    object: {
        onAction: MobileAction;
        offAction: MobileAction;
        muteAction: MobileAction;
        playAction: MobileAction;
        volumeUpAction: MobileAction;
        pauseAction: MobileAction;
        artistName: MobileObjectReference;
        previousAction: MobileAction;
        nextAction: MobileAction;
        trackTitle: MobileObjectReference;
        volumeDownAction: MobileAction;
        initAction: MobileAction;
    };
}

export type MobileWidget =
    | MobileAudioRemoteControlWidget
    | MobileCameraWidget
    | MobileContactSensorWidget
    | MobileContactSensorDoubleWidget
    | MobileCoolMasterWidget
    | MobileDimmerV2Widget
    | MobileEventSchedulerWidget
    | MobileHeaderWidget
    | MobileIntercomWidget
    | MobileLedWidget
    | MobileLedCctWidget
    | MobileMultisensorWidget
    | MobileOnOffWidget
    | MobileOnOffDoubleWidget
    | MobileRollerShutterWidget
    | MobileRollerShutterV3Widget
    | MobileSceneWidget
    | MobileSceneDoubleWidget
    | MobileSchedulerWidget
    | MobileSliderWidget
    | MobileTextWidget
    | MobileThermostatV2Widget
    | MobileTvRemoteControlWidget
    | MobileValueDoubleWidget
    | MobileValueV2Widget;

function emptyReference(): MobileObjectReference {
    return {
        cluId: null,
        objectName: null,
        index: null,
        callType: "ATTRIBUTE"
    };
}

function emptyAction(type: MobileActionType = "CLICK", callType: MobileCallType = "METHOD", value = ""): MobileAction {
    return {
        ...emptyReference(),
        callType,
        valueFormattedForDto: value,
        type,
        value
    };
}

function emptyMultisensorObject(): MobileMultisensorObject {
    return {
        minValue: emptyReference(),
        maxValue: emptyReference(),
        threshold: emptyReference(),
        sensitivity: emptyReference(),
        value: emptyReference()
    };
}


// Strongly typed helpers for building mobile definitions from Grenton raw objects.
export const MobileCallTypes = {
    Attribute: "ATTRIBUTE",
    Method: "METHOD",
    PseudoMethod: "PSEUDO_METHOD",
    Script: "SCRIPT"
} as const;

export const MobileActionTypes = {
    Click: "CLICK",
    On: "ON",
    Off: "OFF"
} as const;

export const MobileUnits = {
    Degree: "DEGREE",
    Percent: "PERCENT",
    Unknown: "UNKNOWN"
} as const;

export const MobileValueTypes = {
    Float: "FLOAT",
    String: "STRING"
} as const;

export type MobileActionValue = string | number | boolean;
export type MobileTargetIndex = string | number | null;

// Minimal structural shape of a project-side named-object registry entry:
// carries the OM name plus the CLU-side wrapper type (used only for typing -
// mobile code must never touch `object`, it does not exist off the CLU).
export interface MobileNamed<TObject = unknown> {
    name: string;
    object: TObject;
}

const mobileValueToString = (value: MobileActionValue): string => String(value);
const mobileIndexToString = (index: MobileTargetIndex): string | null => index === null ? null : String(index);

export class MobileTarget {
    constructor(
        private readonly cluName: string,
        private readonly objectName: string,
        private readonly index: MobileTargetIndex = null
    ) {}

    attribute(): MobileObjectReference {
        return {
            cluId: this.cluName,
            objectName: this.objectName,
            index: mobileIndexToString(this.index),
            callType: MobileCallTypes.Attribute
        };
    }

    method(value: MobileActionValue, type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.action(MobileCallTypes.Method, type, value);
    }

    pseudoMethod(value: MobileActionValue, type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.action(MobileCallTypes.PseudoMethod, type, value);
    }

    script(value: MobileActionValue, type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.action(MobileCallTypes.Script, type, value);
    }

    on(value: MobileActionValue = 1): MobileAction {
        return this.method(value, MobileActionTypes.On);
    }

    off(value: MobileActionValue = 0): MobileAction {
        return this.method(value, MobileActionTypes.Off);
    }

    private action(callType: MobileCallType, type: MobileActionType, value: MobileActionValue): MobileAction {
        const formattedValue = mobileValueToString(value);
        return {
            cluId: this.cluName,
            objectName: this.objectName,
            index: mobileIndexToString(this.index),
            callType,
            type,
            value: formattedValue,
            valueFormattedForDto: formattedValue
        };
    }
}

// Named handle to a Grenton object bound to its CLU, built from registry
// entries. Build references/actions for mobile widgets from it.
export class MobileObject {
    private readonly cluName: string;
    private readonly objectName: string;

    constructor(required: { clu: MobileNamed; object: MobileNamed }) {
        this.cluName = required.clu.name;
        this.objectName = required.object.name;
    }

    target(index: MobileTargetIndex = null): MobileTarget {
        return new MobileTarget(this.cluName, this.objectName, index);
    }

    attribute(index: MobileTargetIndex = null): MobileObjectReference {
        return this.target(index).attribute();
    }

    method(index: MobileTargetIndex, value: MobileActionValue = "", type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.target(index).method(value, type);
    }

    pseudoMethod(index: MobileTargetIndex, value: MobileActionValue = "", type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.target(index).pseudoMethod(value, type);
    }

    script(index: MobileTargetIndex, value: MobileActionValue = "", type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return this.target(index).script(value, type);
    }
}

// Reference to a CLU script, invoked by name. Used for SCRIPT-type widget actions
// (the script name is carried in `objectName`, with `callType: "SCRIPT"`).
export class MobileScript {
    private readonly cluName: string;
    name: string;

    constructor(required: { clu: MobileNamed; name: string }) {
        this.cluName = required.clu.name;
        this.name = required.name;
    }

    action(type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return {
            cluId: this.cluName,
            objectName: this.name,
            index: null,
            callType: MobileCallTypes.Script,
            type,
            value: "",
            valueFormattedForDto: ""
        };
    }

    on(): MobileAction {
        return this.action(MobileActionTypes.On);
    }

    off(): MobileAction {
        return this.action(MobileActionTypes.Off);
    }
}

export interface RollerShutterLike {
    moveUp: (miliseconds: number) => void;
    moveDown: (miliseconds: number) => void;
    start: (miliseconds: number) => void;
    stop: () => void;
    hold: () => void;
    holdUp: () => void;
    holdDown: () => void;
    setPosition: (position: number, lamel?: number) => void;
    setLamelPosition: (position: number) => void;
    setRollerBlocked: (state: number) => boolean;
    setLamelMoveTimeout: (timeout: number) => void;
    setBlindsUpMaxTime: (timeout: number) => void;
    setBlindsDownMaxTime: (timeout: number) => void;
    setMechanicalOffset: (offset: number) => void;
    readonly state: number;
    readonly up: boolean;
    readonly down: boolean;
    readonly position: number;
    readonly lamelPosition: number;
    readonly lamelMoveTimeout: number;
    readonly blindsUpMaxTime: number;
    readonly blindsDownMaxTime: number;
    readonly mechanicalOffset: number;
}

const RollerShutterFeatures = {
    State: 0,
    Up: 3,
    Down: 4,
    Position: 7,
    LamelPosition: 8,
    LamelMoveTimeout: 10,
    BlindsUpMaxTime: 14,
    BlindsDownMaxTime: 15,
    MechanicalOffset: 16
} as const;

const RollerShutterMethods = {
    MoveUp: 0,
    MoveDown: 1,
    Start: 2,
    Stop: 3,
    Hold: 4,
    HoldUp: 5,
    HoldDown: 6,
    SetLamelPosition: 9,
    SetPosition: 10,
    SetRollerBlocked: 13,
    SetLamelMoveTimeout: 10,
    SetBlindsUpMaxTime: 14,
    SetBlindsDownMaxTime: 15,
    SetMechanicalOffset: 16
} as const;

export class MobileRollerShutter {
    private readonly object: MobileObject;

    constructor(required: { clu: MobileNamed; rollerShutter: MobileNamed<RollerShutterLike> }) {
        this.object = new MobileObject({ clu: required.clu, object: required.rollerShutter });
    }

    get state(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.State);
    }

    get up(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.Up);
    }

    get down(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.Down);
    }

    get position(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.Position);
    }

    get lamelPosition(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.LamelPosition);
    }

    get lamelMoveTimeout(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.LamelMoveTimeout);
    }

    get blindsUpMaxTime(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.BlindsUpMaxTime);
    }

    get blindsDownMaxTime(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.BlindsDownMaxTime);
    }

    get mechanicalOffset(): MobileObjectReference {
        return this.object.attribute(RollerShutterFeatures.MechanicalOffset);
    }

    moveUp(time: MobileActionValue = 0): MobileAction {
        return this.object.method(RollerShutterMethods.MoveUp, time);
    }

    moveDown(time: MobileActionValue = 0): MobileAction {
        return this.object.method(RollerShutterMethods.MoveDown, time);
    }

    start(time: MobileActionValue = 0): MobileAction {
        return this.object.method(RollerShutterMethods.Start, time);
    }

    stop(): MobileAction {
        return this.object.method(RollerShutterMethods.Stop);
    }

    hold(): MobileAction {
        return this.object.method(RollerShutterMethods.Hold);
    }

    holdUp(): MobileAction {
        return this.object.method(RollerShutterMethods.HoldUp);
    }

    holdDown(): MobileAction {
        return this.object.method(RollerShutterMethods.HoldDown);
    }

    setPosition(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetPosition, value);
    }

    setLamelPosition(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetLamelPosition, value);
    }

    setRollerBlocked(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetRollerBlocked, value);
    }

    setLamelMoveTimeout(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetLamelMoveTimeout, value);
    }

    setBlindsUpMaxTime(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetBlindsUpMaxTime, value);
    }

    setBlindsDownMaxTime(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetBlindsDownMaxTime, value);
    }

    setMechanicalOffset(value: MobileActionValue = "$value$"): MobileAction {
        return this.object.method(RollerShutterMethods.SetMechanicalOffset, value);
    }
}

export class MobileMonostableButtonComponent implements MobileMonostableButton {
    type: "BUTTON_MONOSTABLE" = "BUTTON_MONOSTABLE";
    rowId = 0;
    label!: string;
    actionClick!: MobileAction;

    constructor(
        required: Pick<MobileMonostableButton, "label" | "actionClick">,
        optional: Partial<Pick<MobileMonostableButton, "rowId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileBistableButtonComponent implements MobileBistableButton {
    type: "BUTTON_BISTABLE" = "BUTTON_BISTABLE";
    rowId = 0;
    image: MobileBistableButton["image"] = MobileIcons.Bulb;
    offIndication = "Off";
    onIndication = "On";
    indication = "ON_OFF";
    label!: string;
    state!: MobileObjectReference;
    actionOn!: MobileAction;
    actionOff!: MobileAction;

    constructor(
        required: Pick<MobileBistableButton, "label" | "state" | "actionOn" | "actionOff">,
        optional: Partial<Pick<MobileBistableButton, "rowId" | "image" | "offIndication" | "onIndication">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileBistableButtonV2Component implements MobileBistableButton {
    type: "BUTTON_BISTABLE_V2" = "BUTTON_BISTABLE_V2";
    rowId = 0;
    image: MobileBistableButton["image"] = MobileIcons.Bulb;
    offIndication = "Off";
    onIndication = "On";
    label!: string;
    state!: MobileObjectReference;
    actionOn!: MobileAction;
    actionOff!: MobileAction;

    constructor(
        required: Pick<MobileBistableButton, "label" | "state" | "actionOn" | "actionOff">,
        optional: Partial<Pick<MobileBistableButton, "rowId" | "image" | "offIndication" | "onIndication">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileBistableClickButtonComponent implements MobileBistableClickButton {
    type: "BUTTON_BISTABLE_CLICK" = "BUTTON_BISTABLE_CLICK";
    rowId = 0;
    image: MobileBistableClickButton["image"] = MobileIcons.Bulb;
    indication = "ON_OFF";
    label!: string;
    state!: MobileObjectReference;
    actionClick!: MobileAction;

    constructor(
        required: Pick<MobileBistableClickButton, "label" | "state" | "actionClick">,
        optional: Partial<Pick<MobileBistableClickButton, "rowId" | "image" | "indication">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileBackgroundComponent implements MobileBackground {
    image!: MobileBackgroundImage;
    color: MobileColor = MobileColors.Blue;

    constructor(
        required: Pick<MobileBackground, "image">,
        optional: Partial<Pick<MobileBackground, "color">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

type MobileSliderRequired = Pick<MobileSliderComponent, "label" | "state" | "actionClick">;
type MobileSliderOptional = Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">>;

export class MobileSliderComponentBase implements MobileSliderComponent {
    rowId = 0;
    unit: MobileUnit = MobileUnits.Unknown;
    min = 0;
    max = 1;
    label!: string;
    state!: MobileObjectReference;
    actionClick!: MobileAction;

    constructor(
        public type: MobileSliderComponent["type"],
        required: MobileSliderRequired,
        optional: MobileSliderOptional = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileBrightnessSliderComponent extends MobileSliderComponentBase {
    constructor(required: MobileSliderRequired, optional: MobileSliderOptional = {}) {
        super("SLIDER_BRIGHTNESS", required, optional);
    }
}

export class MobileHueSliderComponent extends MobileSliderComponentBase {
    constructor(required: MobileSliderRequired, optional: MobileSliderOptional = {}) {
        super("SLIDER_HUE", required, optional);
    }
}

export class MobileSaturationSliderComponent extends MobileSliderComponentBase {
    constructor(required: MobileSliderRequired, optional: MobileSliderOptional = {}) {
        super("SLIDER_SATURATION", required, optional);
    }
}

export class MobileColorTemperatureSliderComponent extends MobileSliderComponentBase {
    constructor(required: MobileSliderRequired, optional: MobileSliderOptional = {}) {
        super("SLIDER_COLOR_TEMP", required, optional);
    }
}

export class MobileValueDisplayComponent implements MobileValueComponent {
    valueType: MobileValueType = MobileValueTypes.Float;
    unit: MobileUnit = MobileUnits.Unknown;
    precision = 0;
    icon: MobileIcon = MobileIcons.Value;
    label!: string;
    value!: MobileObjectReference;

    constructor(
        required: Pick<MobileValueComponent, "label" | "value">,
        optional: Partial<Pick<MobileValueComponent, "valueType" | "unit" | "precision" | "icon">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileContactSensorDisplayComponent implements MobileContactSensorComponent {
    icon: MobileIcon = MobileIcons.Lock;
    offIndication = "Off";
    reverseState = false;
    onIndication = "On";
    label!: string;
    object!: MobileContactSensorComponent["object"];

    constructor(
        required: { label: string; value: MobileObjectReference; clickAction: MobileAction },
        optional: Partial<Pick<MobileContactSensorComponent, "icon" | "offIndication" | "reverseState" | "onIndication">> = {}
    ) {
        this.label = required.label;
        this.object = { value: required.value, clickAction: required.clickAction };
        Object.assign(this, optional);
    }
}

export class MobileIntercomButton1Component implements MobileIntercomButton {
    type: "INTERCOM_BUTTON_1" = "INTERCOM_BUTTON_1";
    rowId = 0;
    enabled?: boolean;
    label!: string;

    constructor(
        required: Pick<MobileIntercomButton, "label">,
        optional: Partial<Pick<MobileIntercomButton, "rowId" | "enabled">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileIntercomButton2Component implements MobileIntercomButton {
    type: "INTERCOM_BUTTON_2" = "INTERCOM_BUTTON_2";
    rowId = 0;
    enabled?: boolean;
    label!: string;

    constructor(
        required: Pick<MobileIntercomButton, "label">,
        optional: Partial<Pick<MobileIntercomButton, "rowId" | "enabled">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

// All widget/page/interface constructors follow the same convention: the first
// argument carries everything the OM editor requires (ids, labels and device/
// script bindings), the second is an optional bag of cosmetic fields that have
// sensible defaults.
export class MobileInterface {
    pages: MobilePage[] = [];
    pushNotifications: null = null;
    lightLogoPath: string | null = null;
    icon: MobileInterfaceIcon = MobileInterfaceIcons.Home1;
    blockCloud = false;
    theme: MobileColor = MobileColors.Blue;
    id!: string;
    label!: string;
    cloudSharing: null = null;
    darkLogoPath: string | null = null;

    constructor(
        required: Pick<MobileInterface, "id" | "label">,
        optional: Partial<Pick<MobileInterface, "icon" | "theme" | "blockCloud" | "lightLogoPath" | "darkLogoPath">> = {}
    ) {
        Object.assign(this, required, optional);
    }

    AddPage(page: MobilePage): this {
        this.pages.push(page);
        return this;
    }

    addPage(page: MobilePage): this {
        return this.AddPage(page);
    }
}

export class MobilePage {
    icon: MobileIcon = MobileIcons.Default;
    id!: number;
    label!: string;
    widgets: MobileWidget[] = [];
    pageId!: number;

    constructor(
        required: Pick<MobilePage, "id" | "label">,
        optional: Partial<Pick<MobilePage, "icon" | "pageId">> = {}
    ) {
        Object.assign(this, required, optional);
        this.pageId = optional.pageId ?? required.id;
    }

    AddWidget(widget: MobileWidget): this {
        this.widgets.push(widget);
        return this;
    }

    addWidget(widget: MobileWidget): this {
        return this.AddWidget(widget);
    }
}

export class MobileDimmerV2Widget {
    id!: number;
    type: "DIMMER_V2" = "DIMMER_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Dimmer;
    label!: string;
    min = 0;
    max = 255;
    precision = 0;
    object!: MobileDimmerV2Widget["object"];

    constructor(
        required: Pick<MobileDimmerV2Widget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileDimmerV2Widget, "icon" | "min" | "max" | "precision" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileOnOffWidget {
    id!: number;
    type: "ON_OFF" = "ON_OFF";
    dtoId: string | null = null;
    buttonBistable!: MobileBistableButton & { type: "BUTTON_BISTABLE" };

    constructor(
        required: Pick<MobileOnOffWidget, "id" | "buttonBistable">,
        optional: Partial<Pick<MobileOnOffWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileOnOffDoubleWidget {
    id!: number;
    type: "ON_OFF_DOUBLE" = "ON_OFF_DOUBLE";
    dtoId: string | null = null;
    buttonBistableFirst!: MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };
    buttonBistableSecond!: MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };

    constructor(
        required: Pick<MobileOnOffDoubleWidget, "id" | "buttonBistableFirst" | "buttonBistableSecond">,
        optional: Partial<Pick<MobileOnOffDoubleWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

// The fields the OM widget editor marks as mandatory for ROLLER_SHUTTER_V3.
export interface MobileRollerShutterV3Required {
    id: number;
    icon: MobileIcon;
    label: string;
    state: MobileObjectReference;
    position: MobileObjectReference;
    lamelPosition: MobileObjectReference;
    moveUp: MobileAction;
    moveDown: MobileAction;
    start: MobileAction;
    setPosition: MobileAction;
    setLamelPosition: MobileAction;
    setRollerBlocked: MobileAction;
}

// First argument carries everything the OM editor requires; the second is an
// optional bag of the remaining object fields (and dtoId), which default to
// empty entities exactly as OM's own template leaves them.
export class MobileRollerShutterV3Widget {
    id: number;
    type: "ROLLER_SHUTTER_V3" = "ROLLER_SHUTTER_V3";
    dtoId: string | null;
    icon: MobileIcon;
    label: string;
    object: MobileRollerShutterV3Object;

    constructor(
        required: MobileRollerShutterV3Required,
        optional: Partial<MobileRollerShutterV3Object> & { dtoId?: string | null } = {}
    ) {
        const { id, icon, label, ...requiredObject } = required;
        const { dtoId, ...optionalObject } = optional;
        this.id = id;
        this.icon = icon;
        this.label = label;
        this.dtoId = dtoId ?? null;
        this.object = {
            mechanicalOffset: emptyReference(),
            down: emptyReference(),
            hold: emptyAction(),
            overcurrent: null,
            lamelStart: emptyAction(),
            voltageType: null,
            reversePosition: emptyReference(),
            up: emptyReference(),
            calibration: emptyAction("CLICK", "METHOD", "1"),
            setMechanicalOffset: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
            blindsUpMaxTime: emptyReference(),
            setBlindsUpMaxTime: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
            loadCurrent: null,
            setLamelMoveTimeout: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
            stop: emptyAction(),
            distributedLogicGroup: emptyReference(),
            blindsDownMaxTime: emptyReference(),
            holdDown: emptyAction(),
            lamelMoveTimeout: emptyReference(),
            holdUp: emptyAction(),
            setBlindsDownMaxTime: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
            ...requiredObject,
            ...optionalObject
        };
    }
}

export class MobileValueV2Widget {
    id!: number;
    type: "VALUE_V2" = "VALUE_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Value;
    label!: string;
    unit: MobileUnit = "UNKNOWN";
    valueType: MobileValueType = "STRING";
    precision = 2;
    value!: MobileObjectReference;

    constructor(
        required: Pick<MobileValueV2Widget, "id" | "label" | "value">,
        optional: Partial<Pick<MobileValueV2Widget, "icon" | "unit" | "valueType" | "precision" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileSceneWidget {
    id!: number;
    type: "SCENE" = "SCENE";
    dtoId: string | null = null;
    background: MobileBackground = { image: MobileBackgroundImages.LockDoor, color: MobileColors.Blue };
    buttonMonostable!: MobileMonostableButton;

    constructor(
        required: Pick<MobileSceneWidget, "id" | "buttonMonostable">,
        optional: Partial<Pick<MobileSceneWidget, "background" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileHeaderWidget {
    id!: number;
    type: "HEADER" = "HEADER";
    dtoId: string | null = null;
    text!: {
        image: string | null;
        label: string;
        type: "HEADER";
        rowId: number;
    };

    constructor(
        required: Pick<MobileHeaderWidget, "id"> & { label: string },
        optional: { image?: string | null; rowId?: number; dtoId?: string | null } = {}
    ) {
        this.id = required.id;
        this.dtoId = optional.dtoId ?? null;
        this.text = {
            image: optional.image ?? null,
            label: required.label,
            type: "HEADER",
            rowId: optional.rowId ?? 0
        };
    }
}

export class MobileValueDoubleWidget {
    id!: number;
    type: "VALUE_DOUBLE" = "VALUE_DOUBLE";
    dtoId: string | null = null;
    componentLeft!: MobileValueComponent;
    componentRight!: MobileValueComponent;

    constructor(
        required: Pick<MobileValueDoubleWidget, "id" | "componentLeft" | "componentRight">,
        optional: Partial<Pick<MobileValueDoubleWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileSceneDoubleWidget {
    id!: number;
    type: "SCENE_DOUBLE" = "SCENE_DOUBLE";
    dtoId: string | null = null;
    background: MobileBackground = { image: "gate_2", color: "blue" };
    buttonMonostableFirst!: MobileMonostableButton;
    buttonMonostableSecond!: MobileMonostableButton;

    constructor(
        required: Pick<MobileSceneDoubleWidget, "id" | "buttonMonostableFirst" | "buttonMonostableSecond">,
        optional: Partial<Pick<MobileSceneDoubleWidget, "background" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileLedWidget {
    id!: number;
    type: "LED" = "LED";
    dtoId: string | null = null;
    buttonBistable!: MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness!: MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderHue!: MobileSliderComponent & { type: "SLIDER_HUE" };
    sliderSaturation!: MobileSliderComponent & { type: "SLIDER_SATURATION" };

    constructor(
        required: Pick<MobileLedWidget, "id" | "buttonBistable" | "sliderBrightness" | "sliderHue" | "sliderSaturation">,
        optional: Partial<Pick<MobileLedWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileLedCctWidget {
    id!: number;
    type: "LED_CCT" = "LED_CCT";
    dtoId: string | null = null;
    buttonBistable!: MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness!: MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderColorTemp!: MobileSliderComponent & { type: "SLIDER_COLOR_TEMP" };

    constructor(
        required: Pick<MobileLedCctWidget, "id" | "buttonBistable" | "sliderBrightness" | "sliderColorTemp">,
        optional: Partial<Pick<MobileLedCctWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileRollerShutterWidget {
    id!: number;
    type: "ROLLER_SHUTTER" = "ROLLER_SHUTTER";
    dtoId: string | null = null;
    buttonBistableClick!: MobileBistableClickButton;
    status: null = null;

    constructor(
        required: Pick<MobileRollerShutterWidget, "id" | "buttonBistableClick">,
        optional: Partial<Pick<MobileRollerShutterWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileCameraWidget {
    id!: number;
    type: "CAMERA" = "CAMERA";
    dtoId: string | null = null;
    cameraStream!: {
        image: MobileIcon;
        label: string;
        type: "CAMERA_STREAM";
        url: string;
        rowId: number;
    };

    constructor(
        required: Pick<MobileCameraWidget, "id"> & { label: string; url: string },
        optional: { image?: MobileIcon; rowId?: number; dtoId?: string | null } = {}
    ) {
        this.id = required.id;
        this.dtoId = optional.dtoId ?? null;
        this.cameraStream = {
            image: optional.image ?? MobileIcons.Camera,
            label: required.label,
            type: "CAMERA_STREAM",
            url: required.url,
            rowId: optional.rowId ?? 0
        };
    }
}

export class MobileSchedulerWidget {
    id!: number;
    type: "SCHEDULER" = "SCHEDULER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Scheduler;
    label!: string;
    setSchedule!: MobileAction;
    setMax!: MobileAction;
    max!: MobileObjectReference;
    start!: MobileAction;
    schedule!: MobileObjectReference;
    setMin!: MobileAction;
    min!: MobileObjectReference;
    stop!: MobileAction;
    state!: MobileObjectReference;
    value!: MobileObjectReference;

    constructor(
        required: Pick<
            MobileSchedulerWidget,
            "id" | "label" | "setSchedule" | "setMax" | "max" | "start" | "schedule" | "setMin" | "min" | "stop" | "state" | "value"
        >,
        optional: Partial<Pick<MobileSchedulerWidget, "icon" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileEventSchedulerWidget {
    id!: number;
    type: "EVENT_SCHEDULER" = "EVENT_SCHEDULER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Scheduler;
    label!: string;
    object!: MobileEventSchedulerWidget["object"];

    constructor(
        required: Pick<MobileEventSchedulerWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileEventSchedulerWidget, "icon" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileTextWidget {
    id!: number;
    type: "TEXT" = "TEXT";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Text;
    label!: string;
    iconVisible = true;
    text!: MobileObjectReference;

    constructor(
        required: Pick<MobileTextWidget, "id" | "label" | "text">,
        optional: Partial<Pick<MobileTextWidget, "icon" | "iconVisible" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

// Multisensor channels stay optional: which sensors exist varies per device,
// and absent channels keep the empty placeholder OM emits for them.
export class MobileMultisensorWidget {
    id!: number;
    type: "MULTISENSOR" = "MULTISENSOR";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Multisensor;
    label!: string;
    labelVisible = true;
    objectAirCo2 = emptyMultisensorObject();
    objectAirVco = emptyMultisensorObject();
    objectHumidity = emptyMultisensorObject();
    objectLight = emptyMultisensorObject();
    objectPressure = emptyMultisensorObject();
    objectSound = emptyMultisensorObject();
    objectTemperature = emptyMultisensorObject();

    constructor(
        required: Pick<MobileMultisensorWidget, "id" | "label">,
        optional: Partial<
            Pick<
                MobileMultisensorWidget,
                | "icon"
                | "labelVisible"
                | "dtoId"
                | "objectAirCo2"
                | "objectAirVco"
                | "objectHumidity"
                | "objectLight"
                | "objectPressure"
                | "objectSound"
                | "objectTemperature"
            >
        > = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileTvRemoteControlWidget {
    id!: number;
    type: "TV_REMOTE_CONTROL" = "TV_REMOTE_CONTROL";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Tv;
    label!: string;
    vodLabel = "";
    object!: MobileTvRemoteControlWidget["object"];

    constructor(
        required: Pick<MobileTvRemoteControlWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileTvRemoteControlWidget, "icon" | "vodLabel" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileThermostatV2Widget {
    id!: number;
    type: "THERMOSTAT_V2" = "THERMOSTAT_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Temperature;
    label!: string;
    noOfFanSpeeds = 0;
    object!: MobileThermostatV2Widget["object"];

    constructor(
        required: Pick<MobileThermostatV2Widget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileThermostatV2Widget, "icon" | "noOfFanSpeeds" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileContactSensorWidget {
    id!: number;
    type: "CONTACT_SENSOR" = "CONTACT_SENSOR";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Lock;
    label!: string;
    offIndication = "Wyłączone";
    reverseState = false;
    onIndication = "Włączone";
    object!: MobileContactSensorComponent["object"];

    constructor(
        required: Pick<MobileContactSensorWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileContactSensorWidget, "icon" | "offIndication" | "onIndication" | "reverseState" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileContactSensorDoubleWidget {
    id!: number;
    type: "CONTACT_SENSOR_DOUBLE" = "CONTACT_SENSOR_DOUBLE";
    dtoId: string | null = null;
    componentLeft!: MobileContactSensorComponent;
    componentRight!: MobileContactSensorComponent;

    constructor(
        required: Pick<MobileContactSensorDoubleWidget, "id" | "componentLeft" | "componentRight">,
        optional: Partial<Pick<MobileContactSensorDoubleWidget, "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileSliderWidget {
    id!: number;
    type: "SLIDER" = "SLIDER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.VolumeCircle;
    label!: string;
    unit: MobileUnit = "UNKNOWN";
    min = 0;
    max = 1;
    precision = 2;
    object!: MobileSliderWidget["object"];

    constructor(
        required: Pick<MobileSliderWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileSliderWidget, "icon" | "unit" | "min" | "max" | "precision" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileCoolMasterWidget {
    id!: number;
    type: "COOL_MASTER" = "COOL_MASTER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Ac;
    label!: string;
    minTargetTemp = 10;
    maxTargetTemp = 30;
    object!: MobileCoolMasterWidget["object"];

    constructor(
        required: Pick<MobileCoolMasterWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileCoolMasterWidget, "icon" | "minTargetTemp" | "maxTargetTemp" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileIntercomWidget {
    id!: number;
    type: "INTERCOM" = "INTERCOM";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Intercom;
    label!: string;
    componentIntercomButton1: MobileIntercomButton & { type: "INTERCOM_BUTTON_1" } = {
        label: "",
        type: "INTERCOM_BUTTON_1" as const,
        rowId: 0
    };
    componentIntercomButton2: MobileIntercomButton & { type: "INTERCOM_BUTTON_2" } = {
        label: "",
        type: "INTERCOM_BUTTON_2" as const,
        rowId: 0,
        enabled: true
    };
    intercomSipNumber!: string;

    constructor(
        required: Pick<MobileIntercomWidget, "id" | "label" | "intercomSipNumber">,
        optional: Partial<Pick<MobileIntercomWidget, "icon" | "componentIntercomButton1" | "componentIntercomButton2" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}

export class MobileAudioRemoteControlWidget {
    id!: number;
    type: "AUDIO_REMOTE_CONTROL" = "AUDIO_REMOTE_CONTROL";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Speaker;
    label!: string;
    object!: MobileAudioRemoteControlWidget["object"];

    constructor(
        required: Pick<MobileAudioRemoteControlWidget, "id" | "label" | "object">,
        optional: Partial<Pick<MobileAudioRemoteControlWidget, "icon" | "dtoId">> = {}
    ) {
        Object.assign(this, required, optional);
    }
}
