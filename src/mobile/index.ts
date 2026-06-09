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

export const MobileIcons = {
    Default: "default",
    Home1: "home_1",
    Dimmer: "dimmer",
    Blinds: "blinds",
    Bulb: "bulb",
    Value: "value",
    ValueDouble: "value_double",
    Lock: "lock",
    DoorClosed: "door_closed",
    Camera: "camera",
    Scheduler: "scheduler",
    Text: "text",
    Multisensor: "multisensor",
    Tv: "tv",
    Temperature: "temperature",
    VolumeCircle: "volume_circle",
    Ac: "ac",
    Intercom: "intercom",
    Speaker: "speaker"
} as const;

export type MobileIcon = typeof MobileIcons[keyof typeof MobileIcons];

export const MobileBackgroundImages = {
    LockDoor: "lock_door",
    Holiday: "holiday",
    Gate2: "gate_2"
} as const;

export type MobileBackgroundImage = typeof MobileBackgroundImages[keyof typeof MobileBackgroundImages];

export const MobileColors = {
    Blue: "blue"
} as const;

export type MobileColor = typeof MobileColors[keyof typeof MobileColors];


export interface MobileInterface {
    pages: MobilePage[];
    pushNotifications: null;
    lightLogoPath: string | null;
    icon: MobileIcon;
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

let nextMobileId = Date.now();

function createMobileId(): number {
    nextMobileId += 1;
    return nextMobileId;
}

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

function emptyBistableButton(type: "BUTTON_BISTABLE" | "BUTTON_BISTABLE_V2" = "BUTTON_BISTABLE"): MobileBistableButton {
    return {
        image: "bulb",
        actionOff: emptyAction("OFF", "METHOD", "0"),
        label: "",
        indication: "ON_OFF",
        offIndication: "Off",
        state: emptyReference(),
        type,
        actionOn: emptyAction("ON", "METHOD", "1"),
        onIndication: "On",
        rowId: 0
    };
}

function emptyMonostableButton(): MobileMonostableButton {
    return {
        actionClick: emptyAction(),
        label: "",
        type: "BUTTON_MONOSTABLE",
        rowId: 0
    };
}

function emptySliderComponent(type: MobileSliderComponent["type"]): MobileSliderComponent {
    return {
        unit: "UNKNOWN",
        min: 0,
        max: 1,
        actionClick: emptyAction(),
        label: "",
        state: emptyReference(),
        type,
        rowId: 0
    };
}

function emptyValueComponent(): MobileValueComponent {
    return {
        unit: "UNKNOWN",
        valueType: "STRING",
        precision: 2,
        icon: "value",
        label: "",
        value: emptyReference()
    };
}

function emptyContactSensorComponent(): MobileContactSensorComponent {
    return {
        icon: "lock",
        label: "",
        offIndication: "Wyłączone",
        reverseState: false,
        onIndication: "Włączone",
        object: {
            value: emptyReference(),
            clickAction: emptyAction()
        }
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

export interface MobileRawObject {
    objectName: string;
}

const mobileValueToString = (value: MobileActionValue): string => String(value);
const mobileIndexToString = (index: MobileTargetIndex): string | null => index === null ? null : String(index);

export class MobileTarget<TClu extends MobileRawObject = MobileRawObject, TObject extends MobileRawObject = MobileRawObject> {
    constructor(
        private readonly clu: TClu,
        private readonly object: TObject,
        private readonly index: MobileTargetIndex = null
    ) {}

    attribute(): MobileObjectReference {
        return {
            cluId: this.clu.objectName,
            objectName: this.object.objectName,
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
            cluId: this.clu.objectName,
            objectName: this.object.objectName,
            index: mobileIndexToString(this.index),
            callType,
            type,
            value: formattedValue,
            valueFormattedForDto: formattedValue
        };
    }
}

export const mobileTarget = <TClu extends MobileRawObject, TObject extends MobileRawObject>(
    clu: TClu,
    object: TObject,
    index: MobileTargetIndex = null
): MobileTarget<TClu, TObject> => new MobileTarget(clu, object, index);

// Named wrapper around a raw Grenton object bound to its CLU. This is the mobile
// analog of the device wrappers (DOut, DIn, ...): declare the raw object, then wrap
// it in a meaningfully named MobileObject and build references/actions from it.
export class MobileObject<TClu extends MobileRawObject = MobileRawObject, TObject extends MobileRawObject = MobileRawObject> {
    constructor(
        private readonly clu: TClu,
        private readonly object: TObject
    ) {}

    target(index: MobileTargetIndex = null): MobileTarget<TClu, TObject> {
        return new MobileTarget(this.clu, this.object, index);
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

export const mobileObject = <TClu extends MobileRawObject, TObject extends MobileRawObject>(
    clu: TClu,
    object: TObject
): MobileObject<TClu, TObject> => new MobileObject(clu, object);

// Reference to a CLU script, invoked by name. Used for SCRIPT-type widget actions
// (the script name is carried in `objectName`, with `callType: "SCRIPT"`).
export class MobileScript<TClu extends MobileRawObject = MobileRawObject> {
    constructor(
        private readonly clu: TClu,
        public name: string
    ) {}

    action(type: MobileActionType = MobileActionTypes.Click): MobileAction {
        return {
            cluId: this.clu.objectName,
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

export const mobileScript = <TClu extends MobileRawObject>(
    clu: TClu,
    name: string
): MobileScript<TClu> => new MobileScript(clu, name);

export class MobileMonostableButtonComponent implements MobileMonostableButton {
    type: "BUTTON_MONOSTABLE" = "BUTTON_MONOSTABLE";
    rowId: number;

    constructor(
        public label: string,
        public actionClick: MobileAction,
        config: Partial<Pick<MobileMonostableButton, "rowId">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
    }
}

export class MobileBistableButtonComponent implements MobileBistableButton {
    type: "BUTTON_BISTABLE" = "BUTTON_BISTABLE";
    rowId: number;
    image: MobileBistableButton["image"];
    offIndication: string;
    onIndication: string;
    indication?: string;

    constructor(
        public label: string,
        public state: MobileObjectReference,
        public actionOn: MobileAction,
        public actionOff: MobileAction,
        config: Partial<Pick<MobileBistableButton, "rowId" | "image" | "offIndication" | "onIndication" | "indication">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        this.image = config.image ?? MobileIcons.Bulb;
        this.offIndication = config.offIndication ?? "Off";
        this.onIndication = config.onIndication ?? "On";
        if (config.indication !== undefined) this.indication = config.indication;
    }
}

export class MobileBistableButtonV2Component implements MobileBistableButton {
    type: "BUTTON_BISTABLE_V2" = "BUTTON_BISTABLE_V2";
    rowId: number;
    image: MobileBistableButton["image"];
    offIndication: string;
    onIndication: string;

    constructor(
        public label: string,
        public state: MobileObjectReference,
        public actionOn: MobileAction,
        public actionOff: MobileAction,
        config: Partial<Pick<MobileBistableButton, "rowId" | "image" | "offIndication" | "onIndication">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        this.image = config.image ?? MobileIcons.Bulb;
        this.offIndication = config.offIndication ?? "Off";
        this.onIndication = config.onIndication ?? "On";
    }
}

export class MobileBistableClickButtonComponent implements MobileBistableClickButton {
    type: "BUTTON_BISTABLE_CLICK" = "BUTTON_BISTABLE_CLICK";
    rowId: number;
    image: MobileBistableClickButton["image"];
    indication: string;

    constructor(
        public label: string,
        public state: MobileObjectReference,
        public actionClick: MobileAction,
        config: Partial<Pick<MobileBistableClickButton, "rowId" | "image" | "indication">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        this.image = config.image ?? MobileIcons.Bulb;
        this.indication = config.indication ?? "ON_OFF";
    }
}

export class MobileBackgroundComponent implements MobileBackground {
    constructor(
        public image: MobileBackgroundImage,
        public color: MobileColor = MobileColors.Blue
    ) {}
}

export class MobileSliderComponentBase implements MobileSliderComponent {
    rowId: number;
    unit: MobileUnit;
    min: number;
    max: number;

    constructor(
        public type: MobileSliderComponent["type"],
        public label: string,
        public state: MobileObjectReference,
        public actionClick: MobileAction,
        config: Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        this.unit = config.unit ?? MobileUnits.Unknown;
        this.min = config.min ?? 0;
        this.max = config.max ?? 1;
    }
}

export class MobileBrightnessSliderComponent extends MobileSliderComponentBase {
    constructor(label: string, state: MobileObjectReference, actionClick: MobileAction, config: Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">> = {}) {
        super("SLIDER_BRIGHTNESS", label, state, actionClick, config);
    }
}

export class MobileHueSliderComponent extends MobileSliderComponentBase {
    constructor(label: string, state: MobileObjectReference, actionClick: MobileAction, config: Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">> = {}) {
        super("SLIDER_HUE", label, state, actionClick, config);
    }
}

export class MobileSaturationSliderComponent extends MobileSliderComponentBase {
    constructor(label: string, state: MobileObjectReference, actionClick: MobileAction, config: Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">> = {}) {
        super("SLIDER_SATURATION", label, state, actionClick, config);
    }
}

export class MobileColorTemperatureSliderComponent extends MobileSliderComponentBase {
    constructor(label: string, state: MobileObjectReference, actionClick: MobileAction, config: Partial<Pick<MobileSliderComponent, "rowId" | "unit" | "min" | "max">> = {}) {
        super("SLIDER_COLOR_TEMP", label, state, actionClick, config);
    }
}

export class MobileValueDisplayComponent implements MobileValueComponent {
    valueType: MobileValueType;
    unit: MobileUnit;
    precision: number;
    icon: MobileIcon;

    constructor(
        public label: string,
        public value: MobileObjectReference,
        config: Partial<Pick<MobileValueComponent, "valueType" | "unit" | "precision" | "icon">> = {}
    ) {
        this.valueType = config.valueType ?? MobileValueTypes.Float;
        this.unit = config.unit ?? MobileUnits.Unknown;
        this.precision = config.precision ?? 0;
        this.icon = config.icon ?? MobileIcons.Value;
    }
}

export class MobileContactSensorDisplayComponent implements MobileContactSensorComponent {
    icon: MobileIcon;
    offIndication: string;
    reverseState: boolean;
    onIndication: string;
    object: MobileContactSensorComponent["object"];

    constructor(
        public label: string,
        value: MobileObjectReference,
        clickAction: MobileAction,
        config: Partial<Pick<MobileContactSensorComponent, "icon" | "offIndication" | "reverseState" | "onIndication">> = {}
    ) {
        this.icon = config.icon ?? MobileIcons.Lock;
        this.offIndication = config.offIndication ?? "Off";
        this.reverseState = config.reverseState ?? false;
        this.onIndication = config.onIndication ?? "On";
        this.object = { value, clickAction };
    }
}

export class MobileIntercomButton1Component implements MobileIntercomButton {
    type: "INTERCOM_BUTTON_1" = "INTERCOM_BUTTON_1";
    rowId: number;
    enabled?: boolean;

    constructor(
        public label: string,
        config: Partial<Pick<MobileIntercomButton, "rowId" | "enabled">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        if (config.enabled !== undefined) this.enabled = config.enabled;
    }
}

export class MobileIntercomButton2Component implements MobileIntercomButton {
    type: "INTERCOM_BUTTON_2" = "INTERCOM_BUTTON_2";
    rowId: number;
    enabled?: boolean;

    constructor(
        public label: string,
        config: Partial<Pick<MobileIntercomButton, "rowId" | "enabled">> = {}
    ) {
        this.rowId = config.rowId ?? 0;
        if (config.enabled !== undefined) this.enabled = config.enabled;
    }
}

export class MobileInterface {
    pages: MobilePage[] = [];
    pushNotifications: null = null;
    lightLogoPath: string | null = null;
    icon: MobileIcon = MobileIcons.Home1;
    blockCloud = false;
    theme: MobileColor = MobileColors.Blue;
    id = "";
    label = "";
    cloudSharing: null = null;
    darkLogoPath: string | null = null;

    constructor(config?: Partial<MobileInterface>) {
        Object.assign(this, config);
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
    id = createMobileId();
    label = "";
    widgets: MobileWidget[] = [];
    pageId = this.id;

    constructor(labelOrConfig?: string | Partial<MobilePage>) {
        if (typeof labelOrConfig === "string") {
            this.label = labelOrConfig;
        } else {
            Object.assign(this, labelOrConfig);
            this.pageId = this.pageId || this.id;
        }
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
    id = createMobileId();
    type: "DIMMER_V2" = "DIMMER_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Dimmer;
    label = "";
    min = 0;
    max = 255;
    precision = 0;
    object: MobileDimmerV2Widget["object"] = {
        onAction: emptyAction("CLICK", "METHOD", "255"),
        offAction: emptyAction("CLICK", "METHOD", "0"),
        setValueAction: emptyAction("CLICK", "METHOD", "$value$"),
        value: emptyReference()
    };

    constructor(config?: Partial<MobileDimmerV2Widget>) {
        Object.assign(this, config);
    }
}

export class MobileOnOffWidget {
    id = createMobileId();
    type: "ON_OFF" = "ON_OFF";
    dtoId: string | null = null;
    buttonBistable = emptyBistableButton("BUTTON_BISTABLE") as MobileBistableButton & { type: "BUTTON_BISTABLE" };

    constructor(config?: Partial<MobileOnOffWidget>) {
        Object.assign(this, config);
    }
}

export class MobileOnOffDoubleWidget {
    id = createMobileId();
    type: "ON_OFF_DOUBLE" = "ON_OFF_DOUBLE";
    dtoId: string | null = null;
    buttonBistableFirst = emptyBistableButton("BUTTON_BISTABLE_V2") as MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };
    buttonBistableSecond = emptyBistableButton("BUTTON_BISTABLE_V2") as MobileBistableButton & { type: "BUTTON_BISTABLE_V2" };

    constructor(config?: Partial<MobileOnOffDoubleWidget>) {
        Object.assign(this, config);
    }
}

export class MobileRollerShutterV3Widget {
    id = createMobileId();
    type: "ROLLER_SHUTTER_V3" = "ROLLER_SHUTTER_V3";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Blinds;
    label = "";
    object: MobileRollerShutterV3Object = {
        mechanicalOffset: emptyReference(),
        down: emptyReference(),
        setPosition: emptyAction("CLICK", "METHOD", "$value$"),
        hold: emptyAction(),
        overcurrent: null,
        lamelStart: emptyAction(),
        voltageType: null,
        reversePosition: emptyReference(),
        state: emptyReference(),
        up: emptyReference(),
        calibration: emptyAction("CLICK", "METHOD", "1"),
        moveUp: emptyAction("CLICK", "METHOD", "0"),
        setMechanicalOffset: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
        blindsUpMaxTime: emptyReference(),
        setRollerBlocked: emptyAction("CLICK", "METHOD", "0"),
        setBlindsUpMaxTime: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
        loadCurrent: null,
        start: emptyAction("CLICK", "METHOD", "0"),
        setLamelMoveTimeout: emptyAction("CLICK", "PSEUDO_METHOD", "$value$"),
        moveDown: emptyAction("CLICK", "METHOD", "0"),
        lamelPosition: emptyReference(),
        setLamelPosition: emptyAction("CLICK", "METHOD", "$value$"),
        stop: emptyAction(),
        distributedLogicGroup: emptyReference(),
        blindsDownMaxTime: emptyReference(),
        holdDown: emptyAction(),
        position: emptyReference(),
        lamelMoveTimeout: emptyReference(),
        holdUp: emptyAction(),
        setBlindsDownMaxTime: emptyAction("CLICK", "PSEUDO_METHOD", "$value$")
    };

    constructor(config?: Partial<MobileRollerShutterV3Widget>) {
        Object.assign(this, config);
    }
}

export class MobileValueV2Widget {
    id = createMobileId();
    type: "VALUE_V2" = "VALUE_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Value;
    label = "";
    unit: MobileUnit = "UNKNOWN";
    valueType: MobileValueType = "STRING";
    precision = 2;
    value = emptyReference();

    constructor(config?: Partial<MobileValueV2Widget>) {
        Object.assign(this, config);
    }
}

export class MobileSceneWidget {
    id = createMobileId();
    type: "SCENE" = "SCENE";
    dtoId: string | null = null;
    background: MobileBackground = { image: MobileBackgroundImages.LockDoor, color: MobileColors.Blue };
    buttonMonostable = emptyMonostableButton();

    constructor(config?: Partial<MobileSceneWidget>) {
        Object.assign(this, config);
    }
}

export class MobileHeaderWidget {
    id = createMobileId();
    type: "HEADER" = "HEADER";
    dtoId: string | null = null;
    text = {
        image: null as string | null,
        label: "",
        type: "HEADER" as const,
        rowId: 0
    };

    constructor(config?: Partial<MobileHeaderWidget>) {
        Object.assign(this, config);
    }
}

export class MobileValueDoubleWidget {
    id = createMobileId();
    type: "VALUE_DOUBLE" = "VALUE_DOUBLE";
    dtoId: string | null = null;
    componentLeft = emptyValueComponent();
    componentRight = emptyValueComponent();

    constructor(config?: Partial<MobileValueDoubleWidget>) {
        Object.assign(this, config);
    }
}

export class MobileSceneDoubleWidget {
    id = createMobileId();
    type: "SCENE_DOUBLE" = "SCENE_DOUBLE";
    dtoId: string | null = null;
    background: MobileBackground = { image: "gate_2", color: "blue" };
    buttonMonostableFirst = emptyMonostableButton();
    buttonMonostableSecond = emptyMonostableButton();

    constructor(config?: Partial<MobileSceneDoubleWidget>) {
        Object.assign(this, config);
    }
}

export class MobileLedWidget {
    id = createMobileId();
    type: "LED" = "LED";
    dtoId: string | null = null;
    buttonBistable = emptyBistableButton("BUTTON_BISTABLE") as MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness = emptySliderComponent("SLIDER_BRIGHTNESS") as MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderHue = emptySliderComponent("SLIDER_HUE") as MobileSliderComponent & { type: "SLIDER_HUE" };
    sliderSaturation = emptySliderComponent("SLIDER_SATURATION") as MobileSliderComponent & { type: "SLIDER_SATURATION" };

    constructor(config?: Partial<MobileLedWidget>) {
        Object.assign(this, config);
    }
}

export class MobileLedCctWidget {
    id = createMobileId();
    type: "LED_CCT" = "LED_CCT";
    dtoId: string | null = null;
    buttonBistable = emptyBistableButton("BUTTON_BISTABLE") as MobileBistableButton & { type: "BUTTON_BISTABLE" };
    sliderBrightness = emptySliderComponent("SLIDER_BRIGHTNESS") as MobileSliderComponent & { type: "SLIDER_BRIGHTNESS" };
    sliderColorTemp = emptySliderComponent("SLIDER_COLOR_TEMP") as MobileSliderComponent & { type: "SLIDER_COLOR_TEMP" };

    constructor(config?: Partial<MobileLedCctWidget>) {
        Object.assign(this, config);
    }
}

export class MobileRollerShutterWidget {
    id = createMobileId();
    type: "ROLLER_SHUTTER" = "ROLLER_SHUTTER";
    dtoId: string | null = null;
    buttonBistableClick: MobileBistableClickButton = {
        image: MobileIcons.Blinds,
        actionClick: emptyAction("CLICK", "METHOD", "$value$"),
        label: "",
        indication: "ON_OFF",
        state: emptyReference(),
        type: "BUTTON_BISTABLE_CLICK",
        rowId: 0
    };
    status: null = null;

    constructor(config?: Partial<MobileRollerShutterWidget>) {
        Object.assign(this, config);
    }
}

export class MobileCameraWidget {
    id = createMobileId();
    type: "CAMERA" = "CAMERA";
    dtoId: string | null = null;
    cameraStream: MobileCameraWidget["cameraStream"] = {
        image: MobileIcons.Camera,
        label: "",
        type: "CAMERA_STREAM" as const,
        url: "",
        rowId: 0
    };

    constructor(config?: Partial<MobileCameraWidget>) {
        Object.assign(this, config);
    }
}

export class MobileSchedulerWidget {
    id = createMobileId();
    type: "SCHEDULER" = "SCHEDULER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Scheduler;
    label = "";
    setSchedule = emptyAction("CLICK", "ATTRIBUTE", "1");
    setMax = emptyAction("CLICK", "ATTRIBUTE", "1");
    max = emptyReference();
    start = emptyAction("CLICK", "ATTRIBUTE", "1");
    schedule = emptyReference();
    setMin = emptyAction("CLICK", "ATTRIBUTE", "1");
    min = emptyReference();
    stop = emptyAction("CLICK", "ATTRIBUTE", "1");
    state = emptyReference();
    value = emptyReference();

    constructor(config?: Partial<MobileSchedulerWidget>) {
        Object.assign(this, config);
    }
}

export class MobileEventSchedulerWidget {
    id = createMobileId();
    type: "EVENT_SCHEDULER" = "EVENT_SCHEDULER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Scheduler;
    label = "";
    object: MobileEventSchedulerWidget["object"] = {
        currentRule: emptyReference(),
        ruleList: emptyReference(),
        start: emptyAction("CLICK", "ATTRIBUTE", "1"),
        enableRule: emptyAction("CLICK", "ATTRIBUTE", "1"),
        ruleSpace: emptyReference(),
        nextRule: emptyReference(),
        deleteRule: emptyAction("CLICK", "ATTRIBUTE", "1"),
        disableRule: emptyAction("CLICK", "ATTRIBUTE", "1"),
        ruleCount: emptyReference(),
        stop: emptyAction("CLICK", "ATTRIBUTE", "1"),
        addRule: emptyAction("CLICK", "ATTRIBUTE", "1"),
        getRule: emptyAction("CLICK", "ATTRIBUTE", "1"),
        state: emptyReference()
    };

    constructor(config?: Partial<MobileEventSchedulerWidget>) {
        Object.assign(this, config);
    }
}

export class MobileTextWidget {
    id = createMobileId();
    type: "TEXT" = "TEXT";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Text;
    label = "";
    iconVisible = true;
    text = emptyReference();

    constructor(config?: Partial<MobileTextWidget>) {
        Object.assign(this, config);
    }
}

export class MobileMultisensorWidget {
    id = createMobileId();
    type: "MULTISENSOR" = "MULTISENSOR";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Multisensor;
    label = "";
    labelVisible = true;
    objectAirCo2 = emptyMultisensorObject();
    objectAirVco = emptyMultisensorObject();
    objectHumidity = emptyMultisensorObject();
    objectLight = emptyMultisensorObject();
    objectPressure = emptyMultisensorObject();
    objectSound = emptyMultisensorObject();
    objectTemperature = emptyMultisensorObject();

    constructor(config?: Partial<MobileMultisensorWidget>) {
        Object.assign(this, config);
    }
}

export class MobileTvRemoteControlWidget {
    id = createMobileId();
    type: "TV_REMOTE_CONTROL" = "TV_REMOTE_CONTROL";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Tv;
    label = "";
    vodLabel = "";
    object: MobileTvRemoteControlWidget["object"] = {
        play: emptyAction("CLICK", "ATTRIBUTE", "1"),
        init: emptyAction("CLICK", "ATTRIBUTE", "1"),
        previousChannel: emptyAction("CLICK", "ATTRIBUTE", "1"),
        fastRewind: emptyAction("CLICK", "ATTRIBUTE", "1"),
        back: emptyAction("CLICK", "ATTRIBUTE", "1"),
        mute: emptyAction("CLICK", "ATTRIBUTE", "1"),
        vod: emptyAction("CLICK", "ATTRIBUTE", "1"),
        right: emptyAction("CLICK", "ATTRIBUTE", "1"),
        menu: emptyAction("CLICK", "ATTRIBUTE", "1"),
        down: emptyAction("CLICK", "ATTRIBUTE", "1"),
        off: emptyAction("CLICK", "ATTRIBUTE", "1"),
        nextChannel: emptyAction("CLICK", "ATTRIBUTE", "1"),
        pause: emptyAction("CLICK", "ATTRIBUTE", "1"),
        volumeDown: emptyAction("CLICK", "ATTRIBUTE", "1"),
        left: emptyAction("CLICK", "ATTRIBUTE", "1"),
        volumeUp: emptyAction("CLICK", "ATTRIBUTE", "1"),
        up: emptyAction("CLICK", "ATTRIBUTE", "1"),
        ok: emptyAction("CLICK", "ATTRIBUTE", "1"),
        fastForward: emptyAction("CLICK", "ATTRIBUTE", "1"),
        guide: emptyAction("CLICK", "ATTRIBUTE", "1"),
        on: emptyAction("CLICK", "ATTRIBUTE", "1")
    };

    constructor(config?: Partial<MobileTvRemoteControlWidget>) {
        Object.assign(this, config);
    }
}

export class MobileThermostatV2Widget {
    id = createMobileId();
    type: "THERMOSTAT_V2" = "THERMOSTAT_V2";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Temperature;
    label = "";
    noOfFanSpeeds = 0;
    object: MobileThermostatV2Widget["object"] = {
        maxTemperature: emptyReference(),
        setMaxTemperatureAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        fanControlOutValue: null,
        currentTemperature: emptyReference(),
        fanMode: emptyReference(),
        setTargetTemperatureAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setFanMode: null,
        controlDirection: emptyReference(),
        setModeAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        mode: emptyReference(),
        controlOutValue: emptyReference(),
        setMinTemperatureAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        targetTemperature: null,
        minTemperature: emptyReference(),
        setScheduleDataAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setStateAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        state: emptyReference(),
        setControlDirection: emptyAction("CLICK", "ATTRIBUTE", "1"),
        scheduleData: emptyReference()
    };

    constructor(config?: Partial<MobileThermostatV2Widget>) {
        Object.assign(this, config);
    }
}

export class MobileContactSensorWidget {
    id = createMobileId();
    type: "CONTACT_SENSOR" = "CONTACT_SENSOR";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Lock;
    label = "";
    offIndication = "Wyłączone";
    reverseState = false;
    onIndication = "Włączone";
    object = emptyContactSensorComponent().object;

    constructor(config?: Partial<MobileContactSensorWidget>) {
        Object.assign(this, config);
    }
}

export class MobileContactSensorDoubleWidget {
    id = createMobileId();
    type: "CONTACT_SENSOR_DOUBLE" = "CONTACT_SENSOR_DOUBLE";
    dtoId: string | null = null;
    componentLeft = emptyContactSensorComponent();
    componentRight = emptyContactSensorComponent();

    constructor(config?: Partial<MobileContactSensorDoubleWidget>) {
        Object.assign(this, config);
    }
}

export class MobileSliderWidget {
    id = createMobileId();
    type: "SLIDER" = "SLIDER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.VolumeCircle;
    label = "";
    unit: MobileUnit = "UNKNOWN";
    min = 0;
    max = 1;
    precision = 2;
    object: MobileSliderWidget["object"] = {
        setValueAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        value: emptyReference(),
        clickAction: emptyAction("CLICK", "ATTRIBUTE", "1")
    };

    constructor(config?: Partial<MobileSliderWidget>) {
        Object.assign(this, config);
    }
}

export class MobileCoolMasterWidget {
    id = createMobileId();
    type: "COOL_MASTER" = "COOL_MASTER";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Ac;
    label = "";
    minTargetTemp = 10;
    maxTargetTemp = 30;
    object: MobileCoolMasterWidget["object"] = {
        louverPosition: emptyReference(),
        ambientTemp: emptyReference(),
        failureCode: emptyReference(),
        setFanSpeedAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        targetTemp: emptyReference(),
        supportedFanSpeeds: emptyReference(),
        supportedModes: emptyReference(),
        turnOnAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setModeAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        supportedLouverPositions: emptyReference(),
        mode: emptyReference(),
        setSupportedLouverPositions: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setSupportedFanSpeeds: emptyAction("CLICK", "ATTRIBUTE", "1"),
        turnOffAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        switchModeAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        uids: emptyReference(),
        setLouverPosition: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setTargetTempAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setSupportedModes: emptyAction("CLICK", "ATTRIBUTE", "1"),
        setStateAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        state: emptyReference(),
        fanSpeed: emptyReference(),
        coolMasterID: emptyReference(),
        status: emptyReference()
    };

    constructor(config?: Partial<MobileCoolMasterWidget>) {
        Object.assign(this, config);
    }
}

export class MobileIntercomWidget {
    id = createMobileId();
    type: "INTERCOM" = "INTERCOM";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Intercom;
    label = "";
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
    intercomSipNumber = "";

    constructor(config?: Partial<MobileIntercomWidget>) {
        Object.assign(this, config);
    }
}

export class MobileAudioRemoteControlWidget {
    id = createMobileId();
    type: "AUDIO_REMOTE_CONTROL" = "AUDIO_REMOTE_CONTROL";
    dtoId: string | null = null;
    icon: MobileIcon = MobileIcons.Speaker;
    label = "";
    object: MobileAudioRemoteControlWidget["object"] = {
        onAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        offAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        muteAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        playAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        volumeUpAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        pauseAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        artistName: emptyReference(),
        previousAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        nextAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        trackTitle: emptyReference(),
        volumeDownAction: emptyAction("CLICK", "ATTRIBUTE", "1"),
        initAction: emptyAction("CLICK", "ATTRIBUTE", "1")
    };

    constructor(config?: Partial<MobileAudioRemoteControlWidget>) {
        Object.assign(this, config);
    }
}