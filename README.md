# Bitespeed Backend Task: Identity Reconciliation 

### **Test Assignment**


- **HOSTED_ENDPOINT: https://bitespeedbackendtask-s1sq.onrender.com/identify**
- Nodejs service is deployed on render.com and the MySql DB is on clever-cloud.com



### **Node API**

BASE_URL : https://bitespeedbackendtask-s1sq.onrender.com

#### Identify Contact Information
```
const API_PATH   : '/identify'
const API_METHOD : 'POST'

export type request = {
	"email"      ?: string,
	"phoneNumber"?: number
}

export type response = {
    "contact":{
        "primaryContatctId"  : number,
        "emails"             : string[], 
        "phoneNumbers"       : string[], 
        "secondaryContactIds": number[]
    }
}
```