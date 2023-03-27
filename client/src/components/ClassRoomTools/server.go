package main

import (
    rtmtokenbuilder "github.com/AgoraIO/Tools/DynamicKey/AgoraDynamicKey/go/src/rtmtokenbuilder2"
    "fmt"
    "log"
    "net/http"
    "time"
    "encoding/json"
    "errors"
    "strconv"
)

type rtm_token_struct struct{
    Uid_rtm string `json:"uid"`
}

var rtm_token string
var rtm_uid string

func generateRtmToken(rtm_uid string){

    appID := "982666deb2ab44e7a3ab95555076b864"
    appCertificate := "c6987dccf3cd4f18b9c61ccb2fc318a2"
    expireTimeInSeconds := uint32(3600000000)
    currentTimestamp := uint32(time.Now().UTC().Unix())
    expireTimestamp := currentTimestamp + expireTimeInSeconds

    result, err := rtmtokenbuilder.BuildToken(appID, appCertificate, rtm_uid, expireTimestamp)
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Printf("Rtm Token: %s\n",  result)

    rtm_token = result

    }
}

func rtmTokenHandler(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Content-Type", "application/json;charset=UTF-8")
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS");
        w.Header().Set("Access-Control-Allow-Headers", "*");

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        if r.Method != "POST" && r.Method != "OPTIONS" {
            http.Error(w, "Unsupported method. Please check.", http.StatusNotFound)
            return
        }

        var t_rtm_str rtm_token_struct
        var unmarshalErr *json.UnmarshalTypeError
        str_decoder := json.NewDecoder(r.Body)
        rtm_err := str_decoder.Decode(&t_rtm_str)

        if (rtm_err == nil) {
            rtm_uid = t_rtm_str.Uid_rtm
        }

        if (rtm_err != nil) {
            if errors.As(rtm_err, &unmarshalErr){
            errorResponse(w, "Bad request. Please check your params.", http.StatusBadRequest)
            } else {
            errorResponse(w, "Bad request.", http.StatusBadRequest)
        }
        return
    }

        generateRtmToken(rtm_uid)
        errorResponse(w, rtm_token, http.StatusOK)
        log.Println(w, r)
}


func errorResponse(w http.ResponseWriter, message string, httpStatusCode int){
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(httpStatusCode)
    resp := make(map[string]string)
    resp["token"] = message
    resp["code"] = strconv.Itoa(httpStatusCode)
    jsonResp, _ := json.Marshal(resp)
    w.Write(jsonResp)

}

func main(){
    // Handling routes
    // <Vg k="MESS" /> token from <Vg k="MESS" /> uid
    http.HandleFunc("/fetch_rtm_token", rtmTokenHandler)

    fmt.Printf("Starting server at port 8082\n")

    if err := http.ListenAndServe(":8082", nil); err != nil {
        log.Fatal(err)
    }
}
