package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type resultBody struct {
	AccessToken          string `json:"accessToken"`
	EncryptedAccessToken string `json:"encryptedAccessToken"`
	ExpireInSeconds      int32  `json:"expireInSeconds"`
	UserID               int32  `json:"userId"`
}
type responseBody struct {
	Result              resultBody `json:"result"`
	TargetURL           string     `json:"targetUrl"`
	Success             bool       `json:"success"`
	Error               string     `json:"error"`
	UnAuthorizedRequest bool       `json:"unAuthorizedRequest"`
	Abp                 bool       `json:"__abp"`
}

func main() {
	authURL := "http://pescloud-dev.pensees-ai.com:32080/api/TokenAuth/AuthenticateWithSms"
	api := "http://pescloud-dev.pensees-ai.com:32080/terminal-tenant/tenant/dept/list?t=1596677312441"
	fmt.Println("Hello World.")

	mapP := make(map[string]interface{}, 4)
	mapP["phoneNumber"] = "19962021565"
	mapP["password"] = "123qwe"
	mapP["smsAuthCode"] = "111111"
	mapP["rememberClient"] = true
	params, _ := json.Marshal(mapP)
	fmt.Println(string(params))

	request, err := http.NewRequest("POST", authURL, bytes.NewBuffer(params))
	if err != nil {
		panic(err)
	}
	request.Header.Set("Content-Type", "application/json;charset=UTF-8")

	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println("response status:	", resp.Status)
	body, _ := ioutil.ReadAll(resp.Body)
	// fmt.Println("response body: ", string(body))

	res := responseBody{}
	if err := json.Unmarshal([]byte(string(body)), &res); err != nil {
		panic(err)
	}
	token := res.Result.AccessToken
	fmt.Println(token)

	//将token加入Header，再请求业务接口
	getReq, err := http.NewRequest("GET", api, nil)
	if err != nil {
		panic(err)
	}
	getReq.Header.Set("Authorization", token)

	r, err := client.Do(getReq)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Printf("body= %s\n", string(body))
}
