#include <SoftwareSerial.h>
#define PIN 0
#define RxD 3
#define TxD 4

SoftwareSerial serial(RxD, TxD);

void setup() {
  serial.begin(9600);
  pinMode(PIN, INPUT);
}

int lastState = 0;
unsigned long last;
int stage = -1;
int pulses[2];
char chars[] = "ABCDEFGHJKLMNPQRSTUV";
unsigned long lastHB;

void doReset() {
  pulses[0] = 0;
  pulses[1] = 0;
  stage = -1;
  lastState = 0;
}

void loop() {
  unsigned long now = millis();
  int diff = now - last;
  
  // if it's been a while, or last stage & a while, reset
  if (stage > -1 && diff > 1000) {
    doReset();
    return;
  }
  if (stage == 1 && diff > 200) {
    serial.print("input:");
    
    int  num = 20 - pulses[1];
    serial.print(chars[num]);
    
    serial.print(',');
    
    num = 10 - pulses[0];
    serial.println(num);
    
    doReset();
    return;
  }
  int state = digitalRead(PIN);
  if (lastState != state) {
    lastState = state;
    if (stage == 0 && diff > 140) {
      stage = 1;
    } else if (stage == -1) {
      stage = 0;
    }
    if (state == 1) {
      last = now;
      return;
    }

    if (diff < 30) {
      return;
    }

    pulses[stage]++;
    return;
  }
  if (stage == -1 && now - lastHB > 1000) {
    serial.println("hb");
    lastHB = now;
  }
}
