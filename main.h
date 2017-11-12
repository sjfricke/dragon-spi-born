#include "server/server.h" 
#include "hardware/led.h"
#include "hardware/accel.h"

#include <stdio.h>
#include <unistd.h>


void webData( int type, char* value);

void changeLights( int value );
