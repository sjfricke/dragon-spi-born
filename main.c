#include "main.h"

extern server_t* g_server;

static int status;
static int busy;

static char command[128];

pid_t audioPID;

void killAudio(){
  
  FILE *fp;
  char path[128];
  int pid;

  /* Open the command for reading. */
  fp = popen("/bin/ps -a | grep aplay", "r");
  if (fp == NULL) {
    printf("Failed to run command\n" );
    exit(1);
  }

  while (fgets(path, sizeof(path)-1, fp) != NULL) {
    pid = atoi(path);
  }

  sprintf(command, "kill -9 %d", pid);
  system(command);
  
  /* close */
  pclose(fp);
}

void webData( int type, char* value) {
  //  printf("Type: %d\nValue: %s\n\n", type, value);
  int ivalue;
  long t = 0;
  //busy = 0;
  //  printf("busy = %d\n", busy);
  switch(type) {
  case 0:
    changeLights(atoi(value));
    break;
  case 1:
    ivalue = atoi(value);
    if (ivalue == 0) {
      killAudio();
    } else if (ivalue == 1) {
      audioPID = fork();
      if (audioPID == 0) {
	strcpy(command, "aplay -D plughw:0,1 ./audio/MansNotHot.wav" );
	system(command);
	exit(1);
      }
    } else {
      printf("Not a valid speaker value: %d\n", value); 
    }
    break;
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

  float accel_x, accel_y, accel_z;

  int speakerStatus = 0;
    
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
  LedTurnAllOff();

  AccelSetup();
  
  while(1) {

    AccelGetValue(&accel_x, &accel_y, &accel_z);
    printf("Acceleration: x = %f y = %f z = %f\n\n", accel_x, accel_y, accel_z );
    
    if (GpioGetValue(s_touch) == 1) {
      broadcastString("0","0");
    }

    if (GpioGetValue(s_button) == 0) {
      if (speakerStatus == 0) {
	      broadcastString("1","1");

    	  //webData(1, "1");
    	  speakerStatus = 1;
      } else {
    	//webData(1, "0");
      	broadcastString("1","0");
      	speakerStatus = 0;
      	usleep(100000);
      }
    }
      
    usleep(50000); // 50ms
  } // while(1)
  
}
