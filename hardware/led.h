/*
  LED lights
 */
#ifndef __HARDWARE_LED_H__
#define __HARDWARE_LED_H__

#include "gpio.h"

void LedSetup();

void LedTurnOn(uint16_t pin);
void LedTurnAllOn();

void LedTurnOff(uint16_t pin);
void LedTurnAllOff();


#endif
