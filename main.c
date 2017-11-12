#include "main.h"

extern server_t* g_server;

static int status;
static int busy;

void webData( int type, char* value) {
  //  printf("Type: %d\nValue: %s\n\n", type, value);
  busy = 0;
  printf("busy = %d\n", busy);
  switch(type) {
  case 0:
    changeLights(atoi(value));
    break;
    //  case 1:
    //    updateLED(value);
    //    break;
  default:
    printf("Not a valid type! [%d]\n", type);
    break;
  }
}

void changeLights( int value ) {
  if (value == 0) {
    LedTurnAllOff();
  } else if (value == 1) {
    LedTurnAllOn();
  } else {
    printf("Not a valid light value: %d\n", value); 
  }
}

int main ( int argc, char* argv[] ) {

  uint16_t s_button;
  uint16_t s_touch;
  
  g_server = (server_t*)malloc(sizeof(server_t));
  g_server->port = 6419;
  g_server->onData = webData;

  startServer();

  // set up GPIOs

  s_button =  GpioDB410cMapping(24);
  GpioEnablePin(s_button);
  GpioSetDirection(s_button, INPUT_PIN);

  s_touch =  GpioDB410cMapping(23);
  GpioEnablePin(s_touch);
  GpioSetDirection(s_touch, INPUT_PIN);
  
  LedSetup();

  while(1) {

    if (GpioGetValue(s_touch) == 1) {
      broadcastString("0","0");
    } else {
      LedTurnOn(33);
    }

    if (GpioGetValue(s_button) == 0) {
      broadcastString("0","1");
    } else {
      LedTurnOn(28);
    }
    
    usleep(100000); // 100ms
  }
  
}
