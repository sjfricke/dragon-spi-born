#include "led.h"

#define LED_COUNT 4
static uint16_t leds[4] = {31, 32, 33, 34};

void LedSetup() {
    int i;
    uint16_t cpin;

    for (i = 0; i < LED_COUNT; i++) {
        cpin = GpioDB410cMapping(leds[i]);
        GpioEnablePin(cpin);
        GpioSetDirection(cpin, OUTPUT_PIN);
        GpioSetValue(cpin, LOW);
    }
}

void LedTurnOn(uint16_t pin) {
    GpioSetValue(pin, HIGH);
}

void LedTurnAllOn() {
    int i;
    uint16_t cpin;

    for (i = 0; i < LED_COUNT; i++) {
        cpin = GpioDB410cMapping(leds[i]);
        GpioSetValue(cpin, HIGH);
    }
}

void LedTurnOff(uint16_t pin) {
    GpioSetValue(pin, LOW);
}

void LedTurnAllOff() {
    int i;
    uint16_t cpin;

    for (i = 0; i < LED_COUNT; i++) {
        cpin = GpioDB410cMapping(leds[i]);
        GpioSetValue(cpin, LOW);
    }
}
