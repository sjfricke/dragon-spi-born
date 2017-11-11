#include "server/server.h" 
#include "audio/voice.h"
#include "hardware/led.h"

#include <stdio.h>
#include <unistd.h>


void webData( int type, char* value);

void animationStatus( char* status);

void updateLED( char* rgb );

void takePhoto( void );
