#include <ESP8266HTTPClient.h>
#include <ESP8266WiFiMulti.h>

#include <WiFiClient.h>

const char* ssid ="Totalplay-DEA5_2.4Gnormal";
const char* password ="12345678L";

// Variables para sensor de voltaje
float v;
int espera = 60000;

//Variables para el circuito
#define RELE 3
#define M1IN1 4
#define M1IN2 5
#define M1IN3 6
#define M1IN4 7

#define PASOS 2048
#define VELOCIDAD 3

Stepper motor1(PASOS, M1IN1, M1IN3, M1IN2, M1IN4);



WiFiClient client; 

void setup() {
  Serial.begin(115200);
  Serial.println(F("Sensor de voltaje prueba de conexión con el servidor"));

  pinMode(RELE, OUTPUT);
  motor1.setSpeed(VELOCIDAD);

  WiFi.begin(ssid, password);
  Serial.print("Conectando...");
  while (WiFi.status()!= WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conexión OK!");
  Serial.print("IP Local: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  LecturaVoltaje();
  // funcion  de envio por POST
  EnvioDatos();
  if(v<=1){
    ActivarLimpieza();
  }else{
    delay(espera);
  }
}


// funcion de lectura de temperatura y humedad
void LecturaVoltaje(){

v =  (float)25*analogRead(A0)/1023;

}

// rutina de envio de datos por POST
void EnvioDatos(){
  if (WiFi.status() == WL_CONNECTED){ 
     HTTPClient http;  // creo el objeto http
     String datos_a_enviar = "voltaje=" + String(v);  

     http.begin(client,"http://pruebaesp8266temphum.000webhostapp.com/EspPost.php");
     http.addHeader("Content-Type", "application/x-www-form-urlencoded"); // defino texto plano..

     int codigo_respuesta = http.POST(datos_a_enviar);

     if (codigo_respuesta>0){
      Serial.println("Código HTTP: "+ String(codigo_respuesta));
        if (codigo_respuesta == 200){
          String cuerpo_respuesta = http.getString();
          Serial.println("El servidor respondió: ");
          Serial.println(cuerpo_respuesta);
        }
     } else {
        Serial.print("Error enviado POST, código: ");
        Serial.println(codigo_respuesta);
     }

       http.end();  // libero recursos
       
  } else {
     Serial.println("Error en la conexion WIFI");
  }
}

void ActivarLimpieza(){
  digitalWrite(RELE, HIGH);
  motor1.step(1024);
  digitalWrite(RELE, LOW);
  digitalWrite(M1IN1, LOW);
  digitalWrite(M1IN2, LOW);
  digitalWrite(M1IN3, LOW);
  digitalWrite(M1IN4, LOW);

  delay(espera); //espera 60s
}
