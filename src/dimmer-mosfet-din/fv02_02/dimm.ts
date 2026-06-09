// Created from: packages/grenton-api/interfaces/module_2_0_DIMMER_MOSFET_DIN_fv02_02.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnValueRise = 3,
    OnValueLower = 4,
    OnOutOfRange = 5
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MinValue = 2,
    MaxValue = 3,
    StatisticState = 4,
    Load = 5,
    StartLevel = 6,
    DistributedLogicGroup = 8
}

enum MethodType {
    SetValue = 0,
    HoldValue = 0,
    SetRampTime = 1,
    Switch = 1,
    SetMinValue = 2,
    SwitchOn = 2,
    SetMaxValue = 3,
    SwitchOff = 3,
    SetStartLevel = 6
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

declare class DimmRaw {
    objectName: string;
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDimm {
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia z MinValue na wartość większą
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na MinValue
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na większą niż poprzednia
     * @param callback
     */
    addOnValueRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na mniejszą niż poprzednia
     * @param callback
     */
    addOnValueLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na wartość spoza zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /**
     * Ustawia wartość wyjścia (0.0 - 1.0)
     * @param {number} value
     */
    setValue: (value: number) => void
    /**
     * Ustawia czas rozjaśniania lub ściemniania wyjścia (w ms)
     * @param {number} rampTime
     */
    setRampTime: (rampTime: number) => void
    /**
     * Ustawia minimalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMinValue: (value: number) => void
    /**
     * Ustawia maksymalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMaxValue: (value: number) => void
    /**
     * Ustawia wartość progu załączenia (zakres 0.0 - 1.0)
     * @param {number} value
     */
    setStartLevel: (value: number) => void
    /**
     * Zmienia wartość wyjścia na przeciwny (MinValue - MaxValue). Parametr Time to czas zmiany, Ramp jest opcjonalny
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switch: (miliseconds: number, ramp?: number) => void
    /**
     * Ustawienie wartości wyjścia na MaxValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOn: (miliseconds: number, ramp?: number) => void
    /**
     * Ustawienie wartości wyjścia na MinValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOff: (miliseconds: number, ramp?: number) => void
    /**
     * Realizuje funkcję rozjaśniania/ściemniania wyjścia z użyciem Rampy podanej w parametrze
     * @param {number} ramp
     */
    holdValue: (ramp?: number) => void
    /** Podaje aktualną wartość wyjścia (0.0 - 1.0) */
    value: number
    /** Wartość opóźnienia czasu rozjaśniania lub ściemniania wyjścia (w ms) */
    rampTime: number
    /** Minimalna wartość jaka może przyjąć Value, próba ustawienia wartości mniejszej zwraca błąd */
    minValue: number
    /** Maksymalna wartość jaka może przyjąć Value, próba ustawienia wartości większej zwraca błąd */
    maxValue: number
    /** Zwraca aktualną wartość progu załączenia wyjścia (0.0 - 1.0) */
    startLevel: number
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
    /** Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu */
    load: number
}

class Dimm implements IDimm {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: DimmRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia z MinValue na wartość większą
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na MinValue
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na większą niż poprzednia
     * @param callback
     */
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na mniejszą niż poprzednia
     * @param callback
     */
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na wartość spoza zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    /**
     * Ustawia wartość wyjścia (0.0 - 1.0)
     * @param {number} value
     */
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    /**
     * Ustawia czas rozjaśniania lub ściemniania wyjścia (w ms)
     * @param {number} rampTime
     */
    setRampTime(rampTime: number): void {
        this.raw.set(PropertyType.RampTime, rampTime);
    }
    /**
     * Ustawia minimalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMinValue(value: number): void {
        this.raw.set(PropertyType.MinValue, value);
    }
    /**
     * Ustawia maksymalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMaxValue(value: number): void {
        this.raw.set(PropertyType.MaxValue, value);
    }
    /**
     * Ustawia wartość progu załączenia (zakres 0.0 - 1.0)
     * @param {number} value
     */
    setStartLevel(value: number): void {
        this.raw.set(PropertyType.StartLevel, value);
    }
    /**
     * Zmienia wartość wyjścia na przeciwny (MinValue - MaxValue). Parametr Time to czas zmiany, Ramp jest opcjonalny
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switch(miliseconds: number, ramp?: number): void {
        if (ramp === undefined) {
            this.raw.execute(MethodType.Switch, miliseconds);
        } else {
            this.raw.execute(MethodType.Switch, miliseconds, ramp);
        }
    }
    /**
     * Ustawienie wartości wyjścia na MaxValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOn(miliseconds: number, ramp?: number): void {
        if (ramp === undefined) {
            this.raw.execute(MethodType.SwitchOn, miliseconds);
        } else {
            this.raw.execute(MethodType.SwitchOn, miliseconds, ramp);
        }
    }
    /**
     * Ustawienie wartości wyjścia na MinValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOff(miliseconds: number, ramp?: number): void {
        if (ramp === undefined) {
            this.raw.execute(MethodType.SwitchOff, miliseconds);
        } else {
            this.raw.execute(MethodType.SwitchOff, miliseconds, ramp);
        }
    }
    /**
     * Realizuje funkcję rozjaśniania/ściemniania wyjścia z użyciem Rampy podanej w parametrze
     * @param {number} ramp
     */
    holdValue(ramp?: number): void {
        if (ramp === undefined) {
            this.raw.execute(MethodType.HoldValue);
        } else {
            this.raw.execute(MethodType.HoldValue, ramp);
        }
    }
    /**
     * Podaje aktualną wartość wyjścia (0.0 - 1.0)
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    set value(value: number) {
        this.raw.set(PropertyType.Value, value);
    }
    /**
     * Wartość opóźnienia czasu rozjaśniania lub ściemniania wyjścia (w ms)
     * @returns {number}
     */
    get rampTime(): number {
        return this.raw.get(PropertyType.RampTime);
    }
    set rampTime(value: number) {
        this.raw.set(PropertyType.RampTime, value);
    }
    /**
     * Minimalna wartość jaka może przyjąć Value, próba ustawienia wartości mniejszej zwraca błąd
     * @returns {number}
     */
    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }
    /**
     * Maksymalna wartość jaka może przyjąć Value, próba ustawienia wartości większej zwraca błąd
     * @returns {number}
     */
    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
    }
    /**
     * Zwraca aktualną wartość progu załączenia wyjścia (0.0 - 1.0)
     * @returns {number}
     */
    get startLevel(): number {
        return this.raw.get(PropertyType.StartLevel);
    }
    set startLevel(value: number) {
        this.raw.set(PropertyType.StartLevel, value);
    }
    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
    }
    /**
     * Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
    /**
     * Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu
     * @returns {number}
     */
    get load(): number {
        return this.raw.get(PropertyType.Load);
    }
    set load(value: number) {
        this.raw.set(PropertyType.Load, value);
    }
}

class DimmRemote implements IDimm {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia z MinValue na wartość większą
     * @param callback
     */
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na MinValue
     * @param callback
     */
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na większą niż poprzednia
     * @param callback
     */
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na mniejszą niż poprzednia
     * @param callback
     */
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia na wartość spoza zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Ustawia wartość wyjścia (0.0 - 1.0)
     * @param {number} value
     */
    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas rozjaśniania lub ściemniania wyjścia (w ms)
     * @param {number} rampTime
     */
    setRampTime(rampTime: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RampTime)
            .addParameter(rampTime)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia minimalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMinValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia maksymalną wartość, którą może przyjąć wyjście. Zakres: 0.0 - 1.0
     * @param {number} value
     */
    setMaxValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość progu załączenia (zakres 0.0 - 1.0)
     * @param {number} value
     */
    setStartLevel(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StartLevel)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zmienia wartość wyjścia na przeciwny (MinValue - MaxValue). Parametr Time to czas zmiany, Ramp jest opcjonalny
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switch(miliseconds: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Switch)
            .addParameter(miliseconds);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        this.gate.runScript(builder.build()!);
    }

    /**
     * Ustawienie wartości wyjścia na MaxValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOn(miliseconds: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .addParameter(miliseconds);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        this.gate.runScript(builder.build()!);
    }

    /**
     * Ustawienie wartości wyjścia na MinValue. Parametr Time to czas przełączenia, Ramp określa czas narastania wartości
     * @param {number} miliseconds
     * @param {number} ramp
     */
    switchOff(miliseconds: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .addParameter(miliseconds);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        this.gate.runScript(builder.build()!);
    }

    /**
     * Realizuje funkcję rozjaśniania/ściemniania wyjścia z użyciem Rampy podanej w parametrze
     * @param {number} ramp
     */
    holdValue(ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldValue);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        this.gate.runScript(builder.build()!);
    }

    /**
     * Podaje aktualną wartość wyjścia (0.0 - 1.0)
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    set value(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość opóźnienia czasu rozjaśniania lub ściemniania wyjścia (w ms)
     * @returns {number}
     */
    get rampTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RampTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    set rampTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RampTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Minimalna wartość jaka może przyjąć Value, próba ustawienia wartości mniejszej zwraca błąd
     * @returns {number}
     */
    get minValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MinValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set minValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Maksymalna wartość jaka może przyjąć Value, próba ustawienia wartości większej zwraca błąd
     * @returns {number}
     */
    get maxValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set maxValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zwraca aktualną wartość progu załączenia wyjścia (0.0 - 1.0)
     * @returns {number}
     */
    get startLevel(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StartLevel)
            .build();
        return this.gate.runScript(cmd!);
    }

    set startLevel(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StartLevel)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
    get distributedLogicGroup(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup)
            .build();
        return this.gate.runScript(cmd!);
    }

    set distributedLogicGroup(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticState(value: StatisticStateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu
     * @returns {number}
     */
    get load(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Load)
            .build();
        return this.gate.runScript(cmd!);
    }

    set load(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Load)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Dimm, DimmRaw, DimmRemote, StatisticStateType
}
